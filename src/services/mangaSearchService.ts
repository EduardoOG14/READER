import { httpGetJson } from './httpClient';

export function normalizeSearchTitle(raw: string): string {
  return raw
    .replace(/\s*\([^)]*\)/g, '') // remove parenthetical notes like (Torre de Dios)
    .replace(/[«»"']/g, '')
    .trim();
}

export function isTitleMatch(mangaTitle: string, searchTitle: string): boolean {
  const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const nSearch = norm(searchTitle);
  const nTitle = norm(mangaTitle);

  if (!nSearch || !nTitle) return false;
  if (nTitle === nSearch) return true;

  if (nTitle.startsWith(nSearch)) {
    const rest = nTitle.slice(nSearch.length);
    if (/^(officialcolored|digitalcolored|color|colored|fullcolor|fanfullcolored|officialfullcolored)$/.test(rest)) {
      return true;
    }
  }

  return false;
}

export interface BestMangaMatch {
  manga: any;
  mangaId: string;
  mangaTitle: string;
  language: 'es' | 'en';
  chapters: any[];
  totalAvailable: number;
}

export async function fetchHostedBatch(
  mangaId: string,
  langs: string[],
  maxToCollect: number = 200
): Promise<{ chapters: any[]; total: number }> {
  let offset = 0;
  let total = 0;
  const collected: any[] = [];

  const langParams = langs.map(l => `translatedLanguage[]=${l}`).join('&');

  while (offset < maxToCollect) {
    const limit = Math.min(100, maxToCollect - offset);
    const query = [langParams, 'order[chapter]=asc', `limit=${limit}`, `offset=${offset}`].join('&');
    const url = `https://api.mangadex.org/manga/${mangaId}/feed?${query}`;

    try {
      const json = await httpGetJson(url, { timeoutMs: 15000 });
      const batch = json?.data || [];
      if (batch.length === 0) break;

      total = json?.total || 0;
      const hosted = batch.filter((c: any) => !c.attributes.externalUrl && (c.attributes.pages || 0) > 0);
      collected.push(...hosted);

      offset += batch.length;
      if (offset >= total) break;
    } catch {
      break;
    }
  }

  return { chapters: collected, total };
}

/**
 * Searches MangaDex for the best candidate matching rawTitle, ensuring chapters
 * strictly belong to Spanish ('es', 'es-la') or optional English ('en') fallback.
 * Under NO circumstances does it fall back to random languages (pt-br, ar, ka, ru, etc.).
 */
export async function findBestMangaDexManga(
  rawTitle: string,
  options?: { allowEnglishFallback?: boolean; maxChaptersToFetch?: number }
): Promise<BestMangaMatch | null> {
  const cleanTitle = normalizeSearchTitle(rawTitle);
  const allowEnglish = options?.allowEnglishFallback === true;
  const maxChapters = options?.maxChaptersToFetch || 300;

  const searchVariants = [
    cleanTitle,
    `${cleanTitle} (Official Colored)`,
    `${cleanTitle} Digital Colored`,
  ];

  const candidateMap = new Map<string, any>();

  for (const query of searchVariants) {
    const searchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(query)}&limit=5&order[relevance]=desc&includes[]=cover_art`;
    try {
      const json = await httpGetJson(searchUrl, { timeoutMs: 12000 });
      const list = json?.data || [];

      for (const m of list) {
        const allTitles = [
          ...Object.values(m.attributes?.title || {}),
          ...(m.attributes?.altTitles || []).flatMap((at: any) => Object.values(at)),
        ] as string[];

        const matches = allTitles.some(t => isTitleMatch(t, cleanTitle));
        if (matches && !candidateMap.has(m.id)) {
          candidateMap.set(m.id, m);
        }
      }
    } catch {}
  }

  const candidates = Array.from(candidateMap.values());
  if (candidates.length === 0) {
    return null;
  }

  // PASS 1: Search for SPANISH ('es', 'es-la') across all valid candidates
  let bestSpanishMatch: BestMangaMatch | null = null;
  let maxSpanishCount = 0;

  for (const cand of candidates) {
    const { chapters, total } = await fetchHostedBatch(cand.id, ['es', 'es-la'], maxChapters);
    if (chapters.length > maxSpanishCount) {
      maxSpanishCount = chapters.length;
      const mainTitle = (Object.values(cand.attributes?.title || {})[0] as string) || cleanTitle;
      bestSpanishMatch = {
        manga: cand,
        mangaId: cand.id,
        mangaTitle: mainTitle,
        language: 'es',
        chapters,
        totalAvailable: total,
      };
    }
  }

  if (bestSpanishMatch) {
    return bestSpanishMatch;
  }

  // PASS 2: Search for ENGLISH ('en') ONLY if allowed and NO Spanish was found
  if (allowEnglish) {
    let bestEnglishMatch: BestMangaMatch | null = null;
    let maxEnglishCount = 0;

    for (const cand of candidates) {
      const { chapters, total } = await fetchHostedBatch(cand.id, ['en'], maxChapters);
      if (chapters.length > maxEnglishCount) {
        maxEnglishCount = chapters.length;
        const mainTitle = (Object.values(cand.attributes?.title || {})[0] as string) || cleanTitle;
        bestEnglishMatch = {
          manga: cand,
          mangaId: cand.id,
          mangaTitle: mainTitle,
          language: 'en',
          chapters,
          totalAvailable: total,
        };
      }
    }

    if (bestEnglishMatch) {
      return bestEnglishMatch;
    }
  }

  // Under NO circumstances do we fall back to other languages (pt-br, ar, ka, ru, etc.)
  return null;
}
