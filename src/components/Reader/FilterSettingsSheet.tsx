import React, { useState } from 'react';
import {
  X,
  Sun,
  Sparkles,
  Sliders,
  AlignJustify,
  AlignLeft,
  Battery,
  Smartphone,
  BookOpen,
  Scroll,
  Volume2,
  Bookmark as BookmarkIcon,
  Search,
  Maximize,
  Minimize,
  Crop,
  Type,
  Minus,
  Plus,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBackHandler } from '../../services/backButton';
import { useSwipeDownToClose } from '../../hooks/useSwipeDownToClose';
import type { EyeFilterMode, ReadingThemePreset } from '../../types';

interface FilterSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  isManga?: boolean;
  isTextBased?: boolean;
  isContinuousReading: boolean;
  onToggleReadingMode: () => void;
  orientationMode: 'auto' | 'portrait' | 'landscape';
  onChangeOrientation: (mode: 'auto' | 'portrait' | 'landscape') => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenTts: () => void;
  onToggleAutoScroll: () => void;
  isAutoScrollActive: boolean;
  onOpenBookmarks: () => void;
  bookmarksCount: number;
  onOpenSearch: () => void;
  smartTrimMargins?: boolean;
  onToggleSmartTrim?: () => void;
}

export const FilterSettingsSheet: React.FC<FilterSettingsSheetProps> = ({
  isOpen,
  onClose,
  isManga = false,
  isTextBased = false,
  isContinuousReading,
  onToggleReadingMode,
  orientationMode,
  onChangeOrientation,
  isFullscreen,
  onToggleFullscreen,
  onOpenTts,
  onToggleAutoScroll: _onToggleAutoScroll,
  isAutoScrollActive: _isAutoScrollActive,
  onOpenBookmarks,
  bookmarksCount,
  onOpenSearch,
  smartTrimMargins = false,
  onToggleSmartTrim,
}) => {
  const { settings, updateSettings } = useApp();
  const [showAdvancedTypography, setShowAdvancedTypography] = useState<boolean>(false);

  // Handle hardware back button to close sheet
  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 105, isOpen);

  const { dragHandleProps, modalStyle } = useSwipeDownToClose({ onClose });

  if (!isOpen) return null;

  const currentTheme = settings.readingThemePreset || 'emerald';
  const currentFontSize = settings.fontSize || 18;

  // Visual Reading Themes (The Big 4)
  const readingThemes: {
    id: ReadingThemePreset;
    name: string;
    sub: string;
    bgStyle: string;
    textStyle: string;
    borderStyle: string;
    icon: string;
  }[] = [
    {
      id: 'day',
      name: 'Día Blanco',
      sub: 'Papel nítido',
      bgStyle: 'bg-white',
      textStyle: 'text-slate-900',
      borderStyle: 'border-slate-300',
      icon: '☀️',
    },
    {
      id: 'oled',
      name: 'Noche OLED',
      sub: 'Negro puro',
      bgStyle: 'bg-black',
      textStyle: 'text-white',
      borderStyle: 'border-zinc-800',
      icon: '🌙',
    },
    {
      id: 'sepia',
      name: 'Sepia Libro',
      sub: 'Pergamino clásico',
      bgStyle: 'bg-[#f4ebd0]',
      textStyle: 'text-amber-950',
      borderStyle: 'border-amber-300',
      icon: '📜',
    },
    {
      id: 'emerald',
      name: 'Gris Mate',
      sub: 'Nocturno suave',
      bgStyle: 'bg-[#18191c]',
      textStyle: 'text-zinc-200',
      borderStyle: 'border-zinc-700',
      icon: '🌑',
    },
  ];

  const eyeFilters: { id: EyeFilterMode; name: string; desc: string; iconBg: string }[] = [
    { id: 'none', name: 'Normal', desc: 'Sin filtro', iconBg: 'bg-slate-300 dark:bg-zinc-700' },
    { id: 'sepia', name: 'Sepia', desc: 'Papel clásico', iconBg: 'bg-[#f4ebd0] text-amber-900 border border-amber-300' },
    { id: 'warm', name: 'Luz Cálida', desc: 'Anti luz azul', iconBg: 'bg-amber-400 text-amber-950' },
    { id: 'invert', name: 'Invertido', desc: 'Alto contraste', iconBg: 'bg-black text-white border border-zinc-700' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        style={modalStyle}
        className="relative w-full max-w-lg bg-white dark:bg-[#18191c] border-t sm:border border-slate-200 dark:border-zinc-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[88vh] flex flex-col text-slate-800 dark:text-zinc-100 pb-[env(safe-area-inset-bottom,0px)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Pull Handle for swipe down to dismiss */}
        <div
          className="w-full flex items-center justify-center pt-2 pb-1 cursor-grab active:cursor-grabbing touch-none select-none shrink-0 sm:hidden"
          {...dragHandleProps}
        >
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-zinc-600 rounded-full" />
        </div>

        {/* Modal Header */}
        <div
          {...dragHandleProps}
          className="px-5 py-3 border-b border-slate-100 dark:border-zinc-800/80 flex items-center justify-between shrink-0 bg-slate-50/70 dark:bg-zinc-900/70 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-zinc-800 dark:text-zinc-200 flex items-center justify-center shadow-2xs">
              <Sliders className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Ajustes de Lectura
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                Todo fácil y a tu gusto en un solo toque
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Cerrar ajustes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Deck */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* 1. COLOR DE FONDO (THEMES) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                <span>🎨 Color de Fondo</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                Toca para cambiar
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {readingThemes.map(t => {
                const isSelected = currentTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      updateSettings({
                        readingThemePreset: t.id,
                        theme: t.id === 'day' ? 'light' : 'dark',
                      });
                    }}
                    className={`relative flex items-center gap-3 p-3 rounded-2xl border-2 transition-all active:scale-98 text-left cursor-pointer shadow-xs ${t.bgStyle} ${
                      isSelected
                        ? 'border-rose-500 dark:border-zinc-300 ring-2 ring-rose-500/20 dark:ring-zinc-400/20 scale-[1.02]'
                        : `${t.borderStyle} hover:opacity-90`
                    }`}
                  >
                    <span className="text-xl shrink-0">{t.icon}</span>
                    <div className="min-w-0 flex-1">
                      <span className={`text-xs font-bold block truncate ${t.textStyle}`}>
                        {t.name}
                      </span>
                      <span className={`text-[10px] block opacity-80 ${t.textStyle}`}>
                        {t.sub}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-rose-500 dark:bg-zinc-200 text-white dark:text-zinc-950 flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. TAMAÑO DE LETRA (SOLO PARA LIBROS DE TEXTO: EPUB, TXT, MD) */}
          {isTextBased && (
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/60 rounded-3xl border border-slate-200/80 dark:border-zinc-800 space-y-3 shadow-2xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-rose-500 dark:text-zinc-300" />
                  <span>Tamaño de la Letra</span>
                </span>
                <span className="font-mono text-xs font-bold text-rose-600 dark:text-zinc-200 bg-rose-100/70 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-zinc-700">
                  {currentFontSize} px
                </span>
              </div>

              {/* Big Ergonomic A- and A+ Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateSettings({ fontSize: Math.max(12, currentFontSize - 1) })}
                  disabled={currentFontSize <= 12}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-100 font-bold active:scale-95 disabled:opacity-30 transition-all cursor-pointer shadow-xs"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                  <span className="text-xs font-bold">A- Más Chica</span>
                </button>

                <button
                  type="button"
                  onClick={() => updateSettings({ fontSize: Math.min(36, currentFontSize + 1) })}
                  disabled={currentFontSize >= 36}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 dark:bg-zinc-200 dark:hover:bg-white text-white dark:text-zinc-950 font-bold active:scale-95 disabled:opacity-30 transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span className="text-xs font-bold">A+ Más Grande</span>
                </button>
              </div>

              {/* Slider for continuous adjustment */}
              <input
                type="range"
                min="12"
                max="36"
                value={currentFontSize}
                onChange={e => updateSettings({ fontSize: Number(e.target.value) })}
                className="w-full accent-rose-500 dark:accent-zinc-300 cursor-pointer h-2"
              />

              {/* Preset buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                {[
                  { label: 'Chica', size: 14 },
                  { label: 'Normal', size: 18 },
                  { label: 'Grande', size: 22 },
                  { label: 'Gigante', size: 26 },
                ].map(p => (
                  <button
                    key={p.size}
                    type="button"
                    onClick={() => updateSettings({ fontSize: p.size })}
                    className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      currentFontSize === p.size
                        ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Live Preview Text Box */}
              <div className="p-3 bg-white dark:bg-black/40 rounded-2xl border border-slate-200/80 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 transition-all">
                <p className="text-center font-serif leading-relaxed" style={{ fontSize: `${Math.min(22, Math.max(13, currentFontSize * 0.9))}px` }}>
                  «En un lugar de la Mancha, de cuyo nombre no quiero acordarme...»
                </p>
              </div>
            </div>
          )}

          {/* 3. MODO DE PASE DE PÁGINAS (PAGINADO VS CASCADA) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                <span>📖 Cómo Pasar las Páginas</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  if (isContinuousReading) onToggleReadingMode();
                }}
                className={`flex flex-col items-center text-center p-3.5 rounded-2xl border-2 transition-all active:scale-98 cursor-pointer ${
                  !isContinuousReading
                    ? 'border-rose-500 bg-rose-50/60 dark:border-zinc-300 dark:bg-zinc-800 text-rose-700 dark:text-zinc-100 shadow-sm'
                    : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2 ${
                  !isContinuousReading ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs' : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                }`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold block">Por Páginas</span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-tight">
                  Toca a los lados para pasar hojas
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!isContinuousReading) onToggleReadingMode();
                }}
                className={`flex flex-col items-center text-center p-3.5 rounded-2xl border-2 transition-all active:scale-98 cursor-pointer ${
                  isContinuousReading
                    ? 'border-rose-500 bg-rose-50/60 dark:border-zinc-300 dark:bg-zinc-800 text-rose-700 dark:text-zinc-100 shadow-sm'
                    : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2 ${
                  isContinuousReading ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs' : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                }`}>
                  <Scroll className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold block">En Cascada</span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5 leading-tight">
                  Desliza continuo hacia abajo
                </span>
              </button>
            </div>
          </div>

          {/* ANIMACIÓN DE PASO DE HOJA (SOLO EN MODO PAGINADO) */}
          {!isContinuousReading && (
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/60 rounded-3xl border border-slate-200/80 dark:border-zinc-800 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-rose-500 dark:text-zinc-300" />
                  <span>Animación de Paso de Hoja</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">
                  {settings.pageTransitionStyle === 'slide'
                    ? '↔️ Deslizamiento'
                    : settings.pageTransitionStyle === 'instant'
                    ? '⚡ Directo'
                    : '💫 Volteo 3D'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'curl', label: 'Volteo 3D', icon: '💫', sub: 'Efecto libro' },
                  { id: 'slide', label: 'Deslizar', icon: '↔️', sub: 'Suave' },
                  { id: 'instant', label: 'Directo', icon: '⚡', sub: 'Sin espera' },
                ].map(opt => {
                  const isSelected = (settings.pageTransitionStyle || 'curl') === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateSettings({ pageTransitionStyle: opt.id as any })}
                      className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/70 dark:border-zinc-300 dark:bg-zinc-800 text-rose-600 dark:text-zinc-100 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100/70'
                      }`}
                    >
                      <span className="text-base mb-0.5">{opt.icon}</span>
                      <span className="text-xs font-bold block">{opt.label}</span>
                      <span className="text-[9.5px] opacity-75 block">{opt.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODO DOBLE PÁGINA (SPREAD) */}
          {!isContinuousReading && (
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/60 rounded-3xl border border-slate-200/80 dark:border-zinc-800 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-rose-500 dark:text-zinc-300" />
                  <span>Doble Página (Horizontal / Tablets)</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">
                  {settings.dualPageMode === 'always'
                    ? '📖 Siempre 2'
                    : settings.dualPageMode === 'never'
                    ? '📄 1 Fija'
                    : '🔄 Auto'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'auto', label: 'Automático', icon: '🔄', sub: 'Al rotar / tablet' },
                  { id: 'always', label: 'Siempre 2', icon: '📖', sub: 'Lado a lado' },
                  { id: 'never', label: '1 Página', icon: '📄', sub: 'Solo individual' },
                ].map(opt => {
                  const isSelected = (settings.dualPageMode || 'auto') === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateSettings({ dualPageMode: opt.id as any })}
                      className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/70 dark:border-zinc-300 dark:bg-zinc-800 text-rose-600 dark:text-zinc-100 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100/70'
                      }`}
                    >
                      <span className="text-base mb-0.5">{opt.icon}</span>
                      <span className="text-xs font-bold block">{opt.label}</span>
                      <span className="text-[9.5px] opacity-75 block">{opt.sub}</span>
                    </button>
                  );
                })}
              </div>

              {/* Si es manga y modo doble página está activo: opción de primera página portada */}
              {isManga && settings.dualPageMode !== 'never' && (
                <div className="pt-2 border-t border-slate-200/60 dark:border-zinc-800/80 flex items-center justify-between">
                  <div className="pr-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                      Portada en 1 sola hoja
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 block">
                      Muestra la página 1 sola y empareja las demás (2-3, 4-5)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateSettings({ firstPageAsCover: settings.firstPageAsCover === false })}
                    className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                      settings.firstPageAsCover !== false ? 'bg-rose-500 dark:bg-zinc-300' : 'bg-slate-300 dark:bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`bg-white dark:bg-zinc-950 w-5 h-5 rounded-full shadow-md transform transition-transform ${
                        settings.firstPageAsCover !== false ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 4. BRILLO DE LA PANTALLA */}
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/60 rounded-3xl border border-slate-200/80 dark:border-zinc-800 space-y-2.5 shadow-2xs">
            <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-zinc-200">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Brillo de Pantalla</span>
              </span>
              <span className="font-mono text-xs font-bold bg-amber-100/80 dark:bg-zinc-800 text-amber-800 dark:text-zinc-200 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-zinc-700">
                {settings.brightness}%
              </span>
            </div>

            <input
              type="range"
              min="20"
              max="100"
              value={settings.brightness}
              onChange={e => updateSettings({ brightness: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer h-2"
            />

            <div className="grid grid-cols-3 gap-1.5 pt-0.5">
              {[
                { label: '🌙 Noche', val: 25 },
                { label: '🔅 Normal', val: 65 },
                { label: '☀️ Máximo', val: 100 },
              ].map(b => (
                <button
                  key={b.val}
                  type="button"
                  onClick={() => updateSettings({ brightness: b.val })}
                  className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    settings.brightness === b.val
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. HERRAMIENTAS DIRECTAS (1 TOQUE) */}
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block mb-2">
              ⚡ Herramientas y Asistentes
            </span>

            <div className="space-y-2">
              {/* TTS Audiolibro Hero Button */}
              {isTextBased && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenTts();
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-blue-500/15 border-2 border-blue-500/40 hover:border-blue-500 transition-all active:scale-98 text-left cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-blue-900 dark:text-blue-100">
                        🎙️ Escuchar en Voz Alta (Audiolibro)
                      </span>
                      <span className="text-[10.5px] text-blue-700 dark:text-blue-300 font-medium">
                        Narrador profesional con voz humana y emotiva
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-900/40 px-2 py-1 rounded-xl shrink-0">
                    Abrir →
                  </span>
                </button>
              )}

              {/* Grid with Search, Bookmarks, Fullscreen */}
              <div className="grid grid-cols-2 gap-2">
                {/* Search */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSearch();
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all active:scale-95 text-left cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Search className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold block text-slate-900 dark:text-white truncate">
                      Buscar Texto
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 truncate block">
                      En todo el libro
                    </span>
                  </div>
                </button>

                {/* Bookmarks */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBookmarks();
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all active:scale-95 text-left cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 relative">
                    <BookmarkIcon className="w-4 h-4 stroke-[2.2]" />
                    {bookmarksCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                        {bookmarksCount}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold block text-slate-900 dark:text-white truncate">
                      Marcadores
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 truncate block">
                      {bookmarksCount} guardados
                    </span>
                  </div>
                </button>

                {/* Fullscreen */}
                <button
                  type="button"
                  onClick={onToggleFullscreen}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all active:scale-95 text-left cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    {isFullscreen ? <Minimize className="w-4 h-4 stroke-[2.2]" /> : <Maximize className="w-4 h-4 stroke-[2.2]" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold block text-slate-900 dark:text-white truncate">
                      Pantalla Total
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 truncate block">
                      {isFullscreen ? 'Salir' : 'Sin distracciones'}
                    </span>
                  </div>
                </button>

                {/* Manga Smart Margin Crop */}
                {isManga && onToggleSmartTrim && (
                  <button
                    type="button"
                    onClick={onToggleSmartTrim}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all active:scale-95 text-left cursor-pointer ${
                      smartTrimMargins
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-300'
                        : 'bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border-slate-200 dark:border-zinc-800'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                      <Crop className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold block text-slate-900 dark:text-white truncate">
                        Recortar Bordes
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-zinc-400 truncate block">
                        {smartTrimMargins ? 'Activo' : 'Aprovechar pantalla'}
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 6. GIRO DE PANTALLA */}
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/60 rounded-3xl border border-slate-200/80 dark:border-zinc-800 space-y-2">
            <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
              📱 Giro de Pantalla
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => onChangeOrientation('portrait')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  orientationMode === 'portrait'
                    ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                    : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Vertical</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeOrientation('auto')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  orientationMode === 'auto'
                    ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                    : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Automático</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeOrientation('landscape')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  orientationMode === 'landscape'
                    ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                    : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                }`}
              >
                <Smartphone className="w-4 h-4 rotate-90" />
                <span>Horizontal</span>
              </button>
            </div>
          </div>

          {/* 7. SI ES MANGA: SENTIDO DE LECTURA */}
          {isManga && (
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/60 rounded-3xl border border-slate-200/80 dark:border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                ⛩️ Sentido de Lectura del Manga
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateSettings({ mangaDirection: 'rtl' })}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    settings.mangaDirection === 'rtl' || settings.mangaDirection === 'horizontal'
                      ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                  }`}
                >
                  <span>🇯🇵 Manga (Derecha a Izq)</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateSettings({ mangaDirection: 'ltr' })}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    settings.mangaDirection === 'ltr'
                      ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                  }`}
                >
                  <span>🌐 Cómic (Izq a Derecha)</span>
                </button>
              </div>
            </div>
          )}

          {/* 8. BARRA DE ESTADO INFERIOR (RELOJ Y BATERÍA) */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800">
            <div className="flex items-center gap-2.5">
              <Battery className="w-5 h-5 text-rose-500 dark:text-zinc-400" />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                  Hora y Batería al Pie de Página
                </span>
                <span className="text-[10.5px] text-slate-500 dark:text-zinc-400">
                  Muestra la hora, batería y progreso en la parte inferior
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateSettings({ showMoonStatusBar: !settings.showMoonStatusBar })}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                settings.showMoonStatusBar !== false ? 'bg-rose-500 dark:bg-zinc-300' : 'bg-slate-300 dark:bg-zinc-700'
              }`}
            >
              <div
                className={`bg-white dark:bg-zinc-950 w-5 h-5 rounded-full shadow-md transform transition-transform ${
                  settings.showMoonStatusBar !== false ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 9. ACORDEÓN DESPLEGABLE: TIPOGRAFÍA Y FILTROS AVANZADOS */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvancedTypography(prev => !prev)}
              className="w-full flex items-center justify-between py-2 px-3 rounded-2xl bg-slate-100/70 dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Más Opciones (Tipo de letra, alineación y descanso visual)</span>
              </span>
              {showAdvancedTypography ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdvancedTypography && (
              <div className="mt-3 space-y-4 p-3.5 bg-slate-50/80 dark:bg-zinc-900/50 rounded-2xl border border-slate-200/80 dark:border-zinc-800 animate-in fade-in duration-150">
                {/* Tipo de letra */}
                {isTextBased && (
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                      Tipo de Letra
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
                      {[
                        { id: 'sans', label: 'Moderna', font: 'font-sans' },
                        { id: 'serif', label: 'Editorial', font: 'font-serif' },
                        { id: 'mono', label: 'Máquina', font: 'font-mono' },
                        { id: 'opendyslexic', label: 'Legible', font: 'font-sans tracking-wide' },
                      ].map(f => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => updateSettings({ fontFamily: f.id as any })}
                          className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                            (settings.fontFamily || 'sans') === f.id
                              ? 'border-rose-500 bg-rose-50 dark:border-zinc-400 dark:bg-zinc-800 text-rose-600 dark:text-zinc-100 font-bold'
                              : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
                          } ${f.font}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Alineación de texto */}
                {isTextBased && (
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                      Alineación del Texto
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => updateSettings({ textAlign: 'left' })}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                          (settings.textAlign || 'left') === 'left'
                            ? 'border-rose-500 bg-rose-50 dark:border-zinc-400 dark:bg-zinc-800 text-rose-600 dark:text-zinc-100'
                            : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-800'
                        }`}
                      >
                        <AlignLeft className="w-4 h-4" />
                        <span>Alineado a la Izquierda</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSettings({ textAlign: 'justify' })}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                          settings.textAlign === 'justify'
                            ? 'border-rose-500 bg-rose-50 dark:border-zinc-400 dark:bg-zinc-800 text-rose-600 dark:text-zinc-100'
                            : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-800'
                        }`}
                      >
                        <AlignJustify className="w-4 h-4" />
                        <span>Justificado Completo</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Filtro de Descanso Ocular */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Filtro Anti-Fatiga Visual
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {eyeFilters.map(f => {
                      const isSelected = (settings.eyeFilter || 'none') === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => updateSettings({ eyeFilter: f.id })}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-rose-500 bg-rose-50/50 dark:border-zinc-400 dark:bg-zinc-800 ring-1 ring-rose-500 dark:ring-zinc-400'
                              : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-800'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full shrink-0 ${f.iconBg}`} />
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">{f.name}</span>
                            <span className="text-[10px] text-slate-500 dark:text-zinc-400">{f.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Big Easy Button */}
        <div className="p-3.5 border-t border-slate-100 dark:border-zinc-800/80 flex justify-end shrink-0 bg-slate-50/70 dark:bg-zinc-900/70">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-950 text-white transition-all shadow-md cursor-pointer active:scale-98 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Listo • Seguir Leyendo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
