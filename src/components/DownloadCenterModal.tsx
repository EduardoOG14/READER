import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Play,
  Trash2,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { downloadQueue, type QueueState, type QueueItem } from '../services/downloadQueue';
import { CatalogCoverImage } from './CatalogCoverImage';
import { useApp } from '../context/AppContext';
import { useBackHandler } from '../services/backButton';

interface DownloadCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadCenterModal: React.FC<DownloadCenterModalProps> = ({ isOpen, onClose }) => {
  const { books, openReader } = useApp();
  const [queueState, setQueueState] = useState<QueueState>(downloadQueue.getState());

  useEffect(() => {
    return downloadQueue.subscribe(state => setQueueState(state));
  }, []);

  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 160, isOpen);

  const handleOpenBook = (item: QueueItem) => {
    const found = books.find(
      b =>
        b.title.trim().toLowerCase() === item.item.title.trim().toLowerCase() ||
        b.id === item.item.id
    );
    if (found) {
      onClose();
      openReader(found);
    }
  };

  if (!isOpen) return null;

  const totalActive = (queueState.activeItem ? 1 : 0) + queueState.pendingItems.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Main Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#18191c] border-t sm:border border-rose-200 dark:border-zinc-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 z-10 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 text-[#4c0519] dark:text-[#f3f4f6] flex flex-col max-h-[90vh] pb-[max(env(safe-area-inset-bottom,16px),16px)]">
        {/* Native Pull / Drag Indicator on mobile */}
        <div className="sm:hidden w-12 h-1 bg-rose-200 dark:bg-zinc-700 rounded-full mx-auto mb-2 shrink-0" />
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md">
              <Download className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                  Centro de Descargas
                </h3>
                {totalActive > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                    {totalActive} en cola
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    Al día
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-zinc-300 font-medium">
                Gestiona las descargas de episodios, libros y mangas sin conexión
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {queueState.completedItems.length > 0 && (
              <button
                onClick={() => downloadQueue.clearCompleted()}
                className="py-1.5 px-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer flex items-center gap-1"
                title="Limpiar completadas"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpiar</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-rose-100 dark:hover:bg-zinc-800 text-rose-400 dark:text-zinc-400 transition-colors cursor-pointer"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Queue List */}
        <div className="py-3 flex-1 overflow-y-auto space-y-3 pr-1">
          {queueState.items.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Download className="w-10 h-10 text-rose-300 dark:text-zinc-600 mx-auto" />
              <p className="text-sm font-bold text-[#881337] dark:text-zinc-300">
                No hay descargas activas en este momento
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
                Los capítulos y libros que descargues desde el catálogo se gestionarán automáticamente aquí.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {queueState.items.map(q => {
                const isDownloading = q.status === 'downloading';
                const isPending = q.status === 'pending';
                const isCompleted = q.status === 'completed';
                const isError = q.status === 'error';

                return (
                  <div
                    key={q.id}
                    className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex flex-col gap-2.5 shadow-2xs ${
                      isDownloading
                        ? 'bg-rose-50/70 dark:bg-zinc-800/80 border-rose-300 dark:border-rose-500/40 ring-1 ring-rose-400/20'
                        : isCompleted
                        ? 'bg-white dark:bg-zinc-900/60 border-emerald-500/30 dark:border-emerald-500/20'
                        : isError
                        ? 'bg-red-50/60 dark:bg-red-950/20 border-red-300 dark:border-red-900/40'
                        : 'bg-white dark:bg-zinc-900/40 border-rose-200/60 dark:border-zinc-800'
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      {/* Cover Thumbnail */}
                      <div className="w-14 aspect-[3/4.2] rounded-xl overflow-hidden shrink-0 shadow-xs border border-rose-200/60 dark:border-zinc-700/60 bg-slate-900/10">
                        <CatalogCoverImage item={q.item} />
                      </div>

                      {/* Details & Progress */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-rose-500 text-white dark:bg-zinc-700 dark:text-zinc-200">
                              {q.item.format.toUpperCase()}
                            </span>

                            {/* Status badge */}
                            {isDownloading && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>{q.progressPercent}%</span>
                              </span>
                            )}
                            {isPending && (
                              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span>En espera</span>
                              </span>
                            )}
                            {isCompleted && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Completado</span>
                              </span>
                            )}
                            {isError && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>Error</span>
                              </span>
                            )}
                          </div>

                          <h4 className="font-extrabold text-sm leading-snug line-clamp-1 text-[#4c0519] dark:text-[#f3f4f6] mt-0.5">
                            {q.item.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium truncate">
                            {q.item.author} {q.selectedChapters ? `• ${q.selectedChapters.length} episodios` : ''}
                          </p>
                        </div>

                        {/* Status / Message text */}
                        <p className="text-[11px] text-slate-600 dark:text-zinc-300 font-mono truncate mt-1">
                          {q.progressMessage || (isPending ? 'Esperando turno en cola...' : '')}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar (when downloading or pending) */}
                    {(isDownloading || isPending) && (
                      <div className="w-full bg-slate-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-200 dark:to-zinc-400 h-full transition-all duration-300"
                          style={{ width: `${Math.max(5, q.progressPercent)}%` }}
                        />
                      </div>
                    )}

                    {/* Action buttons row */}
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-rose-100/60 dark:border-zinc-800/60">
                      {(isDownloading || isPending) && (
                        <button
                          onClick={() => downloadQueue.cancel(q.id)}
                          className="py-1 px-2.5 rounded-lg text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                      )}

                      {isError && (
                        <>
                          <button
                            onClick={() => downloadQueue.remove(q.id)}
                            className="py-1 px-2.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                          >
                            Descartar
                          </button>
                          <button
                            onClick={() => downloadQueue.retry(q.id)}
                            className="py-1 px-3 rounded-lg text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reintentar</span>
                          </button>
                        </>
                      )}

                      {isCompleted && (
                        <>
                          <button
                            onClick={() => downloadQueue.remove(q.id)}
                            className="py-1 px-2.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                          >
                            Quitar
                          </button>
                          <button
                            onClick={() => handleOpenBook(q)}
                            className="py-1 px-3 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Play className="w-3 h-3 fill-white" />
                            <span>Leer ahora</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Ergonomic Bottom Action Bar */}
        <div className="pt-3 border-t border-rose-100 dark:border-zinc-800 flex items-center justify-between gap-2 shrink-0">
          {queueState.completedItems.length > 0 ? (
            <button
              onClick={() => downloadQueue.clearCompleted()}
              className="py-2.5 px-3 rounded-xl text-xs font-semibold text-rose-600 dark:text-zinc-400 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpiar completadas ({queueState.completedItems.length})</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono">
              {queueState.totalCount} obras en cola/historial
            </span>
          )}

          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-rose-500 hover:bg-rose-600 dark:bg-zinc-200 dark:hover:bg-white text-white dark:text-zinc-950 font-bold text-xs transition-colors cursor-pointer active:scale-95 shadow-xs"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
