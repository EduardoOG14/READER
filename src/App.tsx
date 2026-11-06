import React, { useState, useEffect, useMemo } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { SpotlightHero } from './components/SpotlightHero';
import { BookCard } from './components/BookCard';
import { BookListItem } from './components/BookListItem';
import { EmptyState } from './components/EmptyState';
import { ImportModal } from './components/ImportModal';
import { CategoryManagerModal } from './components/CategoryManagerModal';
import { BookDetailModal } from './components/BookDetailModal';
import { SettingsModal } from './components/SettingsModal';
import { ExploreModal } from './components/ExploreModal';
import { DownloadCenterModal } from './components/DownloadCenterModal';
import { BottomQuickMenuModal } from './components/BottomQuickMenuModal';
import { BottomSearchSheet } from './components/BottomSearchSheet';
import { MobileDock } from './components/MobileDock';
import { ReaderContainer } from './components/Reader/ReaderContainer';
import { ReaderErrorBoundary } from './components/ReaderErrorBoundary';
import { PullToRefresh } from './components/PullToRefresh';
import type { Book } from './types';
import { Loader2, CheckCircle2, Layers, ArrowLeft, Download, Play, X } from 'lucide-react';
import { useBackHandler, subscribeExitToast } from './services/backButton';
import { downloadQueue, type QueueState, type QueueItem } from './services/downloadQueue';
import { getAllBooks } from './services/storage';

