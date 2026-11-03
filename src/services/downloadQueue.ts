import JSZip from 'jszip';
import type { CatalogItem } from './catalogData';
import { importBookFile } from './bookImporter';
import { subscribeDownloadProgress } from './catalog/generators';
import { fetchOfficialCoverUrl, fetchCoverBlob } from './coverFetcher';
import { getAllBooks } from './storage';
import { downloadAndMergeNewEpisodes, type ChapterInfo } from './mangaUpdateService';
import { httpGetJson, httpGetBlob } from './httpClient';
import type { Book } from '../types';

export interface QueueItem {
  id: string;
  item: CatalogItem;
  selectedChapters?: ChapterInfo[];
  status: 'pending' | 'downloading' | 'completed' | 'error';
  error?: string;
  progressPercent: number;
  progressMessage?: string;
  totalChapters?: number;
  completedChapters?: number;
  addedAt: number;
}

export interface QueueState {
  activeItem: QueueItem | null;
  pendingItems: QueueItem[];
  completedItems: QueueItem[];
  errorItems: QueueItem[];
  items: QueueItem[];
  completedCount: number;
  totalCount: number;
  isProcessing: boolean;
  lastCompletedItem?: CatalogItem;
}

type QueueListener = (status: QueueState) => void;

class DownloadQueueService {
  private queue: QueueItem[] = [];
  private isProcessing = false;
  private listeners: Set<QueueListener> = new Set();
  private onLibraryRefreshNeeded?: () => Promise<any>;
  private isCancelledMap: Map<string, boolean> = new Map();

  constructor() {
    subscribeDownloadProgress((_title, message, percent) => {
      const active = this.queue.find(q => q.status === 'downloading');
      if (active && (!active.selectedChapters || active.selectedChapters.length === 0)) {
        active.progressMessage = message;
        active.progressPercent = Math.max(active.progressPercent, percent);
        this.notify();
      }
    });
  }

  public setRefreshHandler(handler: () => Promise<any>) {
    this.onLibraryRefreshNeeded = handler;
  }

  public subscribe(listener: QueueListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach(l => {
      try {
        l(state);
      } catch (e) {
        console.error('[DownloadQueue] Listener error:', e);
      }
    });
  }

  public getState(): QueueState {
    const activeItem = this.queue.find(q => q.status === 'downloading') || null;
    const pendingItems = this.queue.filter(q => q.status === 'pending');
    const completedItems = this.queue.filter(q => q.status === 'completed');
    const errorItems = this.queue.filter(q => q.status === 'error');

    return {
      activeItem,
      pendingItems,
      completedItems,
      errorItems,
      items: [...this.queue],
      completedCount: completedItems.length,
      totalCount: this.queue.length,
      isProcessing: this.isProcessing,
      lastCompletedItem: completedItems[completedItems.length - 1]?.item,
    };
  }

  public isItemQueued(itemId: string): boolean {
    return this.queue.some(
      q => q.item.id === itemId && (q.status === 'pending' || q.status === 'downloading')
    );
  }

  public enqueue(item: CatalogItem, selectedChapters?: ChapterInfo[]): string {
    const existing = this.queue.find(
      q => q.item.id === item.id && (q.status === 'pending' || q.status === 'downloading')
    );
    if (existing) {
      if (selectedChapters && selectedChapters.length > 0) {
        existing.selectedChapters = selectedChapters;
        existing.totalChapters = selectedChapters.length;
        this.notify();
      }
      return existing.id;
    }

    const id = `${item.id}_${Date.now()}`;
    this.isCancelledMap.set(id, false);

    this.queue.push({
      id,
      item,
      selectedChapters,
      status: 'pending',
      progressPercent: 0,
      totalChapters: selectedChapters?.length || 1,
      completedChapters: 0,
      addedAt: Date.now(),
    });

    this.notify();
    this.processNext();
    return id;
  }

  public cancel(id: string) {
    this.isCancelledMap.set(id, true);
    const item = this.queue.find(q => q.id === id);
    if (!item) return;

    if (item.status === 'pending') {
      this.queue = this.queue.filter(q => q.id !== id);
    } else if (item.status === 'downloading') {
      item.status = 'error';
      item.error = 'Descarga cancelada por el usuario';
    }
    this.notify();
  }

