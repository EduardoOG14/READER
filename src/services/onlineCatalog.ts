import JSZip from 'jszip';
import { importBookFile } from './bookImporter';
import { saveBook } from './storage';
import type { Book } from '../types';

export interface OnlineBook {
  id: string | number;
  title: string;
  authors: string[];
  coverUrl?: string;
  summary?: string;
  downloadUrl?: string;
  format: 'epub' | 'txt';
  languages: string[];
}

export interface OnlineManga {
  id: string;
  title: string;
  altTitle?: string;
  coverUrl?: string;
  description?: string;
  originalLanguage: string; // 'ja' (manga), 'ko' (manhwa), 'zh' (manhua), 'en' (comic)
  typeLabel: 'Manga' | 'Manhwa' | 'Manhua' | 'Cómic';
  status?: string;
  year?: number;
  tags: string[];
}

export interface MangaChapterInfo {
  id: string;
  chapter: string;
  volume?: string;
  title?: string;
  language: string;
  pages: number;
}

// Helper to determine comic type from original language and tags
function determineMangaType(originalLanguage: string, tags: string[]): OnlineManga['typeLabel'] {
  const isWebtoon = tags.some(t => t.toLowerCase().includes('long strip') || t.toLowerCase().includes('web comic'));
  if (originalLanguage === 'ko' || isWebtoon) return 'Manhwa';
  if (originalLanguage === 'zh' || originalLanguage === 'zh-hk') return 'Manhua';
  if (originalLanguage === 'en') return 'Cómic';
  return 'Manga';
}

// Safe fetch with fallback for CORS on web
async function safeFetchBlob(url: string): Promise<Blob> {
  try {
    const res = await fetch(url);
    if (res.ok) {
      return await res.blob();
    }
    throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    // If browser blocks due to CORS, try CORS-friendly proxy
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const proxyRes = await fetch(proxyUrl);
      if (proxyRes.ok) {
        return await proxyRes.blob();
      }
    } catch {}

    try {
      const proxyUrl2 = `https://corsproxy.io/?url=${encodeURIComponent(url)}`;
      const proxyRes2 = await fetch(proxyUrl2);
      if (proxyRes2.ok) {
        return await proxyRes2.blob();
      }
    } catch {}

    throw new Error(`No se pudo descargar el archivo de: ${url}`);
  }
}

// ==========================================
// 1. SEARCH BOOKS (Project Gutenberg / Gutendex)
// ==========================================

export async function searchOnlineBooks(query: string, language = 'es'): Promise<OnlineBook[]> {
  const cleanQ = query.trim();
  let url = `https://gutendex.com/books/?search=${encodeURIComponent(cleanQ)}`;
  if (language && language !== 'all') {
    url += `&languages=${encodeURIComponent(language)}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error en el servidor de libros: ${res.statusText}`);
  }

  const data = await res.json();
  const results: OnlineBook[] = [];

  if (data && data.results && Array.isArray(data.results)) {
    for (const item of data.results) {
      const formats = item.formats || {};

      // Prefer EPUB, fallback to UTF-8 text
      let downloadUrl = formats['application/epub+zip'];
      let format: 'epub' | 'txt' = 'epub';

      if (!downloadUrl && formats['text/plain; charset=utf-8']) {
        downloadUrl = formats['text/plain; charset=utf-8'];
        format = 'txt';
      }

      const coverUrl = formats['image/jpeg'] || undefined;
      const authors = (item.authors || []).map((a: any) => a.name).filter(Boolean);
      const summary = item.summaries && item.summaries.length > 0 ? item.summaries[0] : undefined;

      results.push({
        id: item.id,
        title: item.title,
        authors,
        coverUrl,
        summary,
        downloadUrl,
        format,
        languages: item.languages || ['es'],
      });
    }
  }

  return results;
}

export async function downloadOnlineBook(
  book: OnlineBook,
  onProgress?: (progress: number, status: string) => void
): Promise<Book> {
  if (!book.downloadUrl) {
    throw new Error('Este libro no tiene un enlace de descarga disponible.');
  }

  onProgress?.(15, `Descargando ${book.title}...`);
  const blob = await safeFetchBlob(book.downloadUrl);

  onProgress?.(70, 'Guardando en la biblioteca interna...');
  const extension = book.format === 'epub' ? 'epub' : 'txt';
  const cleanTitle = book.title.replace(/[\\/:*?"<>|]/g, '').trim();
  const file = new File([blob], `${cleanTitle}.${extension}`, {
    type: book.format === 'epub' ? 'application/epub+zip' : 'text/plain',
  });

  const imported = await importBookFile(file, ['cat-books']);
  if (book.summary) {
    imported.description = book.summary;
    await saveBook(imported);
  }
  onProgress?.(100, '¡Libro listo para leer sin conexión!');
  return imported;
}

// ==========================================
// 2. SEARCH MANGA / MANHWA / COMICS (MangaDex)
// ==========================================

export async function searchOnlineManga(
  query: string,
  typeFilter: 'all' | 'manga' | 'manhwa' | 'comic' = 'all'
): Promise<OnlineManga[]> {
  const cleanQ = query.trim();
  let url = `https://api.mangadex.org/manga?title=${encodeURIComponent(cleanQ)}&limit=20&includes[]=cover_art&includes[]=author&contentRating[]=safe&contentRating[]=suggestive`;

  if (typeFilter === 'manhwa') {
    url += '&originalLanguage[]=ko';
  } else if (typeFilter === 'manga') {
    url += '&originalLanguage[]=ja';
  } else if (typeFilter === 'comic') {
    url += '&originalLanguage[]=en';
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error en el servidor de mangas: ${res.statusText}`);
  }

  const data = await res.json();
  const results: OnlineManga[] = [];

  if (data && data.data && Array.isArray(data.data)) {
    for (const item of data.data) {
      const attrs = item.attributes || {};
      const titles = attrs.title || {};
      // Preferred title: Spanish, English, or first available
      const title =
        titles['es-la'] ||
        titles['es'] ||
        titles['en'] ||
        titles[Object.keys(titles)[0]] ||
        'Sin título';

      // Find cover art file
      const coverRel = (item.relationships || []).find((r: any) => r.type === 'cover_art');
      let coverUrl: string | undefined;
      if (coverRel && coverRel.attributes && coverRel.attributes.fileName) {
        coverUrl = `https://uploads.mangadex.org/covers/${item.id}/${coverRel.attributes.fileName}.256.jpg`;
      }

      const descMap = attrs.description || {};
      const description = descMap['es'] || descMap['es-la'] || descMap['en'] || undefined;

      const tags = (attrs.tags || []).map((t: any) => t.attributes?.name?.en).filter(Boolean);
      const originalLanguage = attrs.originalLanguage || 'ja';
      const typeLabel = determineMangaType(originalLanguage, tags);

      results.push({
        id: item.id,
        title,
        coverUrl,
        description,
        originalLanguage,
        typeLabel,
        status: attrs.status,
        year: attrs.year,
        tags,
      });
    }
  }

  return results;
}

