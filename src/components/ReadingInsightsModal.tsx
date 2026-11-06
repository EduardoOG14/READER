import React, { useState, useEffect } from 'react';
import { Flame, Clock, BookOpen, Target, CheckCircle2, X } from 'lucide-react';
import { useBackHandler } from '../services/backButton';
import { getReadingStats, setDailyGoal } from '../services/readingStats';
import type { ReadingStats } from '../types';

interface ReadingInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booksCount: number;
}

export const ReadingInsightsModal: React.FC<ReadingInsightsModalProps> = ({
  isOpen,
  onClose,
  booksCount,
}) => {
  const [stats, setStats] = useState<ReadingStats | null>(null);
  const [goal, setGoal] = useState<number>(20);
  const [isSavedGoal, setIsSavedGoal] = useState(false);

  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 110, isOpen);

  useEffect(() => {
    if (isOpen) {
      getReadingStats().then(s => {
        setStats(s);
        setGoal(s.dailyGoalMinutes || 20);
      });
    }
  }, [isOpen]);

  const handleGoalChange = async (newGoal: number) => {
    setGoal(newGoal);
    const updated = await setDailyGoal(newGoal);
    setStats(updated);
    setIsSavedGoal(true);
    setTimeout(() => setIsSavedGoal(false), 1800);
  };

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().slice(0, 10);
  const todaySession = stats?.sessions[todayStr] || { minutes: 0, pagesRead: 0 };
  const goalProgress = Math.min(100, Math.round(((todaySession.minutes || 0) / (goal || 20)) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#18191c] border border-rose-200 dark:border-zinc-700/80 rounded-3xl shadow-2xl p-4 sm:p-6 z-10 animate-in zoom-in-95 duration-200 text-[#4c0519] dark:text-[#f3f4f6] flex flex-col gap-4 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
              <Flame className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                Hábitos y Estadísticas de Lectura
              </h3>
              <p className="text-[11px] text-[#881337]/70 dark:text-zinc-400">
                Tu progreso y constancia como lector
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Racha */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/25 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">Racha Actual</span>
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-amber-600 dark:text-amber-300">
                {stats?.currentStreak || 0}
              </span>
              <span className="text-xs font-semibold ml-1.5 text-slate-500 dark:text-zinc-400">días seguidos</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1">Mejor racha: {stats?.bestStreak || 0} días</p>
          </div>

          {/* Card 2: Tiempo Hoy */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/25 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400">Leído Hoy</span>
              <Clock className="w-4 h-4 text-rose-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-rose-600 dark:text-rose-300">
                {todaySession.minutes || 0}
              </span>
              <span className="text-xs font-semibold ml-1.5 text-slate-500 dark:text-zinc-400">minutos</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1">Meta diaria: {goal} min</p>
          </div>

          {/* Card 3: Páginas leídas */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/25 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">Páginas Totales</span>
              <BookOpen className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-300">
                {stats?.totalPagesRead || 0}
              </span>
              <span className="text-xs font-semibold ml-1.5 text-slate-500 dark:text-zinc-400">páginas</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1">En tus libros y mangas</p>
          </div>

          {/* Card 4: Obras en Biblioteca */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/25 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400">Biblioteca</span>
              <Target className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-300">
                {booksCount}
              </span>
              <span className="text-xs font-semibold ml-1.5 text-slate-500 dark:text-zinc-400">obras</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-1">Disponibles sin conexión</p>
          </div>
        </div>

        {/* Daily Goal Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold">
              <Target className="w-4 h-4 text-rose-500" />
              <span>Progreso de la meta diaria</span>
            </div>
            <span className="font-mono font-bold text-rose-600 dark:text-zinc-300">
              {todaySession.minutes} / {goal} min ({goalProgress}%)
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500"
              style={{ width: `${goalProgress}%` }}
            />
          </div>

          {/* Slider to adjust daily goal */}
          <div className="pt-2 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-zinc-400">
            <span>Ajustar meta:</span>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={goal}
              onChange={e => handleGoalChange(parseInt(e.target.value, 10))}
              className="flex-1 accent-rose-500"
            />
            <span className="font-bold text-slate-700 dark:text-zinc-200">{goal} min</span>
            {isSavedGoal && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
