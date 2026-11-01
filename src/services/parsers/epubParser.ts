import ePub from 'epubjs';
import { createOptimizedThumbnail } from '../../utils/thumbnail';

export interface EpubMetadata {
  title?: string;
  author?: string;
  description?: string;
  coverUrl?: string;
  totalPages: number;
}

export async function parseEpubFile(buffer: ArrayBuffer): Promise<EpubMetadata> {
  const book = ePub(buffer);
  try {
    await book.ready;

    let title: string | undefined;
    let author: string | undefined;
    let description: string | undefined;
    let coverUrl: string | undefined;

    try {
      const meta = await book.loaded.metadata;
      if (meta) {
        title = meta.title || undefined;
        author = meta.creator || undefined;
        if (meta.description && typeof meta.description === 'string') {
          description = meta.description.replace(/<[^>]*>?/gm, '').trim();
        }
      }
    } catch (err) {
      console.warn('Failed to parse epub metadata', err);
    }

    try {
      const coverPath = await book.coverUrl();
      if (coverPath) {
        const optimized = await createOptimizedThumbnail(coverPath, 320, 460, 0.8);
        coverUrl = optimized || coverPath;
      }
    } catch (err) {
      console.warn('Failed to extract epub cover', err);
    }

    // Estimate pages based on spine items or set placeholder count
    let totalPages = 1;
    try {
      const spine = (book as any).spine;
      if (spine && spine.items && spine.items.length > 0) {
        totalPages = spine.items.length;
      }
    } catch {
      // fallback
    }

    return {
      title,
      author,
      description,
      coverUrl,
      totalPages: Math.max(1, totalPages),
    };
  } finally {
    try {
      book.destroy();
    } catch {}
  }
}
