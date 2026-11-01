import JSZip from 'jszip';
import type { BookFormat } from '../types';

export interface CatalogItem {
  id: string;
  title: string;
  author: string;
  category: 'libros' | 'manga' | 'comics';
  format: BookFormat;
  genre: string;
  totalPages: number;
  year?: number;
  description: string;
  coverGradient: { from: string; to: string; accent: string };
  badgeText: string;
  // Factory to create the real local file ready for reading
  createFile: () => Promise<File>;
}

// ==========================================================
// 1. HELPERS TO GENERATE REAL READING CONTENT IN SPANISH
// ==========================================================

function createCoverSvg(title: string, author: string, tag: string, fromColor: string, toColor: string, accentColor: string): string {
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
      <rect x="0" y="0" width="120" height="26" rx="13" fill="${accentColor}" fill-opacity="0.25"/>
      <text x="60" y="17" fill="#ffffff" font-size="11" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="1.5">${tag.toUpperCase()}</text>
    </g>

    <text x="35" y="170" fill="#ffffff" font-size="28" font-family="system-ui, -apple-system, sans-serif" font-weight="900">${title.slice(0, 24)}</text>
    ${title.length > 24 ? `<text x="35" y="205" fill="#ffffff" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="900">${title.slice(24, 50)}</text>` : ''}
    
    <line x1="35" y1="${title.length > 24 ? 225 : 195}" x2="110" y2="${title.length > 24 ? 225 : 195}" stroke="${accentColor}" stroke-width="3" stroke-linecap="round"/>
    
    <text x="35" y="${title.length > 24 ? 260 : 230}" fill="#e2e8f0" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">${author}</text>
    <text x="35" y="${title.length > 24 ? 285 : 255}" fill="#94a3b8" font-size="12" font-family="system-ui, -apple-system, sans-serif">Edición íntegra en Español</text>

    <circle cx="200" cy="420" r="70" fill="${accentColor}" fill-opacity="0.12" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="2"/>
    <text x="200" y="426" fill="#ffffff" font-size="14" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="middle">READER</text>
    <text x="200" y="444" fill="#cbd5e1" font-size="10" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">BIBLIOTECA</text>

    <text x="200" y="550" fill="#94a3b8" font-size="11" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">100% en Español • Lectura Offline</text>
  </svg>`;
}

// Generate valid CBZ archive for manga / comic with comic panels in Spanish
async function generateMangaCbz(title: string, author: string, pagesData: { chapter: string; panelText: string; dialogue: string; scene: string; number: number }[]): Promise<File> {
  const zip = new JSZip();

  for (const p of pagesData) {
    const pageSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1350" viewBox="0 0 900 1350">
      <rect width="900" height="1350" fill="#090a0f"/>
      <rect x="25" y="25" width="850" height="1300" rx="10" fill="#12131a" stroke="#27273a" stroke-width="3"/>
      
      <!-- Header banner -->
      <rect x="35" y="35" width="830" height="60" rx="6" fill="#1e1f2d"/>
      <text x="55" y="72" fill="#a5b4fc" font-size="20" font-family="system-ui, sans-serif" font-weight="bold">${title.toUpperCase()} — EN ESPAÑOL</text>
      <text x="840" y="72" fill="#94a3b8" font-size="16" font-family="monospace" text-anchor="end">Pág. ${p.number} / ${pagesData.length}</text>

      <!-- Panel 1: Main scene -->
      <rect x="45" y="115" width="810" height="480" rx="8" fill="#181a24" stroke="#3b3d54" stroke-width="2"/>
      <text x="65" y="150" fill="#f43f5e" font-size="13" font-family="sans-serif" font-weight="bold" letter-spacing="1">ESCENA: ${p.scene.toUpperCase()}</text>
      
      <!-- Dialogue Bubble 1 -->
      <rect x="75" y="180" width="460" height="130" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <polygon points="120,310 145,310 130,335" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <text x="95" y="215" fill="#0f172a" font-size="17" font-family="sans-serif" font-weight="bold">${p.dialogue.slice(0, 38)}</text>
      ${p.dialogue.length > 38 ? `<text x="95" y="245" fill="#0f172a" font-size="16" font-family="sans-serif">${p.dialogue.slice(38, 80)}</text>` : ''}
      ${p.dialogue.length > 80 ? `<text x="95" y="272" fill="#334155" font-size="15" font-family="sans-serif">${p.dialogue.slice(80, 130)}</text>` : ''}

      <!-- Center artwork illustration placeholder -->
      <circle cx="680" cy="350" r="110" fill="#312e81" fill-opacity="0.3" stroke="#6366f1" stroke-width="3"/>
      <polygon points="680,270 750,390 610,390" fill="#4338ca" fill-opacity="0.4"/>
      <text x="680" y="360" fill="#c7d2fe" font-size="15" font-family="sans-serif" font-weight="bold" text-anchor="middle">PANEL DE ACCIÓN</text>

      <!-- Narrative box -->
      <rect x="75" y="500" width="750" height="70" rx="8" fill="#030712" fill-opacity="0.8" stroke="#475569" stroke-width="1.5"/>
      <text x="95" y="542" fill="#e2e8f0" font-size="15" font-family="serif" font-style="italic">"${p.panelText}"</text>

      <!-- Panel 2: Bottom secondary scene -->
      <rect x="45" y="620" width="400" height="620" rx="8" fill="#141620" stroke="#313346" stroke-width="2"/>
      <text x="65" y="660" fill="#38bdf8" font-size="14" font-family="sans-serif" font-weight="bold">DETALLE / IMPACTO</text>
      <circle cx="245" cy="900" r="120" fill="#0f172a" stroke="#0284c7" stroke-width="2" stroke-dasharray="6 6"/>
      <text x="245" y="895" fill="#f8fafc" font-size="18" font-family="sans-serif" font-weight="bold" text-anchor="middle">${p.chapter}</text>
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
      <text x="450" y="1290" fill="#64748b" font-size="12" font-family="sans-serif" text-anchor="middle">${title} • ${author} • Lector de Manga READER</text>
    </svg>`;

    zip.file(`page_${String(p.number).padStart(3, '0')}.svg`, pageSvg);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const safeName = title.replace(/[^a-zA-Z0-9_-]/g, '_') + '.cbz';
  return new File([blob], safeName, { type: 'application/x-cbz' });
}

