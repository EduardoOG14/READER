import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import JSZip from 'jszip';
import { ZoomIn, ZoomOut, Lock, Unlock } from 'lucide-react';
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
          className="w-full h-auto block select-none pointer-events-none"
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
  showControls,
}) => {
  const { settings, activeBook } = useApp();
  const [zip, setZip] = useState<JSZip | null>(null);
  const [pageFilenames, setPageFilenames] = useState<string[]>([]);
  const [pageUrls, setPageUrls] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const urlsRef = useRef<Map<number, string>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Persistent book zoom scale and lock
  const bookZoomStorageKey = useMemo(() => `manga_zoom_${activeBook?.id || 'default'}`, [activeBook?.id]);
  const bookZoomLockedKey = useMemo(() => `manga_zoom_locked_${activeBook?.id || 'default'}`, [activeBook?.id]);

  const [isZoomLocked, setIsZoomLocked] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(bookZoomLockedKey);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [scale, setScale] = useState<number>(() => {
    try {
      const savedLocked = localStorage.getItem(bookZoomLockedKey);
      if (savedLocked === 'true') {
        const savedScale = localStorage.getItem(bookZoomStorageKey);
        if (savedScale) {
          const parsed = parseFloat(savedScale);
          if (!isNaN(parsed) && parsed >= 0.8 && parsed <= 3.0) return parsed;
        }
      }
    } catch {}
    return 1.0;
  });

  const [zoomToast, setZoomToast] = useState<string | null>(null);

  const toggleZoomLock = () => {
    const next = !isZoomLocked;
    setIsZoomLocked(next);
    try {
      localStorage.setItem(bookZoomLockedKey, next ? 'true' : 'false');
      if (next) {
        localStorage.setItem(bookZoomStorageKey, scale.toString());
      }
    } catch {}
    setZoomToast(next ? `Zoom fijado al manga (${Math.round(scale * 100)}%)` : 'Zoom desbloqueado');
    setTimeout(() => setZoomToast(null), 2200);
  };

  // Sync zoom changes to localStorage when locked
  useEffect(() => {
    if (isZoomLocked) {
      try {
        localStorage.setItem(bookZoomStorageKey, scale.toString());
      } catch {}
    }
  }, [scale, isZoomLocked, bookZoomStorageKey]);

  // Touch pinch-to-zoom tracking
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartScaleRef = useRef<number>(1.0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
      touchStartScaleRef.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / touchStartDistRef.current;
      const nextScale = Math.min(3.0, Math.max(0.8, Number((touchStartScaleRef.current * ratio).toFixed(2))));
      setScale(nextScale);
    }
  };

  const handleTouchEnd = () => {
    touchStartDistRef.current = null;
  };

  // Panning in paginated mode when zoomed in
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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

      const rawBlob = await entry.async('blob');
      // Ensure correct MIME type for SVG files so Android WebView renders them correctly
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
    if (settings.mangaDirection !== 'webtoon') {
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

  // Click handler for paginated and webtoon modes
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) return;

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

    // Center 50% toggles HUD controls
    if (clickX >= width * 0.25 && clickX <= width * 0.75) {
      onToggleControls();
      return;
    }

    // Japanese Manga RTL (Right-to-Left):
    // Right side click = Previous page, Left side click = Next page
    const isRTL = settings.mangaDirection === 'rtl' || settings.mangaDirection === 'horizontal';

    if (clickX < width * 0.25) {
      // Left 25% edge
      if (isRTL) {
        // RTL advances forward
        if (currentPage < pageFilenames.length) {
          onPageChange(currentPage + 1);
          if (!isZoomLocked) setScale(1.0);
          setPanOffset({ x: 0, y: 0 });
        }
      } else {
        // LTR goes back
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
          if (!isZoomLocked) setScale(1.0);
          setPanOffset({ x: 0, y: 0 });
        }
      }
    } else if (clickX > width * 0.75) {
      // Right 25% edge
      if (isRTL) {
        // RTL goes back
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
          if (!isZoomLocked) setScale(1.0);
          setPanOffset({ x: 0, y: 0 });
        }
      } else {
        // LTR advances forward
        if (currentPage < pageFilenames.length) {
          onPageChange(currentPage + 1);
          if (!isZoomLocked) setScale(1.0);
          setPanOffset({ x: 0, y: 0 });
        }
      }
    }
  };

  // Mouse pan handlers when zoomed in
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1.0) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || scale <= 1.0) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500 dark:border-zinc-300" />
      </div>
    );
  }

  // Floating Zoom Controls Bar
  const renderZoomBar = () => (
    <div
      onClick={e => e.stopPropagation()}
      className={`fixed top-14 sm:top-16 right-3 sm:right-6 z-40 bg-slate-900/90 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-700/80 dark:border-zinc-700 rounded-2xl px-2 py-1.5 flex items-center gap-1 shadow-2xl transition-all duration-200 ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {/* Zoom Lock Button */}
      <button
        onClick={toggleZoomLock}
        className={`p-2 rounded-xl transition-all cursor-pointer ${
          isZoomLocked
            ? 'bg-zinc-700 text-zinc-100 border border-zinc-500 ring-2 ring-zinc-400/20 shadow-xs'
            : 'text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-zinc-800'
        }`}
        title={isZoomLocked ? `Zoom fijado al manga (${Math.round(scale * 100)}%)` : 'Fijar zoom actual al manga'}
      >
        {isZoomLocked ? <Lock className="w-4 h-4 text-zinc-100" /> : <Unlock className="w-4 h-4 text-slate-400" />}
      </button>

      {/* Zoom In */}
      <button
        onClick={() => setScale(s => Math.min(Number((s + 0.15).toFixed(2)), 3.0))}
        disabled={scale >= 3.0}
        className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        title="Acercar (Zoom +)"
      >
        <ZoomIn className="w-4 h-4" />
      </button>

      {/* Reset Zoom Percent */}
      <button
        onClick={() => {
          setScale(1.0);
          setPanOffset({ x: 0, y: 0 });
        }}
        className="px-2 py-1 text-[11px] font-mono font-bold text-slate-300 hover:text-white dark:hover:text-zinc-100 hover:bg-slate-800 dark:hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
        title="Restablecer tamaño normal (100%)"
      >
        {Math.round(scale * 100)}%
      </button>

      {/* Zoom Out */}
      <button
        onClick={() => setScale(s => Math.max(Number((s - 0.15).toFixed(2)), 0.8))}
        disabled={scale <= 0.8}
        className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        title="Alejar (Zoom -)"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
    </div>
  );

  // --- Render Mode: Webtoon (Continuous vertical cascade with responsive zoom) ---
  if (settings.mangaDirection === 'webtoon') {
    return (
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handlePageClick}
        className="w-full h-full overflow-y-auto overflow-x-auto flex flex-col items-center select-none"
      >
        {renderZoomBar()}

        <div
          className="w-full flex flex-col items-center transition-all duration-150"
          style={{
            maxWidth: `${Math.round(768 * scale)}px`,
            width: `${Math.round(100 * scale)}%`,
          }}
        >
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

        {/* Floating Zoom Toast */}
        {zoomToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 dark:bg-zinc-900/95 text-white border border-zinc-700 rounded-2xl px-4 py-2 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2 pointer-events-none">
            {isZoomLocked ? <Lock className="w-3.5 h-3.5 text-zinc-300" /> : <Unlock className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{zoomToast}</span>
          </div>
        )}
      </div>
    );
  }

  // --- Render Mode: Horizontal / Paginated (RTL / LTR) ---
  const currentUrl = pageUrls.get(currentPage - 1);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handlePageClick}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden p-1 select-none ${
        scale > 1.0 ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
    >
      {renderZoomBar()}

      {currentUrl ? (
        <div
          className="transition-transform duration-75 flex items-center justify-center max-w-full max-h-full"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <img
            src={currentUrl}
            alt={`Página ${currentPage}`}
            className="max-w-full max-h-[92vh] object-contain select-none shadow-md pointer-events-none"
          />
        </div>
      ) : (
        <div className="text-slate-400 text-sm">Cargando página {currentPage}...</div>
      )}

      {/* Floating Zoom Toast */}
      {zoomToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 dark:bg-zinc-900/95 text-white border border-zinc-700 rounded-2xl px-4 py-2 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2 pointer-events-none">
          {isZoomLocked ? <Lock className="w-3.5 h-3.5 text-zinc-300" /> : <Unlock className="w-3.5 h-3.5 text-zinc-400" />}
          <span>{zoomToast}</span>
        </div>
      )}
    </div>
  );
};
