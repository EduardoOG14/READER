import React, { useState } from 'react';
import { Filter, Star, Tag, X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LibraryFilterBar: React.FC = () => {
  const {
    selectedTags,
    toggleTagFilter,
    filterRating,
    setFilterRating,
    filterStatus,
    setFilterStatus,
    clearAllFilters,
    allLibraryTags,
  } = useApp();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Count active filters
  const activeFiltersCount =
    (filterStatus !== 'all' ? 1 : 0) +
    (filterRating !== null && filterRating > 0 ? 1 : 0) +
    selectedTags.length;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-1 pb-2">
      {/* Quick Summary Pill Bar */}
      <div className="flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-rose-200/60 dark:border-zinc-800 shadow-2xs">
        <button
          type="button"
          onClick={() => setIsExpanded(prev => !prev)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeFiltersCount > 0 || isExpanded
              ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
              : 'bg-rose-50 dark:bg-zinc-800 text-[#881337] dark:text-zinc-300 hover:bg-rose-100 dark:hover:bg-zinc-700'
          }`}
        >
          <Filter className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Filtros y Etiquetas</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-white dark:bg-zinc-950 text-rose-600 dark:text-zinc-200 text-[10px] font-black flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 opacity-80" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          )}
        </button>

        {/* Selected Tags Pills Preview in Bar */}
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {filterStatus !== 'all' && (
            <span
              onClick={() => setFilterStatus('all')}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-bold bg-rose-100 text-rose-800 dark:bg-zinc-800 dark:text-zinc-200 shrink-0 cursor-pointer hover:opacity-80"
              title="Quitar filtro de estado"
            >
              <span>
                {filterStatus === 'reading'
                  ? '📖 Leyendo'
                  : filterStatus === 'completed'
                  ? '✅ Leídos'
                  : '⏳ Pendientes'}
              </span>
              <X className="w-3 h-3 stroke-[2.5]" />
            </span>
          )}

          {filterRating !== null && filterRating > 0 && (
            <span
              onClick={() => setFilterRating(null)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 shrink-0 cursor-pointer hover:opacity-80"
              title="Quitar filtro de estrellas"
            >
              <span>⭐ {filterRating}+ ★</span>
              <X className="w-3 h-3 stroke-[2.5]" />
            </span>
          )}

          {selectedTags.map(tag => (
            <span
              key={tag}
              onClick={() => toggleTagFilter(tag)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10.5px] font-bold bg-purple-100 text-purple-900 dark:bg-purple-950/60 dark:text-purple-200 shrink-0 cursor-pointer hover:opacity-80"
              title="Quitar etiqueta"
            >
              <span>#{tag}</span>
              <X className="w-3 h-3 stroke-[2.5]" />
            </span>
          ))}
        </div>

        {/* Clear All Filters Button */}
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold text-rose-600 dark:text-zinc-400 hover:text-rose-700 dark:hover:text-white bg-rose-100/50 dark:bg-zinc-800/60 hover:bg-rose-100 transition-colors cursor-pointer shrink-0"
            title="Restablecer todos los filtros"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpiar</span>
          </button>
        )}
      </div>

      {/* Expanded Multi-Filter Panel */}
      {isExpanded && (
        <div className="mt-2 p-3.5 rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-rose-200/80 dark:border-zinc-800 shadow-md space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* 1. Estado de Lectura */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#881337]/75 dark:text-zinc-400">
                Estado de Lectura
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'reading', label: '📖 Leyendo' },
                { id: 'completed', label: '✅ Leídos' },
                { id: 'unread', label: '⏳ Pendientes' },
              ].map(st => {
                const isSelected = filterStatus === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setFilterStatus(st.id as any)}
                    className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                        : 'bg-rose-50/60 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-rose-100/70 border border-rose-200/40 dark:border-zinc-700'
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Calificación por Estrellas */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#881337]/75 dark:text-zinc-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Calificación mínima</span>
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { val: null, label: 'Todas' },
                { val: 5, label: '5 ★' },
                { val: 4, label: '4+ ★' },
                { val: 3, label: '3+ ★' },
                { val: 2, label: '2+ ★' },
              ].map(r => {
                const isSelected = filterRating === r.val;
                return (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => setFilterRating(r.val)}
                    className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-rose-50/60 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-rose-100/70 border border-rose-200/40 dark:border-zinc-700'
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Etiquetas de la Biblioteca (Tags) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#881337]/75 dark:text-zinc-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-purple-500" />
                <span>Etiquetas Personalizadas</span>
              </span>
              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={() => selectedTags.forEach(t => toggleTagFilter(t))}
                  className="text-[10px] text-purple-600 dark:text-purple-300 font-bold hover:underline cursor-pointer"
                >
                  Deseleccionar todas
                </button>
              )}
            </div>

            {allLibraryTags.length === 0 ? (
              <div className="p-3 rounded-2xl bg-rose-50/50 dark:bg-zinc-800/40 border border-dashed border-rose-200 dark:border-zinc-800 text-center">
                <p className="text-xs text-[#881337]/70 dark:text-zinc-400 font-medium">
                  Aún no has creado etiquetas. Puedes añadir etiquetas (ej. <i>#Isekai</i>, <i>#Misterio</i>) abriendo el detalle de cualquier obra con el botón <span className="font-bold">«···»</span>.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 pt-0.5 max-h-36 overflow-y-auto">
                {allLibraryTags.map(tag => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTagFilter(tag)}
                      className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-xs scale-102 ring-2 ring-purple-400/40'
                          : 'bg-rose-50 dark:bg-zinc-800 text-purple-900 dark:text-purple-300 hover:bg-purple-100/70 dark:hover:bg-zinc-700 border border-purple-200/50 dark:border-purple-800/50'
                      }`}
                    >
                      <span>#{tag}</span>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
