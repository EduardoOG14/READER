import React, { useEffect, useState, useRef, useCallback } from 'react';
import JSZip from 'jszip';
import { isImageFile, naturalSort } from '../../services/parsers/mangaParser';
import { useApp } from '../../context/AppContext';

interface MangaReaderProps {
  buffer: ArrayBuffer;
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number, totalPages?: number) => void;
  onToggleControls: () => void;
  showControls: boolean;
}

// Subcomponent to safely trigger lazy page loading in an effect rather than during render
interface WebtoonPageProps {
  filename: string;
  pageNum: number;
  url?: string;
  onLoad: () => void;
}

const WebtoonPage: React.FC<WebtoonPageProps> = React.memo(({ pageNum, url, onLoad }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { rootMargin: '1200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && !url) {
      onLoad();
    }
  }, [isInView, url, onLoad]);

  return (
    <div
      ref={pageRef}
      data-page={pageNum}
      className="w-full min-h-[300px] flex items-center justify-center bg-slate-900/10"
    >
      {url ? (
        <img
          src={url}
          alt={`Página ${pageNum}`}
          className="w-full h-auto block select-none"
          loading="lazy"
        />
      ) : (
        <div className="h-64 flex items-center justify-center text-slate-400 text-xs">
          Cargando página {pageNum}...
        </div>
      )}
    </div>
  );
});

export const MangaReader: React.FC<MangaReaderProps> = ({
  buffer,
  currentPage,
  totalPages,
  onPageChange,
  onToggleControls,
}) => {
  const { settings } = useApp();
  const [zip, setZip] = useState<JSZip | null>(null);
  const [pageFilenames, setPageFilenames] = useState<string[]>([]);
  const [pageUrls, setPageUrls] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const urlsRef = useRef<Map<number, string>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Load zip and collect images
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    JSZip.loadAsync(buffer).then(
      loadedZip => {
        if (isCancelled) return;
        const files: string[] = [];
        loadedZip.forEach((relativePath, entry) => {
          if (!entry.dir && isImageFile(relativePath)) {
            files.push(relativePath);
          }
        });

        files.sort(naturalSort);
        setZip(loadedZip);
        setPageFilenames(files);
        setLoading(false);
        if (totalPages !== files.length) {
          onPageChange(currentPage, files.length);
        }
      },
      err => {
        if (!isCancelled) {
          console.error('Error loading manga zip:', err);
          setLoading(false);
        }
      }
    );

    return () => {
      isCancelled = true;
      // Revoke all object URLs on unmount
      urlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, [buffer]);

  // Load page image URL on demand
  const loadPageUrl = useCallback(
    async (pageIndex: number) => {
      if (!zip || pageIndex < 0 || pageIndex >= pageFilenames.length) return null;
      if (urlsRef.current.has(pageIndex)) return urlsRef.current.get(pageIndex)!;

      const filename = pageFilenames[pageIndex];
      const entry = zip.file(filename);
      if (!entry) return null;

      const blob = await entry.async('blob');
      const url = URL.createObjectURL(blob);
      urlsRef.current.set(pageIndex, url);
      setPageUrls(new Map(urlsRef.current));
      return url;
    },
    [zip, pageFilenames]
  );

  // Preload current, previous, and next page
  useEffect(() => {
    if (!zip || pageFilenames.length === 0) return;
    const currentIndex = currentPage - 1;

    loadPageUrl(currentIndex);
    if (currentIndex + 1 < pageFilenames.length) loadPageUrl(currentIndex + 1);
    if (currentIndex - 1 >= 0) loadPageUrl(currentIndex - 1);

    // Free memory of distant pages in horizontal mode to prevent memory exhaustion
    if (settings.mangaDirection === 'horizontal') {
      let pruned = false;
      urlsRef.current.forEach((url, idx) => {
        if (Math.abs(idx - currentIndex) > 6) {
          URL.revokeObjectURL(url);
          urlsRef.current.delete(idx);
          pruned = true;
        }
      });
      if (pruned) {
        setPageUrls(new Map(urlsRef.current));
      }
    }
  }, [zip, currentPage, pageFilenames, loadPageUrl, settings.mangaDirection]);

  // Scroll to current page instantly when in webtoon mode
  useEffect(() => {
    if (settings.mangaDirection === 'webtoon' && containerRef.current && pageFilenames.length > 0) {
      const pageEl = containerRef.current.querySelector(`[data-page="${currentPage}"]`);
      if (pageEl) {
        pageEl.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
  }, [currentPage, settings.mangaDirection, pageFilenames.length]);

  // Click handler for horizontal mode
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (settings.mangaDirection === 'webtoon') {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const height = rect.height;
      if (clickY < height * 0.2) {
        if (currentPage > 1) onPageChange(currentPage - 1);
      } else if (clickY > height * 0.8) {
        if (currentPage < pageFilenames.length) onPageChange(currentPage + 1);
      } else {
        onToggleControls();
      }
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.3) {
      if (currentPage > 1) onPageChange(currentPage - 1);
    } else if (clickX > width * 0.7) {
      if (currentPage < pageFilenames.length) onPageChange(currentPage + 1);
    } else {
      onToggleControls();
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
      </div>
    );
  }


  // --- Render Mode: Webtoon (Continuous vertical cascade) ---
  if (settings.mangaDirection === 'webtoon') {
    return (
      <div
        ref={containerRef}
        onClick={() => onToggleControls()}
        className="w-full h-full overflow-y-auto flex flex-col items-center select-none"
      >
        <div className="w-full max-w-3xl flex flex-col items-center">
          {pageFilenames.map((filename, index) => {
            const pageNum = index + 1;
            const url = pageUrls.get(index);

            return (
              <WebtoonPage
                key={filename}
                filename={filename}
                pageNum={pageNum}
                url={url}
                onLoad={() => loadPageUrl(index)}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // --- Render Mode: Horizontal / Single Page Paged ---
  const currentUrl = pageUrls.get(currentPage - 1);

  return (
    <div
      onClick={handlePageClick}
      className="relative w-full h-full flex items-center justify-center overflow-hidden p-1 select-none"
    >
      {currentUrl ? (
        <img
          src={currentUrl}
          alt={`Página ${currentPage}`}
          className="max-w-full max-h-full object-contain select-none shadow-md"
        />
      ) : (
        <div className="text-slate-400 text-sm">Cargando página {currentPage}...</div>
      )}
    </div>
  );
};
