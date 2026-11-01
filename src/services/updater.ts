/**
 * GitHub Release Update Checker for READER
 */

export const CURRENT_APP_VERSION = '1.0.0';
export const DEFAULT_GITHUB_REPO = 'EduardoOG14/READER';

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
