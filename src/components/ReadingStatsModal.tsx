import React, { useState, useEffect } from 'react';
import {
  X,
  Flame,
  Clock,
  BookOpen,
  Trophy,
  CheckCircle2,
  TrendingUp,
  Target,
} from 'lucide-react';
import { useSwipeDownToClose } from '../hooks/useSwipeDownToClose';
import { useBackHandler } from '../services/backButton';
import { getReadingStats, saveReadingStats } from '../services/readingStats';
import type { ReadingStats } from '../types';
import { useApp } from '../context/AppContext';

interface ReadingStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReadingStatsModal: React.FC<ReadingStatsModalProps> = ({ isOpen, onClose }) => {
  const { books } = useApp();
  const [stats, setStats] = useState<ReadingStats | null>(null);
  const [editingGoal, setEditingGoal] = useState<boolean>(false);
  const { dragHandleProps, modalStyle } = useSwipeDownToClose({ onClose });

  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 115, isOpen);

  useEffect(() => {
    if (isOpen) {
      getReadingStats().then(s => setStats(s));
    }
  }, [isOpen]);

  if (!isOpen || !stats) return null;

  // Calculate today's reading
  const todayStr = new Date().toISOString().slice(0, 10);
  const todaySession = stats.sessions[todayStr] || { minutes: 0, pagesRead: 0 };
  const todayMinutes = todaySession.minutes;
  const dailyGoal = stats.dailyGoalMinutes || 20;
  const goalProgress = Math.min(100, Math.round((todayMinutes / Math.max(1, dailyGoal)) * 100));

  // Count books completed
  const completedBooksCount = books.filter(
    b => b.progress >= 100 || b.currentPage >= b.totalPages || (b.categoryIds && b.categoryIds.includes('cat-completed'))
  ).length;

  // Last 7 days chart data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const iso = d.toISOString().slice(0, 10);
    const dayName = d.toLocaleDateString('es-ES', { weekday: 'short' });
    const session = stats.sessions[iso] || { minutes: 0, pagesRead: 0 };
    return {
      date: iso,
      dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1, 3),
      minutes: session.minutes,
      metGoal: session.minutes >= dailyGoal,
      isToday: iso === todayStr,
    };
  });

  const maxMinutesInWeek = Math.max(dailyGoal, ...last7Days.map(d => d.minutes), 30);

  const handleUpdateGoal = async (minutes: number) => {
    const updated = { ...stats, dailyGoalMinutes: minutes };
    setStats(updated);
    await saveReadingStats(updated);
    setEditingGoal(false);
  };

  const totalHours = Math.floor(stats.totalMinutes / 60);
  const remainingMinutes = stats.totalMinutes % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        style={modalStyle}
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border-t sm:border border-rose-200/80 dark:border-zinc-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div
          className="w-full flex items-center justify-center pt-0 pb-2.5 -mt-2 cursor-grab active:cursor-grabbing touch-none select-none shrink-0 sm:hidden"
          {...dragHandleProps}
        >
          <div className="w-12 h-1.5 bg-rose-200 dark:bg-zinc-700 rounded-full" />
        </div>

        {/* Modal Header */}
        <div
          {...dragHandleProps}
          className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-zinc-800 shrink-0 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Flame className="w-5 h-5 fill-white stroke-none" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#4c0519] dark:text-zinc-100">
                Hábitos y Estadísticas
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                Tu progreso y constancia de lectura
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Stats Dashboard */}
        <div className="flex-1 overflow-y-auto py-3.5 space-y-4 pr-1">
          {/* 1. HERO RACHA DIARIA */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent border border-amber-300/60 dark:border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex flex-col items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
                <Flame className="w-7 h-7 fill-white stroke-none animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Racha Activa
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-[#4c0519] dark:text-zinc-100">
                    {stats.currentStreak}
                  </span>
                  <span className="text-sm font-bold text-slate-600 dark:text-zinc-300">
                    {stats.currentStreak === 1 ? 'día consecutivo' : 'días consecutivos'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5 font-medium">
                  {stats.currentStreak > 0
                    ? '¡Sigue así! Tu constancia está creando un gran hábito.'
                    : 'Lee hoy al menos 1 página para encender tu racha.'}
                </p>
              </div>
            </div>

            <div className="text-right pl-2 shrink-0 border-l border-amber-200/60 dark:border-amber-500/20">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block">
                Récord
              </span>
              <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                {stats.bestStreak}d
              </span>
            </div>
          </div>

          {/* 2. META DIARIA Y PROGRESO DE HOY */}
          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-zinc-800/60 border border-rose-200/70 dark:border-zinc-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-black text-[#4c0519] dark:text-zinc-100">
                  Meta de Hoy: {todayMinutes} / {dailyGoal} min
                </span>
              </div>
              <button
                onClick={() => setEditingGoal(!editingGoal)}
                className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
              >
                {editingGoal ? 'Cerrar' : 'Ajustar meta'}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full bg-rose-200/70 dark:bg-zinc-700 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500 rounded-full"
                style={{ width: `${goalProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
              <span>{goalProgress}% completado</span>
              {todayMinutes >= dailyGoal && (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ¡Meta alcanzada hoy!
                </span>
              )}
            </div>

            {/* Goal Presets Selector */}
            {editingGoal && (
              <div className="pt-2 border-t border-rose-200/60 dark:border-zinc-700/60 space-y-1.5 animate-in fade-in duration-150">
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Elige tu meta diaria de lectura:
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {[10, 15, 20, 30, 45].map(m => (
                    <button
                      key={m}
                      onClick={() => handleUpdateGoal(m)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        dailyGoal === m
                          ? 'bg-rose-500 text-white shadow-xs'
                          : 'bg-white dark:bg-zinc-700 text-slate-700 dark:text-zinc-200 border border-rose-200 dark:border-zinc-600 hover:bg-rose-100'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. GRÁFICO SEMANAL DE ACTIVIDAD */}
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/40 border border-rose-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-black text-[#4c0519] dark:text-zinc-100">
                  Actividad de los Últimos 7 Días
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500">
                minutos / día
              </span>
            </div>

            {/* Weekly Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-28 pt-4 pb-1 px-1">
              {last7Days.map((d, idx) => {
                const barHeight = Math.max(8, Math.round((d.minutes / maxMinutesInWeek) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[9px] font-bold text-slate-400 group-hover:text-rose-500 transition-colors">
                      {d.minutes > 0 ? `${d.minutes}m` : ''}
                    </span>
                    <div className="w-full max-w-[28px] h-full flex items-end">
                      <div
                        style={{ height: `${barHeight}%` }}
                        className={`w-full rounded-xl transition-all duration-300 ${
                          d.metGoal
                            ? 'bg-gradient-to-t from-emerald-500 to-teal-400 shadow-xs'
                            : d.minutes > 0
                            ? 'bg-gradient-to-t from-rose-500 to-pink-400'
                            : 'bg-rose-100 dark:bg-zinc-700/60'
                        } ${d.isToday ? 'ring-2 ring-rose-400 dark:ring-zinc-400' : ''}`}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-extrabold ${
                        d.isToday
                          ? 'text-rose-600 dark:text-rose-400 underline underline-offset-2'
                          : 'text-slate-500 dark:text-zinc-400'
                      }`}
                    >
                      {d.dayName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. TOTALES Y LOGROS */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-zinc-800/50 border border-rose-100 dark:border-zinc-800 text-center">
              <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">
                Tiempo Total
              </span>
              <span className="text-sm font-black text-[#4c0519] dark:text-zinc-100">
                {totalHours > 0 ? `${totalHours}h ` : ''}{remainingMinutes}m
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-zinc-800/50 border border-rose-100 dark:border-zinc-800 text-center">
              <BookOpen className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">
                Páginas
              </span>
              <span className="text-sm font-black text-[#4c0519] dark:text-zinc-100">
                {stats.totalPagesRead.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-zinc-800/50 border border-rose-100 dark:border-zinc-800 text-center">
              <Trophy className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">
                Leídos
              </span>
              <span className="text-sm font-black text-[#4c0519] dark:text-zinc-100">
                {completedBooksCount}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="pt-2 border-t border-rose-100 dark:border-zinc-800 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-rose-100 hover:bg-rose-200 text-[#881337] dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 font-black text-xs transition-colors cursor-pointer"
          >
            ✓ Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
