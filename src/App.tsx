import React, { useState, useEffect } from 'react';
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
import { MobileDock } from './components/MobileDock';
import { ReaderContainer } from './components/Reader/ReaderContainer';
import { ReaderErrorBoundary } from './components/ReaderErrorBoundary';
import { PullToRefresh } from './components/PullToRefresh';
import type { Book } from './types';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useBackHandler, subscribeExitToast } from './services/backButton';

const LibraryView: React.FC = () => {
  const { filteredBooks, books, viewMode, isLoading, activeBook, closeReader, selectedCategoryId, categories, refreshLibrary } = useApp();

  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isCatManagerOpen, setIsCatManagerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [selectedBookForDetails, setSelectedBookForDetails] = useState<Book | null>(null);
  const [showExitToast, setShowExitToast] = useState(false);

  useEffect(() => {
    return subscribeExitToast(visible => {
      setShowExitToast(visible);
    });
  }, []);

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
      />

      {/* Responsive Category Navigation Bar */}
      <CategoryBar onOpenCategoryManager={() => setIsCatManagerOpen(true)} />

      {/* Scrollable Library Area with Pull-To-Refresh */}
      <main className="flex-1 w-full overflow-hidden flex flex-col">
        <PullToRefresh onRefresh={refreshLibrary} className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6">
          {isLoading ? (
          <div className="h-72 flex flex-col items-center justify-center text-rose-300 dark:text-zinc-500 gap-3">
            <Loader2 className="w-9 h-9 animate-spin text-rose-500 dark:text-zinc-400" />
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/60 dark:text-zinc-300/70">
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

            {/* Collection Section Header / Counter */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-rose-200/50 dark:border-zinc-800/40 text-xs text-[#881337]/75 dark:text-zinc-400/75">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                  {activeCategory ? activeCategory.name : 'Todas las obras'}
                </span>
                <span>•</span>
                <span>{filteredBooks.length} {filteredBooks.length === 1 ? 'obra' : 'obras'}</span>
              </div>
              {completedCount > 0 && (
                <div className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{completedCount} {completedCount === 1 ? 'leído' : 'leídos'}</span>
                </div>
              )}
            </div>

            {/* Book Catalog: Grid or List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-5">
                {filteredBooks.map(book => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onOpenDetails={b => setSelectedBookForDetails(b)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 max-w-4xl mx-auto">
                {filteredBooks.map(book => (
                  <BookListItem
                    key={book.id}
                    book={book}
                    onOpenDetails={b => setSelectedBookForDetails(b)}
                  />
                ))}
              </div>
            )}

            {/* Permanent Bottom Signature: "By EduardoOG" (Only visible outside reader) */}
            <footer className="w-full py-8 text-center select-none pb-28 md:pb-8">
              <p className="text-[11px] font-mono tracking-[0.25em] text-[#881337] dark:text-[#a7f3d0] opacity-35 hover:opacity-85 transition-opacity uppercase">
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
          onOpenImport={() => setIsImportOpen(true)}
          onOpenCategoryManager={() => setIsCatManagerOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenExplore={() => setIsExploreOpen(true)}
        />
      )}

      {/* Modals */}
      <ExploreModal
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
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
