import React, { useState, useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';
import type { CatalogItem } from '../services/catalog/types';
import { fetchOfficialCoverUrl, isMockCover } from '../services/coverFetcher';

interface CatalogCoverImageProps {
  item: CatalogItem;
  ownedCoverUrl?: string;
}

export const CatalogCoverImage: React.FC<CatalogCoverImageProps> = ({ item, ownedCoverUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(() => {
    // 1. If user already owns the book with a real cover, prioritize it
    if (ownedCoverUrl && !isMockCover(ownedCoverUrl)) {
      return ownedCoverUrl;
    }
    // 2. If item explicitly provides a coverUrl
    if (item.coverUrl && !isMockCover(item.coverUrl)) {
      return item.coverUrl;
    }
    // 3. Check persistent localStorage cache
    try {
      const cached = localStorage.getItem(`cat_cov_${item.id}`);
      if (cached && !isMockCover(cached)) {
        return cached;
      }
    } catch {}
    return null;
  });

  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lazy load official cover when visible
  useEffect(() => {
    if (imgUrl && !hasError) return;

    let isMounted = true;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          observer.disconnect();

          fetchOfficialCoverUrl(item.title, item.author, item.category)
            .then(url => {
              if (isMounted && url && !isMockCover(url)) {
                setImgUrl(url);
                try {
                  localStorage.setItem(`cat_cov_${item.id}`, url);
                } catch {}
              }
            })
            .catch(() => {});
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(el);
    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [item.id, item.title, item.author, item.category, imgUrl, hasError]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden select-none"
      style={{
        background: `linear-gradient(135deg, ${item.coverGradient.from}, ${item.coverGradient.to})`,
      }}
    >
      {/* Fallback styling with book icon & subtle typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-white/80">
        <BookOpen className="w-5 h-5 opacity-60 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wider line-clamp-2 text-white/90 drop-shadow-xs">
          {item.title}
        </span>
      </div>

      {/* Real Official Cover Image */}
      {imgUrl && !hasError && (
        <img
          src={imgUrl}
          alt={item.title}
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      )}

      {/* Subtle physical book spine effect (left edge shadow) */}
      <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
      {/* Subtle border highlight */}
      <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
    </div>
  );
};
