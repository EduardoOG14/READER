import { Capacitor, CapacitorHttp } from '@capacitor/core';

export interface HttpFetchOptions {
  headers?: Record<string, string>;
  timeoutMs?: number;
  params?: Record<string, string>;
}

const DEFAULT_USER_AGENT = 'READER-MangaApp/1.3.1 (https://github.com/EduardoOG14/READER)';

/**
 * Universal JSON Fetcher that works seamlessly across Web and native Android.
 * Bypasses CORS and avoids the Capacitor WebView interceptor bug.
 */
export async function httpGetJson<T = any>(url: string, options: HttpFetchOptions = {}): Promise<T> {
  const headers = {
    'User-Agent': DEFAULT_USER_AGENT,
    'Accept': 'application/json',
    ...(options.headers || {}),
  };

  if (Capacitor.isNativePlatform()) {
    const res = await CapacitorHttp.get({
      url,
      headers,
      params: options.params,
      connectTimeout: options.timeoutMs || 15000,
      readTimeout: options.timeoutMs || 25000,
    });

    if (res.status >= 400) {
      throw new Error(`Error del servidor (${res.status}) al conectar con ${new URL(url).hostname}`);
    }

    if (typeof res.data === 'string') {
      try {
        return JSON.parse(res.data) as T;
      } catch {
        throw new Error(`El servidor respondió con contenido no válido (${res.status}): ${res.data.slice(0, 100)}`);
      }
    }
    return res.data as T;
  }

  // Web fallback
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs || 15000);
  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const text = await res.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Error(`El servidor respondió con formato no reconocido: ${text.slice(0, 80)}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Universal Blob/Binary Fetcher for covers, manga pages, and files.
 */
export async function httpGetBlob(url: string, options: HttpFetchOptions = {}): Promise<Blob> {
  const headers = {
    'User-Agent': DEFAULT_USER_AGENT,
    ...(options.headers || {}),
  };

  if (Capacitor.isNativePlatform()) {
    const res = await CapacitorHttp.get({
      url,
      headers,
      responseType: 'blob',
      connectTimeout: options.timeoutMs || 15000,
      readTimeout: options.timeoutMs || 30000,
    });

    if (res.status >= 400) {
      throw new Error(`Error ${res.status} al descargar archivo.`);
    }

    const mime =
      res.headers['Content-Type'] ||
      res.headers['content-type'] ||
      (url.endsWith('.png') ? 'image/png' : 'image/jpeg');

    if (typeof res.data === 'string') {
      // Decode base64 to binary
      const base64Clean = res.data.replace(/\s+/g, '');
      const binaryString = atob(base64Clean);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new Blob([bytes], { type: mime });
    }

    return new Blob([res.data], { type: mime });
  }

  // Web fallback
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs || 25000);
  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} al descargar archivo.`);
    return await res.blob();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Universal Text Fetcher for Project Gutenberg and book texts.
 */
export async function httpGetText(url: string, options: HttpFetchOptions = {}): Promise<string> {
  const headers = {
    'User-Agent': DEFAULT_USER_AGENT,
    ...(options.headers || {}),
  };

  if (Capacitor.isNativePlatform()) {
    const res = await CapacitorHttp.get({
      url,
      headers,
      responseType: 'text',
      connectTimeout: options.timeoutMs || 15000,
      readTimeout: options.timeoutMs || 30000,
    });

    if (res.status >= 400) {
      throw new Error(`Error ${res.status} al descargar texto.`);
    }
    return typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs || 25000);
  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} al descargar texto.`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}
