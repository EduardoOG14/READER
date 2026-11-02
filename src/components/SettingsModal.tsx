import React, { useState, useRef } from 'react';
import {
  X,
  Moon,
  Sun,
  BookOpen,
  Sliders,
  Sparkles,
  RefreshCw,
  Flame,
  HardDrive,
  Download,
  Upload,
  Crop,
  Volume2,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useBackHandler } from '../services/backButton';
import { CURRENT_APP_VERSION } from '../services/updater';
import { exportBackupFile, restoreBackupFromJson } from '../services/backupRestore';
import { UpdateModal } from './UpdateModal';
import { ReadingInsightsModal } from './ReadingInsightsModal';
import { StorageManagerModal } from './StorageManagerModal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, books, refreshLibrary, deleteBookById } = useApp();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isStorageOpen, setIsStorageOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 100, isOpen);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportBackup = async () => {
    try {
      const { fileName } = await exportBackupFile();
      showToast(`Copia de seguridad «${fileName}» exportada.`);
    } catch (e: any) {
      showToast('Error al exportar respaldo: ' + (e.message || String(e)));
    }
  };

  const handleRestoreFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsRestoring(true);
    try {
      const text = await file.text();
      const res = await restoreBackupFromJson(text);
      if (res.success) {
        await refreshLibrary();
        showToast(`¡Respaldo restaurado! ${res.restoredBooks} obras y ${res.restoredCategories} categorías.`);
      } else {
        showToast('Error al restaurar: ' + (res.error || 'Archivo inválido'));
      }
    } catch (err: any) {
      showToast('Error al leer el archivo: ' + (err.message || String(err)));
    } finally {
      setIsRestoring(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Hidden File Input for restoring backup */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleRestoreFileSelected}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#18191c] border border-rose-200 dark:border-zinc-700/80 rounded-3xl shadow-2xl p-5 sm:p-6 z-10 animate-in zoom-in-95 duration-200 text-[#4c0519] dark:text-[#f3f4f6] max-h-[92vh] flex flex-col">
        
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white border border-rose-400/50 dark:border-zinc-600 rounded-2xl px-4 py-2 text-xs font-semibold shadow-2xl flex items-center gap-2 pointer-events-none">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-rose-100 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 dark:from-zinc-700 dark:to-zinc-600 text-white flex items-center justify-center shadow-xs">
              <Sliders className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                Preferencias de READER
              </h3>
              <p className="text-[11px] text-slate-700 dark:text-zinc-300 font-medium">
                Ajustes visuales, confort y herramientas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-zinc-800 text-rose-400 dark:text-zinc-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="py-3.5 space-y-4 overflow-y-auto flex-1 pr-1">
          
          {/* Quick Action Tiles: Insights & Storage */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setIsInsightsOpen(true)}
              className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/25 hover:border-amber-500/50 flex flex-col items-start gap-1 transition-all text-left cursor-pointer"
            >
              <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Flame className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 mt-1">
                Hábitos y Racha
              </span>
              <span className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">
                Ver tiempo y estadísticas
              </span>
            </button>

            <button
              onClick={() => setIsStorageOpen(true)}
              className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/25 hover:border-cyan-500/50 flex flex-col items-start gap-1 transition-all text-left cursor-pointer"
            >
              <div className="w-7 h-7 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-xs">
                <HardDrive className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 mt-1">
                Almacenamiento
              </span>
              <span className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">
                Gestión de espacio y caché
              </span>
            </button>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="text-xs font-semibold text-rose-900/80 dark:text-zinc-300 uppercase tracking-wider block mb-2">
              Tema Visual
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSettings({ theme: 'light' })}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                  settings.theme === 'light'
                    ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-xs'
                    : 'bg-white dark:bg-zinc-900/60 border-rose-200/70 dark:border-zinc-800 text-[#881337] dark:text-zinc-300'
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
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                  settings.theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-500 text-zinc-100 shadow-xs'
                    : 'bg-white dark:bg-zinc-900/60 border-rose-200/70 dark:border-zinc-800 text-[#881337] dark:text-zinc-300'
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
            <label className="text-xs font-semibold text-rose-900/80 dark:text-zinc-300 uppercase tracking-wider block mb-2">
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
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white dark:from-zinc-200 dark:to-zinc-300 dark:text-zinc-950 border-transparent shadow-xs'
                      : 'bg-rose-50/50 dark:bg-zinc-900 border-rose-200/60 dark:border-zinc-800 text-[#881337] dark:text-zinc-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Warm Intensity Slider */}
          {settings.eyeFilter === 'warm' && (
            <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-zinc-900 border border-rose-200/60 dark:border-zinc-800">
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
                className="w-full accent-rose-500"
              />
            </div>
          )}

          {/* Ergonomic Reading & Gestures */}
          <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6] uppercase tracking-wider">
              Ergonomía de Lectura
            </h4>

            {/* Volume Key Turn Page Toggle */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-rose-500 dark:text-zinc-400" />
                <div>
                  <p className="font-bold">Botones de volumen físico</p>
                  <p className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">
                    Pasar de página con las teclas de volumen
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.volumeKeyTurnPage !== false}
                onChange={e => updateSettings({ volumeKeyTurnPage: e.target.checked })}
                className="w-4 h-4 accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Invert Volume Keys */}
            {settings.volumeKeyTurnPage !== false && (
              <div className="flex items-center justify-between text-xs pl-6">
                <span className="text-[11px] text-slate-700 dark:text-zinc-200 font-medium">
                  Invertir teclas (Vol+ avanza / Vol- retrocede)
                </span>
                <input
                  type="checkbox"
                  checked={settings.invertVolumeKeys || false}
                  onChange={e => updateSettings({ invertVolumeKeys: e.target.checked })}
                  className="w-3.5 h-3.5 accent-rose-500 cursor-pointer"
                />
              </div>
            )}

            {/* Smart Crop Blank Margins */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Crop className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                <div>
                  <p className="font-bold">Recorte inteligente de bordes</p>
                  <p className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">
                    Ajusta viñetas de manga y cómic al arte útil
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.smartTrimMargins || false}
                onChange={e => updateSettings({ smartTrimMargins: e.target.checked })}
                className="w-4 h-4 accent-rose-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Backup & Restore Section */}
          <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-zinc-900/60 border border-rose-200/80 dark:border-zinc-800 space-y-2.5">
            <h4 className="text-xs font-bold text-[#4c0519] dark:text-[#f3f4f6] uppercase tracking-wider">
              Copia de Seguridad y Restauración
            </h4>
            <p className="text-[11px] text-slate-700 dark:text-zinc-300 font-medium leading-relaxed">
              Exporta tu biblioteca, marcadores, reseñas y ajustes para transferirlos a otro dispositivo.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleExportBackup}
                className="py-2 px-3 rounded-xl bg-white dark:bg-zinc-800 border border-rose-200 dark:border-zinc-700 text-xs font-bold text-[#881337] dark:text-zinc-200 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar (.json)</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isRestoring}
                className="py-2 px-3 rounded-xl bg-white dark:bg-zinc-800 border border-rose-200 dark:border-zinc-700 text-xs font-bold text-[#881337] dark:text-zinc-200 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isRestoring ? 'Restaurando...' : 'Restaurar'}</span>
              </button>
            </div>
          </div>

          {/* Updates Section */}
          <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-zinc-900/60 border border-rose-200/80 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 dark:bg-zinc-800 text-rose-600 dark:text-zinc-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block text-[#4c0519] dark:text-[#f3f4f6]">
                  Buscar Actualizaciones
                </span>
                <span className="text-[10px] text-slate-700 dark:text-zinc-300 font-mono font-medium">
                  Versión instalada: v{CURRENT_APP_VERSION}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:from-zinc-200 dark:to-zinc-300 dark:hover:from-white dark:hover:to-zinc-200 text-white dark:text-zinc-950 text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Comprobar</span>
            </button>
          </div>

          {/* Info */}
          <div className="pt-2 border-t border-rose-100 dark:border-zinc-800 flex items-center justify-between text-xs text-[#881337]/90 dark:text-zinc-300 font-medium">
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
        <div className="pt-3 border-t border-rose-100 dark:border-zinc-800 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-200 dark:to-zinc-300 dark:hover:from-white dark:hover:to-zinc-200 text-white dark:text-zinc-950 font-bold text-xs shadow-md active:scale-98 transition-all cursor-pointer"
          >
            Listo
          </button>
        </div>

        {/* Sub-modals */}
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
        />

        <ReadingInsightsModal
          isOpen={isInsightsOpen}
          onClose={() => setIsInsightsOpen(false)}
          booksCount={books.length}
        />

        <StorageManagerModal
          isOpen={isStorageOpen}
          onClose={() => setIsStorageOpen(false)}
          books={books}
          onDeleteBook={deleteBookById}
        />
      </div>
    </div>
  );
};
