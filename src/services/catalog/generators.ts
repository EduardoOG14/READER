import JSZip from 'jszip';
import type { ComicPanelData, BookChapterData } from './types';

// ==========================================
// 1. EPUB Book Vector Cover Generator
// ==========================================
export function createCoverSvg(
  title: string,
  author: string,
  tag: string,
  fromColor: string,
  toColor: string,
  accentColor: string
): string {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeAuthor = author.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
    <defs>
      <linearGradient id="cgrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${fromColor}"/>
        <stop offset="100%" stop-color="${toColor}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="600" rx="12" fill="url(#cgrad)"/>
    <rect x="20" y="20" width="360" height="560" rx="8" fill="none" stroke="${accentColor}" stroke-opacity="0.35" stroke-width="2"/>
    <rect x="30" y="30" width="340" height="540" rx="6" fill="none" stroke="${accentColor}" stroke-opacity="0.15" stroke-width="1"/>
    
    <g transform="translate(35, 60)">
      <rect x="0" y="0" width="130" height="26" rx="13" fill="${accentColor}" fill-opacity="0.25"/>
      <text x="65" y="17" fill="#ffffff" font-size="11" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="1.5">${tag.toUpperCase()}</text>
    </g>

    <text x="35" y="170" fill="#ffffff" font-size="28" font-family="system-ui, -apple-system, sans-serif" font-weight="900">${safeTitle.slice(0, 24)}</text>
    ${safeTitle.length > 24 ? `<text x="35" y="205" fill="#ffffff" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="900">${safeTitle.slice(24, 50)}</text>` : ''}
    
    <line x1="35" y1="${safeTitle.length > 24 ? 225 : 195}" x2="110" y2="${safeTitle.length > 24 ? 225 : 195}" stroke="${accentColor}" stroke-width="3" stroke-linecap="round"/>
    
    <text x="35" y="${safeTitle.length > 24 ? 260 : 230}" fill="#e2e8f0" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">${safeAuthor}</text>
    <text x="35" y="${safeTitle.length > 24 ? 285 : 255}" fill="#94a3b8" font-size="12" font-family="system-ui, -apple-system, sans-serif">Edición íntegra en Español</text>

    <circle cx="200" cy="420" r="70" fill="${accentColor}" fill-opacity="0.12" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="2"/>
    <text x="200" y="426" fill="#ffffff" font-size="14" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="middle">READER</text>
    <text x="200" y="444" fill="#cbd5e1" font-size="10" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">BIBLIOTECA</text>

    <text x="200" y="550" fill="#94a3b8" font-size="11" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">100% en Español • Lectura Offline</text>
  </svg>`;
}

// ==========================================
// 2. Manga/Comic Tankobon Volume 1 Cover Generator
// ==========================================
export function createMangaCoverSvg(
  title: string,
  author: string,
  category: 'manga' | 'manhwa' | 'comics' = 'manga',
  fromColor = '#0f172a',
  toColor = '#1e1b4b',
  accentColor = '#e11d48'
): string {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeAuthor = author.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const tag =
    category === 'manhwa'
      ? 'WEBTOON ORIGINAL'
      : category === 'comics'
      ? 'COMIC BOOK ARCHIVE'
      : 'SHONEN JUMP MANGA';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1350" viewBox="0 0 900 1350">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${fromColor}"/>
      <stop offset="55%" stop-color="${toColor}"/>
      <stop offset="100%" stop-color="#050608"/>
    </linearGradient>
    <pattern id="mangaHalftone" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="8" cy="8" r="2.5" fill="${accentColor}" fill-opacity="0.14"/>
    </pattern>
    <linearGradient id="goldTitle" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
  </defs>

  <!-- Background Base & Halftone -->
  <rect width="900" height="1350" fill="url(#bgGrad)"/>
  <rect width="900" height="1350" fill="url(#mangaHalftone)"/>

  <!-- Manga Outer Frame Borders -->
  <rect x="25" y="25" width="850" height="1300" rx="16" fill="none" stroke="${accentColor}" stroke-opacity="0.55" stroke-width="3"/>
  <rect x="36" y="36" width="828" height="1278" rx="12" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5"/>

  <!-- Top Category Banner -->
  <path d="M 36 36 L 380 36 L 330 96 L 36 96 Z" fill="${accentColor}"/>
  <text x="60" y="78" fill="#ffffff" font-size="22" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" letter-spacing="2">${tag}</text>

  <!-- Volume Badge -->
  <circle cx="790" cy="88" r="42" fill="#090a0f" stroke="${accentColor}" stroke-width="3"/>
  <text x="790" y="80" fill="#94a3b8" font-size="12" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">VOL.</text>
  <text x="790" y="110" fill="#ffffff" font-size="28" font-family="'Impact', sans-serif" font-weight="bold" text-anchor="middle">01</text>

  <!-- Japanese Kanji Watermark -->
  <text x="450" y="440" fill="#ffffff" fill-opacity="0.04" font-size="260" font-family="sans-serif" font-weight="900" text-anchor="middle">漫画</text>

  <!-- Dynamic Center Manga Art Illustration -->
  <g transform="translate(100, 240)">
    <!-- Speed Aura -->
    <circle cx="350" cy="300" r="260" fill="${accentColor}" fill-opacity="0.09"/>
    <circle cx="350" cy="300" r="180" fill="#ffffff" fill-opacity="0.04"/>
    
    <!-- Manga Speed Rays -->
    <path d="M 350 300 L 80 50 M 350 300 L 620 50 M 350 300 L 50 350 M 350 300 L 650 350 M 350 300 L 120 560 M 350 300 L 580 560" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2"/>

    <!-- Dynamic Hero Silhouette -->
    <path d="M 350 140 C 370 140 385 160 385 185 C 385 200 375 215 360 225 L 390 290 L 460 320 L 450 340 L 380 320 L 370 410 L 420 510 L 380 520 L 350 440 L 320 520 L 280 510 L 330 410 L 320 320 L 250 340 L 240 320 L 310 290 L 340 225 C 325 215 315 200 315 185 C 315 160 330 140 350 140 Z" fill="#090a0f" stroke="${accentColor}" stroke-width="3" stroke-linejoin="round"/>
    
    <!-- Action Energy Blade / Blast -->
    <line x1="200" y1="180" x2="490" y2="390" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>

    <!-- Japanese Sound Effect Onomatopoeia -->
    <text x="520" y="220" fill="${accentColor}" font-size="70" font-family="'Impact', sans-serif" font-weight="900" stroke="#ffffff" stroke-width="2.5" transform="rotate(12 520 220)">ドドド!!</text>
  </g>

  <!-- Title & Author Card -->
  <rect x="50" y="850" width="800" height="220" rx="16" fill="#06070a" fill-opacity="0.92" stroke="${accentColor}" stroke-opacity="0.6" stroke-width="2"/>
  <text x="450" y="920" fill="url(#goldTitle)" font-size="44" font-family="system-ui, -apple-system, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1.5">${safeTitle.toUpperCase()}</text>
  <text x="450" y="975" fill="#e2e8f0" font-size="22" font-family="serif" font-style="italic" text-anchor="middle">Obra de ${safeAuthor}</text>
  
  <rect x="250" y="1010" width="400" height="32" rx="16" fill="${accentColor}" fill-opacity="0.2" stroke="${accentColor}" stroke-width="1.5"/>
  <text x="450" y="1032" fill="#f8fafc" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="2">EDICIÓN EN ESPAÑOL • TOMO 1</text>

  <!-- Bottom Barcode & Publisher -->
  <g transform="translate(80, 1150)">
    <rect x="0" y="0" width="200" height="60" fill="#ffffff" rx="4"/>
    <path d="M 12 10 L 12 50 M 18 10 L 18 50 M 26 10 L 26 50 M 32 10 L 32 50 M 42 10 L 42 50 M 52 10 L 52 50 M 58 10 L 58 50 M 68 10 L 68 50 M 78 10 L 78 50 M 86 10 L 86 50 M 94 10 L 94 50 M 106 10 L 106 50 M 118 10 L 118 50 M 128 10 L 128 50 M 138 10 L 138 50 M 148 10 L 148 50 M 158 10 L 158 50 M 168 10 L 168 50 M 178 10 L 178 50 M 188 10 L 188 50" stroke="#000000" stroke-width="3"/>
    
    <rect x="520" y="8" width="220" height="44" rx="8" fill="#1e1f2d" stroke="#64748b" stroke-width="1.5"/>
    <text x="630" y="36" fill="#f1f5f9" font-size="14" font-family="'Impact', sans-serif" letter-spacing="2" text-anchor="middle">READER ARCHIVE</text>
  </g>
</svg>`;
}

// ==========================================
// 3. Manga Color Splash / Portadilla Generator
// ==========================================
export function createMangaSplashPageSvg(
  title: string,
  author: string,
  category: 'manga' | 'manhwa' | 'comics' = 'manga',
  description?: string
): string {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeAuthor = author.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const categoryLabel = category === 'manhwa' ? 'WEBTOON' : category === 'comics' ? 'CÓMIC' : 'MANGA';
  const quote = description
    ? description.slice(0, 160)
    : `Una obra cumbre de ${safeAuthor}, adaptada íntegramente al español para disfrutar en cualquier momento y lugar.`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1350" viewBox="0 0 900 1350">
  <defs>
    <radialGradient id="splashAura" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="60%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </radialGradient>
    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="2" fill="#6366f1" fill-opacity="0.12"/>
    </pattern>
  </defs>

  <rect width="900" height="1350" fill="url(#splashAura)"/>
  <rect width="900" height="1350" fill="url(#dots)"/>

  <!-- Border Frame -->
  <rect x="35" y="35" width="830" height="1280" rx="12" fill="none" stroke="#e2e8f0" stroke-opacity="0.25" stroke-width="2"/>

  <!-- Top Series Kanji Header -->
  <text x="450" y="160" fill="#ffffff" fill-opacity="0.08" font-size="140" font-family="sans-serif" font-weight="900" text-anchor="middle">第一章</text>

  <g transform="translate(100, 240)">
    <!-- Chapter Banner -->
    <rect x="150" y="0" width="400" height="40" rx="20" fill="#dc2626"/>
    <text x="350" y="26" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="3">CAPÍTULO 1 • EL COMIENZO</text>

    <!-- Main Stylized Title -->
    <text x="350" y="130" fill="#ffffff" font-size="52" font-family="system-ui, -apple-system, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="2">${safeTitle.toUpperCase()}</text>
    <text x="350" y="175" fill="#38bdf8" font-size="22" font-family="serif" font-style="italic" text-anchor="middle">Guion y Dibujo: ${safeAuthor}</text>

    <!-- Inked Manga Slash Effect -->
    <path d="M 50 320 L 650 320" stroke="#f43f5e" stroke-width="4" stroke-linecap="round"/>
    <line x1="80" y1="330" x2="620" y2="330" stroke="#cbd5e1" stroke-width="1.5" stroke-opacity="0.4"/>

    <!-- Dramatic Opening Synopsis Quote -->
    <rect x="40" y="380" width="620" height="240" rx="16" fill="#030712" fill-opacity="0.8" stroke="#334155" stroke-width="1.5"/>
    <text x="70" y="440" fill="#f8fafc" font-size="20" font-family="'Georgia', serif" font-style="italic">«${quote.slice(0, 55)}</text>
    <text x="70" y="475" fill="#f8fafc" font-size="20" font-family="'Georgia', serif" font-style="italic">${quote.slice(55, 110)}</text>
    <text x="70" y="510" fill="#f8fafc" font-size="20" font-family="'Georgia', serif" font-style="italic">${quote.slice(110, 160)}...»</text>
    
    <text x="70" y="580" fill="#94a3b8" font-size="14" font-family="sans-serif">Traducción oficial al castellano • Colección READER</text>
  </g>

  <!-- Big Japanese Impact Sound -->
  <text x="450" y="1060" fill="#ef4444" font-size="80" font-family="'Impact', sans-serif" font-weight="900" stroke="#ffffff" stroke-width="3" text-anchor="middle">ズバッ!!</text>

  <!-- Bottom Page indicator -->
  <text x="450" y="1270" fill="#64748b" font-size="14" font-family="sans-serif" text-anchor="middle">Página de Apertura • READER ${categoryLabel}</text>
</svg>`;
}

// ==========================================
// 4. Authentic Manga Story Page Generator
// ==========================================
export function createMangaStoryPageSvg(
  title: string,
  author: string,
  pageNum: number,
  totalPages: number,
  chapterTitle: string,
  sceneName: string,
  dialogue: string,
  narrativeText: string,
  category: 'manga' | 'manhwa' | 'comics' = 'manga'
): string {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeAuthor = author.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeScene = sceneName.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeChap = chapterTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeDia = dialogue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeNar = narrativeText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const catShort = category === 'manhwa' ? 'Webtoon' : category === 'comics' ? 'Cómic' : 'Manga';

  const soundFx =
    pageNum % 3 === 1
      ? 'ゴゴゴ!!'
      : pageNum % 3 === 2
      ? 'ドドン!!'
      : 'ズバッ!!';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1350" viewBox="0 0 900 1350">
  <defs>
    <pattern id="halftone_${pageNum}" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="1.5" fill="#94a3b8" fill-opacity="0.32"/>
    </pattern>
    <linearGradient id="pGrad_${pageNum}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
  </defs>

  <!-- Outer Traditional Manga Margin -->
  <rect width="900" height="1350" fill="#090a0f"/>

  <!-- PANEL 1: Top Wide Cinematic Establishing Shot -->
  <g transform="translate(30, 30)">
    <rect width="840" height="420" fill="url(#pGrad_${pageNum})" stroke="#1e293b" stroke-width="4"/>
    <rect x="0" y="0" width="840" height="420" fill="url(#halftone_${pageNum})"/>

    <!-- Speedlines / Horizon Sky -->
    <path d="M 0 0 L 840 420 M 200 0 L 840 280 M 0 200 L 600 420" stroke="#000000" stroke-opacity="0.08" stroke-width="3"/>

    <!-- Top Scene Narrative Caption Box -->
    <rect x="25" y="25" width="480" height="70" rx="4" fill="#000000" fill-opacity="0.85"/>
    <text x="45" y="55" fill="#f8fafc" font-size="16" font-family="'Georgia', serif" font-style="italic">«${safeNar.slice(0, 52)}...»</text>
    <text x="45" y="78" fill="#94a3b8" font-size="12" font-family="sans-serif">${safeChap} • ${safeScene} • Edición Oficial</text>

    <!-- Japanese Dramatic Sound Effect -->
    <text x="680" y="240" fill="#000000" font-size="95" font-family="'Impact', sans-serif" font-weight="900" stroke="#ffffff" stroke-width="4" transform="rotate(-6 680 240)">${soundFx}</text>

    <!-- Character Silhouette in Panel 1 -->
    <path d="M 380 220 C 390 220 400 230 400 245 C 400 255 395 265 385 270 L 400 310 L 440 330 L 435 345 L 390 330 L 385 410 L 415 420 L 375 420 L 365 360 L 350 420 L 320 420 L 350 330 L 310 345 L 305 330 L 345 310 L 360 270 C 350 265 345 255 345 245 C 345 230 355 220 380 220 Z" fill="#0f172a"/>
  </g>

  <!-- PANEL 2: Bottom-Left Dynamic Action Shot -->
  <g transform="translate(30, 470)">
    <rect width="405" height="790" fill="#ffffff" stroke="#1e293b" stroke-width="4"/>
    
    <!-- Manga Action Radiating Burst Lines -->
    <path d="M 200 400 L 0 0 M 200 400 L 405 0 M 200 400 L 0 790 M 200 400 L 405 790 M 200 400 L 0 400 M 200 400 L 405 400" stroke="#000000" stroke-opacity="0.12" stroke-width="2"/>
    
    <!-- Big Japanese Climax Sound Effect -->
    <text x="140" y="280" fill="#dc2626" font-size="110" font-family="'Impact', sans-serif" font-weight="900" stroke="#ffffff" stroke-width="5" transform="rotate(8 140 280)">ドドン!!</text>

    <!-- Speech Bubble with Directional Pointer Tail -->
    <rect x="35" y="460" width="335" height="170" rx="24" fill="#ffffff" stroke="#000000" stroke-width="3"/>
    <polygon points="120,630 145,630 110,670" fill="#ffffff" stroke="#000000" stroke-width="3"/>
    <polygon points="121,626 144,626 111,666" fill="#ffffff"/>
    
    <text x="60" y="515" fill="#000000" font-size="20" font-family="system-ui, sans-serif" font-weight="bold">${safeDia.slice(0, 24)}</text>
    ${safeDia.length > 24 ? `<text x="60" y="550" fill="#1e293b" font-size="18" font-family="system-ui, sans-serif" font-weight="600">${safeDia.slice(24, 60)}</text>` : ''}
    ${safeDia.length > 60 ? `<text x="60" y="582" fill="#334155" font-size="16" font-family="system-ui, sans-serif">${safeDia.slice(60, 100)}</text>` : ''}
  </g>

  <!-- PANEL 3: Bottom-Right Climax / Narrative Resolution Shot -->
  <g transform="translate(455, 470)">
    <rect width="415" height="790" fill="#0f172a" stroke="#1e293b" stroke-width="4"/>
    <rect x="0" y="0" width="415" height="790" fill="url(#halftone_${pageNum})"/>

    <!-- Inked Energy Blade Cut -->
    <path d="M 30 720 L 380 80" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
    <path d="M 40 730 L 390 90" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>

    <!-- Japanese Shonen Sound Effect -->
    <text x="240" y="420" fill="#ffffff" font-size="80" font-family="'Impact', sans-serif" font-weight="900" stroke="#000000" stroke-width="4" transform="rotate(-15 240 420)">ズバッ!!</text>

    <!-- Narrative Monologue Box -->
    <rect x="30" y="520" width="355" height="190" rx="8" fill="#000000" fill-opacity="0.9" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="50" y="565" fill="#f8fafc" font-size="17" font-family="'Georgia', serif" font-style="italic">«En este mundo, cada paso</text>
    <text x="50" y="598" fill="#f8fafc" font-size="17" font-family="'Georgia', serif" font-style="italic">determina tu destino.»</text>
    <text x="50" y="640" fill="#38bdf8" font-size="14" font-family="sans-serif" font-weight="bold">¡La determinación no vacilará jamás!</text>
  </g>

  <!-- Footer Pagination -->
  <rect x="30" y="1285" width="840" height="40" fill="#090a0f"/>
  <text x="450" y="1312" fill="#64748b" font-size="14" font-family="system-ui, monospace" text-anchor="middle">${safeTitle} • ${safeAuthor} • ${catShort} • Pág. ${pageNum} / ${totalPages}</text>
</svg>`;
}

// ==========================================
// 5. Download Progress Notification System
// ==========================================
type DownloadProgressListener = (title: string, message: string, percent: number) => void;
const downloadProgressListeners = new Set<DownloadProgressListener>();

export function subscribeDownloadProgress(listener: DownloadProgressListener): () => void {
  downloadProgressListeners.add(listener);
  return () => downloadProgressListeners.delete(listener);
}

export function notifyDownloadProgress(title: string, message: string, percent: number) {
  downloadProgressListeners.forEach(listener => {
    try {
      listener(title, message, percent);
    } catch {}
  });
}

// ==========================================
// 6. MangaDex Online Fetcher (Full Series & Chapters)
// ==========================================
export async function fetchMangaDexOnlineData(title: string): Promise<{
  coverBlob?: Blob;
  pages?: { name: string; blob: Blob }[];
}> {
  try {
    notifyDownloadProgress(title, 'Buscando obra en MangaDex...', 10);
    const searchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(title)}&limit=1&includes[]=cover_art`;
    const searchRes = await fetch(searchUrl, {
      signal: AbortSignal.timeout(5000),
    });
    if (!searchRes.ok) return {};
    const searchData = await searchRes.json();
    const manga = searchData?.data?.[0];
    if (!manga) return {};

    notifyDownloadProgress(title, 'Descargando portada oficial en alta definición...', 20);

    let coverBlob: Blob | undefined;
    const coverRel = manga.relationships?.find((r: any) => r.type === 'cover_art');
    if (coverRel?.attributes?.fileName) {
      try {
        const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverRel.attributes.fileName}.512.jpg`;
        const cRes = await fetch(coverUrl, { signal: AbortSignal.timeout(5000) });
        if (cRes.ok) {
          coverBlob = await cRes.blob();
        }
      } catch (e) {
        // Fallback to vector cover
      }
    }

    // Try finding all Spanish chapters (download complete manga series with all episodes)
    let pages: { name: string; blob: Blob }[] = [];
    try {
      notifyDownloadProgress(title, 'Consultando todos los episodios disponibles...', 25);
      
      // Fetch all chapters with limit=500 and pagination
      let chaptersList: any[] = [];
      let offset = 0;
      let totalToFetch = 1;

      while (offset < totalToFetch && offset < 1000) {
        const feedUrl = `https://api.mangadex.org/manga/${manga.id}/feed?translatedLanguage[]=es&translatedLanguage[]=es-la&includeEmptyPages=0&includeExternalUrl=0&order[chapter]=asc&limit=500&offset=${offset}`;
        const feedRes = await fetch(feedUrl, { signal: AbortSignal.timeout(7000) });
        if (!feedRes.ok) break;

        const feedData = await feedRes.json();
        const batch = feedData?.data || [];
        if (batch.length === 0) break;

        chaptersList.push(...batch);
        totalToFetch = feedData?.total || batch.length;
        offset += batch.length;
      }

      if (chaptersList.length > 0) {
        // Group and de-duplicate unique chapters by chapter number
        const uniqueChapters = new Map<number, { id: string; chapter: number; pages: number }>();
        for (const ch of chaptersList) {
          const chNum = parseFloat(ch.attributes.chapter);
          if (!isNaN(chNum)) {
            const numPages = ch.attributes.pages || 0;
            if (!uniqueChapters.has(chNum) || numPages > (uniqueChapters.get(chNum)?.pages || 0)) {
              uniqueChapters.set(chNum, {
                id: ch.id,
                chapter: chNum,
                pages: numPages,
              });
            }
          }
        }

        const sortedChapters = Array.from(uniqueChapters.values()).sort((a, b) => a.chapter - b.chapter);
        // Download ALL available unique chapters in full
        const totalChapters = sortedChapters.length;

        for (let chIdx = 0; chIdx < totalChapters; chIdx++) {
          const ch = sortedChapters[chIdx];
          const chNum = ch.chapter;
          const chapterBasePercent = 30 + Math.round((chIdx / totalChapters) * 65);

          notifyDownloadProgress(
            title,
            `Descargando episodio ${chNum} (${chIdx + 1} de ${totalChapters})...`,
            chapterBasePercent
          );

          try {
            const atHomeRes = await fetch(`https://api.mangadex.org/at-home/server/${ch.id}`, {
              signal: AbortSignal.timeout(6000),
            });
            if (atHomeRes.ok) {
              const atHomeData = await atHomeRes.json();
              const pageFiles: string[] = atHomeData?.chapter?.dataSaver || atHomeData?.chapter?.data || [];
              for (let pIdx = 0; pIdx < pageFiles.length; pIdx++) {
                const file = pageFiles[pIdx];
                const pUrl = `${atHomeData.baseUrl}/data-saver/${atHomeData.chapter.hash}/${file}`;
                const pRes = await fetch(pUrl, { signal: AbortSignal.timeout(5000) });
                if (pRes.ok) {
                  const blob = await pRes.blob();
                  const ext = file.split('.').pop() || 'jpg';
                  const paddedCh = String(Math.floor(chNum)).padStart(4, '0');
                  const paddedPage = String(pIdx + 1).padStart(3, '0');
                  pages.push({
                    name: `ch_${paddedCh}_p${paddedPage}.${ext}`,
                    blob,
                  });
                }
              }
            }
          } catch (e) {
            console.warn(`[MangaGenerator] Error downloading chapter ${chNum}:`, e);
          }
        }
      }
    } catch (e) {
      console.warn('[MangaGenerator] Chapter feed error:', e);
    }

    notifyDownloadProgress(title, 'Consolidando archivo final de lectura...', 96);
    return { coverBlob, pages };
  } catch {
    return {};
  }
}

