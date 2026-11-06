import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  X,
  BookOpen,
  Play,
  CheckCircle2,
  Compass,
  MoreVertical,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useBackHandler } from '../services/backButton';
import { useSwipeDownToClose } from '../hooks/useSwipeDownToClose';
import type { Book } from '../types';

interface BottomSearchSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookDetails?: (book: Book) => void;
  onOpenExplore?: () => void;
}

type FormatFilter = 'todos' | 'libros' | 'manga';

export const BottomSearchSheet: React.FC<BottomSearchSheetProps> = ({
  isOpen,
  onClose,
  onOpenBookDetails,
  onOpenExplore,
}) => {
  const { books, openReader } = useApp();
  const [localQuery, setLocalQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState<FormatFilter>('todos');
  const inputRef = useRef<HTMLInputElement>(null);
  const { dragHandleProps, modalStyle } = useSwipeDownToClose({ onClose });

  // Auto-focus when sheet opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setLocalQuery('');
    }
  }, [isOpen]);

  // Back button closes search sheet (Priority 115)
  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 115, isOpen);

  const filtered = useMemo(() => {
    return books.filter(b => {
      // Format / category filter
      if (formatFilter !== 'todos') {
        const isManga = b.format === 'cbz' || b.format === 'cbr' || b.format === 'zip' || b.categoryIds?.includes('cat-manga');
        if (formatFilter === 'manga' && !isManga) return false;
        if (formatFilter === 'libros' && isManga) return false;
      }

      if (!localQuery.trim()) return true;
      const q = localQuery.toLowerCase().trim();
      return (
        b.title.toLowerCase().includes(q) ||
        (b.author && b.author.toLowerCase().includes(q)) ||
        b.format.toLowerCase().includes(q)
      );
    });
  }, [books, localQuery, formatFilter]);

  if (!isOpen) return null;

  const handleRead = (b: Book) => {
    onClose();
    openReader(b);
  };

  const handleDetails = (b: Book) => {
    onClose();
    onOpenBookDetails?.(b);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        style={modalStyle}
        className="relative w-full max-w-xl mx-auto bg-white dark:bg-[#18191c] border-t border-rose-200/90 dark:border-zinc-800 rounded-t-3xl shadow-2xl p-4 sm:p-5 z-10 animate-in slide-in-from-bottom duration-250 text-[#4c0519] dark:text-[#f3f4f6] max-h-[85vh] flex flex-col pb-[max(env(safe-area-inset-bottom,20px),20px)]"
      >
        {/* Native Pull / Drag Indicator (Swipe down to dismiss) */}
        <div
          className="w-full flex items-center justify-center pt-1 pb-2.5 -mt-1 cursor-grab active:cursor-grabbing touch-none select-none shrink-0"
          {...dragHandleProps}
        >
          <div className="w-12 h-1.5 bg-rose-300/80 dark:bg-zinc-600 hover:bg-rose-400 dark:hover:bg-zinc-500 rounded-full transition-colors" />
        </div>

        {/* Search Bar Input (Thumb reachable) */}
        <div className="relative shrink-0">
          <Search className="w-5 h-5 text-rose-500 dark:text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={e => setLocalQuery(e.target.value)}
            placeholder="Escribe el nombre de un libro o manga..."
            className="w-full pl-11 pr-10 py-3 text-sm bg-rose-50/70 dark:bg-zinc-900 border border-rose-200 dark:border-zinc-700 rounded-2xl outline-none text-[#4c0519] dark:text-[#f3f4f6] placeholder-rose-400/70 dark:placeholder-zinc-500 font-bold focus:ring-2 focus:ring-rose-400/40 dark:focus:ring-zinc-600 transition-all shadow-inner"
          />
          {localQuery && (
            <button
              onClick={() => setLocalQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-rose-400 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-zinc-200 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Format Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar shrink-0 text-xs">
          <button
            onClick={() => setFormatFilter('todos')}
            className={`px-3.5 py-1.5 rounded-xl font-extrabold transition-all shrink-0 cursor-pointer ${
              formatFilter === 'todos'
                ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                : 'bg-rose-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
            }`}
          >
            Todos ({books.length})
          </button>
          <button
            onClick={() => setFormatFilter('libros')}
            className={`px-3.5 py-1.5 rounded-xl font-extrabold transition-all shrink-0 cursor-pointer ${
              formatFilter === 'libros'
                ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                : 'bg-rose-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
            }`}
          >
            📚 Libros
          </button>
          <button
            onClick={() => setFormatFilter('manga')}
            className={`px-3.5 py-1.5 rounded-xl font-extrabold transition-all shrink-0 cursor-pointer ${
              formatFilter === 'manga'
                ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                : 'bg-rose-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
            }`}
          >
            🎨 Mangas
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-2 py-1 pr-1 min-h-[160px]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-zinc-800 text-rose-500 dark:text-zinc-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-[#4c0519] dark:text-[#f3f4f6]">
                  No se encontró ese libro en tus lecturas
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                  ¿Quieres buscarlo gratis en el catálogo?
                </p>
              </div>

              {onOpenExplore && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenExplore();
                  }}
                  className="py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs inline-flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
                >
                  <Compass className="w-4 h-4 stroke-[2.4]" />
                  <span>Buscar en el Catálogo Gratis</span>
                </button>
              )}
            </div>
          ) : (
            filtered.map(b => (
              <div
                key={b.id}
                onClick={() => handleRead(b)}
                className="p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-rose-100 dark:border-zinc-800 hover:border-rose-300 dark:hover:border-zinc-700 flex items-center justify-between gap-3 shadow-2xs transition-all cursor-pointer active:scale-98"
              >
                {/* Book Thumbnail + Info */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-11 h-14 rounded-lg overflow-hidden bg-slate-900/10 shrink-0 shadow-xs border border-rose-200/50 dark:border-zinc-700">
                    {b.coverUrl ? (
                      <img src={b.coverUrl} alt={b.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-rose-300 dark:text-zinc-400 bg-rose-50 dark:bg-zinc-800">
                        <BookOpen className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-black/70 text-white dark:bg-zinc-700">
                        {b.format.toUpperCase()}
                      </span>
                      {b.progress >= 100 && (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Leído
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-black text-[#4c0519] dark:text-[#f3f4f6] truncate">
                      {b.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                      {b.author || 'Autor desconocido'} • {b.totalPages} págs
                    </p>
                  </div>
                </div>

                {/* Read & Options Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRead(b);
                    }}
                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
                    title="Leer ahora"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Leer</span>
                  </button>

                  {onOpenBookDetails && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDetails(b);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Ver opciones y detalles"
                    >
                      <MoreVertical className="w-4 h-4 stroke-[2.3]" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Close Button */}
        <div className="pt-2 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-rose-100 hover:bg-rose-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#881337] dark:text-zinc-200 font-black text-xs transition-colors cursor-pointer active:scale-98"
          >
            ✓ Listo, cerrar búsqueda
          </button>
        </div>
      </div>
    </div>
  );
};
