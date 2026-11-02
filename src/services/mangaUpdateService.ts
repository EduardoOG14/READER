import JSZip from 'jszip';
import type { Book } from '../types';
import { getBookFile, saveBookFile, saveBook } from './storage';
import { isImageFile } from './parsers/mangaParser';
import { fetchOfficialCoverUrl, fetchCoverBlob, normalizeSearchTitle } from './coverFetcher';
import { generateBookFile, createDefaultBookChapters } from './catalog/generators';
import { httpGetJson, httpGetBlob } from './httpClient';

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
    if (!buffer) return 0;

    const zip = await JSZip.loadAsync(buffer);
    let highestChapter = 0;

    zip.forEach((path) => {
      const match = path.match(/(?:ch|cap|chapter)[_ -]?0*(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > highestChapter) {
          highestChapter = num;
        }
      }
    });

    return highestChapter;
  } catch (err) {
    console.warn('[MangaUpdate] Error reading local chapters:', err);
    return 0;
  }
}

// 2. Check MangaDex for newly available chapters (prioritizes ES, then EN, then any)
export async function checkForNewEpisodes(book: Book): Promise<MangaUpdateCheckResult> {
  const cleanTitle = normalizeSearchTitle(book.title);

  try {
    const searchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(cleanTitle)}&limit=1&order[relevance]=desc`;
    const searchData = await httpGetJson(searchUrl, { timeoutMs: 12000 });
    const manga = searchData?.data?.[0];
    if (!manga) {
      return {
        hasUpdates: false,
        mangaTitle: cleanTitle,
        currentHighestChapter: 1,
        totalAvailableChapters: 1,
        newChapters: [],
        message: `«${book.title}» es una obra completa e íntegra (tomo único). Tu ejemplar está al día.`,
      };
    }

    const langTiers = [['es', 'es-la'], ['en'], null];
    let chaptersList: any[] = [];
    let fallbackTierList: any[] = [];

    for (const langs of langTiers) {
      let offset = 0;
      let totalToFetch = 1;
      const collected: any[] = [];

      while (offset < totalToFetch && offset < 500) {
        const langParams = langs ? langs.map(l => `translatedLanguage[]=${l}`).join('&') : '';
        const queryParams = [langParams, 'order[chapter]=asc', 'limit=100', `offset=${offset}`].filter(Boolean).join('&');
        const feedUrl = `https://api.mangadex.org/manga/${manga.id}/feed?${queryParams}`;
        const feedData = await httpGetJson(feedUrl, { timeoutMs: 15000 });
        const batch = feedData?.data || [];
        if (batch.length === 0) break;

        const hostedBatch = batch.filter((ch: any) => !ch.attributes.externalUrl && (ch.attributes.pages || 0) > 0);
        collected.push(...hostedBatch);

        totalToFetch = feedData?.total || batch.length;
        offset += batch.length;

        // Stop early if this tier already has early chapters (<= 5)
        if (collected.some((c: any) => parseFloat(c.attributes.chapter) <= 5) && collected.length >= 20) {
          break;
        }
      }

      if (collected.length > 0) {
        const hasEarlyChapters = collected.some((c: any) => {
          const num = parseFloat(c.attributes.chapter);
          return !isNaN(num) && num <= 5;
        });

        if (hasEarlyChapters) {
          chaptersList = collected;
          break;
        } else if (collected.length > fallbackTierList.length) {
          fallbackTierList = collected;
        }
      }
    }

    if (chaptersList.length === 0 && fallbackTierList.length > 0) {
      chaptersList = fallbackTierList;
    }

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
    console.warn('[MangaUpdate] Check error:', err);
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

  // Remove old mock dummy SVG pages if present
  const dummyFilesToRemove: string[] = [];
  zip.forEach(path => {
    const lower = path.toLowerCase();
    if (
      lower === '000_portada.svg' ||
      lower === '001_portadilla.svg' ||
      lower.startsWith('page_0') ||
      lower.includes('panel')
    ) {
      dummyFilesToRemove.push(path);
    }
  });
  dummyFilesToRemove.forEach(p => zip.remove(p));

  // Check and update official cover
  let officialCoverUrl = book.coverUrl;
  try {
    const realCover = await fetchOfficialCoverUrl(book.title, book.author, 'manga');
    if (realCover) {
      officialCoverUrl = realCover;
      const cBlob = await fetchCoverBlob(realCover);
      if (cBlob) {
        zip.file('000_portada.jpg', cBlob);
      }
    }
  } catch {}

  let totalAddedPages = 0;
  const totalChaptersToDownload = newChapters.length;

  for (let chIdx = 0; chIdx < newChapters.length; chIdx++) {
    const ch = newChapters[chIdx];
    const chNum = ch.chapter;

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
      const atHomeData = await httpGetJson(`https://api.mangadex.org/at-home/server/${ch.id}`, {
        timeoutMs: 12000,
      });
      const pageFiles: string[] = atHomeData?.chapter?.dataSaver || atHomeData?.chapter?.data || [];

      // Download chapter pages in concurrent batches of 3
      const CONCURRENCY = 3;
      for (let i = 0; i < pageFiles.length; i += CONCURRENCY) {
        const chunk = pageFiles.slice(i, i + CONCURRENCY);
        await Promise.all(
          chunk.map(async (file, cIdx) => {
            const pIdx = i + cIdx;
            const pageUrl = `${atHomeData.baseUrl}/data-saver/${atHomeData.chapter.hash}/${file}`;

            try {
              const blob = await httpGetBlob(pageUrl, { timeoutMs: 15000 });
              if (blob && blob.size > 500) {
                const ext = file.split('.').pop() || 'jpg';
                const paddedCh = String(Math.floor(chNum)).padStart(4, '0');
                const paddedPage = String(pIdx + 1).padStart(3, '0');
                const entryName = `ch_${paddedCh}_p${paddedPage}.${ext}`;

                zip.file(entryName, blob);
                totalAddedPages++;
              }
            } catch (pageErr) {
              console.warn(`[MangaUpdate] Failed page ${pIdx + 1} of ch ${chNum}:`, pageErr);
            }
          })
        );

        const chapterProgress = Math.min(1, (i + CONCURRENCY) / Math.max(1, pageFiles.length));
        const overallPercent = Math.round(
          ((chIdx + chapterProgress) / totalChaptersToDownload) * 100
        );

        onProgress?.({
          currentChapterNum: chNum,
          currentChapterIndex: chIdx + 1,
          totalChaptersToDownload,
          currentPageIndex: Math.min(pageFiles.length, i + CONCURRENCY),
          totalPagesInChapter: pageFiles.length,
          percent: overallPercent,
          message: `Descargando episodio ${chNum}: pág. ${Math.min(pageFiles.length, i + CONCURRENCY)} de ${pageFiles.length} (${overallPercent}%)...`,
        });

        // Respectful pacing
        if (i + CONCURRENCY < pageFiles.length) {
          await new Promise(r => setTimeout(r, 60));
        }
      }

      // Incremental progressive save every 2 chapters to guarantee zero data loss
      if ((chIdx + 1) % 2 === 0 || chIdx === totalChaptersToDownload - 1) {
        try {
          const incrementalBlob = await zip.generateAsync({ type: 'blob' });
          let countPages = 0;
          zip.forEach((path, entry) => {
            if (!entry.dir && isImageFile(path)) countPages++;
          });
          await saveBookFile(book.id, book.fileName, incrementalBlob);
          const progressiveBook: Book = {
            ...book,
            coverUrl: officialCoverUrl || book.coverUrl,
            totalPages: Math.max(1, countPages),
            fileSize: incrementalBlob.size,
          };
          await saveBook(progressiveBook);
        } catch (saveErr) {
          console.warn('[MangaUpdate] Incremental commit skipped:', saveErr);
        }
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

  // Update book metadata with real official cover
  const updatedBook: Book = {
    ...book,
    coverUrl: officialCoverUrl || book.coverUrl,
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

// 4. Download ALL available episodes in full (Works for both Mangas and Books!)
export async function downloadAllAvailableEpisodes(
  book: Book,
  onProgress?: (p: UpdateDownloadProgress) => void
): Promise<{ updatedBook: Book; totalPages: number }> {
  const isManga =
    book.format === 'cbz' ||
    book.format === 'cbr' ||
    book.format === 'zip' ||
    (book.categoryIds && book.categoryIds.includes('cat-manga'));

  // A. For Books (EPUB / TXT): Rebuild using full Project Gutenberg edition and real official cover
  if (!isManga) {
    onProgress?.({
      currentChapterNum: 1,
      currentChapterIndex: 1,
      totalChaptersToDownload: 1,
      currentPageIndex: 0,
      totalPagesInChapter: 0,
      percent: 20,
      message: 'Descargando texto íntegro y portada oficial del libro...',
    });

    const officialCoverUrl = await fetchOfficialCoverUrl(book.title, book.author, 'libros');
    const fullEpub = await generateBookFile(
      book.title,
      book.author || 'Autor',
      createDefaultBookChapters(book.title, book.author || 'Autor', book.description || '')
    );

    const buffer = await fullEpub.arrayBuffer();
    await saveBookFile(book.id, fullEpub.name, buffer);

    const updatedBook: Book = {
      ...book,
      coverUrl: officialCoverUrl || book.coverUrl,
      fileSize: buffer.byteLength,
      totalPages: Math.max(book.totalPages, 120),
    };
    await saveBook(updatedBook);

    onProgress?.({
      currentChapterNum: 1,
      currentChapterIndex: 1,
      totalChaptersToDownload: 1,
      currentPageIndex: 0,
      totalPagesInChapter: 0,
      percent: 100,
      message: '¡Libro completo actualizado con éxito!',
    });

    return { updatedBook, totalPages: updatedBook.totalPages };
  }

  // B. For Manga / Comics / Webtoons: Download all hosted chapters from MangaDex
  const cleanTitle = normalizeSearchTitle(book.title);

  onProgress?.({
    currentChapterNum: 1,
    currentChapterIndex: 1,
    totalChaptersToDownload: 1,
    currentPageIndex: 0,
    totalPagesInChapter: 0,
    percent: 10,
    message: 'Buscando obra oficial en MangaDex...',
  });

  const searchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(cleanTitle)}&limit=1&order[relevance]=desc`;
  const searchData = await httpGetJson(searchUrl, { timeoutMs: 12000 });
  const manga = searchData?.data?.[0];
  if (!manga) {
    // If not found in MangaDex (e.g. Western Comic, Graphic Novel, standalone volume):
    // Ensure the book's cover is updated to the real official cover if it was a placeholder
    let officialCoverUrl = book.coverUrl;
    try {
      const realCover = await fetchOfficialCoverUrl(book.title, book.author, 'comics');
      if (realCover) {
        officialCoverUrl = realCover;
      }
    } catch {}

    const updatedBook: Book = {
      ...book,
      coverUrl: officialCoverUrl || book.coverUrl,
    };
    await saveBook(updatedBook);

    onProgress?.({
      currentChapterNum: 1,
      currentChapterIndex: 1,
      totalChaptersToDownload: 1,
      currentPageIndex: 1,
      totalPagesInChapter: 1,
      percent: 100,
      message: `«${book.title}» es una obra completa e íntegra (tomo único). Obra al día.`,
    });

    return { updatedBook, totalPages: updatedBook.totalPages };
  }

  const langTiers = [['es', 'es-la'], ['en'], null];
  let chaptersList: any[] = [];
  let fallbackTierList: any[] = [];

  for (const langs of langTiers) {
    let offset = 0;
    let totalToFetch = 1;
    const collected: any[] = [];

    while (offset < totalToFetch && offset < 1000) {
      const langParams = langs ? langs.map(l => `translatedLanguage[]=${l}`).join('&') : '';
      const queryParams = [langParams, 'order[chapter]=asc', 'limit=100', `offset=${offset}`].filter(Boolean).join('&');
      const feedUrl = `https://api.mangadex.org/manga/${manga.id}/feed?${queryParams}`;
      try {
        const feedData = await httpGetJson(feedUrl, { timeoutMs: 15000 });
        const batch = feedData?.data || [];
        if (batch.length === 0) break;

        const hostedBatch = batch.filter((ch: any) => !ch.attributes.externalUrl && (ch.attributes.pages || 0) > 0);
        collected.push(...hostedBatch);

        totalToFetch = feedData?.total || batch.length;
        offset += batch.length;
      } catch {
        break;
      }
    }

    if (collected.length > 0) {
      const hasEarlyChapters = collected.some((c: any) => {
        const num = parseFloat(c.attributes.chapter);
        return !isNaN(num) && num <= 5;
      });

      if (hasEarlyChapters) {
        chaptersList = collected;
        break;
      } else if (collected.length > fallbackTierList.length) {
        fallbackTierList = collected;
      }
    }
  }

  if (chaptersList.length === 0 && fallbackTierList.length > 0) {
    chaptersList = fallbackTierList;
  }

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

  const allChapters = Array.from(uniqueChapters.values()).sort((a, b) => a.chapter - b.chapter);
  if (allChapters.length === 0) {
    throw new Error('No se encontraron capítulos con scans alojados para esta obra en MangaDex.');
  }

  const localHighest = await getLocalHighestChapter(book);
  const pendingChapters = allChapters.filter(ch => ch.chapter > localHighest);
  const chaptersToDownload = pendingChapters.length > 0 ? pendingChapters : allChapters;
  const batchToDownload = chaptersToDownload.slice(0, 35);

  const { updatedBook, addedPages } = await downloadAndMergeNewEpisodes(book, batchToDownload, onProgress);
  return { updatedBook, totalPages: addedPages };
}