  public retry(id: string) {
    const item = this.queue.find(q => q.id === id);
    if (!item) return;
    this.isCancelledMap.set(id, false);
    item.status = 'pending';
    item.error = undefined;
    item.progressPercent = 0;
    item.progressMessage = 'Reintentando...';
    this.notify();
    this.processNext();
  }

  public clearCompleted() {
    this.queue = this.queue.filter(q => q.status !== 'completed');
    this.notify();
  }

  public remove(id: string) {
    this.queue = this.queue.filter(q => q.id !== id);
    this.notify();
  }

  private async processNext() {
    if (this.isProcessing) return;

    const next = this.queue.find(q => q.status === 'pending');
    if (!next) return;

    if (this.isCancelledMap.get(next.id)) {
      next.status = 'error';
      next.error = 'Descarga cancelada';
      this.notify();
      return;
    }

    this.isProcessing = true;
    next.status = 'downloading';
    next.progressPercent = 10;
    next.progressMessage = 'Iniciando descarga...';
    this.notify();

    try {
      const isManga = next.item.category === 'manga' || next.item.category === 'manhwa';

      // 1. Fetch real official cover in parallel
      let officialCoverUrl: string | null = null;
      try {
        officialCoverUrl = await fetchOfficialCoverUrl(
          next.item.title,
          next.item.author,
          next.item.category
        );
      } catch {}

      if (this.isCancelledMap.get(next.id)) throw new Error('Descarga cancelada');

      // 2. Check if the user already has this book in the local library
      const existingBooks = await getAllBooks();
      const existingBook = existingBooks.find(
        (b: Book) =>
          b.title.trim().toLowerCase() === next.item.title.trim().toLowerCase() ||
          b.id === next.item.id
      );

      if (isManga && next.selectedChapters && next.selectedChapters.length > 0) {
        // --- Custom selected chapters download ---
        if (existingBook) {
          // Merge chapters into existing book
          next.progressMessage = `Descargando ${next.selectedChapters.length} episodios seleccionados...`;
          next.progressPercent = 20;
          this.notify();

          await downloadAndMergeNewEpisodes(
            existingBook,
            next.selectedChapters,
            progress => {
              if (this.isCancelledMap.get(next.id)) return;
              next.progressPercent = Math.max(next.progressPercent, progress.percent);
              next.progressMessage = progress.message;
              next.completedChapters = progress.currentChapterIndex;
              this.notify();
            }
          );
        } else {
          // Create new CBZ with selected chapters
          await this.downloadNewMangaWithChapters(next, officialCoverUrl);
        }
      } else {
        // --- Standard Book or Full Default Generation ---
        next.progressPercent = 35;
        next.progressMessage = 'Generando archivo íntegro...';
        this.notify();

        if (!next.item.createFile) {
          throw new Error('No se encontró función de creación para esta obra.');
        }

        const file = await next.item.createFile((msg, pct) => {
          if (this.isCancelledMap.get(next.id)) return;
          next.progressMessage = msg;
          next.progressPercent = Math.max(next.progressPercent, pct);
          this.notify();
        });

        if (this.isCancelledMap.get(next.id)) throw new Error('Descarga cancelada');

        next.progressPercent = 85;
        next.progressMessage = 'Guardando en tu biblioteca local...';
        this.notify();

        await importBookFile(
          file,
          [next.item.category !== 'libros' ? 'cat-manga' : 'cat-books'],
          {
            title: next.item.title,
            author: next.item.author,
            description: next.item.description,
            coverUrl: officialCoverUrl || undefined,
          }
        );
      }

      if (this.isCancelledMap.get(next.id)) throw new Error('Descarga cancelada');

      next.progressPercent = 100;
      next.status = 'completed';
      next.progressMessage = '¡Descarga completada con éxito!';

      if (this.onLibraryRefreshNeeded) {
        await this.onLibraryRefreshNeeded();
      }
    } catch (err: any) {
      console.error(`[DownloadQueue] Error downloading ${next.item.title}:`, err);
      next.status = 'error';
      next.error = err.message || 'Error en la descarga';
      next.progressMessage = `Error: ${next.error}`;
    } finally {
      this.isProcessing = false;
      this.notify();
      this.processNext();
    }
  }

