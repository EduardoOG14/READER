import React, { useState } from 'react';
import {
  X,
  Search,
  Download,
  BookOpen,
  Loader2,
  Globe,
  Sparkles,
  ChevronRight,
  Play,
  ArrowLeft,
} from 'lucide-react';
import {
  searchOnlineBooks,
  searchOnlineManga,
  getMangaChapters,
  downloadOnlineBook,
  downloadMangaChapterToLibrary,
  type OnlineBook,
  type OnlineManga,
  type MangaChapterInfo,
} from '../services/onlineCatalog';
import { useApp } from '../context/AppContext';
import type { Book } from '../types';
import { useBackHandler } from '../services/backButton';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'manga' | 'books';
type MangaTypeFilter = 'all' | 'manga' | 'manhwa' | 'comic';

export const ExploreModal: React.FC<ExploreModalProps> = ({ isOpen, onClose }) => {
  const { openReader, refreshLibrary } = useApp();

  const [activeTab, setActiveTab] = useState<TabType>('manga');
  const [searchQuery, setSearchQuery] = useState('');
  const [mangaTypeFilter, setMangaTypeFilter] = useState<MangaTypeFilter>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<'es' | 'all'>('es');

  const [isLoading, setIsLoading] = useState(false);
  const [bookResults, setBookResults] = useState<OnlineBook[]>([]);
  const [mangaResults, setMangaResults] = useState<OnlineManga[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Chapter selection for manga
  const [selectedManga, setSelectedManga] = useState<OnlineManga | null>(null);
  const [chapters, setChapters] = useState<MangaChapterInfo[]>([]);
  const [isLoadingChapters, setIsLoadingChapters] = useState(false);

  // Download states
  const [downloadingId, setDownloadingId] = useState<string | number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadStatusText, setDownloadStatusText] = useState<string>('');
  const [downloadedBooks, setDownloadedBooks] = useState<Record<string, Book>>({});
  const [searchError, setSearchError] = useState<string | null>(null);

  // When browsing manga chapters, pressing back returns to the search list first (Priority 125)
  useBackHandler(() => {
    if (selectedManga) {
      setSelectedManga(null);
      return true;
    }
    return false;
  }, 125, isOpen && !!selectedManga);

  if (!isOpen) return null;

  const popularMangaQueries = [
    'Solo Leveling',
    'Omniscient Reader',
    'One Piece',
    'Berserk',
    'Tower of God',
    'Chainsaw Man',
    'Eleceed',
  ];

  const popularBookQueries = [
    'Don Quijote',
    'Frankenstein',
    'Sherlock Holmes',
    'Orgullo y Prejuicio',
    'Drácula',
    'Alicia en el país de las maravillas',
  ];

  const handleSearch = async (queryToSearch = searchQuery) => {
    const q = queryToSearch.trim();
    if (!q) return;

    setIsLoading(true);
    setHasSearched(true);
    setSelectedManga(null);
    setSearchError(null);

    try {
      if (activeTab === 'manga') {
        const results = await searchOnlineManga(q, mangaTypeFilter);
        setMangaResults(results);
      } else {
        const results = await searchOnlineBooks(q, selectedLanguage);
        setBookResults(results);
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setSearchError('No se pudo conectar con el servidor. Comprueba tu conexión a internet.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChapters = async (manga: OnlineManga) => {
    setSelectedManga(manga);
    setIsLoadingChapters(true);
    try {
      const chaps = await getMangaChapters(manga.id, selectedLanguage);
      setChapters(chaps);
    } catch (err) {
      console.error('Error fetching chapters:', err);
    } finally {
      setIsLoadingChapters(false);
    }
  };

  const handleDownloadBook = async (book: OnlineBook) => {
    setDownloadingId(book.id);
    setDownloadProgress(0);
    setDownloadStatusText('Iniciando descarga...');

    try {
      const importedBook = await downloadOnlineBook(book, (percent, status) => {
        setDownloadProgress(percent);
        setDownloadStatusText(status);
      });
      setDownloadedBooks(prev => ({ ...prev, [String(book.id)]: importedBook }));
      await refreshLibrary();
    } catch (err: any) {
      alert(`Error al descargar: ${err?.message || 'Fallo de descarga'}`);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadChapter = async (chapter: MangaChapterInfo) => {
    if (!selectedManga) return;

    const downloadKey = `${selectedManga.id}_${chapter.id}`;
    setDownloadingId(downloadKey);
    setDownloadProgress(0);
    setDownloadStatusText('Conectando...');

    try {
      const importedBook = await downloadMangaChapterToLibrary(selectedManga, chapter, (percent, status) => {
        setDownloadProgress(percent);
        setDownloadStatusText(status);
      });
      setDownloadedBooks(prev => ({ ...prev, [downloadKey]: importedBook }));
      await refreshLibrary();
    } catch (err: any) {
      alert(`Error al descargar capítulo: ${err?.message || 'Fallo de conexión'}`);
    } finally {
      setDownloadingId(null);
    }
  };

  const getMangaTypeBadge = (typeLabel: OnlineManga['typeLabel']) => {
    switch (typeLabel) {
      case 'Manhwa':
        return 'bg-cyan-500/90 text-white';
      case 'Manga':
        return 'bg-purple-600/90 text-white';
      case 'Manhua':
        return 'bg-amber-600/90 text-white';
      default:
        return 'bg-rose-600/90 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl h-[90vh] bg-white dark:bg-[#0a2920] border border-rose-200 dark:border-emerald-700/80 rounded-3xl shadow-2xl flex flex-col z-10 animate-in zoom-in-95 duration-200 overflow-hidden text-[#4c0519] dark:text-[#ecfdf5]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 dark:border-emerald-800/60 bg-[#fff5f8]/70 dark:bg-[#07241c]/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 dark:from-emerald-500 dark:to-teal-400 text-white flex items-center justify-center shadow-md">
              <Globe className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  Explorar y Descargar
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 dark:bg-emerald-950 text-rose-700 dark:text-emerald-300 border border-rose-200 dark:border-emerald-800">
                  Online
                </span>
              </div>
              <p className="text-xs text-[#881337]/70 dark:text-[#a7f3d0]/70">
                Descarga mangas, manhwas, cómics y libros para leer sin conexión
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-rose-100 dark:hover:bg-[#0f382c] text-rose-400 dark:text-emerald-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Search Controls */}
        <div className="p-4 border-b border-rose-100 dark:border-emerald-800/60 space-y-3 shrink-0">
          {/* Main Tabs: Manga/Manhwa vs Libros */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('manga');
                setSelectedManga(null);
                setHasSearched(false);
              }}
              className={`flex-1 py-2 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'manga'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 dark:from-emerald-500 dark:to-teal-400 text-white shadow-xs'
                  : 'bg-rose-50/60 dark:bg-[#07241c] text-[#881337] dark:text-[#a7f3d0] border border-rose-200/60 dark:border-emerald-800/60'
              }`}
            >
              <span>⛩️ Mangas, Manhwas & Cómics</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('books');
                setSelectedManga(null);
                setHasSearched(false);
              }}
              className={`flex-1 py-2 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'books'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 dark:from-emerald-500 dark:to-teal-400 text-white shadow-xs'
                  : 'bg-rose-50/60 dark:bg-[#07241c] text-[#881337] dark:text-[#a7f3d0] border border-rose-200/60 dark:border-emerald-800/60'
              }`}
            >
              <span>📚 Libros & Clásicos (EPUB)</span>
            </button>
          </div>

          {/* Search Box */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex items-center gap-2"
          >
            <div className="flex-1 flex items-center bg-white dark:bg-[#07241c] border border-rose-200 dark:border-emerald-700/80 rounded-2xl px-3.5 py-2 shadow-2xs">
              <Search className="w-4 h-4 text-rose-400 dark:text-emerald-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder={
                  activeTab === 'manga'
                    ? 'Buscar manga o manhwa (ej: Solo Leveling, One Piece, Omniscient Reader)...'
                    : 'Buscar libro por título o autor (ej: Don Quijote, Frankenstein, Sherlock)...'
                }
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#4c0519] dark:text-[#ecfdf5] placeholder-rose-300 dark:placeholder-emerald-500/60 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-rose-400 hover:text-rose-700 dark:text-emerald-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="bg-gradient-to-r from-rose-500 to-pink-500 dark:from-emerald-500 dark:to-teal-400 disabled:opacity-50 text-white px-4 py-2 rounded-2xl font-bold text-xs shadow-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </form>

          {/* Sub-Filters for Manga or Language */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {activeTab === 'manga' ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-[#881337]/70 dark:text-[#a7f3d0]/70">Tipo:</span>
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'manhwa', label: '🇰🇷 Manhwas' },
                  { id: 'manga', label: '⛩️ Mangas' },
                  { id: 'comic', label: '🦸 Cómics' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setMangaTypeFilter(f.id as any);
                      if (searchQuery.trim()) {
                        handleSearch();
                      }
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                      mangaTypeFilter === f.id
                        ? 'bg-rose-500 text-white dark:bg-emerald-400 dark:text-slate-950 font-bold shadow-2xs'
                        : 'bg-rose-50 dark:bg-[#07241c] text-[#881337] dark:text-[#a7f3d0] border border-rose-200/50 dark:border-emerald-800/60'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#881337]/70 dark:text-[#a7f3d0]/70">Idioma:</span>
                <button
                  onClick={() => setSelectedLanguage('es')}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold cursor-pointer ${
                    selectedLanguage === 'es'
                      ? 'bg-rose-500 text-white dark:bg-emerald-400 dark:text-slate-950 font-bold'
                      : 'bg-rose-50 dark:bg-[#07241c] text-[#881337] dark:text-[#a7f3d0]'
                  }`}
                >
                  🇪🇸 Español
                </button>
                <button
                  onClick={() => setSelectedLanguage('all')}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold cursor-pointer ${
                    selectedLanguage === 'all'
                      ? 'bg-rose-500 text-white dark:bg-emerald-400 dark:text-slate-950 font-bold'
                      : 'bg-rose-50 dark:bg-[#07241c] text-[#881337] dark:text-[#a7f3d0]'
                  }`}
                >
                  🌐 Todos
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {/* Active Download Progress Bar Banner */}
          {downloadingId && (
            <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 dark:from-emerald-500/10 dark:to-teal-400/10 border border-rose-300 dark:border-emerald-600/60 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-rose-700 dark:text-emerald-300">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-rose-500 dark:text-emerald-400" />
                  <span>{downloadStatusText || 'Descargando...'}</span>
                </div>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-rose-200/50 dark:bg-[#07241c] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 dark:from-emerald-400 dark:to-teal-300 rounded-full transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* CHAPTER SELECTOR VIEW FOR MANGA */}
          {selectedManga ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setSelectedManga(null)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-[#07241c] text-xs font-bold text-[#881337] dark:text-[#a7f3d0] hover:bg-rose-200 dark:hover:bg-[#0f382c] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a resultados</span>
                </button>
              </div>

              {/* Manga Header in Chapter View */}
              <div className="flex gap-4 p-4 rounded-3xl bg-rose-50/60 dark:bg-[#07241c]/60 border border-rose-200/60 dark:border-emerald-800/60 mb-5">
                {selectedManga.coverUrl && (
                  <img
                    src={selectedManga.coverUrl}
                    alt={selectedManga.title}
                    className="w-20 h-28 object-cover rounded-2xl shadow-md shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${getMangaTypeBadge(
                      selectedManga.typeLabel
                    )}`}
                  >
                    {selectedManga.typeLabel}
                  </span>
                  <h4 className="text-base font-bold text-[#4c0519] dark:text-[#ecfdf5] mt-1 line-clamp-1">
                    {selectedManga.title}
                  </h4>
                  {selectedManga.description && (
                    <p className="text-xs text-[#881337]/75 dark:text-[#a7f3d0]/75 line-clamp-2 mt-1">
                      {selectedManga.description}
                    </p>
                  )}
                  <p className="text-xs font-semibold text-rose-600 dark:text-emerald-400 mt-2">
                    {chapters.length} capítulos disponibles
                  </p>
                </div>
              </div>

              {/* Chapters List */}
              {isLoadingChapters ? (
                <div className="h-48 flex flex-col items-center justify-center text-rose-400 dark:text-emerald-400 gap-2">
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <span className="text-xs font-semibold">Cargando capítulos...</span>
                </div>
              ) : chapters.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#881337]/70 dark:text-[#a7f3d0]/70">
                  No se encontraron capítulos disponibles en español para este manga.
                </div>
              ) : (
                <div className="space-y-2">
                  {chapters.map(chap => {
                    const downloadKey = `${selectedManga.id}_${chap.id}`;
                    const isDownloadingThis = downloadingId === downloadKey;
                    const downloadedBook = downloadedBooks[downloadKey];

                    return (
                      <div
                        key={chap.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-[#07241c] border border-rose-200/70 dark:border-emerald-800/60 hover:border-rose-400 dark:hover:border-emerald-500 transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-xs text-rose-700 dark:text-emerald-300">
                            #{chap.chapter}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#4c0519] dark:text-[#ecfdf5]">
                              Capítulo {chap.chapter} {chap.title ? `• ${chap.title}` : ''}
                            </div>
                            <div className="text-[10px] text-[#881337]/70 dark:text-[#a7f3d0]/70">
                              {chap.pages} páginas • Idioma: {chap.language.toUpperCase()}
                            </div>
                          </div>
                        </div>

                        {downloadedBook ? (
                          <button
                            onClick={() => {
                              openReader(downloadedBook);
                              onClose();
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Leer ahora</span>
                          </button>
                        ) : isDownloadingThis ? (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-[#0f382c] text-rose-600 dark:text-emerald-300 font-bold text-xs">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{downloadProgress}%</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleDownloadChapter(chap)}
                            disabled={downloadingId !== null}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 dark:from-emerald-500 dark:to-teal-400 text-white font-bold text-xs shadow-xs hover:shadow-md active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Descargar</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : !hasSearched ? (
            /* POPULAR SUGGESTIONS BEFORE SEARCH */
            <div className="py-6 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-3xl bg-rose-100/70 dark:bg-[#07241c] text-rose-500 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Sparkles className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-[#4c0519] dark:text-[#ecfdf5] mb-1">
                {activeTab === 'manga'
                  ? 'Explora Mangas, Manhwas y Cómics'
                  : 'Explora Libros Clásicos y Universales'}
              </h4>
              <p className="text-xs text-[#881337]/75 dark:text-[#a7f3d0]/75 mb-5">
                Escribe en la barra de búsqueda o prueba con una de las sugerencias populares:
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {(activeTab === 'manga' ? popularMangaQueries : popularBookQueries).map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      setSearchQuery(item);
                      handleSearch(item);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-[#07241c] hover:bg-rose-100 dark:hover:bg-[#0f382c] border border-rose-200/70 dark:border-emerald-800/60 text-xs font-semibold text-[#881337] dark:text-[#a7f3d0] transition-all cursor-pointer shadow-2xs hover:scale-103"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : isLoading ? (
            /* LOADING SPINNER */
            <div className="h-64 flex flex-col items-center justify-center text-rose-400 dark:text-emerald-400 gap-3">
              <Loader2 className="w-9 h-9 animate-spin" />
              <span className="text-xs font-bold uppercase tracking-wider">Buscando en catálogo online...</span>
            </div>
          ) : searchError ? (
            /* SEARCH ERROR / OFFLINE VIEW */
            <div className="py-14 text-center max-w-md mx-auto p-6 rounded-3xl bg-rose-50/70 dark:bg-[#07241c] border border-rose-200 dark:border-emerald-800/80 my-4">
              <p className="text-sm font-bold text-rose-600 dark:text-emerald-400 mb-1">
                Catálogo no disponible sin conexión
              </p>
              <p className="text-xs text-[#881337]/75 dark:text-[#a7f3d0]/75">
                {searchError}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-emerald-500/60 mt-3">
                Todas las obras ya guardadas en tu biblioteca siguen 100% disponibles sin conexión.
              </p>
            </div>
          ) : activeTab === 'manga' ? (
            /* MANGA & MANHWA RESULTS */
            mangaResults.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#881337]/70 dark:text-[#a7f3d0]/70">
                No se encontraron mangas o manhwas con ese título. Intenta con otro nombre.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mangaResults.map(manga => (
                  <div
                    key={manga.id}
                    onClick={() => handleOpenChapters(manga)}
                    className="group relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-rose-50/40 dark:bg-[#07241c]/60 border border-rose-200/70 dark:border-emerald-800/60 p-2 hover:border-rose-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="relative aspect-[3/4.2] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 mb-2">
                      {manga.coverUrl ? (
                        <img
                          src={manga.coverUrl}
                          alt={manga.title}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-rose-300 dark:text-emerald-500">
                          <BookOpen className="w-8 h-8" />
                        </div>
                      )}
                      <span
                        className={`absolute top-2 left-2 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${getMangaTypeBadge(
                          manga.typeLabel
                        )}`}
                      >
                        {manga.typeLabel}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#4c0519] dark:text-[#ecfdf5] line-clamp-1 group-hover:text-rose-600 dark:group-hover:text-emerald-300 transition-colors">
                      {manga.title}
                    </h4>

                    <div className="mt-2 pt-2 border-t border-rose-200/40 dark:border-emerald-800/40 flex items-center justify-between text-[11px] font-bold text-rose-600 dark:text-emerald-400">
                      <span>Ver Capítulos</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* BOOKS (EPUB) RESULTS */
            bookResults.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#881337]/70 dark:text-[#a7f3d0]/70">
                No se encontraron libros con ese título o autor.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {bookResults.map(book => {
                  const isDownloadingThis = downloadingId === book.id;
                  const downloadedBook = downloadedBooks[String(book.id)];

                  return (
                    <div
                      key={book.id}
                      className="flex gap-3.5 p-3 rounded-2xl bg-white dark:bg-[#07241c] border border-rose-200/70 dark:border-emerald-800/60 hover:border-rose-400 dark:hover:border-emerald-500 transition-all shadow-2xs"
                    >
                      <div className="w-16 h-22 rounded-xl overflow-hidden bg-rose-100 dark:bg-slate-800 shrink-0 border border-rose-200/60 dark:border-emerald-950">
                        {book.coverUrl ? (
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-rose-400 dark:text-emerald-500">
                            <BookOpen className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded uppercase bg-emerald-600 text-white">
                              {book.format.toUpperCase()}
                            </span>
                            <span className="text-[10px] text-[#881337]/70 dark:text-[#a7f3d0]/70">
                              {book.languages.join(', ').toUpperCase()}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#4c0519] dark:text-[#ecfdf5] line-clamp-1">
                            {book.title}
                          </h4>
                          <p className="text-[11px] text-[#881337]/70 dark:text-[#a7f3d0]/70 line-clamp-1">
                            {book.authors.join(', ') || 'Autor desconocido'}
                          </p>
                        </div>

                        <div className="mt-2">
                          {downloadedBook ? (
                            <button
                              onClick={() => {
                                openReader(downloadedBook);
                                onClose();
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Leer ahora</span>
                            </button>
                          ) : isDownloadingThis ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-[#0f382c] text-rose-600 dark:text-emerald-300 font-bold text-xs">
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>{downloadProgress}%</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleDownloadBook(book)}
                              disabled={downloadingId !== null}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 dark:from-emerald-500 dark:to-teal-400 text-white font-bold text-xs shadow-xs hover:shadow-md active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Descargar EPUB</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