export async function getMangaChapters(
  mangaId: string,
  preferredLang = 'es'
): Promise<MangaChapterInfo[]> {
  // Request chapters with Spanish, Latin American Spanish, and English
  let langParams = 'translatedLanguage[]=es&translatedLanguage[]=es-la&translatedLanguage[]=en';
  if (preferredLang === 'all') {
    langParams = '';
  }

  const url = `https://api.mangadex.org/manga/${mangaId}/feed?${langParams}&order[chapter]=asc&limit=100&contentRating[]=safe&contentRating[]=suggestive`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error obteniendo capítulos: ${res.statusText}`);
  }

  const data = await res.json();
  const chapters: MangaChapterInfo[] = [];

  if (data && data.data && Array.isArray(data.data)) {
    for (const item of data.data) {
      const attrs = item.attributes || {};
      chapters.push({
        id: item.id,
        chapter: attrs.chapter || '1',
        volume: attrs.volume || undefined,
        title: attrs.title || undefined,
        language: attrs.translatedLanguage || 'es',
        pages: attrs.pages || 0,
      });
    }
  }

  // Sort logically by chapter number
  chapters.sort((a, b) => {
    const numA = parseFloat(a.chapter) || 0;
    const numB = parseFloat(b.chapter) || 0;
    return numA - numB;
  });

  return chapters;
}

export async function downloadMangaChapterToLibrary(
  manga: OnlineManga,
  chapter: MangaChapterInfo,
  onProgress?: (progress: number, statusText: string) => void
): Promise<Book> {
  onProgress?.(5, 'Conectando con el servidor MangaDex...');

  // 1. Get at-home server assignment
  const atHomeUrl = `https://api.mangadex.org/at-home/server/${chapter.id}`;
  const atHomeRes = await fetch(atHomeUrl);
  if (!atHomeRes.ok) {
    throw new Error('No se pudo acceder a las páginas de este capítulo.');
  }

  const atHomeData = await atHomeRes.json();
  const baseUrl = atHomeData.baseUrl;
  const hash = atHomeData.chapter.hash;
  // Use dataSaver for fast mobile-friendly downloads or data for high-res
  const pageFiles: string[] = atHomeData.chapter.dataSaver || atHomeData.chapter.data;

  if (!pageFiles || pageFiles.length === 0) {
    throw new Error('El capítulo no contiene páginas legibles.');
  }

  const zip = new JSZip();
  const total = pageFiles.length;

  // 2. Download all page images sequentially with live progress
  for (let i = 0; i < total; i++) {
    const pageName = pageFiles[i];
    const pageUrl = `${baseUrl}/data-saver/${hash}/${pageName}`;
    const percent = Math.round(((i + 1) / total) * 75) + 5; // 5% to 80%

    onProgress?.(percent, `Descargando página ${i + 1} de ${total}...`);

    try {
      const imgBlob = await safeFetchBlob(pageUrl);
      const filename = `page_${String(i + 1).padStart(4, '0')}.jpg`;
      zip.file(filename, imgBlob);
    } catch (err) {
      console.warn(`Error descargando página ${i + 1}:`, err);
    }
  }

  // 3. Generate CBZ archive
  onProgress?.(85, 'Comprimiendo capítulo en formato CBZ...');
  const cbzBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 4 },
  });

  // 4. Save to internal library
  onProgress?.(95, 'Guardando en la biblioteca sin conexión...');
  const safeTitle = manga.title.replace(/[\\/:*?"<>|]/g, '').trim();
  const fileName = `${safeTitle} - Cap.${chapter.chapter}.cbz`;
  const file = new File([cbzBlob], fileName, { type: 'application/vnd.comicbook+zip' });

  const imported = await importBookFile(file, ['cat-manga']);
  if (manga.description) {
    imported.description = manga.description;
    await saveBook(imported);
  }
  onProgress?.(100, '¡Capítulo descargado y listo para leer!');
  return imported;
}