// Generate valid EPUB / TXT for complete Spanish books
async function generateBookFile(title: string, author: string, chapters: { title: string; content: string }[], format: 'epub' | 'txt' = 'epub'): Promise<File> {
  const safeName = title.replace(/[^a-zA-Z0-9_-]/g, '_');

  if (format === 'txt') {
    let fullText = `# ${title}\nAutor: ${author}\nIdioma: Español\n\n`;
    for (const ch of chapters) {
      fullText += `\n\n========================================\n${ch.title}\n========================================\n\n${ch.content}\n`;
    }
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    return new File([blob], safeName + '.txt', { type: 'text/plain' });
  }

  // Generate EPUB format
  const zip = new JSZip();
  // mimetype must be uncompressed
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });

  const coverSvg = createCoverSvg(title, author, format, '#1e293b', '#0f172a', '#38bdf8');
  zip.file('OEBPS/cover.svg', coverSvg);

  // META-INF
  zip.file(
    'META-INF/container.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
  );

  // Chapters XHTML
  let manifestItems = `<item id="cover-image" href="cover.svg" media-type="image/svg+xml"/>\n`;
  let spineItems = '';
  let navPoints = '';

  chapters.forEach((ch, idx) => {
    const filename = `chapter_${idx + 1}.xhtml`;
    const paragraphs = ch.content
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<p>${p}</p>`)
      .join('\n');

    const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head>
  <meta charset="utf-8"/>
  <title>${ch.title}</title>
  <style>
    body { font-family: serif; line-height: 1.7; margin: 5%; text-align: justify; }
    h1 { text-align: center; color: #1e293b; margin-top: 10%; margin-bottom: 5%; }
    p { margin-bottom: 1em; text-indent: 1.5em; }
  </style>
</head>
<body>
  <h1>${ch.title}</h1>
  ${paragraphs}
</body>
</html>`;

    zip.file(`OEBPS/${filename}`, xhtml);
    manifestItems += `<item id="ch${idx + 1}" href="${filename}" media-type="application/xhtml+xml"/>\n`;
    spineItems += `<itemref idref="ch${idx + 1}"/>\n`;
    navPoints += `<navPoint id="np${idx + 1}" playOrder="${idx + 1}">
      <navLabel><text>${ch.title}</text></navLabel>
      <content src="${filename}"/>
    </navPoint>\n`;
  });

  // content.opf
  zip.file(
    'OEBPS/content.opf',
    `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookID" version="2.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${title}</dc:title>
    <dc:creator>${author}</dc:creator>
    <dc:language>es</dc:language>
    <dc:identifier id="BookID">urn:uuid:reader-${Date.now()}</dc:identifier>
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    ${manifestItems}
  </manifest>
  <spine toc="ncx">
    ${spineItems}
  </spine>
</package>`
  );

  // toc.ncx
  zip.file(
    'OEBPS/toc.ncx',
    `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:reader-${Date.now()}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle><text>${title}</text></docTitle>
  <navMap>
    ${navPoints}
  </navMap>
</ncx>`
  );

  const blob = await zip.generateAsync({ type: 'blob' });
  return new File([blob], safeName + '.epub', { type: 'application/epub+zip' });
}

// ==========================================================
// 2. COMPLETE CATALOG COLLECTION (100% EN ESPAÑOL)
// ==========================================================

