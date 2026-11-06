import React from 'react';
import { BookOpen, FolderInput, FileText, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EmptyStateProps {
  onOpenImport: () => void;
  onOpenExplore?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onOpenImport, onOpenExplore }) => {
  const { searchQuery, selectedCategoryId, categories, loadDemoBooks } = useApp();

  const isFiltering = searchQuery.trim() !== '' || selectedCategoryId !== 'cat-all';
  const currentCategory = categories.find(c => c.id === selectedCategoryId);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-rose-100/70 dark:bg-zinc-800 border border-[#fecdd9] dark:border-zinc-700 flex items-center justify-center text-rose-500 dark:text-zinc-300 mb-6 shadow-xs">
        {isFiltering ? (
          <BookOpen className="w-10 h-10 stroke-[1.5]" />
        ) : (
          <FolderInput className="w-10 h-10 stroke-[1.5]" />
        )}
      </div>

      <h3 className="text-xl font-bold text-[#4c0519] dark:text-zinc-100 mb-2">
        {isFiltering
          ? searchQuery
            ? 'Sin resultados para la búsqueda'
            : `Sin libros en "${currentCategory?.name || 'esta categoría'}"`
          : 'Tu biblioteca está lista'}
      </h3>

      <p className="text-sm text-[#881337]/75 dark:text-zinc-200 leading-relaxed mb-6">
        {isFiltering
          ? 'Prueba buscando con otro término o selecciona otra categoría en el menú superior.'
          : 'Puedes importar libros o mangas desde tu dispositivo o explorar las obras en español de la biblioteca pública.'}
      </p>

      {!isFiltering && (
        <>
          <div className="flex flex-col sm:flex-row items-center gap-2.5 mb-8 w-full justify-center flex-wrap">
            {onOpenExplore && (
              <button
                onClick={onOpenExplore}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 dark:from-zinc-200 dark:via-zinc-300 dark:to-zinc-100 active:scale-98 text-white dark:text-zinc-950 px-5 py-3 rounded-2xl font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Abrir Biblioteca Pública</span>
              </button>
            )}
            <button
              onClick={onOpenImport}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 hover:bg-rose-50 dark:hover:bg-zinc-800 text-[#881337] dark:text-zinc-200 border border-rose-200 dark:border-zinc-700 px-5 py-3 rounded-2xl font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <FolderInput className="w-4 h-4" />
              <span>Importar archivos locales</span>
            </button>
            <button
              onClick={loadDemoBooks}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-50/50 hover:bg-rose-100/70 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[#881337] dark:text-zinc-300 px-4 py-3 rounded-2xl font-semibold text-xs transition-all cursor-pointer border border-rose-200/50 dark:border-zinc-700/60"
            >
              <BookOpen className="w-4 h-4 text-rose-500 dark:text-zinc-400" />
              <span>Cargar ejemplos</span>
            </button>
          </div>

          {/* Supported format badges */}
          <div className="w-full pt-6 border-t border-[#fecdd9]/70 dark:border-zinc-800">
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-zinc-300 font-bold block mb-3">
              Formatos compatibles
            </span>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
                <FileText className="w-3 h-3" /> PDF
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1">
                <ImageIcon className="w-3 h-3" /> CBZ / CBR / ZIP
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> EPUB
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-medium flex items-center gap-1">
                <FileText className="w-3 h-3" /> TXT / MD
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
