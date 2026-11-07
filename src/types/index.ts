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
  tags?: string[]; // Custom user tags (e.g. 'Isekai', 'Fantasía', 'Pendiente')
  fileStorageKey: string; // Key in IndexedDB/Filesystem
  description?: string; // Synopsis or summary of the book/manga
  bookmarks?: Bookmark[]; // MoonReader bookmarks
  rating?: number; // 1 to 5 stars
  review?: string; // Personal thoughts/review
  series?: string; // Saga or Collection name
  seriesOrder?: number; // Volume or installment number in the series
  completedDate?: number; // timestamp when book was finished
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type EyeFilterMode = 'none' | 'sepia' | 'warm' | 'invert';

export type ReadingThemePreset = 'emerald' | 'sakura' | 'oled' | 'sepia' | 'day';

export type PageTransitionStyle = 'curl' | 'slide' | 'instant';

export type DualPageMode = 'auto' | 'always' | 'never';

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
  volumeKeyTurnPage?: boolean; // Turn page with physical Volume Up / Down keys
  invertVolumeKeys?: boolean; // Invert Volume Up / Down action
  orientationLock?: 'auto' | 'portrait' | 'landscape'; // Screen orientation lock
  smartTrimMargins?: boolean; // Smart crop blank margins in manga and comics
  immersiveMode?: boolean; // Fullscreen immersive mode hiding system status bars
  pageTransitionStyle?: PageTransitionStyle; // 'curl' | 'slide' | 'instant'
  dualPageMode?: DualPageMode; // 'auto' | 'always' | 'never'
  firstPageAsCover?: boolean; // Show page 1 standalone as cover in dual page mode
}

export interface ReadingSession {
  date: string; // YYYY-MM-DD
  minutes: number;
  pagesRead: number;
}

export interface ReadingStats {
  currentStreak: number;
  bestStreak: number;
  lastReadDate?: string;
  totalMinutes: number;
  totalPagesRead: number;
  dailyGoalMinutes: number;
  sessions: Record<string, ReadingSession>;
}

