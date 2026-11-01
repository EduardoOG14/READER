import React, { useState } from 'react';
import { BookOpen, FolderTree, Plus, Library, Sliders, Check } from 'lucide-react';
import { useApp, type SortOption } from '../context/AppContext';

interface MobileDockProps {
  onOpenImport: () => void;
  onOpenCategoryManager: () => void;
  onOpenSettings: () => void;
  onOpenExplore: () => void;
}

export const MobileDock: React.FC<MobileDockProps> = ({
  onOpenImport,
  onOpenCategoryManager,
  onOpenSettings,
  onOpenExplore,
}) => {
  const { sortBy, setSortBy, selectedCategoryId, setSelectedCategoryId } = useApp();
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions: { id: SortOption; label: string }[] = [
    { id: 'recent', label: 'Última lectura' },
    { id: 'title', label: 'Título (A - Z)' },
    { id: 'progress', label: 'Mayor progreso' },
    { id: 'dateAdded', label: 'Fecha añadido' },
  ];

  return (
    <>
      {/* Sort Menu Drawer on Mobile */}
      {showSortMenu && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setShowSortMenu(false)}
          />
          <div className="relative bg-white dark:bg-zinc-900 border-t border-rose-200 dark:border-zinc-700/80 rounded-t-3xl p-5 z-10 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-1 bg-rose-200 dark:bg-zinc-700 rounded-full mx-auto mb-4" />
            <h4 className="text-sm font-bold text-[#4c0519] dark:text-zinc-100 mb-3 text-center">
              Ordenar biblioteca
            </h4>
            <div className="space-y-1 mb-4">
              {sortOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSortBy(opt.id);
                    setShowSortMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    sortBy === opt.id
                      ? 'bg-rose-100/70 text-rose-700 dark:bg-zinc-800 dark:text-white'
                      : 'text-[#881337] dark:text-zinc-400 hover:bg-rose-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.id && <Check className="w-4 h-4 stroke-[2.5]" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSortMenu(false)}
              className="w-full py-2.5 rounded-2xl bg-rose-100/60 dark:bg-zinc-800 text-[#881337] dark:text-zinc-300 font-semibold text-xs"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Dock (Mobile Only) */}
      <nav className="md:hidden fixed bottom-3 inset-x-3 z-40 max-w-sm mx-auto">
        <div className="bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl border border-rose-200/90 dark:border-zinc-800 shadow-xl shadow-rose-950/10 dark:shadow-black/60 rounded-3xl px-3 py-1.5 flex items-center justify-between">
          {/* 1. Biblioteca (Home) */}
          <button
            onClick={() => {
              setSelectedCategoryId('cat-all');
              const el = document.getElementById('library-scroll-container');
              if (el) {
                el.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`flex flex-col items-center gap-0.5 p-2 rounded-2xl transition-all cursor-pointer ${
              selectedCategoryId === 'cat-all'
                ? 'text-rose-600 dark:text-white font-bold scale-105'
                : 'text-[#881337]/70 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] tracking-tight">Libros</span>
          </button>

          {/* 2. Categorías */}
          <button
            onClick={onOpenCategoryManager}
            className="flex flex-col items-center gap-0.5 p-2 rounded-2xl text-[#881337]/70 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-zinc-200 transition-all cursor-pointer"
          >
            <FolderTree className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] tracking-tight">Categorías</span>
          </button>

          {/* 3. CENTER HIGHLIGHT (+ Importar) */}
          <div className="-translate-y-4 px-1">
            <button
              onClick={onOpenImport}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 dark:from-zinc-200 dark:via-zinc-300 dark:to-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center shadow-lg shadow-rose-500/35 dark:shadow-black/50 active:scale-90 transition-transform cursor-pointer border-2 border-white dark:border-zinc-900"
              title="Importar libro o manga"
            >
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* 4. Biblioteca Pública / Catálogo */}
          <button
            onClick={onOpenExplore}
            className="flex flex-col items-center gap-0.5 p-2 rounded-2xl text-rose-600 dark:text-zinc-300 hover:scale-105 transition-all cursor-pointer"
            title="Biblioteca de obras en español"
          >
            <Library className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] font-bold tracking-tight">Catálogo</span>
          </button>

          {/* 5. Ajustes */}
          <button
            onClick={onOpenSettings}
            className="flex flex-col items-center gap-0.5 p-2 rounded-2xl text-[#881337]/70 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-zinc-200 transition-all cursor-pointer"
          >
            <Sliders className="w-5 h-5 stroke-[2]" />
            <span className="text-[10px] tracking-tight">Ajustes</span>
          </button>
        </div>
      </nav>
    </>
  );
};
