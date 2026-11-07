import type { CatalogItem } from './types';
import { BOOKS_CATALOG } from './booksData';
import { MANGAS_CATALOG } from './mangasData';
import { MANHWAS_CATALOG } from './manhwasData';
import { ROMANCE_CATALOG } from './romanceData';

export type { CatalogItem } from './types';
export { BOOKS_CATALOG, MANGAS_CATALOG, MANHWAS_CATALOG, ROMANCE_CATALOG };

export const SPANISH_CATALOG: CatalogItem[] = [
  ...BOOKS_CATALOG,
  ...MANGAS_CATALOG,
  ...MANHWAS_CATALOG,
  ...ROMANCE_CATALOG,
];
