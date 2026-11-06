import React from 'react';
import { Type, X, Minus, Plus, AlignLeft, AlignJustify } from 'lucide-react';
import { useSwipeDownToClose } from '../../hooks/useSwipeDownToClose';
import { useBackHandler } from '../../services/backButton';
import type { ReadingSettings } from '../../types';

interface FontSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReadingSettings;
  updateSettings: (newSettings: Partial<ReadingSettings>) => Promise<void>;
}

export const FontSizeModal: React.FC<FontSizeModalProps> = ({
  isOpen,
  onClose,
  settings,
  updateSettings,
}) => {
  const { dragHandleProps, modalStyle } = useSwipeDownToClose({ onClose });

  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 108, isOpen);

  if (!isOpen) return null;

  const currentSize = settings.fontSize || 18;
  const currentLineHeight = settings.lineHeight || 1.6;
  const currentFont = settings.fontFamily || 'sans';
  const currentAlign = settings.textAlign || 'justify';

  const decreaseFontSize = () => {
    const next = Math.max(12, currentSize - 1);
    updateSettings({ fontSize: next });
  };

  const increaseFontSize = () => {
    const next = Math.min(36, currentSize + 1);
    updateSettings({ fontSize: next });
  };

  const presets = [
    { label: 'Chica', size: 14 },
    { label: 'Normal', size: 18 },
    { label: 'Grande', size: 22 },
    { label: 'Extra', size: 26 },
  ];

  const fonts = [
    { id: 'sans', label: 'Moderna', className: 'font-sans' },
    { id: 'serif', label: 'Editorial', className: 'font-serif' },
    { id: 'mono', label: 'Mono', className: 'font-mono' },
    { id: 'opendyslexic', label: 'Legible', className: 'font-sans tracking-wide' },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        style={modalStyle}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-[#18191c] border-t sm:border border-slate-200 dark:border-zinc-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 text-slate-900 dark:text-zinc-100"
      >
        {/* Swipe Down Pull Handle */}
        <div
          className="w-full flex items-center justify-center pt-0 pb-2.5 -mt-2 cursor-grab active:cursor-grabbing touch-none select-none shrink-0 sm:hidden"
          {...dragHandleProps}
        >
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-zinc-700 rounded-full" />
        </div>

        {/* Modal Header */}
        <div
          {...dragHandleProps}
          className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 dark:border-zinc-800 shrink-0 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:bg-zinc-800 dark:text-zinc-100">
              <Type className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Tamaño de Letra
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Ajusta la lectura a tu comodidad visual
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4.5">
          {/* Main Font Size Stepper (A- / A+) */}
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/70 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                Tamaño del Texto
              </span>
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-zinc-200 bg-rose-50 dark:bg-zinc-800 px-2 py-0.5 rounded-lg border border-rose-200/60 dark:border-zinc-700">
                {currentSize} px
              </span>
            </div>

            {/* Stepper Buttons and Value */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={decreaseFontSize}
                disabled={currentSize <= 12}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-100 font-bold active:scale-95 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
                title="Reducir letra"
              >
                <Minus className="w-4 h-4 stroke-[2.5]" />
                <span className="text-xs font-bold">A-</span>
              </button>

              <div className="px-4 py-2 text-center shrink-0 min-w-[70px]">
                <span className="text-xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                  {currentSize}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-400 block font-bold">
                  PÍXELES
                </span>
              </div>

              <button
                type="button"
                onClick={increaseFontSize}
                disabled={currentSize >= 36}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-100 font-bold active:scale-95 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
                title="Aumentar letra"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span className="text-base font-bold">A+</span>
              </button>
            </div>

            {/* Smooth Slider */}
            <input
              type="range"
              min="12"
              max="36"
              value={currentSize}
              onChange={e => updateSettings({ fontSize: Number(e.target.value) })}
              className="w-full accent-rose-500 dark:accent-zinc-300 cursor-pointer h-2"
            />

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {presets.map(p => (
                <button
                  key={p.size}
                  type="button"
                  onClick={() => updateSettings({ fontSize: p.size })}
                  className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    currentSize === p.size
                      ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-3 bg-slate-100/80 dark:bg-zinc-900/90 rounded-2xl border border-slate-200 dark:border-zinc-800">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-1">
              Vista previa en tiempo real
            </span>
            <p
              style={{
                fontSize: `${currentSize}px`,
                lineHeight: currentLineHeight,
                textAlign: currentAlign,
              }}
              className="text-slate-800 dark:text-zinc-200 transition-all duration-150 leading-relaxed overflow-hidden line-clamp-3"
            >
              «En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo...»
            </p>
          </div>

          {/* Font Family Selection */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">
              Tipografía
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
              {fonts.map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => updateSettings({ fontFamily: f.id as any })}
                  className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                    currentFont === f.id
                      ? 'border-rose-500 bg-rose-50 dark:border-zinc-400 dark:bg-zinc-800 text-rose-600 dark:text-zinc-100 font-bold'
                      : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-slate-700 dark:text-zinc-300'
                  } ${f.className}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Line Height & Alignment */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {/* Alignment Justified vs Left */}
            <button
              type="button"
              onClick={() => updateSettings({ textAlign: currentAlign === 'justify' ? 'left' : 'justify' })}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            >
              {currentAlign === 'justify' ? (
                <>
                  <AlignJustify className="w-4 h-4 text-rose-500 dark:text-zinc-300" />
                  <span>Justificado</span>
                </>
              ) : (
                <>
                  <AlignLeft className="w-4 h-4 text-rose-500 dark:text-zinc-300" />
                  <span>Alineado a la Izquierda</span>
                </>
              )}
            </button>

            {/* Line Height Presets */}
            <button
              type="button"
              onClick={() => {
                const nextLh = currentLineHeight < 1.5 ? 1.7 : currentLineHeight < 1.9 ? 2.0 : 1.4;
                updateSettings({ lineHeight: nextLh });
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <span>Espaciado: {currentLineHeight.toFixed(1)}x</span>
            </button>
          </div>
        </div>

        {/* Footer Done Button */}
        <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-bold text-sm transition-all active:scale-[0.98] cursor-pointer shadow-md"
          >
            Listo, continuar leyendo
          </button>
        </div>
      </div>
    </div>
  );
};
