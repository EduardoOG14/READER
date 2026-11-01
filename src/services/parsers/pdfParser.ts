import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker using local public worker (supports offline Android)
if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

export interface PdfMetadata {
  totalPages: number;
  coverUrl?: string;
  title?: string;
  author?: string;
}

export async function parsePdfFile(buffer: ArrayBuffer): Promise<PdfMetadata> {
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer.slice(0)) });
  const pdf = await loadingTask.promise;

  try {
    const totalPages = pdf.numPages;

    let title: string | undefined;
    let author: string | undefined;

    try {
      const meta = await pdf.getMetadata();
      const info = meta.info as any;
      if (info) {
        if (info.Title && typeof info.Title === 'string' && info.Title.trim()) {
          title = info.Title.trim();
        }
        if (info.Author && typeof info.Author === 'string' && info.Author.trim()) {
          author = info.Author.trim();
        }
      }
    } catch (err) {
      console.warn('Could not read PDF metadata:', err);
    }

    // Generate cover thumbnail from first page
    let coverUrl: string | undefined;
    try {
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.5 }); // thumbnail scale
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        coverUrl = canvas.toDataURL('image/jpeg', 0.8);
      }
    } catch (err) {
      console.warn('Could not render PDF cover:', err);
    }

    return {
      totalPages,
      coverUrl,
      title,
      author,
    };
  } finally {
    try {
      await pdf.destroy();
    } catch {}
  }
}

export async function getPdfDocument(buffer: ArrayBuffer) {
  return pdfjsLib.getDocument({ data: new Uint8Array(buffer.slice(0)) }).promise;
}
