import React from 'react';
import { Bookmark, BookOpen, Copy, Search, X, Check } from 'lucide-react';

interface TextSelectionToolbarProps {
  selectedText: string;
  onSaveQuote: (text: string) => void;
  onOpenDictionary: (text: string) => void;
  onSearchInBook: (text: string) => void;
  onClearSelection: () => void;
}

export const TextSelectionToolbar: React.FC<TextSelectionToolbarProps> = ({
  selectedText,
  onSaveQuote,
  onOpenDictionary,
  onSearchInBook,
  onClearSelection,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  if (!selectedText || selectedText.trim().length < 2) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSave = () => {
    onSaveQuote(selectedText);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClearSelection();
    }, 1200);
  };

  return (
    <div className="fixed top-18 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] sm:max-w-md bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-rose-200/90 dark:border-zinc-700/80 rounded-2xl p-1.5 shadow-2xl flex items-center gap-1 animate-in fade-in zoom-in-95 duration-150">
      <button
        onClick={handleSave}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          saved
            ? 'bg-emerald-500 text-white'
            : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs'
        }`}
        title="Guardar cita en Marcadores"
      >
        {saved ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Bookmark className="w-3.5 h-3.5" />}
        <span className="truncate">{saved ? '¡Guardada!' : 'Guardar Cita'}</span>
      </button>

      <button
        onClick={() => onOpenDictionary(selectedText)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-rose-100/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        title="Definir o traducir palabra"
      >
        <BookOpen className="w-3.5 h-3.5 text-blue-500" />
        <span className="hidden sm:inline">Definir</span>
      </button>

      <button
        onClick={() => onSearchInBook(selectedText)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-rose-100/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        title="Buscar esta frase en el libro"
      >
        <Search className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden sm:inline">Buscar</span>
      </button>

      <button
        onClick={handleCopy}
        className="p-2 rounded-xl text-slate-600 dark:text-zinc-300 hover:bg-rose-100/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        title="Copiar texto"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>

      <div className="w-[1px] h-4 bg-rose-200 dark:bg-zinc-800 mx-0.5" />

      <button
        onClick={onClearSelection}
        className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        title="Cerrar barra"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
