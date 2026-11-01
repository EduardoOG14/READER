import JSZip from 'jszip';
import { createOptimizedThumbnail } from '../../utils/thumbnail';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.bmp', '.svg'];

export interface MangaArchive {
  totalPages: number;
  coverUrl?: string;
  imageFilenames: string[];
}

export function isImageFile(filename: string): boolean {
  const lower = filename.toLowerCase();
  if (lower.startsWith('__macosx/') || lower.includes('/.')) return false;
  return IMAGE_EXTENSIONS.some(ext => lower.endsWith(ext));
}

// Natural sort for page numbering: e.g. "page 1", "page 2", "page 10"
export function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

export async function parseMangaArchive(buffer: ArrayBuffer): Promise<MangaArchive> {
  try {
    const zip = await JSZip.loadAsync(buffer);
    const imageFiles: string[] = [];

    zip.forEach((relativePath, zipEntry) => {
      if (!zipEntry.dir && isImageFile(relativePath)) {
        imageFiles.push(relativePath);
      }
    });

    imageFiles.sort(naturalSort);

    let coverUrl: string | undefined;
    if (imageFiles.length > 0) {
      try {
        const firstImageEntry = zip.file(imageFiles[0]);
        if (firstImageEntry) {
          const imgBlob = await firstImageEntry.async('blob');
          const optimized = await createOptimizedThumbnail(imgBlob, 320, 460, 0.8);
          if (optimized && optimized.length < 100000) {
            coverUrl = optimized;
          }
        }
      } catch (e) {
        console.warn('Could not extract manga cover:', e);
      }
    }

    return {
      totalPages: Math.max(1, imageFiles.length),
      coverUrl,
      imageFilenames: imageFiles,
    };
  } catch (err) {
    console.warn('Error reading manga zip/archive:', err);
    return {
      totalPages: 1,
      coverUrl: undefined,
      imageFilenames: [],
    };
  }
}

export async function getMangaPageBlob(zipInstance: JSZip, filename: string): Promise<string> {
  const file = zipInstance.file(filename);
  if (!file) throw new Error(`Page not found: ${filename}`);
  const blob = await file.async('blob');
  return URL.createObjectURL(blob);
}


