import type { CatalogItem } from './types';
import { generateMangaCbz, createDefaultMangaPanels } from './generators';

export const ROMANCE_CATALOG: CatalogItem[] = [
  {
    id: 'cat-marriage-convenience',
    title: 'Negocio Matrimonial (Marriage of Convenience)',
    author: 'Antstudio & Ken',
    category: 'romance',
    format: 'cbz',
    genre: 'Manhwa / Romance Histórico / Segunda Oportunidad',
    totalPages: 141,
    year: 2022,
    description: 'Bianca de Arno muere miserablemente tras el desprecio y la pérdida de su esposo Zachary. Regresa en el tiempo a cuando tenía 18 años y decide cambiar su destino para salvar su matrimonio y su familia.',
    coverGradient: { from: '#831843', to: '#1c1917', accent: '#ec4899' },
    badgeText: 'MANHWA ROMÁNTICO',
    tags: ['Romance', 'Manhwa', 'Fantasía', 'Histórico'],
    createFile: () =>
      generateMangaCbz(
        'Marriage of Convenience',
        'Antstudio & Ken',
        createDefaultMangaPanels(
          'Marriage of Convenience',
          'Antstudio & Ken',
          'Bianca de Arno muere miserablemente tras el desprecio y la pérdida de su esposo Zachary. Regresa en el tiempo a cuando tenía 18 años y decide cambiar su destino para salvar su matrimonio y su familia.',
          'romance'
        ),
        'romance',
        'Bianca de Arno muere miserablemente tras el desprecio y la pérdida de su esposo Zachary. Regresa en el tiempo a cuando tenía 18 años y decide cambiar su destino para salvar su matrimonio y su familia.'
      ),
  },
  {
    id: 'cat-light-shadow',
    title: 'Luz y Sombra (Light and Shadow)',
    author: 'Ryu Hyang & Hee Won',
    category: 'romance',
    format: 'cbz',
    genre: 'Manhwa / Romance de Época / Enemigos a Amantes',
    totalPages: 103,
    year: 2017,
    description: 'Edna, una doncella de sangre noble escondida, se casa obligada con el temible duque Eli en lugar de la hija del marqués. Con su temple y secretos, cambiará el destino del ducado.',
    coverGradient: { from: '#701a75', to: '#09090b', accent: '#f43f5e' },
    badgeText: 'MANHWA ROMÁNTICO',
    tags: ['Romance', 'Manhwa', 'Drama', 'Histórico'],
    createFile: () =>
      generateMangaCbz(
        'Light and Shadow',
        'Ryu Hyang & Hee Won',
        createDefaultMangaPanels(
          'Light and Shadow',
          'Ryu Hyang & Hee Won',
          'Edna, una doncella de sangre noble escondida, se casa obligada con el temible duque Eli en lugar de la hija del marqués. Con su temple y secretos, cambiará el destino del ducado.',
          'romance'
        ),
        'romance',
        'Edna, una doncella de sangre noble escondida, se casa obligada con el temible duque Eli en lugar de la hija del marqués. Con su temple y secretos, cambiará el destino del ducado.'
      ),
  },
  {
    id: 'cat-maid-vampire',
    title: 'La Criada y el Vampiro (The Maid and the Vampire)',
    author: 'YJu & Dolce',
    category: 'romance',
    format: 'cbz',
    genre: 'Manhwa / Fantasía Sobrenatural / Romance Dulce',
    totalPages: 76,
    year: 2019,
    description: 'Areum cae en un mundo extraño donde es capturada y vendida al duque Millard, el único vampiro del reino. En lugar de matarla, nace entre ambos un afecto tierno e incondicional.',
    coverGradient: { from: '#4c0519', to: '#18181b', accent: '#fb7185' },
    badgeText: 'MANHWA ROMÁNTICO',
    tags: ['Romance', 'Manhwa', 'Fantasía', 'Vampiros'],
    createFile: () =>
      generateMangaCbz(
        'The Maid and the Vampire',
        'YJu & Dolce',
        createDefaultMangaPanels(
          'The Maid and the Vampire',
          'YJu & Dolce',
          'Areum cae en un mundo extraño donde es capturada y vendida al duque Millard, el único vampiro del reino. En lugar de matarla, nace entre ambos un afecto tierno e incondicional.',
          'romance'
        ),
        'romance',
        'Areum cae en un mundo extraño donde es capturada y vendida al duque Millard, el único vampiro del reino. En lugar de matarla, nace entre ambos un afecto tierno e incondicional.'
      ),
  },
  {
    id: 'cat-who-made-me-princess',
    title: 'Princesa Encantadora (Who Made Me a Princess)',
    author: 'Plutus & Spoon',
    category: 'romance',
    format: 'cbz',
    genre: 'Manhwa / Fantasía Romántica / Reencarnación',
    totalPages: 125,
    year: 2018,
    description: 'Athanasia reencarna como la princesa que su frío padre el emperador Claude ejecutará a los 18 años. Con astucia y ternura buscará derretir el gélido corazón de su padre y encontrar el amor.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA ROMÁNTICO',
    tags: ['Romance', 'Manhwa', 'Fantasía', 'Isekai'],
    createFile: () =>
      generateMangaCbz(
        'Who Made Me a Princess',
        'Plutus & Spoon',
        createDefaultMangaPanels(
          'Who Made Me a Princess',
          'Plutus & Spoon',
          'Athanasia reencarna como la princesa que su frío padre el emperador Claude ejecutará a los 18 años. Con astucia y ternura buscará derretir el gélido corazón de su padre y encontrar el amor.',
          'romance'
        ),
        'romance',
        'Athanasia reencarna como la princesa que su frío padre el emperador Claude ejecutará a los 18 años. Con astucia y ternura buscará derretir el gélido corazón de su padre y encontrar el amor.'
      ),
  },
  {
    id: 'cat-this-witch-of-mine',
    title: 'Esta Bruja Mía (This Witch of Mine)',
    author: 'Hey-yoon & Mas',
    category: 'romance',
    format: 'cbz',
    genre: 'Manhwa / Romance Poético / Fantasía Dramática',
    totalPages: 60,
    year: 2016,
    description: 'En tiempos de cacería de brujas, Philippa y otras brujas inmortales entrelazan sus destinos amorosos con humanos mortales en una de las historias más emotivas del webtoon coreano.',
    coverGradient: { from: '#3b0764', to: '#0f172a', accent: '#c084fc' },
    badgeText: 'MANHWA ROMÁNTICO',
    tags: ['Romance', 'Manhwa', 'Magia', 'Drama'],
    createFile: () =>
      generateMangaCbz(
        'This Witch of Mine',
        'Hey-yoon & Mas',
        createDefaultMangaPanels(
          'This Witch of Mine',
          'Hey-yoon & Mas',
          'En tiempos de cacería de brujas, Philippa y otras brujas inmortales entrelazan sus destinos amorosos con humanos mortales en una de las historias más emotivas del webtoon coreano.',
          'romance'
        ),
        'romance',
        'En tiempos de cacería de brujas, Philippa y otras brujas inmortales entrelazan sus destinos amorosos con humanos mortales en una de las historias más emotivas del webtoon coreano.'
      ),
  },
  {
    id: 'cat-lady-beast',
    title: 'Ella y la Bestia (The Lady and the Beast)',
    author: 'Maginot & Hongseul',
    category: 'romance',
    format: 'cbz',
    genre: 'Manhwa / Romance Histórico / Fantasía',
    totalPages: 135,
    year: 2020,
    description: 'La legendaria emperatriz guerrera Martina reencarna siglos después como Astina y contrae matrimonio con el duque Atalanta, quien vive preso de una maldición que lo transforma en bestia.',
    coverGradient: { from: '#1e1b4b', to: '#172554', accent: '#38bdf8' },
    badgeText: 'MANHWA ROMÁNTICO',
    tags: ['Romance', 'Manhwa', 'Fantasía', 'Reencarnación'],
    createFile: () =>
      generateMangaCbz(
        'The Lady and the Beast',
        'Maginot & Hongseul',
        createDefaultMangaPanels(
          'The Lady and the Beast',
          'Maginot & Hongseul',
          'La legendaria emperatriz guerrera Martina reencarna siglos después como Astina y contrae matrimonio con el duque Atalanta, quien vive preso de una maldición que lo transforma en bestia.',
          'romance'
        ),
        'romance',
        'La legendaria emperatriz guerrera Martina reencarna siglos después como Astina y contrae matrimonio con el duque Atalanta, quien vive preso de una maldición que lo transforma en bestia.'
      ),
  },
  {
    id: 'cat-shim-chong',
    title: 'Su Historia de Shim Chong (Her Tale of Shim Chong)',
    author: 'Seri & Bi-wan',
    category: 'romance',
    format: 'cbz',
    genre: 'Manhwa / Romance Histórico Joseon / Drama',
    totalPages: 81,
    year: 2017,
    description: 'Una reinterpretación profunda del folclore tradicional coreano donde una mendiga huérfana y una noble atrapada en un matrimonio arreglado encuentran consuelo, libertad y afecto mutuo.',
    coverGradient: { from: '#022c22', to: '#064e3b', accent: '#34d399' },
    badgeText: 'MANHWA ROMÁNTICO',
    tags: ['Romance', 'Manhwa', 'Histórico', 'Drama'],
    createFile: () =>
      generateMangaCbz(
        'Her Tale of Shim Chong',
        'Seri & Bi-wan',
        createDefaultMangaPanels(
          'Her Tale of Shim Chong',
          'Seri & Bi-wan',
          'Una reinterpretación profunda del folclore tradicional coreano donde una mendiga huérfana y una noble atrapada en un matrimonio arreglado encuentran consuelo, libertad y afecto mutuo.',
          'romance'
        ),
        'romance',
        'Una reinterpretación profunda del folclore tradicional coreano donde una mendiga huérfana y una noble atrapada en un matrimonio arreglado encuentran consuelo, libertad y afecto mutuo.'
      ),
  },
  {
    id: 'cat-great-catsby',
    title: 'El Gran Catsby (The Great Catsby)',
    author: 'Doha Kang',
    category: 'romance',
    format: 'cbz',
    genre: 'Webtoon Clásico / Romance Melancólico / Vida Juvenil',
    totalPages: 72,
    year: 2005,
    description: 'Un joven de 26 años enfrenta la boda de su novia de toda la vida con otro hombre mayor, desencadenando una búsqueda sobre el amor, la madurez y la vulnerabilidad en la Seúl moderna.',
    coverGradient: { from: '#2e1065', to: '#020617', accent: '#818cf8' },
    badgeText: 'MANHWA ROMÁNTICO',
    tags: ['Romance', 'Manhwa', 'Comedia', 'Vida Cotidiana'],
    createFile: () =>
      generateMangaCbz(
        'The Great Catsby',
        'Doha Kang',
        createDefaultMangaPanels(
          'The Great Catsby',
          'Doha Kang',
          'Un joven de 26 años enfrenta la boda de su novia de toda la vida con otro hombre mayor, desencadenando una búsqueda sobre el amor, la madurez y la vulnerabilidad en la Seúl moderna.',
          'romance'
        ),
        'romance',
        'Un joven de 26 años enfrenta la boda de su novia de toda la vida con otro hombre mayor, desencadenando una búsqueda sobre el amor, la madurez y la vulnerabilidad en la Seúl moderna.'
      ),
  },
];
