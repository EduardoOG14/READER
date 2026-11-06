import { httpGetJson, httpGetBlob } from './httpClient';
import type { CatalogItem } from './catalog/types';

export interface GutenbergAuthor {
  name: string;
  birth_year?: number;
  death_year?: number;
}

export interface GutenbergBookRaw {
  id: number;
  title: string;
  authors: GutenbergAuthor[];
  subjects?: string[];
  languages: string[];
  download_count: number;
  formats: Record<string, string>;
}

export interface GutenbergResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutenbergBookRaw[];
}

/**
 * Reverses "Surname, Forename" to "Forename Surname"
 * e.g. "Dostoyevsky, Fyodor" -> "Fyodor Dostoyevsky"
 * e.g. "Cervantes Saavedra, Miguel de" -> "Miguel de Cervantes Saavedra"
 */
export function formatGutenbergAuthor(raw?: string): string {
  if (!raw) return 'Autor Clásico';
  const parts = raw.split(',').map(p => p.trim());
  if (parts.length >= 2) {
    const forename = parts[1];
    const surname = parts[0];
    return `${forename} ${surname}`.trim();
  }
  return raw.trim();
}

/**
 * Generates an aesthetic gradient based on the book's title
 */
function getGradientFromTitle(title: string): { from: string; to: string; accent: string } {
  const gradients = [
    { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' }, // Indigo
    { from: '#064e3b', to: '#042f2e', accent: '#10b981' }, // Emerald
    { from: '#450a0a', to: '#18181b', accent: '#ef4444' }, // Crimson
    { from: '#3b0764', to: '#18181b', accent: '#a855f7' }, // Purple
    { from: '#172554', to: '#0f172a', accent: '#3b82f6' }, // Blue
    { from: '#451a03', to: '#18181b', accent: '#f59e0b' }, // Amber
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  return gradients[Math.abs(hash) % gradients.length];
}

/**
 * Converts a Gutenberg API book into a full-featured CatalogItem
 */
export function convertGutenbergToCatalogItem(raw: GutenbergBookRaw): CatalogItem {
  const author = formatGutenbergAuthor(raw.authors[0]?.name);
  const coverUrl =
    raw.formats['image/jpeg'] ||
    `https://www.gutenberg.org/cache/epub/${raw.id}/pg${raw.id}.cover.medium.jpg`;

  const cleanTitle = raw.title.replace(/\s*\([^)]*\)/g, '').trim();
  const grad = getGradientFromTitle(cleanTitle);

  return {
    id: `cat-gut-${raw.id}`,
    title: cleanTitle,
    author,
    category: 'libros',
    format: 'epub',
    genre: raw.subjects?.[0] || 'Literatura Clásica / Novela',
    totalPages: Math.max(90, Math.min(500, Math.round((raw.download_count || 100) / 4))),
    year: raw.authors[0]?.death_year ? raw.authors[0].death_year - 20 : 1880,
    description: `Obra universal de ${author} en español disponible a través de Project Gutenberg. Descarga completa en formato EPUB estándar sin DRM.`,
    coverGradient: grad,
    badgeText: 'LIBRO COMPLETO EN ESPAÑOL',
    coverUrl,
    createFile: async onProgress => {
      onProgress?.('Conectando con Project Gutenberg...', 15);
      const epubUrl =
        raw.formats['application/epub+zip'] ||
        raw.formats['application/epub+zip; charset=utf-8'] ||
        `https://www.gutenberg.org/ebooks/${raw.id}.epub3.images`;

      onProgress?.('Descargando libro íntegro (EPUB)...', 40);
      let blob: Blob | null = null;
      try {
        blob = await httpGetBlob(epubUrl, { timeoutMs: 30000 });
      } catch {
        // Fallback to no-images epub
        const fallbackUrl = `https://www.gutenberg.org/ebooks/${raw.id}.epub.noimages`;
        blob = await httpGetBlob(fallbackUrl, { timeoutMs: 30000 });
      }

      if (!blob || blob.size < 1000) {
        throw new Error(`No se pudo descargar el archivo EPUB para «${cleanTitle}».`);
      }

      onProgress?.('Libro recibido, guardando...', 90);
      return new File([blob], `${cleanTitle}.epub`, { type: 'application/epub+zip' });
    },
  };
}

class GutenbergService {
  private cache: Map<string, CatalogItem[]> = new Map();

  /**
   * Fetches the top, most-downloaded books in Spanish from Project Gutenberg
   */
  public async getTopSpanishBooks(page: number = 1): Promise<{ books: CatalogItem[]; total: number }> {
    const cacheKey = `top_page_${page}`;
    if (this.cache.has(cacheKey)) {
      return { books: this.cache.get(cacheKey)!, total: 900 };
    }

    try {
      const url = `https://gutendex.com/books/?languages=es&page=${page}`;
      const json: GutenbergResponse = await httpGetJson(url, { timeoutMs: 12000 });
      const valid = (json.results || []).filter(
        b => b.formats['application/epub+zip'] || b.formats['application/epub+zip; charset=utf-8']
      );

      const items = valid.map(convertGutenbergToCatalogItem);
      this.cache.set(cacheKey, items);
      return { books: items, total: json.count || items.length };
    } catch (e) {
      console.warn('[GutenbergService] Error fetching top books:', e);
      return { books: [], total: 0 };
    }
  }

  /**
   * Searches Project Gutenberg by author or title in Spanish
   */
  public async searchSpanishBooks(query: string): Promise<CatalogItem[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const cacheKey = `search_${q}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const url = `https://gutendex.com/books/?languages=es&search=${encodeURIComponent(q)}`;
      const json: GutenbergResponse = await httpGetJson(url, { timeoutMs: 12000 });
      const valid = (json.results || []).filter(
        b => b.formats['application/epub+zip'] || b.formats['application/epub+zip; charset=utf-8']
      );

      const items = valid.map(convertGutenbergToCatalogItem);
      this.cache.set(cacheKey, items);
      return items;
    } catch (e) {
      console.warn('[GutenbergService] Search error:', e);
      return [];
    }
  }
}

export const gutenbergService = new GutenbergService();
