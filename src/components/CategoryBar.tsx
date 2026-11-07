import React from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CategoryBarProps {
  onOpenCategoryManager: () => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ onOpenCategoryManager }) => {
  const { categories, selectedCategoryId, setSelectedCategoryId, books } = useApp();

  const getBookCount = (catId: string) => {
    if (catId === 'cat-all') return books.length;
    if (catId === 'cat-favorites') return books.filter(b => b.categoryIds.includes('cat-favorites')).length;
    if (catId === 'cat-reading') return books.filter(b => b.progress > 0 && b.progress < 100 && b.currentPage < b.totalPages).length;
    if (catId === 'cat-completed') return books.filter(b => b.progress >= 100 || b.currentPage >= b.totalPages || b.categoryIds.includes('cat-completed')).length;
    return books.filter(b => b.categoryIds.includes(catId)).length;
  };

  const getCategoryLabel = (category: { id: string; name: string }) => {
    switch (category.id) {
      case 'cat-all':
        return '📚 Todos';
      case 'cat-reading':
        return '📖 Leyendo';
      case 'cat-completed':
        return '✅ Leídos';
      case 'cat-favorites':
        return '⭐ Favoritos';
      case 'cat-manga':
        return '🎨 Mangas';
      case 'cat-books':
        return '📄 Libros';
      case 'cat-romance':
        return '💖 Romance';
      default:
        return category.name;
    }
  };

  return (
    <div className="py-2.5 px-3 sm:px-4 overflow-x-auto no-scrollbar flex items-center gap-2 border-b border-[#fecdd9]/70 dark:border-zinc-800 bg-[#fff5f8]/70 dark:bg-[#121316] transition-colors sticky top-14 z-20 backdrop-blur-md">
      <div className="flex items-center gap-2 min-w-max">
        {categories.map(category => {
          const isSelected = selectedCategoryId === category.id;
          const count = getBookCount(category.id);
          const label = getCategoryLabel(category);

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all select-none active:scale-95 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/25 dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-950 font-black'
                  : 'bg-white hover:bg-[#ffe4ec] text-[#881337] border border-[#fecdd9]/80 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700/80 shadow-2xs'
              }`}
            >
              <span>{label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isSelected
                    ? 'bg-white/25 text-white dark:bg-black/20 dark:text-zinc-950'
                    : 'bg-[#ffe4ec] text-[#9f1239] dark:bg-zinc-800 dark:text-zinc-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

        {/* Manage Categories / Add button */}
        <button
          onClick={onOpenCategoryManager}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black text-[#9f1239] hover:text-[#4c0519] dark:text-zinc-200 dark:hover:text-white hover:bg-[#ffe4ec] dark:hover:bg-zinc-800 border border-dashed border-[#fda4bb] dark:border-zinc-700 transition-all active:scale-95 cursor-pointer shadow-2xs"
          title="Crear o editar carpetas"
        >
          <Plus className="w-4 h-4 stroke-[2.8]" />
          <span>Carpetas</span>
        </button>
      </div>
    </div>
  );
};
