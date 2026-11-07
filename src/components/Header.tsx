import React, { useState, useEffect } from 'react';
import {
  Search,
  Moon,
  Sun,
  LayoutGrid,
  List,
  Plus,
  X,
  SlidersHorizontal,
  BookOpen,
  Check,
  Download,
  Flame,
} from 'lucide-react';
import { useApp, type SortOption } from '../context/AppContext';
import { useBackHandler } from '../services/backButton';
import { downloadQueue, type QueueState } from '../services/downloadQueue';
import { getReadingStats } from '../services/readingStats';

interface HeaderProps {
  onOpenImport: () => void;
  onOpenSettings: () => void;
  onOpenExplore: () => void;
  onOpenDownloadCenter?: () => void;
  onOpenStats?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenImport,
  onOpenSettings,
  onOpenExplore,
  onOpenDownloadCenter,
  onOpenStats,
}) => {
  const [queueState, setQueueState] = useState<QueueState>(downloadQueue.getState());
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    getReadingStats().then(s => setStreak(s.currentStreak));
    return downloadQueue.subscribe(state => setQueueState(state));
  }, []);
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    settings,
    updateSettings,
    books,
  } = useApp();

  const [showSearch, setShowSearch] = useState(false);
  const [showViewOptions, setShowViewOptions] = useState(false);

  // Close menus on back button press (Priority 95)
  useBackHandler(() => {
    if (showViewOptions) {
      setShowViewOptions(false);
      return true;
    }
    return false;
  }, 95, showViewOptions);

  useBackHandler(() => {
    if (showSearch) {
      setSearchQuery('');
      setShowSearch(false);
      return true;
    }
    return false;
  }, 90, showSearch);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  const sortOptions: { id: SortOption; label: string; desc: string }[] = [
    { id: 'recent', label: 'Última lectura', desc: 'Obras que abriste recientemente' },
    { id: 'title', label: 'Título (A - Z)', desc: 'Orden alfabético por nombre' },
    { id: 'progress', label: 'Mayor progreso', desc: 'Obras más avanzadas primero' },
    { id: 'dateAdded', label: 'Fecha añadido', desc: 'Últimas obras guardadas en el dispositivo' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#fff0f5]/90 dark:bg-[#121316]/95 backdrop-blur-xl border-b border-rose-200/80 dark:border-zinc-800 px-3 sm:px-4 py-2.5 transition-colors duration-200 safe-top">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2.5">
        
        {/* Full-Width Search Input or Brand Logo */}
        {showSearch ? (
          <div className="flex-1 flex items-center bg-white dark:bg-zinc-900 border border-rose-200 dark:border-zinc-700/80 rounded-2xl px-3.5 py-2 shadow-xs transition-colors animate-in fade-in zoom-in-95 duration-150">
            <Search className="w-4 h-4 text-rose-500 dark:text-zinc-400 mr-2.5 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Buscar por título, autor o formato..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm text-[#4c0519] dark:text-zinc-100 placeholder-rose-300 dark:placeholder-zinc-500 outline-none font-medium"
            />
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearch(false);
              }}
              className="p-1 hover:bg-rose-100 dark:hover:bg-zinc-800 rounded-full text-rose-400 hover:text-rose-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              title="Cerrar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 dark:shadow-black/40 shrink-0 transition-transform group-hover:scale-105 active:scale-95">
              <BookOpen className="w-5 h-5 stroke-[2.3]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-[0.2em] font-serif uppercase text-[#4c0519] dark:text-zinc-100">
                  READER
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 dark:bg-zinc-400 animate-pulse" />
              </div>
              <p className="text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#881337]/70 dark:text-zinc-400 font-mono -mt-0.5">
                {books.length} {books.length === 1 ? 'obra' : 'obras'} en biblioteca
              </p>
            </div>
          </div>
        )}

        {/* Action Controls Bar */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Reading Streak Indicator */}
          {onOpenStats && (
            <button
              onClick={onOpenStats}
              className="flex items-center gap-1 py-1.5 px-2.5 rounded-2xl bg-amber-500/15 text-amber-800 dark:text-amber-300 hover:bg-amber-500/25 border border-amber-300/60 dark:border-amber-500/30 text-xs font-black transition-all active:scale-95 cursor-pointer"
              title="Ver estadísticas y racha de lectura"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{streak}d</span>
            </button>
          )}

          {/* Download Center Trigger (Desktop) */}
          {onOpenDownloadCenter && (
            <button
              onClick={onOpenDownloadCenter}
              className="hidden sm:flex relative p-2 sm:p-2.5 rounded-2xl text-[#881337] dark:text-zinc-300 hover:bg-rose-100/70 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
              title="Centro de Descargas"
            >
              <Download className="w-5 h-5 stroke-[2]" />
              {(queueState.isProcessing || queueState.pendingItems.length > 0) ? (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-900 animate-pulse" />
              ) : queueState.completedCount > 0 ? (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
              ) : null}
            </button>
          )}

          {/* 1. Instant Search Trigger (Desktop) */}
          {!showSearch && (
            <button
              onClick={() => setShowSearch(true)}
              className="hidden sm:flex p-2 sm:p-2.5 rounded-2xl text-[#881337] dark:text-zinc-300 hover:bg-rose-100/70 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
              title="Buscar obras"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>
          )}

          {/* 2. Visual View & Sort Options (Desktop) */}
          <div className="hidden sm:block relative">
            <button
              onClick={() => setShowViewOptions(prev => !prev)}
              className={`p-2 sm:p-2.5 rounded-2xl transition-all active:scale-95 cursor-pointer ${
                showViewOptions
                  ? 'bg-rose-200/80 text-rose-800 dark:bg-zinc-700 dark:text-zinc-100 shadow-xs'
                  : 'text-[#881337] dark:text-zinc-300 hover:bg-rose-100/70 dark:hover:bg-zinc-800'
              }`}
              title="Organizar y vista"
            >
              <SlidersHorizontal className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Desktop Popover Menu */}
            {showViewOptions && (
              <div className="hidden md:block absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-rose-200 dark:border-zinc-700/80 rounded-3xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* View Mode Switcher */}
                <div className="mb-3 pb-2 border-b border-rose-100 dark:border-zinc-800">
                  <div className="text-[10px] font-bold text-rose-900/80 dark:text-zinc-300 uppercase tracking-widest mb-1.5 px-1">
                    Diseño de vista
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 bg-rose-50 dark:bg-zinc-800 p-1 rounded-2xl">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-zinc-700 text-rose-600 dark:text-white shadow-xs'
                          : 'text-slate-700 dark:text-zinc-200'
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Cuadrícula</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        viewMode === 'list'
                          ? 'bg-white dark:bg-zinc-700 text-rose-600 dark:text-white shadow-xs'
                          : 'text-slate-700 dark:text-zinc-200'
                      }`}
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>Lista</span>
                    </button>
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <div className="text-[10px] font-bold text-rose-900/80 dark:text-zinc-300 uppercase tracking-widest mb-1 px-1">
                    Ordenar por
                  </div>
                  <div className="space-y-1">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSortBy(opt.id);
                          setShowViewOptions(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          sortBy === opt.id
                            ? 'bg-rose-100/70 text-rose-700 dark:bg-zinc-800 dark:text-white font-bold'
                            : 'text-[#4c0519] dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-zinc-800/60'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.id && <Check className="w-4 h-4 stroke-[2.5]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-2xl text-[#881337] dark:text-zinc-300 hover:bg-rose-100/70 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
            title={settings.theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-5 h-5 text-zinc-300 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-rose-500 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* 4. Settings Button (Desktop) */}
          <button
            onClick={onOpenSettings}
            className="hidden sm:flex p-2.5 rounded-2xl text-[#881337] dark:text-zinc-300 hover:bg-rose-100/70 dark:hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
            title="Ajustes de la aplicación"
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* 5. Public Catalog (Desktop button) */}
          <button
            onClick={onOpenExplore}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 dark:from-zinc-800 dark:to-zinc-800/90 border border-rose-300/80 dark:border-zinc-700 text-rose-700 dark:text-zinc-200 hover:scale-102 active:scale-95 transition-all text-xs font-bold cursor-pointer"
            title="Biblioteca de obras en español"
          >
            <BookOpen className="w-4 h-4 stroke-[2.2]" />
            <span>Catálogo Público</span>
          </button>

          {/* 5. Import Button (Desktop) */}
          <button
            onClick={onOpenImport}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:to-pink-600 dark:from-zinc-200 dark:to-zinc-300 dark:hover:from-white dark:hover:to-zinc-200 dark:text-zinc-950 text-white px-4 py-2 rounded-2xl font-bold text-xs shadow-md shadow-rose-500/20 dark:shadow-black/40 active:scale-95 transition-all cursor-pointer ml-1"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Importar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