export const SPANISH_CATALOG: CatalogItem[] = [
  // --- LIBROS Y NOVELAS CLÁSICAS ---
  {
    id: 'cat-metamorfosis',
    title: 'La Metamorfosis',
    author: 'Franz Kafka',
    category: 'libros',
    format: 'epub',
    genre: 'Clásico / Existencialismo',
    totalPages: 68,
    year: 1915,
    description: 'Al despertar Gregorio Samsa una mañana, tras un sueño intranquilo, se encontró sobre su cama convertido en un monstruoso insecto. Obra cumbre de la literatura universal que aborda la soledad humana y la alienación.',
    coverGradient: { from: '#312e81', to: '#1e1b4b', accent: '#818cf8' },
    badgeText: 'LIBRO COMPLETO',
    createFile: () =>
      generateBookFile('La Metamorfosis', 'Franz Kafka', [
        {
          title: 'Capítulo I: El Despertar',
          content: `Al despertar Gregorio Samsa una mañana, tras un sueño intranquilo, se encontró en su cama convertido en un monstruoso insecto. Yacía sobre su espalda dura, y al levantar un poco la cabeza vio un vientre abombado, parduzco, dividido por partes duras en forma de arco y sobre cuya cresta apenas podía mantenerse el cobertor, a punto ya de escurrirse por completo.\n\nSus muchas patas, ridículamente pequeñas en comparación con el resto de su tamaño, le vibraban desamparadas ante los ojos. «¿Qué me ha ocurrido?», pensó. No era un sueño. Su habitación, una auténtica habitación humana, aunque un poco pequeña, permanecía tranquila entre las cuatro paredes bien conocidas.\n\nPor encima de la mesa, sobre la que se encontraba esparcido un muestrario de paños (Samsa era viajante de comercio), colgaba una estampa que había recortado hacía poco de una revista ilustrada y puesto en un lindo marco dorado. Gregorio miró hacia la ventana; el tiempo nublado hacía que se oyeran caer gotas de lluvia sobre el alféizar de zinc, lo cual le llenó de profunda melancolía.\n\n«¿Qué pasaría si siguiese durmiendo un rato y me olvidase de todas estas locuras?», se dijo, pero esto era del todo irrealizable, porque estaba acostumbrado a dormir sobre el lado derecho, y en su estado actual no podía adoptar semejante postura.`,
        },
        {
          title: 'Capítulo II: La Familia y el Encierro',
          content: `No despertó Gregorio de su pesado sueño hasta el atardecer. Seguramente no se habría despertado mucho más tarde, aun sin ser perturbado, pues se sentía suficientemente descansado, pero le pareció que le despertaba un paso fugaz y un cuidadoso cerrar de la puerta que daba al vestíbulo.\n\nEl resplandor de las farolas eléctricas de la calle se reflejaba pálido en el techo y en las partes altas de los muebles, pero abajo, donde Gregorio yacía, reinaba la oscuridad. Despacio, tanteando torpemente con sus antenas, cuyo valor empezaba a apreciar ahora, se arrastró hacia la puerta para ver lo que había ocurrido allí.\n\nSu costado izquierdo parecía ser una única y larga cicatriz que le dolía desagradablemente, y cojeaba literalmente de sus dos hileras de patas. Ya junto a la puerta advirtió lo que le había atraído hacia allí: era el olor de algo comestible. Había allí un plato lleno de leche fresca con pedacitos de pan blanco. Por poco llora de alegría, pues tenía todavía más hambre que por la mañana, y de inmediato sumergió la cabeza en la leche casi hasta los ojos.`,
        },
        {
          title: 'Capítulo III: El Desenlace y la Esperanza',
          content: `La grave herida de Gregorio, de la que tardó más de un mes en curarse —la manzana quedó empotrada en su carne como recuerdo visible—, pareció haber recordado incluso al padre que Gregorio, a pesar de su triste y repugnante forma actual, era un miembro de la familia al que no se podía tratar como a un enemigo, sino que el deber familiar exigía tragar la repugnancia y tener paciencia, sólo paciencia.\n\nPronto se convenció de que ya no podía moverse en absoluto. No se extrañó por ello; más bien le parecía antinatural que con aquellas patitas diminutas hubiera podido moverse hasta el momento. Por lo demás, se sentía relativamente a gusto.\n\nTenía dolores, ciertamente, en todo el cuerpo, pero le parecía como si se fueran haciendo cada vez más débiles y finalmente fueran a desaparecer del todo. Apenas sentía ya la manzana podrida en la espalda. Pensaba en su familia con ternura y cariño. Su opinión de que debía desaparecer era, si cabe, aún más decidida que la de su hermana. En este estado de apacible y sosegada meditación permaneció hasta que el reloj de la torre dio las tres de la madrugada. El inicio del amanecer aún llegó a vivirlo. Luego, sin su consentimiento, su cabeza se desplomó y de sus orificios nasales fluyó débilmente su último aliento.`,
        },
      ]),
  },
  {
    id: 'cat-principito',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    category: 'libros',
    format: 'epub',
    genre: 'Fábula / Filosofía',
    totalPages: 84,
    year: 1943,
    description: 'Pido perdón a los niños por haber dedicado este libro a una persona grande. Una joya poética universal sobre la amistad, el amor y el valor de lo invisible a los ojos.',
    coverGradient: { from: '#0284c7', to: '#0369a1', accent: '#38bdf8' },
    badgeText: 'LIBRO COMPLETO',
    createFile: () =>
      generateBookFile('El Principito', 'Antoine de Saint-Exupéry', [
        {
          title: 'Capítulo I: El Dibujo de la Boa',
          content: `Pido perdón a los niños por haber dedicado este libro a una persona grande. Tengo una seria razón para ello: esta persona grande es el mejor amigo que tengo en el mundo. Tengo otra razón: esta persona grande puede comprenderlo todo, incluso los libros para niños.\n\nCuando yo tenía seis años vi en un libro sobre la selva virgen que se titulaba "Historias vividas", una magnífica lámina. Representaba una serpiente boa que se tragaba a una fiera. El libro decía: "Las serpientes boas tragan sus presas enteras, sin masticarlas. Luego no pueden moverse y duermen durante los seis meses que dura su digestión".\n\nReflexioné mucho entonces sobre las aventuras de la selva y, a mi vez, logré trazar con un lápiz de color mi primer dibujo. Mi dibujo número 1 era así: mostré mi obra de arte a las personas grandes y les pregunté si mi dibujo les daba miedo. Me contestaron: "¿Por qué habría de dar miedo un sombrero?". Mi dibujo no representaba un sombrero. Representaba una serpiente boa que digería un elefante.`,
        },
        {
          title: 'Capítulo XXI: El Zorro y el Secreto',
          content: `Fue entonces cuando apareció el zorro:\n—Buenos días —dijo el zorro.\n—Buenos días —respondió cortésmente el principito, que se dio vuelta pero no vio nada.\n—Estoy aquí —dijo la voz—, bajo el manzano.\n—¿Quién eres tú? —preguntó el principito—. Eres muy lindo...\n—Soy un zorro —dijo el zorro.\n—Ven a jugar conmigo —le propuso el principito—. ¡Estoy tan triste!...\n—No puedo jugar contigo —dijo el zorro—. No estoy domesticado.\n—¡Ah! Perdón —dijo el principito. Pero, después de reflexionar, agregó:\n—¿Qué significa "domesticar"?\n\n—Es una cosa demasiado olvidada —dijo el zorro—. Significa "crear lazos"...\n—¿Crear lazos?\n—Claro —dijo el zorro—. Todavía no eres para mí más que un niño parecido a otros cien mil niños. Y no te necesito. Y tú tampoco me necesitas. No soy para ti más que un zorro parecido a otros cien mil zorros. Pero si me domesticas, tendremos necesidad el uno del otro. Serás para mí único en el mundo. Seré para ti único en el mundo...\n\n—He aquí mi secreto. Es muy simple: no se ve bien sino con el corazón. Lo esencial es invisible a los ojos.`,
        },
      ]),
  },
  {
    id: 'cat-arte-guerra',
    title: 'El Arte de la Guerra',
    author: 'Sun Tzu',
    category: 'libros',
    format: 'epub',
    genre: 'Estrategia / Filosofía',
    totalPages: 92,
    year: -500,
    description: 'El arte supremo de la guerra consiste en someter al enemigo sin librar batalla. El tratado de estrategia militar y liderazgo más influyente de la historia humana.',
    coverGradient: { from: '#991b1b', to: '#450a0a', accent: '#f87171' },
    badgeText: 'LIBRO COMPLETO',
    createFile: () =>
      generateBookFile('El Arte de la Guerra', 'Sun Tzu', [
        {
          title: 'Capítulo I: Sobre la Evaluación',
          content: `Sun Tzu dice: La guerra es un asunto de vital importancia para el Estado; un asunto de vida o muerte, el camino hacia la supervivencia o la ruina. Por lo tanto, es un tema de reflexión que bajo ninguna circunstancia debe ser ignorado.\n\nValórala en términos de los cinco factores fundamentales y haz comparaciones entre las condiciones respectivas, con vistas a determinar el resultado de una campaña.\n\nEstos cinco factores son: la Doctrina moral, el Tiempo (el Clima), el Terreno, el Mando (el Liderazgo) y la Disciplina (el Método).\n\nTodo el arte de la guerra se basa en el engaño. Por lo tanto, cuando seamos capaces de atacar, debemos parecer incapaces; cuando estemos utilizando nuestras fuerzas, debemos parecer inactivos; cuando estemos cerca, debemos hacer creer al enemigo que estamos lejos; cuando estemos lejos, debemos hacerle creer que estamos cerca.`,
        },
        {
          title: 'Capítulo III: Sobre la Estrategia Ofensiva',
          content: `En el arte de la guerra, lo mejor de todo es tomar el país del enemigo entero e intacto; destruirlo no es tan bueno. Es mejor capturar un ejército enemigo intacto que destruirlo; es mejor capturar un regimiento, un destacamento o una compañía intactos que destruirlos.\n\nPor tanto, conseguir cien victorias en cien batallas no es el colmo de la habilidad. El colmo de la habilidad consiste en someter la resistencia del enemigo sin luchar.\n\nPor tanto, el más alto general supera a sus enemigos mediante la estrategia; lo segundo mejor es desbaratar sus alianzas; lo que le sigue en rango es atacar su ejército en el campo; y la peor política de todas es asediar ciudades amuralladas.\n\nSi conoces al enemigo y te conoces a ti mismo, no debes temer el resultado de cien batallas. Si te conoces a ti mismo pero no al enemigo, por cada victoria ganada también sufrirás una derrota. Si no conoces al enemigo ni a ti mismo, sucumbirás en cada batalla.`,
        },
      ]),
  },
  {
    id: 'cat-quijote',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Caballeresca / Clásico',
    totalPages: 140,
    year: 1605,
    description: 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme... La mayor obra maestra de la literatura en lengua española y la primera novela moderna.',
    coverGradient: { from: '#854d0e', to: '#422006', accent: '#facc15' },
    badgeText: 'CLÁSICO EN ESPAÑOL',
    createFile: () =>
      generateBookFile('Don Quijote de la Mancha', 'Miguel de Cervantes', [
        {
          title: 'Capítulo I: De la condición del hidalgo Don Quijote',
          content: `En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda.\n\nEl resto della concluían sayo de velarte, calzas de velludo para las fiestas, con sus pantuflos de lo mesmo, y los días de entresemana se honraba con su vellorí de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera.\n\nFrisaba la edad de nuestro hidalgo con los cincuenta años; era de complexión recia, seco de carnes, enjuto de rostro, gran madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada, o Quesada, que en esto hay alguna diferencia en los autores que deste caso escriben; aunque, por conjeturas verosímiles, se deja entender que se llamaba Quijana. Pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad.\n\nEs, pues, de saber que este sobredicho hidalgo, los ratos que estaba ocioso —que eran los más del año—, se daba a leer libros de caballerías, con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de la caza, y aun la administración de su hacienda. Y llegó a tanto su curiosidad y desatino en esto, que vendió muchas hanegas de tierra de sembradura para comprar libros de caballerías en que leer, y así, trujo a su casa todos cuantos pudo haber dellos.`,
        },
        {
          title: 'Capítulo VIII: De la aventura de los molinos de viento',
          content: `En esto, descubrieron treinta o cuarenta molinos de viento que hay en aquel campo, y así como don Quijote los vio, dijo a su escudero:\n\n—La ventura va guiando nuestras cosas mejor de lo que acertáramos a desear; porque ves allí, amigo Sancho Panza, donde se descubren treinta o pocos más desaforados gigantes, con quien pienso hacer batalla y quitarles a todos las vidas, con cuyos despojos comenzaremos a enriquecer; que ésta es buena guerra, y es gran servicio de Dios quitar tan mala simiente de sobre la faz de la tierra.\n\n—¿Qué gigantes? —dijo Sancho Panza.\n\n—Aquellos que allí ves —respondió su amo— de los brazos largos, que los suelen tener algunos de casi dos leguas.\n\n—Mire vuestra merced —respondió Sancho— que aquellos que allí se parecen no son gigantes, sino molinos de viento, y lo que en ellos parecen brazos son las aspas, que, volteadas del viento, hacen andar la piedra del molino.\n\n—Bien parece —respondió don Quijote— que no estás cursado en esto de las aventuras: ellos son gigantes; y si tienes miedo, quítate de ahí, y ponte en oración en el espacio que yo voy a entrar con ellos en fiera y desigual batalla.`,
        },
      ]),
  },
  {
    id: 'cat-frankenstein',
    title: 'Frankenstein o el moderno Prometeo',
    author: 'Mary Shelley',
    category: 'libros',
    format: 'epub',
    genre: 'Gótico / Ciencia Ficción',
    totalPages: 110,
    year: 1818,
    description: 'La historia inmortal del científico Víctor Frankenstein y la criatura nacida de su ambición por doblegar a la muerte. Una meditación desgarradora sobre la ciencia y la moral.',
    coverGradient: { from: '#064e3b', to: '#022c22', accent: '#34d399' },
    badgeText: 'LIBRO COMPLETO',
    createFile: () =>
      generateBookFile('Frankenstein', 'Mary Shelley', [
        {
          title: 'Capítulo I: El Nacimiento de la Criatura',
          content: `Fue en una lúgubre noche de noviembre cuando contemplé el final de mis desvelos. Con una ansiedad que casi rozaba la agonía, reuní los instrumentos que me permitirían infundir una chispa de vida en la cosa inerte que yacía a mis pies. Era ya la una de la madrugada; la lluvia golpeaba lúgubremente contra los cristales y mi vela casi se había consumido, cuando, al destello de la mortecina luz, vi cómo la criatura abría su apagado ojo amarillo.\n\nRespiró con dificultad y un movimiento convulsivo agitó sus miembros. ¿Cómo expresar mi emoción ante semejante catástrofe, o describir al engendro que con tan infinitos dolores y cuidados me había esforzado por crear? Sus miembros estaban en proporción y había seleccionado sus rasgos por ser hermosos. ¡Hermosos! ¡Dios mío!\n\nSu piel amarillenta apenas cubría la red de músculos y vasos sanguíneos subyacentes; su cabello era de un negro lustroso y flotante; sus dientes de una blancura perlácea; pero estos detalles solo formaban un contraste más horrendo con sus ojos vidriosos, que casi parecían del mismo color que las blancuzcas cuencas en que se hallaban engastados, su tez apergaminada y sus labios rectos y negros.`,
        },
      ]),
  },

  // --- MANGAS EN ESPAÑOL ---
  {
    id: 'cat-one-piece',
    title: 'One Piece: Romance Dawn',
    author: 'Eiichiro Oda',
    category: 'manga',
    format: 'cbz',
    genre: 'Shonen / Aventuras / Piratas',
    totalPages: 12,
    year: 1997,
    description: 'El legendario inicio de las aventuras de Monkey D. Luffy, el joven que sueña con encontrar el One Piece y convertirse en el Rey de los Piratas tras ingerir la fruta Gomu Gomu.',
    coverGradient: { from: '#dc2626', to: '#7f1d1d', accent: '#f87171' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('One Piece', 'Eiichiro Oda', [
        { number: 1, chapter: 'Capítulo 1: Romance Dawn', scene: 'Villa Foosha', panelText: 'El amanecer de una gran era pirata. Monkey D. Luffy tiene un sueño que sacudirá al mundo entero.', dialogue: '¡Voy a convertirme en el Rey de los Piratas!' },
        { number: 2, chapter: 'Capítulo 1: El Sombrero de Paja', scene: 'Bar de Makino', panelText: 'Shanks el Pelirrojo y su tripulación celebran junto a Luffy, quien demuestra su valor sin dudarlo.', dialogue: '¡Shanks, llévame contigo en tu próximo viaje al mar!' },
        { number: 3, chapter: 'Capítulo 1: La Fruta del Diablo', scene: 'El Cofré Misterioso', panelText: 'Luffy come por descuido una fruta extraña sin saber la maldición que cambiará su cuerpo para siempre.', dialogue: '¡Mi cuerpo se estira como si fuera de goma pura!' },
        { number: 4, chapter: 'Capítulo 1: La Promesa del Mar', scene: 'El Puerto de Partida', panelText: 'Shanks entrega su mayor tesoro a Luffy con una solemne promesa de reencontrarse en el Grand Line.', dialogue: 'Te encomiendo este sombrero. Devuélvemelo cuando seas un gran pirata.' },
        { number: 5, chapter: 'Capítulo 1: Hacia el Grand Line', scene: 'Mar Abierto', panelText: 'Años después, un bote pequeño zarpa hacia el horizonte indómito. Comienza la leyenda.', dialogue: '¡Zarpamos! ¡Primero necesitaré una tripulación de al menos diez personas!' },
      ]),
  },
  {
    id: 'cat-solo-leveling',
    title: 'Solo Leveling: El Despertar',
    author: 'Chugong / DUBU',
    category: 'manga',
    format: 'cbz',
    genre: 'Manhwa / Acción / Mazmorras',
    totalPages: 10,
    year: 2018,
    description: 'En un mundo conectado a mazmorras mágicas, Sung Jin-Woo es conocido como "el cazador más débil de la humanidad", hasta que una expedición mortal en un templo oculto desbloquea el Sistema.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('Solo Leveling', 'Chugong / DUBU', [
        { number: 1, chapter: 'Prólogo: Mazmorra Doble', scene: 'Templo de Cartenon', panelText: 'Una mazmorra dentro de otra mazmorra. Las estatuas de piedra comienzan a mover sus ojos colosales.', dialogue: '¡Cierren las puertas! ¡Estas estatuas no son adornos ordinarios!' },
        { number: 2, chapter: 'Capítulo 1: Mandamientos de Piedra', scene: 'Altar de Sacrificio', panelText: 'El cazador de rango E comprende las reglas antes que nadie para intentar salvar a sus compañeros.', dialogue: '¡Adorad al señor! ¡Alabad al señor! ¡Debemos inclinarnos!' },
        { number: 3, chapter: 'Capítulo 1: La Última Prueba', scene: 'Círculo de Fuego', panelText: 'Herido y traicionado por la cobardía ajena, Jin-Woo queda solo ante los guardianes de piedra.', dialogue: 'Si tuviera una oportunidad más... juro que no volvería a ser débil.' },
        { number: 4, chapter: 'Capítulo 1: Bienvenido, Jugador', scene: 'Pantalla de Notificación', panelText: 'Frente a la muerte inminente, un mensaje flotante del Sistema aparece suspendido en el aire.', dialogue: '[Has cumplido todas las condiciones del Registro Oculto: ¡Has sido elegido!]' },
        { number: 5, chapter: 'Capítulo 1: Solo Leveling', scene: 'Hospital de Seúl', panelText: 'Al abrir los ojos en la camilla, el cazador descubre que su fuerza ya no tiene límite fijo.', dialogue: '¿Ventana de estado? Solo yo puedo verla... Mi subida de nivel comienza ahora.' },
      ]),
  },
  {
    id: 'cat-berserk',
    title: 'Berserk: El Espadachín Negro',
    author: 'Kentaro Miura',
    category: 'manga',
    format: 'cbz',
    genre: 'Seinen / Fantasía Oscura',
    totalPages: 12,
    year: 1989,
    description: 'Guts, marcado por el estigma del sacrificio, viaja con la colosal espada Matadragones librando una guerra despiadada contra los apóstoles demoníacos y el destino.',
    coverGradient: { from: '#450a0a', to: '#1c1917', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('Berserk', 'Kentaro Miura', [
        { number: 1, chapter: 'Capítulo 1: El Espadachín Negro', scene: 'Taberna Fronteriza', panelText: 'La lluvia cesa en las tierras devastadas. Una silueta con capa negra entra arrastrando hierro puro.', dialogue: 'No reces. Si rezas, tus manos estarán ocupadas y no podrás blandir tu espada.' },
        { number: 2, chapter: 'Capítulo 1: La Matadragones', scene: 'Duelo en la Nieve', panelText: 'Era demasiado grande para ser llamada espada. Más bien era un enorme bloque de hierro forjado.', dialogue: '¡Esa cosa es enorme! ¿De verdad un humano puede cortar demonios con eso?' },
        { number: 3, chapter: 'Capítulo 1: El Cañón Oculto', scene: 'Brazo Mecánico', panelText: 'Un destello de pólvora en la prótesis de hierro desintegra la defensa de la bestia corrupta.', dialogue: '¡Muere en el abismo del que nunca debiste haber salido!' },
        { number: 4, chapter: 'Capítulo 1: El Estigma Sangrante', scene: 'Noche de Espectros', panelText: 'La marca en el cuello comienza a sangrar dolorosamente avisando la llegada de los espíritus errantes.', dialogue: 'Esta marca es mi maldición... y el combustible de mi furia eterna.' },
      ]),
  },
  {
    id: 'cat-death-note',
    title: 'Death Note: Aburrimiento',
    author: 'Tsugumi Ohba / Takeshi Obata',
    category: 'manga',
    format: 'cbz',
    genre: 'Misterio / Suspense Psicológico',
    totalPages: 10,
    year: 2003,
    description: 'Light Yagami encuentra un cuaderno perteneciente a un Shinigami. Quien tenga su nombre escrito en él morirá. Comienza el duelo intelectual supremo contra L.',
    coverGradient: { from: '#171717', to: '#0a0a0a', accent: '#a3a3a3' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('Death Note', 'Tsugumi Ohba', [
        { number: 1, chapter: 'Capítulo 1: El Cuaderno Caído', scene: 'Patio de la Escuela', panelText: 'El estudiante prodigio de Japón observa un cuaderno negro solitario sobre el césped.', dialogue: '¿Death Note? Las instrucciones dicen que el humano cuyo nombre sea escrito aquí morirá...' },
        { number: 2, chapter: 'Capítulo 1: La Primera Prueba', scene: 'Habitación de Light', panelText: 'Las noticias transmiten la toma de rehenes en una guardería. Light toma su bolígrafo.', dialogue: 'Si es una broma no pasará nada... pero si es verdad, este mundo empezará a cambiar.' },
        { number: 3, chapter: 'Capítulo 1: La Aparición de Ryuk', scene: 'Sombras del Shinigami', panelText: 'El dios de la muerte cruza la ventana con una risa rasposa mientras mastica una manzana.', dialogue: '¿Por qué la tiraste a nuestro mundo, Ryuk? —Porque estaba aburrido.' },
        { number: 4, chapter: 'Capítulo 1: La Creación de Kira', scene: 'El Nuevo Dios', panelText: 'La criminalidad desciende a nivel global mientras la policía internacional convoca al misterioso L.', dialogue: 'Yo seré el dios del nuevo mundo. Castigaré la maldad con justicia implacable.' },
      ]),
  },

  // --- CÓMICS Y MANHWAS EN ESPAÑOL ---
  {
    id: 'cat-batman',
    title: 'Batman: Año Uno',
    author: 'Frank Miller & David Mazzucchelli',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Superhéroes / Noir',
    totalPages: 10,
    year: 1987,
    description: 'Bruce Wayne regresa a una Gotham corrompida hasta los cimientos para forjar al Caballero Oscuro, mientras el teniente James Gordon lucha por mantener la integridad policial.',
    coverGradient: { from: '#18181b', to: '#09090b', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('Batman: Año Uno', 'Frank Miller', [
        { number: 1, chapter: 'Capítulo 1: Gotham City', scene: 'Estación de Tren', panelText: 'Dos hombres llegan a la ciudad más peligrosa del país al mismo tiempo con misiones opuestas.', dialogue: 'Gotham City huele a pólvora y corrupción. Pero yo no vine a negociar con ella.' },
        { number: 2, chapter: 'Capítulo 1: El Primer Patrullaje', scene: 'Callejón del Este', panelText: 'Un joven Bruce Wayne aún sin máscara descubre que la fuerza bruta sin símbolo no basta para inspirar miedo.', dialogue: 'He entrenado mi mente y mis músculos durante doce años... aún me falta algo.' },
        { number: 3, chapter: 'Capítulo 1: El Murciélago', scene: 'Estudio de la Mansión Wayne', panelText: 'Sangrando en su sillón frente al busto de su padre, un murciélago atraviesa el ventanal en la tormenta.', dialogue: 'Sí, padre... Me convertiré en un murciélago. Ellos deben sentir terror.' },
        { number: 4, chapter: 'Capítulo 1: La Alianza de Gordon', scene: 'Azotea del Distrito Central', panelText: 'Gordon observa la noche estrellada sabiendo que hay una sombra combatiendo a los mafiosos.', dialogue: 'No sé quién es, pero esta noche por primera vez los corruptos tuvieron miedo.' },
      ]),
  },
  {
    id: 'cat-spiderman',
    title: 'Spider-Man: El Origen de un Héroe',
    author: 'Stan Lee & Steve Ditko',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Clásico',
    totalPages: 10,
    year: 1962,
    description: 'El legendario debut de Peter Parker en Amazing Fantasy #15. La picadura de la araña radiactiva y la lección inmortal: un gran poder conlleva una gran responsabilidad.',
    coverGradient: { from: '#b91c1c', to: '#1d4ed8', accent: '#60a5fa' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('Spider-Man: Amazing Fantasy #15', 'Stan Lee & Steve Ditko', [
        { number: 1, chapter: 'Capítulo 1: La Exhibición Radiactiva', scene: 'Laboratorio de Ciencias', panelText: 'El tímido estudiante Peter Parker observa un experimento cuando una araña desciende en el haz de partículas.', dialogue: '¡Me ha picado! Qué ardor más extraño... siento como si ardiera en energía pura.' },
        { number: 2, chapter: 'Capítulo 1: Los Nuevos Poderes', scene: 'Callejón de Nueva York', panelText: 'Para esquivar un auto veloz, Peter salta intuitivamente adhiriéndose a la pared vertical de un rascacielos.', dialogue: '¡Estoy trepando como una araña! ¡Y puedo levantar toneladas con mis propias manos!' },
        { number: 3, chapter: 'Capítulo 1: El Error Fatal', scene: 'Estudio de Televisión', panelText: 'Confiado en su nueva fama, Peter deja escapar a un ladrón fugitivo sin imaginar las consecuencias.', dialogue: 'Ese no es mi problema, guardia. Yo solo miro por mí mismo de ahora en adelante.' },
        { number: 4, chapter: 'Capítulo 1: La Lección Inmortal', scene: 'Casa de los Tíos en Queens', panelText: 'El asesino del querido tío Ben resulta ser el mismo fugitivo que Peter dejó pasar libremente.', dialogue: 'Un gran poder conlleva una gran responsabilidad. Jamás olvidaré estas palabras, tío Ben.' },
      ]),
  },
  {
    id: 'cat-dorian-gray',
    title: 'El Retrato de Dorian Gray',
    author: 'Oscar Wilde',
    category: 'libros',
    format: 'epub',
    genre: 'Gótico / Filosófico / Clásico',
    totalPages: 120,
    year: 1890,
    description: 'Dorian Gray permanece eternamente joven y hermoso mientras un retrato oculto en su buhardilla envejece y absorbe la podredumbre moral de todos sus pecados.',
    coverGradient: { from: '#4a044e', to: '#2e1065', accent: '#e879f9' },
    badgeText: 'LIBRO COMPLETO',
    createFile: () =>
      generateBookFile('El Retrato de Dorian Gray', 'Oscar Wilde', [
        {
          title: 'Capítulo I: El Taller de Basil Hallward',
          content: `El estudio estaba lleno del intenso aroma de las rosas, y cuando la ligera brisa del verano se agitó entre los árboles del jardín, llegó a través de la puerta abierta el pesado olor de las lilas o la fragancia más sutil de los espinos de flores rosadas.\n\nDesde el rincón del sofá de tapicería persa en el que estaba tumbado, Lord Henry Wotton podía ver el resplandor de los brotes dulces color miel de un cytisus cuyas trémulas ramas apenas parecían capaces de soportar la carga de una belleza tan semejante a la llama.\n\nEn el centro de la habitación, colocado sobre un caballete vertical, se encontraba el retrato de cuerpo entero de un joven de extraordinaria belleza personal, y delante de él, a poca distancia, estaba sentado el propio pintor, Basil Hallward, cuya repentina desaparición hacía algunos años había causado tanto revuelo público.`,
        },
        {
          title: 'Capítulo II: La Promesa de la Eterna Juventud',
          content: `—¡Qué triste es! —murmuró Dorian Gray con los ojos fijos en el cuadro recién terminado—. ¡Qué triste es! Yo me volveré viejo, horrible y espantoso. Pero esta pintura permanecerá siempre joven. Jamás envejecerá más allá de este día de junio...\n\n—Si fuese al revés... ¡Si yo pudiese permanecer siempre joven y la pintura fuese quien envejeciera! Por eso... ¡por eso lo daría todo! ¡Sí, no hay nada en el mundo que no daría! ¡Daría mi propia alma por ello!`,
        },
      ]),
  },
  {
    id: 'cat-dracula',
    title: 'Drácula',
    author: 'Bram Stoker',
    category: 'libros',
    format: 'epub',
    genre: 'Terror Gótico / Epistolar',
    totalPages: 160,
    year: 1897,
    description: 'El joven abogado Jonathan Harker viaja a las profundidades de los montes Cárpatos para cerrar la compra de una propiedad en Londres con el enigmático y sombrío Conde Drácula.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#c084fc' },
    badgeText: 'LIBRO COMPLETO',
    createFile: () =>
      generateBookFile('Drácula', 'Bram Stoker', [
        {
          title: 'Diario de Jonathan Harker: Hacia Transilvania',
          content: `3 de mayo. Bistritz. —Salí de Munich a las ocho y treinta y cinco de la noche del primero de mayo, llegando a Viena temprano a la mañana siguiente. Deberíamos haber llegado a las seis y cuarenta y seis, pero el tren tenía una hora de retraso. Budapest parece un lugar maravilloso, por lo poco que pude ver desde el tren y por una pequeña caminata por las calles.\n\nEl conde Drácula me había dirigido al Hotel Royale, que encontré, para mi satisfacción, muy confortable. El país de los Cárpatos parece ser un territorio agreste y salvaje, donde convergen tres nacionalidades muy distintas: sajones, valacos y magiares.\n\n4 de mayo. —La dueña de la posada me preguntó con voz trémula a dónde me dirigía. Cuando le dije que al Castillo de Drácula, se santiguó con fervor y me rogó que no fuera: «¿No sabe qué noche es hoy? ¡Es la víspera del día de San Jorge! Cuando el reloj marque la medianoche, todas las cosas diabólicas del mundo tendrán pleno poder».`,
        },
        {
          title: 'El Encuentro con el Conde',
          content: `El carruaje se detuvo en el patio de un vasto castillo en ruinas. Una alta figura de anciano, afeitado excepto por un largo bigote blanco y vestido de negro de los pies a la cabeza, abrió la pesada puerta de roble con una antorcha en mano.\n\n—Bienvenido a mi casa. Entre libremente y por su propia voluntad —dijo con perfecta cortesía en un inglés de acento extraño—. Soy el conde Drácula, señor Harker. Pase, el aire de la noche es frío y debe de necesitar comer y descansar.`,
        },
      ]),
  },
  {
    id: 'cat-sherlock-holmes',
    title: 'Estudio en Escarlata',
    author: 'Arthur Conan Doyle',
    category: 'libros',
    format: 'epub',
    genre: 'Misterio / Detectives / Clásico',
    totalPages: 95,
    year: 1887,
    description: 'La primera aparición del detective consultor Sherlock Holmes y el doctor John H. Watson. Un cadáver sin heridas hallado en una casa abandonada y una misteriosa palabra escrita con sangre: RACHE.',
    coverGradient: { from: '#0c4a6e', to: '#082f49', accent: '#38bdf8' },
    badgeText: 'LIBRO COMPLETO',
    createFile: () =>
      generateBookFile('Estudio en Escarlata', 'Arthur Conan Doyle', [
        {
          title: 'Capítulo I: El Señor Sherlock Holmes',
          content: `En el año 1878 obtuve el título de doctor en medicina en la Universidad de Londres, y me trasladé a Netley para seguir el curso fijado para los médicos del ejército. Habiendo terminado allí mis estudios, fui asignado regularmente al Quinto Regimiento de Fusileros de Northumberland como cirujano asistente.\n\nFue en el laboratorio de química del hospital San Bartolomé donde conocí por primera vez a Sherlock Holmes. Estaba encorvado sobre una mesa lejana, absorto en su trabajo, y se volvió con un grito de entusiasmo al escuchar nuestros pasos.\n\n—¡Lo he encontrado! ¡Lo he encontrado! —gritó dirigiéndose a mi compañero con un tubo de ensayo en la mano—. He descubierto un reactivo que se precipita con la hemoglobina y con ninguna otra sustancia del mundo. ¡Es el descubrimiento médico-legal más importante de las últimas décadas!`,
        },
      ]),
  },
  {
    id: 'cat-naruto',
    title: 'Naruto: El Camino del Ninja',
    author: 'Masashi Kishimoto',
    category: 'manga',
    format: 'cbz',
    genre: 'Shonen / Ninjas / Aventura',
    totalPages: 10,
    year: 1999,
    description: 'Naruto Uzumaki, un niño marginado en la Aldea Oculta de la Hoja que lleva sellado al Zorro de Nueve Colas en su interior, jura convertirse en el Hokage más respetado de la historia.',
    coverGradient: { from: '#ea580c', to: '#9a3412', accent: '#fb923c' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('Naruto', 'Masashi Kishimoto', [
        { number: 1, chapter: 'Capítulo 1: Uzumaki Naruto', scene: 'Monumento de los Hokages', panelText: 'El rebelde de la aldea pinta con grafitis los rostros esculpidos en la montaña para llamar la atención.', dialogue: '¡Algún día seré el Hokage y seré más fuerte que todos ellos juntos! ¡De veras!' },
        { number: 2, chapter: 'Capítulo 1: El Secreto Prohibido', scene: 'Bosque de Konoha', panelText: 'Iruka-sensei protege con su propio cuerpo a Naruto del shuriken gigante arrojado por Mizuki.', dialogue: 'Naruto no es el monstruo zorro... ¡Él es un shinobi excepcional de Konoha!' },
        { number: 3, chapter: 'Capítulo 1: Jutsu Clones de Sombras', scene: 'El Despertar del Chakra', panelText: 'Lleno de lágrimas y determinación, Naruto concentra su energía y despliega mil clones exactos.', dialogue: '¡Si le pones una mano encima a Iruka-sensei... te destrozaré!' },
        { number: 4, chapter: 'Capítulo 1: La Banda Ninja', scene: 'Amanecer en Konoha', panelText: 'Iruka coloca su propia bandana de shinobi en la frente de Naruto declarándolo graduado oficial.', dialogue: 'Felicidades por graduarte, Naruto. Ven, hoy invito yo al tazón de ramen.' },
      ]),
  },
  {
    id: 'cat-dragon-ball',
    title: 'Dragon Ball: La Leyenda de Goku',
    author: 'Akira Toriyama',
    category: 'manga',
    format: 'cbz',
    genre: 'Shonen / Artes Marciales / Aventura',
    totalPages: 10,
    year: 1984,
    description: 'En el Monte Paoz, el pequeño Son Goku con cola de mono y un báculo sagrado conoce a Bulma. Juntos inician la búsqueda mística de las siete esferas del dragón para invocar a Shenlong.',
    coverGradient: { from: '#d97706', to: '#b45309', accent: '#fde047' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('Dragon Ball', 'Akira Toriyama', [
        { number: 1, chapter: 'Capítulo 1: Bulma y Son Goku', scene: 'Monte Paoz', panelText: 'Un automóvil tecnológico choca contra el pequeño niño que carga un pez gigante en la montaña.', dialogue: '¡Oye! ¿Qué clase de monstruo de metal es este? ¡No te acerques!' },
        { number: 2, chapter: 'Capítulo 1: La Esfera de Cuatro Estrellas', scene: 'Cabaña de Goku', panelText: 'Bulma descubre que la herencia del abuelo Gohan es la reliquia que estaba rastreando con el radar.', dialogue: '¡Es la esfera del dragón! Si reunimos las siete, el dragón sagrado concederá cualquier deseo.' },
        { number: 3, chapter: 'Capítulo 1: La Nube Voladora', scene: 'Costa del Mar', panelText: 'El Maestro Roshi premia la pureza de corazón de Goku otorgándole la legendaria Kinton.', dialogue: '¡Solo quienes tengan el corazón puro pueden montar en la nube voladora!' },
        { number: 4, chapter: 'Capítulo 1: El Kamehameha', scene: 'Montaña Frypan', panelText: 'Goku imita por primera vez la técnica suprema de energía tras verla una sola vez.', dialogue: '¡Ka... me... ha... me... HAAAAA!' },
      ]),
  },
  {
    id: 'cat-shingeki',
    title: 'Ataque a los Titanes: Aquel Día',
    author: 'Hajime Isayama',
    category: 'manga',
    format: 'cbz',
    genre: 'Shonen / Acción / Misterio',
    totalPages: 10,
    year: 2009,
    description: 'Aquel día la humanidad recordó el terror de vivir bajo su yugo y la humillación de quedar atrapada en una jaula. El Titán Colosal rompe el Muro María y Eren Jaeger jura venganza.',
    coverGradient: { from: '#78350f', to: '#292524', accent: '#ca8a04' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('Ataque a los Titanes', 'Hajime Isayama', [
        { number: 1, chapter: 'Capítulo 1: A ti, 2000 años después', scene: 'Distrito Shiganshina', panelText: 'Un relámpago colosal estremece la tierra. Una gigantesca mano sin piel se aferra a lo alto del Muro María.', dialogue: '¿Ese muro... mide cincuenta metros de alto? ¡Es imposible!' },
        { number: 2, chapter: 'Capítulo 1: La Caída de la Muralla', scene: 'Puerta Principal', panelText: 'La patada del Titán Colosal pulveriza la puerta de entrada, permitiendo el ingreso de los gigantes.', dialogue: '¡Los escombros cayeron sobre las casas! ¡Rápido, debemos huir a los botes!' },
        { number: 3, chapter: 'Capítulo 1: La Promesa de Eren', scene: 'Bote de Evacuación', panelText: 'Viendo arder su pueblo natal entre lágrimas de rabia pura, Eren aprieta sus puños ensangrentados.', dialogue: '¡Los aniquilaré a todos! ¡No dejaré ni a uno solo con vida en este mundo!' },
      ]),
  },
  {
    id: 'cat-watchmen',
    title: 'Watchmen: ¿Quién vigila a los vigilantes?',
    author: 'Alan Moore & Dave Gibbons',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Novela Gráfica / Suspense',
    totalPages: 10,
    year: 1986,
    description: 'El Comediante ha sido asesinado arrojado por la ventana de su ático. Rorschach inicia una investigación solitaria que desentraña una conspiración nuclear para salvar a la humanidad de sí misma.',
    coverGradient: { from: '#ca8a04', to: '#18181b', accent: '#facc15' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('Watchmen', 'Alan Moore', [
        { number: 1, chapter: 'Capítulo 1: A medianoche, todos los agentes...', scene: 'Callejón de Nueva York', panelText: 'Diario de Rorschach. 12 de octubre de 1985. Un cadáver de perro en el callejón, neumático sobre el estómago roto.', dialogue: 'Esta ciudad me teme. He visto su verdadero rostro y no pienso cerrar los ojos.' },
        { number: 2, chapter: 'Capítulo 1: El Emblema Manchado', scene: 'Ático de Edward Blake', panelText: 'La insignia amarilla sonriente con una sola gota de sangre roja coagulada en el ojo.', dialogue: 'El Comediante está muerto. Alguien planea cazar a los vigilantes uno por uno.' },
        { number: 3, chapter: 'Capítulo 1: La Visita a Dan Dreiberg', scene: 'Sótano de Búho Nocturno', panelText: 'Rorschach surge de las sombras de la cocina masticando terrones de azúcar sin hacer ruido.', dialogue: 'Nos prohibieron usar máscaras en 1977. Tú te retiraste, Dan. Yo seguí adelante.' },
      ]),
  },
  {
    id: 'cat-superman',
    title: 'Superman: All-Star',
    author: 'Grant Morrison & Frank Quitely',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Obra Maestra',
    totalPages: 10,
    year: 2006,
    description: 'Sobrecargado de radiación solar durante una misión de rescate en el corazón del sol, Superman dispone de un último año para completar sus doce grandes hazañas y despedirse de la Tierra.',
    coverGradient: { from: '#1d4ed8', to: '#b91c1c', accent: '#fbbf24' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz('Superman: All-Star', 'Grant Morrison', [
        { number: 1, chapter: 'Capítulo 1: Más Veloz', scene: 'Corona del Sol', panelText: 'Un cohete de investigación en llamas cae hacia el astro rey. El Hombre de Acero lo intercepta con serenidad.', dialogue: 'No teman. Todo va a estar bien. Los tengo a todos asegurados.' },
        { number: 2, chapter: 'Capítulo 1: La Fortaleza de la Soledad', scene: 'Ártico Profundo', panelText: 'Superman guía a Lois Lane a través de maravillas cósmicas recolectadas de galaxias lejanas.', dialogue: 'Lois... hay algo que debo revelarte antes de que sea demasiado tarde.' },
        { number: 3, chapter: 'Capítulo 1: La Promesa de Metrópolis', scene: 'Azotea del Daily Planet', panelText: 'Incluso sabiendo que su cuerpo se transforma en energía pura, el protector del mundo no vacila.', dialogue: 'Eres mucho más fuerte de lo que crees. Jamás dejes de creer en ti misma.' },
      ]),
  },
];
