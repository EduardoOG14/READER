import JSZip from 'jszip';
import { saveBook, saveBookFile } from './storage';
import type { Book } from '../types';
import { createMangaTankobonCoverSvg } from './coverFetcher';

export async function loadDemoContent(): Promise<Book[]> {
  const books: Book[] = [];

  // 1. Create Demo Manga (.cbz)
  try {
    const mangaZip = new JSZip();
    const pageColors = [
      { bg: '#1e1b4b', text: '#c7d2fe', title: 'Capítulo 1: El Despertar', num: 1 },
      { bg: '#0f172a', text: '#cbd5e1', title: 'Panel 1: La Niebla Nocturna', num: 2 },
      { bg: '#18181b', text: '#e4e4e7', title: 'Panel 2: La Ciudad Dormida', num: 3 },
      { bg: '#030712', text: '#9ca3af', title: 'Panel 3: El Encuentro', num: 4 },
      { bg: '#172554', text: '#bfdbfe', title: 'Panel 4: Continuará...', num: 5 },
    ];

    for (const p of pageColors) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">
        <rect width="800" height="1200" fill="${p.bg}"/>
        <rect x="40" y="40" width="720" height="1120" fill="none" stroke="#334155" stroke-width="4" stroke-dasharray="8 8"/>
        <text x="400" y="300" fill="${p.text}" font-size="32" font-family="sans-serif" font-weight="bold" text-anchor="middle">MANGA DEMO</text>
        <text x="400" y="400" fill="#f8fafc" font-size="44" font-family="sans-serif" font-weight="bold" text-anchor="middle">${p.title}</text>
        <circle cx="400" cy="650" r="160" fill="#2563eb" fill-opacity="0.2" stroke="#60a5fa" stroke-width="4"/>
        <text x="400" y="665" fill="#f8fafc" font-size="28" font-family="sans-serif" text-anchor="middle">Ilustración Página ${p.num}</text>
        <text x="400" y="980" fill="#94a3b8" font-size="20" font-family="sans-serif" text-anchor="middle">Usa los filtros de lectura para ajustar el contraste y descanso visual</text>
        <text x="400" y="1080" fill="#64748b" font-size="18" font-family="sans-serif" text-anchor="middle">- Página ${p.num} de ${pageColors.length} -</text>
      </svg>`;

      mangaZip.file(`page_${String(p.num).padStart(3, '0')}.svg`, svg);
    }

    const mangaBuffer = await mangaZip.generateAsync({ type: 'arraybuffer' });
    const mangaId = `book_demo_manga_${Date.now()}`;
    const mangaStorageKey = await saveBookFile(mangaId, 'Manga_Demo_Cap1.cbz', mangaBuffer);

    // Tankobon Cover SVG
    const coverSvg = createMangaTankobonCoverSvg('El Viajero de las Sombras', 'K. Tanaka', 'manga');

    const mangaBook: Book = {
      id: mangaId,
      title: 'El Viajero de las Sombras (Cap. 1)',
      author: 'K. Tanaka',
      format: 'cbz',
      fileName: 'El_Viajero_Cap1.cbz',
      fileSize: mangaBuffer.byteLength,
      dateAdded: Date.now() - 3600000,
      currentPage: 1,
      totalPages: 5,
      progress: 0,
      coverUrl: `data:image/svg+xml;utf8,${encodeURIComponent(coverSvg)}`,
      categoryIds: ['cat-manga'],
      tags: ['Manga', 'Fantasía', 'Acción'],
      fileStorageKey: mangaStorageKey,
    };

    await saveBook(mangaBook);
    books.push(mangaBook);
  } catch (err) {
    console.error('Error generating manga demo:', err);
  }

  // 2. Create Demo Book (TXT/MD)
  try {
    const textContent = `# Guía del Lector Digital Minimalista

Bienvenido a tu nuevo lector de libros y mangas móvil. Esta aplicación fue diseñada pensando en la simplicidad, la concentración y el cuidado de tu vista.

## Características Principales

1. **Gestión de Almacenamiento Local**: Cuando importas cualquier archivo desde las carpetas de tu dispositivo, la aplicación crea una copia autónoma en su propio almacenamiento. Así tus libros siempre estarán disponibles.

2. **Organización por Categorías**: Puedes crear todas las categorías que desees de forma manual, organizando tu catálogo por géneros, autores o estado de lectura.

3. **Confort Visual y Filtros**:
   - **Modo Oscuro OLED**: Para reducir el consumo de batería y la fatiga ocular.
   - **Sepia Papel**: Simula la calidez del papel de un libro físico.
   - **Luz Cálida (Anti Luz Azul)**: Bloquea las frecuencias de luz fría ideales para leer antes de dormir.
   - **Modo Nocturno Invertido**: Invierte el contraste para lectura en la oscuridad absoluta.
   - **Atenuador de Brillo**: Permite bajar la luminosidad incluso más allá del brillo mínimo del sistema.

## Consejos de Navegación

Toca en el centro de la pantalla mientras lees para mostrar u ocultar la barra de herramientas y sumergirte en una lectura 100% libre de distracciones.

¡Disfruta de la lectura!
`;

    const encoder = new TextEncoder();
    const textBuffer = encoder.encode(textContent).buffer;
    const textId = `book_demo_text_${Date.now()}`;
    const textStorageKey = await saveBookFile(textId, 'Guia_Lector_Minimalista.md', textBuffer);

    const bookCoverSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420">
      <defs>
        <linearGradient id="tgrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
      <rect width="300" height="420" rx="8" fill="url(#tgrad)"/>
      <rect x="18" y="18" width="264" height="384" rx="6" fill="none" stroke="#334155" stroke-width="2"/>
      <text x="30" y="55" fill="#38bdf8" font-size="12" font-family="sans-serif" font-weight="bold" letter-spacing="2">GUÍA OFICIAL</text>
      <text x="30" y="110" fill="#ffffff" font-size="22" font-family="sans-serif" font-weight="bold">Lector Minimalista</text>
      <text x="30" y="140" fill="#94a3b8" font-size="16" font-family="sans-serif">Manual y Recomendaciones</text>
      <circle cx="150" cy="260" r="50" fill="#1e293b" stroke="#475569" stroke-width="2"/>
      <text x="150" y="267" fill="#38bdf8" font-size="28" font-family="sans-serif" text-anchor="middle">📖</text>
      <text x="30" y="375" fill="#64748b" font-size="12" font-family="sans-serif">Lectura Relajante • Modo Noche</text>
    </svg>`;

    const textBook: Book = {
      id: textId,
      title: 'Guía del Lector Minimalista',
      author: 'Antigravity Editorial',
      format: 'md',
      fileName: 'Guia_Lector.md',
      fileSize: textBuffer.byteLength,
      dateAdded: Date.now(),
      currentPage: 1,
      totalPages: 3,
      progress: 0,
      coverUrl: `data:image/svg+xml;utf8,${encodeURIComponent(bookCoverSvg)}`,
      categoryIds: ['cat-books', 'cat-favorites'],
      tags: ['Guía', 'Favorito', 'Manual'],
      fileStorageKey: textStorageKey,
    };

    await saveBook(textBook);
    books.push(textBook);
  } catch (err) {
    console.error('Error generating text demo:', err);
  }

  return books;
}
