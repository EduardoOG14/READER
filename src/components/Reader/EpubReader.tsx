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

// Helper to generate dynamic Moon+ Reader typography CSS
function getTypographyCss(settings: any) {
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
  if (settings.fontFamily === 'opendyslexic') fontFamily = 'OpenDyslexic, sans-serif';

  const fontSize = settings.fontSize || 18;
  const lineHeight = settings.lineHeight || 1.75;
  const textAlign = settings.textAlign || 'justify';

  return `
    html, body {
      margin: 0 !important;
      padding: 24px 28px 90px 24px !important;
      box-sizing: border-box !important;
      background-color: ${bgColor} !important;
      color: ${textColor} !important;
      font-family: ${fontFamily} !important;
      font-size: ${fontSize}px !important;
      line-height: ${lineHeight} !important;
      text-align: ${textAlign} !important;
      text-justify: inter-word !important;
      -webkit-hyphens: none !important;
      -moz-hyphens: none !important;
      -ms-hyphens: none !important;
      hyphens: none !important;
      word-break: normal !important;
      overflow-wrap: break-word !important;
      word-wrap: break-word !important;
    }
    p {
      margin: 0 0 0.9em 0 !important;
      text-indent: 1.25em !important;
      text-align: ${textAlign} !important;
      line-height: ${lineHeight} !important;
      font-size: ${fontSize}px !important;
      padding-right: 8px !important;
      -webkit-hyphens: none !important;
      -moz-hyphens: none !important;
      -ms-hyphens: none !important;
      hyphens: none !important;
      word-break: normal !important;
      overflow-wrap: break-word !important;
    }
    h1, h2, h3, h4 {
      text-align: center !important;
      font-weight: bold !important;
      color: ${textColor} !important;
      margin-top: 1.2em !important;
      margin-bottom: 0.8em !important;
      line-height: 1.3 !important;
      -webkit-hyphens: none !important;
      hyphens: none !important;
    }
    img {
      max-width: 100% !important;
      height: auto !important;
      display: block !important;
      margin: 1em auto !important;
    }
  `;
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
            const body = iframe.contentDocument?.body;
            const bodyText = body?.innerText || body?.textContent;
            if (bodyText) extracted += (extracted ? '\n\n' : '') + bodyText;
          } catch {}
        });
      }

      if (!extracted && renditionRef.current?.getContents) {
        const contents = renditionRef.current.getContents() || [];
        contents.forEach((c: any) => {
          const body = c.document?.body;
          const t = body?.innerText || body?.textContent || c.content?.innerText || c.content?.textContent;
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
      if (!doc || !doc.head) return;
      let style = doc.getElementById('reader-typography-style') as HTMLStyleElement;
      if (!style) {
        const newStyle = doc.createElement('style');
        newStyle.id = 'reader-typography-style';
        doc.head.appendChild(newStyle);
        style = newStyle;
      }
      style.innerHTML = getTypographyCss(settings);
      setTimeout(extractCurrentText, 200);
    });

    rendition.on('rendered', () => {
      setTimeout(extractCurrentText, 150);
    });

    const initialSavedPage = currentPage || 1;
    const isPositionedRef = { current: false };

    book.ready.then(async () => {
      try {
        await book.locations.generate(600);
        const locsTotal = book.locations.length() || (book.locations as any).total || 0;
        const currentTargetTotal = locsTotal > 0 ? locsTotal : (totalPages && totalPages > 1 ? totalPages : 100);

        if (initialSavedPage > 1) {
          const targetFraction = (initialSavedPage - 1) / Math.max(1, currentTargetTotal);
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

    // Handle location change across the entire EPUB book
    rendition.on('relocated', (location: any) => {
      if (location && location.start) {
        const spineItems = (book as any).spine?.items || [];
        const totalSpine = spineItems.length || 1;
        const currentSpineIndex = typeof location.start?.index === 'number' ? location.start.index : 0;
        const hasLocations = book.locations && typeof book.locations.percentageFromCfi === 'function' && book.locations.length() > 0;
        const locationsTotal = hasLocations ? (book.locations.length() || (book.locations as any).total || 0) : 0;

        // Use book.locations.total if available, or preserve totalPages if > 1, or fallback to total spine items
        const globalTotal = locationsTotal > 0
          ? locationsTotal
          : (totalPages && totalPages > 1 ? totalPages : Math.max(1, totalSpine));

        // Calculate progress across the ENTIRE book (0.0 to 1.0)
        let progress = 0;
        if (hasLocations && location.start?.cfi) {
          const p = book.locations.percentageFromCfi(location.start.cfi);
          if (typeof p === 'number' && !isNaN(p)) {
            progress = Math.max(0, Math.min(1, p));
          }
        } else if (totalSpine > 0) {
          const displayed = location.start?.displayed;
          const chapterFrac = displayed && displayed.total > 0 ? (displayed.page - 1) / displayed.total : 0;
          progress = Math.max(0, Math.min(1, (currentSpineIndex + chapterFrac) / totalSpine));
        }

        // Detect if truly at the end of the ENTIRE book (must be the last spine item AND at the end)
        const isLastSpine = currentSpineIndex >= totalSpine - 1;
        const isTrulyAtEnd = isLastSpine && (!!location.atEnd || progress >= 0.995);

        let calculatedPage = Math.max(1, Math.min(globalTotal, Math.round(progress * globalTotal) || 1));

        // CRITICAL PROTECTION: Never allow mid-book chapter ends to reach globalTotal!
        // Only if truly at the end of the whole book can calculatedPage equal globalTotal.
        if (!isTrulyAtEnd && calculatedPage >= globalTotal) {
          calculatedPage = Math.max(1, globalTotal - 1);
        } else if (isTrulyAtEnd) {
          calculatedPage = globalTotal;
        }

        // Ignore premature page 1 resets on load if the user had saved progress
        if (!isPositionedRef.current && initialSavedPage > 1 && calculatedPage === 1) {
          return;
        }

        prevPageRef.current = calculatedPage;
        onPageChange(calculatedPage, globalTotal);
      }
      setTimeout(extractCurrentText, 250);
    });

    return () => {
      book.destroy();
    };
  }, [buffer, isContinuousMode]);

  // Synchronize external page change (from bottom buttons or slider)
  useEffect(() => {
    if (!renditionRef.current) return;
    if (currentPage === prevPageRef.current) return;

    const diff = currentPage - prevPageRef.current;
    prevPageRef.current = currentPage;

    if (Math.abs(diff) === 1) {
      if (diff > 0) {
        renditionRef.current.next();
      } else {
        renditionRef.current.prev();
      }
      setTimeout(extractCurrentText, 350);
    } else {
      // Large jump via slider or chapter jump
      const book = bookRef.current;
      if (book && book.locations && book.locations.length() > 0) {
        const total = totalPages || book.locations.total || 100;
        const frac = Math.max(0, Math.min(1, (currentPage - 1) / Math.max(1, total)));
        const targetCfi = book.locations.cfiFromPercentage(frac);
        if (targetCfi) {
          renditionRef.current.display(targetCfi);
          setTimeout(extractCurrentText, 350);
          return;
        }
      }
      if (diff > 0) renditionRef.current.next();
      else renditionRef.current.prev();
      setTimeout(extractCurrentText, 350);
    }
  }, [currentPage, totalPages]);

  // Apply font size and styling dynamically on changes without destroying the book
  useEffect(() => {
    if (!renditionRef.current) return;
    try {
      const css = getTypographyCss(settings);
      renditionRef.current.themes.fontSize(`${settings.fontSize || 18}px`);

      // Update all active iframe documents directly
      const contentsList = renditionRef.current.getContents?.() || [];
      contentsList.forEach((contents: any) => {
        const doc = contents?.document;
        if (!doc || !doc.head) return;
        let styleEl = doc.getElementById('reader-typography-style') as HTMLStyleElement;
        if (!styleEl) {
          const newStyle = doc.createElement('style');
          newStyle.id = 'reader-typography-style';
          doc.head.appendChild(newStyle);
          styleEl = newStyle;
        }
        styleEl.innerHTML = css;
        if (doc.body) {
          doc.body.style.fontSize = `${settings.fontSize || 18}px`;
        }
      });
    } catch (e) {
      console.warn('Could not apply epub styles:', e);
    }
  }, [
    settings.fontSize,
    settings.fontFamily,
    settings.lineHeight,
    settings.textAlign,
    settings.theme,
    settings.readingThemePreset,
  ]);

  // Outer container color based on preset
  let containerBg = '#f7f4ed';
  const preset = settings.readingThemePreset || (settings.theme === 'dark' ? 'emerald' : 'day');
  if (preset === 'emerald') containerBg = '#18191c';
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
