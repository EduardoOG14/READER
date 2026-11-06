import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Download, Compass, Menu, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadQueue, type QueueState } from '../services/downloadQueue';

interface MobileDockProps {
  onOpenQuickMenu: () => void;
  onOpenSearch: () => void;
  onOpenExplore: () => void;
  onOpenDownloadCenter: () => void;
}

export const MobileDock: React.FC<MobileDockProps> = ({
  onOpenQuickMenu,
  onOpenSearch,
  onOpenExplore,
  onOpenDownloadCenter,
}) => {
  const { selectedCategoryId, setSelectedCategoryId } = useApp();
  const [queueState, setQueueState] = useState<QueueState>(downloadQueue.getState());

  useEffect(() => {
    return downloadQueue.subscribe(state => setQueueState(state));
  }, []);

  const hasActiveDownloads = queueState.isProcessing || queueState.pendingItems.length > 0;
  const totalActive = queueState.pendingItems.length + (queueState.activeItem ? 1 : 0);

  return (
    <nav className="md:hidden fixed bottom-[max(env(safe-area-inset-bottom,10px),10px)] inset-x-2.5 z-40 max-w-md mx-auto select-none pointer-events-auto">
      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-rose-200/90 dark:border-zinc-800 shadow-2xl shadow-rose-950/20 dark:shadow-black/70 rounded-3xl px-2 py-1.5 flex items-center justify-between">
        
        {/* 1. Mis Libros (Biblioteca) */}
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
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all active:scale-95 cursor-pointer ${
            selectedCategoryId === 'cat-all'
              ? 'text-rose-600 dark:text-white font-extrabold bg-rose-100/70 dark:bg-zinc-800'
              : 'text-[#881337]/80 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white font-semibold'
          }`}
          title="Ver mis libros y mangas guardados"
        >
          <BookOpen className="w-5 h-5 stroke-[2.3]" />
          <span className="text-[11px] tracking-tight mt-0.5">Mis Libros</span>
        </button>

        {/* 2. Buscar */}
        <button
          onClick={onOpenSearch}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-[#881337]/80 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white transition-all active:scale-95 cursor-pointer font-semibold"
          title="Buscar un libro o autor"
        >
          <Search className="w-5 h-5 stroke-[2.3]" />
          <span className="text-[11px] tracking-tight mt-0.5">Buscar</span>
        </button>

        {/* 3. BOTÓN CENTRAL: Menú de Opciones y Acciones Rápidas */}
        <div className="-translate-y-4 px-1 shrink-0 flex flex-col items-center">
          <button
            onClick={onOpenQuickMenu}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 text-white dark:text-zinc-950 flex flex-col items-center justify-center shadow-lg shadow-rose-500/40 dark:shadow-black/60 active:scale-90 transition-transform cursor-pointer border-[3.5px] border-white dark:border-zinc-900 group"
            title="Abrir menú de opciones, añadir libros y ajustes"
          >
            <Menu className="w-6 h-6 stroke-[2.6] group-hover:scale-110 transition-transform" />
          </button>
          <span className="text-[10px] font-black text-rose-700 dark:text-zinc-200 tracking-tight mt-0.5">
            Menú
          </span>
        </div>

        {/* 4. Catálogo Público Gratis */}
        <button
          onClick={onOpenExplore}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-[#881337]/80 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white transition-all active:scale-95 cursor-pointer font-semibold"
          title="Explorar libros y mangas gratis para descargar"
        >
          <Compass className="w-5 h-5 stroke-[2.3]" />
          <span className="text-[11px] tracking-tight mt-0.5">Catálogo</span>
        </button>

        {/* 5. Descargas */}
        <button
          onClick={onOpenDownloadCenter}
          className="relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-[#881337]/80 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white transition-all active:scale-95 cursor-pointer font-semibold"
          title="Ver el estado de las descargas"
        >
          <div className="relative">
            {hasActiveDownloads ? (
              <Loader2 className="w-5 h-5 animate-spin text-rose-600 dark:text-zinc-200" />
            ) : (
              <Download className="w-5 h-5 stroke-[2.3]" />
            )}
            {totalActive > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9.5px] font-black flex items-center justify-center shadow-xs animate-bounce">
                {totalActive}
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight mt-0.5">Descargas</span>
        </button>
      </div>
    </nav>
  );
};
