import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Search,
  CheckSquare,
  Square,
  Download,
  Loader2,
  Info,
  CheckCircle2,
} from 'lucide-react';
import type { CatalogItem } from '../services/catalog/types';
import { findBestMangaDexManga } from '../services/mangaSearchService';
import type { ChapterInfo } from '../services/mangaUpdateService';
import { downloadQueue } from '../services/downloadQueue';
import { CatalogCoverImage } from './CatalogCoverImage';
import { useBackHandler } from '../services/backButton';
import { useSwipeDownToClose } from '../hooks/useSwipeDownToClose';

interface EpisodeSelectorModalProps {
  item: CatalogItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEnqueued?: (itemTitle: string, count: number) => void;
}

export const EpisodeSelectorModal: React.FC<EpisodeSelectorModalProps> = ({
  item,
  isOpen,
  onClose,
  onEnqueued,
}) => {
  const [loading, setLoading] = useState(true);
  const [chapters, setChapters] = useState<ChapterInfo[]>([]);
  const [selectedNums, setSelectedNums] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { dragHandleProps, modalStyle } = useSwipeDownToClose({ onClose });

  // Intercept back button when open (Priority 150)
  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 150, isOpen);

  // Fetch chapters when opened
  useEffect(() => {
    if (!isOpen || !item) return;

    let isMounted = true;
    setLoading(true);
    setErrorMsg(null);
    setChapters([]);
    setSelectedNums(new Set());
    setSearchQuery('');

    findBestMangaDexManga(item.title, { maxChaptersToFetch: 1000 })
      .then(match => {
        if (!isMounted) return;
        setLoading(false);

        if (!match || match.chapters.length === 0) {
          setErrorMsg(
            `«${item.title}» no cuenta con episodios traducidos al español en MangaDex.`
          );
          return;
        }

        // Group unique chapters by chapter number
        const unique = new Map<number, ChapterInfo>();
        for (const ch of match.chapters) {
          const chNum = parseFloat(ch.attributes.chapter);
          if (!isNaN(chNum)) {
            const pages = ch.attributes.pages || 0;
            if (!unique.has(chNum) || pages > (unique.get(chNum)?.pages || 0)) {
              unique.set(chNum, {
                id: ch.id,
                chapter: chNum,
                title: ch.attributes.title || `Capítulo ${chNum}`,
                pages,
              });
            }
          }
        }

        const sorted = Array.from(unique.values()).sort((a, b) => a.chapter - b.chapter);
        setChapters(sorted);

        // By default, select all available chapters (or first 25 if huge)
        const initialSelected = new Set<number>();
        const toSelect = sorted.length <= 35 ? sorted : sorted.slice(0, 25);
        toSelect.forEach(c => initialSelected.add(c.chapter));
        setSelectedNums(initialSelected);
      })
      .catch(err => {
        if (!isMounted) return;
        setLoading(false);
        setErrorMsg(err.message || 'Error de conexión al consultar MangaDex.');
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, item]);

  // Filtered chapters based on search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters;
    const q = searchQuery.toLowerCase().trim();
    return chapters.filter(
      c =>
        c.chapter.toString().includes(q) ||
        (c.title && c.title.toLowerCase().includes(q))
    );
  }, [chapters, searchQuery]);

  const toggleChapter = (num: number) => {
    const next = new Set(selectedNums);
    if (next.has(num)) {
      next.delete(num);
    } else {
      next.add(num);
    }
    setSelectedNums(next);
  };

  const selectAll = () => {
    const next = new Set<number>();
    chapters.forEach(c => next.add(c.chapter));
    setSelectedNums(next);
  };

  const deselectAll = () => {
    setSelectedNums(new Set());
  };

  const selectRange = (count: number) => {
    const next = new Set<number>();
    chapters.slice(0, count).forEach(c => next.add(c.chapter));
    setSelectedNums(next);
  };

  const handleDownloadSelected = () => {
    if (!item) return;

    if (chapters.length === 0) {
      // Fallback: download default introductory volume
      downloadQueue.enqueue(item);
      onEnqueued?.(item.title, 1);
      onClose();
      return;
    }

    const selectedList = chapters.filter(c => selectedNums.has(c.chapter));
    if (selectedList.length === 0) return;

    downloadQueue.enqueue(item, selectedList);
    onEnqueued?.(item.title, selectedList.length);
    onClose();
  };

  if (!isOpen || !item) return null;

  const isAllSelected = chapters.length > 0 && selectedNums.size === chapters.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        style={modalStyle}
        className="relative w-full max-w-xl bg-white dark:bg-[#18191c] border-t sm:border border-rose-200 dark:border-zinc-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 z-10 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 text-[#4c0519] dark:text-[#f3f4f6] flex flex-col max-h-[92vh] pb-[max(env(safe-area-inset-bottom,16px),16px)]"
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
          className="flex items-start justify-between pb-3 border-b border-rose-100 dark:border-zinc-800 shrink-0 cursor-grab active:cursor-grabbing"
        >
          <div className="flex gap-3 min-w-0 pr-2">
            <div className="w-14 sm:w-16 aspect-[3/4.2] rounded-xl overflow-hidden shrink-0 shadow-md border border-rose-200/60 dark:border-zinc-700/60 bg-slate-900/10">
              <CatalogCoverImage item={item} />
            </div>

            <div className="min-w-0 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-rose-500 text-white dark:bg-zinc-700 dark:text-zinc-200">
                  {item.format.toUpperCase()}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  100% Español
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-[#4c0519] dark:text-[#f3f4f6] leading-snug line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium truncate">
                {item.author}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-zinc-800 text-rose-400 dark:text-zinc-400 transition-colors cursor-pointer shrink-0"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="py-3 flex-1 overflow-y-auto flex flex-col min-h-0 space-y-3">
          {loading ? (
            <div className="py-14 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-rose-500 dark:text-zinc-300" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                  Consultando episodios en MangaDex...
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Buscando scans oficiales en español
                </p>
              </div>
            </div>
          ) : errorMsg ? (
            <div className="py-8 px-4 rounded-2xl bg-rose-50/60 dark:bg-zinc-900/60 border border-rose-200 dark:border-zinc-800 text-center space-y-3">
              <Info className="w-8 h-8 text-rose-500 mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                  {errorMsg}
                </p>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed max-w-md mx-auto">
                  Puedes descargar el tomo introductorio en español con la portada oficial en HD, ficha completa y prólogo traducido.
                </p>
              </div>

              <button
                onClick={handleDownloadSelected}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-xs hover:from-rose-600 hover:to-pink-600 cursor-pointer transition-all inline-flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Tomo Introductorio en Español</span>
              </button>
            </div>
          ) : (
            <>
              {/* Controls bar */}
              <div className="space-y-2 shrink-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                    {chapters.length} episodios disponibles
                  </span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">
                    {selectedNums.size} seleccionados
                  </span>
                </div>

                {/* Quick Selection Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={isAllSelected ? deselectAll : selectAll}
                    className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                      isAllSelected
                        ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950'
                        : 'bg-rose-100 hover:bg-rose-200 dark:bg-zinc-800 text-[#4c0519] dark:text-[#f3f4f6]'
                    }`}
                  >
                    {isAllSelected ? (
                      <>
                        <Square className="w-4 h-4 stroke-[2.5]" />
                        <span>Deseleccionar todo</span>
                      </>
                    ) : (
                      <>
                        <CheckSquare className="w-4 h-4 stroke-[2.5]" />
                        <span>⚡ Marcar Todo ({chapters.length} cap.)</span>
                      </>
                    )}
                  </button>

                  {chapters.length > 10 && (
                    <button
                      onClick={() => selectRange(10)}
                      className="py-2 px-3 rounded-xl text-xs font-bold bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-rose-200/80 dark:border-zinc-700 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      Primeros 10
                    </button>
                  )}

                  {chapters.length > 25 && (
                    <button
                      onClick={() => selectRange(25)}
                      className="py-2 px-3 rounded-xl text-xs font-bold bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-rose-200/80 dark:border-zinc-700 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      Primeros 25
                    </button>
                  )}
                </div>

                {/* Search / Filter input */}
                {chapters.length > 15 && (
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Filtrar por número o título de capítulo..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-rose-50/50 dark:bg-zinc-900 border border-rose-200/80 dark:border-zinc-800 rounded-xl focus:outline-rose-400 dark:focus:outline-zinc-600 text-slate-900 dark:text-zinc-100"
                    />
                  </div>
                )}
              </div>

              {/* Scrollable Chapters List */}
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-72">
                {filteredChapters.map(ch => {
                  const isChecked = selectedNums.has(ch.chapter);
                  return (
                    <div
                      key={ch.id}
                      onClick={() => toggleChapter(ch.chapter)}
                      className={`p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer select-none ${
                        isChecked
                          ? 'bg-rose-50/80 dark:bg-zinc-800/90 border-rose-400/80 dark:border-rose-500/50 shadow-2xs'
                          : 'bg-white/50 dark:bg-zinc-900/40 border-rose-200/40 dark:border-zinc-800 hover:border-rose-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950'
                              : 'border border-slate-300 dark:border-zinc-700'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6] truncate">
                            Capítulo {ch.chapter}
                            {ch.title && ch.title !== `Capítulo ${ch.chapter}` && (
                              <span className="font-normal opacity-80 ml-1.5">— {ch.title}</span>
                            )}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-300 shrink-0">
                        {ch.pages} págs
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Ergonomic Bottom Footer */}
        <div className="pt-3 border-t border-rose-100 dark:border-zinc-800 shrink-0 flex items-center gap-2">
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl bg-rose-100/80 hover:bg-rose-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#881337] dark:text-zinc-200 font-black text-xs transition-colors cursor-pointer shrink-0"
          >
            Cerrar
          </button>

          {!loading && chapters.length > 0 && (
            <button
              onClick={handleDownloadSelected}
              disabled={selectedNums.size === 0}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 hover:from-rose-600 hover:to-pink-600 dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-950 text-white font-black text-xs sm:text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span className="truncate">
                {selectedNums.size === chapters.length
                  ? `⬇️ Descargar TODO (${chapters.length} cap.)`
                  : `⬇️ Descargar (${selectedNums.size} cap.)`}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