const LibraryView: React.FC = () => {
  const { filteredBooks, books, viewMode, isLoading, activeBook, openReader, closeReader, selectedCategoryId, categories, refreshLibrary } = useApp();

  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isCatManagerOpen, setIsCatManagerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isDownloadCenterOpen, setIsDownloadCenterOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
  const [selectedBookForDetails, setSelectedBookForDetails] = useState<Book | null>(null);
  const [showExitToast, setShowExitToast] = useState(false);
  const [groupBySeries, setGroupBySeries] = useState(false);
  const [selectedSeriesName, setSelectedSeriesName] = useState<string | null>(null);
  const [queueState, setQueueState] = useState<QueueState>(downloadQueue.getState());
  const [downloadCompleteToast, setDownloadCompleteToast] = useState<{ title: string; item: QueueItem } | null>(null);
  const [downloadEnqueuedToast, setDownloadEnqueuedToast] = useState<{ title: string; count: number } | null>(null);

  useEffect(() => {
    downloadQueue.setRefreshHandler(refreshLibrary);
    return downloadQueue.subscribe(state => setQueueState(state));
  }, [refreshLibrary]);

  useEffect(() => {
    let completeTimeout: any = null;
    let enqueueTimeout: any = null;

    const unsubscribe = downloadQueue.onDownloadEvent(event => {
      if (event.type === 'completed') {
        setDownloadEnqueuedToast(null);
        setDownloadCompleteToast({ title: event.title, item: event.item });
        clearTimeout(completeTimeout);
        completeTimeout = setTimeout(() => {
          setDownloadCompleteToast(null);
        }, 8000);
      } else if (event.type === 'enqueued') {
        setDownloadEnqueuedToast({ title: event.title, count: event.count || 1 });
        clearTimeout(enqueueTimeout);
        enqueueTimeout = setTimeout(() => {
          setDownloadEnqueuedToast(null);
        }, 5000);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(completeTimeout);
      clearTimeout(enqueueTimeout);
    };
  }, []);

  const handleOpenDownloadedBook = async (item: QueueItem) => {
    setDownloadCompleteToast(null);
    let found = books.find(
      b =>
        b.title.trim().toLowerCase() === item.item.title.trim().toLowerCase() ||
        b.id === item.item.id
    );
    if (!found) {
      try {
        await refreshLibrary();
        const stored = await getAllBooks();
        found = stored.find(
          b =>
            b.title.trim().toLowerCase() === item.item.title.trim().toLowerCase() ||
            b.id === item.item.id
        );
      } catch (e) {
        console.warn('Error finding downloaded book:', e);
      }
    }
    if (found) {
      openReader(found);
    }
  };

  useEffect(() => {
    return subscribeExitToast(visible => {
      setShowExitToast(visible);
    });
  }, []);

  // Back Button Interceptor for Series drilldown (Priority 105)
  useBackHandler(() => {
    if (selectedSeriesName) {
      setSelectedSeriesName(null);
      return true;
    }
    return false;
  }, 105, !!selectedSeriesName);

  // Group books by series
  const seriesGroups = useMemo(() => {
    const map: Record<string, Book[]> = {};
    const standalone: Book[] = [];

    for (const b of filteredBooks) {
      if (b.series && b.series.trim()) {
        const sName = b.series.trim();
        if (!map[sName]) map[sName] = [];
        map[sName].push(b);
      } else {
        standalone.push(b);
      }
    }

    Object.keys(map).forEach(sName => {
      map[sName].sort((a, b) => (a.seriesOrder || 1) - (b.seriesOrder || 1));
    });

    return { map, standalone };
  }, [filteredBooks]);

  const hasAnySeries = Object.keys(seriesGroups.map).length > 0;

  const displayBooks = useMemo(() => {
    if (selectedSeriesName) {
      return seriesGroups.map[selectedSeriesName] || [];
    }
    return filteredBooks;
  }, [selectedSeriesName, seriesGroups, filteredBooks]);

  // Back Button Interceptors for Modals (Priority 110)
  useBackHandler(() => {
    if (selectedBookForDetails) {
      setSelectedBookForDetails(null);
      return true;
    }
    return false;
  }, 110, !!selectedBookForDetails);

  useBackHandler(() => {
    if (isSettingsOpen) {
      setIsSettingsOpen(false);
      return true;
    }
    return false;
  }, 110, isSettingsOpen);

  useBackHandler(() => {
    if (isCatManagerOpen) {
      setIsCatManagerOpen(false);
      return true;
    }
    return false;
  }, 110, isCatManagerOpen);

  useBackHandler(() => {
    if (isImportOpen) {
      setIsImportOpen(false);
      return true;
    }
    return false;
  }, 110, isImportOpen);

  useBackHandler(() => {
    if (isExploreOpen) {
      setIsExploreOpen(false);
      return true;
    }
    return false;
  }, 110, isExploreOpen);

  useBackHandler(() => {
    if (isDownloadCenterOpen) {
      setIsDownloadCenterOpen(false);
      return true;
    }
    return false;
  }, 110, isDownloadCenterOpen);

  const completedCount = books.filter(b => b.progress >= 100 || b.currentPage >= b.totalPages).length;
  const activeCategory = categories.find(c => c.id === selectedCategoryId);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#fff0f5] dark:bg-[#121316] text-[#4c0519] dark:text-[#f3f4f6] transition-colors duration-300">
      {/* Reader overlay (Hides home, dock and signature completely when active) */}
      {activeBook && (
        <ReaderErrorBoundary onReset={closeReader}>
          <ReaderContainer />
        </ReaderErrorBoundary>
      )}

      {/* Main Header with "READER" branding */}
      <Header
        onOpenImport={() => setIsImportOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenExplore={() => setIsExploreOpen(true)}
        onOpenDownloadCenter={() => setIsDownloadCenterOpen(true)}
      />

      {/* Responsive Category Navigation Bar */}
      <CategoryBar onOpenCategoryManager={() => setIsCatManagerOpen(true)} />

      {/* Scrollable Library Area with Pull-To-Refresh */}
      <main className="flex-1 w-full overflow-hidden flex flex-col">
        <PullToRefresh onRefresh={refreshLibrary} className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6">
          {isLoading ? (
          <div className="h-72 flex flex-col items-center justify-center text-rose-300 dark:text-zinc-400 gap-3">
            <Loader2 className="w-9 h-9 animate-spin text-rose-500 dark:text-zinc-400" />
            <p className="text-xs font-bold uppercase tracking-wider text-rose-900/60 dark:text-zinc-300">
              Cargando biblioteca READER...
            </p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <EmptyState
            onOpenImport={() => setIsImportOpen(true)}
            onOpenExplore={() => setIsExploreOpen(true)}
          />
        ) : (
          <>
            {/* Spotlight Banner: Continue reading current book */}
            <SpotlightHero />

            {/* Collection Section Header / Counter & Sagas Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-rose-200/50 dark:border-zinc-800/40 text-xs text-[#881337]/75 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                {selectedSeriesName ? (
                  <button
                    onClick={() => setSelectedSeriesName(null)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-100 dark:bg-purple-950/60 font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-200 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Todas las Sagas</span>
                  </button>
                ) : null}
                <span className="font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                  {selectedSeriesName
                    ? `Saga: ${selectedSeriesName}`
                    : activeCategory
                    ? activeCategory.name
                    : 'Todas las obras'}
                </span>
                <span>•</span>
                <span>
                  {displayBooks.length} {displayBooks.length === 1 ? 'obra' : 'obras'}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Toggle Group by Series */}
                {hasAnySeries && !selectedSeriesName && (
                  <button
                    onClick={() => setGroupBySeries(prev => !prev)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                      groupBySeries
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-rose-100/70 dark:bg-zinc-800 text-[#881337] dark:text-zinc-300 hover:bg-rose-100'
                    }`}
                    title="Agrupar tomos por saga o colección"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{groupBySeries ? 'Agrupado por Sagas' : 'Ver por Sagas'}</span>
                  </button>
                )}

                {completedCount > 0 && (
                  <div className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{completedCount} {completedCount === 1 ? 'leído' : 'leídos'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sagas View (Folder Cards) */}
            {groupBySeries && !selectedSeriesName ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-400 mb-3 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>Colecciones y Sagas ({Object.keys(seriesGroups.map).length})</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                    {(Object.entries(seriesGroups.map) as [string, Book[]][]).map(([sName, sBooks]) => {
                      const avgProgress = Math.round(
                        sBooks.reduce((acc: number, b: Book) => acc + (b.progress || 0), 0) / Math.max(1, sBooks.length)
                      );
                      const cover = sBooks[0]?.coverUrl;

                      return (
                        <div
                          key={sName}
                          onClick={() => setSelectedSeriesName(sName)}
                          className="group relative cursor-pointer p-3 rounded-2xl bg-gradient-to-br from-purple-500/10 via-rose-500/5 to-purple-500/15 dark:from-zinc-900 dark:to-zinc-800 border border-purple-300/60 dark:border-purple-500/30 hover:border-purple-500 dark:hover:border-purple-400 transition-all hover:scale-102 flex flex-col justify-between gap-2 shadow-sm"
                        >
                          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-purple-900/10 flex items-center justify-center">
                            {cover ? (
                              <img src={cover} alt={sName} className="w-full h-full object-cover" />
                            ) : (
                              <Layers className="w-10 h-10 text-purple-400" />
                            )}
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-purple-600/90 text-white font-bold text-[10px] uppercase shadow-xs">
                              {sBooks.length} tomos
                            </div>
                          </div>
                          <div>
                            <h4 className="font-extrabold text-xs sm:text-sm line-clamp-1 text-[#4c0519] dark:text-[#f3f4f6]">
                              {sName}
                            </h4>
                            <p className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold">
                              {avgProgress}% completado
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Standalone Works */}
                {seriesGroups.standalone.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900/60 dark:text-zinc-400 mb-3">
                      Obras Individuales ({seriesGroups.standalone.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-5">
                      {seriesGroups.standalone.map((book: Book) => (
                        <BookCard
                          key={book.id}
                          book={book}
                          onOpenDetails={b => setSelectedBookForDetails(b)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Regular or Selected Series Book Catalog: Grid or List */
              viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-5">
                  {displayBooks.map((book: Book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onRead={b => openReader(b)}
                      onOpenDetails={b => setSelectedBookForDetails(b)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 max-w-4xl mx-auto">
                  {displayBooks.map((book: Book) => (
                    <BookListItem
                      key={book.id}
                      book={book}
                      onRead={b => openReader(b)}
                      onOpenDetails={b => setSelectedBookForDetails(b)}
                    />
                  ))}
                </div>
              )
            )}

            {/* Permanent Bottom Signature: "By EduardoOG" (Only visible outside reader) */}
            <footer className="w-full py-8 text-center select-none pb-28 md:pb-8">
              <p className="text-[11px] font-mono tracking-[0.25em] text-[#881337]/80 dark:text-zinc-400 opacity-60 hover:opacity-95 transition-opacity uppercase font-medium">
                By EduardoOG
              </p>
            </footer>
          </>
        )}
        </PullToRefresh>
      </main>

      {/* Floating Bottom Dock for Mobile */}
      {!activeBook && (
        <MobileDock
          onOpenQuickMenu={() => setIsQuickMenuOpen(true)}
          onOpenSearch={() => setIsSearchSheetOpen(true)}
          onOpenExplore={() => setIsExploreOpen(true)}
          onOpenDownloadCenter={() => setIsDownloadCenterOpen(true)}
        />
      )}

      {/* Modals & Ergonomic Bottom Sheets */}
      <BottomQuickMenuModal
        isOpen={isQuickMenuOpen}
        onClose={() => setIsQuickMenuOpen(false)}
        onOpenImport={() => setIsImportOpen(true)}
        onOpenExplore={() => setIsExploreOpen(true)}
        onOpenDownloadCenter={() => setIsDownloadCenterOpen(true)}
        onOpenCategoryManager={() => setIsCatManagerOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <BottomSearchSheet
        isOpen={isSearchSheetOpen}
        onClose={() => setIsSearchSheetOpen(false)}
        onOpenBookDetails={b => setSelectedBookForDetails(b)}
        onOpenExplore={() => setIsExploreOpen(true)}
      />

      <ExploreModal
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
      />

      <DownloadCenterModal
        isOpen={isDownloadCenterOpen}
        onClose={() => setIsDownloadCenterOpen(false)}
        onOpenExplore={() => {
          setIsDownloadCenterOpen(false);
          setIsExploreOpen(true);
        }}
      />

      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />

      <CategoryManagerModal
        isOpen={isCatManagerOpen}
        onClose={() => setIsCatManagerOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <BookDetailModal
        book={selectedBookForDetails}
        isOpen={!!selectedBookForDetails}
        onClose={() => setSelectedBookForDetails(null)}
      />

      {/* Floating Download Queue Pill across Library */}
      {queueState.isProcessing && !activeBook && !isDownloadCenterOpen && (
        <div
          onClick={() => setIsDownloadCenterOpen(true)}
          className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-40 bg-slate-900/95 dark:bg-[#18191c]/95 text-white border border-rose-400/50 rounded-2xl px-4 py-2.5 shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs font-semibold cursor-pointer animate-in fade-in slide-in-from-bottom-3 max-w-sm"
        >
          <Loader2 className="w-4 h-4 animate-spin text-rose-400 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-bold truncate text-[11px]">
              {queueState.activeItem?.progressMessage || `Descargando: ${queueState.activeItem?.item.title}...`}
            </p>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="bg-gradient-to-r from-rose-500 to-pink-400 h-full transition-all duration-300"
                style={{ width: `${queueState.activeItem?.progressPercent || 15}%` }}
              />
            </div>
          </div>
          {queueState.pendingItems.length > 0 && (
            <span className="text-[10px] font-bold text-rose-300 shrink-0">
              +{queueState.pendingItems.length}
            </span>
          )}
        </div>
      )}

      {/* Global Floating Toast: Download Enqueued in background */}
      {downloadEnqueuedToast && !activeBook && !downloadCompleteToast && (
        <div className="fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-slate-900/95 dark:bg-[#18191c]/95 text-white border border-rose-400/50 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4 animate-pulse" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black truncate text-white">
                  Descargando «{downloadEnqueuedToast.title}»
                </p>
                <p className="text-[11px] text-slate-300 truncate">
                  {downloadEnqueuedToast.count > 1 ? `${downloadEnqueuedToast.count} episodios en segundo plano.` : 'En segundo plano.'} Puedes cerrar los menús.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setDownloadEnqueuedToast(null);
                setIsDownloadCenterOpen(true);
              }}
              className="py-1.5 px-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shrink-0 cursor-pointer active:scale-95"
            >
              Ver cola
            </button>
          </div>
        </div>
      )}

      {/* Global Floating Banner: Download Completed with [ Leer ahora ] */}
      {downloadCompleteToast && !activeBook && (
        <div className="fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-slate-900/95 dark:bg-[#18191c]/95 text-white border border-emerald-500/60 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-black text-emerald-400 uppercase tracking-wide">
                  ¡Descarga completada!
                </p>
                <p className="text-xs font-bold truncate text-white">
                  {downloadCompleteToast.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenDownloadedBook(downloadCompleteToast.item)}
                className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Leer ahora</span>
              </button>
              <button
                onClick={() => setDownloadCompleteToast(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Android Double-Back Exit Toast */}
      {showExitToast && (
        <div className="fixed bottom-24 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-200">
          <div className="bg-slate-900/95 dark:bg-[#18191c]/95 text-white dark:text-zinc-100 border border-rose-300/40 dark:border-zinc-600/40 rounded-full px-5 py-2.5 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
            <span className="w-2 h-2 rounded-full bg-rose-500 dark:bg-zinc-400 animate-ping" />
            <span>Presiona atrás nuevamente para salir</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <LibraryView />
    </AppProvider>
  );
}
