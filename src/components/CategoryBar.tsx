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
    <div className="py-2.5 px-4 overflow-x-auto no-scrollbar flex items-center gap-2 border-b border-[#fecdd9]/70 dark:border-[#165b48]/70 bg-[#fff5f8]/60 dark:bg-[#072119]/60 transition-colors">
      <div className="flex items-center gap-2 min-w-max">
        {categories.map(category => {
          const isSelected = selectedCategoryId === category.id;
          const count = getBookCount(category.id);

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all select-none cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xs dark:from-emerald-400 dark:to-teal-300 dark:text-slate-950 scale-102 font-bold'
                  : 'bg-white hover:bg-[#ffe4ec] text-[#881337] border border-[#fecdd9]/70 dark:bg-[#0a2920] dark:hover:bg-[#0f382c] dark:text-[#a7f3d0] dark:border-[#165b48]'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0 shadow-2xs"
                style={{ backgroundColor: category.color }}
              />
              <span>{category.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white dark:bg-black/20 dark:text-slate-900'
                    : 'bg-[#ffe4ec] text-[#9f1239] dark:bg-[#06241c] dark:text-[#6ee7b7]'
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
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[#9f1239] hover:text-[#4c0519] dark:text-[#6ee7b7] dark:hover:text-[#ecfdf5] hover:bg-[#ffe4ec] dark:hover:bg-[#0f382c] border border-dashed border-[#fda4bb] dark:border-[#1a634e] transition-colors cursor-pointer"
          title="Administrar categorías manuales"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Categorías</span>
          <Settings2 className="w-3 h-3 ml-0.5 opacity-60" />
        </button>
      </div>
    </div>
  );
};
