import React from 'react';
import { Bookmark as BookmarkIcon, Trash2, X, Plus, ChevronRight, Clock } from 'lucide-react';
import type { Bookmark } from '../../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  currentPage: number;
  onJumpToPage: (page: number) => void;
  onAddCurrentPage: () => void;
  onRemoveBookmark: (bookmarkId: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  currentPage,
  onJumpToPage,
  onAddCurrentPage,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  const isCurrentPageBookmarked = bookmarks.some(b => b.page === currentPage);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 dark:bg-amber-500/20">
              <BookmarkIcon className="w-5 h-5 fill-amber-500/30" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Marcadores ({bookmarks.length})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Puntos guardados estilo Moon+ Reader
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action: Add bookmark on current page */}
        <div className="py-3 shrink-0">
          <button
            onClick={onAddCurrentPage}
            disabled={isCurrentPageBookmarked}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              isCurrentPageBookmarked
                ? 'bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow-md'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>
              {isCurrentPageBookmarked
                ? `Página ${currentPage} ya está marcada`
                : `Marcar página actual (${currentPage})`}
            </span>
          </button>
        </div>

        {/* List of bookmarks */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[140px]">
          {bookmarks.length === 0 ? (
            <div className="py-10 text-center text-slate-500 dark:text-zinc-400 flex flex-col items-center gap-2">
              <BookmarkIcon className="w-8 h-8 opacity-40 stroke-[1.5]" />
              <p className="text-sm font-bold text-slate-700 dark:text-zinc-200">No hay marcadores aún</p>
              <p className="text-xs max-w-xs">
                Toca el botón superior o el icono de marcador en la barra de lectura para guardar páginas.
              </p>
            </div>
          ) : (
            bookmarks.map(bm => {
              const isCurrent = bm.page === currentPage;
              const formattedDate = new Date(bm.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={bm.id}
                  className={`group flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'border-amber-400/60 bg-amber-50/50 dark:bg-amber-950/20'
                      : 'border-slate-100 dark:border-zinc-800 hover:border-slate-200 dark:hover:border-zinc-700 bg-slate-50/60 dark:bg-zinc-800/40'
                  }`}
                >
                  <button
                    onClick={() => {
                      onJumpToPage(bm.page);
                      onClose();
                    }}
                    className="flex-1 flex items-center gap-3 text-left min-w-0"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                      #{bm.page}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                          {bm.title || `Página ${bm.page}`}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300">
                            Actual
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{formattedDate}</span>
                        {bm.note && <span className="truncate italic">• {bm.note}</span>}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(bm.id)}
                    className="p-2 ml-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors shrink-0"
                    title="Eliminar marcador"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
