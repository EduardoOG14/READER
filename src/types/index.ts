export type BookFormat = 'pdf' | 'cbz' | 'cbr' | 'zip' | 'epub' | 'txt' | 'md';

export interface Category {
  id: string;
  name: string;
  color: string; // Hex color code or tailwind color
  isDefault?: boolean;
}

export interface Bookmark {
  id: string;
  page: number;
  timestamp: number;
  title?: string;
  note?: string;
}

export interface Book {
  id: string;
  title: string;
  author?: string;
  format: BookFormat;
  fileName: string;
  fileSize: number; // in bytes
  dateAdded: number; // timestamp
  lastReadDate?: number; // timestamp
  currentPage: number;
  totalPages: number;
  progress: number; // 0 to 100
  coverUrl?: string; // Data URL or object URL for cover preview
  categoryIds: string[]; // List of category IDs assigned by user
  fileStorageKey: string; // Key in IndexedDB/Filesystem
  description?: string; // Synopsis or summary of the book/manga
  bookmarks?: Bookmark[]; // MoonReader bookmarks
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type EyeFilterMode = 'none' | 'sepia' | 'warm' | 'invert';

export type ReadingThemePreset = 'emerald' | 'sakura' | 'oled' | 'sepia' | 'day';

export interface ReadingSettings {
  theme: ThemeMode;
  eyeFilter: EyeFilterMode;
  warmFilterIntensity: number; // 0 to 100
  brightness: number; // 20 to 100 (%)
  fontSize: number; // for text / epub (e.g. 14 to 28)
  lineHeight: number; // for text
  fontFamily?: 'sans' | 'serif' | 'mono' | 'opendyslexic';
  textAlign?: 'left' | 'justify';
  mangaDirection: 'horizontal' | 'webtoon' | 'rtl' | 'ltr'; // paged vs vertical scroll vs Japanese RTL vs Comic LTR
  fitMode: 'width' | 'height' | 'contain';
  readingThemePreset?: ReadingThemePreset;
  showMoonStatusBar?: boolean;
  autoScrollSeconds?: number;
  continuousReadingMode?: boolean; // Modo Lectura: continuous downward scroll vs single-page paginated
}

