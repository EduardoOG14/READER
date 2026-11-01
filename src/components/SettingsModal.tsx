import React, { useState } from 'react';
import { X, Moon, Sun, BookOpen, Sliders, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CURRENT_APP_VERSION } from '../services/updater';
import { UpdateModal } from './UpdateModal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, books } = useApp();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#0a2920] border border-rose-200 dark:border-emerald-700/80 rounded-3xl shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-200 text-[#4c0519] dark:text-[#ecfdf5]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-emerald-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 dark:from-emerald-500 dark:to-teal-400 text-white flex items-center justify-center shadow-xs">
              <Sliders className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#4c0519] dark:text-[#ecfdf5]">
                Preferencias de READER
              </h3>
              <p className="text-[11px] text-[#881337]/70 dark:text-[#a7f3d0]/70">
                Ajustes visuales y descanso ocular
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-[#0f382c] text-rose-400 dark:text-emerald-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-5">
          {/* Theme Selector */}
          <div>
            <label className="text-xs font-semibold text-rose-900/80 dark:text-emerald-300/80 uppercase tracking-wider block mb-2">
              Tema Visual
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSettings({ theme: 'light' })}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                  settings.theme === 'light'
                    ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-xs dark:bg-rose-950/30'
                    : 'bg-white dark:bg-[#07241c] border-rose-200/70 dark:border-emerald-800 text-[#881337] dark:text-[#a7f3d0]'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-500">
                  <Sun className="w-4 h-4" />
                </div>
                <span>Sakura Pastel</span>
                <span className="text-[10px] font-normal opacity-70">Modo Claro</span>
              </button>

              <button
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                  settings.theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-400 text-zinc-100 shadow-xs'
                    : 'bg-white dark:bg-[#16171a] border-rose-200/70 dark:border-zinc-700 text-[#881337] dark:text-zinc-300'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300">
                  <Moon className="w-4 h-4" />
                </div>
                <span>Gris Industrial</span>
                <span className="text-[10px] font-normal opacity-70">Modo Oscuro</span>
              </button>
            </div>
          </div>

          {/* Eye Protection Filter */}
          <div>
            <label className="text-xs font-semibold text-rose-900/80 dark:text-emerald-300/80 uppercase tracking-wider block mb-2">
              Filtro de Lectura (Cuidado Ocular)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'none', label: 'Normal' },
                { id: 'warm', label: 'Cálido' },
                { id: 'sepia', label: 'Sepia' },
                { id: 'invert', label: 'Invertido' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => updateSettings({ eyeFilter: f.id as any })}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    settings.eyeFilter === f.id
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white dark:from-emerald-500 dark:to-teal-400 dark:text-slate-950 border-transparent shadow-xs'
                      : 'bg-rose-50/50 dark:bg-[#07241c] border-rose-200/60 dark:border-emerald-800/60 text-[#881337] dark:text-[#a7f3d0]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Warm Intensity Slider (if warm active) */}
          {settings.eyeFilter === 'warm' && (
            <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-[#07241c]/60 border border-rose-200/60 dark:border-emerald-800/60">
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span>Intensidad de filtro cálido</span>
                <span className="font-bold">{settings.warmFilterIntensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={settings.warmFilterIntensity}
                onChange={e => updateSettings({ warmFilterIntensity: Number(e.target.value) })}
                className="w-full accent-rose-500 dark:accent-emerald-400"
              />
            </div>
          )}

          {/* Updates Section */}
          <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-[#18191c] border border-rose-200/80 dark:border-zinc-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 dark:bg-zinc-800 text-rose-600 dark:text-zinc-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block text-[#4c0519] dark:text-[#f3f4f6]">
                  Buscar Actualizaciones
                </span>
                <span className="text-[10px] text-[#881337]/70 dark:text-zinc-400 font-mono">
                  Versión instalada: v{CURRENT_APP_VERSION}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:from-zinc-200 dark:to-zinc-300 dark:hover:from-white dark:hover:to-zinc-200 text-white dark:text-zinc-950 text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              title="Comprobar si hay una nueva versión en GitHub"
            >
              <RefreshCw className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Comprobar</span>
            </button>
          </div>

          {/* About / Info */}
          <div className="pt-3 border-t border-rose-100 dark:border-emerald-800/60 flex items-center justify-between text-xs text-[#881337]/70 dark:text-[#a7f3d0]/70">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{books.length} obras en biblioteca</span>
            </div>
            <div className="font-mono text-[11px] opacity-60">
              v{CURRENT_APP_VERSION} • READER
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 dark:from-emerald-500 dark:to-teal-400 text-white dark:text-slate-950 font-bold text-xs shadow-md active:scale-98 transition-all cursor-pointer"
          >
            Listo
          </button>
        </div>

        {/* Update Checker Modal */}
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      </div>
    </div>
  );
};
