import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  CheckCircle2,
  BookmarkCheck,
  Play,
  Filter,
  Loader2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useBackHandler } from '../services/backButton';
import { importBookFile } from '../services/bookImporter';
import { SPANISH_CATALOG, type CatalogItem } from '../services/catalogData';
import type { Book } from '../types';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryFilter = 'todos' | 'libros' | 'manga' | 'manhwa' | 'comics';

export const ExploreModal: React.FC<ExploreModalProps> = ({ isOpen, onClose }) => {
  const { books, openReader, refreshLibrary } = useApp();

  const PAGE_SIZE = 36;
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('todos');
  const [filterQuery, setFilterQuery] = useState('');
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // Pre-normalize owned books for O(1)/O(N) high performance lookup
  const cleanOwnedBooks = useMemo(() => {
    return books.map(b => ({
      book: b,
      cleanTitle: b.title.toLowerCase().replace(/[^a-z0-9]/g, ''),
    }));
  }, [books]);

  // Check if a catalog item is already saved in the user's personal library
  const getOwnedBook = (item: CatalogItem): Book | undefined => {
    const cleanCatalogTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const found = cleanOwnedBooks.find(
      cb => cb.cleanTitle.includes(cleanCatalogTitle) || cleanCatalogTitle.includes(cb.cleanTitle)
    );
    return found?.book;
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      todos: SPANISH_CATALOG.length,
      libros: SPANISH_CATALOG.filter(i => i.category === 'libros').length,
      manga: SPANISH_CATALOG.filter(i => i.category === 'manga').length,
      manhwa: SPANISH_CATALOG.filter(i => i.category === 'manhwa').length,
      comics: SPANISH_CATALOG.filter(i => i.category === 'comics').length,
    };
  }, []);

  // Filter catalog items by category and local search query
  const filteredCatalog = useMemo(() => {
    return SPANISH_CATALOG.filter(item => {
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
  }, [activeCategory, filterQuery]);

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

  // Handle "Marcar cómo propio" action
  const handleMarkAsOwned = async (item: CatalogItem) => {
    setDownloadingId(item.id);
    try {
      // 1. Generate the local file (EPUB or CBZ) with full Spanish content
      const file = await item.createFile();

      // 2. Import into user's personal library (IndexedDB + Android storage)
      await importBookFile(file, [
        item.category !== 'libros' ? 'cat-manga' : 'cat-books',
      ]);

      // 3. Refresh user's library context
      await refreshLibrary();

      showToast(`«${item.title}» se ha guardado en tu biblioteca.`);
    } catch (err: any) {
      console.error('Error al guardar obra en biblioteca:', err);
      showToast('Error al guardar la obra localmente: ' + (err.message || String(err)));
    } finally {
      setDownloadingId(null);
    }
  };

  // Handle "Leer ahora" for already owned book
  const handleReadOwnedBook = (ownedBook: Book) => {
    onClose();
    openReader(ownedBook);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Main Catalog Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#18191c] border border-rose-200 dark:border-zinc-700/80 rounded-3xl shadow-2xl p-4 sm:p-6 z-10 animate-in zoom-in-95 duration-200 text-[#4c0519] dark:text-[#f3f4f6] flex flex-col max-h-[92vh]">
        
        {/* Floating Toast notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 dark:bg-zinc-900/95 text-white border border-rose-400/50 dark:border-emerald-500/50 rounded-2xl px-4 py-2.5 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2 pointer-events-none">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Dialog Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 dark:from-zinc-700 dark:to-zinc-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                  Biblioteca Pública de Obras
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white dark:bg-zinc-700 dark:text-zinc-200">
                  100% Español
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#881337]/70 dark:text-zinc-400">
                Libros, mangas y cómics listos para guardar y leer sin conexión
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-rose-100 dark:hover:bg-zinc-800 text-rose-400 dark:text-zinc-400 transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Instant Local Search Bar */}
        <div className="pt-3 pb-2 space-y-3 shrink-0">
          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-rose-400 dark:text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={handleQueryChange}
              placeholder="Filtrar por título, autor o género..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-rose-50/50 dark:bg-zinc-900/80 border border-rose-200/80 dark:border-zinc-700 rounded-2xl outline-none text-[#4c0519] dark:text-[#f3f4f6] placeholder-rose-400/60 dark:placeholder-zinc-500 focus:ring-2 focus:ring-rose-400/30 dark:focus:ring-zinc-600 transition-all"
            />
            {filterQuery && (
              <button
                onClick={() => {
                  setFilterQuery('');
                  setDisplayLimit(PAGE_SIZE);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-rose-400 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-zinc-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => handleCategoryChange('todos')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'todos'
                  ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                  : 'bg-rose-50 dark:bg-zinc-800 text-[#881337] dark:text-zinc-300 hover:bg-rose-100 dark:hover:bg-zinc-700'
              }`}
            >
              Todos ({categoryCounts.todos})
            </button>
            <button
              onClick={() => handleCategoryChange('libros')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'libros'
                  ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                  : 'bg-rose-50 dark:bg-zinc-800 text-[#881337] dark:text-zinc-300 hover:bg-rose-100 dark:hover:bg-zinc-700'
              }`}
            >
              Libros y Novelas ({categoryCounts.libros})
            </button>
            <button
              onClick={() => handleCategoryChange('manga')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'manga'
                  ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                  : 'bg-rose-50 dark:bg-zinc-800 text-[#881337] dark:text-zinc-300 hover:bg-rose-100 dark:hover:bg-zinc-700'
              }`}
            >
              Mangas ({categoryCounts.manga})
            </button>
            <button
              onClick={() => handleCategoryChange('manhwa')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'manhwa'
                  ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                  : 'bg-rose-50 dark:bg-zinc-800 text-[#881337] dark:text-zinc-300 hover:bg-rose-100 dark:hover:bg-zinc-700'
              }`}
            >
              Manhwas y Webtoons ({categoryCounts.manhwa})
            </button>
            <button
              onClick={() => handleCategoryChange('comics')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === 'comics'
                  ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                  : 'bg-rose-50 dark:bg-zinc-800 text-[#881337] dark:text-zinc-300 hover:bg-rose-100 dark:hover:bg-zinc-700'
              }`}
            >
              Cómics ({categoryCounts.comics})
            </button>
          </div>
        </div>

        {/* Scrollable Catalog Grid */}
        <div className="py-2 overflow-y-auto flex-1 space-y-3.5 pr-1">
          {filteredCatalog.length === 0 ? (
            <div className="py-14 text-center space-y-2">
              <Filter className="w-8 h-8 text-rose-300 dark:text-zinc-600 mx-auto" />
              <p className="text-sm font-semibold text-[#881337] dark:text-zinc-400">
                No se encontraron obras que coincidan con tu búsqueda.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {visibleItems.map(item => {
                  const ownedBook = getOwnedBook(item);
                  const isDownloading = downloadingId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="p-3 sm:p-3.5 rounded-2xl bg-rose-50/40 dark:bg-zinc-900/60 border border-rose-200/70 dark:border-zinc-800 hover:border-rose-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between gap-3 shadow-xs"
                    >
                      {/* Header info */}
                      <div className="space-y-2">
                        {/* Gradient preview badge */}
                        <div
                          className="h-24 sm:h-28 rounded-xl p-3 flex flex-col justify-between text-white shadow-xs relative overflow-hidden"
                          style={{
                            background: `linear-gradient(135deg, ${item.coverGradient.from}, ${item.coverGradient.to})`,
                          }}
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase">
                            <span className="px-2 py-0.5 rounded-full bg-black/35 backdrop-blur-xs">
                              {item.format.toUpperCase()}
                            </span>
                            <span
                              className="px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: `${item.coverGradient.accent}40` }}
                            >
                              {item.badgeText}
                            </span>
                          </div>

                          <div className="z-10">
                            <h4 className="font-extrabold text-sm sm:text-base leading-tight drop-shadow-sm line-clamp-2">
                              {item.title}
                            </h4>
                            <p className="text-[11px] opacity-90 truncate drop-shadow-xs">
                              {item.author} {item.year ? `(${item.year})` : ''}
                            </p>
                          </div>

                          {/* Subtle decorative circle */}
                          <div
                            className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-20 pointer-events-none"
                            style={{ backgroundColor: item.coverGradient.accent }}
                          />
                        </div>

                        {/* Genre & Meta */}
                        <div className="flex items-center justify-between text-[11px] text-[#881337]/75 dark:text-zinc-400 font-mono">
                          <span className="font-sans font-semibold text-rose-700 dark:text-zinc-300 truncate max-w-[160px]">
                            {item.genre}
                          </span>
                          <span>{item.totalPages} págs. aprox</span>
                        </div>

                        {/* Synopsis */}
                        <p className="text-xs text-[#4c0519]/80 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 border-t border-rose-100 dark:border-zinc-800">
                        {ownedBook ? (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] border border-emerald-500/30">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>En tu biblioteca</span>
                            </div>

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
                            onClick={() => handleMarkAsOwned(item)}
                            disabled={isDownloading}
                            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:from-zinc-200 dark:to-zinc-300 dark:hover:from-white dark:hover:to-zinc-200 text-white dark:text-zinc-950 font-bold text-xs shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {isDownloading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Guardando copia local...</span>
                              </>
                            ) : (
                              <>
                                <BookmarkCheck className="w-4 h-4 stroke-[2.2]" />
                                <span>Marca cómo propio</span>
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

        {/* Footer */}
        <div className="pt-3 border-t border-rose-100 dark:border-zinc-800 flex items-center justify-between text-xs text-[#881337]/70 dark:text-zinc-500 shrink-0">
          <span>
            Mostrando {Math.min(visibleItems.length, filteredCatalog.length)} de {filteredCatalog.length} {filteredCatalog.length === 1 ? 'obra' : 'obras'} en español
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-rose-100/70 hover:bg-rose-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#881337] dark:text-zinc-200 font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
