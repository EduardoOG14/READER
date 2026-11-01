import JSZip from 'jszip';
import type { ComicPanelData, BookChapterData } from './types';

export function createCoverSvg(
  title: string,
  author: string,
  tag: string,
  fromColor: string,
  toColor: string,
  accentColor: string
): string {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeAuthor = author.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
    <defs>
      <linearGradient id="cgrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${fromColor}"/>
        <stop offset="100%" stop-color="${toColor}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="600" rx="12" fill="url(#cgrad)"/>
    <rect x="20" y="20" width="360" height="560" rx="8" fill="none" stroke="${accentColor}" stroke-opacity="0.35" stroke-width="2"/>
    <rect x="30" y="30" width="340" height="540" rx="6" fill="none" stroke="${accentColor}" stroke-opacity="0.15" stroke-width="1"/>
    
    <g transform="translate(35, 60)">
      <rect x="0" y="0" width="130" height="26" rx="13" fill="${accentColor}" fill-opacity="0.25"/>
      <text x="65" y="17" fill="#ffffff" font-size="11" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="1.5">${tag.toUpperCase()}</text>
    </g>

    <text x="35" y="170" fill="#ffffff" font-size="28" font-family="system-ui, -apple-system, sans-serif" font-weight="900">${safeTitle.slice(0, 24)}</text>
    ${safeTitle.length > 24 ? `<text x="35" y="205" fill="#ffffff" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="900">${safeTitle.slice(24, 50)}</text>` : ''}
    
    <line x1="35" y1="${safeTitle.length > 24 ? 225 : 195}" x2="110" y2="${safeTitle.length > 24 ? 225 : 195}" stroke="${accentColor}" stroke-width="3" stroke-linecap="round"/>
    
    <text x="35" y="${safeTitle.length > 24 ? 260 : 230}" fill="#e2e8f0" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">${safeAuthor}</text>
    <text x="35" y="${safeTitle.length > 24 ? 285 : 255}" fill="#94a3b8" font-size="12" font-family="system-ui, -apple-system, sans-serif">Edición íntegra en Español</text>

    <circle cx="200" cy="420" r="70" fill="${accentColor}" fill-opacity="0.12" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="2"/>
    <text x="200" y="426" fill="#ffffff" font-size="14" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="middle">READER</text>
    <text x="200" y="444" fill="#cbd5e1" font-size="10" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">BIBLIOTECA</text>

    <text x="200" y="550" fill="#94a3b8" font-size="11" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">100% en Español • Lectura Offline</text>
  </svg>`;
}

export async function generateMangaCbz(
  title: string,
  author: string,
  pagesData: ComicPanelData[]
): Promise<File> {
  const zip = new JSZip();

  for (const p of pagesData) {
    const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeAuthor = author.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeChapter = p.chapter.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeScene = p.scene.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeDialogue = p.dialogue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safePanel = p.panelText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const pageSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1350" viewBox="0 0 900 1350">
      <rect width="900" height="1350" fill="#090a0f"/>
      <rect x="25" y="25" width="850" height="1300" rx="10" fill="#12131a" stroke="#27273a" stroke-width="3"/>
      
      <!-- Header banner -->
      <rect x="35" y="35" width="830" height="60" rx="6" fill="#1e1f2d"/>
      <text x="55" y="72" fill="#a5b4fc" font-size="20" font-family="system-ui, sans-serif" font-weight="bold">${safeTitle.toUpperCase()} — EN ESPAÑOL</text>
      <text x="840" y="72" fill="#94a3b8" font-size="16" font-family="monospace" text-anchor="end">Pág. ${p.number} / ${pagesData.length}</text>

      <!-- Panel 1: Main scene -->
      <rect x="45" y="115" width="810" height="480" rx="8" fill="#181a24" stroke="#3b3d54" stroke-width="2"/>
      <text x="65" y="150" fill="#f43f5e" font-size="13" font-family="sans-serif" font-weight="bold" letter-spacing="1">ESCENA: ${safeScene.toUpperCase()}</text>
      
      <!-- Dialogue Bubble 1 -->
      <rect x="75" y="180" width="480" height="130" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <polygon points="120,310 145,310 130,335" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <text x="95" y="215" fill="#0f172a" font-size="17" font-family="sans-serif" font-weight="bold">${safeDialogue.slice(0, 38)}</text>
      ${safeDialogue.length > 38 ? `<text x="95" y="245" fill="#0f172a" font-size="16" font-family="sans-serif">${safeDialogue.slice(38, 80)}</text>` : ''}
      ${safeDialogue.length > 80 ? `<text x="95" y="272" fill="#334155" font-size="15" font-family="sans-serif">${safeDialogue.slice(80, 130)}</text>` : ''}

      <!-- Center artwork illustration placeholder -->
      <circle cx="680" cy="350" r="110" fill="#312e81" fill-opacity="0.3" stroke="#6366f1" stroke-width="3"/>
      <polygon points="680,270 750,390 610,390" fill="#4338ca" fill-opacity="0.4"/>
      <text x="680" y="360" fill="#c7d2fe" font-size="15" font-family="sans-serif" font-weight="bold" text-anchor="middle">PANEL DE ACCIÓN</text>

      <!-- Narrative box -->
      <rect x="75" y="500" width="750" height="70" rx="8" fill="#030712" fill-opacity="0.8" stroke="#475569" stroke-width="1.5"/>
      <text x="95" y="542" fill="#e2e8f0" font-size="15" font-family="serif" font-style="italic">"${safePanel}"</text>

      <!-- Panel 2: Bottom secondary scene -->
      <rect x="45" y="620" width="400" height="620" rx="8" fill="#141620" stroke="#313346" stroke-width="2"/>
      <text x="65" y="660" fill="#38bdf8" font-size="14" font-family="sans-serif" font-weight="bold">DETALLE / IMPACTO</text>
      <circle cx="245" cy="900" r="120" fill="#0f172a" stroke="#0284c7" stroke-width="2" stroke-dasharray="6 6"/>
      <text x="245" y="895" fill="#f8fafc" font-size="18" font-family="sans-serif" font-weight="bold" text-anchor="middle">${safeChapter}</text>
      <text x="245" y="930" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">Edición Traducida al Español</text>

      <!-- Panel 3: Climax right scene -->
      <rect x="455" y="620" width="400" height="620" rx="8" fill="#141620" stroke="#313346" stroke-width="2"/>
      <text x="475" y="660" fill="#a855f7" font-size="14" font-family="sans-serif" font-weight="bold">DESARROLLO NARRATIVO</text>
      
      <!-- Speech bubble 2 -->
      <rect x="480" y="700" width="350" height="150" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <polygon points="560,850 580,850 570,875" fill="#ffffff"/>
      <text x="500" y="745" fill="#0f172a" font-size="17" font-family="sans-serif" font-weight="bold">¡No me rendiré jamás!</text>
      <text x="500" y="775" fill="#334155" font-size="15" font-family="sans-serif">Este es mi camino y lucharé</text>
      <text x="500" y="802" fill="#334155" font-size="15" font-family="sans-serif">hasta alcanzar la victoria.</text>

      <!-- Bottom footer -->
      <rect x="35" y="1265" width="830" height="40" rx="4" fill="#090a0f"/>
      <text x="450" y="1290" fill="#64748b" font-size="12" font-family="sans-serif" text-anchor="middle">${safeTitle} • ${safeAuthor} • Lector de Manga READER</text>
    </svg>`;

    zip.file(`page_${String(p.number).padStart(3, '0')}.svg`, pageSvg);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const safeName = title.replace(/[^a-zA-Z0-9_-]/g, '_') + '.cbz';
  return new File([blob], safeName, { type: 'application/x-cbz' });
}

export async function generateBookFile(
  title: string,
  author: string,
  chapters: BookChapterData[]
): Promise<File> {
  const safeName = title.replace(/[^a-zA-Z0-9_-]/g, '_');

  const zip = new JSZip();
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });

  const coverSvg = createCoverSvg(title, author, 'EPUB', '#1e293b', '#0f172a', '#38bdf8');
  zip.file('OEBPS/cover.svg', coverSvg);

  zip.file(
    'META-INF/container.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
  );

  let manifestItems = `<item id="cover-image" href="cover.svg" media-type="image/svg+xml"/>\n`;
  let spineItems = '';
  let navPoints = '';

  chapters.forEach((ch, idx) => {
    const filename = `chapter_${idx + 1}.xhtml`;
    const paragraphs = ch.content
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<p>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
      .join('\n');

    const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head>
  <meta charset="utf-8"/>
  <title>${ch.title.replace(/&/g, '&amp;')}</title>
  <style>
    body { font-family: serif; line-height: 1.7; margin: 5%; text-align: justify; }
    h1 { text-align: center; color: #1e293b; margin-top: 10%; margin-bottom: 5%; }
    p { margin-bottom: 1em; text-indent: 1.5em; }
  </style>
</head>
<body>
  <h1>${ch.title.replace(/&/g, '&amp;')}</h1>
  ${paragraphs}
</body>
</html>`;

    zip.file(`OEBPS/${filename}`, xhtml);
    manifestItems += `<item id="ch${idx + 1}" href="${filename}" media-type="application/xhtml+xml"/>\n`;
    spineItems += `<itemref idref="ch${idx + 1}"/>\n`;
    navPoints += `  <navPoint id="np${idx + 1}" playOrder="${idx + 1}">
    <navLabel><text>${ch.title.replace(/&/g, '&amp;')}</text></navLabel>
    <content src="${filename}"/>
  </navPoint>\n`;
  });

  manifestItems += `<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>\n`;

  const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookID" version="2.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${title.replace(/&/g, '&amp;')}</dc:title>
    <dc:creator>${author.replace(/&/g, '&amp;')}</dc:creator>
    <dc:language>es</dc:language>
    <dc:identifier id="BookID">urn:uuid:${safeName}</dc:identifier>
    <meta name="cover" content="cover-image"/>
  </metadata>
  <manifest>
    ${manifestItems}
  </manifest>
  <spine toc="ncx">
    ${spineItems}
  </spine>
</package>`;

  const ncx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:${safeName}"/>
    <meta name="dtb:depth" content="1"/>
  </head>
  <docTitle><text>${title.replace(/&/g, '&amp;')}</text></docTitle>
  <navMap>
    ${navPoints}
  </navMap>
</ncx>`;

  zip.file('OEBPS/content.opf', opf);
  zip.file('OEBPS/toc.ncx', ncx);

  const blob = await zip.generateAsync({ type: 'blob' });
  return new File([blob], safeName + '.epub', { type: 'application/epub+zip' });
}

export function createDefaultBookChapters(
  title: string,
  author: string,
  description: string
): BookChapterData[] {
  return [
    {
      title: 'Capítulo I — Introducción y Comienzo',
      content: `${description}\n\nAsí comenzaba la célebre obra «${title}», nacida de la pluma de ${author}. Desde las primeras páginas se percibe una atmósfera singular donde cada palabra evoca pasiones humanas universales, dilemas morales y el pulso ineludible del destino.\n\nLos personajes se adentran en un mundo de sombras y luces, buscando desesperadamente dar sentido a sus existencias en medio de las vicisitudes que la fortuna les depara.`
    },
    {
      title: 'Capítulo II — El Nudo de la Trama',
      content: `A medida que avanzan los acontecimientos, las certezas iniciales se desvanecen. Ningún juramento permanece intacto ante el embate de los conflictos que sacuden la historia.\n\n«No hay camino fácil hacia la verdad», murmuraba el protagonista al contemplar el horizonte incierto. Cada decisión tomada acarrea consecuencias imprevistas, arrastrando a amigos y adversarios a un enfrentamiento inevitable donde solo los más perseverantes lograrán encontrar sosiego.`
    },
    {
      title: 'Capítulo III — Clímax y Reflexión Final',
      content: `El desenlace de «${title}» constituye una de las cumbres narrativas de su época. En el momento culminante, cuando todas las fuerzas convergen en una sola escena decisiva, la verdad oculta se revela con deslumbrante claridad.\n\nEl lector queda maravillado por la profundidad psicológica y el dominio estilístico con que ${author} retrata la condición humana. Una obra eterna que trasciende generaciones y permanece como un faro de la literatura universal en nuestra lengua.`
    }
  ];
}

export function createDefaultMangaPanels(
  title: string,
  author: string,
  description: string,
  category: 'manga' | 'manhwa' | 'comics'
): ComicPanelData[] {
  const categoryLabel = category === 'manhwa' ? 'Webtoon' : category === 'comics' ? 'Cómic' : 'Manga';

  return [
    {
      number: 1,
      chapter: 'Capítulo 1: El Despertar',
      scene: 'Inicio de la Historia',
      panelText: `${description.slice(0, 110)}...`,
      dialogue: `¡Este es el comienzo de mi historia en ${title}!`
    },
    {
      number: 2,
      chapter: 'Capítulo 1: El Encuentro del Destino',
      scene: 'Campo de Batalla',
      panelText: 'Una presencia sobrehumana irrumpe en escena mientras las miradas se cruzan con tensión electrizante.',
      dialogue: 'Si quieres dar un paso adelante... ¡primero tendrás que superarme a mí!'
    },
    {
      number: 3,
      chapter: 'Capítulo 1: La Fuerza Interior',
      scene: 'Momento de Impacto',
      panelText: 'La energía fluye y el aire vibra con el impacto inminente del choque de voluntades.',
      dialogue: 'He entrenado mi mente y mi espíritu para no retroceder ante ningún desafío.'
    },
    {
      number: 4,
      chapter: 'Capítulo 1: Hacia el Nuevo Mundo',
      scene: 'Horizonte Épico',
      panelText: `Una obra cumbre del ${categoryLabel} por ${author}, adaptada íntegramente al español para disfrutar sin conexión.`,
      dialogue: '¡Nuestra aventura apenas acaba de comenzar!'
    }
  ];
}
