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
} from 'lucide-react';
import type { Book } from '../types';
import { useApp } from '../context/AppContext';
import { createOptimizedThumbnail } from '../utils/thumbnail';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, isOpen, onClose }) => {
  const { categories, editBook, deleteBookById, openReader, updateBookProgress } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState<string | undefined>(undefined);
  const [assignedCats, setAssignedCats] = useState<string[]>([]);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isProcessingCover, setIsProcessingCover] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author || '');
      setDescription(book.description || '');
      setCoverUrl(book.coverUrl);
      setAssignedCats(book.categoryIds || []);
      setIsEditingDescription(false);
      setNotification(null);
    }
  }, [book]);

  if (!isOpen || !book) return null;

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
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

  // Manual Cover Change Handler
  const handleCoverFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingCover(true);
    try {
      // Optimize & convert user image into a permanent, lightweight thumbnail (~30KB)
      const optimizedThumbnail = await createOptimizedThumbnail(file, 320, 460, 0.8);
      if (optimizedThumbnail) {
        setCoverUrl(optimizedThumbnail);
        await editBook(book.id, { coverUrl: optimizedThumbnail });
        showNotice('¡Portada actualizada y guardada localmente!');
      }
    } catch (err) {
      alert('No se pudo procesar la imagen seleccionada.');
    } finally {
      setIsProcessingCover(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSaveDetails = async () => {
    await editBook(book.id, {
      title: title.trim(),
      author: author.trim() || undefined,
      description: description.trim() || undefined,
      categoryIds: assignedCats,
    });
    setIsEditingDescription(false);
    showNotice('¡Cambios guardados con éxito!');
  };

  const handleResetProgress = async () => {
    if (window.confirm('¿Reiniciar el progreso de lectura a la página 1?')) {
      await updateBookProgress(book.id, 1);
      showNotice('Progreso reiniciado a la página 1');
    }
  };

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
      case 'pdf': return 'bg-rose-500 text-white';
      case 'cbz':
      case 'cbr':
      case 'zip': return 'bg-purple-600 text-white';
      case 'epub': return 'bg-emerald-600 text-white';
      default: return 'bg-sky-600 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#0a2920] border border-rose-200 dark:border-emerald-700/80 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col text-[#4c0519] dark:text-[#ecfdf5]"
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

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 dark:border-emerald-800/60 flex items-center justify-between shrink-0 bg-[#fff5f8]/70 dark:bg-[#07241c]/70">
          <div className="flex items-center gap-2">
            <span
              className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${getFormatBadge(
                book.format
              )}`}
            >
              {book.format.toUpperCase()}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#4c0519] dark:text-[#ecfdf5] truncate max-w-[280px] sm:max-w-md">
              {book.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-rose-400 dark:text-emerald-400 hover:bg-rose-100 dark:hover:bg-[#0f382c] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Temporary Notification Banner */}
        {notification && (
          <div className="bg-emerald-500 text-white text-xs font-bold py-1.5 px-4 text-center animate-in fade-in duration-200 shrink-0">
            {notification}
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Top Section: Cover with Change Cover Button + Info */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start">
            {/* Book Cover with Hover / Tap to change */}
            <div className="relative group w-32 aspect-[3/4.2] rounded-2xl overflow-hidden bg-rose-100 dark:bg-[#07241c] shrink-0 shadow-md border border-rose-200/80 dark:border-emerald-800/80">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-rose-300 dark:text-emerald-500">
                  <BookOpen className="w-10 h-10 mb-1" />
                  <span className="text-[10px] font-semibold opacity-70">Sin Portada</span>
                </div>
              )}

              {/* Change Cover Overlay / Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessingCover}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white p-2 text-center cursor-pointer"
                title="Cambiar la imagen de portada"
              >
                <Camera className="w-6 h-6 stroke-[2]" />
                <span className="text-[10px] font-bold">Cambiar Portada</span>
              </button>

              {/* Mobile button visible on phone */}
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

            {/* Editable Title, Author & Metadata */}
            <div className="flex-1 w-full space-y-2.5">
              <div>
                <label className="text-[10px] font-bold text-rose-900/60 dark:text-emerald-300/70 uppercase tracking-wider block mb-1">
                  Título de la Obra
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full text-sm font-bold bg-rose-50/50 dark:bg-[#07241c] border border-rose-200 dark:border-emerald-800 rounded-xl px-3 py-1.5 text-[#4c0519] dark:text-[#ecfdf5] outline-none focus:ring-1 focus:ring-rose-400 dark:focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-rose-900/60 dark:text-emerald-300/70 uppercase tracking-wider block mb-1">
                  Autor / Creador
                </label>
                <input
                  type="text"
                  placeholder="Autor desconocido"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className="w-full text-xs bg-rose-50/50 dark:bg-[#07241c] border border-rose-200 dark:border-emerald-800 rounded-xl px-3 py-1.5 text-[#881337] dark:text-[#a7f3d0] outline-none focus:ring-1 focus:ring-rose-400 dark:focus:ring-emerald-400"
                />
              </div>

              {/* Quick specs */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#881337]/75 dark:text-[#a7f3d0]/75 pt-1">
                <span>Páginas: <strong className="text-[#4c0519] dark:text-[#ecfdf5]">{book.totalPages}</strong></span>
                <span>•</span>
                <span>Tamaño: <strong className="text-[#4c0519] dark:text-[#ecfdf5]">{formatFileSize(book.fileSize)}</strong></span>
                <span>•</span>
                <span>Añadido: <strong className="text-[#4c0519] dark:text-[#ecfdf5]">{formatDate(book.dateAdded)}</strong></span>
              </div>

              {/* Button to manually change cover on desktop */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-[#07241c] hover:bg-rose-100 dark:hover:bg-[#0f382c] border border-rose-200/80 dark:border-emerald-800 text-[11px] font-bold text-rose-700 dark:text-emerald-300 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir nueva imagen de portada</span>
                </button>
              </div>
            </div>
          </div>

          {/* SINOPSIS / RESUMEN DE LA OBRA */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50/60 to-pink-50/30 dark:from-[#07241c]/80 dark:to-[#041712]/60 border border-rose-200/80 dark:border-emerald-800/70">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-rose-500 dark:text-emerald-400" />
                <h4 className="text-xs font-bold text-[#4c0519] dark:text-[#ecfdf5] uppercase tracking-wider">
                  Sinopsis / Resumen
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingDescription(!isEditingDescription)}
                className="text-[11px] font-semibold text-rose-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditingDescription ? 'Listo' : 'Editar sinopsis'}</span>
              </button>
            </div>

            {isEditingDescription ? (
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Escribe o pega una breve sinopsis o resumen de esta obra..."
                className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-[#0a2920] border border-rose-200 dark:border-emerald-700 text-[#4c0519] dark:text-[#ecfdf5] outline-none"
              />
            ) : description ? (
              <p className="text-xs text-[#881337]/90 dark:text-[#a7f3d0]/90 leading-relaxed max-h-36 overflow-y-auto whitespace-pre-line pr-1">
                {description}
              </p>
            ) : (
              <p className="text-xs text-[#881337]/60 dark:text-[#a7f3d0]/60 italic">
                Esta obra no tiene sinopsis registrada aún. Toca en «Editar sinopsis» para añadir un resumen.
              </p>
            )}
          </div>

          {/* Reading progress bar */}
          <div className="p-3.5 bg-rose-50/40 dark:bg-[#07241c]/50 rounded-2xl border border-rose-200/60 dark:border-emerald-800/60">
            <div className="flex justify-between items-center text-xs font-bold text-[#4c0519] dark:text-[#ecfdf5] mb-2">
              <span>Progreso de lectura</span>
              <span className="text-rose-600 dark:text-emerald-400 font-extrabold">
                {book.progress}% (Página {book.currentPage} de {book.totalPages})
              </span>
            </div>
            <div className="w-full h-2 bg-rose-200/50 dark:bg-[#041712] rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 dark:from-emerald-400 dark:to-teal-300 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(3, book.progress)}%` }}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleResetProgress}
                className="text-[11px] font-semibold text-[#881337]/70 hover:text-rose-600 dark:text-[#a7f3d0]/70 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reiniciar progreso a página 1
              </button>
            </div>
          </div>

          {/* Categories Selector */}
          <div>
            <label className="block text-xs font-bold text-[#4c0519] dark:text-[#ecfdf5] mb-2">
              Categorías de la obra:
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
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isAssigned
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 dark:from-emerald-500 dark:to-teal-400 text-white shadow-xs'
                          : 'bg-rose-50 dark:bg-[#07241c] text-[#881337] dark:text-[#a7f3d0] border border-rose-200/60 dark:border-emerald-800'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: isAssigned ? '#ffffff' : cat.color }}
                      />
                      <span>{cat.name}</span>
                      {isAssigned && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 border-t border-rose-100 dark:border-emerald-800/60 flex items-center justify-between shrink-0 gap-2 bg-[#fff5f8]/70 dark:bg-[#07241c]/70">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:bg-rose-100/70 dark:hover:bg-rose-950/40 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Eliminar obra</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDetails}
              className="flex items-center gap-1 bg-white dark:bg-[#0a2920] hover:bg-rose-50 dark:hover:bg-[#0f382c] border border-rose-200 dark:border-emerald-800 text-[#881337] dark:text-[#a7f3d0] px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar</span>
            </button>

            {/* Primary Action Button: Read Now / Continue Reading */}
            <button
              type="button"
              onClick={handleStartReading}
              className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 dark:from-emerald-500 dark:via-teal-400 dark:to-emerald-400 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-md shadow-rose-500/20 dark:shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>
                {book.progress > 0 && book.progress < 100
                  ? `Continuar (Pág ${book.currentPage})`
                  : 'Comenzar lectura'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
