import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';
import { useApp } from '../../context/AppContext';

interface EpubReaderProps {
  buffer: ArrayBuffer;
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number, totalPages?: number) => void;
  onToggleControls: () => void;
  onTextExtracted?: (text: string) => void;
  isContinuousMode?: boolean;
}

export const EpubReader: React.FC<EpubReaderProps> = ({
  buffer,
  currentPage,
  totalPages,
  onPageChange,
  onToggleControls,
  onTextExtracted,
  isContinuousMode = false,
}) => {
  const { settings } = useApp();
  const viewerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<any>(null);
  const bookRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const prevPageRef = useRef<number>(currentPage);

  const extractCurrentText = () => {
    if (!onTextExtracted) return;
    try {
      let extracted = '';
      const iframes = viewerRef.current?.querySelectorAll('iframe');
      if (iframes && iframes.length > 0) {
        iframes.forEach(iframe => {
          try {
            const bodyText = iframe.contentDocument?.body?.innerText;
            if (bodyText) extracted += (extracted ? '\n\n' : '') + bodyText;
          } catch {}
        });
      }

      if (!extracted && renditionRef.current?.getContents) {
        const contents = renditionRef.current.getContents() || [];
        contents.forEach((c: any) => {
          const t = c.document?.body?.innerText || c.content?.innerText;
          if (t) extracted += (extracted ? '\n\n' : '') + t;
        });
      }

      if (extracted.trim()) {
        onTextExtracted(extracted.trim());
      }
    } catch (e) {
      console.warn('Could not extract epub text:', e);
    }
  };

  useEffect(() => {
    if (!viewerRef.current) return;

    setLoading(true);
    const book = ePub(buffer.slice(0));
    bookRef.current = book;

    // Theme colors
    let bgColor = '#f7f4ed';
    let textColor = '#1e293b';

    const preset = settings.readingThemePreset || (settings.theme === 'dark' ? 'emerald' : 'day');
    if (preset === 'emerald') {
      bgColor = '#18191c';
      textColor = '#e4e4e7';
    } else if (preset === 'oled') {
      bgColor = '#000000';
      textColor = '#f1f5f9';
    } else if (preset === 'sepia') {
      bgColor = '#ece4d0';
      textColor = '#2c2214';
    } else if (preset === 'sakura') {
      bgColor = '#fdf2f4';
      textColor = '#4c1d2c';
    } else if (preset === 'day') {
      bgColor = '#f7f4ed';
      textColor = '#1e293b';
    }

    let fontFamily = 'Georgia, "Times New Roman", serif';
    if (settings.fontFamily === 'sans') fontFamily = 'system-ui, -apple-system, sans-serif';
    if (settings.fontFamily === 'mono') fontFamily = 'ui-monospace, monospace';

    const rendition = book.renderTo(viewerRef.current, {
      width: '100%',
      height: '100%',
      spread: 'none',
      flow: isContinuousMode ? 'scrolled-doc' : 'paginated',
      manager: isContinuousMode ? 'continuous' : 'default',
    });

    renditionRef.current = rendition;

    // Inject Moon+ Reader style typography hooks (Justified text, indented paragraphs, full width adaptation)
    rendition.hooks.content.register((contents: any) => {
      const doc = contents.document;
      if (!doc) return;
      const head = doc.head;
      const style = doc.createElement('style');
      style.innerHTML = `
        html, body {
          margin: 0 !important;
          padding: 16px 18px 60px 18px !important;
          background-color: ${bgColor} !important;
          color: ${textColor} !important;
          font-family: ${fontFamily} !important;
          font-size: ${settings.fontSize}px !important;
          line-height: ${settings.lineHeight || 1.7} !important;
          text-align: justify !important;
          text-justify: inter-word !important;
          -webkit-hyphens: auto !important;
          hyphens: auto !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        p {
          margin: 0 0 0.85em 0 !important;
          text-indent: 1.25em !important;
          text-align: justify !important;
          line-height: ${settings.lineHeight || 1.7} !important;
        }
        h1, h2, h3, h4 {
          text-align: center !important;
          font-weight: bold !important;
          margin-top: 1.2em !important;
          margin-bottom: 0.8em !important;
          line-height: 1.3 !important;
        }
        img {
          max-width: 100% !important;
          height: auto !important;
          display: block !important;
          margin: 1em auto !important;
        }
      `;
      head.appendChild(style);
    });

    const initialSavedPage = currentPage || 1;
    const isPositionedRef = { current: false };

    book.ready.then(async () => {
      try {
        await book.locations.generate(600);
        if (initialSavedPage > 1 && totalPages && totalPages > 1) {
          const targetFraction = (initialSavedPage - 1) / Math.max(1, totalPages);
          const cfi = book.locations.cfiFromPercentage(targetFraction);
          if (cfi) {
            await rendition.display(cfi);
            setLoading(false);
            setTimeout(() => {
              isPositionedRef.current = true;
              extractCurrentText();
            }, 400);
            return;
          }
        }
      } catch {}

      rendition.display().then(() => {
        setLoading(false);
        setTimeout(() => {
          isPositionedRef.current = true;
          extractCurrentText();
        }, 400);
      });
    });

    // Handle clicks inside the rendered EPUB iframe
    rendition.on('click', (e: MouseEvent) => {
      const width = window.innerWidth;
      const clickX = e.clientX || 0;
      if (clickX < width * 0.25) {
        rendition.prev();
      } else if (clickX > width * 0.75) {
        rendition.next();
      } else {
        onToggleControls();
      }
    });

    // Handle location change
    rendition.on('relocated', (location: any) => {
      if (location && location.start) {
        const displayed = location.start.displayed;
        if (displayed) {
          // Ignore premature page 1 callbacks if user had saved progress
          if (!isPositionedRef.current && initialSavedPage > 1 && displayed.page === 1) {
            return;
          }
          prevPageRef.current = displayed.page;
          onPageChange(displayed.page, displayed.total || totalPages);
        }
      }
      setTimeout(extractCurrentText, 250);
    });

    return () => {
      book.destroy();
    };
  }, [buffer, isContinuousMode, settings.readingThemePreset, settings.theme, settings.fontSize, settings.fontFamily]);

  // Synchronize external page change (from bottom buttons or slider)
  useEffect(() => {
    if (!renditionRef.current) return;
    if (currentPage > prevPageRef.current) {
      renditionRef.current.next();
      prevPageRef.current = currentPage;
      setTimeout(extractCurrentText, 350);
    } else if (currentPage < prevPageRef.current) {
      renditionRef.current.prev();
      prevPageRef.current = currentPage;
      setTimeout(extractCurrentText, 350);
    }
  }, [currentPage]);

  // Apply font size and styling dynamically on changes
  useEffect(() => {
    if (!renditionRef.current) return;
    try {
      renditionRef.current.themes.fontSize(`${settings.fontSize}px`);

      let bgColor = '#f7f4ed';
      let textColor = '#1e293b';
      const preset = settings.readingThemePreset || (settings.theme === 'dark' ? 'emerald' : 'day');
      if (preset === 'emerald') {
        bgColor = '#061a12';
        textColor = '#d1fae5';
      } else if (preset === 'oled') {
        bgColor = '#000000';
        textColor = '#f1f5f9';
      } else if (preset === 'sepia') {
        bgColor = '#ece4d0';
        textColor = '#2c2214';
      } else if (preset === 'sakura') {
        bgColor = '#fdf2f4';
        textColor = '#4c1d2c';
      } else if (preset === 'day') {
        bgColor = '#f7f4ed';
        textColor = '#1e293b';
      }

      renditionRef.current.themes.override('color', textColor);
      renditionRef.current.themes.override('background', bgColor);
    } catch (e) {
      console.warn('Could not apply epub styles:', e);
    }
  }, [settings.fontSize, settings.theme, settings.readingThemePreset]);

  // Outer container color based on preset
  let containerBg = '#f7f4ed';
  const preset = settings.readingThemePreset || (settings.theme === 'dark' ? 'emerald' : 'day');
  if (preset === 'emerald') containerBg = '#061a12';
  if (preset === 'oled') containerBg = '#000000';
  if (preset === 'sepia') containerBg = '#ece4d0';
  if (preset === 'sakura') containerBg = '#fdf2f4';
  if (preset === 'day') containerBg = '#f7f4ed';

  return (
    <div
      className="relative w-full h-full select-none overflow-hidden"
      style={{ backgroundColor: containerBg }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
        </div>
      )}
      <div
        ref={viewerRef}
        className="w-full h-full overflow-y-auto"
        style={{ backgroundColor: containerBg }}
      />
    </div>
  );
};
