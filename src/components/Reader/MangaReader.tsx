import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import JSZip from 'jszip';
import { Lock, Unlock } from 'lucide-react';
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
  pageIndex: number;
  url?: string;
  onLoadPage: (pageIndex: number) => void;
  onPageVisible: (pageNum: number) => void;
}

const WebtoonPage: React.FC<WebtoonPageProps> = React.memo(
  ({ pageNum, pageIndex, url, onLoadPage, onPageVisible }) => {
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
        onLoadPage(pageIndex);
      }
    }, [isInView, url, onLoadPage, pageIndex]);

    // Track active page position seamlessly as user scrolls
    useEffect(() => {
      const el = pageRef.current;
      if (!el) return;

      const tracker = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            onPageVisible(pageNum);
          }
        },
        { threshold: [0.1], rootMargin: '-15% 0px -70% 0px' }
      );

      tracker.observe(el);
      return () => tracker.disconnect();
    }, [pageNum, onPageVisible]);

    return (
      <div
        ref={pageRef}
        data-page={pageNum}
        className="w-full min-h-[300px] flex items-center justify-center bg-slate-900/10"
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: '0 800px',
        }}
      >
        {url ? (
          <img
            src={url}
            alt={`Página ${pageNum}`}
            decoding="async"
            className="w-full h-auto block select-none pointer-events-none"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-400 text-xs">
            Cargando página {pageNum}...
          </div>
        )}
      </div>
    );
  }
);

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

  // Batch state updates for newly loaded page URLs to avoid rapid-fire re-renders
  const rafPendingRef = useRef(false);
  const triggerBatchUrlsUpdate = useCallback(() => {
    if (rafPendingRef.current) return;
    rafPendingRef.current = true;
    requestAnimationFrame(() => {
      rafPendingRef.current = false;
      setPageUrls(new Map(urlsRef.current));
    });
  }, []);

  // Load page image URL on demand
  const loadPageUrl = useCallback(
    async (pageIndex: number) => {
      if (!zip || pageIndex < 0 || pageIndex >= pageFilenames.length) return null;
      if (urlsRef.current.has(pageIndex)) return urlsRef.current.get(pageIndex)!;

      const filename = pageFilenames[pageIndex];
      const entry = zip.file(filename);
      if (!entry) return null;

      const lower = filename.toLowerCase();
      let blob: Blob;

      if (lower.endsWith('.svg')) {
        const svgText = await entry.async('text');
        blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      } else {
        const mime = lower.endsWith('.webp')
          ? 'image/webp'
          : lower.endsWith('.png')
          ? 'image/png'
          : lower.endsWith('.gif')
          ? 'image/gif'
          : 'image/jpeg';
        const ab = await entry.async('arraybuffer');
        blob = new Blob([ab], { type: mime });
      }

      const url = URL.createObjectURL(blob);
      urlsRef.current.set(pageIndex, url);
      triggerBatchUrlsUpdate();
      return url;
    },
    [zip, pageFilenames, triggerBatchUrlsUpdate]
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

  // Track active visible page and coordinate Webtoon scrolling without flickering
  const internalActivePageRef = useRef<number>(currentPage);
  const isWebtoonPositionedRef = useRef<boolean>(false);

  const handleWebtoonPageVisible = useCallback(
    (page: number) => {
      if (internalActivePageRef.current === page) return;
      internalActivePageRef.current = page;
      onPageChange(page, pageFilenames.length);
    },
    [onPageChange, pageFilenames.length]
  );

  // Scroll to current page when in webtoon mode (initial position or external slider/jump)
  useEffect(() => {
    if (settings.mangaDirection !== 'webtoon' || !containerRef.current || pageFilenames.length === 0) return;

    // Prevent snapping back when page change was triggered by user's natural scrolling
    if (currentPage === internalActivePageRef.current && isWebtoonPositionedRef.current) {
      return;
    }

    internalActivePageRef.current = currentPage;
    const pageEl = containerRef.current.querySelector(`[data-page="${currentPage}"]`);
    if (pageEl) {
      pageEl.scrollIntoView({ behavior: isWebtoonPositionedRef.current ? 'smooth' : 'auto', block: 'start' });
      isWebtoonPositionedRef.current = true;
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

  // Subtle floating indicator only when zoomed in (to avoid obstructing the manga art)
  const renderZoomBar = () => {
    if (scale === 1.0 && !isZoomLocked) return null;

    return (
      <div
        onClick={e => e.stopPropagation()}
        className={`fixed top-16 right-4 z-40 bg-slate-900/90 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-700/80 dark:border-zinc-700 rounded-2xl px-3 py-1.5 flex items-center gap-2 shadow-2xl transition-all duration-200 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={toggleZoomLock}
          className={`p-1.5 rounded-xl transition-all cursor-pointer ${
            isZoomLocked
              ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
              : 'text-slate-400 hover:text-white dark:hover:text-zinc-200'
          }`}
          title={isZoomLocked ? `Zoom fijado (${Math.round(scale * 100)}%)` : 'Fijar zoom actual a este manga'}
        >
          {isZoomLocked ? <Lock className="w-3.5 h-3.5 stroke-[2.2]" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => {
            setScale(1.0);
            setPanOffset({ x: 0, y: 0 });
          }}
          className="text-xs font-mono font-bold text-slate-200 hover:text-white dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer"
          title="Toca para restablecer al 100%"
        >
          <span>{Math.round(scale * 100)}%</span>
          <span className="text-[10px] text-slate-400 font-sans font-normal underline ml-0.5">Restablecer</span>
        </button>
      </div>
    );
  };

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
          className="w-full flex flex-col items-center"
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
                pageIndex={index}
                url={url}
                onLoadPage={loadPageUrl}
                onPageVisible={handleWebtoonPageVisible}
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
            className={`max-w-full max-h-[92vh] object-contain select-none shadow-md pointer-events-none transition-transform duration-200 ${
              settings.smartTrimMargins ? 'scale-[1.08]' : ''
            }`}
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
