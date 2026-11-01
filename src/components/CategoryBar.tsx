import React from 'react';
import { Plus, Settings2 } from 'lucide-react';
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

  return (
    <div className="py-2.5 px-3 sm:px-4 overflow-x-auto no-scrollbar flex items-center gap-2 border-b border-[#fecdd9]/70 dark:border-zinc-800 bg-[#fff5f8]/70 dark:bg-[#121316] transition-colors sticky top-14 z-20 backdrop-blur-md">
      <div className="flex items-center gap-2 min-w-max">
        {categories.map(category => {
          const isSelected = selectedCategoryId === category.id;
          const count = getBookCount(category.id);

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all select-none active:scale-95 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20 dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-950 font-black'
                  : 'bg-white hover:bg-[#ffe4ec] text-[#881337] border border-[#fecdd9]/80 dark:bg-zinc-850 dark:hover:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700/80 shadow-2xs'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                style={{ backgroundColor: isSelected && !document.documentElement.classList.contains('dark') ? '#ffffff' : category.color }}
              />
              <span>{category.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected
                    ? 'bg-white/25 text-white dark:bg-black/20 dark:text-zinc-950'
                    : 'bg-[#ffe4ec] text-[#9f1239] dark:bg-zinc-800 dark:text-zinc-400'
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
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-[#9f1239] hover:text-[#4c0519] dark:text-zinc-300 dark:hover:text-zinc-100 hover:bg-[#ffe4ec] dark:hover:bg-zinc-800 border border-dashed border-[#fda4bb] dark:border-zinc-700 transition-all active:scale-95 cursor-pointer shadow-2xs"
          title="Administrar categorías manuales"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Categorías</span>
          <Settings2 className="w-3 h-3 ml-0.5 opacity-60" />
        </button>
      </div>
    </div>
  );
};
