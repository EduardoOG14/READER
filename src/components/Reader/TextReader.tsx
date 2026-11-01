import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';

interface TextReaderProps {
  buffer: ArrayBuffer;
  currentPage: number;
  onPageChange: (page: number, totalPages?: number) => void;
  onToggleControls: () => void;
  onTextExtracted?: (text: string) => void;
  isContinuousMode?: boolean;
}

export const TextReader: React.FC<TextReaderProps> = ({
  buffer,
  currentPage,
  onPageChange,
  onToggleControls,
  onTextExtracted,
  isContinuousMode = false,
}) => {
  const { settings } = useApp();
  const [fullText, setFullText] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const decoded = new TextDecoder('utf-8').decode(buffer);
      setFullText(decoded);
    } catch {
      console.error('Error decoding text buffer');
    }
  }, [buffer]);

  // Divide text into pages based on word count (~300 words per page)
  const pages = useMemo(() => {
    if (!fullText) return [''];
    const paragraphs = fullText.split(/\n\s*\n/);
    const pagesList: string[] = [];
    let currentChunk = '';
    let currentWordCount = 0;

    for (const p of paragraphs) {
      const wordsInP = p.trim().split(/\s+/).length;
      if (currentWordCount + wordsInP > 350 && currentChunk) {
        pagesList.push(currentChunk.trim());
        currentChunk = p;
        currentWordCount = wordsInP;
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + p;
        currentWordCount += wordsInP;
      }
    }

    if (currentChunk.trim()) {
      pagesList.push(currentChunk.trim());
    }

    return pagesList.length > 0 ? pagesList : [fullText];
  }, [fullText]);

  useEffect(() => {
    if (pages.length > 0) {
      onPageChange(currentPage, pages.length);
    }
  }, [pages.length]);

  // Notify parent of current page text for TTS
  useEffect(() => {
    if (pages.length > 0 && onTextExtracted) {
      const activeText = pages[currentPage - 1] || '';
      onTextExtracted(activeText);
    }
  }, [currentPage, pages, onTextExtracted]);

  // When in continuous mode, scroll to appropriate height immediately without animation
  useEffect(() => {
    if (isContinuousMode && scrollContainerRef.current && pages.length > 0) {
      const el = scrollContainerRef.current;
      const targetRatio = (currentPage - 1) / Math.max(1, pages.length);
      el.scrollTop = targetRatio * (el.scrollHeight - el.clientHeight);
    }
  }, [isContinuousMode, pages.length]);

  // Track scroll position in continuous reading mode
  const handleContinuousScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollHeight <= el.clientHeight || pages.length <= 1) return;
    const progressFraction = el.scrollTop / (el.scrollHeight - el.clientHeight);
    const calculatedPage = Math.max(
      1,
      Math.min(Math.round(progressFraction * (pages.length - 1)) + 1, pages.length)
    );
    if (calculatedPage !== currentPage) {
      onPageChange(calculatedPage, pages.length);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isContinuousMode) {
      onToggleControls();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.25) {
      if (currentPage > 1) onPageChange(currentPage - 1);
    } else if (clickX > width * 0.75) {
      if (currentPage < pages.length) onPageChange(currentPage + 1);
    } else {
      onToggleControls();
    }
  };

  const activeContent = pages[currentPage - 1] || '';

  // Theme preset styling
  const preset = settings.readingThemePreset || (settings.theme === 'dark' ? 'emerald' : 'day');
  let themeContainerStyle = 'bg-white/95 text-slate-900 border-slate-200/80';
  if (preset === 'emerald') {
    themeContainerStyle = 'bg-[#18191c] text-zinc-100 border-zinc-800 shadow-zinc-950/50';
  } else if (preset === 'oled') {
    themeContainerStyle = 'bg-black text-slate-100 border-slate-800 shadow-none';
  } else if (preset === 'sepia') {
    themeContainerStyle = 'bg-[#f4ebd0] text-[#3f2e18] border-[#e2d5b6] shadow-[#ebe0c1]';
  } else if (preset === 'sakura') {
    themeContainerStyle = 'bg-[#fdf2f4] text-[#4c1d2c] border-pink-200/80 shadow-pink-100/50';
  }

  // Font family class
  let fontClass = 'font-sans';
  if (settings.fontFamily === 'serif') fontClass = 'font-serif';
  if (settings.fontFamily === 'mono') fontClass = 'font-mono';
  if (settings.fontFamily === 'opendyslexic') fontClass = 'font-sans tracking-wider';

  // --- MODO LECTURA CONTINUO (Full fluid vertical scroll, seamless text) ---
  if (isContinuousMode) {
    const rawParagraphs = fullText.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

    return (
      <div
        ref={scrollContainerRef}
        onScroll={handleContinuousScroll}
        onClick={handleContainerClick}
        className={`w-full h-full overflow-y-auto select-none transition-colors duration-200 ${themeContainerStyle}`}
      >
        <div className={`w-full max-w-3xl mx-auto px-4 sm:px-8 py-6 pb-20 ${fontClass}`}>
          {rawParagraphs.map((para, idx) => (
            <p
              key={idx}
              className="mb-3 transition-all"
              style={{
                fontSize: `${settings.fontSize}px`,
                lineHeight: settings.lineHeight || 1.7,
                textAlign: 'justify',
                textJustify: 'inter-word',
                textIndent: '1.25em',
                hyphens: 'auto',
                WebkitHyphens: 'auto',
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // --- MODO PAGINADO CLÁSICO (Page by Page) ---
  return (
    <div
      onClick={handleContainerClick}
      className="w-full h-full overflow-y-auto flex justify-center p-4 sm:p-8 select-none"
    >
      <div className={`w-full max-w-2xl rounded-2xl p-6 sm:p-10 shadow-lg border my-auto transition-colors duration-200 ${themeContainerStyle} ${fontClass}`}>
        <div
          className="whitespace-pre-wrap leading-relaxed transition-all"
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight || 1.6,
            textAlign: settings.textAlign || 'left',
          }}
        >
          {activeContent}
        </div>
      </div>
    </div>
  );
};
