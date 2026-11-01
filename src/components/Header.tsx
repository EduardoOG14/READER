import React, { useState } from 'react';
import { Search, Moon, Sun, LayoutGrid, List, Plus, ArrowUpDown, X, SlidersHorizontal, BookOpen, Globe } from 'lucide-react';
import { useApp, type SortOption } from '../context/AppContext';
import { useBackHandler } from '../services/backButton';

interface HeaderProps {
  onOpenImport: () => void;
  onOpenSettings: () => void;
  onOpenExplore: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenImport, onOpenSettings, onOpenExplore }) => {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    settings,
    updateSettings,
  } = useApp();

  const [showSearch, setShowSearch] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Close sort menu or search bar on back press (Priority 90)
  useBackHandler(() => {
    if (showSortMenu) {
      setShowSortMenu(false);
      return true;
    }
    return false;
  }, 95, showSortMenu);

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

  const sortLabels: Record<SortOption, string> = {
    recent: 'Última lectura',
    title: 'Título (A - Z)',
    progress: 'Mayor progreso',
    dateAdded: 'Fecha de añadido',
  };

  return (
    <header className="sticky top-0 z-30 bg-[#fff0f5]/90 dark:bg-[#041712]/92 backdrop-blur-xl border-b border-rose-200/80 dark:border-emerald-800/70 px-4 py-3 transition-colors duration-250 safe-top">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Name "READER" or Search Field */}
        {showSearch ? (
          <div className="flex-1 flex items-center bg-white dark:bg-[#0a2920] border border-rose-200 dark:border-emerald-700/80 rounded-2xl px-3.5 py-2 shadow-xs transition-colors animate-in fade-in duration-150">
            <Search className="w-4 h-4 text-rose-400 dark:text-emerald-400 mr-2 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Buscar libros o mangas por título, autor o formato..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-[#4c0519] dark:text-[#ecfdf5] placeholder-rose-300 dark:placeholder-emerald-500/60 outline-none font-medium"
            />
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearch(false);
              }}
              className="p-1 hover:bg-rose-100 dark:hover:bg-[#0f382c] rounded-full text-rose-400 hover:text-rose-700 dark:text-emerald-400 dark:hover:text-emerald-200 transition-colors"
              title="Cerrar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 dark:from-emerald-500 dark:to-teal-400 flex items-center justify-center text-white shadow-md shadow-rose-500/25 dark:shadow-emerald-500/25 shrink-0 transition-transform hover:scale-105">
              <BookOpen className="w-5 h-5 stroke-[2.3]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-[0.24em] font-serif uppercase text-[#4c0519] dark:text-[#ecfdf5]">
                  READER
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 dark:bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#881337]/70 dark:text-[#a7f3d0]/70 font-mono -mt-0.5">
                Libros & Mangas
              </p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {!showSearch && (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 sm:p-2.5 rounded-2xl text-[#881337] dark:text-[#a7f3d0] hover:bg-rose-100/70 dark:hover:bg-[#0f382c] transition-colors cursor-pointer"
              title="Buscar obras"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>
          )}

          {/* Sort Dropdown (Visible on Desktop / Tablets) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="p-2.5 rounded-2xl text-[#881337] dark:text-[#a7f3d0] hover:bg-rose-100/70 dark:hover:bg-[#0f382c] transition-colors cursor-pointer"
              title="Ordenar biblioteca"
            >
              <ArrowUpDown className="w-5 h-5 stroke-[2]" />
            </button>

            {showSortMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSortMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#0a2920] border border-rose-200 dark:border-emerald-700/80 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-rose-400 dark:text-emerald-400 uppercase tracking-widest">
                    Ordenar por
                  </div>
                  {(Object.keys(sortLabels) as SortOption[]).map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-rose-50 dark:hover:bg-[#0f382c] transition-colors ${
                        sortBy === option
                          ? 'text-rose-600 dark:text-emerald-300 font-bold bg-rose-50/60 dark:bg-emerald-950/40'
                          : 'text-[#4c0519] dark:text-[#ecfdf5] font-medium'
                      }`}
                    >
                      {sortLabels[option]}
                      {sortBy === option && (
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* View mode toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 sm:p-2.5 rounded-2xl text-[#881337] dark:text-[#a7f3d0] hover:bg-rose-100/70 dark:hover:bg-[#0f382c] transition-colors cursor-pointer"
            title={viewMode === 'grid' ? 'Cambiar a lista' : 'Cambiar a cuadrícula'}
          >
            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
          </button>

          {/* Quick Settings (Desktop only, mobile has it in dock) */}
          <button
            onClick={onOpenSettings}
            className="hidden md:flex p-2.5 rounded-2xl text-[#881337] dark:text-[#a7f3d0] hover:bg-rose-100/70 dark:hover:bg-[#0f382c] transition-colors cursor-pointer"
            title="Ajustes y descanso ocular"
          >
            <SlidersHorizontal className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Dark / Light toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-2xl text-[#881337] dark:text-zinc-300 hover:bg-rose-100/70 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title={settings.theme === 'dark' ? 'Modo Claro (Sakura Pastel)' : 'Modo Oscuro (Gris Industrial)'}
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-5 h-5 text-zinc-300 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-rose-500 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Online Explore / Download button */}
          <button
            onClick={onOpenExplore}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 dark:from-emerald-500/15 dark:to-teal-400/15 border border-rose-300/80 dark:border-emerald-600/70 text-rose-700 dark:text-emerald-300 hover:scale-102 active:scale-95 transition-all text-xs font-bold cursor-pointer"
            title="Explorar y descargar libros y mangas online"
          >
            <Globe className="w-4 h-4 stroke-[2.2]" />
            <span className="hidden sm:inline">Explorar</span>
          </button>

          {/* Import button (Desktop) */}
          <button
            onClick={onOpenImport}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:to-pink-600 dark:from-emerald-500 dark:via-teal-400 dark:to-emerald-500 dark:hover:from-emerald-400 dark:text-slate-950 text-white px-4 py-2 rounded-2xl font-bold text-xs shadow-md shadow-rose-500/25 dark:shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer ml-1"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Importar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
