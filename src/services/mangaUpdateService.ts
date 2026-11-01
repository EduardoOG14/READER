import JSZip from 'jszip';
import type { Book } from '../types';
import { getBookFile, saveBookFile, saveBook } from './storage';
import { isImageFile } from './parsers/mangaParser';

export interface ChapterInfo {
  id: string;
  chapter: number;
  title?: string;
  pages: number;
}

export interface MangaUpdateCheckResult {
  hasUpdates: boolean;
  mangaTitle: string;
  currentHighestChapter: number;
  totalAvailableChapters: number;
  newChapters: ChapterInfo[];
  message: string;
}

export interface UpdateDownloadProgress {
  currentChapterNum: number;
  currentChapterIndex: number;
  totalChaptersToDownload: number;
  currentPageIndex: number;
  totalPagesInChapter: number;
  percent: number;
  message: string;
}

// 1. Detect highest chapter number inside a local CBZ file
export async function getLocalHighestChapter(book: Book): Promise<number> {
  try {
    const buffer = await getBookFile(book.fileStorageKey, { id: book.id, fileName: book.fileName });
    if (!buffer) return 1;

    const zip = await JSZip.loadAsync(buffer);
    let highestChapter = 0;

    zip.forEach((path) => {
      // Look for patterns like "ch_005_..." or "cap_5_..." or "chapter_5_..."
      const match = path.match(/(?:ch|cap|chapter)[_ -]?0*(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > highestChapter) {
          highestChapter = num;
        }
      }
    });

    return highestChapter > 0 ? highestChapter : 1;
  } catch (err) {
    console.warn('[MangaUpdate] Error reading local chapters:', err);
    return 1;
  }
}

