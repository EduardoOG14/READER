import type { CatalogItem } from './catalogData';
import { importBookFile } from './bookImporter';

export interface QueueItem {
  id: string;
  item: CatalogItem;
  status: 'pending' | 'downloading' | 'completed' | 'error';
  error?: string;
  progressPercent: number;
}

type QueueListener = (status: QueueState) => void;

export interface QueueState {
  activeItem: QueueItem | null;
  pendingItems: QueueItem[];
  completedCount: number;
  totalCount: number;
  isProcessing: boolean;
  lastCompletedItem?: CatalogItem;
}

class DownloadQueueService {
  private queue: QueueItem[] = [];
  private completedCount = 0;
  private totalCount = 0;
  private isProcessing = false;
  private listeners: Set<QueueListener> = new Set();
  private onLibraryRefreshNeeded?: () => Promise<any>;

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
    return {
      activeItem,
      pendingItems,
      completedCount: this.completedCount,
      totalCount: this.totalCount,
      isProcessing: this.isProcessing,
      lastCompletedItem: this.queue.find(q => q.status === 'completed')?.item,
    };
  }

  public isItemQueued(itemId: string): boolean {
    return this.queue.some(q => q.item.id === itemId && (q.status === 'pending' || q.status === 'downloading'));
  }

  public enqueue(item: CatalogItem) {
    if (this.isItemQueued(item.id)) return;

    this.totalCount++;
    this.queue.push({
      id: `${item.id}_${Date.now()}`,
      item,
      status: 'pending',
      progressPercent: 0,
    });

    this.notify();
    this.processNext();
  }

  private async processNext() {
    if (this.isProcessing) return;

    const next = this.queue.find(q => q.status === 'pending');
    if (!next) {
      if (this.queue.every(q => q.status === 'completed' || q.status === 'error')) {
        // Reset counters once all done
        if (this.totalCount > 0 && this.completedCount === this.totalCount) {
          setTimeout(() => {
            this.totalCount = 0;
            this.completedCount = 0;
            this.queue = [];
            this.notify();
          }, 3500);
        }
      }
      return;
    }

    this.isProcessing = true;
    next.status = 'downloading';
    next.progressPercent = 15;
    this.notify();

    try {
      next.progressPercent = 40;
      this.notify();

      // 1. Generate local file (EPUB or CBZ)
      const file = await next.item.createFile();

      next.progressPercent = 75;
      this.notify();

      // 2. Import into user's library
      await importBookFile(file, [
        next.item.category !== 'libros' ? 'cat-manga' : 'cat-books',
      ]);

      next.progressPercent = 100;
      next.status = 'completed';
      this.completedCount++;

      if (this.onLibraryRefreshNeeded) {
        await this.onLibraryRefreshNeeded();
      }
    } catch (err: any) {
      console.error(`[DownloadQueue] Error downloading ${next.item.title}:`, err);
      next.status = 'error';
      next.error = err.message || 'Error al guardar archivo';
    } finally {
      this.isProcessing = false;
      this.notify();
      this.processNext();
    }
  }
}

export const downloadQueue = new DownloadQueueService();
