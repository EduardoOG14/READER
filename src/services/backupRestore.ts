import { getAllBooks, getAllCategories, getSettings, saveBook, saveCategory, saveSettings } from './storage';
import { getReadingStats, saveReadingStats } from './readingStats';
import type { Book, Category, ReadingSettings, ReadingStats } from '../types';

export interface BackupData {
  version: string;
  timestamp: number;
  appName: string;
  books: Book[];
  categories: Category[];
  settings: ReadingSettings;
  stats: ReadingStats;
}

export async function createBackupData(): Promise<BackupData> {
  const [books, categories, settings, stats] = await Promise.all([
    getAllBooks(),
    getAllCategories(),
    getSettings(),
    getReadingStats(),
  ]);

  return {
    version: '1.2.0',
    timestamp: Date.now(),
    appName: 'Lector de Libros y Mangas',
    books,
    categories,
    settings,
    stats,
  };
}

export async function exportBackupFile(): Promise<{ fileName: string; json: string }> {
  const data = await createBackupData();
  const dateStr = new Date().toISOString().slice(0, 10);
  const fileName = `lector_respaldo_${dateStr}.json`;
  const json = JSON.stringify(data, null, 2);

  // Trigger web download
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);

  return { fileName, json };
}

export async function restoreBackupFromJson(jsonString: string): Promise<{
  success: boolean;
  restoredBooks: number;
  restoredCategories: number;
  error?: string;
}> {
  try {
    const data: Partial<BackupData> = JSON.parse(jsonString);

    if (!data.books || !Array.isArray(data.books)) {
      throw new Error('El archivo de respaldo no contiene una lista válida de libros.');
    }

    // 1. Restore categories if present
    let restoredCategories = 0;
    if (data.categories && Array.isArray(data.categories)) {
      for (const cat of data.categories) {
        if (cat.id && cat.name) {
          await saveCategory(cat);
          restoredCategories++;
        }
      }
    }

    // 2. Restore settings if present
    if (data.settings && typeof data.settings === 'object') {
      await saveSettings(data.settings);
    }

    // 3. Restore reading stats if present
    if (data.stats && typeof data.stats === 'object') {
      await saveReadingStats(data.stats);
    }

    // 4. Restore books
    let restoredBooks = 0;
    for (const b of data.books) {
      if (b.id && b.title) {
        await saveBook(b);
        restoredBooks++;
      }
    }

    return {
      success: true,
      restoredBooks,
      restoredCategories,
    };
  } catch (err: any) {
    console.error('[BackupRestore] Error parsing or restoring backup:', err);
    return {
      success: false,
      restoredBooks: 0,
      restoredCategories: 0,
      error: err.message || 'Error desconocido al procesar el archivo.',
    };
  }
}
