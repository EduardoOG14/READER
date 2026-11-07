import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ZoomIn, ZoomOut, Lock, Unlock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

interface PdfReaderProps {
  buffer: ArrayBuffer;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number, totalPages?: number) => void;
  onToggleControls: () => void;
  showControls: boolean;
  onTextExtracted?: (text: string) => void;
  isContinuousMode?: boolean;
}

// Subcomponent for each page in Continuous Vertical Mode
interface ContinuousPageProps {
  pdfDoc: any;
  pageNum: number;
  scale: number;
  onPageVisible: (pageNum: number) => void;
}

const ContinuousPage: React.FC<ContinuousPageProps> = React.memo(({
  pdfDoc,
  pageNum,
  scale = 1.0,
  onPageVisible,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const hasRenderedOnceRef = useRef<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(0.707); // Standard book portrait aspect ratio
  const renderTaskRef = useRef<any>(null);
  const lastRenderedScaleRef = useRef<number>(scale);

  // Invalidate rendered state when scale changes to re-render with higher/lower resolution
  useEffect(() => {
    if (isRendered && Math.abs(lastRenderedScaleRef.current - scale) > 0.04) {
      setIsRendered(false);
    }
  }, [scale, isRendered]);

  // Pre-measure exact aspect ratio of the page as soon as pdfDoc is loaded to prevent any layout shifts
  useEffect(() => {
    if (!pdfDoc) return;
    let isCancelled = false;

    pdfDoc.getPage(pageNum).then((page: any) => {
      if (isCancelled) return;
      const vp = page.getViewport({ scale: 1.0 });
      if (vp.width && vp.height) {
        setAspectRatio(vp.width / vp.height);
      }
    }).catch(() => {});

    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, pageNum]);

  // Observer to trigger rendering with a generous 1200px margin (preloads pages before entering viewport)
  useEffect(() => {
    const el = containerRef.current;
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

  // Track active page position seamlessly as user scrolls
  useEffect(() => {
    const el = containerRef.current;
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

  // Render page to canvas - ONCE RENDERED, IT STAYS RENDERED (Zero Black Spaces!)
  useEffect(() => {
    if (!isInView || !pdfDoc || isRendered) return;
    let isCancelled = false;

    pdfDoc.getPage(pageNum).then(async (page: any) => {
      if (isCancelled || !canvasRef.current) return;

      const container = containerRef.current;
      const width = container ? container.clientWidth : Math.min(window.innerWidth * scale, 900 * scale);
      const targetWidth = Math.max(width, 280);

      const unscaledViewport = page.getViewport({ scale: 1.0 });
      const fitScale = targetWidth / unscaledViewport.width;
      const viewport = page.getViewport({ scale: fitScale });

      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = '100%';
      canvas.style.height = 'auto';

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
      }

      const task = page.render({
        canvasContext: context,
        viewport: viewport,
      });
      renderTaskRef.current = task;

      try {
        await task.promise;
        if (!isCancelled) {
          setIsRendered(true);
          hasRenderedOnceRef.current = true;
          lastRenderedScaleRef.current = scale;
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn('Continuous page render notice:', err);
        }
      }
    }).catch((err: any) => {
      console.warn('PDF getPage error:', err);
    });

    return () => {
      isCancelled = true;
      if (renderTaskRef.current && !isRendered) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
      }
    };
  }, [isInView, pdfDoc, pageNum, isRendered, scale]);

  return (
    <div
      ref={containerRef}
      data-page={pageNum}
      className="w-full flex flex-col items-center select-none m-0 p-0"
    >
      <div
        className="w-full relative flex items-center justify-center bg-white overflow-hidden m-0 p-0"
        style={!hasRenderedOnceRef.current ? { aspectRatio } : undefined}
      >
        <canvas ref={canvasRef} className="block w-full h-auto mx-auto select-none m-0 p-0" />
        {!hasRenderedOnceRef.current && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-200 text-xs gap-2.5 select-none min-h-[380px]">
            <div className="w-6 h-6 border-2 border-slate-300 dark:border-zinc-700 border-t-zinc-600 dark:border-t-zinc-200 rounded-full animate-spin" />
            <span className="font-semibold text-slate-700 dark:text-zinc-200">Cargando página {pageNum}...</span>
          </div>
        )}
      </div>
    </div>
  );
});

export const PdfReader: React.FC<PdfReaderProps> = ({
  buffer,
  currentPage,
  totalPages,
  onPageChange,
  onToggleControls,
  showControls,
  onTextExtracted,
  isContinuousMode = false,
}) => {
  const { settings, activeBook } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRightRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const continuousScrollRef = useRef<HTMLDivElement>(null);

  // Responsive spread tracking
  const [windowDimensions, setWindowDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600,
  }));

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLandscapeOrTablet = windowDimensions.width > windowDimensions.height || windowDimensions.width >= 768;
  const isDualPage = !isContinuousMode && (
    settings.dualPageMode === 'always' ||
    (settings.dualPageMode !== 'never' && isLandscapeOrTablet)
  );

  // Persistent book zoom scale and lock
  const bookZoomStorageKey = useMemo(() => `book_zoom_${activeBook?.id || 'default'}`, [activeBook?.id]);
  const bookZoomLockedKey = useMemo(() => `book_zoom_locked_${activeBook?.id || 'default'}`, [activeBook?.id]);

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
          if (!isNaN(parsed) && parsed >= 0.8 && parsed <= 3.5) return parsed;
        }
      }
    } catch {}
    return 1.0;
  });

  // Page turn animation
  const [turnAnimation, setTurnAnimation] = useState<'left' | 'right' | null>(null);
  const lastPageRef = useRef<number>(currentPage);

  useEffect(() => {
    if (currentPage === lastPageRef.current) return;
    const isForward = currentPage > lastPageRef.current;
    lastPageRef.current = currentPage;

    if (settings.pageTransitionStyle === 'instant' || scale > 1.0) {
      setTurnAnimation(null);
      return;
    }

    const dir = isForward ? 'right' : 'left';
    setTurnAnimation(dir);

    const timer = setTimeout(() => {
      setTurnAnimation(null);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage, settings.pageTransitionStyle, scale]);

  let animationClass = '';
  if (turnAnimation && scale <= 1.0) {
    if (settings.pageTransitionStyle === 'curl') {
      animationClass = turnAnimation === 'right' ? 'animate-page-curl-right' : 'animate-page-curl-left';
    } else if (settings.pageTransitionStyle === 'slide') {
      animationClass = turnAnimation === 'right' ? 'animate-page-slide-right' : 'animate-page-slide-left';
    }
  }

  // Zoom feedback toast
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
    setZoomToast(next ? `Zoom fijado al libro (${Math.round(scale * 100)}%)` : 'Zoom desbloqueado');
    setTimeout(() => setZoomToast(null), 2000);
  };

  // Sync zoom changes to localStorage when locked
  useEffect(() => {
    if (isZoomLocked) {
      try {
        localStorage.setItem(bookZoomStorageKey, scale.toString());
      } catch {}
    }
  }, [scale, isZoomLocked, bookZoomStorageKey]);

  // Preserve initial page to start window directly at requested page (Instant 0ms resume)
  const initialPageRef = useRef<number>(currentPage || 1);
  const isPositionedRef = useRef<boolean>(true);

  // Windowed pages in Continuous Mode: starts directly at currentPage with generous preloaded buffer
  const [startPage, setStartPage] = useState<number>(() => Math.max(1, initialPageRef.current));
  const [endPage, setEndPage] = useState<number>(() => Math.max(1, initialPageRef.current) + 8);

  const internalActivePageRef = useRef<number>(currentPage || 1);
  const prevScrollHeightRef = useRef<number>(0);
  const prevScrollTopRef = useRef<number>(0);
  const isPrependingRef = useRef<boolean>(false);

  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<any>(null);
  const continuousTouchStartYRef = useRef<number>(0);
  const continuousTouchMovedRef = useRef<boolean>(false);
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartScaleRef = useRef<number>(1.0);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const pdfDocRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const renderTaskRef = useRef<any>(null);
  const renderTaskRightRef = useRef<any>(null);
  const isCancelledRef = useRef<boolean>(false);

  // Pan state for Paginated Mode
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);
  const initialPinchDistRef = useRef<number | null>(null);
  const initialPinchScaleRef = useRef<number>(1.0);

  const extractedTextCache = useRef<Map<number, string>>(new Map());

  // Load PDF document
  useEffect(() => {
    isCancelledRef.current = false;
    setLoading(true);

    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer.slice(0)) });
    loadingTask.promise.then(
      pdf => {
        if (!isCancelledRef.current) {
          pdfDocRef.current = pdf;
          setPdfDoc(pdf);
          setLoading(false);

          if (pdf.numPages && pdf.numPages !== totalPages) {
            onPageChange(initialPageRef.current, pdf.numPages);
          }
        } else {
          try {
            pdf.destroy();
          } catch {}
        }
      },
      err => {
        if (!isCancelledRef.current) {
          console.error('Error loading PDF document:', err);
          setLoading(false);
        }
      }
    );

    return () => {
      isCancelledRef.current = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (e) {}
      }
      if (pdfDocRef.current) {
        try {
          pdfDocRef.current.destroy();
        } catch (e) {}
        pdfDocRef.current = null;
      }
    };
  }, [buffer]);

  // Bound endPage by pdfDoc.numPages once available
  useEffect(() => {
    if (pdfDoc?.numPages) {
      setEndPage(prev => Math.min(pdfDoc.numPages, Math.max(prev, startPage + 8)));
    }
  }, [pdfDoc?.numPages, startPage]);

  // Advance endPage smoothly as user scrolls down and reaches the bottom sentinel
  useEffect(() => {
    const el = bottomSentinelRef.current;
    if (!el || !isContinuousMode) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          const total = pdfDoc ? pdfDoc.numPages : totalPages;
          setEndPage(prev => Math.min(total, prev + 8));
        }
      },
      { rootMargin: '800px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isContinuousMode, pdfDoc, totalPages, endPage]);

  // Prepend previous pages smoothly as user scrolls up and reaches the top sentinel
  useEffect(() => {
    const el = topSentinelRef.current;
    if (!el || !isContinuousMode || startPage <= 1) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isPrependingRef.current) {
          if (continuousScrollRef.current) {
            isPrependingRef.current = true;
            prevScrollHeightRef.current = continuousScrollRef.current.scrollHeight;
            prevScrollTopRef.current = continuousScrollRef.current.scrollTop;
            setStartPage(prev => Math.max(1, prev - 6));
          }
        }
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isContinuousMode, startPage]);

  // When active page advances normally during reading, ensure next pages ahead stay mounted
  useEffect(() => {
    if (!isContinuousMode) return;
    const total = pdfDoc ? pdfDoc.numPages : totalPages;
    if (currentPage + 5 > endPage && endPage < total) {
      setEndPage(Math.min(total, currentPage + 10));
    }
  }, [currentPage, isContinuousMode, endPage, pdfDoc, totalPages]);

  // Compensate scrollTop after prepending previous pages so user position never jumps
  React.useLayoutEffect(() => {
    if (isPrependingRef.current && continuousScrollRef.current) {
      const container = continuousScrollRef.current;
      const delta = container.scrollHeight - prevScrollHeightRef.current;
      container.scrollTop = prevScrollTopRef.current + delta;
      isPrependingRef.current = false;
    }
  }, [startPage]);

  // Synchronize external page jumps (slider, bookmarks, table of contents)
  useEffect(() => {
    if (currentPage === internalActivePageRef.current) return;
    internalActivePageRef.current = currentPage;

    if (!isContinuousMode) {
      // In paginated mode: reset pan, and reset zoom only if not locked
      setPanOffset({ x: 0, y: 0 });
      if (!isZoomLocked) {
        setScale(1.0);
      }
      return;
    }

    const total = pdfDoc ? pdfDoc.numPages : totalPages;

    // In continuous mode: scroll to page if within window, or jump window
    if (currentPage >= startPage && currentPage <= endPage && continuousScrollRef.current) {
      const targetEl = continuousScrollRef.current.querySelector(`[data-page="${currentPage}"]`);
      if (targetEl) {
        targetEl.scrollIntoView({ block: 'start', behavior: 'auto' });
        return;
      }
    }

    const newStart = Math.max(1, currentPage);
    const newEnd = Math.min(total, currentPage + 2);
    setStartPage(newStart);
    setEndPage(newEnd);

    if (continuousScrollRef.current) {
      continuousScrollRef.current.scrollTop = 0;
    }
  }, [currentPage, isContinuousMode, startPage, endPage, isZoomLocked, pdfDoc, totalPages]);

  // Base spread page calculation for Dual Page
  const baseSpreadPage = isDualPage
    ? (currentPage % 2 !== 0 ? currentPage : currentPage - 1)
    : currentPage;

  // Render page(s) in Paginated Mode (fit to screen, supports Dual-Page spread)
  const renderPaginatedPage = useCallback(
    async (pageNum: number) => {
      if (isContinuousMode || !pdfDoc || !canvasRef.current || isCancelledRef.current) return;

      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
          await renderTaskRef.current.promise.catch(() => {});
        } catch (e) {}
        renderTaskRef.current = null;
      }
      if (renderTaskRightRef.current) {
        try {
          renderTaskRightRef.current.cancel();
          await renderTaskRightRef.current.promise.catch(() => {});
        } catch (e) {}
        renderTaskRightRef.current = null;
      }

      if (isCancelledRef.current || !canvasRef.current) return;

      try {
        const container = containerRef.current;
        const containerWidth = container ? container.clientWidth : window.innerWidth;
        const containerHeight = container ? container.clientHeight : window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        // Render Left Page (Page A)
        const pageA = await pdfDoc.getPage(pageNum);
        if (isCancelledRef.current || !canvasRef.current) return;

        const unscaledViewportA = pageA.getViewport({ scale: 1.0 });
        const availableWidthA = isDualPage ? containerWidth / 2 - 20 : containerWidth - 16;
        const fitScaleA = Math.min(
          availableWidthA / unscaledViewportA.width,
          (containerHeight - 16) / unscaledViewportA.height
        );
        const finalScaleA = fitScaleA * scale;

        const viewportA = pageA.getViewport({ scale: finalScaleA });
        const canvasA = canvasRef.current;
        const contextA = canvasA.getContext('2d');
        if (contextA) {
          canvasA.width = Math.floor(viewportA.width * dpr);
          canvasA.height = Math.floor(viewportA.height * dpr);
          canvasA.style.width = `${Math.floor(viewportA.width)}px`;
          canvasA.style.height = `${Math.floor(viewportA.height)}px`;
          contextA.setTransform(dpr, 0, 0, dpr, 0, 0);

          const taskA = pageA.render({
            canvasContext: contextA,
            viewport: viewportA,
          });
          renderTaskRef.current = taskA;
          await taskA.promise;
          renderTaskRef.current = null;
        }

        // If Dual Page, render Right Page (Page B)
        if (isDualPage && canvasRightRef.current && pageNum + 1 <= pdfDoc.numPages) {
          const pageB = await pdfDoc.getPage(pageNum + 1);
          if (isCancelledRef.current || !canvasRightRef.current) return;

          const unscaledViewportB = pageB.getViewport({ scale: 1.0 });
          const availableWidthB = containerWidth / 2 - 20;
          const fitScaleB = Math.min(
            availableWidthB / unscaledViewportB.width,
            (containerHeight - 16) / unscaledViewportB.height
          );
          const finalScaleB = fitScaleB * scale;

          const viewportB = pageB.getViewport({ scale: finalScaleB });
          const canvasB = canvasRightRef.current;
          const contextB = canvasB.getContext('2d');
          if (contextB) {
            canvasB.width = Math.floor(viewportB.width * dpr);
            canvasB.height = Math.floor(viewportB.height * dpr);
            canvasB.style.width = `${Math.floor(viewportB.width)}px`;
            canvasB.style.height = `${Math.floor(viewportB.height)}px`;
            contextB.setTransform(dpr, 0, 0, dpr, 0, 0);

            const taskB = pageB.render({
              canvasContext: contextB,
              viewport: viewportB,
            });
            renderTaskRightRef.current = taskB;
            await taskB.promise;
            renderTaskRightRef.current = null;
          }
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn('Paginated PDF render error:', err);
        }
      }
    },
    [pdfDoc, scale, isContinuousMode, isDualPage]
  );

  useEffect(() => {
    if (pdfDoc && !isContinuousMode) {
      renderPaginatedPage(baseSpreadPage);
    }
  }, [pdfDoc, baseSpreadPage, renderPaginatedPage, isContinuousMode]);

  // Extract page text for TTS
  useEffect(() => {
    if (!pdfDoc || !onTextExtracted) return;
    let isCancelled = false;

    if (extractedTextCache.current.has(currentPage)) {
      onTextExtracted(extractedTextCache.current.get(currentPage)!);
      return;
    }

    pdfDoc.getPage(currentPage).then((page: any) => {
      return page.getTextContent();
    }).then((textContent: any) => {
      if (isCancelled) return;
      const extracted = textContent.items
        .map((item: any) => item.str)
        .filter((s: string) => s && s.trim().length > 0)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      extractedTextCache.current.set(currentPage, extracted);
      onTextExtracted(extracted);
    }).catch((err: any) => {
      console.warn('PDF text extraction notice:', err);
    });

    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, currentPage, onTextExtracted]);

  // Handle tap in Paginated Mode (Edge tap for next/prev, Center for controls)
  const handlePaginatedTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hasMovedRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.28) {
      // Left edge -> Previous Page
      if (isDualPage) {
        if (baseSpreadPage > 1) {
          onPageChange(Math.max(1, baseSpreadPage - 2));
          if (!isZoomLocked) setScale(1.0);
          setPanOffset({ x: 0, y: 0 });
        }
      } else {
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
          if (!isZoomLocked) setScale(1.0);
          setPanOffset({ x: 0, y: 0 });
        }
      }
    } else if (clickX > width * 0.72) {
      // Right edge -> Next Page
      const maxPages = pdfDoc ? pdfDoc.numPages : totalPages;
      if (isDualPage) {
        if (baseSpreadPage + 2 <= maxPages) {
          onPageChange(baseSpreadPage + 2);
          if (!isZoomLocked) setScale(1.0);
          setPanOffset({ x: 0, y: 0 });
        } else if (baseSpreadPage + 1 <= maxPages) {
          onPageChange(baseSpreadPage + 1);
          if (!isZoomLocked) setScale(1.0);
          setPanOffset({ x: 0, y: 0 });
        }
      } else {
        if (currentPage < maxPages) {
          onPageChange(currentPage + 1);
          if (!isZoomLocked) setScale(1.0);
          setPanOffset({ x: 0, y: 0 });
        }
      }
    } else {
      // Center 44% -> Toggle Controls
      onToggleControls();
    }
  };

  // Touch / Mouse Panning handlers for Paginated Mode
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1.0) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    if (Math.abs(newX - panOffset.x) > 3 || Math.abs(newY - panOffset.y) > 3) {
      hasMovedRef.current = true;
    }
    setPanOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers (Pinch-to-zoom & Pan)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchDistRef.current = dist;
      initialPinchScaleRef.current = scale;
      return;
    }

    if (e.touches.length === 1) {
      hasMovedRef.current = false;
      if (scale > 1.0) {
        setIsDragging(true);
        const touch = e.touches[0];
        dragStartRef.current = { x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / initialPinchDistRef.current;
      const nextScale = Math.max(0.6, Math.min(3.5, initialPinchScaleRef.current * factor));
      setScale(nextScale);
      hasMovedRef.current = true;
      return;
    }

    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragStartRef.current.x;
      const newY = touch.clientY - dragStartRef.current.y;
      if (Math.abs(newX - panOffset.x) > 4 || Math.abs(newY - panOffset.y) > 4) {
        hasMovedRef.current = true;
      }
      setPanOffset({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    initialPinchDistRef.current = null;
  };

  const visiblePages = useMemo(() => {
    const total = pdfDoc ? pdfDoc.numPages : totalPages;
    const boundedStart = Math.max(1, startPage);
    const boundedEnd = Math.min(Math.max(boundedStart, total), endPage);
    const pages: number[] = [];
    for (let p = boundedStart; p <= boundedEnd; p++) {
      pages.push(p);
    }
    return pages;
  }, [startPage, endPage, pdfDoc, totalPages]);

  // Theme preset container colors
  const preset = settings.readingThemePreset || (settings.theme === 'dark' ? 'emerald' : 'day');
  let containerBg = '#f7f4ed';
  if (preset === 'emerald') containerBg = '#18191c';
  else if (preset === 'oled') containerBg = '#000000';
  else if (preset === 'sepia') containerBg = '#ece4d0';
  else if (preset === 'sakura') containerBg = '#fdf2f4';

  if (loading) {
    return (
      <div
        className="flex-1 w-full h-full flex flex-col items-center justify-center gap-2 select-none"
        style={{ backgroundColor: containerBg }}
      >
        <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-emerald-500" />
        <p className="text-xs opacity-90 text-slate-500 dark:text-zinc-300 font-medium">Cargando libro...</p>
      </div>
    );
  }

  // Continuous mode immersion & zoom: pinch-to-zoom, auto-hide on scroll, toggle cleanly on tap
  const handleContinuousScroll = () => {
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 200);

    // Auto-hide controls when user scrolls to read
    if (showControls) {
      onToggleControls();
    }
  };

  const handleContinuousTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchStartDistRef.current = dist;
      pinchStartScaleRef.current = scale;
      return;
    }

    if (e.touches.length === 1) {
      continuousTouchStartYRef.current = e.touches[0].clientY;
      continuousTouchMovedRef.current = false;
    }
  };

  const handleContinuousTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / pinchStartDistRef.current;
      const nextScale = Math.max(0.8, Math.min(3.0, Number((pinchStartScaleRef.current * factor).toFixed(2))));
      setScale(nextScale);
      continuousTouchMovedRef.current = true;
      return;
    }

    if (e.touches.length === 1) {
      const dist = Math.abs(e.touches[0].clientY - continuousTouchStartYRef.current);
      if (dist > 8) {
        continuousTouchMovedRef.current = true;
        if (showControls) {
          onToggleControls();
        }
      }
    }
  };

  const handleContinuousTouchEnd = () => {
    pinchStartDistRef.current = null;
  };

  const handleContinuousClick = () => {
    if (continuousTouchMovedRef.current || isScrollingRef.current) {
      continuousTouchMovedRef.current = false;
      return;
    }
    onToggleControls();
  };

  // Shared Floating Zoom & Lock Controls for both modes
  const renderZoomControls = () => {
    if (!showControls) return null;
    return (
      <div
        onClick={e => e.stopPropagation()}
        className="fixed bottom-24 right-4 z-40 bg-slate-900/90 dark:bg-[#121316]/95 backdrop-blur-md border border-slate-800 dark:border-zinc-800 rounded-2xl p-1.5 flex flex-col gap-1.5 shadow-2xl animate-in fade-in duration-150"
      >
        {/* Lock Zoom Toggle */}
        <button
          onClick={toggleZoomLock}
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            isZoomLocked
              ? 'bg-zinc-700 text-zinc-100 border border-zinc-500 ring-2 ring-zinc-400/20 shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-zinc-800'
          }`}
          title={isZoomLocked ? `Zoom fijado al libro (${Math.round(scale * 100)}%)` : 'Fijar zoom actual al libro'}
        >
          {isZoomLocked ? <Lock className="w-4 h-4 text-zinc-100" /> : <Unlock className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Zoom In */}
        <button
          onClick={() => setScale(s => Math.min(Number((s + 0.15).toFixed(2)), 3.0))}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Aumentar zoom (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Reset Zoom / Current Scale Display */}
        <button
          onClick={() => {
            setScale(1.0);
            setPanOffset({ x: 0, y: 0 });
          }}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-[10px] font-mono font-bold flex items-center justify-center min-w-[32px]"
          title="Restablecer zoom (100%)"
        >
          {Math.round(scale * 100)}%
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => setScale(s => Math.max(Number((s - 0.15).toFixed(2)), 0.8))}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Reducir zoom (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // --- MODO 2: LECTURA CONTINUA (Desplazamiento vertical adaptado al ancho) ---
  if (isContinuousMode) {
    return (
      <div
        ref={continuousScrollRef}
        onClick={handleContinuousClick}
        onScroll={handleContinuousScroll}
        onTouchStart={handleContinuousTouchStart}
        onTouchMove={handleContinuousTouchMove}
        onTouchEnd={handleContinuousTouchEnd}
        className="w-full h-full overflow-y-auto overflow-x-auto select-none"
        style={{
          backgroundColor: containerBg,
          touchAction: scale > 1.0 ? 'pan-x pan-y' : 'pan-y',
        }}
      >
        <div
          className="flex flex-col items-center pt-0 pb-28 mx-auto transition-all duration-150"
          style={{
            width: `${Math.floor(scale * 100)}%`,
            maxWidth: `${Math.floor(scale * 768)}px`,
            minWidth: scale >= 1.0 ? '100%' : undefined,
          }}
        >
          {/* Top Sentinel for smooth upward scrolling */}
          {startPage > 1 && <div ref={topSentinelRef} className="h-1 w-full" />}

          {visiblePages.map(pageNum => (
            <ContinuousPage
              key={pageNum}
              pdfDoc={pdfDoc}
              pageNum={pageNum}
              scale={scale}
              onPageVisible={p => {
                if (isPositionedRef.current && p !== currentPage) {
                  internalActivePageRef.current = p;
                  onPageChange(p);
                }
              }}
            />
          ))}

          {/* Bottom Sentinel for smooth downward scrolling */}
          {endPage < (pdfDoc?.numPages || totalPages) && (
            <div ref={bottomSentinelRef} className="h-12 w-full flex items-center justify-center py-2 opacity-50 bg-white">
              <div className="w-5 h-5 border-2 border-zinc-400 border-t-zinc-700 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Floating Zoom & Lock Controls */}
        {renderZoomControls()}

        {/* Zoom Toast feedback */}
        {zoomToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 dark:bg-zinc-900/95 text-white border border-zinc-700 rounded-2xl px-4 py-2 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2 pointer-events-none">
            {isZoomLocked ? <Lock className="w-3.5 h-3.5 text-zinc-300" /> : <Unlock className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{zoomToast}</span>
          </div>
        )}
      </div>
    );
  }

  // --- MODO 1: LECTURA PAGINADA (Página completa, toque en bordes, zoom y bloqueo) ---
  return (
    <div
      ref={containerRef}
      onClick={handlePaginatedTap}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full overflow-hidden flex items-center justify-center select-none"
      style={{
        backgroundColor: containerBg,
        touchAction: scale > 1.0 ? 'none' : 'pan-x',
        overscrollBehavior: 'none',
      }}
    >
      {/* Complete Page Canvas (Fitted to screen, Pan & Zoom, Single or Dual Page) */}
      <div
        className={`relative flex items-center justify-center shadow-2xl rounded-sm overflow-hidden ${animationClass}`}
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {isDualPage && baseSpreadPage + 1 <= (pdfDoc?.numPages || totalPages) ? (
          <div className="flex items-center justify-center bg-white shadow-xl">
            {/* Left Canvas (Page A) */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="block select-none"
                style={{
                  maxWidth: scale > 1 ? 'none' : '100%',
                  maxHeight: scale > 1 ? 'none' : '100%',
                }}
              />
              <div className="absolute top-0 right-0 bottom-0 w-5 bg-gradient-to-l from-black/25 to-transparent pointer-events-none" />
            </div>

            {/* Central spine fold crease */}
            <div className="w-[1.5px] self-stretch bg-slate-400 dark:bg-zinc-700 shadow-sm shrink-0" />

            {/* Right Canvas (Page B) */}
            <div className="relative">
              <canvas
                ref={canvasRightRef}
                className="block select-none"
                style={{
                  maxWidth: scale > 1 ? 'none' : '100%',
                  maxHeight: scale > 1 ? 'none' : '100%',
                }}
              />
              <div className="absolute top-0 left-0 bottom-0 w-5 bg-gradient-to-r from-black/25 to-transparent pointer-events-none" />
            </div>
          </div>
        ) : (
          <div className="bg-white">
            <canvas
              ref={canvasRef}
              className="block select-none"
              style={{
                maxWidth: scale > 1 ? 'none' : '100%',
                maxHeight: scale > 1 ? 'none' : '100%',
              }}
            />
          </div>
        )}
      </div>

      {/* Floating Zoom & Lock Controls in Paginated Mode */}
      {renderZoomControls()}

      {/* Zoom Toast feedback */}
      {zoomToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 dark:bg-zinc-900/95 text-white border border-zinc-700 rounded-2xl px-4 py-2 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2 pointer-events-none">
          {isZoomLocked ? <Lock className="w-3.5 h-3.5 text-zinc-300" /> : <Unlock className="w-3.5 h-3.5 text-zinc-400" />}
          <span>{zoomToast}</span>
        </div>
      )}
    </div>
  );
};
