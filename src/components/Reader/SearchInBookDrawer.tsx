import React, { useState, useEffect } from 'react';
import { X, Search, Loader2, ArrowRight, BookOpen } from 'lucide-react';
import { useBackHandler } from '../../services/backButton';
import type { Book } from '../../types';

interface SearchResult {
  page: number;
  snippet: string;
  matchIndex?: number;
}

interface SearchInBookDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
  fileBuffer: ArrayBuffer | null;
  onJumpToPage: (page: number) => void;
  currentPageText?: string;
}

export const SearchInBookDrawer: React.FC<SearchInBookDrawerProps> = ({
  isOpen,
  onClose,
  book,
  fileBuffer,
  onJumpToPage,
  currentPageText,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 210, isOpen);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  const handleSearch = async () => {
    if (!query.trim() || !fileBuffer) return;
    setIsSearching(true);
    setHasSearched(true);
    const cleanQuery = query.toLowerCase().trim();
    const matches: SearchResult[] = [];

    try {
      if (book.format === 'txt' || book.format === 'md') {
        const text = new TextDecoder('utf-8').decode(fileBuffer);
        const lines = text.split('\n');
        lines.forEach((line, idx) => {
          if (line.toLowerCase().includes(cleanQuery)) {
            const startIdx = Math.max(0, line.toLowerCase().indexOf(cleanQuery) - 35);
            const snippet = line.slice(startIdx, startIdx + 110);
            matches.push({
              page: Math.floor(idx / 40) + 1,
              snippet: (startIdx > 0 ? '...' : '') + snippet.trim() + '...',
            });
          }
        });
      } else if (book.format === 'pdf') {
        // PDF text search using pdfjs-dist
        const pdfjs = await import('pdfjs-dist');
        const loadingTask = pdfjs.getDocument({ data: fileBuffer.slice(0) });
        const pdf = await loadingTask.promise;
        const total = Math.min(pdf.numPages, 150); // Search up to first 150 pages for speed

        for (let i = 1; i <= total; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageString = textContent.items
            .map((item: any) => item.str || '')
            .join(' ');

          const lower = pageString.toLowerCase();
          if (lower.includes(cleanQuery)) {
            const pos = lower.indexOf(cleanQuery);
            const start = Math.max(0, pos - 35);
            const snippet = pageString.slice(start, start + 100);
            matches.push({
              page: i,
              snippet: (start > 0 ? '...' : '') + snippet.trim() + '...',
            });
            if (matches.length >= 40) break;
          }
        }
      } else {
        // Fallback for EPUB / other formats: search current text snippet or chapters
        if (currentPageText && currentPageText.toLowerCase().includes(cleanQuery)) {
          matches.push({
            page: book.currentPage || 1,
            snippet: currentPageText.slice(0, 110) + '...',
          });
        }
      }
    } catch (e) {
      console.warn('Error during in-book search:', e);
    } finally {
      setResults(matches);
      setIsSearching(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#18191c] border-l border-rose-200 dark:border-zinc-800 shadow-2xl p-4 sm:p-5 z-10 flex flex-col h-full animate-in slide-in-from-right duration-200 text-slate-800 dark:text-zinc-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/15 text-rose-500 dark:bg-zinc-800 dark:text-zinc-300">
              <Search className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Buscar en la obra</h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate max-w-[220px]">
                {book.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="py-3 shrink-0">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Escribe una palabra o frase..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl outline-none text-slate-800 dark:text-zinc-200 focus:ring-2 focus:ring-rose-400/30"
                autoFocus
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !query.trim()}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Buscar</span>}
            </button>
          </div>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {isSearching ? (
            <div className="py-16 text-center text-xs text-slate-500 dark:text-zinc-400 space-y-2">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-rose-500" />
              <p>Escaneando páginas del libro...</p>
            </div>
          ) : hasSearched && results.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-500 dark:text-zinc-400 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto opacity-40" />
              <p>No se encontraron coincidencias para «{query}».</p>
            </div>
          ) : (
            results.map((r, i) => (
              <div
                key={i}
                onClick={() => {
                  onJumpToPage(r.page);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-50/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 hover:border-rose-400/60 dark:hover:border-zinc-600 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-rose-600 dark:text-zinc-300">
                  <span>Página {r.page}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                  {r.snippet}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="pt-3 border-t border-rose-100 dark:border-zinc-800 text-[11px] text-slate-500 dark:text-zinc-400 flex items-center justify-between shrink-0">
            <span>{results.length} coincidencias encontradas</span>
            <span className="text-[10px]">Toca una para saltar a la página</span>
          </div>
        )}
      </div>
    </div>
  );
};
