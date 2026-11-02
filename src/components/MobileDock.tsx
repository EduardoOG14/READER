import React from 'react';
import { BookOpen, FolderTree, Plus, Compass, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

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
  const { selectedCategoryId, setSelectedCategoryId } = useApp();

  return (
    <nav className="md:hidden fixed bottom-[max(env(safe-area-inset-bottom,12px),12px)] inset-x-3 z-40 max-w-sm mx-auto select-none pointer-events-auto">
      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-rose-200/90 dark:border-zinc-800 shadow-2xl shadow-rose-950/15 dark:shadow-black/70 rounded-3xl px-2 py-1 flex items-center justify-between">
        
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
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all active:scale-90 cursor-pointer ${
            selectedCategoryId === 'cat-all'
              ? 'text-rose-600 dark:text-white font-bold bg-rose-50/80 dark:bg-zinc-800/80'
              : 'text-[#881337]/90 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Libros</span>
        </button>

        {/* 2. Catálogo Público */}
        <button
          onClick={onOpenExplore}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl text-[#881337]/90 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white transition-all active:scale-90 cursor-pointer"
          title="Biblioteca de obras en español"
        >
          <Compass className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Catálogo</span>
        </button>

        {/* 3. CENTER HIGHLIGHT: + Importar */}
        <div className="-translate-y-3 px-1.5 shrink-0">
          <button
            onClick={onOpenImport}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 text-white dark:text-zinc-950 flex items-center justify-center shadow-lg shadow-rose-500/40 dark:shadow-black/60 active:scale-90 transition-transform cursor-pointer border-3 border-white dark:border-zinc-900"
            title="Importar libro o manga desde archivo"
          >
            <Plus className="w-7 h-7 stroke-[2.8]" />
          </button>
        </div>

        {/* 4. Categorías & Colecciones */}
        <button
          onClick={onOpenCategoryManager}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl text-[#881337]/90 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white transition-all active:scale-90 cursor-pointer"
          title="Administrar categorías"
        >
          <FolderTree className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Colección</span>
        </button>

        {/* 5. Ajustes y Sistema */}
        <button
          onClick={onOpenSettings}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl text-[#881337]/90 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white transition-all active:scale-90 cursor-pointer"
          title="Ajustes de la aplicación"
        >
          <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Ajustes</span>
        </button>
      </div>
    </nav>
  );
};
