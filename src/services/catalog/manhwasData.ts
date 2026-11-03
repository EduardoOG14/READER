import type { CatalogItem } from './types';
import { generateMangaCbz, createDefaultMangaPanels } from './generators';

export const MANHWAS_CATALOG: CatalogItem[] = [
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
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
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
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
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
    id: 'cat-the-boxer',
    title: 'The Boxer',
    author: 'JH',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Deportes / Boxeo Psicológico',
    totalPages: 10,
    year: 2020,
    description: 'K, el entrenador de campeones mundiales, descubre a Yu, un huérfano con ojos vacíos pero con una percepción y reflejos divinos para el cuadrilátero.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
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
    id: 'cat-bastard',
    title: 'Bastard',
    author: 'Carnby Kim & Youngchan Hwang',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Thriller / Suspenso Psicológico',
    totalPages: 10,
    year: 2014,
    description: 'Jin Seon vive bajo el terror de su padre, un respetado hombre de negocios que es un asesino en serie. Cuando elige a la chica que le gusta como víctima, Jin se rebela.',
    coverGradient: { from: '#3b0764', to: '#18181b', accent: '#a855f7' },
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
    id: 'cat-god-of-highschool',
    title: 'The God of High School',
    author: 'Yongje Park',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Artes Marciales / Dioses & Mitología',
    totalPages: 10,
    year: 2011,
    description: 'Jin Mori participa en un torneo nacional de artes marciales mixtas donde el ganador verá cumplido cualquier deseo, descubriendo su origen divino como el Rey Mono.',
    coverGradient: { from: '#431407', to: '#18181b', accent: '#f97316' },
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
    id: 'cat-sweet-home',
    title: 'Sweet Home',
    author: 'Carnby Kim & Youngchan Hwang',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Terror / Monstruos de los Deseos',
    totalPages: 10,
    year: 2017,
    description: 'Cha Hyun-soo, un estudiante recluido tras perder a su familia, se atrinchera en su edificio de departamentos cuando los humanos comienzan a convertirse en monstruos.',
    coverGradient: { from: '#172554', to: '#09090b', accent: '#3b82f6' },
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
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
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
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
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
    id: 'cat-suicide-hunter',
    title: 'SSS-Class Suicide Hunter',
    author: 'Shin Noah',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Mazmorras / Regresión por Muerte',
    totalPages: 10,
    year: 2020,
    description: 'Kim Gong-ja obtiene la habilidad de copiar las técnicas de quien lo asesine al costo de morir, retrocediendo un día en el tiempo cada vez que pierde la vida.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
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
    id: 'cat-villains-destined',
    title: 'Villains Are Destined to Die',
    author: 'Gwon Gyeoeul & SUOL',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Otome Isekai / Romance & Supervivencia',
    totalPages: 10,
    year: 2020,
    description: 'Una chica reencarna como Penélope Eckhart, la villana adoptada de un juego otome de dificultad extrema donde cada mala respuesta termina en su muerte inmediata.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
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
    id: 'cat-who-made-me-princess',
    title: 'Who Made Me a Princess',
    author: 'Plutus & Spoon',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Reencarnación / Lazos de Familia',
    totalPages: 10,
    year: 2017,
    description: 'Athanasia reencarna como la princesa desdichada que será ejecutada por su propio padre, el tiránico emperador Claude, ideando un plan para sobrevivir ganándose su cariño.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
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
    id: 'cat-dice',
    title: 'DICE: El Cubo que lo Cambia Todo',
    author: 'Yun Hyunseok',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Sobrenatural / Dados Mágicos',
    totalPages: 10,
    year: 2013,
    description: 'Dongtae es un perdedor integral hasta que obtiene un dado azul que le permite alterar sus atributos físicos e intelectuales como si la vida real fuera un juego de rol.',
    coverGradient: { from: '#3b0764', to: '#18181b', accent: '#a855f7' },
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
    id: 'cat-manager-kim',
    title: 'Manager Kim',
    author: 'Taejun Pak & Jeong Gwang-sik',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Acción / Fuerzas Especiales & Paternidad',
    totalPages: 10,
    year: 2021,
    description: 'El aparentemente ordinario oficinista Kim esconde un pasado como agente secreto de élite militar. Cuando su hija Minji desaparece secuestrada, desata una cacería implacable.',
    coverGradient: { from: '#431407', to: '#18181b', accent: '#f97316' },
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
    id: 'cat-leviathan',
    title: 'Leviathan (Deep Water)',
    author: 'Lee Gyuntak',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Postapocalíptico Marino / Monstruos Acuáticos',
    totalPages: 10,
    year: 2018,
    description: 'La Tierra se ha inundado por completo y la humanidad vive en barcos oxidados acechados por colosales bestias marinas. Bota y su hermana empuñan arpones para sobrevivir.',
    coverGradient: { from: '#172554', to: '#09090b', accent: '#3b82f6' },
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
    id: 'cat-damn-reincarnation',
    title: 'Damn Reincarnation',
    author: 'Mogins',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Reencarnación / El Guerrero Eugene',
    totalPages: 10,
    year: 2022,
    description: 'Hamel cayó en la guarida de los reyes demonio protegiendo a su amigo Vermouth. Trescientos años después, reencarna como descendiente de su propio camarada.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
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
    id: 'cat-the-breaker',
    title: 'The Breaker',
    author: 'Jeon Geuk-jin & Park Jin-hwan',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Artes Marciales Modernas / Murim',
    totalPages: 10,
    year: 2007,
    description: 'Shi-Woon Yi, acosado a diario en la escuela, convence a su excéntrico profesor suplente Chun-Woo Han de entrenarlo en el secreto y letal mundo subterráneo del Murim.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
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
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
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
    id: 'cat-cheese-in-the-trap',
    title: 'Cheese in the Trap',
    author: 'Soonkki',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Misterio Romántico / Vida Universitaria',
    totalPages: 10,
    year: 2010,
    description: 'Hong Seol regresa a la universidad tras un receso y se cruza con Yoo Jung, el estudiante modelo perfecto cuya amable sonrisa parece esconder intenciones siniestras.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
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
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
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
    id: 'cat-castle-swimmer',
    title: 'Castle Swimmer',
    author: 'Wendy Lian Martin',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Fantasía Submarina / Profecía de Amor',
    totalPages: 10,
    year: 2019,
    description: 'Kappa es el Faro destinado a guiar a las criaturas del mar hacia su salvación; Siren es el príncipe tiburón cuya profecía le exige sacrificar al Faro para liberar a su clan.',
    coverGradient: { from: '#3b0764', to: '#18181b', accent: '#a855f7' },
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
    coverGradient: { from: '#431407', to: '#18181b', accent: '#f97316' },
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
    coverGradient: { from: '#172554', to: '#09090b', accent: '#3b82f6' },
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
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
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
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
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
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
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
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
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
    id: 'cat-martial-peak',
    title: 'Martial Peak',
    author: 'Momo',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Cultivación / El Libro Negro',
    totalPages: 10,
    year: 2018,
    description: 'Yang Kai era un humilde limpiador en la Secta Lingxiao hasta que encuentra el misterioso Libro Negro Sin Letras que despierta su físico marcial divino.',
    coverGradient: { from: '#3b0764', to: '#18181b', accent: '#a855f7' },
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
    coverGradient: { from: '#431407', to: '#18181b', accent: '#f97316' },
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
    coverGradient: { from: '#172554', to: '#09090b', accent: '#3b82f6' },
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
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
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
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
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
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
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
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
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
    id: 'cat-soul-land',
    title: 'Soul Land (Douluo Dalu)',
    author: 'Tang Jia San Shao',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Espíritus Marciales / Hierba Azul Plateada',
    totalPages: 10,
    year: 2011,
    description: 'Tang San, discípulo expulsado de la secta Tang que dominaba los venenos, renace en Douluo Dalu despertando el espíritu marcial de la Hierba Azul Plateada y el Martillo昊天.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
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
    coverGradient: { from: '#3b0764', to: '#18181b', accent: '#a855f7' },
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
    coverGradient: { from: '#431407', to: '#18181b', accent: '#f97316' },
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
    coverGradient: { from: '#172554', to: '#09090b', accent: '#3b82f6' },
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
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
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
    id: 'cat-the-live',
    title: 'The Live',
    author: 'Chae-Hoo',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Fantasía / Diario del Futuro & Resurrección',
    totalPages: 10,
    year: 2020,
    description: 'Kim Yun-jae pierde a su esposa e hija en un trágico accidente. Un día recibe un diario misterioso que predice el futuro y le promete reencontrarse con su familia si supera los desafíos del Mundo Paralelo.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
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
