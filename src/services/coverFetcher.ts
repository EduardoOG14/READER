// Service to fetch real, official, high-definition book and manga covers
// APIs used: MangaDex (official covers), OpenLibrary (official book covers), Google Books (fallback)
import { httpGetJson, httpGetBlob } from './httpClient';

const coverCache = new Map<string, string>();

/**
 * Normalizes title for search (removes underscores, volume labels, parenthetical notes)
 */
export function normalizeSearchTitle(rawTitle: string): string {
  return rawTitle
    .replace(/\.[^/.]+$/, '') // remove extension
    .replace(/_+/g, ' ') // replace underscores with spaces
    .replace(/\s*\(.*?\)/g, '') // remove (parentheses)
    .replace(/\s*\[.*?\]/g, '') // remove [brackets]
    .replace(/(?:tomo|vol|volume|cap|capítulo|ch)\s*\d+/gi, '') // remove volume/chapter numbers
    .replace(/[^\w\s\u00C0-\u017F'-]/gi, ' ') // keep letters, numbers, accents
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks whether a given cover URL is one of the old mock wireframe / vector dummy covers
 */
export function isMockCover(url?: string): boolean {
  if (!url) return true;
  const lower = url.toLowerCase();
  if (lower.startsWith('data:image/svg')) return true;
  return (
    lower.includes('mangahalftone') ||
    lower.includes('bggrad') ||
    lower.includes('reader archive') ||
    lower.includes('reader biblioteca') ||
    lower.includes('biblioteca reader') ||
    lower.includes('panel de acc') ||
    lower.includes('panel 1') ||
    lower.includes('comienzo de mi historia') ||
    lower.includes('cgrad') ||
    lower.includes('ドドド') ||
    lower.includes('silhouette') ||
    lower.includes('tankobon') ||
    lower.includes('leathergrad')
  );
}

/**
 * Fetches the real official cover URL for any work (Manga, Manhwa, Comic, or Book)
 */
export async function fetchOfficialCoverUrl(
  title: string,
  author?: string,
  category: string = 'manga'
): Promise<string | null> {
  const cleanTitle = normalizeSearchTitle(title);
  const cacheKey = `${cleanTitle}::${author || ''}::${category}`;
  if (coverCache.has(cacheKey)) {
    return coverCache.get(cacheKey)!;
  }

  const isMangaLike = category === 'manga' || category === 'manhwa';

  // 1. For Manga & Manhwa: Primary search via MangaDex
  if (isMangaLike) {
    try {
      const mdUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(cleanTitle)}&limit=5&order[relevance]=desc&includes[]=cover_art`;
      const data = await httpGetJson(mdUrl, { timeoutMs: 12000 });
      const mangaList = data?.data || [];
      for (const manga of mangaList) {
        const coverRel = manga.relationships?.find((r: any) => r.type === 'cover_art');
        if (coverRel?.attributes?.fileName) {
          const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverRel.attributes.fileName}`;
          coverCache.set(cacheKey, coverUrl);
          return coverUrl;
        }
      }
    } catch {
      // Continue to OpenLibrary
    }
  }

  // 2. OpenLibrary search (Superb for Books, Classic Literature, Graphic Novels, Western Comics)
  try {
    const query = author ? `${cleanTitle} ${author}` : cleanTitle;
    const olUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`;
    const data = await httpGetJson(olUrl, { timeoutMs: 12000 });
    const docs = data?.docs || [];
    for (const doc of docs) {
      if (doc.cover_i) {
        const coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
        coverCache.set(cacheKey, coverUrl);
        return coverUrl;
      }
    }
  } catch {
    // Continue to Google Books
  }

  // 3. Google Books API fallback (Excellent for Spanish titles & international comics)
  try {
    const gbQuery = author ? `${cleanTitle} ${author}` : cleanTitle;
    const gbUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(gbQuery)}&maxResults=3`;
    const data = await httpGetJson(gbUrl, { timeoutMs: 10000 });
    const items = data?.items || [];
    for (const item of items) {
      const thumbnail =
        item.volumeInfo?.imageLinks?.extraLarge ||
        item.volumeInfo?.imageLinks?.large ||
        item.volumeInfo?.imageLinks?.medium ||
        item.volumeInfo?.imageLinks?.thumbnail ||
        item.volumeInfo?.imageLinks?.smallThumbnail;
      if (thumbnail) {
        const coverUrl = thumbnail
          .replace(/^http:\/\//i, 'https://')
          .replace('&edge=curl', '')
          .replace('zoom=1', 'zoom=2');
        coverCache.set(cacheKey, coverUrl);
        return coverUrl;
      }
    }
  } catch {
    // Fallback below
  }

  // 4. If MangaDex wasn't tried earlier (e.g. category was comics or manhwa), try MangaDex now
  if (!isMangaLike) {
    try {
      const mdUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(cleanTitle)}&limit=3&order[relevance]=desc&includes[]=cover_art`;
      const data = await httpGetJson(mdUrl, { timeoutMs: 10000 });
      const manga = data?.data?.[0];
      const coverRel = manga?.relationships?.find((r: any) => r.type === 'cover_art');
      if (coverRel?.attributes?.fileName) {
        const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverRel.attributes.fileName}`;
        coverCache.set(cacheKey, coverUrl);
        return coverUrl;
      }
    } catch {}
  }

  return null;
}

