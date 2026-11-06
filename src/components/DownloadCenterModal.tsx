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
  Info,
} from 'lucide-react';
import { downloadQueue, type QueueState, type QueueItem } from '../services/downloadQueue';
import { CatalogCoverImage } from './CatalogCoverImage';
import { useApp } from '../context/AppContext';
import { useBackHandler } from '../services/backButton';
import { useSwipeDownToClose } from '../hooks/useSwipeDownToClose';
import { getAllBooks } from '../services/storage';

interface DownloadCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenExplore?: () => void;
}

export const DownloadCenterModal: React.FC<DownloadCenterModalProps> = ({
  isOpen,
  onClose,
  onOpenExplore,
}) => {
  const { books, openReader, refreshLibrary } = useApp();
  const [queueState, setQueueState] = useState<QueueState>(downloadQueue.getState());
  const { dragHandleProps, modalStyle } = useSwipeDownToClose({ onClose });

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

  const handleOpenBook = async (item: QueueItem) => {
    // 1. Search in current context state
    let found = books.find(
      b =>
        b.title.trim().toLowerCase() === item.item.title.trim().toLowerCase() ||
        b.id === item.item.id
    );

    // 2. Fallback: refresh library from persistent storage
    if (!found) {
      try {
        await refreshLibrary();
        const stored = await getAllBooks();
        found = stored.find(
          b =>
            b.title.trim().toLowerCase() === item.item.title.trim().toLowerCase() ||
            b.id === item.item.id
        );
      } catch (e) {
        console.warn('[DownloadCenter] Error finding book:', e);
      }
    }

    if (found) {
      onClose();
      openReader(found);
    }
  };

  if (!isOpen) return null;

  const activeAndPending: QueueItem[] = [
    ...(queueState.activeItem ? [queueState.activeItem] : []),
    ...queueState.pendingItems,
  ];
  const completedItems = queueState.completedItems;
  const errorItems = queueState.errorItems;
  const totalItems = queueState.items.length;

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'Reciente';
    const d = new Date(timestamp);
    const now = new Date();
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (isToday) return `Hoy a las ${timeStr}`;
    return `${d.toLocaleDateString([], { day: 'numeric', month: 'short' })} • ${timeStr}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Main Dialog */}
      <div
        style={modalStyle}
        className="relative w-full max-w-2xl bg-white dark:bg-[#18191c] border-t sm:border border-rose-200 dark:border-zinc-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 z-10 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 text-[#4c0519] dark:text-[#f3f4f6] flex flex-col max-h-[92vh] pb-[max(env(safe-area-inset-bottom,16px),16px)]"
      >
        {/* Native Pull / Drag Indicator (Swipe down to dismiss) */}
        <div
          className="w-full flex items-center justify-center pt-1 pb-2.5 -mt-1 cursor-grab active:cursor-grabbing touch-none select-none shrink-0"
          {...dragHandleProps}
        >
          <div className="w-12 h-1.5 bg-rose-300/80 dark:bg-zinc-600 hover:bg-rose-400 dark:hover:bg-zinc-500 rounded-full transition-colors" />
        </div>

        {/* Header */}
        <div
          {...dragHandleProps}
          className="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-zinc-800 shrink-0 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md">
              <Download className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                  Centro de Descargas
                </h3>
                {activeAndPending.length > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                    {activeAndPending.length} en curso
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    {completedItems.length > 0 ? `${completedItems.length} descargadas` : 'Al día'}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-zinc-300 font-medium">
                Gestiona tus descargas e historial de episodios sin conexión
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {completedItems.length > 0 && (
              <button
                onClick={() => downloadQueue.clearCompleted()}
                className="py-1.5 px-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer flex items-center gap-1"
                title="Limpiar completadas"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpiar historial</span>
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

        {/* Content Queue & History List */}
        <div className="py-3 flex-1 overflow-y-auto space-y-4 pr-1">
          {totalItems === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Download className="w-12 h-12 text-rose-300 dark:text-zinc-400 mx-auto stroke-[1.8]" />
              <div className="space-y-1">
                <p className="text-base font-black text-[#4c0519] dark:text-[#f3f4f6]">
                  No tienes descargas pendientes ni historial
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
                  Aquí verás el progreso y el historial de todos los libros y episodios que descargues del catálogo.
                </p>
              </div>

              {onOpenExplore && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenExplore();
                    }}
                    className="py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs inline-flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>✨ Ir al Catálogo de Libros Gratis</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* SECTION 1: Active / Pending Downloads */}
              {activeAndPending.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Descargas en Curso ({activeAndPending.length})
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                      En segundo plano
                    </span>
                  </div>

                  {/* Informational banner reminding user they can safely close menus */}
                  <div className="p-2.5 rounded-xl bg-rose-50/80 dark:bg-zinc-800/80 border border-rose-200/80 dark:border-zinc-700/80 flex items-center gap-2 text-[11px] text-rose-900 dark:text-zinc-200">
                    <Info className="w-4 h-4 text-rose-500 dark:text-zinc-400 shrink-0" />
                    <span>
                      Las descargas continúan activas aunque cierres este menú o uses otras partes de la app.
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {activeAndPending.map(q => {
                      const isDownloading = q.status === 'downloading';
                      return (
                        <div
                          key={q.id}
                          className="p-3 sm:p-3.5 rounded-2xl border transition-all flex flex-col gap-2.5 shadow-2xs bg-rose-50/70 dark:bg-zinc-800/80 border-rose-300 dark:border-rose-500/40 ring-1 ring-rose-400/20"
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

                                  {isDownloading ? (
                                    <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                      <span>{q.progressPercent}%</span>
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>En espera</span>
                                    </span>
                                  )}
                                </div>

                                <h4 className="font-extrabold text-sm leading-snug line-clamp-1 text-[#4c0519] dark:text-[#f3f4f6] mt-0.5">
                                  {q.item.title}
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium truncate">
                                  {q.item.author}{' '}
                                  {q.selectedChapters ? `• ${q.selectedChapters.length} episodios` : ''}
                                </p>
                              </div>

                              <p className="text-[11px] text-slate-600 dark:text-zinc-300 font-mono truncate mt-1">
                                {q.progressMessage || (isDownloading ? 'Descargando...' : 'Esperando turno en cola...')}
                              </p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-slate-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-200 dark:to-zinc-400 h-full transition-all duration-300"
                              style={{ width: `${Math.max(5, q.progressPercent)}%` }}
                            />
                          </div>

                          {/* Action Button */}
                          <div className="flex items-center justify-end gap-2 pt-1 border-t border-rose-100/60 dark:border-zinc-800/60">
                            <button
                              onClick={() => downloadQueue.cancel(q.id)}
                              className="py-1 px-3 rounded-lg text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                            >
                              Cancelar descarga
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 2: Completed Downloads (Permanent History) */}
              {completedItems.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Obras Descargadas en tu Biblioteca ({completedItems.length})
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500">
                      Disponibles sin conexión
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {completedItems.map(q => (
                      <div
                        key={q.id}
                        className="p-3 sm:p-3.5 rounded-2xl border transition-all flex flex-col gap-2.5 shadow-2xs bg-white dark:bg-zinc-900/60 border-emerald-500/30 dark:border-emerald-500/20"
                      >
                        <div className="flex gap-3 items-start">
                          {/* Cover Thumbnail */}
                          <div className="w-14 aspect-[3/4.2] rounded-xl overflow-hidden shrink-0 shadow-xs border border-rose-200/60 dark:border-zinc-700/60 bg-slate-900/10">
                            <CatalogCoverImage item={q.item} />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-rose-500 text-white dark:bg-zinc-700 dark:text-zinc-200">
                                  {q.item.format.toUpperCase()}
                                </span>
                                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Listo</span>
                                </span>
                              </div>

                              <h4 className="font-extrabold text-sm leading-snug line-clamp-1 text-[#4c0519] dark:text-[#f3f4f6] mt-0.5">
                                {q.item.title}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium truncate">
                                {q.item.author}{' '}
                                {q.selectedChapters ? `• ${q.selectedChapters.length} episodios descargados` : ''}
                              </p>
                            </div>

                            <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono mt-1">
                              Descargado: {formatDate(q.completedAt || q.addedAt)}
                            </p>
                          </div>
                        </div>

                        {/* Actions for completed */}
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-rose-100/60 dark:border-zinc-800/60">
                          <button
                            onClick={() => downloadQueue.remove(q.id)}
                            className="py-1 px-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 transition-colors cursor-pointer flex items-center gap-1"
                            title="Quitar del historial"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Quitar</span>
                          </button>

                          <button
                            onClick={() => handleOpenBook(q)}
                            className="py-1.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Leer ahora</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 3: Error items */}
              {errorItems.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Descargas con Error ({errorItems.length})
                  </span>

                  <div className="space-y-2.5">
                    {errorItems.map(q => (
                      <div
                        key={q.id}
                        className="p-3 sm:p-3.5 rounded-2xl border transition-all flex flex-col gap-2.5 shadow-2xs bg-red-50/60 dark:bg-red-950/20 border-red-300 dark:border-red-900/40"
                      >
                        <div className="flex gap-3 items-start">
                          <div className="w-14 aspect-[3/4.2] rounded-xl overflow-hidden shrink-0 shadow-xs border border-rose-200/60 dark:border-zinc-700/60 bg-slate-900/10">
                            <CatalogCoverImage item={q.item} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-extrabold text-sm leading-snug line-clamp-1 text-[#4c0519] dark:text-[#f3f4f6]">
                              {q.item.title}
                            </h4>
                            <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">
                              {q.error || 'No se pudo completar la descarga'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-1 border-t border-red-200/60 dark:border-red-900/60">
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Ergonomic Bottom Action Bar */}
        <div className="pt-3 border-t border-rose-100 dark:border-zinc-800 flex items-center justify-between gap-2 shrink-0">
          <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
            {activeAndPending.length > 0
              ? `${activeAndPending.length} en cola • ${completedItems.length} completadas`
              : `${completedItems.length} obras en historial`}
          </span>

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
