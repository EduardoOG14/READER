import React from 'react';
import {
  X,
  LayoutGrid,
  List,
  Plus,
  Download,
  Moon,
  Sun,
  SlidersHorizontal,
  FolderTree,
  Check,
  Compass,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';
import { useApp, type SortOption } from '../context/AppContext';
import { useBackHandler } from '../services/backButton';
import { downloadQueue, type QueueState } from '../services/downloadQueue';

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
  onOpenExplore,
  onOpenDownloadCenter,
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

  const [queueState, setQueueState] = React.useState<QueueState>(downloadQueue.getState());

  React.useEffect(() => {
    return downloadQueue.subscribe(state => setQueueState(state));
  }, []);

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

  const sortOptions: { id: SortOption; label: string; desc: string }[] = [
    { id: 'recent', label: 'Última lectura', desc: 'Leídos recientemente' },
    { id: 'title', label: 'Título (A - Z)', desc: 'Orden alfabético' },
    { id: 'progress', label: 'Mayor progreso', desc: 'Más avanzados primero' },
    { id: 'dateAdded', label: 'Fecha añadido', desc: 'Últimos importados' },
  ];

  const hasActiveDownloads = queueState.isProcessing || queueState.pendingItems.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Bottom Sheet Container */}
      <div className="relative w-full max-w-xl mx-auto bg-white dark:bg-[#18191c] border-t border-rose-200/90 dark:border-zinc-800 rounded-t-3xl shadow-2xl p-4 sm:p-5 z-10 animate-in slide-in-from-bottom duration-250 text-[#4c0519] dark:text-[#f3f4f6] max-h-[85vh] overflow-y-auto pb-[max(env(safe-area-inset-bottom,20px),20px)] space-y-4">
        {/* Native Pull / Drag Indicator */}
        <div className="w-12 h-1.5 bg-rose-200 dark:bg-zinc-700 rounded-full mx-auto" />

        {/* Sheet Header */}
        <div className="flex items-center justify-between pb-2 border-b border-rose-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#4c0519] dark:text-[#f3f4f6]">
                Centro de Control Rápido
              </h3>
              <p className="text-[10.5px] text-slate-500 dark:text-zinc-400 font-medium">
                Acciones continuas al alcance de tu pulgar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-zinc-800 text-rose-400 dark:text-zinc-400 cursor-pointer transition-colors"
            title="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Primary Action Cards: Importar + Descargas */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              onClose();
              onOpenImport();
            }}
            className="p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex flex-col justify-between items-start gap-1.5 shadow-md shadow-rose-500/20 active:scale-97 transition-all cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-xs block">Importar Obra</span>
              <span className="text-[9.5px] opacity-85">EPUB, CBZ, PDF, TXT</span>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDownloadCenter();
            }}
            className="relative p-3 rounded-2xl bg-rose-50 hover:bg-rose-100/80 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border border-rose-200/80 dark:border-zinc-700/80 flex flex-col justify-between items-start gap-1.5 active:scale-97 transition-all cursor-pointer text-left"
          >
            {hasActiveDownloads && (
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[9px] font-black uppercase tracking-wider animate-pulse">
                {queueState.pendingItems.length + (queueState.activeItem ? 1 : 0)} activa(s)
              </span>
            )}
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-zinc-700 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Download className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-[#4c0519] dark:text-[#f3f4f6] block">
                Descargas
              </span>
              <span className="text-[9.5px] text-slate-500 dark:text-zinc-400">
                {hasActiveDownloads ? 'Descarga en curso...' : `${queueState.completedCount} completadas`}
              </span>
            </div>
          </button>
        </div>

        {/* 2. Visual View Mode (Cuadrícula vs Lista) */}
        <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-zinc-900/60 border border-rose-200/60 dark:border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-rose-900/70 dark:text-zinc-400 uppercase tracking-wider">
              Diseño de biblioteca
            </span>
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
              {books.length} obras
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-white dark:bg-zinc-800 p-1 rounded-xl border border-rose-100 dark:border-zinc-700/60">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                  : 'text-slate-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-zinc-700'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cuadrícula</span>
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                  : 'text-slate-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-zinc-700'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Lista</span>
            </button>
          </div>
        </div>

        {/* 3. Sort Options (1-tap pills) */}
        <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-zinc-900/60 border border-rose-200/60 dark:border-zinc-800 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-rose-900/70 dark:text-zinc-400 uppercase tracking-wider">
            <ArrowUpDown className="w-3 h-3" />
            <span>Ordenar biblioteca</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {sortOptions.map(opt => {
              const isSelected = sortBy === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 border-rose-600 dark:border-zinc-300 font-bold shadow-xs'
                      : 'bg-white dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border-rose-100 dark:border-zinc-700/60 hover:bg-rose-100/50'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Quick Toggles & Navigation (Theme, Categories, Settings, Public Catalog) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-zinc-850 border border-rose-200/70 dark:border-zinc-700 flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-zinc-800 active:scale-96 transition-all cursor-pointer"
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <div className="text-left min-w-0">
              <span className="block text-[11px] font-bold text-[#4c0519] dark:text-[#f3f4f6] truncate">
                {settings.theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
              </span>
            </div>
          </button>

          {/* Categories */}
          <button
            onClick={() => {
              onClose();
              onOpenCategoryManager();
            }}
            className="p-2.5 rounded-xl bg-white dark:bg-zinc-850 border border-rose-200/70 dark:border-zinc-700 flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-zinc-800 active:scale-96 transition-all cursor-pointer"
          >
            <FolderTree className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <div className="text-left min-w-0">
              <span className="block text-[11px] font-bold text-[#4c0519] dark:text-[#f3f4f6] truncate">
                Categorías
              </span>
            </div>
          </button>

          {/* Public Catalog */}
          <button
            onClick={() => {
              onClose();
              onOpenExplore();
            }}
            className="p-2.5 rounded-xl bg-white dark:bg-zinc-850 border border-rose-200/70 dark:border-zinc-700 flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-zinc-800 active:scale-96 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-left min-w-0">
              <span className="block text-[11px] font-bold text-[#4c0519] dark:text-[#f3f4f6] truncate">
                Catálogo
              </span>
            </div>
          </button>

          {/* Full Settings */}
          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="p-2.5 rounded-xl bg-white dark:bg-zinc-850 border border-rose-200/70 dark:border-zinc-700 flex items-center gap-2 hover:bg-rose-50 dark:hover:bg-zinc-800 active:scale-96 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-700 dark:text-zinc-300 shrink-0" />
            <div className="text-left min-w-0">
              <span className="block text-[11px] font-bold text-[#4c0519] dark:text-[#f3f4f6] truncate">
                Ajustes
              </span>
            </div>
          </button>
        </div>

        {/* 5. Big Ergonomic Bottom Close Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-rose-100 hover:bg-rose-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#881337] dark:text-zinc-200 font-extrabold text-xs transition-colors cursor-pointer active:scale-98"
          >
            Cerrar Menú
          </button>
        </div>
      </div>
    </div>
  );
};
