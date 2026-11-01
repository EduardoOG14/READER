import type { CatalogItem } from './types';
import { generateMangaCbz, createDefaultMangaPanels } from './generators';

export const MANHWAS_CATALOG: CatalogItem[] = [
  {
    id: 'cat-solo-leveling',
    title: 'Solo Leveling',
    author: 'Chugong & DUBU',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Acción / Mazmorras & Monarca de las Sombras',
    totalPages: 10,
    year: 2018,
    description: 'Sung Jin-woo, el cazador más débil de rango E, sobrevive milagrosamente a una doble mazmorra y despierta un sistema único que solo a él le permite subir de nivel sin límites.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Solo Leveling',
        'Chugong & DUBU',
        createDefaultMangaPanels(
          'Solo Leveling',
          'Chugong & DUBU',
          'Sung Jin-woo, el cazador más débil de rango E, sobrevive milagrosamente a una doble mazmorra y despierta un sistema único que solo a él le permite subir de nivel sin límites.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-tower-of-god',
    title: 'Tower of God (Torre de Dios)',
    author: 'SIU',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Fantasía Épica / Misterio & Shinsu',
    totalPages: 10,
    year: 2010,
    description: 'Bam entra como un irregular a la colosal Torre para seguir a su amiga Rachel, descubriendo que en la cima aguarda todo cuanto un ser humano pueda desear.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Tower of God (Torre de Dios)',
        'SIU',
        createDefaultMangaPanels(
          'Tower of God (Torre de Dios)',
          'SIU',
          'Bam entra como un irregular a la colosal Torre para seguir a su amiga Rachel, descubriendo que en la cima aguarda todo cuanto un ser humano pueda desear.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-tbate',
    title: 'The Beginning After the End',
    author: 'TurtleMe & Fuyuki23',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Isekai / Magia & Dragones',
    totalPages: 10,
    year: 2018,
    description: 'El rey Grey, invicto en combate pero solitario en su trono, reencarna como el niño Arthur Leywin en un mundo de bestias mágicas y hechicería.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Beginning After the End',
        'TurtleMe & Fuyuki23',
        createDefaultMangaPanels(
          'The Beginning After the End',
          'TurtleMe & Fuyuki23',
          'El rey Grey, invicto en combate pero solitario en su trono, reencarna como el niño Arthur Leywin en un mundo de bestias mágicas y hechicería.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-omniscient-reader',
    title: 'Omniscient Reader\'s Viewpoint',
    author: 'Sing Shong & Sleepy-C',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Acción / Escenarios del Fin del Mundo',
    totalPages: 10,
    year: 2020,
    description: 'Dokja Kim era el único lector de una novela web apocalíptica de 3149 capítulos. Cuando la trama se vuelve realidad, él es el único que sabe cómo salvar el mundo.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Omniscient Reader\'s Viewpoint',
        'Sing Shong & Sleepy-C',
        createDefaultMangaPanels(
          'Omniscient Reader\'s Viewpoint',
          'Sing Shong & Sleepy-C',
          'Dokja Kim era el único lector de una novela web apocalíptica de 3149 capítulos. Cuando la trama se vuelve realidad, él es el único que sabe cómo salvar el mundo.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-the-boxer',
    title: 'The Boxer',
    author: 'JH',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Deportes / Boxeo Psicológico',
    totalPages: 10,
    year: 2020,
    description: 'K, el entrenador de campeones mundiales, descubre a Yu, un huérfano con ojos vacíos pero con una percepción y reflejos divinos para el cuadrilátero.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Boxer',
        'JH',
        createDefaultMangaPanels(
          'The Boxer',
          'JH',
          'K, el entrenador de campeones mundiales, descubre a Yu, un huérfano con ojos vacíos pero con una percepción y reflejos divinos para el cuadrilátero.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-lore-olympus',
    title: 'Lore Olympus (Cuentos del Olimpo)',
    author: 'Rachel Smythe',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Mitología Griega / Romance Moderno',
    totalPages: 10,
    year: 2018,
    description: 'El mito del rapto de Perséfone reimaginado con teléfonos inteligentes, cotilleos del Olimpo y el tierno romance con el señor del Inframundo, Hades.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Lore Olympus (Cuentos del Olimpo)',
        'Rachel Smythe',
        createDefaultMangaPanels(
          'Lore Olympus (Cuentos del Olimpo)',
          'Rachel Smythe',
          'El mito del rapto de Perséfone reimaginado con teléfonos inteligentes, cotilleos del Olimpo y el tierno romance con el señor del Inframundo, Hades.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-bastard',
    title: 'Bastard',
    author: 'Carnby Kim & Youngchan Hwang',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Thriller / Suspenso Psicológico',
    totalPages: 10,
    year: 2014,
    description: 'Jin Seon vive bajo el terror de su padre, un respetado hombre de negocios que es un asesino en serie. Cuando elige a la chica que le gusta como víctima, Jin se rebela.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Bastard',
        'Carnby Kim & Youngchan Hwang',
        createDefaultMangaPanels(
          'Bastard',
          'Carnby Kim & Youngchan Hwang',
          'Jin Seon vive bajo el terror de su padre, un respetado hombre de negocios que es un asesino en serie. Cuando elige a la chica que le gusta como víctima, Jin se rebela.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-noblesse',
    title: 'Noblesse',
    author: 'Jeho Son & Kwangsu Lee',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Sobrenatural / Vampiros Nobles',
    totalPages: 10,
    year: 2007,
    description: 'Cadis Etrama Di Raizel despierta de un letargo de 820 años en la Corea moderna y asiste a la escuela secundaria junto a su leal sirviente Frankenstein.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Noblesse',
        'Jeho Son & Kwangsu Lee',
        createDefaultMangaPanels(
          'Noblesse',
          'Jeho Son & Kwangsu Lee',
          'Cadis Etrama Di Raizel despierta de un letargo de 820 años en la Corea moderna y asiste a la escuela secundaria junto a su leal sirviente Frankenstein.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-god-of-highschool',
    title: 'The God of High School',
    author: 'Yongje Park',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Artes Marciales / Dioses & Mitología',
    totalPages: 10,
    year: 2011,
    description: 'Jin Mori participa en un torneo nacional de artes marciales mixtas donde el ganador verá cumplido cualquier deseo, descubriendo su origen divino como el Rey Mono.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The God of High School',
        'Yongje Park',
        createDefaultMangaPanels(
          'The God of High School',
          'Yongje Park',
          'Jin Mori participa en un torneo nacional de artes marciales mixtas donde el ganador verá cumplido cualquier deseo, descubriendo su origen divino como el Rey Mono.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-lookism',
    title: 'Lookism',
    author: 'Taejun Pak',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Drama Social / Doble Cuerpo & Pandillas',
    totalPages: 10,
    year: 2014,
    description: 'Daniel Park, un joven víctima de acoso escolar severo, despierta con el don de alternar su conciencia entre su cuerpo original y un cuerpo atlético y perfecto.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Lookism',
        'Taejun Pak',
        createDefaultMangaPanels(
          'Lookism',
          'Taejun Pak',
          'Daniel Park, un joven víctima de acoso escolar severo, despierta con el don de alternar su conciencia entre su cuerpo original y un cuerpo atlético y perfecto.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-sweet-home',
    title: 'Sweet Home',
    author: 'Carnby Kim & Youngchan Hwang',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Terror / Monstruos de los Deseos',
    totalPages: 10,
    year: 2017,
    description: 'Cha Hyun-soo, un estudiante recluido tras perder a su familia, se atrinchera en su edificio de departamentos cuando los humanos comienzan a convertirse en monstruos.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Sweet Home',
        'Carnby Kim & Youngchan Hwang',
        createDefaultMangaPanels(
          'Sweet Home',
          'Carnby Kim & Youngchan Hwang',
          'Cha Hyun-soo, un estudiante recluido tras perder a su familia, se atrinchera en su edificio de departamentos cuando los humanos comienzan a convertirse en monstruos.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-eleceed',
    title: 'Eleceed',
    author: 'Jeho Son & ZHENA',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Acción / Despertados & Gatos',
    totalPages: 10,
    year: 2018,
    description: 'Jiwoo es un chico bondadoso con súper velocidad que rescata a un gato gordo callejero, sin saber que es Kayden, un temido agente internacional atrapado en forma felina.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Eleceed',
        'Jeho Son & ZHENA',
        createDefaultMangaPanels(
          'Eleceed',
          'Jeho Son & ZHENA',
          'Jiwoo es un chico bondadoso con súper velocidad que rescata a un gato gordo callejero, sin saber que es Kayden, un temido agente internacional atrapado en forma felina.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-wind-breaker',
    title: 'Wind Breaker',
    author: 'Yongseok Jo',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Deportes / Ciclismo Callejero & Amistad',
    totalPages: 10,
    year: 2013,
    description: 'Jay Jo, el perfecto presidente estudiantil, es un virtuoso ciclista que se une a la tripulación Hummingbird para competir en el torneo callejero League of Street.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Wind Breaker',
        'Yongseok Jo',
        createDefaultMangaPanels(
          'Wind Breaker',
          'Yongseok Jo',
          'Jay Jo, el perfecto presidente estudiantil, es un virtuoso ciclista que se une a la tripulación Hummingbird para competir en el torneo callejero League of Street.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-nano-machine',
    title: 'Nano Machine',
    author: 'Jeolmu Hyeon & Hanjung Wolya',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Murim / Nanotecnología del Futuro',
    totalPages: 10,
    year: 2020,
    description: 'Cheon Yeo-woon, marginado en la jerarquía del Culto Demoníaco, recibe la visita de un descendiente del futuro que le inyecta nanomáquinas en su torrente sanguíneo.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Nano Machine',
        'Jeolmu Hyeon & Hanjung Wolya',
        createDefaultMangaPanels(
          'Nano Machine',
          'Jeolmu Hyeon & Hanjung Wolya',
          'Cheon Yeo-woon, marginado en la jerarquía del Culto Demoníaco, recibe la visita de un descendiente del futuro que le inyecta nanomáquinas en su torrente sanguíneo.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-mount-hua',
    title: 'Return of the Blossoming Blade (Mount Hua)',
    author: 'Biga',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Murim / Reencarnación de la Secta Hua',
    totalPages: 10,
    year: 2021,
    description: 'Chung Myung, el Santo de la Espada de los Ciruelos, despierta un siglo después de derrotar a Cheon Ma para descubrir que su querida secta Monte Hua está en la ruina.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Return of the Blossoming Blade (Mount Hua)',
        'Biga',
        createDefaultMangaPanels(
          'Return of the Blossoming Blade (Mount Hua)',
          'Biga',
          'Chung Myung, el Santo de la Espada de los Ciruelos, despierta un siglo después de derrotar a Cheon Ma para descubrir que su querida secta Monte Hua está en la ruina.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-suicide-hunter',
    title: 'SSS-Class Suicide Hunter',
    author: 'Shin Noah',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Mazmorras / Regresión por Muerte',
    totalPages: 10,
    year: 2020,
    description: 'Kim Gong-ja obtiene la habilidad de copiar las técnicas de quien lo asesine al costo de morir, retrocediendo un día en el tiempo cada vez que pierde la vida.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'SSS-Class Suicide Hunter',
        'Shin Noah',
        createDefaultMangaPanels(
          'SSS-Class Suicide Hunter',
          'Shin Noah',
          'Kim Gong-ja obtiene la habilidad de copiar las técnicas de quien lo asesine al costo de morir, retrocediendo un día en el tiempo cada vez que pierde la vida.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-northern-blade',
    title: 'Legend of the Northern Blade',
    author: 'Woogack',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Murim / Venganza de las Sombras',
    totalPages: 10,
    year: 2020,
    description: 'Jin Mu-won, último heredero de la Secta Celestial del Norte falsamente acusada de traición, aprende en secreto las artes marciales oscuras para vengar a su padre.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Legend of the Northern Blade',
        'Woogack',
        createDefaultMangaPanels(
          'Legend of the Northern Blade',
          'Woogack',
          'Jin Mu-won, último heredero de la Secta Celestial del Norte falsamente acusada de traición, aprende en secreto las artes marciales oscuras para vengar a su padre.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-mercenary-enrollment',
    title: 'Mercenary Enrollment (Teenage Mercenary)',
    author: 'YC & Rakhyun',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Acción Militar / Guardaespaldas Escolar',
    totalPages: 10,
    year: 2020,
    description: 'Ijin Yu, único sobreviviente de un accidente aéreo que fue entrenado como niño mercenario de élite, regresa a Corea a los 18 años para proteger a su hermana.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Mercenary Enrollment (Teenage Mercenary)',
        'YC & Rakhyun',
        createDefaultMangaPanels(
          'Mercenary Enrollment (Teenage Mercenary)',
          'YC & Rakhyun',
          'Ijin Yu, único sobreviviente de un accidente aéreo que fue entrenado como niño mercenario de élite, regresa a Corea a los 18 años para proteger a su hermana.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-weak-hero',
    title: 'Weak Hero',
    author: 'Seopass & RAZEN',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Acción Escolar / Estrategia & Física',
    totalPages: 10,
    year: 2018,
    description: 'Gray Yeon es un estudiante menudo y aparentemente indefenso que desmantela a los matones más brutales de la secundaria Eunjang usando pura física y cálculo táctico.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Weak Hero',
        'Seopass & RAZEN',
        createDefaultMangaPanels(
          'Weak Hero',
          'Seopass & RAZEN',
          'Gray Yeon es un estudiante menudo y aparentemente indefenso que desmantela a los matones más brutales de la secundaria Eunjang usando pura física y cálculo táctico.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-viral-hit',
    title: 'Viral Hit: How to Fight',
    author: 'Taejun Pak & Kim Junghyun',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Artes Marciales / Transmisión en Vivo',
    totalPages: 10,
    year: 2019,
    description: 'Hobin Yoo, un chico débil y pobre, encuentra un misterioso canal de NewTube de un tipo con máscara de pollo que enseña a derrotar a cualquier tipo de peleador callejero.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Viral Hit: How to Fight',
        'Taejun Pak & Kim Junghyun',
        createDefaultMangaPanels(
          'Viral Hit: How to Fight',
          'Taejun Pak & Kim Junghyun',
          'Hobin Yoo, un chico débil y pobre, encuentra un misterioso canal de NewTube de un tipo con máscara de pollo que enseña a derrotar a cualquier tipo de peleador callejero.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-tomb-raider-king',
    title: 'Tomb Raider King',
    author: 'SAN.G & Yuns',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Reliquias Divinas / Regresión',
    totalPages: 10,
    year: 2019,
    description: 'Seo Joo-heon regresa 15 años al pasado antes de ser traicionado, utilizando su conocimiento de las Tumbas de Dioses para saquear todas las reliquias del mundo.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Tomb Raider King',
        'SAN.G & Yuns',
        createDefaultMangaPanels(
          'Tomb Raider King',
          'SAN.G & Yuns',
          'Seo Joo-heon regresa 15 años al pasado antes de ser traicionado, utilizando su conocimiento de las Tumbas de Dioses para saquear todas las reliquias del mundo.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-overgeared',
    title: 'Overgeared',
    author: 'Park Saenal',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Realidad Virtual / Herrero Legendario',
    totalPages: 10,
    year: 2020,
    description: 'Shin Youngwoo (Grid) descubre en el juego Satisfy el libro de Pagma, convirtiéndose en el primer artesano legendario capaz de forjar objetos de clase mítica.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Overgeared',
        'Park Saenal',
        createDefaultMangaPanels(
          'Overgeared',
          'Park Saenal',
          'Shin Youngwoo (Grid) descubre en el juego Satisfy el libro de Pagma, convirtiéndose en el primer artesano legendario capaz de forjar objetos de clase mítica.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-survival-sword-king',
    title: 'Survival Story of a Sword King',
    author: 'Soon-Q',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Isekai / Nivel Bugueado en Nivel 5',
    totalPages: 10,
    year: 2020,
    description: 'Ryu Han-bin es transportado a otro mundo pero su interfaz de juego se bugea, atrapándolo durante 22 años en una zona tutorial de monstruos de nivel infernal.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Survival Story of a Sword King',
        'Soon-Q',
        createDefaultMangaPanels(
          'Survival Story of a Sword King',
          'Soon-Q',
          'Ryu Han-bin es transportado a otro mundo pero su interfaz de juego se bugea, atrapándolo durante 22 años en una zona tutorial de monstruos de nivel infernal.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-villains-destined',
    title: 'Villains Are Destined to Die',
    author: 'Gwon Gyeoeul & SUOL',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Otome Isekai / Romance & Supervivencia',
    totalPages: 10,
    year: 2020,
    description: 'Una chica reencarna como Penélope Eckhart, la villana adoptada de un juego otome de dificultad extrema donde cada mala respuesta termina en su muerte inmediata.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Villains Are Destined to Die',
        'Gwon Gyeoeul & SUOL',
        createDefaultMangaPanels(
          'Villains Are Destined to Die',
          'Gwon Gyeoeul & SUOL',
          'Una chica reencarna como Penélope Eckhart, la villana adoptada de un juego otome de dificultad extrema donde cada mala respuesta termina en su muerte inmediata.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-remarried-empress',
    title: 'The Remarried Empress',
    author: 'Alphatart & Sumpul',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Drama Palaciego / Divorcio y Venganza',
    totalPages: 10,
    year: 2019,
    description: 'Navier Ellie Trovi, la perfecta emperatriz de Oriente, es traicionada por su esposo por una amante esclava. En el tribunal de divorcio, anuncia su boda con el rey vecino.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Remarried Empress',
        'Alphatart & Sumpul',
        createDefaultMangaPanels(
          'The Remarried Empress',
          'Alphatart & Sumpul',
          'Navier Ellie Trovi, la perfecta emperatriz de Oriente, es traicionada por su esposo por una amante esclava. En el tribunal de divorcio, anuncia su boda con el rey vecino.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-who-made-me-princess',
    title: 'Who Made Me a Princess',
    author: 'Plutus & Spoon',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Reencarnación / Lazos de Familia',
    totalPages: 10,
    year: 2017,
    description: 'Athanasia reencarna como la princesa desdichada que será ejecutada por su propio padre, el tiránico emperador Claude, ideando un plan para sobrevivir ganándose su cariño.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Who Made Me a Princess',
        'Plutus & Spoon',
        createDefaultMangaPanels(
          'Who Made Me a Princess',
          'Plutus & Spoon',
          'Athanasia reencarna como la princesa desdichada que será ejecutada por su propio padre, el tiránico emperador Claude, ideando un plan para sobrevivir ganándose su cariño.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-true-beauty',
    title: 'True Beauty (Secretos de Belleza)',
    author: 'Yaongyi',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Romance Escolar / Maquillaje y Autoestima',
    totalPages: 10,
    year: 2018,
    description: 'Jugyeong Lim domina el arte del maquillaje profesional tras años de acoso por su físico, convirtiéndose en la diosa de la escuela mientras dos apuestos chicos conocen su secreto.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'True Beauty (Secretos de Belleza)',
        'Yaongyi',
        createDefaultMangaPanels(
          'True Beauty (Secretos de Belleza)',
          'Yaongyi',
          'Jugyeong Lim domina el arte del maquillaje profesional tras años de acoso por su físico, convirtiéndose en la diosa de la escuela mientras dos apuestos chicos conocen su secreto.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-hardcore-leveling',
    title: 'Hardcore Leveling Warrior',
    author: 'Sehoon Kim',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / RPG de Fantasía / Apuestas y Nivel 1',
    totalPages: 10,
    year: 2016,
    description: 'El jugador número uno de Lucid Adventure pierde todo su equipamiento y estadísticas de nivel 99 tras una emboscada, empezando de cero con su habilidad única de Apostador.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Hardcore Leveling Warrior',
        'Sehoon Kim',
        createDefaultMangaPanels(
          'Hardcore Leveling Warrior',
          'Sehoon Kim',
          'El jugador número uno de Lucid Adventure pierde todo su equipamiento y estadísticas de nivel 99 tras una emboscada, empezando de cero con su habilidad única de Apostador.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-dice',
    title: 'DICE: El Cubo que lo Cambia Todo',
    author: 'Yun Hyunseok',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Sobrenatural / Dados Mágicos',
    totalPages: 10,
    year: 2013,
    description: 'Dongtae es un perdedor integral hasta que obtiene un dado azul que le permite alterar sus atributos físicos e intelectuales como si la vida real fuera un juego de rol.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'DICE: El Cubo que lo Cambia Todo',
        'Yun Hyunseok',
        createDefaultMangaPanels(
          'DICE: El Cubo que lo Cambia Todo',
          'Yun Hyunseok',
          'Dongtae es un perdedor integral hasta que obtiene un dado azul que le permite alterar sus atributos físicos e intelectuales como si la vida real fuera un juego de rol.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-unholy-blood',
    title: 'Unholy Blood (White Blood)',
    author: 'Lina Im',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Vampiros de Sangre Pura / Acción',
    totalPages: 10,
    year: 2020,
    description: 'Hayan Park es la última vampira de sangre pura que solo desea una vida normal, pero debe destruir a los siete señores vampiros que infectaron la ciudad para vengar a su tutor.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Unholy Blood (White Blood)',
        'Lina Im',
        createDefaultMangaPanels(
          'Unholy Blood (White Blood)',
          'Lina Im',
          'Hayan Park es la última vampira de sangre pura que solo desea una vida normal, pero debe destruir a los siete señores vampiros que infectaron la ciudad para vengar a su tutor.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-killstagram',
    title: 'Killstagram',
    author: 'Ryoung',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Thriller de Terror / Redes Sociales & Acoso',
    totalPages: 10,
    year: 2019,
    description: 'Remi Do es una influencer famosa de Instagram cuya vida de ensueño se convierte en una pesadilla sangrienta cuando un acosador psicópata rastrea cada una de sus fotos.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Killstagram',
        'Ryoung',
        createDefaultMangaPanels(
          'Killstagram',
          'Ryoung',
          'Remi Do es una influencer famosa de Instagram cuya vida de ensueño se convierte en una pesadilla sangrienta cuando un acosador psicópata rastrea cada una de sus fotos.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-shotgun-boy',
    title: 'Shotgun Boy',
    author: 'Carnby Kim & Hongpil',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Terror y Monstruos / Precuela de Sweet Home',
    totalPages: 10,
    year: 2021,
    description: 'Gyuhwan, un estudiante intimidado que huye al bosque con una escopeta, debe convertirse en cazador cuando una raza de monstruos biomecánicos invade el campamento.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Shotgun Boy',
        'Carnby Kim & Hongpil',
        createDefaultMangaPanels(
          'Shotgun Boy',
          'Carnby Kim & Hongpil',
          'Gyuhwan, un estudiante intimidado que huye al bosque con una escopeta, debe convertirse en cazador cuando una raza de monstruos biomecánicos invade el campamento.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-manager-kim',
    title: 'Manager Kim',
    author: 'Taejun Pak & Jeong Gwang-sik',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Acción / Fuerzas Especiales & Paternidad',
    totalPages: 10,
    year: 2021,
    description: 'El aparentemente ordinario oficinista Kim esconde un pasado como agente secreto de élite militar. Cuando su hija Minji desaparece secuestrada, desata una cacería implacable.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Manager Kim',
        'Taejun Pak & Jeong Gwang-sik',
        createDefaultMangaPanels(
          'Manager Kim',
          'Taejun Pak & Jeong Gwang-sik',
          'El aparentemente ordinario oficinista Kim esconde un pasado como agente secreto de élite militar. Cuando su hija Minji desaparece secuestrada, desata una cacería implacable.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-gosu',
    title: 'Gosu: El Maestro',
    author: 'Giun Ryu & Munjeong Mun',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Murim / Venganza y Dumplings',
    totalPages: 10,
    year: 2015,
    description: 'Gang Ryong entrena en las artes marciales más devastadoras para vengar a su maestro traicionado, solo para descubrir que todos los traidores ya han muerto de viejos.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Gosu: El Maestro',
        'Giun Ryu & Munjeong Mun',
        createDefaultMangaPanels(
          'Gosu: El Maestro',
          'Giun Ryu & Munjeong Mun',
          'Gang Ryong entrena en las artes marciales más devastadoras para vengar a su maestro traicionado, solo para descubrir que todos los traidores ya han muerto de viejos.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-leviathan',
    title: 'Leviathan (Deep Water)',
    author: 'Lee Gyuntak',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Postapocalíptico Marino / Monstruos Acuáticos',
    totalPages: 10,
    year: 2018,
    description: 'La Tierra se ha inundado por completo y la humanidad vive en barcos oxidados acechados por colosales bestias marinas. Bota y su hermana empuñan arpones para sobrevivir.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Leviathan (Deep Water)',
        'Lee Gyuntak',
        createDefaultMangaPanels(
          'Leviathan (Deep Water)',
          'Lee Gyuntak',
          'La Tierra se ha inundado por completo y la humanidad vive en barcos oxidados acechados por colosales bestias marinas. Bota y su hermana empuñan arpones para sobrevivir.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-player-cant-level-up',
    title: 'The Player that Can\'t Level Up',
    author: 'Gagah & Bang Eun-woo',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Mazmorras / Armas Egos',
    totalPages: 10,
    year: 2021,
    description: 'A pesar de cumplir los requisitos para ser cazador, Kim Gi-gyu permanece en nivel 1 durante cinco años, hasta que despierta la habilidad única de comunicarse con espadas vivientes.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Player that Can\'t Level Up',
        'Gagah & Bang Eun-woo',
        createDefaultMangaPanels(
          'The Player that Can\'t Level Up',
          'Gagah & Bang Eun-woo',
          'A pesar de cumplir los requisitos para ser cazador, Kim Gi-gyu permanece en nivel 1 durante cinco años, hasta que despierta la habilidad única de comunicarse con espadas vivientes.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-solo-bug-player',
    title: 'Solo Bug Player',
    author: 'Cheongcho',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Isekai / Señor Feudal & Glitches',
    totalPages: 10,
    year: 2020,
    description: 'Un jugador experto en aprovechar errores de programación en un videojuego reencarna como Jared, un señor feudal obeso en un territorio pobre al que salvará con bugs.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Solo Bug Player',
        'Cheongcho',
        createDefaultMangaPanels(
          'Solo Bug Player',
          'Cheongcho',
          'Un jugador experto en aprovechar errores de programación en un videojuego reencarna como Jared, un señor feudal obeso en un territorio pobre al que salvará con bugs.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-second-life-ranker',
    title: 'Second Life Ranker',
    author: 'Sadoyeon',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Mazmorras / Torre del Sol Negro',
    totalPages: 10,
    year: 2019,
    description: 'Yeon-woo descubre un reloj de bolsillo dejado por su hermano gemelo asesinado en el Obelisco, la Torre de los Dioses del Sol, y escala sus pisos para vengarlo.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Second Life Ranker',
        'Sadoyeon',
        createDefaultMangaPanels(
          'Second Life Ranker',
          'Sadoyeon',
          'Yeon-woo descubre un reloj de bolsillo dejado por su hermano gemelo asesinado en el Obelisco, la Torre de los Dioses del Sol, y escala sus pisos para vengarlo.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-murim-login',
    title: 'Murim Login',
    author: 'Zero-Big',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Fusión Murim & Hunters / Cápsula VR',
    totalPages: 10,
    year: 2020,
    description: 'Jin Tae-kyung es un cazador de rango bajo que encuentra una cápsula de realidad virtual que transporta su mente y cuerpo al salvaje mundo del Murim tradicional.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Murim Login',
        'Zero-Big',
        createDefaultMangaPanels(
          'Murim Login',
          'Zero-Big',
          'Jin Tae-kyung es un cazador de rango bajo que encuentra una cápsula de realidad virtual que transporta su mente y cuerpo al salvaje mundo del Murim tradicional.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-doom-breaker',
    title: 'Doom Breaker (Reincarnation of the Battle God)',
    author: 'Blue-Deep',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Fantasía Épica / Regresión Divina',
    totalPages: 10,
    year: 2021,
    description: 'Zephyr, el último humano en caer ante el dios de la destrucción Tartarus, recibe una segunda oportunidad de los dioses para regresar al pasado con todas sus habilidades.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Doom Breaker (Reincarnation of the Battle God)',
        'Blue-Deep',
        createDefaultMangaPanels(
          'Doom Breaker (Reincarnation of the Battle God)',
          'Blue-Deep',
          'Zephyr, el último humano en caer ante el dios de la destrucción Tartarus, recibe una segunda oportunidad de los dioses para regresar al pasado con todas sus habilidades.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-trash-count',
    title: 'Trash of the Count\'s Family',
    author: 'Yoo Ryeo Han',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Isekai / Vida Perezosa y Dragones',
    totalPages: 10,
    year: 2020,
    description: 'Kim Rok Soo despierta dentro de una novela como Cale Henituse, el hijo borracho e inútil del conde, pero sus intentos de vivir una vida tranquila solo atraen héroes y dragones.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Trash of the Count\'s Family',
        'Yoo Ryeo Han',
        createDefaultMangaPanels(
          'Trash of the Count\'s Family',
          'Yoo Ryeo Han',
          'Kim Rok Soo despierta dentro de una novela como Cale Henituse, el hijo borracho e inútil del conde, pero sus intentos de vivir una vida tranquila solo atraen héroes y dragones.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-greatest-estate-developer',
    title: 'The Greatest Estate Developer',
    author: 'BK_Moon & Kim Hyunsoo',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Comedia / Ingeniería Civil en Fantasía',
    totalPages: 10,
    year: 2021,
    description: 'Kim Su-ho, estudiante de ingeniería civil, reencarna como Lloyd Frontera, un noble arruinado, y decide salvar el feudo construyendo calefacciones, puentes y presas hidráulicas.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Greatest Estate Developer',
        'BK_Moon & Kim Hyunsoo',
        createDefaultMangaPanels(
          'The Greatest Estate Developer',
          'BK_Moon & Kim Hyunsoo',
          'Kim Su-ho, estudiante de ingeniería civil, reencarna como Lloyd Frontera, un noble arruinado, y decide salvar el feudo construyendo calefacciones, puentes y presas hidráulicas.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-pick-me-up',
    title: 'Pick Me Up, Infinite Gacha',
    author: 'Hermit & WASP',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Gacha / Héroe de 1 Estrella',
    totalPages: 10,
    year: 2022,
    description: 'Loki, el jugador número uno del juego de móvil gacha más difícil del mundo, es absorbido por el juego como Han Yslat, un personaje novato de una sola estrella condenado a morir.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Pick Me Up, Infinite Gacha',
        'Hermit & WASP',
        createDefaultMangaPanels(
          'Pick Me Up, Infinite Gacha',
          'Hermit & WASP',
          'Loki, el jugador número uno del juego de móvil gacha más difícil del mundo, es absorbido por el juego como Han Yslat, un personaje novato de una sola estrella condenado a morir.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-tyrant-tower-defense',
    title: 'Tyrant of the Tower Defense Game',
    author: 'Ryu Eun-garam',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Defensa de Torres / Estrategia Brutal',
    totalPages: 10,
    year: 2022,
    description: 'Un jugador hardcore supera en dificultad pesadilla un juego de estrategia y reencarna como el príncipe Ash en la fortaleza de Crossroad defendiéndose de hordas infinitas.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Tyrant of the Tower Defense Game',
        'Ryu Eun-garam',
        createDefaultMangaPanels(
          'Tyrant of the Tower Defense Game',
          'Ryu Eun-garam',
          'Un jugador hardcore supera en dificultad pesadilla un juego de estrategia y reencarna como el príncipe Ash en la fortaleza de Crossroad defendiéndose de hordas infinitas.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-damn-reincarnation',
    title: 'Damn Reincarnation',
    author: 'Mogins',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Reencarnación / El Guerrero Eugene',
    totalPages: 10,
    year: 2022,
    description: 'Hamel cayó en la guarida de los reyes demonio protegiendo a su amigo Vermouth. Trescientos años después, reencarna como descendiente de su propio camarada.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Damn Reincarnation',
        'Mogins',
        createDefaultMangaPanels(
          'Damn Reincarnation',
          'Mogins',
          'Hamel cayó en la guarida de los reyes demonio protegiendo a su amigo Vermouth. Trescientos años después, reencarna como descendiente de su propio camarada.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-deadbeat-noble',
    title: 'Reformation of the Deadbeat Noble',
    author: 'Idol P',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Superación / La Espada del Esfuerzo',
    totalPages: 10,
    year: 2021,
    description: 'Airen Farreira, apodado el noble holgazán que dormía para escapar de sus traumas, sueña con un espadachín anónimo que blande su arma durante décadas e inicia su entrenamiento.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Reformation of the Deadbeat Noble',
        'Idol P',
        createDefaultMangaPanels(
          'Reformation of the Deadbeat Noble',
          'Idol P',
          'Airen Farreira, apodado el noble holgazán que dormía para escapar de sus traumas, sueña con un espadachín anónimo que blande su arma durante décadas e inicia su entrenamiento.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-infinite-leveling-murim',
    title: 'Infinite Leveling: Murim',
    author: 'Gonbung',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Murim / Misiones Diarias',
    totalPages: 10,
    year: 2021,
    description: 'Un soldado de infantería sin talento que murió miserablemente en el campo de batalla reencarna a sus 14 años con un sistema de misiones y entrenamiento infinito.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Infinite Leveling: Murim',
        'Gonbung',
        createDefaultMangaPanels(
          'Infinite Leveling: Murim',
          'Gonbung',
          'Un soldado de infantería sin talento que murió miserablemente en el campo de batalla reencarna a sus 14 años con un sistema de misiones y entrenamiento infinito.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-peerless-dad',
    title: 'Peerless Dad',
    author: 'Noh Kyungchan',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Murim / Padre Soltero & Artes Marciales',
    totalPages: 10,
    year: 2018,
    description: 'Noh Ga-jang es un artista marcial formidable que cree erróneamente que es débil y busca trabajo como guardia mercenario para criar con ternura a sus tres hijos trillizos.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Peerless Dad',
        'Noh Kyungchan',
        createDefaultMangaPanels(
          'Peerless Dad',
          'Noh Kyungchan',
          'Noh Ga-jang es un artista marcial formidable que cree erróneamente que es débil y busca trabajo como guardia mercenario para criar con ternura a sus tres hijos trillizos.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-red-storm',
    title: 'Red Storm',
    author: 'Noh Kyungchan',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Desierto / Guerreros de la Tormenta Roja',
    totalPages: 10,
    year: 2012,
    description: 'Yulian Provoke, joven guerrero de la tribu Pareia en un vasto desierto, entrena con un misterioso maestro de otra dimensión para unificar las tierras áridas.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Red Storm',
        'Noh Kyungchan',
        createDefaultMangaPanels(
          'Red Storm',
          'Noh Kyungchan',
          'Yulian Provoke, joven guerrero de la tribu Pareia en un vasto desierto, entrena con un misterioso maestro de otra dimensión para unificar las tierras áridas.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-the-breaker',
    title: 'The Breaker',
    author: 'Jeon Geuk-jin & Park Jin-hwan',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Artes Marciales Modernas / Murim',
    totalPages: 10,
    year: 2007,
    description: 'Shi-Woon Yi, acosado a diario en la escuela, convence a su excéntrico profesor suplente Chun-Woo Han de entrenarlo en el secreto y letal mundo subterráneo del Murim.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Breaker',
        'Jeon Geuk-jin & Park Jin-hwan',
        createDefaultMangaPanels(
          'The Breaker',
          'Jeon Geuk-jin & Park Jin-hwan',
          'Shi-Woon Yi, acosado a diario en la escuela, convence a su excéntrico profesor suplente Chun-Woo Han de entrenarlo en el secreto y letal mundo subterráneo del Murim.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-the-breaker-new-waves',
    title: 'The Breaker: New Waves',
    author: 'Jeon Geuk-jin',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Secuela / El Heredero sin Centro de Qi',
    totalPages: 10,
    year: 2010,
    description: 'Con su centro de energía destruido, Shi-Woon debe asumir el liderazgo del clan Sun-Woo en medio de una guerra abierta entre facciones del Murim de Seúl.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Breaker: New Waves',
        'Jeon Geuk-jin',
        createDefaultMangaPanels(
          'The Breaker: New Waves',
          'Jeon Geuk-jin',
          'Con su centro de energía destruido, Shi-Woon debe asumir el liderazgo del clan Sun-Woo en medio de una guerra abierta entre facciones del Murim de Seúl.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-the-horizon',
    title: 'The Horizon',
    author: 'JH',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Drama Psicológico / Niños en la Guerra',
    totalPages: 10,
    year: 2016,
    description: 'Dos niños huérfanos caminan en silencio por una carretera interminable en medio de una guerra devastadora, buscando un horizonte de paz en una obra maestra de pura emoción.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Horizon',
        'JH',
        createDefaultMangaPanels(
          'The Horizon',
          'JH',
          'Dos niños huérfanos caminan en silencio por una carretera interminable en medio de una guerra devastadora, buscando un horizonte de paz en una obra maestra de pura emoción.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-i-shall-master-family',
    title: 'I Shall Master This Family (Lombardi)',
    author: 'Kim Roah',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Otome / Política Familiar y Negocios',
    totalPages: 10,
    year: 2021,
    description: 'Florentia reencarna por segunda vez en la familia noble Lombardi decidida a no dejar que sus incompetentes primos arruinen la casa, aspirando a ser la matriarca.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'I Shall Master This Family (Lombardi)',
        'Kim Roah',
        createDefaultMangaPanels(
          'I Shall Master This Family (Lombardi)',
          'Kim Roah',
          'Florentia reencarna por segunda vez en la familia noble Lombardi decidida a no dejar que sus incompetentes primos arruinen la casa, aspirando a ser la matriarca.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-father-dont-want-marriage',
    title: 'Father, I Don\'t Want This Marriage',
    author: 'Hong Heesu',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Romance / Malentendidos Nobles',
    totalPages: 10,
    year: 2021,
    description: 'Jubellian, creyendo que su frío padre duque planea casarla con el sanguinario príncipe heredero, contrata a un novio falso sin sospechar la verdadera identidad del príncipe.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Father, I Don\'t Want This Marriage',
        'Hong Heesu',
        createDefaultMangaPanels(
          'Father, I Don\'t Want This Marriage',
          'Hong Heesu',
          'Jubellian, creyendo que su frío padre duque planea casarla con el sanguinario príncipe heredero, contrata a un novio falso sin sospechar la verdadera identidad del príncipe.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-business-proposal',
    title: 'A Business Proposal',
    author: 'HaeHwa & Narak',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Comedia Romántica / Cita a Ciegas',
    totalPages: 10,
    year: 2018,
    description: 'Shin Ha-ri va a una cita a ciegas fingiendo ser su amiga rica para espantar al pretendiente, solo para descubrir que el hombre es Kang Tae-mu, el nuevo CEO de su empresa.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'A Business Proposal',
        'HaeHwa & Narak',
        createDefaultMangaPanels(
          'A Business Proposal',
          'HaeHwa & Narak',
          'Shin Ha-ri va a una cita a ciegas fingiendo ser su amiga rica para espantar al pretendiente, solo para descubrir que el hombre es Kang Tae-mu, el nuevo CEO de su empresa.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-secretary-kim',
    title: 'What\'s Wrong with Secretary Kim?',
    author: 'Jung Kyung-yoon',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Romance / El Narcisista y su Asistente',
    totalPages: 10,
    year: 2016,
    description: 'Tras nueve años de servicio impecable, la talentosa secretaria Kim Mi-so presenta su renuncia. Su jefe narcisista Lee Young-joon hará lo impensable para que no se marche.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'What\'s Wrong with Secretary Kim?',
        'Jung Kyung-yoon',
        createDefaultMangaPanels(
          'What\'s Wrong with Secretary Kim?',
          'Jung Kyung-yoon',
          'Tras nueve años de servicio impecable, la talentosa secretaria Kim Mi-so presenta su renuncia. Su jefe narcisista Lee Young-joon hará lo impensable para que no se marche.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-cheese-in-the-trap',
    title: 'Cheese in the Trap',
    author: 'Soonkki',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Misterio Romántico / Vida Universitaria',
    totalPages: 10,
    year: 2010,
    description: 'Hong Seol regresa a la universidad tras un receso y se cruza con Yoo Jung, el estudiante modelo perfecto cuya amable sonrisa parece esconder intenciones siniestras.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Cheese in the Trap',
        'Soonkki',
        createDefaultMangaPanels(
          'Cheese in the Trap',
          'Soonkki',
          'Hong Seol regresa a la universidad tras un receso y se cruza con Yoo Jung, el estudiante modelo perfecto cuya amable sonrisa parece esconder intenciones siniestras.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-unordinary',
    title: 'unOrdinary',
    author: 'uru-chan',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Superpoderes / Jerarquía y Venganza',
    totalPages: 10,
    year: 2016,
    description: 'En una escuela donde el estatus social se decide por el nivel de poder, John finge ser un chico sin habilidades ("Cripple"), guardando un secreto oscuro y temible.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'unOrdinary',
        'uru-chan',
        createDefaultMangaPanels(
          'unOrdinary',
          'uru-chan',
          'En una escuela donde el estatus social se decide por el nivel de poder, John finge ser un chico sin habilidades ("Cripple"), guardando un secreto oscuro y temible.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-purple-hyacinth',
    title: 'Purple Hyacinth',
    author: 'Ephemerys & Sophism',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Misterio Noir / Detector de Mentiras',
    totalPages: 10,
    year: 2019,
    description: 'Lauren Sinclair, una oficial de policía con la capacidad de detectar mentiras, forma una alianza secreta con Kieran White, el asesino más letal de la secta Fantasmas.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Purple Hyacinth',
        'Ephemerys & Sophism',
        createDefaultMangaPanels(
          'Purple Hyacinth',
          'Ephemerys & Sophism',
          'Lauren Sinclair, una oficial de policía con la capacidad de detectar mentiras, forma una alianza secreta con Kieran White, el asesino más letal de la secta Fantasmas.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-castle-swimmer',
    title: 'Castle Swimmer',
    author: 'Wendy Lian Martin',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Fantasía Submarina / Profecía de Amor',
    totalPages: 10,
    year: 2019,
    description: 'Kappa es el Faro destinado a guiar a las criaturas del mar hacia su salvación; Siren es el príncipe tiburón cuya profecía le exige sacrificar al Faro para liberar a su clan.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Castle Swimmer',
        'Wendy Lian Martin',
        createDefaultMangaPanels(
          'Castle Swimmer',
          'Wendy Lian Martin',
          'Kappa es el Faro destinado a guiar a las criaturas del mar hacia su salvación; Siren es el príncipe tiburón cuya profecía le exige sacrificar al Faro para liberar a su clan.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-the-gamer',
    title: 'The Gamer',
    author: 'Sung Sang-Young',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Habilidades RPG en la Vida Real',
    totalPages: 10,
    year: 2013,
    description: 'Han Jee-Han descubre que el mundo real tiene propiedades de videojuego donde él puede subir de nivel sus habilidades durmiendo o estudiando matemáticas.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Gamer',
        'Sung Sang-Young',
        createDefaultMangaPanels(
          'The Gamer',
          'Sung Sang-Young',
          'Han Jee-Han descubre que el mundo real tiene propiedades de videojuego donde él puede subir de nivel sus habilidades durmiendo o estudiando matemáticas.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-hooky',
    title: 'Hooky',
    author: 'Míriam Bonastre Tur',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Brujería / Hermandad & Aventura',
    totalPages: 10,
    year: 2015,
    description: 'Dani y Dorian pierden el autobús escolar hacia la academia de magia, desatando una encantadora y peligrosa aventura que los confrontará con una profecía siniestra.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Hooky',
        'Míriam Bonastre Tur',
        createDefaultMangaPanels(
          'Hooky',
          'Míriam Bonastre Tur',
          'Dani y Dorian pierden el autobús escolar hacia la academia de magia, desatando una encantadora y peligrosa aventura que los confrontará con una profecía siniestra.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-school-bus-graveyard',
    title: 'School Bus Graveyard',
    author: 'lilredbeany',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Terror / Dimensión Fantasma Nocturna',
    totalPages: 10,
    year: 2021,
    description: 'Un grupo de estudiantes de secundaria en Savannah queda maldito tras una excursión escolar: cada medianoche son transportados a una dimensión donde monstruos los cazan.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'School Bus Graveyard',
        'lilredbeany',
        createDefaultMangaPanels(
          'School Bus Graveyard',
          'lilredbeany',
          'Un grupo de estudiantes de secundaria en Savannah queda maldito tras una excursión escolar: cada medianoche son transportados a una dimensión donde monstruos los cazan.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-jungle-juice',
    title: 'Jungle Juice',
    author: 'Hyeong Eun & Juder',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Acción / Insectos y Genética',
    totalPages: 10,
    year: 2020,
    description: 'Jang Su-chan usa un insecticida misterioso y despierta con alas de libélula en su espalda, siendo reclutado en Nest, una universidad secreta para humanos con ADN de insecto.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Jungle Juice',
        'Hyeong Eun & Juder',
        createDefaultMangaPanels(
          'Jungle Juice',
          'Hyeong Eun & Juder',
          'Jang Su-chan usa un insecticida misterioso y despierta con alas de libélula en su espalda, siendo reclutado en Nest, una universidad secreta para humanos con ADN de insecto.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-get-schooled',
    title: 'Get Schooled (True Education)',
    author: 'Chae Yong-taek & Han Ga-ram',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Acción / Ministerio de Educación',
    totalPages: 10,
    year: 2020,
    description: 'Tras el colapso de la autoridad en las aulas, el gobierno crea la Oficina de Protección de Derechos Docentes con inspectores autorizados a utilizar fuerza correctiva.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Get Schooled (True Education)',
        'Chae Yong-taek & Han Ga-ram',
        createDefaultMangaPanels(
          'Get Schooled (True Education)',
          'Chae Yong-taek & Han Ga-ram',
          'Tras el colapso de la autoridad en las aulas, el gobierno crea la Oficina de Protección de Derechos Docentes con inspectores autorizados a utilizar fuerza correctiva.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-questism',
    title: 'Questism (Quest Supremacy)',
    author: 'YuNuni & PTJ',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Sistema RPG / Pandillas de Gangbuk',
    totalPages: 10,
    year: 2021,
    description: 'Suhyeon Kim es un estudiante debilucho que recibe una ventana de sistema que le otorga cartas de habilidades y misiones para conquistar las escuelas de Seúl.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Questism (Quest Supremacy)',
        'YuNuni & PTJ',
        createDefaultMangaPanels(
          'Questism (Quest Supremacy)',
          'YuNuni & PTJ',
          'Suhyeon Kim es un estudiante debilucho que recibe una ventana de sistema que le otorga cartas de habilidades y misiones para conquistar las escuelas de Seúl.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-study-group',
    title: 'Study Group',
    author: 'Shin Hyung-wook & Ryu Seung-yeon',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Artes Marciales / Bruce Lee Escolar',
    totalPages: 10,
    year: 2019,
    description: 'Gamin Yoon solo quiere ingresar a la universidad, pero asiste a la peor preparatoria del país. Para defender su grupo de estudio, emplea el temible Jeet Kune Do.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Study Group',
        'Shin Hyung-wook & Ryu Seung-yeon',
        createDefaultMangaPanels(
          'Study Group',
          'Shin Hyung-wook & Ryu Seung-yeon',
          'Gamin Yoon solo quiere ingresar a la universidad, pero asiste a la peor preparatoria del país. Para defender su grupo de estudio, emplea el temible Jeet Kune Do.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-to-not-die',
    title: 'To Not Die',
    author: 'Parae & Lim Jin-hwan',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Acción Urbana / Jóvenes Fugitivos',
    totalPages: 10,
    year: 2021,
    description: 'Dajun Im decide poner fin a su sufrimiento tras meses de acoso, pero en el último momento jura vivir para destruirlos a todos, uniéndose a una familia de chicos de la calle.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'To Not Die',
        'Parae & Lim Jin-hwan',
        createDefaultMangaPanels(
          'To Not Die',
          'Parae & Lim Jin-hwan',
          'Dajun Im decide poner fin a su sufrimiento tras meses de acoso, pero en el último momento jura vivir para destruirlos a todos, uniéndose a una familia de chicos de la calle.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-designated-bully',
    title: 'Designated Bully (The Bully In Charge)',
    author: 'Grimzo',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Peleas / Pacificador Escolar',
    totalPages: 10,
    year: 2022,
    description: 'Daegun Kwon, un joven legendario en el bajo mundo escolar, es contratado por una fundación para ingresar a la secundaria Daemyung y dominar a los abusadores.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Designated Bully (The Bully In Charge)',
        'Grimzo',
        createDefaultMangaPanels(
          'Designated Bully (The Bully In Charge)',
          'Grimzo',
          'Daegun Kwon, un joven legendario en el bajo mundo escolar, es contratado por una fundación para ingresar a la secundaria Daemyung y dominar a los abusadores.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-rooftop-sword-master',
    title: 'Rooftop Sword Master',
    author: 'Kim Min-seok',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Venganza Extrema / La Espada Gigante',
    totalPages: 10,
    year: 2020,
    description: 'Tras quedar en coma por una golpiza de hijos de magnates corruptos, Koo Se-kwang despierta cuando una gigantesca espada cae del cielo en su azotea otorgándole fuerza colosal.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Rooftop Sword Master',
        'Kim Min-seok',
        createDefaultMangaPanels(
          'Rooftop Sword Master',
          'Kim Min-seok',
          'Tras quedar en coma por una golpiza de hijos de magnates corruptos, Koo Se-kwang despierta cuando una gigantesca espada cae del cielo en su azotea otorgándole fuerza colosal.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-leveling-with-gods',
    title: 'Leveling Up With the Gods',
    author: 'Black Ajin',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Regresión / Batalla contra Dioses Antiguos',
    totalPages: 10,
    year: 2021,
    description: 'Kim YuWon regresa en el tiempo tras la aniquilación de los dioses olímpicos por los Dioses Exteriores de Lovecraft para escalar la Torre más rápido que nadie.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Leveling Up With the Gods',
        'Black Ajin',
        createDefaultMangaPanels(
          'Leveling Up With the Gods',
          'Black Ajin',
          'Kim YuWon regresa en el tiempo tras la aniquilación de los dioses olímpicos por los Dioses Exteriores de Lovecraft para escalar la Torre más rápido que nadie.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-disaster-class-hero',
    title: 'Return of the Disaster-Class Hero',
    author: 'SAN.G',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Venganza / El Santo número 13',
    totalPages: 10,
    year: 2021,
    description: 'Lee Gun, el héroe más fuerte de la humanidad traicionado por los 12 santos en la Torre del Demonio, regresa veinte años después para cobrarse cada una de sus deudas.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Return of the Disaster-Class Hero',
        'SAN.G',
        createDefaultMangaPanels(
          'Return of the Disaster-Class Hero',
          'SAN.G',
          'Lee Gun, el héroe más fuerte de la humanidad traicionado por los 12 santos en la Torre del Demonio, regresa veinte años después para cobrarse cada una de sus deudas.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-archmage-4000-years',
    title: 'The Archmage Returns After 4000 Years',
    author: 'Barnacle',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Reencarnación / El Gran Mago Lucas',
    totalPages: 10,
    year: 2020,
    description: 'Lucas Traumen, el gran mago sellado durante cuatro milenios por los Semidioses, despierta en el débil cuerpo de Frey Blake, el peor estudiante de la academia mágica.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Archmage Returns After 4000 Years',
        'Barnacle',
        createDefaultMangaPanels(
          'The Archmage Returns After 4000 Years',
          'Barnacle',
          'Lucas Traumen, el gran mago sellado durante cuatro milenios por los Semidioses, despierta en el débil cuerpo de Frey Blake, el peor estudiante de la academia mágica.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-swordmasters-son',
    title: 'Swordmaster\'s Youngest Son',
    author: 'AZI',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Reencarnación / Clan Runcandel',
    totalPages: 10,
    year: 2022,
    description: 'Jin Runcandel, expulsado de su clan de espadachines por incompetente, firma un pacto con el dios de las sombras Solderet y retrocede en el tiempo para convertirse en patriarca.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Swordmaster\'s Youngest Son',
        'AZI',
        createDefaultMangaPanels(
          'Swordmaster\'s Youngest Son',
          'AZI',
          'Jin Runcandel, expulsado de su clan de espadachines por incompetente, firma un pacto con el dios de las sombras Solderet y retrocede en el tiempo para convertirse en patriarca.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-standard-reincarnation',
    title: 'Standard of Reincarnation',
    author: 'Kim Won-ho',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Artes Marciales / Familia Samion',
    totalPages: 10,
    year: 2022,
    description: 'Daven nació con un solo brazo en la más prestigiosa familia de espadachines y fue traicionado, pero reencarna 500 años después con dos brazos sanos y recuerdos intactos.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Standard of Reincarnation',
        'Kim Won-ho',
        createDefaultMangaPanels(
          'Standard of Reincarnation',
          'Kim Won-ho',
          'Daven nació con un solo brazo en la más prestigiosa familia de espadachines y fue traicionado, pero reencarna 500 años después con dos brazos sanos y recuerdos intactos.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-poison-dragon',
    title: 'Poison Dragon: Legend of an Asura',
    author: 'Jung Gwang-sik',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Murim / Venenos Médicos & Venganza',
    totalPages: 10,
    year: 2020,
    description: 'Jin Ja-gang es el único sobreviviente de la Secta de la Medicina del Dragón tras ser aniquilada. Absorbiendo venenos mortales en su cuerpo, renace como el Asura del Veneno.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Poison Dragon: Legend of an Asura',
        'Jung Gwang-sik',
        createDefaultMangaPanels(
          'Poison Dragon: Legend of an Asura',
          'Jung Gwang-sik',
          'Jin Ja-gang es el único sobreviviente de la Secta de la Medicina del Dragón tras ser aniquilada. Absorbiendo venenos mortales en su cuerpo, renace como el Asura del Veneno.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-lightning-degree',
    title: 'Lightning Degree (Master of Lightning)',
    author: 'Do-joon',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Murim / Entrenamiento del Rayo',
    totalPages: 10,
    year: 2020,
    description: 'Ryu-Yeon pierde a su padre y es adoptado por un maestro vagabundo que lo somete a un entrenamiento doméstico absurdo que sin saberlo lo vuelve invencible como el rayo.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Lightning Degree (Master of Lightning)',
        'Do-joon',
        createDefaultMangaPanels(
          'Lightning Degree (Master of Lightning)',
          'Do-joon',
          'Ryu-Yeon pierde a su padre y es adoptado por un maestro vagabundo que lo somete a un entrenamiento doméstico absurdo que sin saberlo lo vuelve invencible como el rayo.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-martial-peak',
    title: 'Martial Peak',
    author: 'Momo',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Cultivación / El Libro Negro',
    totalPages: 10,
    year: 2018,
    description: 'Yang Kai era un humilde limpiador en la Secta Lingxiao hasta que encuentra el misterioso Libro Negro Sin Letras que despierta su físico marcial divino.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Martial Peak',
        'Momo',
        createDefaultMangaPanels(
          'Martial Peak',
          'Momo',
          'Yang Kai era un humilde limpiador en la Secta Lingxiao hasta que encuentra el misterioso Libro Negro Sin Letras que despierta su físico marcial divino.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-tales-demons-gods',
    title: 'Tales of Demons and Gods',
    author: 'Mad Snail',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Cultivación / El Libro del Espíritu Demoníaco',
    totalPages: 10,
    year: 2015,
    description: 'Nie Li, el espiritista demoníaco más poderoso, muere en combate contra el Sabio Emperador y reencarna a sus 13 años en la Ciudad de la Gloria con todos sus recuerdos.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Tales of Demons and Gods',
        'Mad Snail',
        createDefaultMangaPanels(
          'Tales of Demons and Gods',
          'Mad Snail',
          'Nie Li, el espiritista demoníaco más poderoso, muere en combate contra el Sabio Emperador y reencarna a sus 13 años en la Ciudad de la Gloria con todos sus recuerdos.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-apotheosis',
    title: 'Apotheosis: Ascensión a Dios',
    author: 'Ranzhi',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Acción / El Cuerpo de Arma Divina',
    totalPages: 10,
    year: 2015,
    description: 'Luo Zheng pasa de ser el heredero traicionado a esclavo de entrenamiento, hasta que desbloquea una técnica prohibida que convierte los golpes de sus enemigos en poder puro.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Apotheosis: Ascensión a Dios',
        'Ranzhi',
        createDefaultMangaPanels(
          'Apotheosis: Ascensión a Dios',
          'Ranzhi',
          'Luo Zheng pasa de ser el heredero traicionado a esclavo de entrenamiento, hasta que desbloquea una técnica prohibida que convierte los golpes de sus enemigos en poder puro.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-battle-through-heavens',
    title: 'Battle Through the Heavens (Doupo Cangqiong)',
    author: 'Tian Can Tu Dou',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Alquimia / Fuego Celestial',
    totalPages: 10,
    year: 2012,
    description: 'Xiao Yan pierde todo su talento repentinamente cuando el espíritu de Yao Lao despierta en el anillo de su madre, guiándolo para dominar los Fuegos Celestiales.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Battle Through the Heavens (Doupo Cangqiong)',
        'Tian Can Tu Dou',
        createDefaultMangaPanels(
          'Battle Through the Heavens (Doupo Cangqiong)',
          'Tian Can Tu Dou',
          'Xiao Yan pierde todo su talento repentinamente cuando el espíritu de Yao Lao despierta en el anillo de su madre, guiándolo para dominar los Fuegos Celestiales.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-magic-emperor',
    title: 'Magic Emperor (The Servant is the Demon King)',
    author: 'Wuer Manhua',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Estrategia / El Emperador Demonio Zhuo Yifan',
    totalPages: 10,
    year: 2019,
    description: 'Zhuo Yifan, el Emperador Demonio traicionado por su discípulo, reencarna en el débil sirviente de la familia Luo y utiliza su fría astucia para gobernar el imperio.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Magic Emperor (The Servant is the Demon King)',
        'Wuer Manhua',
        createDefaultMangaPanels(
          'Magic Emperor (The Servant is the Demon King)',
          'Wuer Manhua',
          'Zhuo Yifan, el Emperador Demonio traicionado por su discípulo, reencarna en el débil sirviente de la familia Luo y utiliza su fría astucia para gobernar el imperio.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-release-that-witch',
    title: 'Release That Witch',
    author: 'Er Mu',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Isekai / Tecnología y Brujería Industrial',
    totalPages: 10,
    year: 2019,
    description: 'Chen Yan reencarna como Roland Wimbledon, un príncipe desterrado a una frontera nevada, y decide salvar a las brujas perseguidas para impulsar una revolución industrial mágica.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Release That Witch',
        'Er Mu',
        createDefaultMangaPanels(
          'Release That Witch',
          'Er Mu',
          'Chen Yan reencarna como Roland Wimbledon, un príncipe desterrado a una frontera nevada, y decide salvar a las brujas perseguidas para impulsar una revolución industrial mágica.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-i-am-fated-villain',
    title: 'I Am the Fated Villain',
    author: 'Tian Fu',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Antihéroe / El Villano del Destino',
    totalPages: 10,
    year: 2021,
    description: 'Gu Changge transmigra como el joven maestro de un clan sagrado del reino superior cuyo rol es aplastar a los supuestos elegidos del cielo y arrebatarles su suerte.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'I Am the Fated Villain',
        'Tian Fu',
        createDefaultMangaPanels(
          'I Am the Fated Villain',
          'Tian Fu',
          'Gu Changge transmigra como el joven maestro de un clan sagrado del reino superior cuyo rol es aplastar a los supuestos elegidos del cielo y arrebatarles su suerte.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-all-heavenly-dao',
    title: 'Top Tier Providence',
    author: 'I Love Tofu',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Comedia / Cultivo Pasivo en Solitario',
    totalPages: 10,
    year: 2022,
    description: 'Han Jue reencarna en un mundo de cultivación con un sistema que le permite subir de nivel evitando los conflictos y meditando en silencio en su cueva durante siglos.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Top Tier Providence',
        'I Love Tofu',
        createDefaultMangaPanels(
          'Top Tier Providence',
          'I Love Tofu',
          'Han Jue reencarna en un mundo de cultivación con un sistema que le permite subir de nivel evitando los conflictos y meditando en silencio en su cueva durante siglos.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-soul-land',
    title: 'Soul Land (Douluo Dalu)',
    author: 'Tang Jia San Shao',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Espíritus Marciales / Hierba Azul Plateada',
    totalPages: 10,
    year: 2011,
    description: 'Tang San, discípulo expulsado de la secta Tang que dominaba los venenos, renace en Douluo Dalu despertando el espíritu marcial de la Hierba Azul Plateada y el Martillo昊天.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Soul Land (Douluo Dalu)',
        'Tang Jia San Shao',
        createDefaultMangaPanels(
          'Soul Land (Douluo Dalu)',
          'Tang Jia San Shao',
          'Tang San, discípulo expulsado de la secta Tang que dominaba los venenos, renace en Douluo Dalu despertando el espíritu marcial de la Hierba Azul Plateada y el Martillo昊天.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-versatile-mage',
    title: 'Versatile Mage (Quanzhi Fashi)',
    author: 'Chaos',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Magia Urbana / Mago Dual',
    totalPages: 10,
    year: 2015,
    description: 'Mo Fan despierta en un mundo idéntico al suyo pero donde la ciencia ha sido reemplazada por la magia elemental, despertando los elementos Fuego y Rayo desde su primer examen.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Versatile Mage (Quanzhi Fashi)',
        'Chaos',
        createDefaultMangaPanels(
          'Versatile Mage (Quanzhi Fashi)',
          'Chaos',
          'Mo Fan despierta en un mundo idéntico al suyo pero donde la ciencia ha sido reemplazada por la magia elemental, despertando los elementos Fuego y Rayo desde su primer examen.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-star-martial-god',
    title: 'Star Martial God Technique',
    author: 'Mad Snail',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Artes Marciales Astrales / El Clan Qingyu',
    totalPages: 10,
    year: 2016,
    description: 'En un mundo de tres artes marciales, Ye Xinghe hereda la casi extinta Técnica Marcial de las Estrellas para salvar a su familia del exterminio a manos de la aristocracia.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Star Martial God Technique',
        'Mad Snail',
        createDefaultMangaPanels(
          'Star Martial God Technique',
          'Mad Snail',
          'En un mundo de tres artes marciales, Ye Xinghe hereda la casi extinta Técnica Marcial de las Estrellas para salvar a su familia del exterminio a manos de la aristocracia.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-chronicles-heavenly-demon',
    title: 'Chronicles of Heavenly Demon',
    author: 'Il-Hwang',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Murim / Lanza del Demonio Celestial',
    totalPages: 10,
    year: 2018,
    description: 'Woon-seong es ejecutado falsamente y reencarna como un niño novato en la Cueva de los Demonios, empuñando la lanza para vengar la muerte de su maestro del Monte Hua.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Chronicles of Heavenly Demon',
        'Il-Hwang',
        createDefaultMangaPanels(
          'Chronicles of Heavenly Demon',
          'Il-Hwang',
          'Woon-seong es ejecutado falsamente y reencarna como un niño novato en la Cueva de los Demonios, empuñando la lanza para vengar la muerte de su maestro del Monte Hua.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-reincarnated-assassin',
    title: 'Reincarnated as an Assassin',
    author: 'Geul Jangi',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Acción / El Heredero de la Espada',
    totalPages: 10,
    year: 2022,
    description: 'El perro de caza de la casa imperial es traicionado y asesinado tras completar su última misión, despertando como el hijo menor de la familia de asesinos más letal del continente.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Reincarnated as an Assassin',
        'Geul Jangi',
        createDefaultMangaPanels(
          'Reincarnated as an Assassin',
          'Geul Jangi',
          'El perro de caza de la casa imperial es traicionado y asesinado tras completar su última misión, despertando como el hijo menor de la familia de asesinos más letal del continente.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-wild-west-murim',
    title: 'Wild West Murim',
    author: 'Grimm',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Western & Murim / Pistolas y Espadas',
    totalPages: 10,
    year: 2022,
    description: 'En una frontera desértica donde los forajidos usan artes marciales y revólveres de seis tiros, un cazarrecompensas solitario imparte justicia con su katana y sombrero de ala ancha.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Wild West Murim',
        'Grimm',
        createDefaultMangaPanels(
          'Wild West Murim',
          'Grimm',
          'En una frontera desértica donde los forajidos usan artes marciales y revólveres de seis tiros, un cazarrecompensas solitario imparte justicia con su katana y sombrero de ala ancha.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-player-who-returned',
    title: 'The Player Who Returned After 10,000 Years',
    author: 'Butterfly Valley',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Demonios / El Monarca del Infierno',
    totalPages: 10,
    year: 2022,
    description: 'Kang Woo cayó al Infierno y devoró a millones de demonios hasta convertirse en el soberano indiscutible. Diez mil años después, logra regresar a la Tierra para comer comida coreana.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Player Who Returned After 10,000 Years',
        'Butterfly Valley',
        createDefaultMangaPanels(
          'The Player Who Returned After 10,000 Years',
          'Butterfly Valley',
          'Kang Woo cayó al Infierno y devoró a millones de demonios hasta convertirse en el soberano indiscutible. Diez mil años después, logra regresar a la Tierra para comer comida coreana.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-chronicles-martial-god',
    title: 'Chronicles of the Martial God’s Return',
    author: 'Myosu',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Murim / Padre Adoptivo Invencible',
    totalPages: 10,
    year: 2022,
    description: 'Dan Sa-yu despierta de mil años de cautiverio bajo una montaña y adopta a una pequeña niña huérfana llamada Somi, jurando proteger su infancia pacífica de cualquier secta.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Chronicles of the Martial God’s Return',
        'Myosu',
        createDefaultMangaPanels(
          'Chronicles of the Martial God’s Return',
          'Myosu',
          'Dan Sa-yu despierta de mil años de cautiverio bajo una montaña y adopta a una pequeña niña huérfana llamada Somi, jurando proteger su infancia pacífica de cualquier secta.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-murim-rpg-simulation',
    title: 'Murim RPG Simulation (Heavenly Demon Cult)',
    author: 'Gyo-jin & Park Hyung-jun',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Elecciones & Opciones Múltiples',
    totalPages: 10,
    year: 2022,
    description: 'Seol Hwi es un explorador novato del Culto Demoníaco que muere en su primera misión, pero el tiempo se detiene y una ventana con tres opciones de diálogo aparece frente a sus ojos.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Murim RPG Simulation (Heavenly Demon Cult)',
        'Gyo-jin & Park Hyung-jun',
        createDefaultMangaPanels(
          'Murim RPG Simulation (Heavenly Demon Cult)',
          'Gyo-jin & Park Hyung-jun',
          'Seol Hwi es un explorador novato del Culto Demoníaco que muere en su primera misión, pero el tiempo se detiene y una ventana con tres opciones de diálogo aparece frente a sus ojos.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-past-life-returner',
    title: 'Past Life Returner',
    author: 'Toika',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Finanzas & Cazadores / Regresión',
    totalPages: 10,
    year: 2022,
    description: 'Sun-hoo regresa al año 1997 con la memoria de las crisis financieras y la posterior invasión de monstruos, acumulando billones de dólares en Wall Street para preparar la defensa de la Tierra.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Past Life Returner',
        'Toika',
        createDefaultMangaPanels(
          'Past Life Returner',
          'Toika',
          'Sun-hoo regresa al año 1997 con la memoria de las crisis financieras y la posterior invasión de monstruos, acumulando billones de dólares en Wall Street para preparar la defensa de la Tierra.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-youngest-son-master',
    title: 'The Youngest Son of a Rich Family (Reborn Rich)',
    author: 'San Kyeong',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Reencarnación / Chaebol & Finanzas',
    totalPages: 10,
    year: 2022,
    description: 'Yoon Hyun-woo es asesinado tras encubrir los fraudes del Grupo Soonyang y despierta en 1987 en el cuerpo de Jin Do-jun, el nieto menor del fundador del conglomerado más rico de Corea.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Youngest Son of a Rich Family (Reborn Rich)',
        'San Kyeong',
        createDefaultMangaPanels(
          'The Youngest Son of a Rich Family (Reborn Rich)',
          'San Kyeong',
          'Yoon Hyun-woo es asesinado tras encubrir los fraudes del Grupo Soonyang y despierta en 1987 en el cuerpo de Jin Do-jun, el nieto menor del fundador del conglomerado más rico de Corea.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-novel-extra',
    title: 'The Novel\'s Extra',
    author: 'Jee Gab Song',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Isekai / El Personaje Secundario con Pistola',
    totalPages: 10,
    year: 2022,
    description: 'Kim Hajin es absorbido por su propia novela web inacabada, pero no como el protagonista ni el villano, sino como Chundong, un personaje de relleno que usa armas de fuego.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Novel\'s Extra',
        'Jee Gab Song',
        createDefaultMangaPanels(
          'The Novel\'s Extra',
          'Jee Gab Song',
          'Kim Hajin es absorbido por su propia novela web inacabada, pero no como el protagonista ni el villano, sino como Chundong, un personaje de relleno que usa armas de fuego.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-helmut-forsaken-child',
    title: 'Helmut: The Forsaken Child',
    author: 'Kim Eon',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Fantasía Oscura / Niño Lobo & Espadachín',
    totalPages: 10,
    year: 2022,
    description: 'Abandonado al nacer en el Bosque de las Bestias Demoniacas, Helmut es criado por bestias mágicas y un maestro espadachín errante antes de salir al mundo de los humanos.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Helmut: The Forsaken Child',
        'Kim Eon',
        createDefaultMangaPanels(
          'Helmut: The Forsaken Child',
          'Kim Eon',
          'Abandonado al nacer en el Bosque de las Bestias Demoniacas, Helmut es criado por bestias mágicas y un maestro espadachín errante antes de salir al mundo de los humanos.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-academys-undercover-professor',
    title: 'Academy\'s Undercover Professor',
    author: 'Sayren',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Misterio / Mago Fugitivo en la Academia',
    totalPages: 10,
    year: 2022,
    description: 'Gerrard, un fugitivo con múltiples identidades falsas, se ve forzado a suplantar al profesor Alexander en la prestigiosa Academia Seoren mientras oculta sus secretos de la Inquisición.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Academy\'s Undercover Professor',
        'Sayren',
        createDefaultMangaPanels(
          'Academy\'s Undercover Professor',
          'Sayren',
          'Gerrard, un fugitivo con múltiples identidades falsas, se ve forzado a suplantar al profesor Alexander en la prestigiosa Academia Seoren mientras oculta sus secretos de la Inquisición.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-drug-eating-genius-mage',
    title: 'Drug-Eating Genius Mage',
    author: 'Sal G',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Cyberpunk & Magia / El Hechicero Enfermo',
    totalPages: 10,
    year: 2022,
    description: 'Lenok despierta en la megaciudad cyberpunk de Balkis con un cuerpo frágil y adicto a medicamentos, pero con un intelecto y una comprensión mágica que desafían las leyes del mundo.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Drug-Eating Genius Mage',
        'Sal G',
        createDefaultMangaPanels(
          'Drug-Eating Genius Mage',
          'Sal G',
          'Lenok despierta en la megaciudad cyberpunk de Balkis con un cuerpo frágil y adicto a medicamentos, pero con un intelecto y una comprensión mágica que desafían las leyes del mundo.',
          'manhwa'
        )
      ),
  },
  {
    id: 'cat-the-live',
    title: 'The Live',
    author: 'Chae-Hoo',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Fantasía / Diario del Futuro & Resurrección',
    totalPages: 10,
    year: 2020,
    description: 'Kim Yun-jae pierde a su esposa e hija en un trágico accidente. Un día recibe un diario misterioso que predice el futuro y le promete reencontrarse con su familia si supera los desafíos del Mundo Paralelo.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANHWA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Live',
        'Chae-Hoo',
        createDefaultMangaPanels(
          'The Live',
          'Chae-Hoo',
          'Kim Yun-jae pierde a su esposa e hija en un trágico accidente. Un día recibe un diario misterioso que predice el futuro y le promete reencontrarse con su familia si supera los desafíos del Mundo Paralelo.',
          'manhwa'
        )
      ),
  },
];
