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
          const rawBlob = await firstImageEntry.async('blob');
          // Fix MIME type for SVG files (Android WebView requires correct MIME)
          const firstName = imageFiles[0].toLowerCase();
          const isSvg = firstName.endsWith('.svg');
          const imgBlob = isSvg && (!rawBlob.type || rawBlob.type === 'application/octet-stream')
            ? new Blob([rawBlob], { type: 'image/svg+xml' })
            : rawBlob;
          const optimized = await createOptimizedThumbnail(imgBlob, 900, 1350, 0.9);
          if (optimized) {
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
  const rawBlob = await file.async('blob');
  // Ensure correct MIME type so SVG and other formats render in Android WebView
  const lower = filename.toLowerCase();
  const mime = lower.endsWith('.svg')
    ? 'image/svg+xml'
    : lower.endsWith('.webp')
    ? 'image/webp'
    : lower.endsWith('.png')
    ? 'image/png'
    : lower.endsWith('.gif')
    ? 'image/gif'
    : 'image/jpeg';
  const blob = rawBlob.type && rawBlob.type !== 'application/octet-stream'
    ? rawBlob
    : new Blob([rawBlob], { type: mime });
  return URL.createObjectURL(blob);
}


