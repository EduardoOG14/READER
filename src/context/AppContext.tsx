import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { Book, Category, ReadingSettings } from '../types';
import {
  getAllBooks,
  getAllCategories,
  getSettings,
  saveBook,
  deleteBook,
  saveCategory,
  deleteCategory,
  saveSettings,
  DEFAULT_CATEGORIES,
  DEFAULT_SETTINGS,
  requestPersistentStorage,
  verifyAndRefreshLibrary,
} from '../services/storage';
import { importBookFile } from '../services/bookImporter';
import { loadDemoContent } from '../services/sampleData';
import { SPANISH_CATALOG } from '../services/catalogData';
import {
  isMockCover,
  fetchOfficialCoverUrl,
  createClassicBookCoverSvg,
  createMangaTankobonCoverSvg,
} from '../services/coverFetcher';

export type SortOption = 'recent' | 'title' | 'progress' | 'dateAdded';
export type ViewMode = 'grid' | 'list';

interface AppContextType {
  books: Book[];
  categories: Category[];
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  settings: ReadingSettings;
  updateSettings: (newSettings: Partial<ReadingSettings>) => Promise<void>;
  
  // Reader state
  activeBook: Book | null;
  openReader: (book: Book) => void;
  closeReader: () => void;
  updateBookProgress: (bookId: string, page: number, totalPages?: number) => Promise<void>;
  
  // Book management
  importFiles: (files: FileList | File[], targetCategoryIds?: string[]) => Promise<{ success: number; failed: number; errors: string[] }>;
  editBook: (bookId: string, updates: Partial<Book>) => Promise<void>;
  deleteBookById: (bookId: string) => Promise<void>;
  addBookmark: (bookId: string, page: number, note?: string) => Promise<void>;
  removeBookmark: (bookId: string, bookmarkId: string) => Promise<void>;
  
  // Category management
  createCategory: (name: string, color?: string) => Promise<Category>;
  updateCategory: (category: Category) => Promise<void>;
  removeCategory: (categoryId: string) => Promise<void>;
  
