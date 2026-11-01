import type { CatalogItem } from './types';
import { BOOKS_CATALOG } from './booksData';
import { MANGAS_CATALOG } from './mangasData';
import { MANHWAS_CATALOG } from './manhwasData';
import { COMICS_CATALOG } from './comicsData';

export type { CatalogItem } from './types';
export { BOOKS_CATALOG, MANGAS_CATALOG, MANHWAS_CATALOG, COMICS_CATALOG };

export const SPANISH_CATALOG: CatalogItem[] = [
  ...BOOKS_CATALOG,
  ...MANGAS_CATALOG,
  ...MANHWAS_CATALOG,
  ...COMICS_CATALOG,
];
