import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, X, Plus, Minus, Zap } from 'lucide-react';

interface AutoScrollControlProps {
  isActive: boolean;
  onClose: () => void;
  onPageAdvance: () => void;
  defaultSeconds?: number;
}

export const AutoScrollControl: React.FC<AutoScrollControlProps> = ({
  isActive,
  onClose,
  onPageAdvance,
  defaultSeconds = 10,
}) => {
  const [secondsPerTurn, setSecondsPerTurn] = useState<number>(defaultSeconds);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(defaultSeconds);

  const onPageAdvanceRef = useRef(onPageAdvance);
  onPageAdvanceRef.current = onPageAdvance;

  // Timer loop
  useEffect(() => {
    if (!isActive || !isPlaying) return;

    setSecondsRemaining(secondsPerTurn);

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          onPageAdvanceRef.current();
          return secondsPerTurn;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPlaying, secondsPerTurn]);

  if (!isActive) return null;

  const progressPercent = ((secondsPerTurn - secondsRemaining) / secondsPerTurn) * 100;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 dark:bg-emerald-950/95 text-white backdrop-blur-md border border-slate-700/80 dark:border-emerald-800/80 rounded-2xl shadow-2xl px-4 py-2 flex items-center gap-3 animate-in slide-in-from-bottom duration-150">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
        <Zap className="w-3.5 h-3.5 animate-pulse" />
        <span className="hidden sm:inline">Auto-Lectura</span>
      </div>

      {/* Play / Pause */}
      <button
        onClick={() => setIsPlaying(p => !p)}
        className="p-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
        title={isPlaying ? 'Pausar auto-avance' : 'Reanudar auto-avance'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
      </button>

      {/* Progress & Speed countdown */}
      <div className="flex items-center gap-2 px-2 border-x border-slate-700 dark:border-emerald-900">
        <button
          onClick={() => {
            const next = Math.max(3, secondsPerTurn - 2);
            setSecondsPerTurn(next);
            setSecondsRemaining(next);
          }}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Acelerar paso de página"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <div className="flex flex-col items-center min-w-[52px]">
          <span className="text-xs font-bold font-mono text-emerald-300">
            {secondsRemaining}s / {secondsPerTurn}s
          </span>
          {/* Mini progress bar */}
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
            <div
              className="h-full bg-emerald-400 transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => {
            const next = Math.min(60, secondsPerTurn + 2);
            setSecondsPerTurn(next);
            setSecondsRemaining(next);
          }}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Ralentizar paso de página"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        title="Desactivar auto-lectura"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
