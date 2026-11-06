import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Loader2,
  Bookmark as BookmarkIcon,
  Search,
  BookOpen,
  Type,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getBookFile } from '../../services/storage';
import { recordReadingTime } from '../../services/readingStats';
import { PdfReader } from './PdfReader';
import { MangaReader } from './MangaReader';
import { EpubReader } from './EpubReader';
import { TextReader } from './TextReader';
import { FilterSettingsSheet } from './FilterSettingsSheet';
import { FontSizeModal } from './FontSizeModal';
import { MoonStatusBar } from './MoonStatusBar';
import { BookmarksDrawer } from './BookmarksDrawer';
import { AutoScrollControl } from './AutoScrollControl';
import { TtsPlayerModal } from './TtsPlayerModal';
import { BrightnessGestureHud } from './BrightnessGestureHud';
import { SearchInBookDrawer } from './SearchInBookDrawer';
import { BookCompletedModal } from '../BookCompletedModal';
import { useBackHandler } from '../../services/backButton';

export const ReaderContainer: React.FC = () => {
  const { activeBook, closeReader, updateBookProgress, settings, updateSettings, addBookmark, removeBookmark, editBook } = useApp();

  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [loadingFile, setLoadingFile] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [showFontSizeModal, setShowFontSizeModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Advanced features state
  const [showBookmarksDrawer, setShowBookmarksDrawer] = useState(false);
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showAutoScroll, setShowAutoScroll] = useState(false);
  const [showTtsModal, setShowTtsModal] = useState(false);
  const [showBrightnessHud, setShowBrightnessHud] = useState(false);
  const [hudBrightness, setHudBrightness] = useState<number>(settings.brightness || 100);
  const [bookmarkToast, setBookmarkToast] = useState<string | null>(null);
  const [currentPageText, setCurrentPageText] = useState<string>('');
  const [orientationMode, setOrientationMode] = useState<'auto' | 'portrait' | 'landscape'>(
    settings.orientationLock || 'auto'
  );

  const changeOrientation = async (next: 'auto' | 'portrait' | 'landscape') => {
    setOrientationMode(next);
    updateSettings({ orientationLock: next });

    try {
      if (typeof screen !== 'undefined' && (screen as any).orientation) {
        if (next === 'auto') {
          (screen as any).orientation.unlock?.();
        } else {
          await (screen as any).orientation.lock?.(next === 'portrait' ? 'portrait-primary' : 'landscape-primary');
        }
      }
    } catch (e) {
      console.warn('Orientation lock notice:', e);
    }

    setBookmarkToast(
      next === 'portrait'
        ? 'Orientación fijada: Vertical'
        : next === 'landscape'
        ? 'Orientación fijada: Horizontal'
        : 'Orientación: Automática'
    );
    setTimeout(() => setBookmarkToast(null), 2000);
  };

  // Continuous Reading Mode ("Modo Lectura" - page after page downward scroll)
  const [isContinuousReading, setIsContinuousReading] = useState<boolean>(
    settings.continuousReadingMode ?? false
  );

  const toggleReadingMode = () => {
    const next = !isContinuousReading;
    setIsContinuousReading(next);
    updateSettings({
      continuousReadingMode: next,
      mangaDirection: next ? 'webtoon' : 'horizontal',
    });
    setBookmarkToast(next ? 'Modo Lectura Continuo activado' : 'Modo Paginado activado');
    setTimeout(() => setBookmarkToast(null), 2000);
  };

  // Synchronous local state for instant page turning without waiting for DB writes
  const [currentPage, setCurrentPage] = useState<number>(activeBook ? activeBook.currentPage : 1);
  const [totalPages, setTotalPages] = useState<number>(activeBook ? activeBook.totalPages : 1);

  const bookId = activeBook?.id;
  const bookStorageKey = activeBook?.fileStorageKey;

  // Initialize page numbers when activeBook changes
  useEffect(() => {
    if (activeBook) {
      setCurrentPage(activeBook.currentPage || 1);
      setTotalPages(activeBook.totalPages || 1);
      initialSavedPageRef.current = activeBook.currentPage || 1;
      readerMountTimeRef.current = Date.now();
      hasShownCompletedModalRef.current = false;
    }
  }, [bookId]);

  // Load file buffer from storage on mount (only when the book changes)
  useEffect(() => {
    if (!bookId || !bookStorageKey) {
      setLoadingFile(false);
      return;
    }

    let isMounted = true;
    setLoadingFile(true);

    getBookFile(
      bookStorageKey,
      activeBook ? { id: activeBook.id, fileName: activeBook.fileName } : undefined
    )
      .then(buffer => {
        if (isMounted) {
          setFileBuffer(buffer);
          setLoadingFile(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          console.error('Failed to load book buffer:', err);
          setLoadingFile(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [bookId, bookStorageKey]);

  const initialSavedPageRef = useRef<number>(activeBook?.currentPage || 1);
  const readerMountTimeRef = useRef<number>(Date.now());
  const hasShownCompletedModalRef = useRef<boolean>(false);

  // Page change handler (updates local state instantly, then persists)
  const handlePageChange = useCallback(
    (newPage: number, newTotalPages?: number) => {
      if (!activeBook) return;
      const total = newTotalPages || totalPages;

      // Protection: if book was saved on page > 1, ignore premature page 1 resets within the first 1.5s
      if (
        initialSavedPageRef.current > 1 &&
        newPage === 1 &&
        Date.now() - readerMountTimeRef.current < 1500
      ) {
        console.warn(`[Reader] Intercepted premature page 1 reset. Saved page: ${initialSavedPageRef.current}`);
        return;
      }

      const clamped = Math.max(1, Math.min(newPage, Math.max(1, total)));
      setCurrentPage(clamped);
      if (newTotalPages && newTotalPages !== totalPages) {
        setTotalPages(newTotalPages);
      }
      updateBookProgress(activeBook.id, clamped, total);

      // Record reading stat (page turn)
      recordReadingTime(0, 1).catch(() => {});

      // Celebration dialog if finished (strictly once per reading session, only if not already completed)
      if (
        !hasShownCompletedModalRef.current &&
        clamped >= total &&
        total > 1 &&
        !activeBook.completedDate &&
        (activeBook.progress || 0) < 100
      ) {
        hasShownCompletedModalRef.current = true;
        setShowCompletedModal(true);
      }
    },
    [activeBook, totalPages, updateBookProgress]
  );

  // Active reading session tracker: records 1 minute every 60s
  useEffect(() => {
    if (!bookId) return;
    const interval = setInterval(() => {
      recordReadingTime(1, 0).catch(() => {});
    }, 60000);
    return () => clearInterval(interval);
  }, [bookId]);

  // Handle saving rating & review from completion modal
  const handleSaveRatingAndReview = async (rating: number, review: string) => {
    if (!activeBook) return;
    await editBook(activeBook.id, {
      rating,
      review,
      completedDate: Date.now(),
      progress: 100,
    });
    setBookmarkToast('¡Calificación y reseña guardadas!');
    setTimeout(() => setBookmarkToast(null), 2000);
  };

  // Safe reader close: cancels active TTS speech and saves latest progress before returning to library
  const handleClose = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (activeBook && currentPage > 1) {
      updateBookProgress(activeBook.id, currentPage, totalPages);
    }
    closeReader();
  }, [activeBook, currentPage, totalPages, closeReader, updateBookProgress]);

  // Android / Escape Back Button Handlers
  // 1. Fullscreen exit (Priority 220)
  useBackHandler(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
      return true;
    }
    return false;
  }, 220, isFullscreen);

  // 2. Reader Sub-modals & Drawers (Priority 200)
  useBackHandler(() => {
    if (showCompletedModal) {
      setShowCompletedModal(false);
      return true;
    }
    if (showSearchDrawer) {
      setShowSearchDrawer(false);
      return true;
    }
    if (showBookmarksDrawer) {
      setShowBookmarksDrawer(false);
      return true;
    }
    if (showSettingsSheet) {
      setShowSettingsSheet(false);
      return true;
    }
    if (showTtsModal) {
      setShowTtsModal(false);
      return true;
    }
    if (showAutoScroll) {
      setShowAutoScroll(false);
      return true;
    }
    return false;
  }, 200, showCompletedModal || showSearchDrawer || showBookmarksDrawer || showSettingsSheet || showTtsModal || showAutoScroll);

  // 3. Reader container itself: exits reader and returns to library (Priority 50)
  useBackHandler(() => {
    handleClose();
    return true;
  }, 50, !!activeBook);

  // Keyboard navigation & Physical Volume Keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeBook) return;

      // Physical Volume button navigation
      const isVolumeEnabled = settings.volumeKeyTurnPage !== false;
      const isVolumeUp = e.key === 'VolumeUp' || e.key === 'AudioVolumeUp' || e.code === 'VolumeUp' || (e as any).keyCode === 175;
      const isVolumeDown = e.key === 'VolumeDown' || e.key === 'AudioVolumeDown' || e.code === 'VolumeDown' || (e as any).keyCode === 174;

      if (isVolumeEnabled && (isVolumeUp || isVolumeDown)) {
        e.preventDefault();
        e.stopPropagation();
        const advance = settings.invertVolumeKeys ? isVolumeUp : isVolumeDown;
        if (advance) {
          if (currentPage < totalPages) handlePageChange(currentPage + 1);
        } else {
          if (currentPage > 1) handlePageChange(currentPage - 1);
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        if (currentPage < totalPages) {
          handlePageChange(currentPage + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentPage > 1) {
          handlePageChange(currentPage - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeBook, currentPage, totalPages, handlePageChange, settings.volumeKeyTurnPage, settings.invertVolumeKeys]);

  // Cleanup speech synthesis on container unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // --- Moon+ Reader Edge Brightness Gesture ---
  const edgeTouchRef = useRef<{
    active: boolean;
    startY: number;
    startBrightness: number;
    timer: any;
  }>({
    active: false,
    startY: 0,
    startBrightness: settings.brightness || 100,
    timer: null,
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch && touch.clientX < 45) {
      // Touch within left 45px edge
      edgeTouchRef.current = {
        active: true,
        startY: touch.clientY,
        startBrightness: settings.brightness || 100,
        timer: null,
      };
      setHudBrightness(settings.brightness || 100);
      setShowBrightnessHud(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!edgeTouchRef.current.active) return;
    const touch = e.touches[0];
    if (!touch) return;

    const deltaY = edgeTouchRef.current.startY - touch.clientY;
    // Every 3px of vertical movement = 1% brightness change
    const deltaBrightness = Math.round(deltaY / 2.5);
    const newBrightness = Math.max(20, Math.min(100, edgeTouchRef.current.startBrightness + deltaBrightness));

    setHudBrightness(newBrightness);
    updateSettings({ brightness: newBrightness });
    setShowBrightnessHud(true);
  };

  const handleTouchEnd = () => {
    if (edgeTouchRef.current.active) {
      edgeTouchRef.current.active = false;
      if (edgeTouchRef.current.timer) clearTimeout(edgeTouchRef.current.timer);
      edgeTouchRef.current.timer = setTimeout(() => {
        setShowBrightnessHud(false);
      }, 1200);
    }
  };

  // Toggle bookmark on current page
  const currentBookmarks = activeBook?.bookmarks || [];
  const currentBookmarkItem = currentBookmarks.find(b => b.page === currentPage);
  const isCurrentBookmarked = !!currentBookmarkItem;

  const handleToggleCurrentBookmark = () => {
    if (!activeBook) return;
    if (isCurrentBookmarked && currentBookmarkItem) {
      removeBookmark(activeBook.id, currentBookmarkItem.id);
      showToast(`Marcador eliminado de pág ${currentPage}`);
    } else {
      addBookmark(activeBook.id, currentPage);
      showToast(`Marcador guardado en pág ${currentPage}`);
    }
  };

  const showToast = (msg: string) => {
    setBookmarkToast(msg);
    setTimeout(() => {
      setBookmarkToast(null);
    }, 2000);
  };

  if (!activeBook) return null;

  const isManga =
    activeBook.format === 'cbz' ||
    activeBook.format === 'cbr' ||
    activeBook.format === 'zip';

  const isTextBased =
    activeBook.format === 'txt' ||
    activeBook.format === 'md' ||
    activeBook.format === 'epub';

  // Compute CSS filter classes based on settings
  let filterClass = '';
  if (settings.eyeFilter === 'sepia') {
    filterClass = 'filter-sepia';
  } else if (settings.eyeFilter === 'invert') {
    filterClass = 'filter-invert';
  }

  // MoonReader Outer Theme Background
  const themePreset = settings.readingThemePreset || (settings.theme === 'dark' ? 'emerald' : 'day');
  let containerBg = 'bg-slate-950 text-slate-100';
  if (themePreset === 'emerald') {
    containerBg = 'bg-[#18191c] text-zinc-100';
  } else if (themePreset === 'oled') {
    containerBg = 'bg-black text-slate-100';
  } else if (themePreset === 'sepia') {
    containerBg = 'bg-[#ece4d0] text-[#2c2214]';
  } else if (themePreset === 'sakura') {
    containerBg = 'bg-[#fae7eb] text-pink-950';
  } else if (themePreset === 'day') {
    containerBg = 'bg-[#f7f4ed] text-[#1e293b]';
  }

  const progressPercent = Math.min(100, Math.round((currentPage / Math.max(1, totalPages)) * 100));

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`fixed inset-0 z-50 flex flex-col ${containerBg} select-none overflow-hidden transition-colors duration-200`}
    >
      {/* Visual Comfort Overlays */}
      {/* 1. Amber / Warm Light Overlay (Anti Luz Azul) */}
      {settings.eyeFilter === 'warm' && (
        <div
          className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{
            backgroundColor: '#ff9800',
            opacity: (settings.warmFilterIntensity / 100) * 0.45,
            mixBlendMode: 'multiply',
          }}
        />
      )}

      {/* 2. Hardware/Software Brightness Dimmer Overlay */}
      {settings.brightness < 100 && (
        <div
          className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300 bg-black"
          style={{
            opacity: (100 - settings.brightness) / 100,
          }}
        />
      )}

      {/* 3. Floating Edge Brightness HUD (MoonReader Style) */}
      <BrightnessGestureHud
        visible={showBrightnessHud}
        brightness={hudBrightness}
      />

      {/* 4. Bookmark Toast Feedback */}
      {bookmarkToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-amber-300 border border-amber-500/40 rounded-2xl px-4 py-2 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2">
          <BookmarkIcon className="w-3.5 h-3.5 fill-amber-400" />
          <span>{bookmarkToast}</span>
        </div>
      )}

      {/* Top Floating Controls Bar */}
      <div
        onClick={e => e.stopPropagation()}
        className={`absolute top-0 inset-x-0 z-40 bg-slate-900/95 dark:bg-[#121316]/95 backdrop-blur-md border-b border-slate-800/80 dark:border-zinc-800/80 px-3 sm:px-4 py-2.5 flex items-center justify-between safe-top transition-all duration-200 ${
          showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={handleClose}
            className="p-2 -ml-1 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 dark:hover:bg-zinc-800 transition-colors"
            title="Volver a la biblioteca"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold truncate text-white">
              {activeBook.title}
            </h2>
            <p className="text-[11px] text-slate-300 dark:text-zinc-300 font-medium truncate">
              {activeBook.author || activeBook.format.toUpperCase()} • Pág {currentPage} de {totalPages}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Font Size & Typography Button for Books */}
          {isTextBased && (
            <button
              onClick={() => setShowFontSizeModal(true)}
              className="p-2 sm:p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-zinc-800 transition-all active:scale-90 cursor-pointer flex items-center justify-center font-bold"
              title="Ajustar tamaño de letra y tipografía"
            >
              <Type className="w-5 h-5 stroke-[2.2]" />
            </button>
          )}

          {/* 1. Quick Search Button */}
          <button
            onClick={() => setShowSearchDrawer(true)}
            className="p-2 sm:p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-zinc-800 transition-all active:scale-90 cursor-pointer"
            title="Buscar texto en el libro"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* 2. Quick Bookmark Toggle Button */}
          <button
            onClick={handleToggleCurrentBookmark}
            className={`p-2 sm:p-2.5 rounded-xl transition-all active:scale-90 cursor-pointer ${
              isCurrentBookmarked
                ? 'bg-amber-500/25 text-amber-400 border border-amber-500/40 ring-2 ring-amber-400/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-zinc-800'
            }`}
            title={isCurrentBookmarked ? 'Eliminar marcador de esta página' : 'Guardar marcador en esta página'}
          >
            <BookmarkIcon className={`w-5 h-5 stroke-[2.2] ${isCurrentBookmarked ? 'fill-amber-400' : ''}`} />
          </button>

          {/* 3. Ergonomic Reader Menu / Controls Bottom Sheet Trigger */}
          <button
            onClick={() => setShowSettingsSheet(true)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-200 hover:text-white border border-slate-700 dark:border-zinc-700 transition-all active:scale-95 cursor-pointer shadow-xs ml-0.5"
            title="Ajustes de lectura, modo y herramientas"
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
            <span className="text-xs font-bold hidden sm:inline">Menú</span>
          </button>
        </div>
      </div>

      {/* Reader Content Area with active Filter Class */}
      <div className={`flex-1 relative overflow-hidden flex items-center justify-center ${filterClass}`}>
        {loadingFile ? (
          <div className="flex flex-col items-center justify-center text-slate-400 dark:text-zinc-300 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            <p className="text-sm font-medium">Cargando libro desde el almacenamiento...</p>
          </div>
        ) : fileBuffer ? (
          <>
            {activeBook.format === 'pdf' && (
              <PdfReader
                key={activeBook.id}
                buffer={fileBuffer}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onToggleControls={() => setShowControls(prev => !prev)}
                showControls={showControls}
                onTextExtracted={setCurrentPageText}
                isContinuousMode={isContinuousReading}
              />
            )}

            {(activeBook.format === 'cbz' ||
              activeBook.format === 'cbr' ||
              activeBook.format === 'zip') && (
              <MangaReader
                key={activeBook.id}
                buffer={fileBuffer}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onToggleControls={() => setShowControls(prev => !prev)}
                showControls={showControls}
              />
            )}

            {activeBook.format === 'epub' && (
              <EpubReader
                key={activeBook.id}
                buffer={fileBuffer}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onToggleControls={() => setShowControls(prev => !prev)}
                onTextExtracted={setCurrentPageText}
                isContinuousMode={isContinuousReading}
              />
            )}

            {(activeBook.format === 'txt' || activeBook.format === 'md') && (
              <TextReader
                key={activeBook.id}
                buffer={fileBuffer}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onToggleControls={() => setShowControls(prev => !prev)}
                onTextExtracted={setCurrentPageText}
                isContinuousMode={isContinuousReading}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-rose-400" />
            </div>
            <div className="space-y-2">
              <p className="text-base font-bold text-slate-900 dark:text-white">Archivo no encontrado</p>
              <p className="text-sm text-slate-600 dark:text-zinc-300 max-w-xs leading-relaxed font-medium">
                No se pudo acceder al archivo de «{activeBook.title}». Es posible que haya sido eliminado o no se importó correctamente.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm transition-colors shadow-md"
            >
              Volver a la biblioteca
            </button>
          </div>
        )}
      </div>

      {/* Bottom Floating Scrubber Bar (HUD) */}
      <div
        onClick={e => e.stopPropagation()}
        className={`absolute bottom-6 inset-x-0 z-40 bg-slate-900/95 dark:bg-[#121316]/95 backdrop-blur-md border-t border-slate-800/80 dark:border-zinc-800/80 px-4 py-3 transition-all duration-200 ${
          showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Página anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Slider Scrubber */}
          <div className="flex-1 flex flex-col gap-1">
            <input
              type="range"
              min={1}
              max={Math.max(1, totalPages)}
              value={currentPage}
              onChange={e => handlePageChange(Number(e.target.value))}
              className="w-full accent-zinc-400 dark:accent-zinc-300 cursor-pointer"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-300 dark:text-zinc-300 px-1 font-mono font-medium">
              <span>Pág {currentPage}</span>
              <span className="font-bold text-white dark:text-zinc-100">{progressPercent}%</span>
              <span>Total: {totalPages}</span>
            </div>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Página siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Moon+ Reader Real-Time Bottom Status Bar (Clock, Battery, Pages, Progress) */}
      <div className="absolute bottom-0 inset-x-0 z-30">
        <MoonStatusBar
          currentPage={currentPage}
          totalPages={totalPages}
          bookTitle={activeBook.title}
          visible={settings.showMoonStatusBar !== false}
        />
      </div>

      {/* Moon+ Reader Hands-free Auto-Scroll Pill */}
      <AutoScrollControl
        isActive={showAutoScroll}
        onClose={() => setShowAutoScroll(false)}
        onPageAdvance={() => {
          if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
          }
        }}
        defaultSeconds={settings.autoScrollSeconds || 10}
      />

      {/* Moon+ Reader Text-To-Speech (TTS) Player */}
      <TtsPlayerModal
        isOpen={showTtsModal}
        onClose={() => setShowTtsModal(false)}
        currentPage={currentPage}
        totalPages={totalPages}
        bookTitle={activeBook.title}
        currentText={currentPageText}
        onNextPage={() => {
          if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
          }
        }}
        onPrevPage={() => {
          if (currentPage > 1) {
            handlePageChange(currentPage - 1);
          }
        }}
      />

      {/* Moon+ Reader Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={showBookmarksDrawer}
        onClose={() => setShowBookmarksDrawer(false)}
        bookmarks={currentBookmarks}
        currentPage={currentPage}
        onJumpToPage={page => handlePageChange(page)}
        onAddCurrentPage={() => {
          if (!activeBook) return;
          addBookmark(activeBook.id, currentPage);
          showToast(`Marcador guardado en pág ${currentPage}`);
        }}
        onRemoveBookmark={bmId => {
          if (!activeBook) return;
          removeBookmark(activeBook.id, bmId);
        }}
      />

      {/* Dedicated Quick Font Size & Typography Modal */}
      <FontSizeModal
        isOpen={showFontSizeModal}
        onClose={() => setShowFontSizeModal(false)}
        settings={settings}
        updateSettings={updateSettings}
      />

      {/* Settings & Controls Bottom Sheet (MoonReader Themes, Tools & Ergonomic Controls) */}
      <FilterSettingsSheet
        isOpen={showSettingsSheet}
        onClose={() => setShowSettingsSheet(false)}
        isManga={isManga}
        isTextBased={isTextBased}
        isContinuousReading={isContinuousReading}
        onToggleReadingMode={toggleReadingMode}
        orientationMode={orientationMode}
        onChangeOrientation={changeOrientation}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenTts={() => setShowTtsModal(true)}
        onToggleAutoScroll={() => setShowAutoScroll(prev => !prev)}
        isAutoScrollActive={showAutoScroll}
        onOpenBookmarks={() => setShowBookmarksDrawer(true)}
        bookmarksCount={currentBookmarks.length}
        onOpenSearch={() => setShowSearchDrawer(true)}
        smartTrimMargins={settings.smartTrimMargins}
        onToggleSmartTrim={() => {
          const next = !settings.smartTrimMargins;
          updateSettings({ smartTrimMargins: next });
          showToast(next ? 'Recorte inteligente activado' : 'Recorte desactivado');
        }}
      />

      {/* In-Book Full Text Search Drawer */}
      <SearchInBookDrawer
        isOpen={showSearchDrawer}
        onClose={() => setShowSearchDrawer(false)}
        book={activeBook}
        fileBuffer={fileBuffer}
        onJumpToPage={p => handlePageChange(p)}
        currentPageText={currentPageText}
      />

      {/* Book Completion Celebration Modal (Rating & Review) */}
      <BookCompletedModal
        isOpen={showCompletedModal}
        onClose={() => {
          hasShownCompletedModalRef.current = true;
          setShowCompletedModal(false);
        }}
        book={activeBook}
        onSaveRatingAndReview={handleSaveRatingAndReview}
      />
    </div>
  );
};
