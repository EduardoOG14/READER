import React from 'react';
import {
  X,
  LayoutGrid,
  List,
  Plus,
  Moon,
  Sun,
  FolderTree,
  Check,
  ArrowUpDown,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useApp, type SortOption } from '../context/AppContext';
import { useBackHandler } from '../services/backButton';

interface BottomQuickMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenImport: () => void;
  onOpenExplore: () => void;
  onOpenDownloadCenter: () => void;
  onOpenCategoryManager: () => void;
  onOpenSettings: () => void;
}

export const BottomQuickMenuModal: React.FC<BottomQuickMenuModalProps> = ({
  isOpen,
  onClose,
  onOpenImport,
  onOpenCategoryManager,
  onOpenSettings,
}) => {
  const {
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    settings,
    updateSettings,
    books,
  } = useApp();

  // Priority 120 for closing sheet on back button
  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 120, isOpen);

  if (!isOpen) return null;

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  const sortChoices: { id: SortOption; label: string; icon: string }[] = [
    { id: 'recent', label: 'Los últimos que leí', icon: '🕒' },
    { id: 'title', label: 'Por nombre (A - Z)', icon: '🔤' },
    { id: 'dateAdded', label: 'Recién añadidos', icon: '📅' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Bottom Sheet Container */}
      <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-[#18191c] border-t border-rose-200/90 dark:border-zinc-800 rounded-t-[32px] shadow-2xl p-4 sm:p-6 z-10 animate-in slide-in-from-bottom duration-200 text-[#4c0519] dark:text-[#f3f4f6] max-h-[88vh] overflow-y-auto pb-[max(env(safe-area-inset-bottom,20px),20px)] space-y-4">
        
        {/* Native Pull Handle */}
        <div className="w-12 h-1.5 bg-rose-200 dark:bg-zinc-700 rounded-full mx-auto" />

        {/* Sheet Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-500/25">
              <Sparkles className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#4c0519] dark:text-[#f3f4f6]">
                Menú de Opciones
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-300 font-medium">
                ¿Qué deseas hacer en tu biblioteca?
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-rose-50 dark:bg-zinc-800 flex items-center justify-center text-rose-500 dark:text-zinc-300 hover:bg-rose-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* 1. BOTÓN GIGANTE: AÑADIR LIBRO */}
        <button
          onClick={() => {
            onClose();
            onOpenImport();
          }}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white flex items-center justify-between shadow-lg shadow-rose-500/30 active:scale-98 transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white/25 backdrop-blur-xs flex items-center justify-center shrink-0">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <div className="min-w-0">
              <span className="font-black text-sm block">➕ Añadir Libro o Manga</span>
              <span className="text-[11px] opacity-90 truncate block">
                Abre archivos PDF, EPUB o cómics de tu teléfono
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-white/20 text-white font-bold text-xs shrink-0">
            Abrir
          </span>
        </button>

        {/* 2. ¿CÓMO QUIERES VER TUS LIBROS? (Portadas vs Lista) */}
        <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-zinc-900 border border-rose-200/70 dark:border-zinc-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#4c0519] dark:text-zinc-200">
              ¿Cómo quieres ver tus libros?
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-300 font-bold">
              {books.length} {books.length === 1 ? 'libro' : 'libros'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                viewMode === 'grid'
                  ? 'bg-rose-500 text-white border-rose-600 dark:bg-zinc-100 dark:text-zinc-950 dark:border-white shadow-md'
                  : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-rose-200/60 dark:border-zinc-700 hover:bg-rose-100/50 dark:hover:bg-zinc-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4 stroke-[2.4]" />
              <span>Portadas Grandes</span>
              {viewMode === 'grid' && <Check className="w-4 h-4 stroke-[3]" />}
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                viewMode === 'list'
                  ? 'bg-rose-500 text-white border-rose-600 dark:bg-zinc-100 dark:text-zinc-950 dark:border-white shadow-md'
                  : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-rose-200/60 dark:border-zinc-700 hover:bg-rose-100/50 dark:hover:bg-zinc-700'
              }`}
            >
              <List className="w-4 h-4 stroke-[2.4]" />
              <span>Lista Simple</span>
              {viewMode === 'list' && <Check className="w-4 h-4 stroke-[3]" />}
            </button>
          </div>
        </div>

        {/* 3. ORDENAR LIBROS */}
        <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-zinc-900 border border-rose-200/70 dark:border-zinc-800 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#4c0519] dark:text-zinc-200">
            <ArrowUpDown className="w-4 h-4" />
            <span>Ordenar libros por:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {sortChoices.map(opt => {
              const isSelected = sortBy === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-rose-500 text-white border-rose-600 dark:bg-zinc-100 dark:text-zinc-950 dark:border-white shadow-sm'
                      : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-rose-200/60 dark:border-zinc-700 hover:bg-rose-100/50 dark:hover:bg-zinc-700'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </span>
                  {isSelected && <Check className="w-4 h-4 stroke-[3] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. MODO OSCURO / MODO CLARO */}
        <button
          onClick={toggleTheme}
          className="w-full p-3.5 rounded-2xl bg-white dark:bg-zinc-850 border border-rose-200/80 dark:border-zinc-700 flex items-center justify-between active:scale-98 transition-all cursor-pointer shadow-xs hover:bg-rose-50 dark:hover:bg-zinc-800"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
              {settings.theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-500 stroke-[2.4]" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 stroke-[2.4]" />
              )}
            </div>
            <div className="text-left">
              <span className="block text-xs font-black text-[#4c0519] dark:text-zinc-100">
                {settings.theme === 'dark'
                  ? 'Cambiar a Modo Claro (Fondo blanco)'
                  : 'Cambiar a Modo Oscuro (Para la noche)'}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-zinc-300 font-medium">
                {settings.theme === 'dark' ? 'Actualmente en tema oscuro' : 'Actualmente en tema claro'}
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-rose-600 dark:text-zinc-300">
            Cambiar
          </span>
        </button>

        {/* 5. CARPETAS Y CONFIGURACIÓN */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              onClose();
              onOpenCategoryManager();
            }}
            className="p-3.5 rounded-2xl bg-white dark:bg-zinc-850 border border-rose-200/80 dark:border-zinc-700 flex items-center gap-3 hover:bg-rose-50 dark:hover:bg-zinc-800 active:scale-96 transition-all cursor-pointer shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-zinc-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
              <FolderTree className="w-5 h-5 stroke-[2.3]" />
            </div>
            <div className="text-left min-w-0">
              <span className="block text-xs font-black text-[#4c0519] dark:text-[#f3f4f6] truncate">
                Mis Carpetas
              </span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-300 truncate block font-medium">
                Organizar libros
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="p-3.5 rounded-2xl bg-white dark:bg-zinc-850 border border-rose-200/80 dark:border-zinc-700 flex items-center gap-3 hover:bg-rose-50 dark:hover:bg-zinc-800 active:scale-96 transition-all cursor-pointer shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-700 dark:text-zinc-300 shrink-0">
              <Settings className="w-5 h-5 stroke-[2.3]" />
            </div>
            <div className="text-left min-w-0">
              <span className="block text-xs font-black text-[#4c0519] dark:text-[#f3f4f6] truncate">
                Ajustes
              </span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-300 truncate block font-medium">
                Configuración app
              </span>
            </div>
          </button>
        </div>

        {/* 6. BOTÓN GRANDE PARA CERRAR */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-rose-100 hover:bg-rose-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#881337] dark:text-zinc-200 font-black text-xs transition-colors cursor-pointer active:scale-98"
          >
            ✓ Listo, cerrar menú
          </button>
        </div>
      </div>
    </div>
  );
};