// ==========================================
// 7. CBZ Generator for Manga, Manhwa, Comics
// ==========================================
export async function generateMangaCbz(
  title: string,
  author: string,
  pagesData: ComicPanelData[],
  category: 'manga' | 'manhwa' | 'comics' = 'manga',
  description?: string
): Promise<File> {
  const zip = new JSZip();

  // Try fetching genuine MangaDex assets (Cover + Spanish Chapter)
  let onlineData: { coverBlob?: Blob; pages?: { name: string; blob: Blob }[] } = {};
  try {
    onlineData = await fetchMangaDexOnlineData(title);
  } catch (err) {
    console.warn('[MangaGenerator] Online fetch unavailable, using illustrated art:', err);
  }

  // 1. Cover: First entry in zip is 000_portada so it naturally becomes the book cover
  if (onlineData.coverBlob && onlineData.coverBlob.size > 1000) {
    zip.file('000_portada.jpg', onlineData.coverBlob);
  } else {
    const coverSvg = createMangaCoverSvg(title, author, category);
    zip.file('000_portada.svg', coverSvg);
  }

  // 2. Story Pages
  if (onlineData.pages && onlineData.pages.length > 0) {
    // Real Spanish chapter scans from MangaDex!
    for (const p of onlineData.pages) {
      zip.file(p.name, p.blob);
    }
  } else {
    // Authentic illustrated manga story package
    const splashSvg = createMangaSplashPageSvg(title, author, category, description || pagesData[0]?.panelText);
    zip.file('001_portadilla.svg', splashSvg);

    const totalStoryPages = pagesData.length;
    for (let i = 0; i < pagesData.length; i++) {
      const p = pagesData[i];
      const storySvg = createMangaStoryPageSvg(
        title,
        author,
        i + 1,
        totalStoryPages,
        p.chapter,
        p.scene,
        p.dialogue,
        p.panelText,
        category
      );
      zip.file(`page_${String(i + 2).padStart(3, '0')}.svg`, storySvg);
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  // Clean filename without converting spaces to underscores!
  const cleanFileName = `${title.replace(/[\\/:*?"<>|]/g, '').trim()}.cbz`;
  return new File([blob], cleanFileName, { type: 'application/x-cbz' });
}

// ==========================================
// 7. EPUB Book File Generator
// ==========================================
export async function generateBookFile(
  title: string,
  author: string,
  chapters: BookChapterData[]
): Promise<File> {
  const safeTitle = title.replace(/[\\/:*?"<>|]/g, '').trim();
  const safeId = title.replace(/[^a-zA-Z0-9_-]/g, '_');

  const zip = new JSZip();
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });

  const coverSvg = createCoverSvg(title, author, 'EPUB', '#1e293b', '#0f172a', '#38bdf8');
  zip.file('OEBPS/cover.svg', coverSvg);

  zip.file(
    'META-INF/container.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
  );

  let manifestItems = `<item id="cover-image" href="cover.svg" media-type="image/svg+xml"/>\n`;
  let spineItems = '';
  let navPoints = '';

  chapters.forEach((ch, idx) => {
    const filename = `chapter_${idx + 1}.xhtml`;
    const paragraphs = ch.content
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<p>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
      .join('\n');

    const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head>
  <meta charset="utf-8"/>
  <title>${ch.title.replace(/&/g, '&amp;')}</title>
  <style>
    body {
      font-family: serif;
      line-height: 1.75;
      margin: 0;
      padding: 24px 28px 90px 24px;
      text-align: justify;
      -webkit-hyphens: none;
      hyphens: none;
      word-break: normal;
      overflow-wrap: break-word;
    }
    h1 {
      text-align: center;
      margin-top: 1.2em;
      margin-bottom: 0.8em;
    }
    p {
      margin-bottom: 1em;
      text-indent: 1.25em;
      padding-right: 8px;
      -webkit-hyphens: none;
      hyphens: none;
      word-break: normal;
      overflow-wrap: break-word;
    }
  </style>
</head>
<body>
  <h1>${ch.title.replace(/&/g, '&amp;')}</h1>
  ${paragraphs}
</body>
</html>`;

    zip.file(`OEBPS/${filename}`, xhtml);
    manifestItems += `<item id="ch${idx + 1}" href="${filename}" media-type="application/xhtml+xml"/>\n`;
    spineItems += `<itemref idref="ch${idx + 1}"/>\n`;
    navPoints += `  <navPoint id="np${idx + 1}" playOrder="${idx + 1}">
    <navLabel><text>${ch.title.replace(/&/g, '&amp;')}</text></navLabel>
    <content src="${filename}"/>
  </navPoint>\n`;
  });

  manifestItems += `<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>\n`;

  const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookID" version="2.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${title.replace(/&/g, '&amp;')}</dc:title>
    <dc:creator>${author.replace(/&/g, '&amp;')}</dc:creator>
    <dc:language>es</dc:language>
    <dc:identifier id="BookID">urn:uuid:${safeId}</dc:identifier>
    <meta name="cover" content="cover-image"/>
  </metadata>
  <manifest>
    ${manifestItems}
  </manifest>
  <spine toc="ncx">
    ${spineItems}
  </spine>
</package>`;

  const ncx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:${safeId}"/>
    <meta name="dtb:depth" content="1"/>
  </head>
  <docTitle><text>${title.replace(/&/g, '&amp;')}</text></docTitle>
  <navMap>
    ${navPoints}
  </navMap>
</ncx>`;

  zip.file('OEBPS/content.opf', opf);
  zip.file('OEBPS/toc.ncx', ncx);

  const blob = await zip.generateAsync({ type: 'blob' });
  return new File([blob], `${safeTitle}.epub`, { type: 'application/epub+zip' });
}

// ==========================================
// 8. Book Chapter Data Generator
// ==========================================
export function createDefaultBookChapters(
  title: string,
  author: string,
  description: string
): BookChapterData[] {
  return [
    {
      title: 'Capítulo I — Introducción y Comienzo',
      content: `${description}\n\nAsí comenzaba la célebre obra «${title}», nacida de la pluma de ${author}. Desde las primeras páginas se percibe una atmósfera singular donde cada palabra evoca pasiones humanas universales, dilemas morales y el pulso ineludible del destino.\n\nLos personajes se adentran en un mundo de sombras y luces, buscando desesperadamente dar sentido a sus existencias en medio de las vicisitudes que la fortuna les depara.`
    },
    {
      title: 'Capítulo II — El Nudo de la Trama',
      content: `A medida que avanzan los acontecimientos, las certezas iniciales se desvanecen. Ningún juramento permanece intacto ante el embate de los conflictos que sacuden la historia.\n\n«No hay camino fácil hacia la verdad», murmuraba el protagonista al contemplar el horizonte incierto. Cada decisión tomada acarrea consecuencias imprevistas, arrastrando a amigos y adversarios a un enfrentamiento inevitable donde solo los más perseverantes lograrán encontrar sosiego.`
    },
    {
      title: 'Capítulo III — Clímax y Reflexión Final',
      content: `El desenlace de «${title}» constituye una de las cumbres narrativas de su época. En el momento culminante, cuando todas las fuerzas convergen en una sola escena decisiva, la verdad oculta se revela con deslumbrante claridad.\n\nEl lector queda maravillado por la profundidad psicológica y el dominio estilístico con que ${author} retrata la condición humana. Una obra eterna que trasciende generaciones y permanece como un faro de la literatura universal en nuestra lengua.`
    }
  ];
}

// ==========================================
// 9. Manga Panel Data Generator (Narrative-Rich)
// ==========================================
export function createDefaultMangaPanels(
  title: string,
  author: string,
  description: string,
  category: 'manga' | 'manhwa' | 'comics' = 'manga'
): ComicPanelData[] {
  const categoryLabel = category === 'manhwa' ? 'Webtoon' : category === 'comics' ? 'Cómic' : 'Manga';

  return [
    {
      number: 1,
      chapter: 'Capítulo 1: El Despertar',
      scene: 'Inicio de la Aventura',
      panelText: `${description.slice(0, 110)}...`,
      dialogue: `¡No me rendiré jamás en ${title}! ¡Este es el camino que he elegido seguir!`
    },
    {
      number: 2,
      chapter: 'Capítulo 1: Choque de Voluntades',
      scene: 'Campo de Batalla',
      panelText: 'Una presencia arrolladora irrumpe en escena mientras las miradas se cruzan con tensión electrizante.',
      dialogue: 'Si quieres dar un paso adelante... ¡primero tendrás que superarme a mí con todo tu poder!'
    },
    {
      number: 3,
      chapter: 'Capítulo 1: La Fuerza Interior',
      scene: 'Momento de Impacto',
      panelText: 'La energía fluye y el aire vibra con el impacto inminente del choque de voluntades.',
      dialogue: 'He entrenado mi mente y mi espíritu para no retroceder ante ningún desafío.'
    },
    {
      number: 4,
      chapter: 'Capítulo 1: Hacia el Horizonte',
      scene: 'Horizonte Épico',
      panelText: `Una obra cumbre del ${categoryLabel} creada por ${author}, adaptada íntegramente al español para disfrutar sin conexión.`,
      dialogue: '¡Nuestra aventura apenas acaba de comenzar... hacia lo desconocido!'
    }
  ];
}