  // Filtered books
  filteredBooks: Book[];
  isLoading: boolean;
  loadDemoBooks: () => Promise<void>;
  refreshLibrary: () => Promise<{ verifiedFiles: number; totalBooks: number }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('cat-all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [settings, setSettingsState] = useState<ReadingSettings>(DEFAULT_SETTINGS);
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize data on mount
  useEffect(() => {
    async function init() {
      // 1. Request persistent storage from browser/Android
      await requestPersistentStorage();

      try {
        // 2. Load books safely with fallback & self-healing migration
        try {
          const loadedBooks = await getAllBooks();
          const healedBooks = await Promise.all(
            loadedBooks.map(async book => {
              let changed = false;
              let title = book.title;
              let author = book.author;
              let coverUrl = book.coverUrl;

              // 1. Clean titles with underscores (e.g. "Slam_Dunk" -> "Slam Dunk")
              if (title.includes('_')) {
                const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
                const normTitle = norm(title);
                const match = SPANISH_CATALOG.find(
                  c =>
                    norm(c.title) === normTitle ||
                    normTitle.includes(norm(c.title)) ||
                    norm(c.title).includes(normTitle)
                );
                if (match) {
                  title = match.title;
                  if (!author || author === 'Autor Desconocido') author = match.author;
                } else {
                  title = title.replace(/__/g, ' (').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
                  if (title.includes('(') && !title.includes(')')) title += ')';
                }
                changed = true;
              }

              // 2. Eliminate all mock / wireframe covers immediately
              const needsCoverUpgrade = isMockCover(coverUrl);

              if (needsCoverUpgrade) {
                const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
                const match = SPANISH_CATALOG.find(c => norm(c.title) === norm(title));
                const isBook =
                  book.format === 'epub' ||
                  book.format === 'txt' ||
                  book.format === 'pdf' ||
                  match?.category === 'libros';

                // Initial elegant vector fallback (leather-embossed book or clean tankobon)
                coverUrl = isBook
                  ? `data:image/svg+xml;utf8,${encodeURIComponent(createClassicBookCoverSvg(title, author || 'Clásico Universal'))}`
                  : `data:image/svg+xml;utf8,${encodeURIComponent(createMangaTankobonCoverSvg(title, author || 'Manga', (match?.category as any) || 'manga'))}`;
                changed = true;
              }

              if (changed) {
                const updated: Book = { ...book, title, author, coverUrl };
                try {
                  await saveBook(updated);
                } catch {}
                return updated;
              }
              return book;
            })
          );
          setBooks(healedBooks);

          // 3. Asynchronously enhance existing books with REAL official covers from MangaDex / OpenLibrary
          setTimeout(async () => {
            for (const book of healedBooks) {
              if (
                isMockCover(book.coverUrl) ||
                book.coverUrl?.startsWith('data:image/svg+xml') ||
                book.coverUrl?.includes('uploads.mangadex.org')
              ) {
                try {
                  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
                  const match = SPANISH_CATALOG.find(c => norm(c.title) === norm(book.title));
                  const category = match?.category || (book.format === 'epub' || book.format === 'txt' ? 'libros' : 'manga');
                  const officialUrl = await fetchOfficialCoverUrl(book.title, book.author, category);
                  if (officialUrl) {
                    const enhanced: Book = { ...book, coverUrl: officialUrl };
                    await saveBook(enhanced);
                    setBooks(prev => prev.map(b => (b.id === book.id ? enhanced : b)));
                  }
                } catch {}
              }
            }
          }, 600);
        } catch (err) {
          console.error('Error loading books:', err);
        }

        // 3. Load categories safely
        try {
          const loadedCategories = await getAllCategories();
          setCategories(loadedCategories);
        } catch (err) {
          console.error('Error loading categories:', err);
        }

        // 4. Load settings safely
        try {
          const loadedSettings = await getSettings();
          setSettingsState(loadedSettings);
          applyTheme(loadedSettings.theme);
        } catch (err) {
          console.error('Error loading settings:', err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  // Theme helper
  const applyTheme = (theme: ReadingSettings['theme']) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const updateSettings = async (newSettings: Partial<ReadingSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettingsState(updated);
    if (newSettings.theme) {
      applyTheme(newSettings.theme);
    }
    await saveSettings(updated);
  };

  // Reader methods
  const openReader = (book: Book) => {
    // update lastReadDate
    const updatedBook = { ...book, lastReadDate: Date.now() };
    saveBook(updatedBook);
    setBooks(prev => prev.map(b => (b.id === book.id ? updatedBook : b)));
    setActiveBook(updatedBook);
  };

  const closeReader = () => {
    setActiveBook(null);
  };

  const updateBookProgress = async (bookId: string, page: number, totalPages?: number) => {
    let updatedBookToSave: Book | null = null;

    setActiveBook(prev => {
      if (!prev || prev.id !== bookId) return prev;
      // Do not allow total pages to shrink during reading
      const total = totalPages !== undefined ? Math.max(totalPages, prev.totalPages || 1) : Math.max(1, prev.totalPages || 1);
      const clampedPage = Math.max(1, Math.min(page, total));
      const progress = Math.min(100, Math.round((clampedPage / total) * 100));

      const isCompleted = clampedPage >= total && total > 1;
      let categoryIds = prev.categoryIds || [];
      if (isCompleted && !categoryIds.includes('cat-completed')) {
        categoryIds = [...categoryIds, 'cat-completed'];
      } else if (!isCompleted && categoryIds.includes('cat-completed')) {
        categoryIds = categoryIds.filter((id: string) => id !== 'cat-completed');
      }

      const updated = {
        ...prev,
        currentPage: clampedPage,
        totalPages: total,
        progress,
        categoryIds,
        completedDate: isCompleted ? (prev.completedDate || Date.now()) : undefined,
        lastReadDate: Date.now(),
      };
      updatedBookToSave = updated;
      return updated;
    });

    setBooks(prev =>
      prev.map(b => {
        if (b.id !== bookId) return b;
        const total = totalPages !== undefined ? Math.max(totalPages, b.totalPages || 1) : Math.max(1, b.totalPages || 1);
        const clampedPage = Math.max(1, Math.min(page, total));
        const progress = Math.min(100, Math.round((clampedPage / total) * 100));

        const isCompleted = clampedPage >= total && total > 1;
        let categoryIds = b.categoryIds || [];
        if (isCompleted && !categoryIds.includes('cat-completed')) {
          categoryIds = [...categoryIds, 'cat-completed'];
        } else if (!isCompleted && categoryIds.includes('cat-completed')) {
          categoryIds = categoryIds.filter((id: string) => id !== 'cat-completed');
        }

        const updated = {
          ...b,
          currentPage: clampedPage,
          totalPages: total,
          progress,
          categoryIds,
          completedDate: isCompleted ? (b.completedDate || Date.now()) : undefined,
          lastReadDate: Date.now(),
        };
        if (!updatedBookToSave) {
          updatedBookToSave = updated;
        }
        return updated;
      })
    );

    if (updatedBookToSave) {
      await saveBook(updatedBookToSave);
    }
  };

  // Import multiple files
  const importFiles = async (files: FileList | File[], targetCategoryIds: string[] = []) => {
    const fileArray = Array.from(files);
    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const file of fileArray) {
      try {
        const newBook = await importBookFile(file, targetCategoryIds);
        setBooks(prev => [newBook, ...prev]);
        success++;
      } catch (err: any) {
        failed++;
        errors.push(`${file.name}: ${err?.message || 'Error al importar'}`);
      }
    }

    return { success, failed, errors };
  };

  const editBook = async (bookId: string, updates: Partial<Book>) => {
    let targetBook: Book | null = null;
    setBooks(prev =>
      prev.map(b => {
        if (b.id !== bookId) return b;
        const updated = { ...b, ...updates };
        targetBook = updated;
        return updated;
      })
    );

    if (activeBook && activeBook.id === bookId) {
      setActiveBook(prev => (prev && prev.id === bookId ? { ...prev, ...updates } : prev));
    }

    if (targetBook) {
      await saveBook(targetBook);
    } else {
      const all = await getAllBooks();
      const b = all.find(x => x.id === bookId);
      if (b) {
        await saveBook({ ...b, ...updates });
      }
    }
  };

  const deleteBookById = async (bookId: string) => {
    await deleteBook(bookId);
    setBooks(prev => prev.filter(b => b.id !== bookId));
    if (activeBook && activeBook.id === bookId) {
      setActiveBook(null);
    }
  };

  const addBookmark = async (bookId: string, page: number, note?: string) => {
    const target = books.find(b => b.id === bookId);
    if (!target) return;
    const existing = target.bookmarks || [];
    if (existing.some(b => b.page === page)) return;
    const newBookmark = {
      id: `bm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      page,
      timestamp: Date.now(),
      title: `Página ${page}`,
      note,
    };
    const updatedBookmarks = [...existing, newBookmark].sort((a, b) => a.page - b.page);
    await editBook(bookId, { bookmarks: updatedBookmarks });
  };

  const removeBookmark = async (bookId: string, bookmarkId: string) => {
    const target = books.find(b => b.id === bookId);
    if (!target) return;
    const updatedBookmarks = (target.bookmarks || []).filter(b => b.id !== bookmarkId);
    await editBook(bookId, { bookmarks: updatedBookmarks });
  };

  // Category management
  const createCategory = async (name: string, color: string = '#6366f1'): Promise<Category> => {
    const newCat: Category = {
      id: `cat_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      color,
      isDefault: false,
    };
    await saveCategory(newCat);
    setCategories(prev => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = async (cat: Category) => {
    await saveCategory(cat);
    setCategories(prev => prev.map(c => (c.id === cat.id ? cat : c)));
  };

  const removeCategory = async (categoryId: string) => {
    await deleteCategory(categoryId);
    setCategories(prev => prev.filter(c => c.id !== categoryId));
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId('cat-all');
    }
    // refresh books to clear removed category
    setBooks(prev =>
      prev.map(b => ({
        ...b,
        categoryIds: b.categoryIds.filter(id => id !== categoryId),
      }))
    );
  };

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        // Category filter
        if (selectedCategoryId !== 'cat-all') {
          if (selectedCategoryId === 'cat-favorites') {
            if (!book.categoryIds.includes('cat-favorites')) return false;
          } else if (selectedCategoryId === 'cat-reading') {
            if (book.progress <= 0 || book.progress >= 100 || book.currentPage >= book.totalPages) return false;
          } else if (selectedCategoryId === 'cat-completed') {
            if (book.progress < 100 && book.currentPage < book.totalPages && !book.categoryIds.includes('cat-completed')) {
              return false;
            }
          } else if (!book.categoryIds.includes(selectedCategoryId)) {
            return false;
          }
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author ? book.author.toLowerCase().includes(q) : false;
          const matchFormat = book.format.toLowerCase().includes(q);
          if (!matchTitle && !matchAuthor && !matchFormat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'recent') {
          return (b.lastReadDate || b.dateAdded) - (a.lastReadDate || a.dateAdded);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'progress') {
          return b.progress - a.progress;
        }
        if (sortBy === 'dateAdded') {
          return b.dateAdded - a.dateAdded;
        }
        return 0;
      });
  }, [books, selectedCategoryId, searchQuery, sortBy]);

  const loadDemoBooks = async () => {
    setIsLoading(true);
    try {
      const demoBooks = await loadDemoContent();
      setBooks(prev => [...demoBooks, ...prev]);
    } catch (err) {
      console.error('Error loading demo content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshLibrary = async (): Promise<{ verifiedFiles: number; totalBooks: number }> => {
    try {
      const { books: verifiedBooks, verifiedFiles } = await verifyAndRefreshLibrary();
      setBooks(verifiedBooks);
      const cats = await getAllCategories();
      setCategories(cats);
      return { verifiedFiles, totalBooks: verifiedBooks.length };
    } catch (err) {
      console.error('Error refreshing library:', err);
      const fallbackBooks = await getAllBooks();
      setBooks(fallbackBooks);
      return { verifiedFiles: fallbackBooks.length, totalBooks: fallbackBooks.length };
    }
  };

  return (
    <AppContext.Provider
      value={{
        books,
        categories,
        selectedCategoryId,
        setSelectedCategoryId,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        settings,
        updateSettings,
        activeBook,
        openReader,
        closeReader,
        updateBookProgress,
        importFiles,
        editBook,
        deleteBookById,
        addBookmark,
        removeBookmark,
        createCategory,
        updateCategory,
        removeCategory,
        filteredBooks,
        isLoading,
        loadDemoBooks,
        refreshLibrary,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
