import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Search,
  BookOpen,
  CheckCircle2,
  Play,
  Filter,
  Loader2,
  Download,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useBackHandler } from '../services/backButton';
import { useSwipeDownToClose } from '../hooks/useSwipeDownToClose';
import { SPANISH_CATALOG, type CatalogItem } from '../services/catalogData';
import { gutenbergService } from '../services/gutenbergService';
import { mergeAndDeduplicateCatalog, isBookOwned } from '../services/catalogDeduplication';
import { downloadQueue, type QueueState } from '../services/downloadQueue';
import { CatalogCoverImage } from './CatalogCoverImage';
import { EpisodeSelectorModal } from './EpisodeSelectorModal';
import { DownloadCenterModal } from './DownloadCenterModal';
import type { Book } from '../types';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryFilter = 'todos' | 'libros' | 'manga' | 'manhwa' | 'romance';

export const ExploreModal: React.FC<ExploreModalProps> = ({ isOpen, onClose }) => {
  const { books, openReader, refreshLibrary } = useApp();

  const PAGE_SIZE = 36;
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('todos');
  const [filterQuery, setFilterQuery] = useState('');
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [queueState, setQueueState] = useState<QueueState>(downloadQueue.getState());
  const [isDownloadCenterOpen, setIsDownloadCenterOpen] = useState(false);
  const [selectedMangaForEpisodes, setSelectedMangaForEpisodes] = useState<CatalogItem | null>(null);
  const [gutenbergBooks, setGutenbergBooks] = useState<CatalogItem[]>([]);
  const [isGutenbergSearching, setIsGutenbergSearching] = useState(false);

  useEffect(() => {
    downloadQueue.setRefreshHandler(refreshLibrary);
    return downloadQueue.subscribe(state => setQueueState(state));
  }, [refreshLibrary]);

  // Load top Project Gutenberg Spanish books when opening explore
  useEffect(() => {
    if (!isOpen) return;
    gutenbergService.getTopSpanishBooks().then(res => {
      if (res.books && res.books.length > 0) {
        setGutenbergBooks(res.books);
      }
    });
  }, [isOpen]);

  // Live Gutenberg search when typing >= 3 chars
  useEffect(() => {
    if (!isOpen || !filterQuery.trim() || filterQuery.trim().length < 3) return;
    const timer = setTimeout(async () => {
      setIsGutenbergSearching(true);
      try {
        const results = await gutenbergService.searchSpanishBooks(filterQuery);
        if (results && results.length > 0) {
          setGutenbergBooks(prev => {
            const map = new Map<string, CatalogItem>();
            prev.forEach(b => map.set(b.id, b));
            results.forEach(b => map.set(b.id, b));
            return Array.from(map.values());
          });
        }
      } finally {
        setIsGutenbergSearching(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [filterQuery, isOpen]);

  const { dragHandleProps, modalStyle } = useSwipeDownToClose({ onClose });

  // Android Back Button handler (Priority 110)
  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 110, isOpen);

  // Show temporary toast feedback
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Full unified catalog (Pre-curated + Project Gutenberg) deduplicated with 100% precision
  const fullCatalog = useMemo(() => {
    return mergeAndDeduplicateCatalog(SPANISH_CATALOG, gutenbergBooks);
  }, [gutenbergBooks]);

  // Check if a catalog item is already saved in the user's personal library
  const getOwnedBook = (item: CatalogItem): Book | undefined => {
    return isBookOwned(item, books);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      todos: fullCatalog.length,
      libros: fullCatalog.filter(i => i.category === 'libros').length,
      manga: fullCatalog.filter(i => i.category === 'manga').length,
      manhwa: fullCatalog.filter(i => i.category === 'manhwa').length,
      romance: fullCatalog.filter(i => i.category === 'romance').length,
    };
  }, [fullCatalog]);

  // Filter catalog items by category and local search query
  const filteredCatalog = useMemo(() => {
    return fullCatalog.filter(item => {
      if (activeCategory !== 'todos' && item.category !== activeCategory) {
        return false;
      }
      if (!filterQuery.trim()) return true;
      const q = filterQuery.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.genre.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [fullCatalog, activeCategory, filterQuery]);

  // Sliced items for progressive 60fps rendering
  const visibleItems = useMemo(() => {
    return filteredCatalog.slice(0, displayLimit);
  }, [filteredCatalog, displayLimit]);

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    setDisplayLimit(PAGE_SIZE);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(e.target.value);
    setDisplayLimit(PAGE_SIZE);
  };

  // Handle direct download for books
  const handleDownloadBook = (item: CatalogItem) => {
    downloadQueue.enqueue(item);
    showToast(`«${item.title}» añadido al Centro de Descargas.`);
  };

  // Handle "Leer ahora" for already owned book
  const handleReadOwnedBook = (ownedBook: Book) => {
    onClose();
    openReader(ownedBook);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Main Catalog Dialog */}
      <div
        style={modalStyle}
        className="relative w-full max-w-4xl bg-white dark:bg-[#18191c] border-t sm:border border-rose-200 dark:border-zinc-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 z-10 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 text-[#4c0519] dark:text-[#f3f4f6] flex flex-col max-h-[92vh] pb-[max(env(safe-area-inset-bottom,16px),16px)]"
      >
        {/* Native Pull / Drag Indicator on mobile (Swipe down to dismiss) */}
        <div
          className="w-full flex items-center justify-center pt-1 pb-2.5 -mt-1 cursor-grab active:cursor-grabbing touch-none select-none shrink-0"
          {...dragHandleProps}
        >
          <div className="w-12 h-1.5 bg-rose-300/80 dark:bg-zinc-600 hover:bg-rose-400 dark:hover:bg-zinc-500 rounded-full transition-colors" />
        </div>
        
        {/* Floating Toast notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 dark:bg-zinc-900/95 text-white border border-rose-400/50 dark:border-emerald-500/50 rounded-2xl px-4 py-2.5 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2 pointer-events-none">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Dialog Header */}
        <div
          {...dragHandleProps}
          className="flex items-center justify-between pb-3.5 border-b border-rose-100 dark:border-zinc-800 shrink-0 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 dark:from-zinc-700 dark:to-zinc-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-[#4c0519] dark:text-[#f3f4f6]">
                  Catálogo de Libros Gratis
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white shadow-2xs">
                  100% Español
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium">
                {SPANISH_CATALOG.length} obras 100% en español listas para descargar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDownloadCenterOpen(true)}
              className="relative py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-rose-700 dark:text-zinc-200 border border-rose-200/80 dark:border-zinc-700 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              title="Abrir Centro de Descargas"
            >
              <Download className="w-4 h-4 text-rose-600 dark:text-rose-400 stroke-[2.3]" />
              <span className="hidden sm:inline">Descargas</span>
              {(queueState.totalCount > 0 || queueState.activeItem) && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                  {queueState.pendingItems.length + (queueState.activeItem ? 1 : 0)}
                </span>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-rose-50 dark:bg-zinc-800 flex items-center justify-center text-rose-500 dark:text-zinc-400 hover:bg-rose-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              title="Cerrar catálogo"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Filters and Instant Local Search Bar */}
        <div className="pt-3 pb-2 space-y-2.5 shrink-0">
          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-rose-400 dark:text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={handleQueryChange}
              placeholder="Buscar por nombre de libro, manga o autor..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-rose-50/60 dark:bg-zinc-900/80 border border-rose-200/80 dark:border-zinc-700 rounded-2xl outline-none text-[#4c0519] dark:text-[#f3f4f6] placeholder-rose-400/70 dark:placeholder-zinc-500 font-bold focus:ring-2 focus:ring-rose-400/30 dark:focus:ring-zinc-600 transition-all"
            />
            {isGutenbergSearching && (
              <div className={`absolute ${filterQuery ? 'right-9' : 'right-3'} top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-rose-500 dark:text-zinc-400 font-semibold pointer-events-none`}>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Gutenberg...</span>
              </div>
            )}
            {filterQuery && (
              <button
                onClick={() => {
                  setFilterQuery('');
                  setDisplayLimit(PAGE_SIZE);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-rose-400 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-zinc-200"
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => handleCategoryChange('todos')}
              className={`px-3 py-1.5 rounded-xl font-black transition-all shrink-0 cursor-pointer ${
                activeCategory === 'todos'
                  ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                  : 'bg-rose-50 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-rose-100 dark:hover:bg-zinc-700 font-bold'
              }`}
            >
              🌟 Todos ({categoryCounts.todos})
            </button>
            <button
              onClick={() => handleCategoryChange('libros')}
              className={`px-3 py-1.5 rounded-xl font-black transition-all shrink-0 cursor-pointer ${
                activeCategory === 'libros'
                  ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                  : 'bg-rose-50 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-rose-100 dark:hover:bg-zinc-700 font-bold'
              }`}
            >
              📚 Libros ({categoryCounts.libros})
            </button>
            <button
              onClick={() => handleCategoryChange('manga')}
              className={`px-3 py-1.5 rounded-xl font-black transition-all shrink-0 cursor-pointer ${
                activeCategory === 'manga'
                  ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                  : 'bg-rose-50 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-rose-100 dark:hover:bg-zinc-700 font-bold'
              }`}
            >
              ⛩️ Mangas ({categoryCounts.manga})
            </button>
            <button
              onClick={() => handleCategoryChange('manhwa')}
              className={`px-3 py-1.5 rounded-xl font-black transition-all shrink-0 cursor-pointer ${
                activeCategory === 'manhwa'
                  ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                  : 'bg-rose-50 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-rose-100 dark:hover:bg-zinc-700 font-bold'
              }`}
            >
              🇰🇷 Manhwas ({categoryCounts.manhwa})
            </button>
            <button
              onClick={() => handleCategoryChange('romance')}
              className={`px-3 py-1.5 rounded-xl font-black transition-all shrink-0 cursor-pointer ${
                activeCategory === 'romance'
                  ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                  : 'bg-rose-50 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-rose-100 dark:hover:bg-zinc-700 font-bold'
              }`}
            >
              💖 Romance ({categoryCounts.romance})
            </button>
          </div>
        </div>

        {/* Scrollable Catalog Grid */}
        <div className="py-2 overflow-y-auto flex-1 space-y-3.5 pr-1">
          {filteredCatalog.length === 0 ? (
            <div className="py-14 text-center space-y-2">
              <Filter className="w-8 h-8 text-rose-300 dark:text-zinc-400 mx-auto" />
              <p className="text-sm font-semibold text-[#881337] dark:text-zinc-300">
                No se encontraron obras que coincidan con tu búsqueda.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {visibleItems.map(item => {
                  const ownedBook = getOwnedBook(item);
                  const isItemActive = queueState.activeItem?.item.id === item.id;
                  const isItemPending = queueState.pendingItems.some(q => q.item.id === item.id);
                  const isQueued = isItemActive || isItemPending;

                  return (
                    <div
                      key={item.id}
                      className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-rose-200/80 dark:border-zinc-800 hover:border-rose-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between gap-2.5 shadow-xs"
                    >
                      {/* Top Section: Lateral Official Cover + Metadata */}
                      <div className="flex gap-3 items-start">
                        {/* Real Official Cover (Left) */}
                        <div className="relative w-20 sm:w-24 aspect-[3/4.2] rounded-xl overflow-hidden shrink-0 shadow-md border border-rose-200/60 dark:border-zinc-700/60 bg-slate-900/10">
                          <CatalogCoverImage item={item} ownedCoverUrl={ownedBook?.coverUrl} />
                          {/* Format badge overlay */}
                          <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs">
                            {item.format.toUpperCase()}
                          </span>
                        </div>

                        {/* Right Column: Badges, Title, Author, Genre */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                              <span
                                className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase text-white shadow-2xs"
                                style={{ backgroundColor: item.coverGradient.accent }}
                              >
                                {item.badgeText}
                              </span>
                              {item.year && (
                                <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                                  {item.year}
                                </span>
                              )}
                            </div>

                            <h4
                              className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2 text-[#4c0519] dark:text-[#f3f4f6]"
                              title={item.title}
                            >
                              {item.title}
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-zinc-300 font-medium truncate mt-0.5">
                              {item.author}
                            </p>
                          </div>

                          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-600 dark:text-zinc-400 font-mono">
                            <span className="font-sans font-semibold text-rose-700 dark:text-rose-400 truncate max-w-[130px]">
                              {item.genre}
                            </span>
                            <span className="shrink-0">{item.totalPages} págs</span>
                          </div>
                        </div>
                      </div>

                      {/* Synopsis */}
                      <p className="text-xs text-slate-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Action buttons */}
                      <div className="pt-2 border-t border-rose-100 dark:border-zinc-800">
                        {ownedBook ? (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] border border-emerald-500/30">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span className="truncate">En biblioteca</span>
                            </div>

                            {item.category !== 'libros' && (
                              <button
                                onClick={() => setSelectedMangaForEpisodes(item)}
                                className="py-2 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-rose-700 dark:text-zinc-200 font-bold text-xs flex items-center gap-1 border border-rose-200/80 dark:border-zinc-700 transition-colors cursor-pointer shrink-0"
                                title="Descargar más episodios"
                              >
                                <Download className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                                <span>Episodios</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleReadOwnedBook(ownedBook)}
                              className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
                              title="Abrir y leer ahora"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Leer</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              if (item.category === 'libros') {
                                handleDownloadBook(item);
                              } else {
                                setSelectedMangaForEpisodes(item);
                              }
                            }}
                            disabled={isQueued}
                            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:from-zinc-200 dark:to-zinc-300 dark:hover:from-white dark:hover:to-zinc-200 text-white dark:text-zinc-950 font-bold text-xs shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {isItemActive ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin text-white dark:text-zinc-900" />
                                <span>Descargando ({queueState.activeItem?.progressPercent}%)...</span>
                              </>
                            ) : isItemPending ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin opacity-60 text-white dark:text-zinc-900" />
                                <span>En cola de descargas...</span>
                              </>
                            ) : item.category === 'libros' ? (
                              <>
                                <Download className="w-4 h-4 stroke-[2.2]" />
                                <span>Descargar libro</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4 stroke-[2.2]" />
                                <span>Descargar episodios</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progressive loading controls */}
              {visibleItems.length < filteredCatalog.length && (
                <div className="pt-4 pb-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <button
                    onClick={() => setDisplayLimit(prev => Math.min(prev + PAGE_SIZE, filteredCatalog.length))}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Cargar más obras (+{Math.min(PAGE_SIZE, filteredCatalog.length - visibleItems.length)})</span>
                  </button>
                  <button
                    onClick={() => setDisplayLimit(filteredCatalog.length)}
                    className="text-xs font-semibold text-rose-600 dark:text-zinc-400 hover:underline px-3 py-1.5 cursor-pointer"
                  >
                    Mostrar todas ({filteredCatalog.length})
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Floating Download Queue Progress Bar */}
        {queueState.totalCount > 0 && (
          <div
            onClick={() => setIsDownloadCenterOpen(true)}
            className="mx-1 mb-2 p-3 rounded-2xl bg-slate-900/95 dark:bg-zinc-800 text-white border border-rose-400/40 shadow-xl flex items-center justify-between gap-3 text-xs shrink-0 animate-in fade-in slide-in-from-bottom-2 cursor-pointer hover:border-rose-400 transition-all"
            title="Abrir Centro de Descargas"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Loader2 className={`w-4 h-4 text-rose-400 shrink-0 ${queueState.isProcessing ? 'animate-spin' : ''}`} />
              <div className="min-w-0">
                <p className="font-bold truncate">
                  {queueState.isProcessing
                    ? (queueState.activeItem?.progressMessage || `Descargando: ${queueState.activeItem?.item.title || 'obra'}...`)
                    : 'Descargas finalizadas con éxito (Toca para abrir)'}
                </p>
                <p className="text-[10px] text-slate-300">
                  {queueState.completedCount} de {queueState.totalCount} obras descargadas en la biblioteca
                </p>
              </div>
            </div>
            <div className="w-24 sm:w-36 h-2 bg-slate-800 dark:bg-zinc-700 rounded-full overflow-hidden shrink-0">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300"
                style={{
                  width: `${Math.round((queueState.completedCount / Math.max(1, queueState.totalCount)) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-rose-100 dark:border-zinc-800 flex items-center justify-between text-xs text-[#881337]/90 dark:text-zinc-300 shrink-0 font-medium gap-2">
          <button
            onClick={() => setIsDownloadCenterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-zinc-800 text-rose-700 dark:text-zinc-200 font-bold transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span className="hidden sm:inline">Centro de Descargas</span>
            <span className="sm:hidden">Descargas</span>
            {(queueState.totalCount > 0 || queueState.activeItem) && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                {queueState.pendingItems.length + (queueState.activeItem ? 1 : 0)}
              </span>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 dark:bg-zinc-200 dark:hover:bg-white text-white dark:text-zinc-950 font-bold transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Sub-modals */}
      <EpisodeSelectorModal
        item={selectedMangaForEpisodes}
        isOpen={!!selectedMangaForEpisodes}
        onClose={() => setSelectedMangaForEpisodes(null)}
        onEnqueued={(title, count) => showToast(`«${title}» (${count} eps) añadido al Centro de Descargas.`)}
      />

      <DownloadCenterModal
        isOpen={isDownloadCenterOpen}
        onClose={() => setIsDownloadCenterOpen(false)}
      />
    </div>
  );
};
