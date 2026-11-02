/**
 * Creates an optimized, compressed JPEG thumbnail for book and manga covers.
 * Fits within maxWidth x maxHeight (default 320x460) with 0.8 JPEG quality.
 * Resulting data URLs are ~25-45 KB instead of megabytes, allowing safe
 * storage across IndexedDB, localStorage, and Capacitor Preferences.
 */
export async function createOptimizedThumbnail(
  source: Blob | string,
  maxWidth = 900,
  maxHeight = 1350,
  quality = 0.9
): Promise<string> {
  return new Promise((resolve) => {
    try {
      if (!source) {
        resolve('');
        return;
      }

      // If it's already an SVG data URL, SVG is lightweight (~1-2KB), keep it
      if (typeof source === 'string' && source.startsWith('data:image/svg+xml')) {
        resolve(source);
        return;
      }

      let src = '';
      let isCreatedUrl = false;

      if (typeof source === 'string') {
        src = source;
      } else {
        src = URL.createObjectURL(source);
        isCreatedUrl = true;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const width = img.naturalWidth || img.width;
          const height = img.naturalHeight || img.height;

          if (width <= 0 || height <= 0) {
            if (isCreatedUrl) URL.revokeObjectURL(src);
            resolve(typeof source === 'string' ? source : '');
            return;
          }

          // Calculate aspect ratio preserving dimensions
          const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
          const targetW = Math.max(1, Math.round(width * ratio));
          const targetH = Math.max(1, Math.round(height * ratio));

          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            if (isCreatedUrl) URL.revokeObjectURL(src);
            resolve(typeof source === 'string' ? source : '');
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetW, targetH);

          const thumbDataUrl = canvas.toDataURL('image/jpeg', quality);
          if (isCreatedUrl) URL.revokeObjectURL(src);
          resolve(thumbDataUrl);
        } catch {
          if (isCreatedUrl) URL.revokeObjectURL(src);
          resolve(typeof source === 'string' ? source : '');
        }
      };

      img.onerror = () => {
        if (isCreatedUrl) URL.revokeObjectURL(src);
        resolve(typeof source === 'string' ? source : '');
      };

      img.src = src;
    } catch {
      resolve('');
    }
  });
}
