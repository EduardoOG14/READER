import type { CatalogItem } from './types';
import { generateMangaCbz, createDefaultMangaPanels } from './generators';

export const MANGAS_CATALOG: CatalogItem[] = [
  {
    id: 'cat-hunter-x-hunter',
    title: 'Hunter x Hunter',
    author: 'Yoshihiro Togashi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Aventura Estratégica',
    totalPages: 10,
    year: 1998,
    description: 'Gon Freecss descubre que su padre sigue vivo y es un legendario Cazador. Decide tomar el peligroso examen para encontrarlo junto a Killua, Kurapika y Leorio.',
    coverGradient: { from: '#064e3b', to: '#0f172a', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Hunter x Hunter',
        'Yoshihiro Togashi',
        createDefaultMangaPanels(
          'Hunter x Hunter',
          'Yoshihiro Togashi',
          'Gon Freecss descubre que su padre sigue vivo y es un legendario Cazador. Decide tomar el peligroso examen para encontrarlo junto a Killua, Kurapika y Leorio.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-berserk',
    title: 'Berserk',
    author: 'Kentaro Miura',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Fantasía Oscura / Seinen Épico',
    totalPages: 10,
    year: 1989,
    description: 'Guts, el Espadachín Negro, empuña su colosal espada Matadragones mientras busca venganza contra Griffith y los demonios de la Mano de Dios.',
    coverGradient: { from: '#450a0a', to: '#09090b', accent: '#dc2626' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Berserk',
        'Kentaro Miura',
        createDefaultMangaPanels(
          'Berserk',
          'Kentaro Miura',
          'Guts, el Espadachín Negro, empuña su colosal espada Matadragones mientras busca venganza contra Griffith y los demonios de la Mano de Dios.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-gintama',
    title: 'Gintama',
    author: 'Hideaki Sorachi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Comedia / Samuráis & Alienígenas',
    totalPages: 10,
    year: 2003,
    description: 'En un Japón feudal colonizado por extraterrestres Amanto, el samurái perezoso Gintoki Sakata dirige la agencia Todoterreno junto a Shinpachi y Kagura.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Gintama',
        'Hideaki Sorachi',
        createDefaultMangaPanels(
          'Gintama',
          'Hideaki Sorachi',
          'En un Japón feudal colonizado por extraterrestres Amanto, el samurái perezoso Gintoki Sakata dirige la agencia Todoterreno junto a Shinpachi y Kagura.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-gantz',
    title: 'Gantz',
    author: 'Hiroya Oku',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Ciencia Ficción / Supervivencia Extrema',
    totalPages: 10,
    year: 2000,
    description: 'Kei Kurono y Masaru Kato mueren en las vías del metro y despiertan en una habitación con una misteriosa esfera negra que los obliga a cazar alienígenas con armas letales.',
    coverGradient: { from: '#18181b', to: '#09090b', accent: '#71717a' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Gantz',
        'Hiroya Oku',
        createDefaultMangaPanels(
          'Gantz',
          'Hiroya Oku',
          'Kei Kurono y Masaru Kato mueren en las vías del metro y despiertan en una habitación con una misteriosa esfera negra que los obliga a cazar alienígenas con armas letales.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-made-in-abyss',
    title: 'Made in Abyss',
    author: 'Akihito Tsukushi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Aventura Oscura / Exploración del Abismo',
    totalPages: 10,
    year: 2012,
    description: 'Riko, una huérfana de Orth, desciende junto al robot Reg a las profundidades inexploradas del Abismo, un foso vertical colosal repleto de reliquias y maldiciones.',
    coverGradient: { from: '#451a03', to: '#18181b', accent: '#d97706' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Made in Abyss',
        'Akihito Tsukushi',
        createDefaultMangaPanels(
          'Made in Abyss',
          'Akihito Tsukushi',
          'Riko, una huérfana de Orth, desciende junto al robot Reg a las profundidades inexploradas del Abismo, un foso vertical colosal repleto de reliquias y maldiciones.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-promised-neverland',
    title: 'The Promised Neverland (Yakusoku no Neverland)',
    author: 'Kaiu Shirai & Posuka Demizu',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Suspense / Escape e Intelecto',
    totalPages: 10,
    year: 2016,
    description: 'Emma, Norman y Ray descubren que su idílico orfanato Grace Field House es en realidad una granja de carne humana para demonios y planean una huida perfecta.',
    coverGradient: { from: '#451a03', to: '#18181b', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Promised Neverland (Yakusoku no Neverland)',
        'Kaiu Shirai & Posuka Demizu',
        createDefaultMangaPanels(
          'The Promised Neverland (Yakusoku no Neverland)',
          'Kaiu Shirai & Posuka Demizu',
          'Emma, Norman y Ray descubren que su idílico orfanato Grace Field House es en realidad una granja de carne humana para demonios y planean una huida perfecta.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-solanin',
    title: 'Solanin',
    author: 'Inio Asano',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Slice of Life / Música & Juventud',
    totalPages: 10,
    year: 2005,
    description: 'Meiko renuncia a su aburrido trabajo de oficina para apoyar a su novio Taneda y a su banda de rock indie en Tokio en busca de un futuro que no los marchite.',
    coverGradient: { from: '#1e293b', to: '#0f172a', accent: '#64748b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Solanin',
        'Inio Asano',
        createDefaultMangaPanels(
          'Solanin',
          'Inio Asano',
          'Meiko renuncia a su aburrido trabajo de oficina para apoyar a su novio Taneda y a su banda de rock indie en Tokio en busca de un futuro que no los marchite.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-oshi-no-ko',
    title: 'Oshi no Ko',
    author: 'Aka Akasaka & Mengo Yokoyari',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Idols & Venganza',
    totalPages: 10,
    year: 2020,
    description: 'Un médico y una paciente fallecida reencarnan como los hijos gemelos de su idol favorita Ai Hoshino, descubriendo la oscura y despiadada realidad del mundo del espectáculo.',
    coverGradient: { from: '#500724', to: '#18181b', accent: '#f43f5e' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Oshi no Ko',
        'Aka Akasaka & Mengo Yokoyari',
        createDefaultMangaPanels(
          'Oshi no Ko',
          'Aka Akasaka & Mengo Yokoyari',
          'Un médico y una paciente fallecida reencarnan como los hijos gemelos de su idol favorita Ai Hoshino, descubriendo la oscura y despiadada realidad del mundo del espectáculo.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-trigun',
    title: 'Trigun',
    author: 'Yasuhiro Nightow',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Space Western / El Tifón Humanoide',
    totalPages: 10,
    year: 1995,
    description: 'Vash la Estampida tiene una recompensa de 60 mil millones de doblones dobles sobre su cabeza, pero en realidad es un pacifista que empuña su revólver para salvar vidas.',
    coverGradient: { from: '#451a03', to: '#18181b', accent: '#ea580c' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Trigun',
        'Yasuhiro Nightow',
        createDefaultMangaPanels(
          'Trigun',
          'Yasuhiro Nightow',
          'Vash la Estampida tiene una recompensa de 60 mil millones de doblones dobles sobre su cabeza, pero en realidad es un pacifista que empuña su revólver para salvar vidas.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-horimiya',
    title: 'Horimiya',
    author: 'HERO & Daisuke Hagiwara',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Romance Escolar / Vidas Secretas',
    totalPages: 10,
    year: 2011,
    description: 'La popular Hori y el tímido Miyamura descubren por accidente sus facetas privadas fuera de la escuela, forjando una tierna complicidad que florece en amor.',
    coverGradient: { from: '#4c0519', to: '#1c1917', accent: '#fb7185' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Horimiya',
        'HERO & Daisuke Hagiwara',
        createDefaultMangaPanels(
          'Horimiya',
          'HERO & Daisuke Hagiwara',
          'La popular Hori y el tímido Miyamura descubren por accidente sus facetas privadas fuera de la escuela, forjando una tierna complicidad que florece en amor.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-xxxholic',
    title: 'xxxHOLiC',
    author: 'CLAMP',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Sobrenatural / Destino & Consecuencias',
    totalPages: 10,
    year: 2003,
    description: 'Kimihiro Watanuki, atormentado por espíritus, trabaja como sirviente en la tienda de deseos de la enigmática bruja dimensional Yūko Ichihara para librarse de su don.',
    coverGradient: { from: '#3b0764', to: '#0f172a', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'xxxHOLiC',
        'CLAMP',
        createDefaultMangaPanels(
          'xxxHOLiC',
          'CLAMP',
          'Kimihiro Watanuki, atormentado por espíritus, trabaja como sirviente en la tienda de deseos de la enigmática bruja dimensional Yūko Ichihara para librarse de su don.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-drifters',
    title: 'Drifters',
    author: 'Kouta Hirano',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Fantasía Bélica / Guerreros Históricos',
    totalPages: 10,
    year: 2009,
    description: 'Grandes héroes y estrategas de la historia humana son transportados al borde de la muerte a un mundo fantástico para librar una guerra total contra los Ends.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Drifters',
        'Kouta Hirano',
        createDefaultMangaPanels(
          'Drifters',
          'Kouta Hirano',
          'Grandes héroes y estrategas de la historia humana son transportados al borde de la muerte a un mundo fantástico para librar una guerra total contra los Ends.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-saint-seiya-lost-canvas',
    title: 'Saint Seiya: The Lost Canvas',
    author: 'Shiori Teshirogi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Mitología / Guerra Santa del Siglo XVIII',
    totalPages: 10,
    year: 2006,
    description: 'Tenma de Pegaso y Alone, la reencarnación de Hades, ven rota su fraternal amistad de la infancia en la devastadora Guerra Santa contra el Santuario.',
    coverGradient: { from: '#422006', to: '#0f172a', accent: '#eab308' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Saint Seiya: The Lost Canvas',
        'Shiori Teshirogi',
        createDefaultMangaPanels(
          'Saint Seiya: The Lost Canvas',
          'Shiori Teshirogi',
          'Tenma de Pegaso y Alone, la reencarnación de Hades, ven rota su fraternal amistad de la infancia en la devastadora Guerra Santa contra el Santuario.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-kimetsu-no-yaiba',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    author: 'Koyoharu Gotouge',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Cazadores de Demonios & Espadas',
    totalPages: 10,
    year: 2016,
    description: 'Tanjiro Kamado se une al Cuerpo de Exterminio de Demonios para devolverle la humanidad a su hermana Nezuko y vengar a su familia masacrada.',
    coverGradient: { from: '#1e3a5f', to: '#064e3b', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Demon Slayer: Kimetsu no Yaiba',
        'Koyoharu Gotouge',
        createDefaultMangaPanels(
          'Demon Slayer: Kimetsu no Yaiba',
          'Koyoharu Gotouge',
          'Tanjiro Kamado se une al Cuerpo de Exterminio de Demonios para devolverle la humanidad a su hermana Nezuko y vengar a su familia masacrada.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-tokyo-ghoul-re',
    title: 'Tokyo Ghoul:re',
    author: 'Sui Ishida',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Ghouls & Misterio Psicológico',
    totalPages: 10,
    year: 2014,
    description: 'Dos años después de los eventos de Anteiku, Haise Sasaki lidera el escuadrón Quinx del CCG mientras lucha por descubrir quién fue en su vida pasada.',
    coverGradient: { from: '#18181b', to: '#450a0a', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Tokyo Ghoul:re',
        'Sui Ishida',
        createDefaultMangaPanels(
          'Tokyo Ghoul:re',
          'Sui Ishida',
          'Dos años después de los eventos de Anteiku, Haise Sasaki lidera el escuadrón Quinx del CCG mientras lucha por descubrir quién fue en su vida pasada.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-sun-ken-rock',
    title: 'Sun-Ken Rock',
    author: 'Boichi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Acción & Mafia Coreana',
    totalPages: 10,
    year: 2006,
    description: 'Ken viaja a Seúl siguiendo a la chica que ama y, tras una serie de incidentes callejeros, termina convirtiéndose en el líder de una poderosa banda mafiosa.',
    coverGradient: { from: '#451a03', to: '#09090b', accent: '#f97316' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Sun-Ken Rock',
        'Boichi',
        createDefaultMangaPanels(
          'Sun-Ken Rock',
          'Boichi',
          'Ken viaja a Seúl siguiendo a la chica que ama y, tras una serie de incidentes callejeros, termina convirtiéndose en el líder de una poderosa banda mafiosa.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-beelzebub',
    title: 'Beelzebub',
    author: 'Ryuhei Tamura',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Comedia & Delincuentes',
    totalPages: 10,
    year: 2009,
    description: 'Tatsumi Oga, el matón más temido del Instituto Ishiyama, es elegido para criar al hijo recién nacido del mismísimo Rey Demonio que destruirá la Tierra.',
    coverGradient: { from: '#064e3b', to: '#18181b', accent: '#22c55e' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Beelzebub',
        'Ryuhei Tamura',
        createDefaultMangaPanels(
          'Beelzebub',
          'Ryuhei Tamura',
          'Tatsumi Oga, el matón más temido del Instituto Ishiyama, es elegido para criar al hijo recién nacido del mismísimo Rey Demonio que destruirá la Tierra.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-shounen-no-abyss',
    title: 'Shounen no Abyss',
    author: 'Ryo Minenami',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Drama Psicológico & Misterio',
    totalPages: 10,
    year: 2020,
    description: 'Reiji Kurose vive atrapado en un pueblo rural asfixiante y sin futuro, hasta que un encuentro fortuito con una famosa idol cambia su destino para siempre.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Shounen no Abyss',
        'Ryo Minenami',
        createDefaultMangaPanels(
          'Shounen no Abyss',
          'Ryo Minenami',
          'Reiji Kurose vive atrapado en un pueblo rural asfixiante y sin futuro, hasta que un encuentro fortuito con una famosa idol cambia su destino para siempre.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-relife',
    title: 'ReLIFE',
    author: 'Yayoiso',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Webcomic / Romance & Segunda Oportunidad',
    totalPages: 10,
    year: 2014,
    description: 'Arata Kaizaki, un desempleado de 27 años, acepta participar en un experimento que le devuelve la apariencia de un joven de 17 para revivir su época de instituto.',
    coverGradient: { from: '#1e3a5f', to: '#0f172a', accent: '#38bdf8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'ReLIFE',
        'Yayoiso',
        createDefaultMangaPanels(
          'ReLIFE',
          'Yayoiso',
          'Arata Kaizaki, un desempleado de 27 años, acepta participar en un experimento que le devuelve la apariencia de un joven de 17 para revivir su época de instituto.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-youjo-senki',
    title: 'Youjo Senki (Saga of Tanya the Evil)',
    author: 'Carlo Zen / Chika Toujou',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Estrategia Militar & Fantasía Oscura',
    totalPages: 10,
    year: 2016,
    description: 'Un cínico hombre de negocios reencarna como Tanya Degurechaff, una niña soldado prodigio que asciende en las fuerzas armadas de un imperio en guerra mágica.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#dc2626' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Youjo Senki (Saga of Tanya the Evil)',
        'Carlo Zen / Chika Toujou',
        createDefaultMangaPanels(
          'Youjo Senki (Saga of Tanya the Evil)',
          'Carlo Zen / Chika Toujou',
          'Un cínico hombre de negocios reencarna como Tanya Degurechaff, una niña soldado prodigio que asciende en las fuerzas armadas de un imperio en guerra mágica.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-kimi-ni-todoke',
    title: 'Kimi ni Todoke',
    author: 'Karuho Shiina',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shojo / Romance Escolar & Crecimiento',
    totalPages: 10,
    year: 2005,
    description: 'Sawako Kuronuma, incomprendida por sus compañeros, ve su vida cambiar gracias a la cercanía de Kazehaya, el chico más amable y popular del aula.',
    coverGradient: { from: '#4c0519', to: '#1c1917', accent: '#fb7185' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Kimi ni Todoke',
        'Karuho Shiina',
        createDefaultMangaPanels(
          'Kimi ni Todoke',
          'Karuho Shiina',
          'Sawako Kuronuma, incomprendida por sus compañeros, ve su vida cambiar gracias a la cercanía de Kazehaya, el chico más amable y popular del aula.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-kimagure-orange-road',
    title: 'Kimagure Orange Road',
    author: 'Izumi Matsumoto',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Romance Clásico & Telequinesis',
    totalPages: 10,
    year: 1984,
    description: 'Kyosuke Kasuga y su familia con poderes sobrenaturales se mudan a una nueva ciudad, donde vivirá un legendario triángulo amoroso con Madoka y Hikaru.',
    coverGradient: { from: '#431407', to: '#18181b', accent: '#f97316' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Kimagure Orange Road',
        'Izumi Matsumoto',
        createDefaultMangaPanels(
          'Kimagure Orange Road',
          'Izumi Matsumoto',
          'Kyosuke Kasuga y su familia con poderes sobrenaturales se mudan a una nueva ciudad, donde vivirá un legendario triángulo amoroso con Madoka y Hikaru.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-chobits',
    title: 'Chobits',
    author: 'CLAMP',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Ciencia Ficción & Romance',
    totalPages: 10,
    year: 2000,
    description: 'Hideki encuentra abandonada en la basura a una computadora con forma de mujer llamada Chi, descubriendo un misterio que desafía la relación entre humanos e inteligencia artificial.',
    coverGradient: { from: '#3b0764', to: '#1c1917', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Chobits',
        'CLAMP',
        createDefaultMangaPanels(
          'Chobits',
          'CLAMP',
          'Hideki encuentra abandonada en la basura a una computadora con forma de mujer llamada Chi, descubriendo un misterio que desafía la relación entre humanos e inteligencia artificial.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-arifureta',
    title: 'Arifureta Shokugyou de Sekai Saikyou',
    author: 'Ryo Shirakome',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Isekai & Superación Oscura',
    totalPages: 10,
    year: 2016,
    description: 'Traicionado y arrojado a las profundidades de un calabozo letal, Hajime Nagumo devora criaturas monstruosas y renace con una fuerza y armamento imparables.',
    coverGradient: { from: '#09090b', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Arifureta Shokugyou de Sekai Saikyou',
        'Ryo Shirakome',
        createDefaultMangaPanels(
          'Arifureta Shokugyou de Sekai Saikyou',
          'Ryo Shirakome',
          'Traicionado y arrojado a las profundidades de un calabozo letal, Hajime Nagumo devora criaturas monstruosas y renace con una fuerza y armamento imparables.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-tsuki-ga-michibiku',
    title: 'Tsuki ga Michibiku Isekai Douchuu',
    author: 'Kei Azumi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Fantasía & Construcción de Reino',
    totalPages: 10,
    year: 2015,
    description: 'Invocado por una diosa que lo desprecia por su aspecto, Makoto Misumi es desterrado a una tierra baldía donde une fuerzas con dragones y monstruos para forjar su propia civilización.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Tsuki ga Michibiku Isekai Douchuu',
        'Kei Azumi',
        createDefaultMangaPanels(
          'Tsuki ga Michibiku Isekai Douchuu',
          'Kei Azumi',
          'Invocado por una diosa que lo desprecia por su aspecto, Makoto Misumi es desterrado a una tierra baldía donde une fuerzas con dragones y monstruos para forjar su propia civilización.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-all-you-need-is-kill',
    title: 'All You Need Is Kill',
    author: 'Hiroshi Sakurazaka / Takeshi Obata',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Ciencia Ficción & Bucle Temporal',
    totalPages: 10,
    year: 2014,
    description: 'Keiji Kiriya muere en su primera batalla contra invasores alienígenas, pero despierta atrapado en un bucle temporal que lo hace repetir el mismo día una y otra vez.',
    coverGradient: { from: '#450a0a', to: '#09090b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'All You Need Is Kill',
        'Hiroshi Sakurazaka / Takeshi Obata',
        createDefaultMangaPanels(
          'All You Need Is Kill',
          'Hiroshi Sakurazaka / Takeshi Obata',
          'Keiji Kiriya muere en su primera batalla contra invasores alienígenas, pero despierta atrapado en un bucle temporal que lo hace repetir el mismo día una y otra vez.',
          'manga'
        )
      ),
  },
];