// 2. Check MangaDex for newly available Spanish chapters
export async function checkForNewEpisodes(book: Book): Promise<MangaUpdateCheckResult> {
  const cleanTitle = book.title.replace(/[\\/:*?"<>|]/g, '').trim();

  try {
    const searchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(cleanTitle)}&limit=1`;
    const searchRes = await fetch(searchUrl, { signal: AbortSignal.timeout(5000) });
    if (!searchRes.ok) {
      return {
        hasUpdates: false,
        mangaTitle: cleanTitle,
        currentHighestChapter: 1,
        totalAvailableChapters: 0,
        newChapters: [],
        message: 'No se pudo conectar con el servidor de mangas.',
      };
    }

    const searchData = await searchRes.json();
    const manga = searchData?.data?.[0];
    if (!manga) {
      return {
        hasUpdates: false,
        mangaTitle: cleanTitle,
        currentHighestChapter: 1,
        totalAvailableChapters: 0,
        newChapters: [],
        message: `«${cleanTitle}» no está registrado en el repositorio de MangaDex.`,
      };
    }

    // Fetch Spanish chapters
    const feedUrl = `https://api.mangadex.org/manga/${manga.id}/feed?translatedLanguage[]=es&translatedLanguage[]=es-la&includeEmptyPages=0&includeExternalUrl=0&order[chapter]=asc&limit=100`;
    const feedRes = await fetch(feedUrl, { signal: AbortSignal.timeout(6000) });
    if (!feedRes.ok) {
      return {
        hasUpdates: false,
        mangaTitle: cleanTitle,
        currentHighestChapter: 1,
        totalAvailableChapters: 0,
        newChapters: [],
        message: 'No se pudieron consultar los episodios disponibles.',
      };
    }

    const feedData = await feedRes.json();
    const chaptersList = feedData?.data || [];

    // Group and de-duplicate unique chapters
    const uniqueChapters = new Map<number, ChapterInfo>();
    for (const ch of chaptersList) {
      const chNum = parseFloat(ch.attributes.chapter);
      if (!isNaN(chNum)) {
        const pages = ch.attributes.pages || 0;
        if (!uniqueChapters.has(chNum) || pages > (uniqueChapters.get(chNum)?.pages || 0)) {
          uniqueChapters.set(chNum, {
            id: ch.id,
            chapter: chNum,
            title: ch.attributes.title || `Capítulo ${chNum}`,
            pages,
          });
        }
      }
    }

    const sortedChapterNums = Array.from(uniqueChapters.keys()).sort((a, b) => a - b);
    const localHighest = await getLocalHighestChapter(book);

    // Filter chapters strictly greater than local highest chapter
    const newChapters = sortedChapterNums
      .filter(n => n > localHighest)
      .map(n => uniqueChapters.get(n)!);

    const hasUpdates = newChapters.length > 0;
    const message = hasUpdates
      ? `¡Se encontraron ${newChapters.length} episodios nuevos listos para descargar!`
      : `Tu manga ya está al día. Tienes hasta el capítulo ${localHighest}.`;

    return {
      hasUpdates,
      mangaTitle: cleanTitle,
      currentHighestChapter: localHighest,
      totalAvailableChapters: sortedChapterNums.length,
      newChapters,
      message,
    };
  } catch (err: any) {
    console.error('[MangaUpdate] Error checking for episodes:', err);
    return {
      hasUpdates: false,
      mangaTitle: cleanTitle,
      currentHighestChapter: 1,
      totalAvailableChapters: 0,
      newChapters: [],
      message: err.message || 'Error de conexión al buscar episodios.',
    };
  }
}

// 3. Download and merge new episodes into the existing CBZ archive
export async function downloadAndMergeNewEpisodes(
  book: Book,
  newChapters: ChapterInfo[],
  onProgress?: (p: UpdateDownloadProgress) => void
): Promise<{ updatedBook: Book; addedPages: number }> {
  const buffer = await getBookFile(book.fileStorageKey, { id: book.id, fileName: book.fileName });
  if (!buffer) {
    throw new Error('No se pudo cargar el archivo local del manga para actualizar.');
  }

  const zip = await JSZip.loadAsync(buffer);
  let totalAddedPages = 0;
  const totalChaptersToDownload = newChapters.length;

  for (let chIdx = 0; chIdx < newChapters.length; chIdx++) {
    const ch = newChapters[chIdx];
    const chNum = ch.chapter;

    // Report starting chapter
    onProgress?.({
      currentChapterNum: chNum,
      currentChapterIndex: chIdx + 1,
      totalChaptersToDownload,
      currentPageIndex: 0,
      totalPagesInChapter: ch.pages,
      percent: Math.round((chIdx / totalChaptersToDownload) * 100),
      message: `Conectando con episodio ${chNum} (${chIdx + 1} de ${totalChaptersToDownload})...`,
    });

    try {
      const atHomeRes = await fetch(`https://api.mangadex.org/at-home/server/${ch.id}`, {
        signal: AbortSignal.timeout(6000),
      });
      if (!atHomeRes.ok) continue;

      const atHomeData = await atHomeRes.json();
      const pageFiles: string[] = atHomeData?.chapter?.dataSaver || atHomeData?.chapter?.data || [];

      for (let pIdx = 0; pIdx < pageFiles.length; pIdx++) {
        const file = pageFiles[pIdx];
        const pageUrl = `${atHomeData.baseUrl}/data-saver/${atHomeData.chapter.hash}/${file}`;

        const pageRes = await fetch(pageUrl, { signal: AbortSignal.timeout(5000) });
        if (pageRes.ok) {
          const blob = await pageRes.blob();
          const ext = file.split('.').pop() || 'jpg';
          const paddedCh = String(Math.floor(chNum)).padStart(3, '0');
          const paddedPage = String(pIdx + 1).padStart(3, '0');
          const entryName = `ch_${paddedCh}_p${paddedPage}.${ext}`;

          zip.file(entryName, blob);
          totalAddedPages++;
        }

        const chapterProgress = (pIdx + 1) / Math.max(1, pageFiles.length);
        const overallPercent = Math.round(
          ((chIdx + chapterProgress) / totalChaptersToDownload) * 100
        );

        onProgress?.({
          currentChapterNum: chNum,
          currentChapterIndex: chIdx + 1,
          totalChaptersToDownload,
          currentPageIndex: pIdx + 1,
          totalPagesInChapter: pageFiles.length,
          percent: overallPercent,
          message: `Descargando episodio ${chNum}: pág. ${pIdx + 1} de ${pageFiles.length} (${overallPercent}%)...`,
        });
      }
    } catch (e) {
      console.warn(`[MangaUpdate] Error downloading chapter ${chNum}:`, e);
    }
  }

  // Generate updated CBZ
  onProgress?.({
    currentChapterNum: 0,
    currentChapterIndex: totalChaptersToDownload,
    totalChaptersToDownload,
    currentPageIndex: 0,
    totalPagesInChapter: 0,
    percent: 98,
    message: 'Consolidando archivo y guardando en almacenamiento local...',
  });

  const updatedBlob = await zip.generateAsync({ type: 'blob' });

  // Count total pages in zip
  let newTotalPages = 0;
  zip.forEach((path, entry) => {
    if (!entry.dir && isImageFile(path)) {
      newTotalPages++;
    }
  });

  // Save updated file in IndexedDB / Filesystem
  await saveBookFile(book.id, book.fileName, updatedBlob);

  // Update book metadata
  const updatedBook: Book = {
    ...book,
    totalPages: Math.max(1, newTotalPages),
    fileSize: updatedBlob.size,
  };

  await saveBook(updatedBook);

  onProgress?.({
    currentChapterNum: 0,
    currentChapterIndex: totalChaptersToDownload,
    totalChaptersToDownload,
    currentPageIndex: 0,
    totalPagesInChapter: 0,
    percent: 100,
    message: `¡Actualización completada! Se añadieron ${totalAddedPages} páginas nuevas.`,
  });

  return { updatedBook, addedPages: totalAddedPages };
}
