import React, { useState } from 'react';
import { Trophy, Star, CheckCircle2, X } from 'lucide-react';
import { useBackHandler } from '../services/backButton';
import type { Book } from '../types';

interface BookCompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
  onSaveRatingAndReview: (rating: number, review: string) => Promise<void>;
}

export const BookCompletedModal: React.FC<BookCompletedModalProps> = ({
  isOpen,
  onClose,
  book,
  onSaveRatingAndReview,
}) => {
  const [rating, setRating] = useState<number>(book.rating || 5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState<string>(book.review || '');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 220, isOpen);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveRatingAndReview(rating, review);
      onClose();
    } catch (e) {
      console.error('Error saving review:', e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#18191c] border border-rose-200 dark:border-zinc-700 rounded-3xl shadow-2xl p-5 sm:p-6 z-10 animate-in zoom-in-95 duration-200 text-[#4c0519] dark:text-[#f3f4f6] flex flex-col gap-4">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/25 animate-bounce duration-1000">
            <Trophy className="w-7 h-7 stroke-[2.2]" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            ¡Obra Finalizada!
          </span>
          <h3 className="text-lg font-black leading-tight">
            {book.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Completaste el 100% de la lectura. ¿Qué te pareció esta obra?
          </p>
        </div>

        {/* 1-5 Star Rating */}
        <div className="flex flex-col items-center justify-center gap-1.5 py-1">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(star => {
              const active = (hoverRating || rating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 hover:scale-115 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      active
                        ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                        : 'text-slate-300 dark:text-zinc-700'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            {rating === 5 ? '¡Excelente obra maestra!' : rating === 4 ? 'Muy buena' : rating === 3 ? 'Aceptable' : rating === 2 ? 'Pudo ser mejor' : 'No me gustó'}
          </span>
        </div>

        {/* Personal Review Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
            Tu reseña o notas personales (opcional):
          </label>
          <textarea
            value={review}
            onChange={e => setReview(e.target.value)}
            placeholder="Escribe tus impresiones, frases favoritas o reflexiones finales sobre este libro..."
            rows={3}
            className="w-full p-3 text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-2xl outline-none text-slate-800 dark:text-zinc-200 focus:ring-2 focus:ring-rose-400/30 resize-none leading-relaxed"
          />
        </div>

        {/* Action button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:from-zinc-200 dark:to-zinc-300 dark:hover:from-white dark:hover:to-zinc-200 text-white dark:text-zinc-950 font-bold text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isSaving ? 'Guardando reseña...' : 'Guardar Calificación y Reseña'}</span>
        </button>
      </div>
    </div>
  );
};
