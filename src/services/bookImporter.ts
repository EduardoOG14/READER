import type { Book, BookFormat } from '../types';
import { saveBook, saveBookFile } from './storage';
import { parsePdfFile } from './parsers/pdfParser';
import { parseMangaArchive } from './parsers/mangaParser';
import { parseEpubFile } from './parsers/epubParser';
import { parseTextFile, createMinimalistTextCover } from './parsers/textParser';
import { createOptimizedThumbnail } from '../utils/thumbnail';

export function detectFormat(filename: string): BookFormat | null {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.pdf')) return 'pdf';
  if (lower.endsWith('.cbz')) return 'cbz';
  if (lower.endsWith('.cbr')) return 'cbr';
  if (lower.endsWith('.zip')) return 'zip';
  if (lower.endsWith('.epub')) return 'epub';
  if (lower.endsWith('.txt')) return 'txt';
  if (lower.endsWith('.md')) return 'md';
  return null;
}

export async function importBookFile(
  file: File,
  targetCategoryIds: string[] = [],
  initialMeta?: Partial<Book>
): Promise<Book> {
  const format = detectFormat(file.name);
  if (!format) {
    throw new Error(`Formato no compatible: ${file.name}. Formatos admitidos: PDF, CBZ, CBR, ZIP, EPUB, TXT, MD`);
  }

  const bookId = `book_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const buffer = await file.arrayBuffer();

  // Strip underscores and normalize title: e.g. "Black_Clover" -> "Black Clover"
  let title =
    initialMeta?.title ||
    file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/_+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  let author: string | undefined = initialMeta?.author;
  let totalPages = 1;
  let coverUrl: string | undefined = initialMeta?.coverUrl;
  let description: string | undefined = initialMeta?.description;

  // Format-specific metadata and cover extraction
  if (format === 'pdf') {
    try {
      const pdfMeta = await parsePdfFile(buffer);
      totalPages = pdfMeta.totalPages;
      if (pdfMeta.title && !initialMeta?.title) title = pdfMeta.title;
      if (pdfMeta.author && !author) author = pdfMeta.author;
      if (pdfMeta.coverUrl && !coverUrl) coverUrl = pdfMeta.coverUrl;
    } catch (e) {
      console.warn('PDF parse error, using fallback:', e);
    }
  } else if (format === 'cbz' || format === 'cbr' || format === 'zip') {
    try {
      const mangaMeta = await parseMangaArchive(buffer);
      totalPages = mangaMeta.totalPages;
      if (mangaMeta.coverUrl && !coverUrl) coverUrl = mangaMeta.coverUrl;
    } catch (e) {
      console.warn('Manga parse error:', e);
    }
  } else if (format === 'epub') {
    try {
      const epubMeta = await parseEpubFile(buffer);
      totalPages = epubMeta.totalPages;
      if (epubMeta.title && !initialMeta?.title) title = epubMeta.title;
      if (epubMeta.author && !author) author = epubMeta.author;
      if (epubMeta.description && !description) description = epubMeta.description;
      if (epubMeta.coverUrl && !coverUrl) coverUrl = epubMeta.coverUrl;
    } catch (e) {
      console.warn('EPUB parse error:', e);
    }
  } else if (format === 'txt' || format === 'md') {
    try {
      const text = new TextDecoder('utf-8').decode(buffer);
      const textMeta = parseTextFile(text, file.name);
      totalPages = textMeta.totalPages;
      if (!coverUrl) coverUrl = textMeta.coverUrl;
    } catch (e) {
      console.warn('Text parse error:', e);
    }
  }

  // Fallback cover if none could be extracted
  if (!coverUrl) {
    coverUrl = createMinimalistTextCover(title, format.toUpperCase());
  } else if (!coverUrl.startsWith('data:image/svg+xml') && !coverUrl.startsWith('http://') && !coverUrl.startsWith('https://')) {
    try {
      const optimized = await createOptimizedThumbnail(coverUrl, 900, 1350, 0.9);
      if (optimized) {
        coverUrl = optimized;
      }
    } catch {}
  }

  // Auto-assign category for Manga/Comics or Books if no explicit categories provided
  const categoryIds = [...targetCategoryIds];
  if (categoryIds.length === 0) {
    if (format === 'cbz' || format === 'cbr' || format === 'zip') {
      categoryIds.push('cat-manga');
    } else {
      categoryIds.push('cat-books');
    }
  }

  // 1. Save binary copy to internal app storage (using File/Blob prevents detachment)
  const fileStorageKey = await saveBookFile(bookId, file.name, file);

  // 2. Create Book entity
  const newBook: Book = {
    id: bookId,
    title,
    author,
    format,
    fileName: file.name,
    fileSize: file.size,
    dateAdded: Date.now(),
    currentPage: 1,
    totalPages: Math.max(1, totalPages),
    progress: 0,
    coverUrl,
    categoryIds,
    tags: initialMeta?.tags,
    fileStorageKey,
    description,
  };

  // 3. Save metadata to IndexedDB
  await saveBook(newBook);

  return newBook;
}
