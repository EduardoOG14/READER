import { openDB, type IDBPDatabase } from 'idb';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import type { Book, Category, ReadingSettings } from '../types';

const DB_NAME = 'minimalist_reader_db';
const DB_VERSION = 1;
const STORAGE_KEY_BOOKS_BACKUP = 'minimalist_reader_books_meta_backup';

interface ReaderDBSchema {
  books: {
    key: string;
    value: Book;
    indexes: { 'by-date': number; 'by-title': string };
  };
  files: {
    key: string;
    value: Blob | ArrayBuffer;
  };
  categories: {
    key: string;
    value: Category;
  };
  settings: {
    key: string;
    value: any;
  };
}

let dbPromise: Promise<IDBPDatabase<ReaderDBSchema>> | null = null;

export function getDB(): Promise<IDBPDatabase<ReaderDBSchema>> {
  if (!dbPromise) {
    dbPromise = openDB<ReaderDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('books')) {
          const bookStore = db.createObjectStore('books', { keyPath: 'id' });
          bookStore.createIndex('by-date', 'dateAdded');
          bookStore.createIndex('by-title', 'title');
        }
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files');
        }
        if (!db.objectStoreNames.contains('categories')) {
          db.createObjectStore('categories', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings');
        }
      },
      terminated() {
        console.warn('[Storage] DB connection terminated, will reconnect on next call');
        dbPromise = null;
      },
    }).catch(err => {
      console.error('[Storage] openDB failed:', err);
      dbPromise = null;
      throw err;
    });
  }
  return dbPromise;
}

// Request persistent storage so the browser/Android WebView never evicts data
export async function requestPersistentStorage(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    try {
      const isPersisted = await navigator.storage.persist();
      console.log(`[Storage] Persistent storage: ${isPersisted ? 'granted' : 'not granted'}`);
      return isPersisted;
    } catch (e) {
      console.warn('[Storage] Error requesting persistence:', e);
    }
  }
  return false;
}

// Default initial categories
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-all', name: 'Todos', color: '#64748b', isDefault: true },
  { id: 'cat-reading', name: 'Leyendo actualmente', color: '#3b82f6', isDefault: true },
  { id: 'cat-completed', name: 'Finalizados', color: '#10b981', isDefault: true },
  { id: 'cat-favorites', name: 'Favoritos', color: '#ef4444', isDefault: true },
  { id: 'cat-manga', name: 'Mangas & Cómics', color: '#8b5cf6', isDefault: true },
  { id: 'cat-books', name: 'Libros & PDFs', color: '#f59e0b', isDefault: true },
];

export const DEFAULT_SETTINGS: ReadingSettings = {
  theme: 'dark',
  eyeFilter: 'none',
  warmFilterIntensity: 35,
  brightness: 100,
  fontSize: 18,
  lineHeight: 1.6,
  fontFamily: 'sans',
  textAlign: 'left',
  mangaDirection: 'horizontal',
  fitMode: 'contain',
  readingThemePreset: 'emerald',
  showMoonStatusBar: true,
  autoScrollSeconds: 10,
  continuousReadingMode: false,
  volumeKeyTurnPage: true,
  invertVolumeKeys: false,
  orientationLock: 'auto',
  smartTrimMargins: false,
  immersiveMode: false,
};

// --- Storage API ---

function sanitizeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|\r\n\t]/g, '_').trim();
}

export async function saveBookFile(bookId: string, _fileName: string, data: ArrayBuffer | Blob): Promise<string> {
  const db = await getDB();
  const fileKey = `file_${bookId}`;

  // Store as Blob in IndexedDB: handles 100MB+ manga files natively on disk with zero bridge/memory overhead
  const blob = data instanceof Blob ? data : new Blob([data]);
  await db.put('files', blob, fileKey);

  return fileKey;
}

