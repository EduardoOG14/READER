import React from 'react';
import {
  X,
  Sun,
  Sparkles,
  Sliders,
  AlignJustify,
  AlignLeft,
  Battery,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { EyeFilterMode, ReadingThemePreset } from '../../types';

interface FilterSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  isManga?: boolean;
  isTextBased?: boolean;
}

export const FilterSettingsSheet: React.FC<FilterSettingsSheetProps> = ({
  isOpen,
  onClose,
  isManga = false,
  isTextBased = false,
}) => {
  const { settings, updateSettings } = useApp();

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
      name: 'Gris Industrial',
      desc: 'Gris oscuro mate',
      bgClass: 'bg-[#18191c]',
      borderClass: 'border-zinc-600',
      textClass: 'text-zinc-200',
    },
    {
      id: 'oled',
      name: 'OLED Puro',
      desc: 'Ahorro de batería',
      bgClass: 'bg-black',
      borderClass: 'border-slate-800',
      textClass: 'text-slate-100',
    },
    {
      id: 'sepia',
      name: 'Sepia Pergamino',
      desc: 'Tono libro antiguo',
      bgClass: 'bg-[#f4ebd0]',
      borderClass: 'border-amber-300',
      textClass: 'text-amber-950',
    },
    {
      id: 'sakura',
      name: 'Sakura Pastel',
      desc: 'Rosa flor de cerezo',
      bgClass: 'bg-[#fdf2f4]',
      borderClass: 'border-pink-300',
      textClass: 'text-pink-900',
    },
  ];

  const eyeFilters: { id: EyeFilterMode; name: string; desc: string; iconBg: string }[] = [
    { id: 'none', name: 'Original', desc: 'Sin filtro', iconBg: 'bg-slate-200 dark:bg-slate-700' },
    { id: 'sepia', name: 'Sepia Papel', desc: 'Tono cálido tradicional', iconBg: 'bg-[#f4ebd0] text-amber-900' },
    { id: 'warm', name: 'Luz Cálida', desc: 'Anti luz azul nocturna', iconBg: 'bg-amber-500/20 text-amber-500' },
    { id: 'invert', name: 'Invertido Noche', desc: 'Contraste invertido', iconBg: 'bg-black text-white border border-slate-700' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[88vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:bg-zinc-800 dark:text-zinc-300">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ajustes Moon+ Reader
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Temas, tipografía y confort de lectura
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 my-4">
          {/* 1. Moon+ Reader Visual Reading Themes */}
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Paletas de Lectura (Estilo MoonReader)
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
                        ? 'ring-2 ring-rose-500 dark:ring-zinc-400 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    } ${t.bgClass}`}
                  >
                    <span className={`text-xs font-bold ${t.textClass}`}>
                      {t.name}
                    </span>
                    <span className={`text-[10.5px] opacity-75 ${t.textClass}`}>
                      {t.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. MoonReader Status Bar Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/70 dark:border-zinc-800">
            <div className="flex items-center gap-2.5">
              <Battery className="w-4 h-4 text-rose-500 dark:text-zinc-400" />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                  Barra de Estado MoonReader
                </span>
                <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Muestra reloj en tiempo real, batería y porcentaje
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

          {/* 3. Hardware Brightness Dimmer */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                Atenuador de Brillo (Dimmer nocturno)
              </span>
              <span className="font-mono">{settings.brightness}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={settings.brightness}
              onChange={e => updateSettings({ brightness: Number(e.target.value) })}
              className="w-full accent-rose-500 dark:accent-zinc-400"
            />
            <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-1">
              Tip: Desliza el dedo verticalmente por el borde izquierdo de la pantalla para ajustar el brillo al instante.
            </p>
          </div>

          {/* 4. Eye Filters */}
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
              Filtro de Descanso Visual
            </label>
            <div className="grid grid-cols-2 gap-2">
              {eyeFilters.map(f => {
                const isSelected = settings.eyeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => updateSettings({ eyeFilter: f.id })}
                    className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/50 dark:border-zinc-400 dark:bg-zinc-800 ring-1 ring-rose-500 dark:ring-zinc-400'
                        : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`w-3.5 h-3.5 rounded-full ${f.iconBg}`} />
                      <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                        {f.name}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-slate-500 dark:text-zinc-400">
                      {f.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Warm Filter Intensity (Visible if warm filter is selected) */}
          {settings.eyeFilter === 'warm' && (
            <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl">
              <div className="flex justify-between items-center text-xs font-semibold text-amber-900 dark:text-amber-200 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Intensidad Luz Cálida (Ámbar)
                </span>
                <span className="font-mono">{settings.warmFilterIntensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={settings.warmFilterIntensity}
                onChange={e => updateSettings({ warmFilterIntensity: Number(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>
          )}

          {/* 5. Typography settings for Text & EPUB */}
          {isTextBased && (
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Tipografía & Lectura
              </label>

              {/* Font Family */}
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

              {/* Font size */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-zinc-300 mb-1">
                  <span>Tamaño de letra</span>
                  <span className="font-mono">{settings.fontSize} px</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="32"
                  value={settings.fontSize}
                  onChange={e => updateSettings({ fontSize: Number(e.target.value) })}
                  className="w-full accent-rose-500 dark:accent-zinc-400"
                />
              </div>

              {/* Line height */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-zinc-300 mb-1">
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
                  className="w-full accent-rose-500 dark:accent-zinc-400"
                />
              </div>

              {/* Text align */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateSettings({ textAlign: 'left' })}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                    (settings.textAlign || 'left') === 'left'
                      ? 'border-rose-500 bg-rose-50 dark:border-zinc-400 dark:bg-zinc-800 text-rose-600 dark:text-zinc-100 font-bold'
                      : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                  <span>Izquierda</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateSettings({ textAlign: 'justify' })}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                    settings.textAlign === 'justify'
                      ? 'border-rose-500 bg-rose-50 dark:border-zinc-400 dark:bg-zinc-800 text-rose-600 dark:text-zinc-100 font-bold'
                      : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
                  }`}
                >
                  <AlignJustify className="w-3.5 h-3.5" />
                  <span>Justificado</span>
                </button>
              </div>
            </div>
          )}

          {/* 6. Manga Mode Selector */}
          {isManga && (
            <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
              <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                Dirección de lectura de Manga & Cómic
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => updateSettings({ mangaDirection: 'webtoon' })}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 px-1.5 rounded-2xl border text-[11px] font-semibold transition-all cursor-pointer ${
                    settings.mangaDirection === 'webtoon'
                      ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:border-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 font-bold'
                      : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:border-slate-300'
                  }`}
                >
                  <AlignJustify className="w-4 h-4" />
                  <span>Webtoon</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateSettings({ mangaDirection: 'rtl' })}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 px-1.5 rounded-2xl border text-[11px] font-semibold transition-all cursor-pointer ${
                    settings.mangaDirection === 'rtl' || settings.mangaDirection === 'horizontal'
                      ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:border-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 font-bold'
                      : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:border-slate-300'
                  }`}
                >
                  <span>Manga (RTL)</span>
                  <span className="text-[9.5px] opacity-75">Japonés ➔</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateSettings({ mangaDirection: 'ltr' })}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 px-1.5 rounded-2xl border text-[11px] font-semibold transition-all cursor-pointer ${
                    settings.mangaDirection === 'ltr'
                      ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:border-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 font-bold'
                      : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:border-slate-300'
                  }`}
                >
                  <span>Cómic (LTR)</span>
                  <span className="text-[9.5px] opacity-75">Occidental ➔</span>
                </button>
              </div>
            </div>
          )}

          {/* 7. Touch zones guide */}
          <div className="p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-100 dark:border-zinc-800 text-[11px] text-slate-500 dark:text-zinc-400 space-y-1">
            <span className="font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-rose-500 dark:text-zinc-400" />
              Navegación Táctil y Gestos
            </span>
            <p>• Pellizco con 2 dedos: Acercar / alejar zoom en cualquier momento</p>
            <p>• Toque central (50%): Mostrar u ocultar barra de zoom y controles</p>
            <p>• Toque en extremos (25%): Pasar de página según el sentido elegido</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-200 dark:to-zinc-300 dark:text-zinc-950 text-white transition-colors shadow-sm cursor-pointer"
          >
            Aplicar y volver a la lectura
          </button>
        </div>
      </div>
    </div>
  );
};
