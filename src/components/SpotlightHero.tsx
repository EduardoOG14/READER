import React from 'react';
import { Play, BookOpen, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Book } from '../types';

export const SpotlightHero: React.FC = () => {
  const { books, openReader, selectedCategoryId } = useApp();

  // Find the most relevant book to continue reading (in progress, or recently read)
  const inProgressBook: Book | undefined = React.useMemo(() => {
    // Only show spotlight on "Todos" or "Leyendo actualmente" or main views
    if (selectedCategoryId !== 'cat-all' && selectedCategoryId !== 'cat-reading') {
      return undefined;
    }

    const readingList = books.filter(b => b.progress > 0 && b.progress < 100);
    if (readingList.length > 0) {
      // Sort by lastReadDate descending
      return [...readingList].sort((a, b) => (b.lastReadDate || 0) - (a.lastReadDate || 0))[0];
    }
    // If no in-progress book, get the most recently opened book
    const recentlyRead = books.filter(b => b.lastReadDate && b.lastReadDate > 0);
    if (recentlyRead.length > 0) {
      return [...recentlyRead].sort((a, b) => (b.lastReadDate || 0) - (a.lastReadDate || 0))[0];
    }
    return undefined;
  }, [books, selectedCategoryId]);

  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [inProgressBook?.id, inProgressBook?.coverUrl]);

  if (!inProgressBook) {
    return null;
  }

  const formatBadge = (format: string) => {
    switch (format) {
      case 'pdf': return 'PDF Document';
      case 'cbz':
      case 'cbr':
      case 'zip': return 'Manga / Cómic';
      case 'epub': return 'ePub eBook';
      default: return 'Libro de Texto';
    }
  };

  return (
    <section className="mb-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/95 via-rose-50/70 to-pink-50/50 dark:from-[#18191c]/95 dark:via-[#1e2024]/90 dark:to-[#141517]/80 border border-rose-200/80 dark:border-zinc-700/60 p-4 sm:p-5 shadow-lg shadow-rose-900/5 dark:shadow-black/40 backdrop-blur-md">
        {/* Subtle decorative background blur glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-400/10 dark:bg-zinc-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-400/10 dark:bg-zinc-700/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-6">
          {/* Cover with 3D feel */}
          <div
            onClick={() => openReader(inProgressBook)}
            className="group relative w-24 sm:w-28 aspect-[3/4.2] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 shrink-0 cursor-pointer bg-slate-200 dark:bg-zinc-800"
          >
            {inProgressBook.coverUrl && !imgError ? (
              <img
                src={inProgressBook.coverUrl}
                alt={inProgressBook.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-rose-100 dark:bg-zinc-800">
                <BookOpen className="w-8 h-8 text-rose-400 dark:text-zinc-400 mb-1" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-200 text-rose-600 dark:text-zinc-950 flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="flex-1 flex flex-col justify-between text-center sm:text-left min-w-0 w-full">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-zinc-800 text-rose-700 dark:text-zinc-300 border border-rose-200 dark:border-zinc-700">
                  <Clock className="w-3.5 h-3.5" /> Continuar Lectura
                </span>
                <span className="text-[11px] font-medium text-[#881337]/70 dark:text-zinc-400">
                  • {formatBadge(inProgressBook.format)}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-[#4c0519] dark:text-[#f3f4f6] line-clamp-1">
                {inProgressBook.title}
              </h2>
              {inProgressBook.author && (
                <p className="text-xs text-[#881337]/80 dark:text-zinc-400 line-clamp-1 mt-0.5">
                  de {inProgressBook.author}
                </p>
              )}
            </div>

            {/* Progress Bar & Actions */}
            <div className="mt-3 pt-3 border-t border-rose-200/50 dark:border-zinc-800/60">
              <div className="flex items-center justify-between text-xs font-medium text-[#881337] dark:text-zinc-300 mb-1.5">
                <span>Página {inProgressBook.currentPage} de {inProgressBook.totalPages}</span>
                <span className="font-bold text-rose-600 dark:text-zinc-200">{inProgressBook.progress}%</span>
              </div>

              <div className="w-full h-2 bg-rose-200/50 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-200 dark:to-zinc-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(4, inProgressBook.progress)}%` }}
                />
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-3">
                <button
                  onClick={() => openReader(inProgressBook)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:from-zinc-200 dark:to-zinc-300 dark:hover:from-white dark:hover:to-zinc-200 dark:text-zinc-950 text-white px-5 py-2 rounded-xl font-bold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Reanudar página {inProgressBook.currentPage}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
