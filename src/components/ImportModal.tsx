import React, { useState, useRef } from 'react';
import { X, UploadCloud, FileCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose }) => {
  const { importFiles, categories, selectedCategoryId } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTargetCat, setSelectedTargetCat] = useState<string>(
    selectedCategoryId !== 'cat-all' && selectedCategoryId !== 'cat-favorites'
      ? selectedCategoryId
      : ''
  );
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setStatusMessage(null);

    const targetCats = selectedTargetCat ? [selectedTargetCat] : [];
    const result = await importFiles(files, targetCats);

    setIsProcessing(false);

    if (result.success > 0 && result.failed === 0) {
      setStatusMessage({
        type: 'success',
        text: `¡${result.success} libro(s) importado(s) exitosamente! Se ha creado una copia local en el almacenamiento de la app.`,
      });
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
      }, 1500);
    } else if (result.success > 0 && result.failed > 0) {
      setStatusMessage({
        type: 'success',
        text: `Se importaron ${result.success} archivos. ${result.failed} fallaron (${result.errors[0]}).`,
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: result.errors[0] || 'Error al importar los archivos seleccionados.',
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-[#fff0f5] dark:bg-[#0a2920] border border-[#fecdd9] dark:border-[#165b48] rounded-3xl p-6 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#fecdd9]/70 dark:border-[#165b48]/70">
          <div>
            <h2 className="text-lg font-bold text-[#4c0519] dark:text-[#ecfdf5]">
              Importar Libros y Mangas
            </h2>
            <p className="text-xs text-[#881337]/75 dark:text-[#a7f3d0]/75 mt-0.5">
              Se creará una copia local segura en el almacenamiento de la app.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-full text-rose-400 hover:text-rose-700 dark:text-emerald-400 dark:hover:text-emerald-200 hover:bg-[#ffe4ec] dark:hover:bg-[#0f382c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category assign selector */}
        <div className="my-4">
          <label className="block text-xs font-semibold text-[#881337] dark:text-[#a7f3d0] mb-1.5">
            Asignar a categoría (Opcional):
          </label>
          <select
            value={selectedTargetCat}
            onChange={e => setSelectedTargetCat(e.target.value)}
            className="w-full text-sm bg-white dark:bg-[#06241c] border border-[#fecdd9] dark:border-[#165b48] rounded-xl px-3 py-2 text-[#4c0519] dark:text-[#ecfdf5] outline-none focus:ring-2 focus:ring-rose-400 dark:focus:ring-emerald-400"
          >
            <option value="">Automática (según tipo de archivo)</option>
            {categories
              .filter(c => c.id !== 'cat-all')
              .map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={e => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-rose-500 bg-rose-50 dark:border-emerald-400 dark:bg-emerald-950/20'
              : 'border-[#fda4bb] dark:border-[#1a634e] hover:border-rose-400 dark:hover:border-emerald-400 bg-white/70 dark:bg-[#06241c]/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.cbz,.cbr,.zip,.epub,.txt,.md"
            onChange={e => e.target.files && handleFiles(e.target.files)}
            className="hidden"
          />

          {isProcessing ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin mb-3" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Procesando y copiando archivos...
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Generando miniaturas de portada y guardando en almacenamiento interno
              </p>
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-blue-100/70 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <UploadCloud className="w-7 h-7" />
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Haz clic para seleccionar o arrastra archivos aquí
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                Formatos soportados: <span className="font-medium text-slate-700 dark:text-slate-300">PDF, CBZ, CBR, ZIP, EPUB, TXT, MD</span>
              </p>
            </>
          )}
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`mt-4 p-3 rounded-xl flex items-start gap-2.5 text-xs font-medium animate-in fade-in duration-150 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <FileCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
