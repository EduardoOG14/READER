import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Download, Compass, SlidersHorizontal, Loader2 } from 'lucide-react';
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
    <nav className="md:hidden fixed bottom-[max(env(safe-area-inset-bottom,12px),12px)] inset-x-3 z-40 max-w-sm mx-auto select-none pointer-events-auto">
      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-rose-200/90 dark:border-zinc-800 shadow-2xl shadow-rose-950/15 dark:shadow-black/70 rounded-3xl px-1.5 py-1 flex items-center justify-between">
        
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
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Biblioteca</span>
        </button>

        {/* 2. Buscar (Instant Bottom Search) */}
        <button
          onClick={onOpenSearch}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl text-[#881337]/90 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white transition-all active:scale-90 cursor-pointer"
          title="Buscar obras en biblioteca"
        >
          <Search className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Buscar</span>
        </button>

        {/* 3. CENTER HIGHLIGHT: Menú Rápido (Control Center) */}
        <div className="-translate-y-3 px-1.5 shrink-0">
          <button
            onClick={onOpenQuickMenu}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 text-white dark:text-zinc-950 flex items-center justify-center shadow-lg shadow-rose-500/40 dark:shadow-black/60 active:scale-90 transition-transform cursor-pointer border-3 border-white dark:border-zinc-900 group"
            title="Centro de Control Rápido (Ordenar, Vistas, Importar, Ajustes)"
          >
            <SlidersHorizontal className="w-6 h-6 stroke-[2.4] group-hover:rotate-45 transition-transform" />
          </button>
        </div>

        {/* 4. Catálogo Público */}
        <button
          onClick={onOpenExplore}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl text-[#881337]/90 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white transition-all active:scale-90 cursor-pointer"
          title="Biblioteca de obras en español"
        >
          <Compass className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Catálogo</span>
        </button>

        {/* 5. Centro de Descargas (With Live Progress Badge) */}
        <button
          onClick={onOpenDownloadCenter}
          className="relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl text-[#881337]/90 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-white transition-all active:scale-90 cursor-pointer"
          title="Centro de Descargas"
        >
          <div className="relative">
            {hasActiveDownloads ? (
              <Loader2 className="w-5 h-5 animate-spin text-rose-500 dark:text-zinc-200" />
            ) : (
              <Download className="w-5 h-5 stroke-[2.2]" />
            )}
            {totalActive > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                {totalActive}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Descargas</span>
        </button>
      </div>
    </nav>
  );
};