  private async downloadNewMangaWithChapters(queueItem: QueueItem, officialCoverUrl: string | null) {
    const zip = new JSZip();
    const chapters = queueItem.selectedChapters || [];
    const totalChapters = chapters.length;

    // Attach official cover
    if (officialCoverUrl) {
      try {
        const coverBlob = await fetchCoverBlob(officialCoverUrl);
        if (coverBlob) {
          zip.file('000_portada.jpg', coverBlob);
        }
      } catch {}
    }

    for (let chIdx = 0; chIdx < totalChapters; chIdx++) {
      if (this.isCancelledMap.get(queueItem.id)) throw new Error('Descarga cancelada');

      const ch = chapters[chIdx];
      const chNum = ch.chapter;
      const chapterBasePercent = Math.round((chIdx / totalChapters) * 70) + 15;

      queueItem.progressMessage = `Conectando con capítulo ${chNum} (${chIdx + 1} de ${totalChapters})...`;
      queueItem.progressPercent = chapterBasePercent;
      queueItem.completedChapters = chIdx;
      this.notify();

      try {
        const atHomeData = await httpGetJson(`https://api.mangadex.org/at-home/server/${ch.id}`, {
          timeoutMs: 15000,
        });

        const pageFiles: string[] =
          atHomeData?.chapter?.dataSaver || atHomeData?.chapter?.data || [];

        const CONCURRENCY = 3;
        for (let i = 0; i < pageFiles.length; i += CONCURRENCY) {
          if (this.isCancelledMap.get(queueItem.id)) throw new Error('Descarga cancelada');

          const chunk = pageFiles.slice(i, i + CONCURRENCY);
          await Promise.all(
            chunk.map(async (file, cIdx) => {
              const pIdx = i + cIdx;
              const pUrl = `${atHomeData.baseUrl}/data-saver/${atHomeData.chapter.hash}/${file}`;
              try {
                const blob = await httpGetBlob(pUrl, { timeoutMs: 15000 });
                if (blob && blob.size > 500) {
                  const ext = file.split('.').pop() || 'jpg';
                  const paddedCh = String(Math.floor(chNum)).padStart(4, '0');
                  const paddedPage = String(pIdx + 1).padStart(3, '0');
                  zip.file(`ch_${paddedCh}_p${paddedPage}.${ext}`, blob);
                }
              } catch {}
            })
          );

          const subProgress = Math.min(1, (i + CONCURRENCY) / Math.max(1, pageFiles.length));
          const overallPct = Math.round(((chIdx + subProgress) / totalChapters) * 75) + 15;
          queueItem.progressPercent = overallPct;
          queueItem.progressMessage = `Descargando cap. ${chNum}: pág. ${Math.min(pageFiles.length, i + CONCURRENCY)} de ${pageFiles.length}...`;
          this.notify();

          await new Promise(r => setTimeout(r, 50));
        }
      } catch (e) {
        console.warn(`[DownloadQueue] Error in chapter ${chNum}:`, e);
      }
    }

    queueItem.progressPercent = 92;
    queueItem.progressMessage = 'Empaquetando archivo de lectura...';
    this.notify();

    const cbzBlob = await zip.generateAsync({ type: 'blob' });
    const file = new File([cbzBlob], `${queueItem.item.title}.cbz`, { type: 'application/x-cbz' });

    queueItem.progressPercent = 96;
    queueItem.progressMessage = 'Guardando en la biblioteca...';
    this.notify();

    await importBookFile(
      file,
      ['cat-manga'],
      {
        title: queueItem.item.title,
        author: queueItem.item.author,
        description: queueItem.item.description,
        coverUrl: officialCoverUrl || undefined,
      }
    );
  }
}

export const downloadQueue = new DownloadQueueService();
