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
  Zap,
  Bookmark as BookmarkIcon,
  Search,
  Maximize,
  Minimize,
  Crop,
  Type,
  Palette,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBackHandler } from '../../services/backButton';
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

type SheetTab = 'controls' | 'appearance' | 'typography';

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
  onToggleAutoScroll,
  isAutoScrollActive,
  onOpenBookmarks,
  bookmarksCount,
  onOpenSearch,
  smartTrimMargins = false,
  onToggleSmartTrim,
}) => {
  const { settings, updateSettings } = useApp();
  const [activeTab, setActiveTab] = useState<SheetTab>('controls');

  // Handle hardware back button to close sheet
  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 105, isOpen);

  if (!isOpen) return null;

  const readingThemes: {
    id: ReadingThemePreset;
    name: string;
    desc: string;
    bgClass: string;
    borderClass: string;
    textClass: string;
  }[] = [
    {
      id: 'day',
      name: 'Día Blanco',
      desc: 'Papel nítido',
      bgClass: 'bg-white',
      borderClass: 'border-slate-300',
      textClass: 'text-slate-900',
    },
    {
      id: 'emerald',
      name: 'Gris Mate',
      desc: 'Oscuro suave',
      bgClass: 'bg-[#18191c]',
      borderClass: 'border-zinc-600',
      textClass: 'text-zinc-200',
    },
    {
      id: 'oled',
      name: 'OLED Puro',
      desc: 'Negro absoluto',
      bgClass: 'bg-black',
      borderClass: 'border-slate-800',
      textClass: 'text-slate-100',
    },
    {
      id: 'sepia',
      name: 'Sepia Libro',
      desc: 'Pergamino clásico',
      bgClass: 'bg-[#f4ebd0]',
      borderClass: 'border-amber-300',
      textClass: 'text-amber-950',
    },
    {
      id: 'sakura',
      name: 'Sakura',
      desc: 'Rosa suave',
      bgClass: 'bg-[#fdf2f4]',
      borderClass: 'border-pink-300',
      textClass: 'text-pink-900',
    },
  ];

  const eyeFilters: { id: EyeFilterMode; name: string; desc: string; iconBg: string }[] = [
    { id: 'none', name: 'Original', desc: 'Sin filtro', iconBg: 'bg-slate-200 dark:bg-slate-700' },
    { id: 'sepia', name: 'Sepia Papel', desc: 'Tono cálido tradicional', iconBg: 'bg-[#f4ebd0] text-amber-900' },
    { id: 'warm', name: 'Luz Cálida', desc: 'Anti luz azul', iconBg: 'bg-amber-500/20 text-amber-500' },
    { id: 'invert', name: 'Invertido Noche', desc: 'Contraste invertido', iconBg: 'bg-black text-white border border-slate-700' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#18191c] border-t sm:border border-slate-200 dark:border-zinc-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[88vh] flex flex-col text-slate-800 dark:text-zinc-100 pb-[env(safe-area-inset-bottom,0px)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle bar for bottom sheet indication */}
        <div className="sm:hidden w-12 h-1 bg-slate-300 dark:bg-zinc-700 rounded-full mx-auto mt-2.5 shrink-0" />

        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-100 dark:border-zinc-800/80 flex items-center justify-between shrink-0 bg-slate-50/60 dark:bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:bg-zinc-800 dark:text-zinc-300 flex items-center justify-center">
              <Sliders className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Ajustes & Controles de Lectura
              </h3>
              <p className="text-[10.5px] text-slate-500 dark:text-zinc-400">
                Personaliza la experiencia, temas y herramientas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 -mr-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation for Sheet */}
        <div className="px-4 py-2 border-b border-slate-100 dark:border-zinc-800/80 bg-slate-50/40 dark:bg-zinc-900/40 flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('controls')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'controls'
                ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Herramientas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('appearance')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'appearance'
                ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Temas & Brillo</span>
          </button>

          {isTextBased && (
            <button
              type="button"
              onClick={() => setActiveTab('typography')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'typography'
                  ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Tipografía</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: CONTROLES Y HERRAMIENTAS */}
          {activeTab === 'controls' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Reading Mode Segmented Pill */}
              <div className="p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-200/80 dark:border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Modo de Pase de Páginas
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (isContinuousReading) onToggleReadingMode();
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      !isContinuousReading
                        ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-sm'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Paginado Normal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!isContinuousReading) onToggleReadingMode();
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isContinuousReading
                        ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-sm'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100'
                    }`}
                  >
                    <Scroll className="w-4 h-4" />
                    <span>Continuo Webtoon</span>
                  </button>
                </div>
              </div>

              {/* Orientation Lock Segmented Pill */}
              <div className="p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-200/80 dark:border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Orientación de Pantalla
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => onChangeOrientation('auto')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      orientationMode === 'auto'
                        ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Auto</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangeOrientation('portrait')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      orientationMode === 'portrait'
                        ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Vertical</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangeOrientation('landscape')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      orientationMode === 'landscape'
                        ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 rotate-90" />
                    <span>Horizontal</span>
                  </button>
                </div>
              </div>

              {/* Reader Tools Action Grid (Large 48px Touch Cards) */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                  Herramientas & Asistentes
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {/* TTS Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenTts();
                    }}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700/80 transition-all active:scale-95 text-left cursor-pointer shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-800 dark:text-zinc-100">
                        Voz Alta (TTS)
                      </span>
                      <span className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">
                        Lectura de audio
                      </span>
                    </div>
                  </button>

                  {/* Auto Scroll Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onToggleAutoScroll();
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all active:scale-95 text-left cursor-pointer shadow-2xs ${
                      isAutoScrollActive
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                        : 'bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border-slate-200 dark:border-zinc-700/80'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-800 dark:text-zinc-100">
                        Auto-Avance
                      </span>
                      <span className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">
                        {isAutoScrollActive ? 'Activo' : 'Manos libres'}
                      </span>
                    </div>
                  </button>

                  {/* Bookmarks List Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenBookmarks();
                    }}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700/80 transition-all active:scale-95 text-left cursor-pointer shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 relative">
                      <BookmarkIcon className="w-4 h-4" />
                      {bookmarksCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                          {bookmarksCount}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-800 dark:text-zinc-100">
                        Marcadores
                      </span>
                      <span className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">
                        {bookmarksCount} guardados
                      </span>
                    </div>
                  </button>

                  {/* Search in Book Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSearch();
                    }}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700/80 transition-all active:scale-95 text-left cursor-pointer shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-800 dark:text-zinc-100">
                        Buscar Texto
                      </span>
                      <span className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">
                        En el libro
                      </span>
                    </div>
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={onToggleFullscreen}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700/80 transition-all active:scale-95 text-left cursor-pointer shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-500/10 text-slate-600 dark:text-zinc-300 flex items-center justify-center shrink-0">
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-800 dark:text-zinc-100">
                        Pantalla Completa
                      </span>
                      <span className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">
                        {isFullscreen ? 'Salir' : 'Inmersivo'}
                      </span>
                    </div>
                  </button>

                  {/* Manga Smart Crop */}
                  {isManga && onToggleSmartTrim && (
                    <button
                      type="button"
                      onClick={onToggleSmartTrim}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all active:scale-95 text-left cursor-pointer shadow-2xs ${
                        smartTrimMargins
                          ? 'bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-300'
                          : 'bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700/80'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                        <Crop className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block text-slate-800 dark:text-zinc-200">
                          Recorte Bordes
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-zinc-400">
                          {smartTrimMargins ? 'Activo' : 'Auto-zoom'}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Manga Reading Direction */}
              {isManga && (
                <div className="p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-200/80 dark:border-zinc-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">
                    Sentido de Lectura de Cómic / Manga
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => updateSettings({ mangaDirection: 'rtl' })}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        settings.mangaDirection === 'rtl' || settings.mangaDirection === 'horizontal'
                          ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                          : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                      }`}
                    >
                      <span>Manga Japonés (RTL)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSettings({ mangaDirection: 'ltr' })}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        settings.mangaDirection === 'ltr'
                          ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                          : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
                      }`}
                    >
                      <span>Cómic Occidental (LTR)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TEMAS, BRILLO Y PANTALLA */}
          {activeTab === 'appearance' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* MoonReader Visual Themes */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                  Paleta de Fondo MoonReader
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {readingThemes.map(t => {
                    const isSelected = (settings.readingThemePreset || 'emerald') === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          updateSettings({
                            readingThemePreset: t.id,
                            theme: t.id === 'day' || t.id === 'sakura' ? 'light' : 'dark',
                          });
                        }}
                        className={`flex flex-col items-start p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-rose-500 dark:ring-zinc-300 shadow-sm'
                            : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300'
                        } ${t.bgClass}`}
                      >
                        <span className={`text-xs font-bold ${t.textClass}`}>{t.name}</span>
                        <span className={`text-[10px] opacity-75 ${t.textClass}`}>{t.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hardware / Software Brightness Dimmer */}
              <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-200/80 dark:border-zinc-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-zinc-200">
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-500" />
                    Atenuador de Brillo Nocturno
                  </span>
                  <span className="font-mono">{settings.brightness}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={settings.brightness}
                  onChange={e => updateSettings({ brightness: Number(e.target.value) })}
                  className="w-full accent-rose-500 dark:accent-zinc-300 cursor-pointer"
                />
                <p className="text-[10px] text-slate-400 dark:text-zinc-500">
                  Tip: Desliza verticalmente por el borde izquierdo de la pantalla para ajustar el brillo rápidamente.
                </p>
              </div>

              {/* MoonReader Status Bar Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <Battery className="w-4 h-4 text-rose-500 dark:text-zinc-400" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                      Barra de Estado MoonReader
                    </span>
                    <span className="text-[10.5px] text-slate-500 dark:text-zinc-400">
                      Reloj, batería y progreso en el pie de página
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ showMoonStatusBar: !settings.showMoonStatusBar })}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    settings.showMoonStatusBar !== false ? 'bg-rose-500 dark:bg-zinc-300' : 'bg-slate-300 dark:bg-zinc-700'
                  }`}
                >
                  <div
                    className={`bg-white dark:bg-zinc-950 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      settings.showMoonStatusBar !== false ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Eye Comfort Filters */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                  Filtro de Descanso Ocular
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {eyeFilters.map(f => {
                    const isSelected = settings.eyeFilter === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => updateSettings({ eyeFilter: f.id })}
                        className={`flex flex-col items-start p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-rose-500 bg-rose-50/50 dark:border-zinc-400 dark:bg-zinc-800 ring-1 ring-rose-500 dark:ring-zinc-400'
                            : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`w-3.5 h-3.5 rounded-full ${f.iconBg}`} />
                          <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">{f.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-zinc-400">{f.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Warm filter intensity */}
              {settings.eyeFilter === 'warm' && (
                <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-amber-900 dark:text-amber-200">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Intensidad Luz Cálida
                    </span>
                    <span className="font-mono">{settings.warmFilterIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={settings.warmFilterIntensity}
                    onChange={e => updateSettings({ warmFilterIntensity: Number(e.target.value) })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TIPOGRAFÍA (TEXT/EPUB) */}
          {activeTab === 'typography' && isTextBased && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Font Family */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                  Tipo de Fuente
                </label>
                <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
                  {[
                    { id: 'sans', label: 'Moderna', font: 'font-sans' },
                    { id: 'serif', label: 'Editorial', font: 'font-serif' },
                    { id: 'mono', label: 'Mono', font: 'font-mono' },
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

              {/* Font size */}
              <div className="p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-200/80 dark:border-zinc-800 space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-zinc-200">
                  <span>Tamaño de Letra</span>
                  <span className="font-mono">{settings.fontSize} px</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="32"
                  value={settings.fontSize}
                  onChange={e => updateSettings({ fontSize: Number(e.target.value) })}
                  className="w-full accent-rose-500 dark:accent-zinc-300 cursor-pointer"
                />
              </div>

              {/* Line height */}
              <div className="p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-200/80 dark:border-zinc-800 space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-zinc-200">
                  <span>Interlineado</span>
                  <span className="font-mono">{(settings.lineHeight || 1.6).toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.2"
                  max="2.2"
                  step="0.1"
                  value={settings.lineHeight || 1.6}
                  onChange={e => updateSettings({ lineHeight: Number(e.target.value) })}
                  className="w-full accent-rose-500 dark:accent-zinc-300 cursor-pointer"
                />
              </div>

              {/* Text align */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateSettings({ textAlign: 'left' })}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                    (settings.textAlign || 'left') === 'left'
                      ? 'border-rose-500 bg-rose-50 dark:border-zinc-400 dark:bg-zinc-800 text-rose-600 dark:text-zinc-100'
                      : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <AlignLeft className="w-4 h-4" />
                  <span>Alineación Izquierda</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateSettings({ textAlign: 'justify' })}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                    settings.textAlign === 'justify'
                      ? 'border-rose-500 bg-rose-50 dark:border-zinc-400 dark:bg-zinc-800 text-rose-600 dark:text-zinc-100'
                      : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <AlignJustify className="w-4 h-4" />
                  <span>Justificado</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-100 dark:border-zinc-800/80 flex justify-end shrink-0 bg-slate-50/60 dark:bg-zinc-900/60">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-950 text-white transition-all shadow-sm cursor-pointer active:scale-98"
          >
            Listo • Continuar Lectura
          </button>
        </div>
      </div>
    </div>
  );
};