/**
 * Downloads a cover image as a Blob so it can be packaged inside EPUB/CBZ archives
 */
export async function fetchCoverBlob(url: string): Promise<Blob | null> {
  try {
    const blob = await httpGetBlob(url, { timeoutMs: 15000 });
    if (blob.size < 500) return null;
    return blob;
  } catch {
    return null;
  }
}

/**
 * Offline Fallback 1: Luxurious classical leather-embossed hardcover with ornate gold filigree
 * NEVER draws stick figures, generic circles, or mock wireframes.
 */
export function createClassicBookCoverSvg(
  title: string,
  author: string,
  _accentColor = '#d4af37'
): string {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeAuthor = (author || 'Clásico Universal').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1350" viewBox="0 0 900 1350">
  <defs>
    <radialGradient id="leatherGrad" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#241410"/>
      <stop offset="60%" stop-color="#140a08"/>
      <stop offset="100%" stop-color="#080403"/>
    </radialGradient>
    <linearGradient id="goldLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="40%" stop-color="#d4af37"/>
      <stop offset="70%" stop-color="#fef9c3"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <pattern id="grain" width="12" height="12" patternUnits="userSpaceOnUse">
      <circle cx="6" cy="6" r="0.8" fill="#ffffff" fill-opacity="0.04"/>
    </pattern>
  </defs>

  <!-- Rich Leather Bookcloth Base -->
  <rect width="900" height="1350" fill="url(#leatherGrad)"/>
  <rect width="900" height="1350" fill="url(#grain)"/>

  <!-- Book Spine Embossed Left Ridge -->
  <rect x="0" y="0" width="40" height="1350" fill="#000000" fill-opacity="0.4"/>
  <line x1="40" y1="0" x2="40" y2="1350" stroke="#fef08a" stroke-opacity="0.25" stroke-width="2"/>
  <line x1="45" y1="0" x2="45" y2="1350" stroke="#000000" stroke-opacity="0.5" stroke-width="2"/>

  <!-- Ornate Double Gilded Border -->
  <rect x="75" y="75" width="750" height="1200" rx="8" fill="none" stroke="url(#goldLeaf)" stroke-width="4"/>
  <rect x="90" y="90" width="720" height="1170" rx="4" fill="none" stroke="url(#goldLeaf)" stroke-width="1.5" stroke-dasharray="14 6"/>
  <rect x="102" y="102" width="696" height="1146" rx="2" fill="none" stroke="url(#goldLeaf)" stroke-width="1" stroke-opacity="0.5"/>

  <!-- Corner Fleurons (Baroque Ornaments) -->
  <g fill="url(#goldLeaf)">
    <!-- Top-Left -->
    <path d="M 85 85 L 125 85 L 125 95 L 95 95 L 95 125 L 85 125 Z"/>
    <circle cx="115" cy="115" r="4"/>
    <!-- Top-Right -->
    <path d="M 815 85 L 775 85 L 775 95 L 805 95 L 805 125 L 815 125 Z"/>
    <circle cx="785" cy="115" r="4"/>
    <!-- Bottom-Left -->
    <path d="M 85 1265 L 125 1265 L 125 1255 L 95 1255 L 95 1225 L 85 1225 Z"/>
    <circle cx="115" cy="1235" r="4"/>
    <!-- Bottom-Right -->
    <path d="M 815 1265 L 775 1265 L 775 1255 L 805 1255 L 805 1225 L 815 1225 Z"/>
    <circle cx="785" cy="1235" r="4"/>
  </g>

  <!-- Classical Header Crest -->
  <g transform="translate(450, 240)">
    <circle cx="0" cy="0" r="32" fill="none" stroke="url(#goldLeaf)" stroke-width="2"/>
    <circle cx="0" cy="0" r="26" fill="none" stroke="url(#goldLeaf)" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="0" y="8" fill="url(#goldLeaf)" font-size="24" font-family="serif" text-anchor="middle">❧</text>
    <line x1="-120" y1="0" x2="-45" y2="0" stroke="url(#goldLeaf)" stroke-width="2"/>
    <line x1="45" y1="0" x2="120" y2="0" stroke="url(#goldLeaf)" stroke-width="2"/>
  </g>

  <text x="450" y="320" fill="url(#goldLeaf)" font-size="16" font-family="'Georgia', serif" font-weight="bold" letter-spacing="6" text-anchor="middle">COLECCIÓN DE OBRAS MAESTRAS</text>

  <!-- Book Title (Gilded Classical Typography) -->
  <g transform="translate(450, 520)">
    <text x="0" y="0" fill="url(#goldLeaf)" font-size="54" font-family="'Georgia', 'Times New Roman', serif" font-weight="900" text-anchor="middle" letter-spacing="2">
      ${safeTitle.length > 25 ? safeTitle.slice(0, 24).toUpperCase() : safeTitle.toUpperCase()}
    </text>
    ${
      safeTitle.length > 25
        ? `<text x="0" y="65" fill="url(#goldLeaf)" font-size="46" font-family="'Georgia', 'Times New Roman', serif" font-weight="900" text-anchor="middle" letter-spacing="2">
            ${safeTitle.slice(24, 52).toUpperCase()}
          </text>`
        : ''
    }
    <line x1="-140" y1="${safeTitle.length > 25 ? 110 : 50}" x2="140" y2="${safeTitle.length > 25 ? 110 : 50}" stroke="url(#goldLeaf)" stroke-width="2"/>
    <polygon points="0,${safeTitle.length > 25 ? 104 : 44} 6,${safeTitle.length > 25 ? 110 : 50} 0,${safeTitle.length > 25 ? 116 : 56} -6,${safeTitle.length > 25 ? 110 : 50}" fill="url(#goldLeaf)"/>
  </g>

  <!-- Author Name in Italic Serif -->
  <text x="450" y="${safeTitle.length > 25 ? 740 : 680}" fill="#f8fafc" font-size="28" font-family="'Georgia', serif" font-style="italic" text-anchor="middle" letter-spacing="1">
    ${safeAuthor}
  </text>
  <text x="450" y="${safeTitle.length > 25 ? 785 : 725}" fill="#cbd5e1" font-size="16" font-family="'Georgia', serif" text-anchor="middle" letter-spacing="3">
    EDICIÓN ÍNTEGRA EN ESPAÑOL
  </text>

  <!-- Bottom Seal -->
  <g transform="translate(450, 1080)">
    <line x1="-90" y1="0" x2="90" y2="0" stroke="url(#goldLeaf)" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="20" fill="#140a08" stroke="url(#goldLeaf)" stroke-width="2"/>
    <text x="0" y="6" fill="url(#goldLeaf)" font-size="14" font-family="serif" text-anchor="middle">✦</text>
    <text x="0" y="45" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" letter-spacing="4" text-anchor="middle">BIBLIOTECA READER</text>
  </g>
</svg>`;
}

/**
 * Offline Fallback 2: High-end Japanese Tankobon Volume 1 Cover
 * Clean, modern editorial graphic design.
 * NEVER draws stick figures, diagonal blue lines, barcodes, or ドドド!!
 */
export function createMangaTankobonCoverSvg(
  title: string,
  author: string,
  category: 'manga' | 'manhwa' | 'comics' = 'manga'
): string {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeAuthor = (author || 'Editorial').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const tag =
    category === 'manhwa'
      ? 'WEBTOON EDITION'
      : category === 'comics'
      ? 'GRAPHIC NOVEL'
      : 'MANGA TANKOBON';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1350" viewBox="0 0 900 1350">
  <defs>
    <linearGradient id="tankobonBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="45%" stop-color="#09090b"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <pattern id="cleanGrid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Modern Dark Editorial Canvas -->
  <rect width="900" height="1350" fill="url(#tankobonBg)"/>
  <rect width="900" height="1350" fill="url(#cleanGrid)"/>

  <!-- Framing Accents -->
  <rect x="35" y="35" width="830" height="1280" rx="16" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2"/>

  <!-- Top Spine / Badge Header -->
  <g transform="translate(60, 65)">
    <rect x="0" y="0" width="180" height="32" rx="6" fill="#f43f5e"/>
    <text x="90" y="21" fill="#ffffff" font-size="13" font-family="system-ui, -apple-system, sans-serif" font-weight="900" letter-spacing="2" text-anchor="middle">${tag}</text>
  </g>

  <!-- Volume Badge -->
  <g transform="translate(760, 80)">
    <circle cx="0" cy="0" r="36" fill="#09090b" stroke="#f43f5e" stroke-width="3"/>
    <text x="0" y="-5" fill="#a1a1aa" font-size="11" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">VOL.</text>
    <text x="0" y="20" fill="#ffffff" font-size="24" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle">01</text>
  </g>

  <!-- Subtle Japanese Kanji Calligraphy Backdrop -->
  <text x="450" y="580" fill="#ffffff" fill-opacity="0.03" font-size="340" font-family="sans-serif" font-weight="900" text-anchor="middle">巻壱</text>

  <!-- Geometric Modern Centerpiece -->
  <g transform="translate(450, 480)">
    <circle cx="0" cy="0" r="220" fill="none" stroke="url(#neonGlow)" stroke-width="3" stroke-opacity="0.4"/>
    <circle cx="0" cy="0" r="190" fill="#09090b" fill-opacity="0.8" stroke="#ffffff" stroke-width="1" stroke-opacity="0.15"/>
    <circle cx="0" cy="0" r="140" fill="none" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="8 6" stroke-opacity="0.6"/>
    
    <!-- Stylized Monogram Crest -->
    <text x="0" y="30" fill="url(#neonGlow)" font-size="110" font-family="system-ui, sans-serif" font-weight="900" text-anchor="middle">
      ${safeTitle.slice(0, 1).toUpperCase()}
    </text>
  </g>

  <!-- Main Title Area -->
  <g transform="translate(450, 880)">
    <text x="0" y="0" fill="#ffffff" font-size="52" font-family="system-ui, -apple-system, sans-serif" font-weight="900" letter-spacing="2" text-anchor="middle">
      ${safeTitle.length > 20 ? safeTitle.slice(0, 19).toUpperCase() : safeTitle.toUpperCase()}
    </text>
    ${
      safeTitle.length > 20
        ? `<text x="0" y="60" fill="#ffffff" font-size="44" font-family="system-ui, -apple-system, sans-serif" font-weight="900" letter-spacing="2" text-anchor="middle">
            ${safeTitle.slice(19, 44).toUpperCase()}
          </text>`
        : ''
    }
    <text x="0" y="${safeTitle.length > 20 ? 115 : 55}" fill="#a1a1aa" font-size="22" font-family="serif" font-style="italic" text-anchor="middle">
      Historia y Arte: ${safeAuthor}
    </text>
  </g>

  <!-- Bottom Publisher Obi Banner -->
  <g transform="translate(45, 1120)">
    <rect x="0" y="0" width="810" height="150" rx="12" fill="#09090b" stroke="#27272a" stroke-width="2"/>
    <rect x="0" y="0" width="810" height="4" fill="url(#neonGlow)"/>
    
    <text x="405" y="55" fill="#f43f5e" font-size="15" font-family="system-ui, sans-serif" font-weight="900" letter-spacing="4" text-anchor="middle">
      EDICIÓN OFICIAL EN ESPAÑOL
    </text>
    <text x="405" y="95" fill="#e4e4e7" font-size="18" font-family="'Georgia', serif" font-style="italic" text-anchor="middle">
      Lectura integral sin conexión • Máxima fidelidad de imagen
    </text>
  </g>
</svg>`;
}
