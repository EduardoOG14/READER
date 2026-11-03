import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  BookOpen,
  Trash2,
  RotateCcw,
  Check,
  Save,
  Camera,
  Upload,
  Play,
  FileText,
  Edit3,
  Star,
  Layers,
  RefreshCw,
  DownloadCloud,
  Clock,
  Sparkles,
  Info,
  Download,
} from 'lucide-react';
import type { Book } from '../types';
import { useApp } from '../context/AppContext';
import { createOptimizedThumbnail } from '../utils/thumbnail';
import { useBackHandler } from '../services/backButton';
import { fetchOfficialCoverUrl } from '../services/coverFetcher';
import { EpisodeSelectorModal } from './EpisodeSelectorModal';
import {
  checkForNewEpisodes,
  downloadAndMergeNewEpisodes,
  downloadAllAvailableEpisodes,
  type MangaUpdateCheckResult,
  type UpdateDownloadProgress,
} from '../services/mangaUpdateService';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

type ModalTab = 'episodes' | 'synopsis' | 'collection';

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, isOpen, onClose }) => {
  const { categories, editBook, deleteBookById, openReader, updateBookProgress, refreshLibrary } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<ModalTab>('episodes');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [series, setSeries] = useState('');
  const [seriesOrder, setSeriesOrder] = useState<string | number>('');
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const [coverUrl, setCoverUrl] = useState<string | undefined>(undefined);
  const [imgError, setImgError] = useState(false);
  const [assignedCats, setAssignedCats] = useState<string[]>([]);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isProcessingCover, setIsProcessingCover] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [isCheckingEpisodes, setIsCheckingEpisodes] = useState(false);
  const [isDownloadingEpisodes, setIsDownloadingEpisodes] = useState(false);
  const [isEpisodeSelectorOpen, setIsEpisodeSelectorOpen] = useState(false);
  const [updateResult, setUpdateResult] = useState<MangaUpdateCheckResult | null>(null);
  const [updateProgress, setUpdateProgress] = useState<UpdateDownloadProgress | null>(null);

  // Android Back Button handler
  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 100, isOpen);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author || '');
      setDescription(book.description || '');
      setSeries(book.series || '');
      setSeriesOrder(book.seriesOrder ?? '');
      setRating(book.rating || 0);
      setReview(book.review || '');
      setCoverUrl(book.coverUrl);
      setImgError(false);
      setAssignedCats(book.categoryIds || []);
      setIsEditingDescription(false);
      setNotification(null);
      setIsCheckingEpisodes(false);
      setIsDownloadingEpisodes(false);
      setUpdateResult(null);
      setUpdateProgress(null);
      setActiveTab('episodes');
    }
  }, [book]);

  if (!isOpen || !book) return null;

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3200);
  };

  const toggleCategory = (catId: string) => {
    let next: string[];
    if (assignedCats.includes(catId)) {
      next = assignedCats.filter(id => id !== catId);
    } else {
      next = [...assignedCats, catId];
    }
    setAssignedCats(next);
    editBook(book.id, { categoryIds: next });
  };

  const handleCoverFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingCover(true);
    try {
      const optimizedThumbnail = await createOptimizedThumbnail(file, 900, 1350, 0.9);
      if (optimizedThumbnail) {
        setCoverUrl(optimizedThumbnail);
        await editBook(book.id, { coverUrl: optimizedThumbnail });
        showNotice('¡Portada actualizada y guardada!');
      }
    } catch {
      alert('No se pudo procesar la imagen seleccionada.');
    } finally {
      setIsProcessingCover(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFetchRealCover = async () => {
    if (!book) return;
    setIsProcessingCover(true);
    try {
      const isBook =
        book.format === 'epub' ||
        book.format === 'txt' ||
        (book.categoryIds && book.categoryIds.includes('cat-books'));
      const realCover = await fetchOfficialCoverUrl(book.title, book.author, isBook ? 'libros' : 'manga');
      if (realCover) {
        setCoverUrl(realCover);
        await editBook(book.id, { coverUrl: realCover });
        showNotice('¡Portada oficial encontrada y actualizada con éxito!');
      } else {
        showNotice('No se encontró una portada oficial para esta obra en los servidores.');
      }
    } catch (e: any) {
      showNotice(e.message || 'Error al buscar portada oficial.');
    } finally {
      setIsProcessingCover(false);
    }
  };

  const handleSaveDetails = async () => {
    await editBook(book.id, {
      title: title.trim(),
      author: author.trim() || undefined,
      description: description.trim() || undefined,
      categoryIds: assignedCats,
      series: series.trim() || undefined,
      seriesOrder:
        typeof seriesOrder === 'number' && !isNaN(seriesOrder)
          ? seriesOrder
          : typeof seriesOrder === 'string' && seriesOrder.trim()
          ? Number(seriesOrder)
          : undefined,
      rating: rating > 0 ? rating : undefined,
      review: review.trim() || undefined,
    });
    setIsEditingDescription(false);
    showNotice('¡Detalles guardados exitosamente!');
  };

  const handleResetProgress = async () => {
    if (window.confirm('¿Reiniciar el progreso de lectura a la página 1?')) {
      await updateBookProgress(book.id, 1);
      showNotice('Progreso reiniciado a la página 1');
    }
  };

  const handleCheckForNewEpisodes = async () => {
    if (!book) return;
    setIsCheckingEpisodes(true);
    setUpdateResult(null);
    try {
      const result = await checkForNewEpisodes(book);
      setUpdateResult(result);
      if (result.hasUpdates) {
        showNotice(`¡${result.newChapters.length} episodios nuevos encontrados!`);
      } else {
        showNotice(result.message);
      }
    } catch (err: any) {
      showNotice(err.message || 'Error al buscar nuevos episodios.');
    } finally {
      setIsCheckingEpisodes(false);
    }
  };

  const handleDownloadNewEpisodes = async () => {
    if (!book || !updateResult || updateResult.newChapters.length === 0) return;
    setIsDownloadingEpisodes(true);
    try {
      const { updatedBook, addedPages } = await downloadAndMergeNewEpisodes(
        book,
        updateResult.newChapters,
        p => setUpdateProgress(p)
      );
      await refreshLibrary();
      showNotice(`¡Manga actualizado! Se añadieron ${addedPages} páginas nuevas.`);
      setUpdateResult({
        ...updateResult,
        hasUpdates: false,
        message: `Manga al día. Se agregaron ${addedPages} páginas nuevas (Total: ${updatedBook.totalPages} páginas).`,
        newChapters: [],
      });
      setUpdateProgress(null);
    } catch (err: any) {
      showNotice(err.message || 'Error al descargar nuevos episodios.');
    } finally {
      setIsDownloadingEpisodes(false);
    }
  };

  const handleDownloadAllSeries = async () => {
    if (!book) return;
    if (!window.confirm(`¿Descargar todos los episodios disponibles de «${book.title}»?`)) return;
    setIsDownloadingEpisodes(true);
    setUpdateProgress({
      currentChapterNum: 1,
      currentChapterIndex: 1,
      totalChaptersToDownload: 1,
      currentPageIndex: 0,
      totalPagesInChapter: 0,
      percent: 5,
      message: 'Consultando disponibilidad de episodios en el repositorio oficial...',
    });
    try {
      const { updatedBook, totalPages } = await downloadAllAvailableEpisodes(book, p => setUpdateProgress(p));
      await refreshLibrary();
      showNotice(`¡«${book.title}» actualizado con éxito! (${totalPages} páginas locales).`);
      setUpdateResult({
        hasUpdates: false,
        mangaTitle: book.title,
        currentHighestChapter: 0,
        totalAvailableChapters: 0,
        newChapters: [],
        message: `Obra al día (Total: ${updatedBook.totalPages} páginas locales).`,
      });
      setUpdateProgress(null);
    } catch (err: any) {
      showNotice(err.message || 'Error al descargar la serie completa.');
    } finally {
      setIsDownloadingEpisodes(false);
    }
  };

  const isManga =
    book.format === 'cbz' ||
    book.format === 'cbr' ||
    book.format === 'zip' ||
    (book.categoryIds && book.categoryIds.includes('cat-manga'));

  const handleDelete = async () => {
    if (window.confirm(`¿Eliminar "${book.title}"? Se borrará la copia local del libro en la aplicación.`)) {
      await deleteBookById(book.id);
      onClose();
    }
  };

  const handleStartReading = () => {
    onClose();
    openReader(book);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'pdf':
        return 'bg-rose-500 text-white';
      case 'cbz':
      case 'cbr':
      case 'zip':
        return 'bg-purple-600 text-white';
      case 'epub':
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-sky-600 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#18191c] border-t sm:border border-rose-200 dark:border-zinc-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[92vh] flex flex-col text-[#4c0519] dark:text-[#f3f4f6]"
        onClick={e => e.stopPropagation()}
      >
        {/* Hidden File Input for changing cover */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverFileChange}
        />

        {/* Temporary Notification Banner */}
        {notification && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center animate-in fade-in duration-200 shrink-0 shadow-md">
            {notification}
          </div>
        )}

        {/* Modal Top Bar */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-rose-100 dark:border-zinc-800 flex items-center justify-between shrink-0 bg-[#fff5f8]/80 dark:bg-zinc-900/80">
          {/* Mobile drag handle */}
          <div className="sm:hidden w-12 h-1 bg-rose-200 dark:bg-zinc-700 rounded-full mx-auto absolute top-2 left-1/2 -translate-x-1/2" />
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`text-[9.5px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-2xs ${getFormatBadge(
                book.format
              )}`}
            >
              {book.format.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-rose-900/80 dark:text-zinc-200 truncate">
              Detalles de la Obra
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-1 rounded-full text-rose-400 dark:text-zinc-400 hover:bg-rose-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Hero Card: Cover + Titles + Primary READ NOW Button */}
        <div className="p-4 sm:p-5 border-b border-rose-100/80 dark:border-zinc-800/80 bg-gradient-to-b from-[#fff5f8]/40 to-white dark:from-zinc-900/40 dark:to-[#18191c] shrink-0">
          <div className="flex gap-4 items-center">
            {/* Book Cover with 1-tap change & online search */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative group w-24 sm:w-28 aspect-[3/4.2] rounded-2xl overflow-hidden bg-rose-100 dark:bg-zinc-800 shadow-md border border-rose-200/80 dark:border-zinc-700">
                {coverUrl && !imgError ? (
                  <img
                    src={coverUrl}
                    alt={book.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-rose-300 dark:text-zinc-500">
                    <BookOpen className="w-8 h-8 mb-1" />
                    <span className="text-[9px] font-semibold opacity-70">Sin Portada</span>
                  </div>
                )}

                {/* Cover overlay button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessingCover}
                  className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white p-2 text-center cursor-pointer"
                  title="Cambiar la imagen de portada"
                >
                  <Camera className="w-5 h-5 stroke-[2.2]" />
                  <span className="text-[9px] font-bold">Cambiar</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessingCover}
                  className="sm:hidden absolute bottom-1.5 right-1.5 p-1.5 rounded-full bg-black/60 text-white shadow-xs"
                  title="Cambiar portada"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleFetchRealCover}
                disabled={isProcessingCover}
                className="mt-1.5 w-24 text-[10px] text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center gap-1 hover:underline cursor-pointer text-center"
                title="Buscar portada oficial online en alta resolución"
              >
                <Sparkles className="w-3 h-3 shrink-0" />
                <span className="truncate">{isProcessingCover ? 'Buscando...' : 'Portada Oficial'}</span>
              </button>
            </div>

            {/* Title, Author & Meta */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#4c0519] dark:text-[#f3f4f6] line-clamp-2 leading-tight">
                  {book.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-zinc-300 font-medium truncate mt-0.5">
                  {book.author || 'Autor desconocido'}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-700 dark:text-zinc-300 font-semibold mt-1.5">
                  <span className="font-bold text-[#4c0519] dark:text-zinc-100">{book.totalPages} págs</span>
                  <span>•</span>
                  <span>{formatFileSize(book.fileSize)}</span>
                  <span>•</span>
                  <span>{formatDate(book.dateAdded)}</span>
                </div>
              </div>

              {/* PRIMARY ACTION: Continuar o Comenzar Lectura */}
              <button
                type="button"
                onClick={handleStartReading}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 dark:text-zinc-950 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md shadow-rose-500/25 active:scale-98 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current stroke-[1.5]" />
                <span>
                  {book.progress > 0 && book.progress < 100
                    ? `Continuar (Pág ${book.currentPage} de ${book.totalPages} • ${book.progress}%)`
                    : 'Comenzar Lectura'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Segmented Bar (Thumb-friendly & High-contrast) */}
        <div className="px-4 py-2 border-b border-rose-100 dark:border-zinc-800 bg-[#fff5f8]/50 dark:bg-zinc-900/50 flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('episodes')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
              activeTab === 'episodes'
                ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                : 'text-slate-700 dark:text-zinc-200 hover:bg-rose-100/80 dark:hover:bg-zinc-800'
            }`}
          >
            {isManga ? 'Episodios & Lectura' : 'Lectura & Progreso'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('synopsis')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
              activeTab === 'synopsis'
                ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                : 'text-slate-700 dark:text-zinc-200 hover:bg-rose-100/80 dark:hover:bg-zinc-800'
            }`}
          >
            Sinopsis & Ficha
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('collection')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
              activeTab === 'collection'
                ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                : 'text-slate-700 dark:text-zinc-200 hover:bg-rose-100/80 dark:hover:bg-zinc-800'
            }`}
          >
            Reseña & Colección
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: EPISODIOS & LECTURA */}
          {activeTab === 'episodes' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Manga / Comic Multi-Episode & Update Actions */}
              {isManga ? (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/80 to-indigo-50/50 dark:from-zinc-900/90 dark:to-zinc-950/70 border border-purple-200/80 dark:border-purple-900/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                        <RefreshCw className={`w-4 h-4 ${isCheckingEpisodes ? 'animate-spin' : ''}`} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                          Episodios y Capítulos Online
                        </h4>
                        <p className="text-[10.5px] text-slate-700 dark:text-zinc-300 font-medium">
                          Sincroniza y descarga automáticamente desde la fuente original
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3 Action Buttons: Elegir Episodios, Buscar Nuevos & Descargar TODO */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEpisodeSelectorOpen(true)}
                      disabled={isCheckingEpisodes || isDownloadingEpisodes}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                      title="Elegir y descargar episodios específicos"
                    >
                      <Download className="w-4 h-4" />
                      <span>Elegir episodios</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCheckForNewEpisodes}
                      disabled={isCheckingEpisodes || isDownloadingEpisodes}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                      title="Comprobar si hay nuevos episodios disponibles"
                    >
                      <RefreshCw className={`w-4 h-4 ${isCheckingEpisodes ? 'animate-spin' : ''}`} />
                      <span>{isCheckingEpisodes ? 'Buscando...' : 'Buscar nuevos'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadAllSeries}
                      disabled={isCheckingEpisodes || isDownloadingEpisodes}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                      title="Descargar todos los episodios disponibles de la serie completa"
                    >
                      <DownloadCloud className="w-4 h-4" />
                      <span>Descargar TODO</span>
                    </button>
                  </div>

                  {/* Status Banner when checking or download progress */}
                  {updateResult && (
                    <div className="p-3 rounded-xl bg-white/95 dark:bg-zinc-800/95 border border-purple-100 dark:border-zinc-700 space-y-2 animate-in fade-in duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold text-purple-950 dark:text-purple-200">
                            {updateResult.hasUpdates
                              ? `¡Se encontraron ${updateResult.newChapters.length} episodios nuevos!`
                              : 'Obra al día'}
                          </p>
                          <p className="text-[11px] text-purple-800/80 dark:text-zinc-300 mt-0.5">
                            {updateResult.message}
                          </p>
                        </div>
                        {updateResult.hasUpdates && !isDownloadingEpisodes && (
                          <button
                            type="button"
                            onClick={handleDownloadNewEpisodes}
                            className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                          >
                            <DownloadCloud className="w-3.5 h-3.5" />
                            <span>Descargar ({updateResult.newChapters.length} cap.)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Real-time Progress Bar */}
                  {isDownloadingEpisodes && updateProgress && (
                    <div className="p-3 rounded-xl bg-white/95 dark:bg-zinc-800/95 border border-purple-200 dark:border-zinc-700 space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between text-[11px] font-bold text-purple-950 dark:text-zinc-200">
                        <span className="truncate">{updateProgress.message}</span>
                        <span>{updateProgress.percent}%</span>
                      </div>
                      <div className="w-full bg-purple-100 dark:bg-zinc-700 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 h-full transition-all duration-300 rounded-full"
                          style={{ width: `${updateProgress.percent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 dark:from-zinc-900/90 dark:to-zinc-950/70 border border-emerald-200/80 dark:border-emerald-900/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <DownloadCloud className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                          Edición Completa & Portada Oficial
                        </h4>
                        <p className="text-[10.5px] text-slate-700 dark:text-zinc-300 font-medium">
                          Descarga el texto completo íntegro (100+ capítulos) y la portada oficial
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadAllSeries}
                    disabled={isDownloadingEpisodes}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <DownloadCloud className="w-4 h-4" />
                    <span>{isDownloadingEpisodes ? 'Descargando...' : 'Descargar Obra Completa y Portada Oficial'}</span>
                  </button>

                  {/* Real-time Progress Bar for Books */}
                  {isDownloadingEpisodes && updateProgress && (
                    <div className="p-3 rounded-xl bg-white/95 dark:bg-zinc-800/95 border border-emerald-200 dark:border-zinc-700 space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950 dark:text-zinc-200">
                        <span className="truncate">{updateProgress.message}</span>
                        <span>{updateProgress.percent}%</span>
                      </div>
                      <div className="w-full bg-emerald-100 dark:bg-zinc-700 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 h-full transition-all duration-300 rounded-full"
                          style={{ width: `${updateProgress.percent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Reading Progress Card */}
              <div className="p-4 bg-rose-50/50 dark:bg-zinc-900/60 rounded-2xl border border-rose-200/70 dark:border-zinc-800 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-rose-500 dark:text-zinc-400" />
                    Progreso de lectura personal
                  </span>
                  <span className="text-rose-600 dark:text-zinc-200 font-extrabold text-sm">
                    {book.progress}%
                  </span>
                </div>

                <div className="w-full h-3 bg-rose-200/50 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-200 dark:to-zinc-400 rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(3, book.progress)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-700 dark:text-zinc-300 font-semibold pt-0.5">
                  <span>Página {book.currentPage} de {book.totalPages}</span>
                  <button
                    type="button"
                    onClick={handleResetProgress}
                    className="font-bold text-slate-700 hover:text-rose-600 dark:text-zinc-200 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reiniciar a pág. 1
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SINOPSIS & FICHA TÉCNICA */}
          {activeTab === 'synopsis' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Sinopsis Card */}
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-zinc-900/60 border border-rose-200/70 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-rose-500 dark:text-zinc-400" />
                    <h4 className="text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6] uppercase tracking-wider">
                      Sinopsis / Resumen
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingDescription(!isEditingDescription)}
                    className="text-xs font-bold text-rose-600 dark:text-zinc-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingDescription ? 'Listo' : 'Editar sinopsis'}</span>
                  </button>
                </div>

                {isEditingDescription ? (
                  <textarea
                    rows={5}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Escribe o pega una breve sinopsis o resumen de esta obra..."
                    className="w-full text-xs p-3 rounded-xl bg-white dark:bg-zinc-900 border border-rose-200 dark:border-zinc-700 text-[#4c0519] dark:text-[#f3f4f6] outline-none leading-relaxed"
                  />
                ) : description ? (
                  <p className="text-xs text-[#881337]/90 dark:text-zinc-300 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto pr-1">
                    {description}
                  </p>
                ) : (
                  <p className="text-xs text-slate-600 dark:text-zinc-300 italic py-2">
                    Esta obra no tiene sinopsis registrada aún. Toca en «Editar sinopsis» para añadir un resumen.
                  </p>
                )}
              </div>

              {/* Technical Specifications */}
              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6] uppercase tracking-wider">
                  <Info className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  <span>Ficha Técnica y Archivo</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-slate-200/60 dark:border-zinc-700/60">
                    <span className="text-[10px] text-slate-600 dark:text-zinc-300 block font-bold uppercase">Formato</span>
                    <span className="font-mono font-bold uppercase text-[#4c0519] dark:text-zinc-200">{book.format}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-slate-200/60 dark:border-zinc-700/60">
                    <span className="text-[10px] text-slate-600 dark:text-zinc-300 block font-bold uppercase">Páginas Totales</span>
                    <span className="font-mono font-bold text-[#4c0519] dark:text-zinc-200">{book.totalPages}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-slate-200/60 dark:border-zinc-700/60">
                    <span className="text-[10px] text-slate-600 dark:text-zinc-300 block font-bold uppercase">Tamaño Local</span>
                    <span className="font-mono font-bold text-[#4c0519] dark:text-zinc-200">{formatFileSize(book.fileSize)}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800/80 border border-slate-200/60 dark:border-zinc-700/60">
                    <span className="text-[10px] text-slate-600 dark:text-zinc-300 block font-bold uppercase">Fecha de Agregado</span>
                    <span className="font-bold text-[#4c0519] dark:text-zinc-200">{formatDate(book.dateAdded)}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white dark:bg-zinc-800 hover:bg-rose-50 dark:hover:bg-zinc-700 border border-rose-200/80 dark:border-zinc-700 text-xs font-bold text-rose-700 dark:text-zinc-200 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir nueva imagen de portada desde el dispositivo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESEÑA & COLECCIÓN */}
          {activeTab === 'collection' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Star Rating & Review */}
              <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-zinc-900/60 border border-amber-500/25 dark:border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Tu Calificación & Reseña
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className="cursor-pointer hover:scale-125 transition-transform p-1"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            s <= rating
                              ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                              : 'text-slate-300 dark:text-zinc-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  rows={3}
                  placeholder="Escribe tus reflexiones, opinión o notas personales sobre esta obra..."
                  value={review}
                  onChange={e => setReview(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-white dark:bg-zinc-900 border border-amber-500/30 dark:border-zinc-700 text-[#4c0519] dark:text-[#f3f4f6] outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Series / Saga Grouping */}
              <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  <h4 className="text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6] uppercase tracking-wider">
                    Saga o Colección
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider block mb-1">
                      Nombre de la Saga / Serie
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: One Piece, Harry Potter, Batman..."
                      value={series}
                      onChange={e => setSeries(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-[#4c0519] dark:text-[#f3f4f6] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider block mb-1">
                      Tomo / Vol. Nº
                    </label>
                    <input
                      type="number"
                      placeholder="Ej: 1"
                      value={seriesOrder}
                      onChange={e => setSeriesOrder(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-[#4c0519] dark:text-[#f3f4f6] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Categories Selector */}
              <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-zinc-900/50 border border-rose-200/60 dark:border-zinc-800 space-y-2.5">
                <label className="block text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6] uppercase tracking-wider">
                  Categorías Asignadas:
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories
                    .filter(c => c.id !== 'cat-all')
                    .map(cat => {
                      const isAssigned = assignedCats.includes(cat.id);
                      return (
                        <button
                          type="button"
                          key={cat.id}
                          onClick={() => toggleCategory(cat.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isAssigned
                              ? 'bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-950 text-white shadow-xs'
                              : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-rose-200/80 dark:border-zinc-700'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: isAssigned ? '#ffffff' : cat.color }}
                          />
                          <span>{cat.name}</span>
                          {isAssigned && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Ergonomic Footer */}
        <div className="p-3.5 sm:p-4 border-t border-rose-100 dark:border-zinc-800 flex items-center justify-between shrink-0 gap-2 bg-[#fff5f8]/80 dark:bg-zinc-900/80 pb-[max(env(safe-area-inset-bottom,14px),14px)]">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-100/70 dark:hover:bg-rose-950/40 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            title="Eliminar obra del almacenamiento"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Eliminar</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-rose-100/70 hover:bg-rose-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#881337] dark:text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={handleSaveDetails}
              className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 dark:bg-zinc-200 dark:hover:bg-white text-white dark:text-zinc-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Save className="w-4 h-4 stroke-[2.2]" />
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Episode Selector Submodal */}
      {isEpisodeSelectorOpen && (
        <EpisodeSelectorModal
          item={{
            id: book.id,
            title: book.title,
            author: book.author || '',
            genre: 'Manga / Cómic',
            badgeText: 'MANGA',
            format: (book.format as any) || 'cbz',
            category: (book.categoryIds?.includes('cat-comics') ? 'comics' : book.categoryIds?.includes('cat-manhwa') ? 'manhwa' : 'manga') as any,
            totalPages: book.totalPages,
            description: book.description || '',
            coverGradient: { from: '#f43f5e', to: '#be123c', accent: '#f43f5e' },
            coverUrl: coverUrl || book.coverUrl,
          }}
          isOpen={isEpisodeSelectorOpen}
          onClose={() => setIsEpisodeSelectorOpen(false)}
          onEnqueued={(t, count) => showNotice(`«${t}» (${count} eps) añadido al Centro de Descargas.`)}
        />
      )}
    </div>
  );
};
