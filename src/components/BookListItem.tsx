import React from 'react';
import { MoreVertical, BookOpen, Check } from 'lucide-react';
import type { Book } from '../types';

interface BookListItemProps {
  book: Book;
  onOpenDetails: (book: Book) => void;
}

export const BookListItem: React.FC<BookListItemProps> = ({ book, onOpenDetails }) => {

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'pdf':
        return 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50';
      case 'cbz':
      case 'cbr':
      case 'zip':
        return 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-900/50';
      case 'epub':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50';
      case 'txt':
      case 'md':
        return 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-900/50';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  const isCompleted = book.progress >= 100 || (book.currentPage >= book.totalPages && book.totalPages > 1);

  return (
    <div
      onClick={() => onOpenDetails(book)}
      className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/80 dark:bg-[#18191c]/90 backdrop-blur-xs border border-rose-200/80 dark:border-zinc-800 hover:border-rose-400 dark:hover:border-zinc-700 transition-all cursor-pointer group shadow-2xs hover:shadow-md"
    >
      {/* Thumbnail */}
      <div className="relative w-13 h-17 sm:w-14 sm:h-18 rounded-xl overflow-hidden bg-rose-50 dark:bg-zinc-800 shrink-0 border border-rose-200/60 dark:border-zinc-700">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-rose-300 dark:text-zinc-500" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md uppercase tracking-wider ${getFormatBadge(
              book.format
            )}`}
          >
            {book.format}
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-[#4c0519] dark:text-[#f3f4f6] truncate group-hover:text-rose-600 dark:group-hover:text-zinc-100 transition-colors">
            {book.title}
          </h4>
        </div>

        <p className="text-[11px] text-[#881337]/75 dark:text-zinc-400 truncate mt-0.5 font-medium">
          {book.author ? `${book.author} • ` : ''}
          {book.totalPages} páginas • {formatFileSize(book.fileSize)}
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1.5 bg-rose-100 dark:bg-zinc-800 rounded-full overflow-hidden max-w-48">
            <div
              className={`h-full rounded-full transition-all ${
                isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-300 dark:to-zinc-100'
              }`}
              style={{ width: `${book.progress}%` }}
            />
          </div>
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#881337]/80 dark:text-zinc-400">
            {isCompleted ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <Check className="w-3 h-3 stroke-[3]" /> Leído
              </span>
            ) : (
              `Pág ${book.currentPage} de ${book.totalPages} (${book.progress}%)`
            )}
          </span>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenDetails(book);
        }}
        className="p-2 rounded-xl text-rose-400 dark:text-zinc-400 hover:text-rose-700 dark:hover:text-zinc-200 hover:bg-rose-100/70 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        title="Opciones de libro"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
};
