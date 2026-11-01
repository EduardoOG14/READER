import { registerPlugin, Capacitor, type PluginListenerHandle } from '@capacitor/core';

/**
 * GitHub Release Update Checker for READER
 */

export const CURRENT_APP_VERSION = '1.0.1';
export const DEFAULT_GITHUB_REPO = 'EduardoOG14/READER';

export interface DownloadProgress {
  percent: number;
  bytesDownloaded: number;
  totalBytes: number;
}

export interface AppUpdaterPluginInterface {
  canRequestPackageInstalls(): Promise<{ value: boolean }>;
  openInstallPermissionSettings(): Promise<void>;
  downloadAndInstall(options: { url: string; fileName?: string }): Promise<{ success: boolean; path: string }>;
  installApk(options: { path: string }): Promise<{ success: boolean }>;
  addListener(
    eventName: 'downloadProgress',
    listenerFunc: (progress: DownloadProgress) => void
  ): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'downloadComplete',
    listenerFunc: (progress: DownloadProgress) => void
  ): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'downloadError',
    listenerFunc: (error: { error: string }) => void
  ): Promise<PluginListenerHandle>;
}

export const NativeAppUpdater = registerPlugin<AppUpdaterPluginInterface>('AppUpdater');

export interface UpdateAsset {
  name: string;
  size: number;
  downloadUrl: string;
  downloadCount: number;
}

export interface UpdateInfo {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  releaseName: string;
  releaseNotes: string;
  publishedAt: string;
  releaseUrl: string;
  apkAsset?: UpdateAsset;
}

/**
 * Compare two semver strings (e.g. "v1.2.0" and "1.1.5")
 * Returns 1 if v1 > v2, -1 if v1 < v2, 0 if equal.
 */
export function compareSemver(v1: string, v2: string): number {
  const clean = (v: string) => v.replace(/^v/i, '').trim();
  const parts1 = clean(v1).split('.').map(p => parseInt(p, 10) || 0);
  const parts2 = clean(v2).split('.').map(p => parseInt(p, 10) || 0);
  const maxLen = Math.max(parts1.length, parts2.length);

  for (let i = 0; i < maxLen; i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
}

/**
 * Format bytes into human readable string (e.g. 5.4 MB)
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

/**
 * Checks GitHub for the latest published release in the specified repository.
 */
export async function checkForUpdates(repo: string = DEFAULT_GITHUB_REPO): Promise<UpdateInfo> {
  const targetRepo = (repo || DEFAULT_GITHUB_REPO).trim().replace(/^https?:\/\/github\.com\//i, '');
  const url = `https://api.github.com/repos/${targetRepo}/releases/latest`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    });
  } catch (err: any) {
    throw new Error('No se pudo conectar a GitHub. Verifica tu conexión a internet.');
  }

  if (response.status === 404) {
    throw new Error(`Aún no hay ningún release publicado en el repositorio ${targetRepo}.`);
  }

  if (response.status === 403) {
    throw new Error('Límite de solicitudes de la API de GitHub alcanzado. Intenta de nuevo en unos minutos.');
  }

  if (!response.ok) {
    throw new Error(`Error de GitHub (${response.status}): ${response.statusText}`);
  }

  const release = await response.json();
  const rawTag = release.tag_name || '';
  const latestVersion = rawTag.replace(/^v/i, '').trim();
  const hasUpdate = compareSemver(latestVersion, CURRENT_APP_VERSION) > 0;

  // Search for an attached APK asset
  let apkAsset: UpdateAsset | undefined;
  if (Array.isArray(release.assets)) {
    const found = release.assets.find((asset: any) =>
      typeof asset.name === 'string' && asset.name.toLowerCase().endsWith('.apk')
    );
    if (found) {
      apkAsset = {
        name: found.name,
        size: found.size || 0,
        downloadUrl: found.browser_download_url,
        downloadCount: found.download_count || 0,
      };
    }
  }

  return {
    hasUpdate,
    currentVersion: CURRENT_APP_VERSION,
    latestVersion: latestVersion || CURRENT_APP_VERSION,
    releaseName: release.name || rawTag || 'Nueva versión',
    releaseNotes: release.body || 'Sin notas de la versión publicadas.',
    publishedAt: release.published_at || new Date().toISOString(),
    releaseUrl: release.html_url || `https://github.com/${targetRepo}/releases`,
    apkAsset,
  };
}

/**
 * Checks whether the app has permission to request package installation on Android 8+
 */
export async function canInstallUnknownApps(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return true;
  try {
    const res = await NativeAppUpdater.canRequestPackageInstalls();
    return res.value;
  } catch (e) {
    console.warn('[Updater] Could not check install permissions:', e);
    return true;
  }
}

/**
 * Opens system settings for unknown app installation permissions on Android
 */
export async function openInstallSettings(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await NativeAppUpdater.openInstallPermissionSettings();
  } catch (e) {
    console.warn('[Updater] Could not open install permission settings:', e);
  }
}

/**
 * Downloads and triggers in-app installation of the APK file directly on the device
 */
export async function downloadAndInstallUpdate(
  apkUrl: string,
  fileName?: string,
  onProgress?: (progress: DownloadProgress) => void
): Promise<{ success: boolean; path?: string }> {
  if (!Capacitor.isNativePlatform()) {
    // Web / Desktop Fallback: trigger browser download
    const a = document.createElement('a');
    a.href = apkUrl;
    a.download = fileName || 'READER.apk';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return { success: true };
  }

  let progressHandle: PluginListenerHandle | null = null;
  if (onProgress) {
    progressHandle = await NativeAppUpdater.addListener('downloadProgress', p => {
      onProgress(p);
    });
  }

  try {
    const result = await NativeAppUpdater.downloadAndInstall({
      url: apkUrl,
      fileName,
    });
    return result;
  } finally {
    if (progressHandle) {
      await progressHandle.remove();
    }
  }
}

/**
 * Re-triggers native installation intent for an already downloaded APK
 */
export async function installDownloadedApk(path: string): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  try {
    const res = await NativeAppUpdater.installApk({ path });
    return res.success;
  } catch (err) {
    console.error('[Updater] Failed to launch installer:', err);
    throw err;
  }
}

