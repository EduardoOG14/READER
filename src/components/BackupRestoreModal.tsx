import React, { useState, useRef } from 'react';
import {
  X,
  Database,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  FolderArchive,
  RefreshCw,
} from 'lucide-react';
import { useSwipeDownToClose } from '../hooks/useSwipeDownToClose';
import { useBackHandler } from '../services/backButton';
import { exportBackupFile, restoreBackupFromJson } from '../services/backupRestore';
import { useApp } from '../context/AppContext';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({ isOpen, onClose }) => {
  const { books, categories, refreshLibrary } = useApp();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<{
    date: string;
    booksCount: number;
    categoriesCount: number;
  } | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreSuccess, setRestoreSuccess] = useState<string | null>(null);
  const [restoreError, setRestoreError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { dragHandleProps, modalStyle } = useSwipeDownToClose({ onClose });

  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 115, isOpen);

  if (!isOpen) return null;

  // Total bookmarks across all books
  const totalBookmarks = books.reduce((acc, b) => acc + (b.bookmarks?.length || 0), 0);

  const handleExport = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    try {
      await exportBackupFile();
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (e: any) {
      console.error('Export error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestoreError(null);
    setRestoreSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (parsed.books && Array.isArray(parsed.books)) {
          setFilePreview({
            date: parsed.timestamp ? new Date(parsed.timestamp).toLocaleDateString() : 'Desconocida',
            booksCount: parsed.books.length,
            categoriesCount: parsed.categories?.length || 0,
          });
        } else {
          setRestoreError('El archivo seleccionado no es una copia de seguridad válida.');
          setFilePreview(null);
        }
      } catch {
        setRestoreError('Error al leer el archivo JSON.');
        setFilePreview(null);
      }
    };
    reader.readAsText(file);
  };

  const handleRestore = async () => {
    if (!selectedFile) return;
    setIsRestoring(true);
    setRestoreError(null);
    setRestoreSuccess(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await restoreBackupFromJson(reader.result as string);
        if (res.success) {
          await refreshLibrary();
          setRestoreSuccess(
            `¡Restauración exitosa! Se recuperaron ${res.restoredBooks} obras y ${res.restoredCategories} carpetas.`
          );
          setSelectedFile(null);
          setFilePreview(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
          setRestoreError(res.error || 'Error al restaurar los datos.');
        }
      } catch (err: any) {
        setRestoreError(err.message || 'Error inesperado durante la restauración.');
      } finally {
        setIsRestoring(false);
      }
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        style={modalStyle}
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border-t sm:border border-rose-200/80 dark:border-zinc-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div
          className="w-full flex items-center justify-center pt-0 pb-2.5 -mt-2 cursor-grab active:cursor-grabbing touch-none select-none shrink-0 sm:hidden"
          {...dragHandleProps}
        >
          <div className="w-12 h-1.5 bg-rose-200 dark:bg-zinc-700 rounded-full" />
        </div>

        {/* Modal Header */}
        <div
          {...dragHandleProps}
          className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-zinc-800 shrink-0 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Database className="w-5 h-5 stroke-[2.3]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#4c0519] dark:text-zinc-100">
                Copia de Seguridad
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                Guarda y restaura tus libros, marcadores y citas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-3.5 space-y-4 pr-1">
          {/* SECTION 1: EXPORTAR */}
          <div className="p-4 rounded-3xl bg-rose-50/70 dark:bg-zinc-800/60 border border-rose-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-black text-[#4c0519] dark:text-zinc-100">
                1. Crear Copia de Seguridad
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
              Descarga un archivo con toda tu información para no perder tus avances si cambias de teléfono o reinstalas la app:
            </p>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-rose-100 dark:border-zinc-800">
                <span className="text-xs font-black text-[#4c0519] dark:text-zinc-100 block">
                  {books.length}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400">Obras</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-rose-100 dark:border-zinc-800">
                <span className="text-xs font-black text-[#4c0519] dark:text-zinc-100 block">
                  {categories.length}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400">Carpetas</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-rose-100 dark:border-zinc-800">
                <span className="text-xs font-black text-[#4c0519] dark:text-zinc-100 block">
                  {totalBookmarks}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400">Marcadores/Citas</span>
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`w-full py-3 px-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                exportSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-500 hover:bg-rose-600 text-white active:scale-98'
              }`}
            >
              {exportSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Copia descargada exitosamente!</span>
                </>
              ) : isExporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Preparando archivo...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Descargar Copia de Seguridad</span>
                </>
              )}
            </button>
          </div>

          {/* SECTION 2: RESTAURAR */}
          <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-rose-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-black text-[#4c0519] dark:text-zinc-100">
                2. Restaurar Copia de Seguridad
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
              Selecciona un archivo de respaldo previo (<code>.json</code>) para recuperar tus lecturas y carpetas:
            </p>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json,.readerbackup"
              onChange={handleFileChange}
              className="hidden"
            />

            {!selectedFile ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-rose-200 dark:border-zinc-700 hover:border-rose-400 text-slate-700 dark:text-zinc-300 hover:bg-rose-50/50 dark:hover:bg-zinc-800/50 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FolderArchive className="w-4 h-4 text-rose-500" />
                <span>Seleccionar archivo de respaldo</span>
              </button>
            ) : (
              <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-blue-950 dark:text-blue-200 truncate">
                      {selectedFile.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setFilePreview(null);
                    }}
                    className="text-[11px] text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                  >
                    Cambiar
                  </button>
                </div>

                {filePreview && (
                  <div className="text-[11px] text-blue-800 dark:text-blue-300/90 flex items-center gap-3 font-medium">
                    <span>📅 {filePreview.date}</span>
                    <span>📚 {filePreview.booksCount} obras</span>
                    <span>📁 {filePreview.categoriesCount} carpetas</span>
                  </div>
                )}

                <button
                  onClick={handleRestore}
                  disabled={isRestoring}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 cursor-pointer"
                >
                  {isRestoring ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Restaurando datos...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirmar y Restaurar Todo</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {restoreSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span className="font-semibold">{restoreSuccess}</span>
              </div>
            )}

            {restoreError && (
              <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span className="font-semibold">{restoreError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-rose-100 dark:border-zinc-800 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-rose-100 hover:bg-rose-200 text-[#881337] dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 font-black text-xs transition-colors cursor-pointer"
          >
            ✓ Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
