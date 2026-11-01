import type { BookFormat } from '../../types';

export interface CatalogItem {
  id: string;
  title: string;
  author: string;
  category: 'libros' | 'manga' | 'manhwa' | 'comics';
  format: BookFormat;
  genre: string;
  totalPages: number;
  year?: number;
  description: string;
  coverGradient: { from: string; to: string; accent: string };
  badgeText: string;
  createFile: () => Promise<File>;
}

export interface ComicPanelData {
  chapter: string;
  panelText: string;
  dialogue: string;
  scene: string;
  number: number;
}

export interface BookChapterData {
  title: string;
  content: string;
}
