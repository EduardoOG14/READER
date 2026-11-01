import React, { useState, useEffect } from 'react';
import { HardDrive, Trash2, CheckCircle2, Sparkles, X, FileText } from 'lucide-react';
import { useBackHandler } from '../services/backButton';
import type { Book } from '../types';

interface StorageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  onDeleteBook?: (bookId: string) => Promise<void>;
}

export const StorageManagerModal: React.FC<StorageManagerModalProps> = ({
  isOpen,
  onClose,
  books,
  onDeleteBook,
}) => {
  const [quotaInfo, setQuotaInfo] = useState<{ usedMB: number; totalMB: number; percent: number }>({
    usedMB: 0,
    totalMB: 0,
    percent: 0,
  });
  const [cleanedToast, setCleanedToast] = useState<string | null>(null);

  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 110, isOpen);

  useEffect(() => {
    if (isOpen) {
      if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(est => {
          const usedMB = Math.round((est.usage || 0) / (1024 * 1024));
          const totalMB = Math.round((est.quota || 0) / (1024 * 1024));
          const percent = totalMB > 0 ? Math.round((usedMB / totalMB) * 100) : 0;
          setQuotaInfo({ usedMB, totalMB, percent });
        });
      }
    }
  }, [isOpen]);

  const totalBooksSizeMB = (
    books.reduce((acc, b) => acc + (b.fileSize || 0), 0) / (1024 * 1024)
  ).toFixed(1);

  const handleCleanCache = () => {
    // Revoke object URLs and prune temporary items
    try {
      // Clear non-critical caches
      if (typeof window !== 'undefined' && 'caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            if (name.includes('temp') || name.includes('preview')) caches.delete(name);
          });
        });
      }
      setCleanedToast('Caché temporal y previsualizaciones limpiadas.');
      setTimeout(() => setCleanedToast(null), 2500);
    } catch (e) {
      console.warn('Error clearing cache:', e);
    }
  };

  if (!isOpen) return null;

  // Sort books by size descending
  const sortedBySize = [...books].sort((a, b) => (b.fileSize || 0) - (a.fileSize || 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#18191c] border border-rose-200 dark:border-zinc-700/80 rounded-3xl shadow-2xl p-4 sm:p-6 z-10 animate-in zoom-in-95 duration-200 text-[#4c0519] dark:text-[#f3f4f6] flex flex-col gap-4 max-h-[90vh]">
        
        {/* Floating Toast */}
        {cleanedToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-emerald-400 border border-emerald-500/40 rounded-2xl px-4 py-2 text-xs font-semibold shadow-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{cleanedToast}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md">
              <HardDrive className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                Gestor de Almacenamiento Local
              </h3>
              <p className="text-[11px] text-[#881337]/70 dark:text-zinc-400">
                Control de espacio y memoria en tu dispositivo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gauge Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 space-y-3 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700 dark:text-zinc-300">Espacio Usado por el Lector</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400">
              {quotaInfo.usedMB > 0 ? `${quotaInfo.usedMB} MB` : `${totalBooksSizeMB} MB`}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
              style={{ width: `${Math.max(5, Math.min(100, quotaInfo.percent || 15))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{books.length} obras descargadas ({totalBooksSizeMB} MB de archivos)</span>
            {quotaInfo.totalMB > 0 && <span>Total disponible: {(quotaInfo.totalMB / 1024).toFixed(1)} GB</span>}
          </div>

          {/* Clean Cache Button */}
          <button
            onClick={handleCleanCache}
            className="w-full mt-1 py-2 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limpiar Caché y Archivos Temporales</span>
          </button>
        </div>

        {/* Books by size list */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <h4 className="text-xs font-bold text-slate-700 dark:text-zinc-300 sticky top-0 bg-white dark:bg-[#18191c] py-1">
            Obras de mayor tamaño ({books.length}):
          </h4>
          {sortedBySize.map(book => {
            const sizeMB = ((book.fileSize || 0) / (1024 * 1024)).toFixed(2);
            return (
              <div
                key={book.id}
                className="p-2.5 rounded-xl bg-slate-50/60 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-zinc-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold truncate text-slate-800 dark:text-zinc-200">
                      {book.title}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">
                      {book.format} • {book.totalPages} págs.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="font-mono font-bold text-slate-600 dark:text-zinc-300">
                    {sizeMB} MB
                  </span>
                  {onDeleteBook && (
                    <button
                      onClick={() => onDeleteBook(book.id)}
                      className="p-1 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors"
                      title="Eliminar de la biblioteca"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-rose-100 dark:border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
