import React, { useState, useEffect } from 'react';
import {
  X,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Download,
  ExternalLink,
  AlertCircle,
  Calendar,
  GitBranch,
  ShieldAlert,
  Settings,
  PackageCheck,
  Loader2,
} from 'lucide-react';
import {
  checkForUpdates,
  canInstallUnknownApps,
  openInstallSettings,
  downloadAndInstallUpdate,
  installDownloadedApk,
  CURRENT_APP_VERSION,
  DEFAULT_GITHUB_REPO,
  formatFileSize,
  type UpdateInfo,
  type DownloadProgress,
} from '../services/updater';
import { useBackHandler } from '../services/backButton';
import { Capacitor } from '@capacitor/core';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoCheckOnOpen?: boolean;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  autoCheckOnOpen = true,
}) => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [targetRepo, setTargetRepo] = useState<string>(DEFAULT_GITHUB_REPO);
  const [isEditingRepo, setIsEditingRepo] = useState(false);

  // In-App Download & Installation State
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'readyToInstall' | 'error'>('idle');
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({
    percent: 0,
    bytesDownloaded: 0,
    totalBytes: 0,
  });
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadedApkPath, setDownloadedApkPath] = useState<string | null>(null);
  const [hasInstallPermission, setHasInstallPermission] = useState<boolean>(true);

  // Close with Android Back button (Priority 115) - disabled while downloading to prevent corrupting download
  useBackHandler(() => {
    if (isOpen && downloadStatus !== 'downloading') {
      onClose();
      return true;
    }
    return false;
  }, 115, isOpen && downloadStatus !== 'downloading');

  const checkPermissions = async () => {
    if (Capacitor.isNativePlatform()) {
      const allowed = await canInstallUnknownApps();
      setHasInstallPermission(allowed);
    }
  };

  const performCheck = async (repoToUse = targetRepo) => {
    setStatus('checking');
    setErrorMessage(null);
    setDownloadStatus('idle');
    setDownloadError(null);

    try {
      const info = await checkForUpdates(repoToUse);
      setUpdateInfo(info);
      setStatus('success');
      if (info.hasUpdate) {
        await checkPermissions();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al buscar actualizaciones.');
      setStatus('error');
    }
  };

  useEffect(() => {
    if (isOpen && autoCheckOnOpen) {
      performCheck();
    }
    if (!isOpen) {
      setIsEditingRepo(false);
      setDownloadStatus('idle');
      setDownloadError(null);
    }
  }, [isOpen]);

  const handleStartInAppUpdate = async () => {
    if (!updateInfo?.apkAsset) return;

    setDownloadStatus('downloading');
    setDownloadError(null);
    setDownloadProgress({
      percent: 0,
      bytesDownloaded: 0,
      totalBytes: updateInfo.apkAsset.size || 0,
    });

    try {
      const res = await downloadAndInstallUpdate(
        updateInfo.apkAsset.downloadUrl,
        updateInfo.apkAsset.name,
        progress => {
          setDownloadProgress(progress);
        }
      );

      if (res.path) {
        setDownloadedApkPath(res.path);
      }
      setDownloadStatus('readyToInstall');
    } catch (err: any) {
      console.error('[UpdateModal] In-app update failed:', err);
      setDownloadError(err.message || 'Error al descargar o iniciar la instalación de la APK.');
      setDownloadStatus('error');
    }
  };

  const handleReopenInstaller = async () => {
    if (!downloadedApkPath) return;
    try {
      await installDownloadedApk(downloadedApkPath);
    } catch (err: any) {
      setDownloadError('Error al volver a abrir el instalador: ' + (err.message || String(err)));
    }
  };

  const handleOpenPermissionSettings = async () => {
    await openInstallSettings();
    setTimeout(async () => {
      await checkPermissions();
    }, 1500);
  };

  if (!isOpen) return null;

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={() => {
          if (downloadStatus !== 'downloading') onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#18191c] border border-rose-200 dark:border-zinc-700/80 rounded-3xl shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-200 text-[#4c0519] dark:text-[#f3f4f6] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 dark:from-zinc-700 dark:to-zinc-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#4c0519] dark:text-[#f3f4f6]">
                Actualizaciones
              </h3>
              <p className="text-[11px] text-[#881337]/70 dark:text-zinc-400">
                Directas en la app • v{CURRENT_APP_VERSION}
              </p>
            </div>
          </div>
          {downloadStatus !== 'downloading' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-zinc-800 text-rose-400 dark:text-zinc-400 transition-colors cursor-pointer"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="py-5 overflow-y-auto flex-1 space-y-4">
          {/* Status: Checking */}
          {status === 'checking' && (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full border-3 border-rose-200 dark:border-zinc-700 border-t-rose-500 dark:border-t-zinc-300 animate-spin flex items-center justify-center" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#4c0519] dark:text-zinc-200">
                  Comprobando nuevas versiones...
                </p>
                <p className="text-xs text-rose-400/80 dark:text-zinc-400 font-mono">
                  github.com/{targetRepo}
                </p>
              </div>
            </div>
          )}

          {/* Status: Error during check */}
          {status === 'error' && (
            <div className="py-6 flex flex-col items-center text-center gap-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 dark:bg-zinc-800 border border-rose-300 dark:border-zinc-700 text-rose-500 dark:text-zinc-300 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-xs">
                <p className="text-sm font-bold text-rose-700 dark:text-zinc-200">
                  No se pudo verificar la actualización
                </p>
                <p className="text-xs text-[#881337]/80 dark:text-zinc-400">
                  {errorMessage}
                </p>
              </div>

              <div className="w-full pt-2">
                <button
                  onClick={() => performCheck()}
                  className="w-full py-2.5 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-rose-700 dark:text-zinc-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-rose-200 dark:border-zinc-700"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reintentar comprobación</span>
                </button>
              </div>
            </div>
          )}

          {/* Status: Success with Update Available */}
          {status === 'success' && updateInfo && updateInfo.hasUpdate && (
            <div className="space-y-4 animate-in fade-in">
              {/* Highlight Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-transparent dark:from-zinc-800/80 dark:to-zinc-900 border border-rose-300/80 dark:border-zinc-700 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-900 shadow-xs">
                    ¡Nueva versión lista!
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-zinc-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(updateInfo.publishedAt)}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <h4 className="text-base font-extrabold text-[#4c0519] dark:text-white">
                      {updateInfo.releaseName}
                    </h4>
                    <p className="text-xs text-[#881337]/80 dark:text-zinc-400 font-mono">
                      v{updateInfo.currentVersion} ➔ <span className="font-bold text-rose-600 dark:text-zinc-200">v{updateInfo.latestVersion}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Release Notes */}
              <div>
                <label className="text-[11px] font-bold text-rose-900/80 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Novedades de esta versión
                </label>
                <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-zinc-900/80 border border-rose-200/70 dark:border-zinc-800 text-xs text-[#4c0519] dark:text-zinc-300 max-h-36 overflow-y-auto whitespace-pre-wrap font-sans leading-relaxed">
                  {updateInfo.releaseNotes}
                </div>
              </div>

              {/* Install Permission Warning (Android 8+) */}
              {Capacitor.isNativePlatform() && !hasInstallPermission && (
                <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-400/40 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-[11.5px]">
                      Permiso de instalación requerido
                    </p>
                    <p className="text-[11px] text-amber-700/90 dark:text-amber-300/80 leading-tight">
                      Para actualizar directamente desde READER sin salir al navegador, activa la opción <strong>"Permitir desde esta fuente"</strong> en los ajustes de tu teléfono.
                    </p>
                    <button
                      onClick={handleOpenPermissionSettings}
                      className="mt-1 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-100 rounded-lg font-bold text-[10.5px] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Settings className="w-3 h-3" />
                      <span>Abrir ajustes de Android</span>
                    </button>
                  </div>
                </div>
              )}

              {/* In-App Downloading State */}
              {downloadStatus === 'downloading' && (
                <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-zinc-900 border border-rose-200/90 dark:border-zinc-700 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#4c0519] dark:text-zinc-200">
                      <Loader2 className="w-4 h-4 animate-spin text-rose-500 dark:text-zinc-300" />
                      <span>Descargando actualización en la app...</span>
                    </div>
                    <span className="font-mono font-extrabold text-rose-600 dark:text-zinc-100">
                      {downloadProgress.percent}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-rose-200/70 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-400 dark:to-zinc-200 rounded-full transition-all duration-150 ease-out shadow-xs"
                      style={{ width: `${Math.min(100, Math.max(2, downloadProgress.percent))}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#881337]/75 dark:text-zinc-400 font-mono">
                    <span>
                      {formatFileSize(downloadProgress.bytesDownloaded)} de {formatFileSize(downloadProgress.totalBytes)}
                    </span>
                    <span>No cierres la app</span>
                  </div>
                </div>
              )}

              {/* In-App Ready to Install / Installer Launched State */}
              {downloadStatus === 'readyToInstall' && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/40 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    <PackageCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>¡Descarga lista! Se ha lanzado el instalador.</span>
                  </div>
                  <p className="text-[11.5px] text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed">
                    Confirma <strong>"Actualizar"</strong> o <strong>"Instalar"</strong> en la ventana emergente de Android para completar el proceso.
                  </p>

                  <button
                    onClick={handleReopenInstaller}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Volver a abrir el instalador de Android</span>
                  </button>
                </div>
              )}

              {/* Download Error Notice */}
              {downloadStatus === 'error' && (
                <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>Error durante la actualización</span>
                  </div>
                  <p className="text-[11px] opacity-90 leading-tight">
                    {downloadError}
                  </p>
                </div>
              )}

              {/* Primary Action Buttons */}
              {downloadStatus !== 'downloading' && (
                <div className="space-y-2 pt-1">
                  {updateInfo.apkAsset ? (
                    <button
                      onClick={handleStartInAppUpdate}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:from-zinc-200 dark:to-zinc-300 dark:hover:from-white dark:hover:to-zinc-200 text-white dark:text-zinc-950 font-bold text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4 stroke-[2.5]" />
                      <span>
                        {downloadStatus === 'readyToInstall'
                          ? 'Reinstalar actualización'
                          : `Actualizar directamente (${formatFileSize(updateInfo.apkAsset.size)})`}
                      </span>
                    </button>
                  ) : (
                    <a
                      href={updateInfo.releaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 dark:from-zinc-200 dark:to-zinc-300 text-white dark:text-zinc-950 font-bold text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                      <span>Ver actualización en GitHub</span>
                    </a>
                  )}

                  {/* Optional GitHub release link */}
                  <a
                    href={updateInfo.releaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-2xl text-[11px] text-[#881337]/70 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Ver notas completas en GitHub</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Status: Success and Up to Date */}
          {status === 'success' && updateInfo && !updateInfo.hasUpdate && (
            <div className="py-8 flex flex-col items-center text-center gap-3 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-400 text-emerald-500 flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#4c0519] dark:text-white">
                  ¡READER está actualizado!
                </h4>
                <p className="text-xs text-[#881337]/75 dark:text-zinc-400">
                  Actualmente tienes la versión más reciente instalada.
                </p>
                <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                  Versión actual: v{CURRENT_APP_VERSION}
                </p>
              </div>

              <div className="w-full pt-4 space-y-2">
                <button
                  onClick={() => performCheck()}
                  className="w-full py-2.5 rounded-2xl bg-rose-50 dark:bg-zinc-800 hover:bg-rose-100 dark:hover:bg-zinc-700 text-[#881337] dark:text-zinc-300 font-semibold text-xs border border-rose-200 dark:border-zinc-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Volver a comprobar</span>
                </button>

                <a
                  href={updateInfo.releaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-2xl text-[11px] text-[#881337]/70 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Ver releases en GitHub</span>
                </a>
              </div>
            </div>
          )}

          {/* Repository configuration toggle */}
          {downloadStatus !== 'downloading' && (
            <div className="pt-2 border-t border-rose-100 dark:border-zinc-800/80">
              {isEditingRepo ? (
                <div className="space-y-2 p-3 rounded-2xl bg-rose-50/50 dark:bg-zinc-900 border border-rose-200/60 dark:border-zinc-800">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-rose-900/70 dark:text-zinc-400 block">
                    Repositorio de GitHub
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={targetRepo}
                      onChange={e => setTargetRepo(e.target.value)}
                      placeholder="usuario/repositorio"
                      className="flex-1 px-3 py-1.5 text-xs font-mono bg-white dark:bg-zinc-800 border border-rose-200 dark:border-zinc-700 rounded-xl outline-none"
                    />
                    <button
                      onClick={() => {
                        setIsEditingRepo(false);
                        performCheck(targetRepo);
                      }}
                      className="px-3 py-1.5 bg-rose-500 dark:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-[11px] text-rose-800/60 dark:text-zinc-500">
                  <span>Repositorio: <strong className="font-mono text-rose-900/80 dark:text-zinc-400">{targetRepo}</strong></span>
                  <button
                    onClick={() => setIsEditingRepo(true)}
                    className="text-rose-500 dark:text-zinc-400 hover:underline cursor-pointer"
                  >
                    Cambiar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {downloadStatus !== 'downloading' && (
          <div className="pt-3 border-t border-rose-100 dark:border-zinc-800 shrink-0">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl bg-rose-100/70 hover:bg-rose-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#881337] dark:text-zinc-200 font-bold text-xs transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