export async function getBookFile(fileKey: string, bookInfo?: { id: string; fileName: string }): Promise<ArrayBuffer | null> {
  try {
    const db = await getDB();
    const fileData = await db.get('files', fileKey);
    if (fileData) {
      if (fileData instanceof Blob) {
        return await fileData.arrayBuffer();
      }
      if (fileData instanceof ArrayBuffer) {
        return fileData.slice(0);
      }
    }
  } catch (err) {
    console.warn('[Storage] Error reading file from IndexedDB:', err);
  }

  // Fallback to native Filesystem on Android
  if (Capacitor.isNativePlatform() && bookInfo) {
    try {
      const safeName = sanitizeFileName(bookInfo.fileName);
      const result = await Filesystem.readFile({
        path: `books/${bookInfo.id}_${safeName}`,
        directory: Directory.Data,
      });
      if (typeof result.data === 'string') {
        return base64ToArrayBuffer(result.data);
      }
    } catch (e) {
      console.warn('[Storage] Filesystem fallback read error:', e);
    }
  }

  return null;
}

// Helpers for multi-layer metadata backup
function getStoredBooksMeta(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKS_BACKUP);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function syncMetadataBackups(books: Book[]): Promise<void> {
  // Strip oversized coverUrl data (>80KB) to prevent Android Binder TransactionTooLargeException
  const sanitized = books.map(b => {
    if (b.coverUrl && b.coverUrl.length > 80000) {
      return { ...b, coverUrl: undefined };
    }
    return b;
  });
  const json = JSON.stringify(sanitized);
  // 1. Preferences (Native Android SharedPreferences / Web)
  try {
    await Preferences.set({ key: STORAGE_KEY_BOOKS_BACKUP, value: json });
  } catch (e) {
    console.warn('[Storage] Preferences backup write warning:', e);
  }
  // 2. LocalStorage backup
  try {
    localStorage.setItem(STORAGE_KEY_BOOKS_BACKUP, json);
  } catch (e) {
    console.warn('[Storage] LocalStorage backup write warning:', e);
  }
}

async function restoreBooksToIndexedDB(books: Book[]): Promise<void> {
  try {
    const db = await getDB();
    for (const b of books) {
      await db.put('books', b);
    }
  } catch (e) {
    console.warn('[Storage] Error restoring books to IndexedDB:', e);
  }
}

export async function getAllBooks(): Promise<Book[]> {
  // 1. Try IndexedDB
  try {
    const db = await getDB();
    const books = await db.getAll('books');
    if (books && books.length > 0) {
      syncMetadataBackups(books);
      return books;
    }
  } catch (err) {
    console.error('[Storage] Error reading books from IndexedDB:', err);
  }

  // 2. Try Preferences backup (Native SharedPreferences on Android)
  try {
    const res = await Preferences.get({ key: STORAGE_KEY_BOOKS_BACKUP });
    if (res && res.value) {
      const prefBooks: Book[] = JSON.parse(res.value);
      if (Array.isArray(prefBooks) && prefBooks.length > 0) {
        console.log('[Storage] Restored books from Preferences backup:', prefBooks.length);
        restoreBooksToIndexedDB(prefBooks);
        return prefBooks;
      }
    }
  } catch (err) {
    console.warn('[Storage] Preferences read warning:', err);
  }

  // 3. Try LocalStorage backup
  try {
    const localBooks = getStoredBooksMeta();
    if (Array.isArray(localBooks) && localBooks.length > 0) {
      console.log('[Storage] Restored books from LocalStorage backup:', localBooks.length);
      restoreBooksToIndexedDB(localBooks);
      return localBooks;
    }
  } catch (err) {
    console.warn('[Storage] LocalStorage read warning:', err);
  }

  return [];
}

export async function verifyAndRefreshLibrary(): Promise<{ books: Book[]; verifiedFiles: number; missingFiles: number }> {
  const books = await getAllBooks();
  let verifiedFiles = 0;
  let missingFiles = 0;

  try {
    const db = await getDB();
    for (const book of books) {
      try {
        const fileData = await db.get('files', book.fileStorageKey);
        if (fileData) {
          verifiedFiles++;
        } else if (Capacitor.isNativePlatform()) {
          const safeName = sanitizeFileName(book.fileName);
          const stat = await Filesystem.stat({
            path: `books/${book.id}_${safeName}`,
            directory: Directory.Data,
          }).catch(() => null);
          if (stat) {
            verifiedFiles++;
          } else {
            missingFiles++;
          }
        } else {
          missingFiles++;
        }
      } catch {
        missingFiles++;
      }
    }
  } catch (err) {
    console.warn('[Storage] Verification notice:', err);
  }

  await syncMetadataBackups(books);
  return { books, verifiedFiles, missingFiles };
}

