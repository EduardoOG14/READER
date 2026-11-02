import React, { useState } from 'react';
import { MoreVertical, BookOpen, Check } from 'lucide-react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  onOpenDetails: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onOpenDetails }) => {
  const [imgError, setImgError] = useState(false);

  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'pdf':
        return { bg: 'bg-rose-500/95 text-white', label: 'PDF' };
      case 'cbz':
      case 'cbr':
      case 'zip':
        return { bg: 'bg-purple-600/95 text-white', label: 'MANGA' };
      case 'epub':
        return { bg: 'bg-emerald-600/95 text-white', label: 'EPUB' };
      case 'txt':
      case 'md':
        return { bg: 'bg-sky-600/95 text-white', label: 'TEXT' };
      default:
        return { bg: 'bg-slate-700/95 text-white', label: format.toUpperCase() };
    }
  };

  const badge = getFormatBadge(book.format);
  const isCompleted = book.progress >= 100 || (book.currentPage >= book.totalPages && book.totalPages > 1);

  return (
    <div className="group relative flex flex-col cursor-pointer select-none">
      {/* Cover Card */}
      <div
        onClick={() => onOpenDetails(book)}
        className="relative aspect-[3/4.2] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-rose-100/50 dark:bg-zinc-900 shadow-xs group-hover:shadow-xl group-hover:shadow-rose-900/10 dark:group-hover:shadow-black/60 group-hover:-translate-y-1.5 transition-all duration-300 border border-rose-200/70 dark:border-zinc-700/60"
      >
        {book.coverUrl && !imgError ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-rose-50 to-pink-100 dark:from-zinc-800 dark:to-zinc-900">
            <BookOpen className="w-8 h-8 text-rose-300 dark:text-zinc-500 mb-2" />
            <span className="text-xs font-semibold text-[#881337] dark:text-zinc-300 line-clamp-3">
              {book.title}
            </span>
          </div>
        )}

        {/* Subtle overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Format Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span
            className={`text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs tracking-wider uppercase ${badge.bg}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Quick Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(book);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/45 hover:bg-black/70 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
          title="Opciones de libro"
        >
          <MoreVertical className="w-3.5 h-3.5" />
        </button>

        {/* Progress Bar (if in progress) */}
        {book.progress > 0 && !isCompleted && (
          <div className="absolute bottom-0 inset-x-0 bg-black/65 backdrop-blur-xs p-1.5 z-10">
            <div className="flex items-center justify-between text-[10px] text-white font-medium mb-0.5 px-0.5">
              <span>Pág {book.currentPage}/{book.totalPages}</span>
              <span className="font-bold">{book.progress}%</span>
            </div>
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-400 dark:from-zinc-300 dark:to-zinc-100 rounded-full transition-all duration-300"
                style={{ width: `${book.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Completed Badge */}
        {isCompleted && (
          <div className="absolute bottom-2 right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm z-10">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>Leído</span>
          </div>
        )}
      </div>

      {/* Book Metadata Below Cover */}
      <div className="pt-2 px-0.5" onClick={() => onOpenDetails(book)}>
        <h3 className="text-xs sm:text-sm font-bold text-[#4c0519] dark:text-[#f3f4f6] line-clamp-1 group-hover:text-rose-600 dark:group-hover:text-zinc-100 transition-colors">
          {book.title}
        </h3>
        <p className="text-[11px] text-[#881337]/80 dark:text-zinc-300 line-clamp-1 mt-0.5 font-medium">
          {book.author || `${book.totalPages} ${book.totalPages === 1 ? 'pág' : 'págs'}`}
        </p>
      </div>
    </div>
  );
};
