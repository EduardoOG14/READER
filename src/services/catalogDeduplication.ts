import type { CatalogItem } from './catalog/types';
import type { Book } from '../types';

/**
 * Normalizes a book title into an invariant key for robust duplicate detection.
 * Removes accents, articles, punctuation, subtitle clauses, volume numbers, and stopwords.
 */
export function normalizeBookKey(title: string): string {
  let clean = (title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  // Strip subtitle clauses, secondary titles, and parentheticals
  clean = clean.replace(/\s*(o el |o la |o los |o las ).*$/i, '');
  clean = clean.replace(/\s*[:;—–-].*$/i, '');
  clean = clean.replace(/\s*\([^)]*\)/g, '');
  clean = clean.replace(/\s*de la mancha$/i, '');
  clean = clean.replace(/\s*(tomo|volumen|vol|parte|libro|edicion|t)\.?\s*[\divxlcdm]+.*$/i, '');

  const tokens = clean
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(
      t =>
        ![
          'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
          'de', 'del', 'y', 'en', 'a', 'por', 'para', 'con',
          'the', 'of', 'and', 'vida', 'libro'
        ].includes(t)
    );

  return tokens.join('');
}

/**
 * Checks if two author strings refer to the same author.
 * Handles formats like "Miguel de Cervantes", "Cervantes Saavedra, Miguel de",
 * "Homero" vs "Homer", and anonymous/unknown works.
 */
export function doAuthorsMatch(a?: string, b?: string): boolean {
  const normA = (a || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const normB = (b || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const isAnonA = normA.includes('anon') || normA.includes('desconocid') || normA.includes('unknown') || !normA;
  const isAnonB = normB.includes('anon') || normB.includes('desconocid') || normB.includes('unknown') || !normB;
  if (isAnonA && isAnonB) return true;

  const tokensA = normA.split(/[^a-z0-9]+/).filter(t => t.length >= 4);
  const tokensB = normB.split(/[^a-z0-9]+/).filter(t => t.length >= 4);

  // Greek/classic author name variances (e.g., Homer vs Homero)
  if (tokensA.some(t => t.startsWith('home')) && tokensB.some(t => t.startsWith('home'))) return true;

  // General token overlap
  return tokensA.some(ta =>
    tokensB.some(tb => ta === tb || (ta.length >= 5 && (ta.startsWith(tb) || tb.startsWith(ta))))
  );
}

/**
 * Checks whether two catalog items are the same underlying literary or comic work.
 */
export function areCatalogItemsDuplicate(a: CatalogItem, b: CatalogItem): boolean {
  if (a.category !== b.category) return false;

  const keyA = normalizeBookKey(a.title);
  const keyB = normalizeBookKey(b.title);
  if (!keyA || !keyB) return false;

  // Exact normalized key match
  if (keyA === keyB) {
    if (!a.author || !b.author) return true;
    if (doAuthorsMatch(a.author, b.author)) return true;
    if (keyA.length >= 6) return true;
  }

  // Prefix match for works with extended subtitles
  if (keyA.length >= 8 && keyB.length >= 8) {
    if (keyA.startsWith(keyB) || keyB.startsWith(keyA)) {
      if (doAuthorsMatch(a.author, b.author)) return true;
    }
  }

  return false;
}

/**
 * Merges the base catalog with dynamic Gutenberg books, completely removing duplicates.
 * When an authentic Gutenberg version exists for a base catalog book, it upgrades the item
 * with Gutenberg's authentic full EPUB download while preserving curated titles and metadata.
 */
export function mergeAndDeduplicateCatalog(
  baseCatalog: CatalogItem[],
  dynamicBooks: CatalogItem[]
): CatalogItem[] {
  // 1. Deduplicate dynamic items internally first (e.g. multi-volume Gutenberg works)
  const cleanDynamic: CatalogItem[] = [];
  for (const dyn of dynamicBooks) {
    const existing = cleanDynamic.find(d => areCatalogItemsDuplicate(d, dyn));
    if (!existing) {
      cleanDynamic.push(dyn);
    }
  }

  const merged: CatalogItem[] = [];
  const processedDynamicIds = new Set<string>();

  // 2. Iterate base catalog and check against dynamic books
  for (const baseItem of baseCatalog) {
    const dynMatch = cleanDynamic.find(dyn => areCatalogItemsDuplicate(baseItem, dyn));

    if (dynMatch) {
      // Upgrade baseItem with authentic full EPUB createFile & cover from Gutenberg
      merged.push({
        ...baseItem,
        id: dynMatch.id, // Direct Gutenberg ID for background download queue tracking
        coverUrl: dynMatch.coverUrl || baseItem.coverUrl,
        createFile: dynMatch.createFile || baseItem.createFile,
        badgeText: 'LIBRO COMPLETO EN ESPAÑOL',
      });
      processedDynamicIds.add(dynMatch.id);
    } else {
      merged.push(baseItem);
    }
  }

  // 3. Append remaining unique dynamic books that are not in base catalog
  for (const dyn of cleanDynamic) {
    if (!processedDynamicIds.has(dyn.id)) {
      merged.push(dyn);
    }
  }

  return merged;
}

/**
 * Checks whether a catalog item is already in the user's personal library.
 */
export function isBookOwned(catalogItem: CatalogItem, ownedBooks: Book[]): Book | undefined {
  const catalogKey = normalizeBookKey(catalogItem.title);
  if (!catalogKey) return undefined;

  return ownedBooks.find(b => {
    // Exact ID match
    if (b.id === catalogItem.id) return true;

    // Normalized title match
    const ownedKey = normalizeBookKey(b.title);
    if (!ownedKey) return false;
    if (catalogKey === ownedKey) return true;

    // Substring / prefix match for long titles
    if (catalogKey.length >= 8 && ownedKey.length >= 8) {
      if (catalogKey.startsWith(ownedKey) || ownedKey.startsWith(catalogKey)) {
        return true;
      }
    }

    return false;
  });
}