export async function saveBook(book: Book): Promise<void> {
  // 1. IndexedDB
  try {
    const db = await getDB();
    await db.put('books', book);
  } catch (err) {
    console.error('[Storage] Error saving book to IndexedDB:', err);
  }

  // 2. Triple-layer backup update
  try {
    let existing = getStoredBooksMeta();
    try {
      const prefRes = await Preferences.get({ key: STORAGE_KEY_BOOKS_BACKUP });
      if (prefRes.value) {
        const p = JSON.parse(prefRes.value);
        if (Array.isArray(p) && p.length > existing.length) {
          existing = p;
        }
      }
    } catch {}

    const filtered = existing.filter(b => b.id !== book.id);
    const updatedList = [book, ...filtered];
    await syncMetadataBackups(updatedList);
  } catch (e) {
    console.warn('[Storage] Error updating book backups:', e);
  }
}

export async function deleteBook(bookId: string): Promise<void> {
  try {
    const db = await getDB();
    const book = await db.get('books', bookId);
    if (book) {
      await db.delete('files', book.fileStorageKey);
      await db.delete('books', bookId);

      if (Capacitor.isNativePlatform()) {
        try {
          const safeName = sanitizeFileName(book.fileName);
          await Filesystem.deleteFile({
            path: `books/${book.id}_${safeName}`,
            directory: Directory.Data,
          });
        } catch (e) {
          console.warn('[Storage] Could not delete native file copy:', e);
        }
      }
    }
  } catch (err) {
    console.error('[Storage] Error deleting book from IndexedDB:', err);
  }

  // Remove from backups
  try {
    const existing = getStoredBooksMeta();
    const filtered = existing.filter(b => b.id !== bookId);
    await syncMetadataBackups(filtered);
  } catch (e) {
    console.warn('[Storage] Error updating backups after deletion:', e);
  }
}

export async function getAllCategories(): Promise<Category[]> {
  const db = await getDB();
  const categories = await db.getAll('categories');
  if (!categories || categories.length === 0) {
    for (const cat of DEFAULT_CATEGORIES) {
      await db.put('categories', cat);
    }
    return DEFAULT_CATEGORIES;
  }

  // Ensure all default categories (like cat-completed) exist in store
  for (const def of DEFAULT_CATEGORIES) {
    if (!categories.some(c => c.id === def.id)) {
      await db.put('categories', def);
      categories.push(def);
    }
  }

  return categories;
}

export async function saveCategory(category: Category): Promise<void> {
  const db = await getDB();
  await db.put('categories', category);
}

export async function deleteCategory(categoryId: string): Promise<void> {
  const db = await getDB();
  await db.delete('categories', categoryId);

  // Also remove category reference from books
  const books = await db.getAll('books');
  for (const b of books) {
    if (b.categoryIds.includes(categoryId)) {
      b.categoryIds = b.categoryIds.filter((id: string) => id !== categoryId);
      await saveBook(b);
    }
  }
}

export async function getSettings(): Promise<ReadingSettings> {
  const db = await getDB();
  const settings = await db.get('settings', 'user_settings');
  return settings ? { ...DEFAULT_SETTINGS, ...settings } : DEFAULT_SETTINGS;
}

export async function saveSettings(settings: ReadingSettings): Promise<void> {
  const db = await getDB();
  await db.put('settings', settings, 'user_settings');
}

// Utility: Efficient chunked ArrayBuffer to Base64 (avoids callstack or memory limits on large files)
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000; // 32KB chunking
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
    binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
  }
  return window.btoa(binary);
}

// Utility: Base64 to ArrayBuffer
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = window.atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
