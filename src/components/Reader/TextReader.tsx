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

  // Responsive spread tracking
  const [windowDimensions, setWindowDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600,
  }));

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLandscapeOrTablet = windowDimensions.width > windowDimensions.height || windowDimensions.width >= 768;
  const isDualPage = !isContinuousMode && (
    settings.dualPageMode === 'always' ||
    (settings.dualPageMode !== 'never' && isLandscapeOrTablet)
  );

  // Page turn animation
  const [turnAnimation, setTurnAnimation] = useState<'left' | 'right' | null>(null);
  const lastPageRef = useRef<number>(currentPage);

  useEffect(() => {
    if (currentPage === lastPageRef.current) return;
    const isForward = currentPage > lastPageRef.current;
    lastPageRef.current = currentPage;

    if (settings.pageTransitionStyle === 'instant') {
      setTurnAnimation(null);
      return;
    }

    const dir = isForward ? 'right' : 'left';
    setTurnAnimation(dir);

    const timer = setTimeout(() => {
      setTurnAnimation(null);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage, settings.pageTransitionStyle]);

  let animationClass = '';
  if (turnAnimation) {
    if (settings.pageTransitionStyle === 'curl') {
      animationClass = turnAnimation === 'right' ? 'animate-page-curl-right' : 'animate-page-curl-left';
    } else if (settings.pageTransitionStyle === 'slide') {
      animationClass = turnAnimation === 'right' ? 'animate-page-slide-right' : 'animate-page-slide-left';
    }
  }

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

  const basePage = currentPage % 2 !== 0 ? currentPage : currentPage - 1;
  const leftPageContent = pages[basePage - 1] || '';
  const rightPageContent = basePage < pages.length ? pages[basePage] : null;

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isContinuousMode) {
      onToggleControls();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.28) {
      if (isDualPage) {
        if (basePage > 1) onPageChange(Math.max(1, basePage - 2));
      } else {
        if (currentPage > 1) onPageChange(currentPage - 1);
      }
    } else if (clickX > width * 0.72) {
      if (isDualPage) {
        if (basePage + 2 <= pages.length) {
          onPageChange(basePage + 2);
        } else if (basePage + 1 <= pages.length) {
          onPageChange(basePage + 1);
        }
      } else {
        if (currentPage < pages.length) onPageChange(currentPage + 1);
      }
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
        <div className={`w-full max-w-4xl mx-auto px-6 sm:px-10 md:px-16 pt-14 pb-32 ${fontClass} ${
          isLandscapeOrTablet ? 'md:columns-2 gap-10' : ''
        }`}>
          {rawParagraphs.map((para, idx) => (
            <p
              key={idx}
              className="mb-4 transition-all pr-2 sm:pr-4"
              style={{
                fontSize: `${settings.fontSize}px`,
                lineHeight: settings.lineHeight || 1.75,
                textAlign: settings.textAlign || 'justify',
                textJustify: 'inter-word',
                textIndent: '1.25em',
                hyphens: 'none',
                WebkitHyphens: 'none',
                msHyphens: 'none',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // --- MODO PAGINADO CLÁSICO (Page by Page & Dual-Page Spread) ---
  if (isDualPage && rightPageContent !== null) {
    return (
      <div
        onClick={handleContainerClick}
        className="w-full h-full overflow-y-auto flex items-center justify-center p-2 sm:p-6 select-none"
      >
        <div className={`flex items-stretch justify-center max-w-5xl w-full my-auto ${animationClass}`}>
          {/* Left Page Card */}
          <div className={`flex-1 rounded-l-2xl p-6 sm:p-8 shadow-lg border-y border-l transition-colors duration-200 flex flex-col justify-between ${themeContainerStyle} ${fontClass}`}>
            <div
              className="whitespace-pre-wrap leading-relaxed transition-all pr-2"
              style={{
                fontSize: `${settings.fontSize}px`,
                lineHeight: settings.lineHeight || 1.7,
                textAlign: settings.textAlign || 'justify',
                hyphens: 'none',
                WebkitHyphens: 'none',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              {leftPageContent}
            </div>
            <div className="pt-4 text-center text-[10px] font-mono text-slate-400 dark:text-zinc-500">
              {basePage}
            </div>
          </div>

          {/* Book Spine Crease */}
          <div className="w-[2px] bg-slate-300 dark:bg-zinc-700 shadow-inner z-10 shrink-0 self-stretch" />

          {/* Right Page Card */}
          <div className={`flex-1 rounded-r-2xl p-6 sm:p-8 shadow-lg border-y border-r transition-colors duration-200 flex flex-col justify-between ${themeContainerStyle} ${fontClass}`}>
            <div
              className="whitespace-pre-wrap leading-relaxed transition-all pr-2"
              style={{
                fontSize: `${settings.fontSize}px`,
                lineHeight: settings.lineHeight || 1.7,
                textAlign: settings.textAlign || 'justify',
                hyphens: 'none',
                WebkitHyphens: 'none',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              {rightPageContent}
            </div>
            <div className="pt-4 text-center text-[10px] font-mono text-slate-400 dark:text-zinc-500">
              {basePage + 1}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleContainerClick}
      className="w-full h-full overflow-y-auto flex justify-center p-4 sm:p-8 select-none"
    >
      <div className={`w-full max-w-2xl rounded-2xl p-6 sm:p-10 shadow-lg border my-auto transition-colors duration-200 ${themeContainerStyle} ${fontClass} ${animationClass}`}>
        <div
          className="whitespace-pre-wrap leading-relaxed transition-all pr-2"
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight || 1.7,
            textAlign: settings.textAlign || 'left',
            hyphens: 'none',
            WebkitHyphens: 'none',
            wordBreak: 'normal',
            overflowWrap: 'break-word',
          }}
        >
          {activeContent}
        </div>
        <div className="pt-4 text-center text-[10px] font-mono text-slate-400 dark:text-zinc-500">
          {currentPage}
        </div>
      </div>
    </div>
  );
};
