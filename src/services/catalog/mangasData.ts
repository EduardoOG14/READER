import type { CatalogItem } from './types';
import { generateMangaCbz, createDefaultMangaPanels } from './generators';

export const MANGAS_CATALOG: CatalogItem[] = [
  {
    id: 'cat-one-piece',
    title: 'One Piece',
    author: 'Eiichiro Oda',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Aventura Pirata',
    totalPages: 10,
    year: 1997,
    description: 'Monkey D. Luffy y los Piratas de Sombrero de Paja navegan por el traicionero Grand Line en busca del legendario tesoro One Piece para convertirse en el Rey de los Piratas.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'One Piece',
        'Eiichiro Oda',
        createDefaultMangaPanels(
          'One Piece',
          'Eiichiro Oda',
          'Monkey D. Luffy y los Piratas de Sombrero de Paja navegan por el traicionero Grand Line en busca del legendario tesoro One Piece para convertirse en el Rey de los Piratas.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-dragon-ball',
    title: 'Dragon Ball',
    author: 'Akira Toriyama',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Artes Marciales',
    totalPages: 10,
    year: 1984,
    description: 'Son Goku, un niño ingenuo con cola de mono y fuerza sobrehumana, emprende la búsqueda de las siete Esferas del Dragón capaces de conceder cualquier deseo.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Dragon Ball',
        'Akira Toriyama',
        createDefaultMangaPanels(
          'Dragon Ball',
          'Akira Toriyama',
          'Son Goku, un niño ingenuo con cola de mono y fuerza sobrehumana, emprende la búsqueda de las siete Esferas del Dragón capaces de conceder cualquier deseo.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-naruto',
    title: 'Naruto',
    author: 'Masashi Kishimoto',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Ninjas & Superación',
    totalPages: 10,
    year: 1999,
    description: 'Naruto Uzumaki, un joven ninja marginado que alberga en su interior al temido Zorro de Nueve Colas, sueña con ganarse el respeto de todos y convertirse en Hokage.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Naruto',
        'Masashi Kishimoto',
        createDefaultMangaPanels(
          'Naruto',
          'Masashi Kishimoto',
          'Naruto Uzumaki, un joven ninja marginado que alberga en su interior al temido Zorro de Nueve Colas, sueña con ganarse el respeto de todos y convertirse en Hokage.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-bleach',
    title: 'Bleach',
    author: 'Tite Kubo',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Shinigamis & Espadas',
    totalPages: 10,
    year: 2001,
    description: 'Ichigo Kurosaki, un adolescente capaz de ver espíritus, recibe los poderes de una Segadora de Almas para proteger a su ciudad de los monstruosos Hollows.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Bleach',
        'Tite Kubo',
        createDefaultMangaPanels(
          'Bleach',
          'Tite Kubo',
          'Ichigo Kurosaki, un adolescente capaz de ver espíritus, recibe los poderes de una Segadora de Almas para proteger a su ciudad de los monstruosos Hollows.',
          'manga'
        )
      ),
  },
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
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
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
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
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
    id: 'cat-death-note',
    title: 'Death Note',
    author: 'Tsugumi Ohba & Takeshi Obata',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Thriller Psicológico / Sobrenatural',
    totalPages: 10,
    year: 2003,
    description: 'Light Yagami encuentra un cuaderno de muerte de un Shinigami y decide purgar el mundo de criminales bajo el alias Kira, desatando un duelo de intelectos contra L.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Death Note',
        'Tsugumi Ohba & Takeshi Obata',
        createDefaultMangaPanels(
          'Death Note',
          'Tsugumi Ohba & Takeshi Obata',
          'Light Yagami encuentra un cuaderno de muerte de un Shinigami y decide purgar el mundo de criminales bajo el alias Kira, desatando un duelo de intelectos contra L.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-shingeki',
    title: 'Ataque a los Titanes',
    author: 'Hajime Isayama',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen Oscuro / Acción & Misterio',
    totalPages: 10,
    year: 2009,
    description: 'La humanidad vive recluida tras tres colosales murallas para protegerse de los Titanes devoradores de hombres. Eren Yeager jura exterminar a cada uno de ellos.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Ataque a los Titanes',
        'Hajime Isayama',
        createDefaultMangaPanels(
          'Ataque a los Titanes',
          'Hajime Isayama',
          'La humanidad vive recluida tras tres colosales murallas para protegerse de los Titanes devoradores de hombres. Eren Yeager jura exterminar a cada uno de ellos.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-kimetsu',
    title: 'Kimetsu no Yaiba: Demon Slayer',
    author: 'Koyoharu Gotouge',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Cazadores de Demonios',
    totalPages: 10,
    year: 2016,
    description: 'Tanjiro Kamado se une al Cuerpo de Cazadores de Demonios para encontrar una cura para su hermana Nezuko, convertida en demonio tras la masacre de su familia.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Kimetsu no Yaiba: Demon Slayer',
        'Koyoharu Gotouge',
        createDefaultMangaPanels(
          'Kimetsu no Yaiba: Demon Slayer',
          'Koyoharu Gotouge',
          'Tanjiro Kamado se une al Cuerpo de Cazadores de Demonios para encontrar una cura para su hermana Nezuko, convertida en demonio tras la masacre de su familia.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    author: 'Gege Akutami',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Hechicería & Maldiciones',
    totalPages: 10,
    year: 2018,
    description: 'Yuji Itadori se traga un dedo maldito del Rey de las Maldiciones, Ryomen Sukuna, ingresando a la Escuela Técnica de Hechicería de Tokio.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Jujutsu Kaisen',
        'Gege Akutami',
        createDefaultMangaPanels(
          'Jujutsu Kaisen',
          'Gege Akutami',
          'Yuji Itadori se traga un dedo maldito del Rey de las Maldiciones, Ryomen Sukuna, ingresando a la Escuela Técnica de Hechicería de Tokio.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-chainsaw-man',
    title: 'Chainsaw Man',
    author: 'Tatsuki Fujimoto',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Acción / Fantasía Oscura & Gore',
    totalPages: 10,
    year: 2018,
    description: 'Denji vive en la miseria cazando demonios junto a su perro motosierra Pochita. Tras una traición, renace como el Demonio Motosierra al servicio de Seguridad Pública.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Chainsaw Man',
        'Tatsuki Fujimoto',
        createDefaultMangaPanels(
          'Chainsaw Man',
          'Tatsuki Fujimoto',
          'Denji vive en la miseria cazando demonios junto a su perro motosierra Pochita. Tras una traición, renace como el Demonio Motosierra al servicio de Seguridad Pública.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-tokyo-ghoul',
    title: 'Tokyo Ghoul',
    author: 'Sui Ishida',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Fantasía Oscura / Seinen',
    totalPages: 10,
    year: 2011,
    description: 'En Tokio acechan los ghouls, seres que subsisten de carne humana. Ken Kaneki sufre un trasplante que lo transforma en el primer ghoul de un solo ojo.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Tokyo Ghoul',
        'Sui Ishida',
        createDefaultMangaPanels(
          'Tokyo Ghoul',
          'Sui Ishida',
          'En Tokio acechan los ghouls, seres que subsisten de carne humana. Ken Kaneki sufre un trasplante que lo transforma en el primer ghoul de un solo ojo.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-fullmetal',
    title: 'Fullmetal Alchemist',
    author: 'Hiromu Arakawa',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Aventura & Alquimia',
    totalPages: 10,
    year: 2001,
    description: 'La regla del Intercambio Equivalente guía a los hermanos Edward y Alphonse Elric en la búsqueda de la legendaria Piedra Filosofal para restaurar sus cuerpos.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Fullmetal Alchemist',
        'Hiromu Arakawa',
        createDefaultMangaPanels(
          'Fullmetal Alchemist',
          'Hiromu Arakawa',
          'La regla del Intercambio Equivalente guía a los hermanos Edward y Alphonse Elric en la búsqueda de la legendaria Piedra Filosofal para restaurar sus cuerpos.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-vagabond',
    title: 'Vagabond',
    author: 'Takehiko Inoue',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Histórico / Samurái & Filosofía',
    totalPages: 10,
    year: 1998,
    description: 'Basado en la vida de Miyamoto Musashi. El viaje espiritual y sangriento de un guerrero que busca convertirse en invencible bajo el cielo.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Vagabond',
        'Takehiko Inoue',
        createDefaultMangaPanels(
          'Vagabond',
          'Takehiko Inoue',
          'Basado en la vida de Miyamoto Musashi. El viaje espiritual y sangriento de un guerrero que busca convertirse en invencible bajo el cielo.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-vinland',
    title: 'Vinland Saga',
    author: 'Makoto Yukimura',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Histórico / Vikingos & Drama',
    totalPages: 10,
    year: 2005,
    description: 'Thorfinn, hijo del guerrero más temido de Islandia, crece en el campo de batalla jurando venganza contra Askeladd, mientras sueña con la pacífica tierra de Vinland.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Vinland Saga',
        'Makoto Yukimura',
        createDefaultMangaPanels(
          'Vinland Saga',
          'Makoto Yukimura',
          'Thorfinn, hijo del guerrero más temido de Islandia, crece en el campo de batalla jurando venganza contra Askeladd, mientras sueña con la pacífica tierra de Vinland.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-spy-family',
    title: 'Spy x Family',
    author: 'Tatsuya Endo',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Comedia / Espías & Acción',
    totalPages: 10,
    year: 2019,
    description: 'Un espía de élite, una asesina letal y una niña telépata forman una divertida familia falsa sin conocer sus verdaderas identidades para salvar la paz mundial.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Spy x Family',
        'Tatsuya Endo',
        createDefaultMangaPanels(
          'Spy x Family',
          'Tatsuya Endo',
          'Un espía de élite, una asesina letal y una niña telépata forman una divertida familia falsa sin conocer sus verdaderas identidades para salvar la paz mundial.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-monster',
    title: 'Monster',
    author: 'Naoki Urasawa',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Thriller Psicológico',
    totalPages: 10,
    year: 1994,
    description: 'El cirujano Kenzō Tenma salva la vida de un niño huérfano que resulta ser un carismático y despiadado sociópata. Años después, Tenma viaja por Alemania para cazarlo.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Monster',
        'Naoki Urasawa',
        createDefaultMangaPanels(
          'Monster',
          'Naoki Urasawa',
          'El cirujano Kenzō Tenma salva la vida de un niño huérfano que resulta ser un carismático y despiadado sociópata. Años después, Tenma viaja por Alemania para cazarlo.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-20th-century-boys',
    title: '20th Century Boys',
    author: 'Naoki Urasawa',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Misterio / Ciencia Ficción & Conspiración',
    totalPages: 10,
    year: 1999,
    description: 'Kenji y sus amigos de la infancia descubren que una peligrosa secta liderada por "Amigo" está cumpliendo al pie de la letra un libro de profecías que ellos inventaron de niños.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        '20th Century Boys',
        'Naoki Urasawa',
        createDefaultMangaPanels(
          '20th Century Boys',
          'Naoki Urasawa',
          'Kenji y sus amigos de la infancia descubren que una peligrosa secta liderada por "Amigo" está cumpliendo al pie de la letra un libro de profecías que ellos inventaron de niños.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-pluto',
    title: 'Pluto',
    author: 'Naoki Urasawa & Osamu Tezuka',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Cyberpunk & Filosofía',
    totalPages: 10,
    year: 2003,
    description: 'El detective androide Gesicht investiga una serie de asesinatos de los robots más poderosos del planeta y de los defensores de los derechos de las máquinas.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Pluto',
        'Naoki Urasawa & Osamu Tezuka',
        createDefaultMangaPanels(
          'Pluto',
          'Naoki Urasawa & Osamu Tezuka',
          'El detective androide Gesicht investiga una serie de asesinatos de los robots más poderosos del planeta y de los defensores de los derechos de las máquinas.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-jojo-phantom',
    title: 'JoJo\'s Bizarre Adventure: Phantom Blood',
    author: 'Hirohiko Araki',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Sobrenatural / Vampiros & Hamon',
    totalPages: 10,
    year: 1987,
    description: 'Jonathan Joestar se enfrenta a su ambicioso hermano adoptivo Dio Brando, quien utiliza una misteriosa máscara de piedra azteca para transformarse en vampiro.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'JoJo\'s Bizarre Adventure: Phantom Blood',
        'Hirohiko Araki',
        createDefaultMangaPanels(
          'JoJo\'s Bizarre Adventure: Phantom Blood',
          'Hirohiko Araki',
          'Jonathan Joestar se enfrenta a su ambicioso hermano adoptivo Dio Brando, quien utiliza una misteriosa máscara de piedra azteca para transformarse en vampiro.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-jojo-stardust',
    title: 'JoJo\'s Bizarre Adventure: Stardust Crusaders',
    author: 'Hirohiko Araki',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Stands & Aventura Épica',
    totalPages: 10,
    year: 1989,
    description: 'Jotaro Kujo y su abuelo Joseph viajan de Japón a Egipto combatiendo usuarios de Stands enemigos para derrotar a DIO y salvar la vida de su madre.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'JoJo\'s Bizarre Adventure: Stardust Crusaders',
        'Hirohiko Araki',
        createDefaultMangaPanels(
          'JoJo\'s Bizarre Adventure: Stardust Crusaders',
          'Hirohiko Araki',
          'Jotaro Kujo y su abuelo Joseph viajan de Japón a Egipto combatiendo usuarios de Stands enemigos para derrotar a DIO y salvar la vida de su madre.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-my-hero-academia',
    title: 'My Hero Academia (Boku no Hero Academia)',
    author: 'Kohei Horikoshi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Superhéroes & Escolar',
    totalPages: 10,
    year: 2014,
    description: 'En un mundo donde el 80% posee superpoderes, Izuku Midoriya nace sin dones pero hereda el One For All del legendario héroe All Might.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'My Hero Academia (Boku no Hero Academia)',
        'Kohei Horikoshi',
        createDefaultMangaPanels(
          'My Hero Academia (Boku no Hero Academia)',
          'Kohei Horikoshi',
          'En un mundo donde el 80% posee superpoderes, Izuku Midoriya nace sin dones pero hereda el One For All del legendario héroe All Might.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-slam-dunk',
    title: 'Slam Dunk',
    author: 'Takehiko Inoue',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Deportes / Baloncesto & Pasión',
    totalPages: 10,
    year: 1990,
    description: 'El delincuente pelirrojo Hanamichi Sakuragi se une al equipo de baloncesto de la preparatoria Shohoku para impresionar a una chica, descubriendo su verdadera vocación.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Slam Dunk',
        'Takehiko Inoue',
        createDefaultMangaPanels(
          'Slam Dunk',
          'Takehiko Inoue',
          'El delincuente pelirrojo Hanamichi Sakuragi se une al equipo de baloncesto de la preparatoria Shohoku para impresionar a una chica, descubriendo su verdadera vocación.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-haikyuu',
    title: 'Haikyuu!!',
    author: 'Haruichi Furudate',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Deportes / Voleibol & Superación',
    totalPages: 10,
    year: 2012,
    description: 'Shoyo Hinata, a pesar de su corta estatura, salta más alto que nadie y forja una dupla imparable con el talentoso colocador Tobio Kageyama en Karasuno.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Haikyuu!!',
        'Haruichi Furudate',
        createDefaultMangaPanels(
          'Haikyuu!!',
          'Haruichi Furudate',
          'Shoyo Hinata, a pesar de su corta estatura, salta más alto que nadie y forja una dupla imparable con el talentoso colocador Tobio Kageyama en Karasuno.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-one-punch-man',
    title: 'One Punch Man',
    author: 'ONE & Yusuke Murata',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Parodia / Superhéroes & Acción Épica',
    totalPages: 10,
    year: 2012,
    description: 'Saitama entrenó tan duro que se quedó calvo y ahora es capaz de derrotar a cualquier enemigo monstruoso de un solo puñetazo, aburriéndose de la falta de desafíos.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'One Punch Man',
        'ONE & Yusuke Murata',
        createDefaultMangaPanels(
          'One Punch Man',
          'ONE & Yusuke Murata',
          'Saitama entrenó tan duro que se quedó calvo y ahora es capaz de derrotar a cualquier enemigo monstruoso de un solo puñetazo, aburriéndose de la falta de desafíos.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-mob-psycho',
    title: 'Mob Psycho 100',
    author: 'ONE',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Comedia Sobrenatural / Psíquicos',
    totalPages: 10,
    year: 2012,
    description: 'Shigeo Kageyama, apodado Mob, es un tímido estudiante de secundaria con inmensos poderes psíquicos que intenta reprimir sus emociones para no perder el control al 100%.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Mob Psycho 100',
        'ONE',
        createDefaultMangaPanels(
          'Mob Psycho 100',
          'ONE',
          'Shigeo Kageyama, apodado Mob, es un tímido estudiante de secundaria con inmensos poderes psíquicos que intenta reprimir sus emociones para no perder el control al 100%.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-black-clover',
    title: 'Black Clover',
    author: 'Yūki Tabata',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Magia & Antimagia',
    totalPages: 10,
    year: 2015,
    description: 'En el Reino del Trébol donde todos tienen magia, Asta nace sin una gota de poder, pero obtiene un grimorio de cinco hojas que alberga una espada de pura antimagia.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Black Clover',
        'Yūki Tabata',
        createDefaultMangaPanels(
          'Black Clover',
          'Yūki Tabata',
          'En el Reino del Trébol donde todos tienen magia, Asta nace sin una gota de poder, pero obtiene un grimorio de cinco hojas que alberga una espada de pura antimagia.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-fairy-tail',
    title: 'Fairy Tail',
    author: 'Hiro Mashima',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Magia & Amistad',
    totalPages: 10,
    year: 2006,
    description: 'Natsu Dragneel, un mago Dragon Slayer de fuego, y Lucy Heartfilia se unen al alborotado y cálido gremio de magos Fairy Tail para cumplir peligrosas misiones.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Fairy Tail',
        'Hiro Mashima',
        createDefaultMangaPanels(
          'Fairy Tail',
          'Hiro Mashima',
          'Natsu Dragneel, un mago Dragon Slayer de fuego, y Lucy Heartfilia se unen al alborotado y cálido gremio de magos Fairy Tail para cumplir peligrosas misiones.',
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
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
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
    id: 'cat-tokyo-revengers',
    title: 'Tokyo Revengers',
    author: 'Ken Wakui',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Pandillas / Viajes en el Tiempo',
    totalPages: 10,
    year: 2017,
    description: 'Takemichi Hanagaki descubre que puede viajar doce años al pasado y decide escalar en la pandilla Tokyo Manji Gang para evitar la muerte de su novia de secundaria.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Tokyo Revengers',
        'Ken Wakui',
        createDefaultMangaPanels(
          'Tokyo Revengers',
          'Ken Wakui',
          'Takemichi Hanagaki descubre que puede viajar doce años al pasado y decide escalar en la pandilla Tokyo Manji Gang para evitar la muerte de su novia de secundaria.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-blue-lock',
    title: 'Blue Lock',
    author: 'Muneyuki Kaneshiro & Yūsuke Nomura',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Deportes / Fútbol & Egoísmo Puro',
    totalPages: 10,
    year: 2018,
    description: 'Para ganar la Copa del Mundo, Japón encierra a 300 delanteros de secundaria en una prisión deportiva extrema donde solo el egoísta más implacable sobrevivirá.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Blue Lock',
        'Muneyuki Kaneshiro & Yūsuke Nomura',
        createDefaultMangaPanels(
          'Blue Lock',
          'Muneyuki Kaneshiro & Yūsuke Nomura',
          'Para ganar la Copa del Mundo, Japón encierra a 300 delanteros de secundaria en una prisión deportiva extrema donde solo el egoísta más implacable sobrevivirá.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-evangelion',
    title: 'Neon Genesis Evangelion',
    author: 'Yoshiyuki Sadamoto',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Mecha / Psicológico & Ángeles',
    totalPages: 10,
    year: 1994,
    description: 'Shinji Ikari es reclutado por su frío padre para pilotar el biomecánico Evangelion Unidad 01 y defender a Neo Tokio-3 de los enigmáticos Ángeles invasores.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Neon Genesis Evangelion',
        'Yoshiyuki Sadamoto',
        createDefaultMangaPanels(
          'Neon Genesis Evangelion',
          'Yoshiyuki Sadamoto',
          'Shinji Ikari es reclutado por su frío padre para pilotar el biomecánico Evangelion Unidad 01 y defender a Neo Tokio-3 de los enigmáticos Ángeles invasores.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-cowboy-bebop',
    title: 'Cowboy Bebop',
    author: 'Hajime Yatate & Yutaka Nanten',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Cyberpunk / Western Espacial',
    totalPages: 10,
    year: 1998,
    description: 'Las cacerías de recompensas de Spike Spiegel, Jet Black, Faye Valentine y Ed a bordo de la nave Bebop por todo el sistema solar.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Cowboy Bebop',
        'Hajime Yatate & Yutaka Nanten',
        createDefaultMangaPanels(
          'Cowboy Bebop',
          'Hajime Yatate & Yutaka Nanten',
          'Las cacerías de recompensas de Spike Spiegel, Jet Black, Faye Valentine y Ed a bordo de la nave Bebop por todo el sistema solar.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-akira',
    title: 'Akira',
    author: 'Katsuhiro Otomo',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Cyberpunk / Obra Maestra del Cómic',
    totalPages: 10,
    year: 1982,
    description: 'En la caótica Neo-Tokio tras la Tercera Guerra Mundial, Kaneda intenta salvar a su amigo Tetsuo, cuyos poderes telequinéticos recién despertados amenazan con destruir la ciudad.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Akira',
        'Katsuhiro Otomo',
        createDefaultMangaPanels(
          'Akira',
          'Katsuhiro Otomo',
          'En la caótica Neo-Tokio tras la Tercera Guerra Mundial, Kaneda intenta salvar a su amigo Tetsuo, cuyos poderes telequinéticos recién despertados amenazan con destruir la ciudad.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-ghost-in-the-shell',
    title: 'Ghost in the Shell (Patrulla Especial Ghost)',
    author: 'Masamune Shirow',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Cyberpunk / Conciencia & Cyborgs',
    totalPages: 10,
    year: 1989,
    description: 'La Mayor Motoko Kusanagi y la Sección 9 de Seguridad Pública persiguen al esquivo Titiritero en un futuro donde las almas humanas habitan cuerpos cibernéticos.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Ghost in the Shell (Patrulla Especial Ghost)',
        'Masamune Shirow',
        createDefaultMangaPanels(
          'Ghost in the Shell (Patrulla Especial Ghost)',
          'Masamune Shirow',
          'La Mayor Motoko Kusanagi y la Sección 9 de Seguridad Pública persiguen al esquivo Titiritero en un futuro donde las almas humanas habitan cuerpos cibernéticos.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-steins-gate',
    title: 'Steins;Gate',
    author: 'Yomi Sarachi & 5pb.',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Ciencia Ficción / Líneas Temporales',
    totalPages: 10,
    year: 2009,
    description: 'El científico loco autoproclamado Rintaro Okabe inventa por accidente un microondas que envía mensajes de texto al pasado, alterando el destino del mundo.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Steins;Gate',
        'Yomi Sarachi & 5pb.',
        createDefaultMangaPanels(
          'Steins;Gate',
          'Yomi Sarachi & 5pb.',
          'El científico loco autoproclamado Rintaro Okabe inventa por accidente un microondas que envía mensajes de texto al pasado, alterando el destino del mundo.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-claymore',
    title: 'Claymore',
    author: 'Norihiro Yagi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Fantasía Oscura / Guerreras Yoma',
    totalPages: 10,
    year: 2001,
    description: 'Clare, una guerrera de ojos plateados mitad humana y mitad demonio, empuña su espada Claymore para cazar monstruos mientras busca vengar a su salvadora Teresa.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Claymore',
        'Norihiro Yagi',
        createDefaultMangaPanels(
          'Claymore',
          'Norihiro Yagi',
          'Clare, una guerrera de ojos plateados mitad humana y mitad demonio, empuña su espada Claymore para cazar monstruos mientras busca vengar a su salvadora Teresa.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-hellsing',
    title: 'Hellsing',
    author: 'Kouta Hirano',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Acción Sobrenatural / Vampiros & Gore',
    totalPages: 10,
    year: 1997,
    description: 'La Orden de Caballeros Protestantes Reales Hellsing despliega a su arma suprema, el vampiro original Alucard, para destruir una conspiración nazi de no-muertos.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Hellsing',
        'Kouta Hirano',
        createDefaultMangaPanels(
          'Hellsing',
          'Kouta Hirano',
          'La Orden de Caballeros Protestantes Reales Hellsing despliega a su arma suprema, el vampiro original Alucard, para destruir una conspiración nazi de no-muertos.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-yu-yu-hakusho',
    title: 'Yu Yu Hakusho',
    author: 'Yoshihiro Togashi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Detectives Espirituales',
    totalPages: 10,
    year: 1990,
    description: 'Yusuke Urameshi muere al salvar a un niño de un atropello y resucita como Detective Espiritual del Mundo de los Espíritus para combatir demonios.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Yu Yu Hakusho',
        'Yoshihiro Togashi',
        createDefaultMangaPanels(
          'Yu Yu Hakusho',
          'Yoshihiro Togashi',
          'Yusuke Urameshi muere al salvar a un niño de un atropello y resucita como Detective Espiritual del Mundo de los Espíritus para combatir demonios.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-rurouni-kenshin',
    title: 'Rurouni Kenshin: El Guerrero Samurái',
    author: 'Nobuhiro Watsuki',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Histórico / Samuráis & Redención',
    totalPages: 10,
    year: 1994,
    description: 'Himura Kenshin, el temido asesino Battosai en la era Bakumatsu, empuña una espada de filo invertido jurando no volver a matar jamás para proteger a los inocentes.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Rurouni Kenshin: El Guerrero Samurái',
        'Nobuhiro Watsuki',
        createDefaultMangaPanels(
          'Rurouni Kenshin: El Guerrero Samurái',
          'Nobuhiro Watsuki',
          'Himura Kenshin, el temido asesino Battosai en la era Bakumatsu, empuña una espada de filo invertido jurando no volver a matar jamás para proteger a los inocentes.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-initial-d',
    title: 'Initial D',
    author: 'Shuichi Shigeno',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Automovilismo / Drift en las Montañas',
    totalPages: 10,
    year: 1995,
    description: 'Takumi Fujiwara conduce cada madrugada un viejo Toyota Sprinter Trueno AE86 para repartir tofu en el monte Akina, convirtiéndose en el rey imbatible del derrape.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Initial D',
        'Shuichi Shigeno',
        createDefaultMangaPanels(
          'Initial D',
          'Shuichi Shigeno',
          'Takumi Fujiwara conduce cada madrugada un viejo Toyota Sprinter Trueno AE86 para repartir tofu en el monte Akina, convirtiéndose en el rey imbatible del derrape.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-uzumaki',
    title: 'Uzumaki: La Espiral',
    author: 'Junji Ito',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Terror Psicológico / Obra Maestra',
    totalPages: 10,
    year: 1998,
    description: 'El pueblo costero de Kurouzu-cho cae bajo la maldición de la espiral: una forma geométrica obsesiva que deforma los cuerpos y las mentes de sus habitantes.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Uzumaki: La Espiral',
        'Junji Ito',
        createDefaultMangaPanels(
          'Uzumaki: La Espiral',
          'Junji Ito',
          'El pueblo costero de Kurouzu-cho cae bajo la maldición de la espiral: una forma geométrica obsesiva que deforma los cuerpos y las mentes de sus habitantes.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-tomie',
    title: 'Tomie',
    author: 'Junji Ito',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Terror / Belleza Inmortal',
    totalPages: 10,
    year: 1987,
    description: 'Tomie es una hermosa y misteriosa muchacha capaz de enloquecer de amor y celos a cualquier hombre hasta inducirlo a asesinarla y despedazarla, solo para multiplicarse.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Tomie',
        'Junji Ito',
        createDefaultMangaPanels(
          'Tomie',
          'Junji Ito',
          'Tomie es una hermosa y misteriosa muchacha capaz de enloquecer de amor y celos a cualquier hombre hasta inducirlo a asesinarla y despedazarla, solo para multiplicarse.',
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
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
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
    id: 'cat-blame',
    title: 'Blame!',
    author: 'Tsutomu Nihei',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Cyberpunk / Megaestructura Solitaria',
    totalPages: 10,
    year: 1997,
    description: 'Killy vaga por los colosales niveles de una ciberestructura infinita de metal y hormigón armado con una pistola de radiación gravitacional en busca de genes puros.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Blame!',
        'Tsutomu Nihei',
        createDefaultMangaPanels(
          'Blame!',
          'Tsutomu Nihei',
          'Killy vaga por los colosales niveles de una ciberestructura infinita de metal y hormigón armado con una pistola de radiación gravitacional en busca de genes puros.',
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
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
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
    id: 'cat-d-gray-man',
    title: 'D.Gray-man',
    author: 'Katsura Hoshino',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen Oscuro / Exorcistas & Akuma',
    totalPages: 10,
    year: 2004,
    description: 'Allen Walker porta el arma Inocencia en su brazo izquierdo para destruir a los Akuma mecánicos creados por el Conde del Milenio en una Europa gótica alternativa.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'D.Gray-man',
        'Katsura Hoshino',
        createDefaultMangaPanels(
          'D.Gray-man',
          'Katsura Hoshino',
          'Allen Walker porta el arma Inocencia en su brazo izquierdo para destruir a los Akuma mecánicos creados por el Conde del Milenio en una Europa gótica alternativa.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-soul-eater',
    title: 'Soul Eater',
    author: 'Atsushi Ohkubo',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Fantasía Sobrenatural / Armas Humanas',
    totalPages: 10,
    year: 2004,
    description: 'Maka Albarn y su guadaña humana Soul asisten a la Academia Shibusen para cazar 99 almas humanas corruptas y una de bruja para convertir a Soul en Guadaña Mortal.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Soul Eater',
        'Atsushi Ohkubo',
        createDefaultMangaPanels(
          'Soul Eater',
          'Atsushi Ohkubo',
          'Maka Albarn y su guadaña humana Soul asisten a la Academia Shibusen para cazar 99 almas humanas corruptas y una de bruja para convertir a Soul en Guadaña Mortal.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-fire-force',
    title: 'Fire Force (Enen no Shouboutai)',
    author: 'Atsushi Ohkubo',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Acción / Bomberos Piroquinéticos',
    totalPages: 10,
    year: 2015,
    description: 'Shinra Kusakabe, un joven con pies llameantes apodado Huellas del Diablo, se une a la 8ª Brigada Especial de Bomberos para erradicar el misterio de la combustión humana.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Fire Force (Enen no Shouboutai)',
        'Atsushi Ohkubo',
        createDefaultMangaPanels(
          'Fire Force (Enen no Shouboutai)',
          'Atsushi Ohkubo',
          'Shinra Kusakabe, un joven con pies llameantes apodado Huellas del Diablo, se une a la 8ª Brigada Especial de Bomberos para erradicar el misterio de la combustión humana.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-dr-stone',
    title: 'Dr. Stone',
    author: 'Riichiro Inagaki & Boichi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Ciencia & Supervivencia',
    totalPages: 10,
    year: 2017,
    description: 'Toda la humanidad queda petrificada en piedra durante 3700 años. El prodigioso científico Senku Ishigami despierta y jura reconstruir la civilización desde cero con ciencia.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Dr. Stone',
        'Riichiro Inagaki & Boichi',
        createDefaultMangaPanels(
          'Dr. Stone',
          'Riichiro Inagaki & Boichi',
          'Toda la humanidad queda petrificada en piedra durante 3700 años. El prodigioso científico Senku Ishigami despierta y jura reconstruir la civilización desde cero con ciencia.',
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
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
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
    id: 'cat-assassination-classroom',
    title: 'Assassination Classroom (Ansatsu Kyoushitsu)',
    author: 'Yūsei Matsui',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Comedia / Acción Escolar',
    totalPages: 10,
    year: 2012,
    description: 'Un misterioso ser con tentáculos destruye el 70% de la luna y se convierte en maestro de la clase 3-E, entrenando a sus propios alumnos para que lo asesinen antes de graduarse.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Assassination Classroom (Ansatsu Kyoushitsu)',
        'Yūsei Matsui',
        createDefaultMangaPanels(
          'Assassination Classroom (Ansatsu Kyoushitsu)',
          'Yūsei Matsui',
          'Un misterioso ser con tentáculos destruye el 70% de la luna y se convierte en maestro de la clase 3-E, entrenando a sus propios alumnos para que lo asesinen antes de graduarse.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-food-wars',
    title: 'Shokugeki no Soma: Food Wars',
    author: 'Yūto Tsukuda & Shun Saeki',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Gastronomía / Duelos Culinarios',
    totalPages: 10,
    year: 2012,
    description: 'Soma Yukihira entra a la prestigiosa Academia Culinaria Totsuki donde solo el 10% logra graduarse, compitiendo en intensos combates de cocina llamados Shokugeki.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Shokugeki no Soma: Food Wars',
        'Yūto Tsukuda & Shun Saeki',
        createDefaultMangaPanels(
          'Shokugeki no Soma: Food Wars',
          'Yūto Tsukuda & Shun Saeki',
          'Soma Yukihira entra a la prestigiosa Academia Culinaria Totsuki donde solo el 10% logra graduarse, compitiendo en intensos combates de cocina llamados Shokugeki.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-inuyasha',
    title: 'Inuyasha',
    author: 'Rumiko Takahashi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Fantasía Feudal & Demonios',
    totalPages: 10,
    year: 1996,
    description: 'Kagome cae por un pozo sagrado y viaja al Japón feudal, donde libera al medio demonio perro Inuyasha para reunir los fragmentos de la Perla de Shikon.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Inuyasha',
        'Rumiko Takahashi',
        createDefaultMangaPanels(
          'Inuyasha',
          'Rumiko Takahashi',
          'Kagome cae por un pozo sagrado y viaja al Japón feudal, donde libera al medio demonio perro Inuyasha para reunir los fragmentos de la Perla de Shikon.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-ranma',
    title: 'Ranma 1/2',
    author: 'Rumiko Takahashi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Comedia Romántica / Artes Marciales',
    totalPages: 10,
    year: 1987,
    description: 'Ranma Saotome cae en las pozas malditas de Jusenkyo: con agua fría se convierte en chica y con agua caliente vuelve a ser chico, lidiando con prometidas y rivales.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Ranma 1/2',
        'Rumiko Takahashi',
        createDefaultMangaPanels(
          'Ranma 1/2',
          'Rumiko Takahashi',
          'Ranma Saotome cae en las pozas malditas de Jusenkyo: con agua fría se convierte en chica y con agua caliente vuelve a ser chico, lidiando con prometidas y rivales.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-saint-seiya',
    title: 'Saint Seiya: Los Caballeros del Zodiaco',
    author: 'Masami Kurumada',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Mitología Griega & Cosmos',
    totalPages: 10,
    year: 1986,
    description: 'Seiya de Pegaso y los Santos de Bronce encienden su cosmos al límite para proteger a la reencarnación de la diosa Atenea frente al Santuario de las Doce Casas.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Saint Seiya: Los Caballeros del Zodiaco',
        'Masami Kurumada',
        createDefaultMangaPanels(
          'Saint Seiya: Los Caballeros del Zodiaco',
          'Masami Kurumada',
          'Seiya de Pegaso y los Santos de Bronce encienden su cosmos al límite para proteger a la reencarnación de la diosa Atenea frente al Santuario de las Doce Casas.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-sailor-moon',
    title: 'Sailor Moon',
    author: 'Naoko Takeuchi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shojo / Magical Girls & Romance',
    totalPages: 10,
    year: 1991,
    description: 'Usagi Tsukino, una torpe estudiante de secundaria, se transforma en la guerrera Sailor Moon para proteger la Tierra y el Cristal de Plata del Reino Oscuro.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Sailor Moon',
        'Naoko Takeuchi',
        createDefaultMangaPanels(
          'Sailor Moon',
          'Naoko Takeuchi',
          'Usagi Tsukino, una torpe estudiante de secundaria, se transforma en la guerrera Sailor Moon para proteger la Tierra y el Cristal de Plata del Reino Oscuro.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-captain-tsubasa',
    title: 'Captain Tsubasa: Supercampeones',
    author: 'Yoichi Takahashi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Deportes / Fútbol Legendario',
    totalPages: 10,
    year: 1981,
    description: 'Tsubasa Ozora (Oliver Atom) ama el balón de fútbol como a un amigo y lidera al Nankatsu en campeonatos juveniles soñando con llevar a Japón a ganar el Mundial.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Captain Tsubasa: Supercampeones',
        'Yoichi Takahashi',
        createDefaultMangaPanels(
          'Captain Tsubasa: Supercampeones',
          'Yoichi Takahashi',
          'Tsubasa Ozora (Oliver Atom) ama el balón de fútbol como a un amigo y lidera al Nankatsu en campeonatos juveniles soñando con llevar a Japón a ganar el Mundial.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-hokuto-no-ken',
    title: 'El Puño de la Estrella del Norte',
    author: 'Buronson & Tetsuo Hara',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Postapocalíptico / Hokuto Shinken',
    totalPages: 10,
    year: 1983,
    description: 'En un desierto postnuclear gobernado por la ley del más fuerte, Kenshiro utiliza el arte marcial mortal de los puntos de presión para proteger a los desvalidos.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'El Puño de la Estrella del Norte',
        'Buronson & Tetsuo Hara',
        createDefaultMangaPanels(
          'El Puño de la Estrella del Norte',
          'Buronson & Tetsuo Hara',
          'En un desierto postnuclear gobernado por la ley del más fuerte, Kenshiro utiliza el arte marcial mortal de los puntos de presión para proteger a los desvalidos.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-parasyte',
    title: 'Parasyte (Kiseijuu)',
    author: 'Hitoshi Iwaaki',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Ciencia Ficción / Parásitos & Terror',
    totalPages: 10,
    year: 1988,
    description: 'Gusanos alienígenas invaden cerebros humanos para devorar a su especie. Shinichi Izumi logra frenar al parásito en su mano derecha, formando una alianza forzosa con Migi.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Parasyte (Kiseijuu)',
        'Hitoshi Iwaaki',
        createDefaultMangaPanels(
          'Parasyte (Kiseijuu)',
          'Hitoshi Iwaaki',
          'Gusanos alienígenas invaden cerebros humanos para devorar a su especie. Shinichi Izumi logra frenar al parásito en su mano derecha, formando una alianza forzosa con Migi.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-oyasumi-punpun',
    title: 'Oyasumi Punpun (Buenas Noches, Punpun)',
    author: 'Inio Asano',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Crudo & Psicológico',
    totalPages: 10,
    year: 2007,
    description: 'La conmovedora y trágica vida de Punpun Onodera, representado como un pequeño pájaro estilizado, mientras atraviesa la infancia, la depresión y la crudeza del mundo real.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Oyasumi Punpun (Buenas Noches, Punpun)',
        'Inio Asano',
        createDefaultMangaPanels(
          'Oyasumi Punpun (Buenas Noches, Punpun)',
          'Inio Asano',
          'La conmovedora y trágica vida de Punpun Onodera, representado como un pequeño pájaro estilizado, mientras atraviesa la infancia, la depresión y la crudeza del mundo real.',
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
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
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
    id: 'cat-dorohedoro',
    title: 'Dorohedoro',
    author: 'Q Hayashida',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Fantasía Oscura / Magia & Caimanes',
    totalPages: 10,
    year: 2000,
    description: 'Caiman, un hombre con cabeza de reptil y amnesia, busca al hechicero que lo maldijo en la decadente ciudad de Hole con la ayuda de Nikaido y sus cuchillos de cocina.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Dorohedoro',
        'Q Hayashida',
        createDefaultMangaPanels(
          'Dorohedoro',
          'Q Hayashida',
          'Caiman, un hombre con cabeza de reptil y amnesia, busca al hechicero que lo maldijo en la decadente ciudad de Hole con la ayuda de Nikaido y sus cuchillos de cocina.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-kingdom',
    title: 'Kingdom',
    author: 'Yasuhisa Hara',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Histórico / China Antigua & Guerra',
    totalPages: 10,
    year: 2006,
    description: 'En el turbulento Periodo de los Reinos Combatientes, el huérfano de guerra Shin sueña con convertirse en el Gran General bajo el Cielo junto al joven rey Ei Sei.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Kingdom',
        'Yasuhisa Hara',
        createDefaultMangaPanels(
          'Kingdom',
          'Yasuhisa Hara',
          'En el turbulento Periodo de los Reinos Combatientes, el huérfano de guerra Shin sueña con convertirse en el Gran General bajo el Cielo junto al joven rey Ei Sei.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-mushishi',
    title: 'Mushishi',
    author: 'Yuki Urushibara',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Sobrenatural / Naturaleza & Poesía',
    totalPages: 10,
    year: 1999,
    description: 'Ginko es un maestro de Mushi que viaja por el Japón tradicional sanando a personas afectadas por estas primitivas y silenciosas formas de vida espiritual.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Mushishi',
        'Yuki Urushibara',
        createDefaultMangaPanels(
          'Mushishi',
          'Yuki Urushibara',
          'Ginko es un maestro de Mushi que viaja por el Japón tradicional sanando a personas afectadas por estas primitivas y silenciosas formas de vida espiritual.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-bakuman',
    title: 'Bakuman',
    author: 'Tsugumi Ohba & Takeshi Obata',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Mangakas & Industria',
    totalPages: 10,
    year: 2008,
    description: 'El dibujante Moritaka Mashiro y el guionista Akito Takagi unen fuerzas para publicar en la Shonen Jump y lograr una adaptación al anime antes de que Mashiro se case.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Bakuman',
        'Tsugumi Ohba & Takeshi Obata',
        createDefaultMangaPanels(
          'Bakuman',
          'Tsugumi Ohba & Takeshi Obata',
          'El dibujante Moritaka Mashiro y el guionista Akito Takagi unen fuerzas para publicar en la Shonen Jump y lograr una adaptación al anime antes de que Mashiro se case.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-gto',
    title: 'Great Teacher Onizuka (GTO)',
    author: 'Tohru Fujisawa',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Comedia / Escuela & Superación',
    totalPages: 10,
    year: 1997,
    description: 'Eikichi Onizuka, un exmotociclista de 22 años, se convierte en profesor de secundaria para conquistar chicas, pero sus métodos extravagantes redimen a los alumnos más difíciles.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Great Teacher Onizuka (GTO)',
        'Tohru Fujisawa',
        createDefaultMangaPanels(
          'Great Teacher Onizuka (GTO)',
          'Tohru Fujisawa',
          'Eikichi Onizuka, un exmotociclista de 22 años, se convierte en profesor de secundaria para conquistar chicas, pero sus métodos extravagantes redimen a los alumnos más difíciles.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-kaguya-sama',
    title: 'Kaguya-sama: Love is War',
    author: 'Aka Akasaka',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Comedia Romántica / Estrategia Mental',
    totalPages: 10,
    year: 2015,
    description: 'Miyuki Shirogane y Kaguya Shinomiya son dos genios del consejo estudiantil enamorados el uno del otro, pero su orgullo desata una guerra psicológica para que el otro confiese primero.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Kaguya-sama: Love is War',
        'Aka Akasaka',
        createDefaultMangaPanels(
          'Kaguya-sama: Love is War',
          'Aka Akasaka',
          'Miyuki Shirogane y Kaguya Shinomiya son dos genios del consejo estudiantil enamorados el uno del otro, pero su orgullo desata una guerra psicológica para que el otro confiese primero.',
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
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
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
    id: 'cat-frieren',
    title: 'Frieren: Más allá del final del viaje',
    author: 'Kanehito Yamada & Tsukasa Abe',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Fantasía Melancólica / Paso del Tiempo',
    totalPages: 10,
    year: 2020,
    description: 'Tras derrotar al Rey Demonio, la elfa casi inmortal Frieren sobrevive a sus compañeros humanos y emprende un viaje para comprender las efímeras vidas de los mortales.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Frieren: Más allá del final del viaje',
        'Kanehito Yamada & Tsukasa Abe',
        createDefaultMangaPanels(
          'Frieren: Más allá del final del viaje',
          'Kanehito Yamada & Tsukasa Abe',
          'Tras derrotar al Rey Demonio, la elfa casi inmortal Frieren sobrevive a sus compañeros humanos y emprende un viaje para comprender las efímeras vidas de los mortales.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-dandadan',
    title: 'Dandadan',
    author: 'Yukinobu Tatsu',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Acción / Fantasmas & Alienígenas',
    totalPages: 10,
    year: 2021,
    description: 'Momo cree en los fantasmas pero rechaza a los extraterrestres; Okarun cree en aliens pero no en espíritus. Al aceptar un desafío mutuo, desatan un caos de poderes sobrenaturales.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Dandadan',
        'Yukinobu Tatsu',
        createDefaultMangaPanels(
          'Dandadan',
          'Yukinobu Tatsu',
          'Momo cree en los fantasmas pero rechaza a los extraterrestres; Okarun cree en aliens pero no en espíritus. Al aceptar un desafío mutuo, desatan un caos de poderes sobrenaturales.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-kaiju-no-8',
    title: 'Kaiju No. 8',
    author: 'Naoya Matsumoto',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Monstruos Gigantes',
    totalPages: 10,
    year: 2020,
    description: 'Kafka Hibino, un limpiador de cadáveres de kaijus de 32 años, absorbe un pequeño monstruo que le permite transformarse en el legendario Kaiju No. 8.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Kaiju No. 8',
        'Naoya Matsumoto',
        createDefaultMangaPanels(
          'Kaiju No. 8',
          'Naoya Matsumoto',
          'Kafka Hibino, un limpiador de cadáveres de kaijus de 32 años, absorbe un pequeño monstruo que le permite transformarse en el legendario Kaiju No. 8.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-sakamoto-days',
    title: 'Sakamoto Days',
    author: 'Yuto Suzuki',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Comedia de Acción / Asesinos a Sueldo',
    totalPages: 10,
    year: 2020,
    description: 'Taro Sakamoto, el sicario legendario más temido, se retiró tras enamorarse, engordó y ahora atiende una tienda de barrio mientras protege a su familia de cazarrecompensas.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Sakamoto Days',
        'Yuto Suzuki',
        createDefaultMangaPanels(
          'Sakamoto Days',
          'Yuto Suzuki',
          'Taro Sakamoto, el sicario legendario más temido, se retiró tras enamorarse, engordó y ahora atiende una tienda de barrio mientras protege a su familia de cazarrecompensas.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-jigokuraku',
    title: 'Hell\'s Paradise: Jigokuraku',
    author: 'Yuji Kaku',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen Oscuro / Ninjas en la Isla Prohibida',
    totalPages: 10,
    year: 2018,
    description: 'El ninja inmortal Gabimaru es enviado a una misteriosa isla habitada por deidades monstruosas para encontrar el Elixir de la Vida y conseguir el indulto del shogunato.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Hell\'s Paradise: Jigokuraku',
        'Yuji Kaku',
        createDefaultMangaPanels(
          'Hell\'s Paradise: Jigokuraku',
          'Yuji Kaku',
          'El ninja inmortal Gabimaru es enviado a una misteriosa isla habitada por deidades monstruosas para encontrar el Elixir de la Vida y conseguir el indulto del shogunato.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-mashle',
    title: 'Mashle: Magic and Muscles',
    author: 'Hajime Kōmoto',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Parodia / Músculos vs Magia',
    totalPages: 10,
    year: 2020,
    description: 'En un mundo de magia donde los que carecen de ella son ejecutados, Mash Burnedead compensa su falta de poderes mágicos con músculos hipertrofiados y bollos de crema.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Mashle: Magic and Muscles',
        'Hajime Kōmoto',
        createDefaultMangaPanels(
          'Mashle: Magic and Muscles',
          'Hajime Kōmoto',
          'En un mundo de magia donde los que carecen de ella son ejecutados, Mash Burnedead compensa su falta de poderes mágicos con músculos hipertrofiados y bollos de crema.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-undead-unluck',
    title: 'Undead Unluck',
    author: 'Yoshifumi Tozuka',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Habilidades de Negación',
    totalPages: 10,
    year: 2020,
    description: 'Fuko atrae mala suerte mortal a quien la toca; Andy es un zombi inmortal que desea morir. Juntos enfrentan a la Unión y a las reglas que rigen el cosmos.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Undead Unluck',
        'Yoshifumi Tozuka',
        createDefaultMangaPanels(
          'Undead Unluck',
          'Yoshifumi Tozuka',
          'Fuko atrae mala suerte mortal a quien la toca; Andy es un zombi inmortal que desea morir. Juntos enfrentan a la Unión y a las reglas que rigen el cosmos.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-blue-exorcist',
    title: 'Blue Exorcist (Ao no Exorcist)',
    author: 'Kazue Kato',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Demonios & Exorcismo',
    totalPages: 10,
    year: 2009,
    description: 'Rin Okumura descubre que es hijo de Satanás cuando sus llamas azules despiertan, ingresando a la Academia Vera Cruz para convertirse en exorcista y derrotar a su propio padre.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Blue Exorcist (Ao no Exorcist)',
        'Kazue Kato',
        createDefaultMangaPanels(
          'Blue Exorcist (Ao no Exorcist)',
          'Kazue Kato',
          'Rin Okumura descubre que es hijo de Satanás cuando sus llamas azules despiertan, ingresando a la Academia Vera Cruz para convertirse en exorcista y derrotar a su propio padre.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-devilman',
    title: 'Devilman',
    author: 'Go Nagai',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Terror / Clásico de Demonios',
    totalPages: 10,
    year: 1972,
    description: 'Akira Fudo se fusiona con el demonio Amon para combatir la invasión infernal que pretende erradicar a la humanidad en una de las obras más influyentes de la historia.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Devilman',
        'Go Nagai',
        createDefaultMangaPanels(
          'Devilman',
          'Go Nagai',
          'Akira Fudo se fusiona con el demonio Amon para combatir la invasión infernal que pretende erradicar a la humanidad en una de las obras más influyentes de la historia.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-mazinger-z',
    title: 'Mazinger Z',
    author: 'Go Nagai',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Mecha / El Padre de los Robots Gigantes',
    totalPages: 10,
    year: 1972,
    description: 'Koji Kabuto pilotea el robot de aleación Z Mazinger para defender al mundo de las bestias mecánicas del malvado Dr. Infierno y el Barón Ashura.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Mazinger Z',
        'Go Nagai',
        createDefaultMangaPanels(
          'Mazinger Z',
          'Go Nagai',
          'Koji Kabuto pilotea el robot de aleación Z Mazinger para defender al mundo de las bestias mecánicas del malvado Dr. Infierno y el Barón Ashura.',
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
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
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
    id: 'cat-gantz-e',
    title: 'Elfen Lied',
    author: 'Lynn Okamoto',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Terror / Diclonius & Vectores',
    totalPages: 10,
    year: 2002,
    description: 'Lucy, una mutante con cuernos y brazos invisibles mortales, escapa del laboratorio con amnesia adoptando una personalidad infantil junto al inocente Kouta.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Elfen Lied',
        'Lynn Okamoto',
        createDefaultMangaPanels(
          'Elfen Lied',
          'Lynn Okamoto',
          'Lucy, una mutante con cuernos y brazos invisibles mortales, escapa del laboratorio con amnesia adoptando una personalidad infantil junto al inocente Kouta.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-deadman-wonderland',
    title: 'Deadman Wonderland',
    author: 'Jinsei Kataoka & Kazuma Kondou',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen Oscuro / Prisión & Sangre',
    totalPages: 10,
    year: 2007,
    description: 'Ganta Igarashi es falsamente condenado por la masacre de su clase y recluido en una prisión privada donde los presos combaten a muerte utilizando ramas de sangre.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Deadman Wonderland',
        'Jinsei Kataoka & Kazuma Kondou',
        createDefaultMangaPanels(
          'Deadman Wonderland',
          'Jinsei Kataoka & Kazuma Kondou',
          'Ganta Igarashi es falsamente condenado por la masacre de su clase y recluido en una prisión privada donde los presos combaten a muerte utilizando ramas de sangre.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-mirai-nikki',
    title: 'Mirai Nikki (Diario del Futuro)',
    author: 'Sakae Esuno',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Batalla Real & Yandere',
    totalPages: 10,
    year: 2006,
    description: 'Doce participantes reciben diarios en sus teléfonos que predicen el futuro y deben eliminarse entre sí para convertirse en el nuevo Dios del Tiempo junto a la obsesiva Yuno Gasai.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Mirai Nikki (Diario del Futuro)',
        'Sakae Esuno',
        createDefaultMangaPanels(
          'Mirai Nikki (Diario del Futuro)',
          'Sakae Esuno',
          'Doce participantes reciben diarios en sus teléfonos que predicen el futuro y deben eliminarse entre sí para convertirse en el nuevo Dios del Tiempo junto a la obsesiva Yuno Gasai.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-noragami',
    title: 'Noragami',
    author: 'Adachitoka',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Dioses Menores & Ayakashi',
    totalPages: 10,
    year: 2010,
    description: 'Yato es un dios menor sin templo que cobra 5 yenes por cualquier favor, hasta que una muchacha mortal llamada Hiyori queda atrapada entre el mundo terrenal y el espiritual.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Noragami',
        'Adachitoka',
        createDefaultMangaPanels(
          'Noragami',
          'Adachitoka',
          'Yato es un dios menor sin templo que cobra 5 yenes por cualquier favor, hasta que una muchacha mortal llamada Hiyori queda atrapada entre el mundo terrenal y el espiritual.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-bungo-stray-dogs',
    title: 'Bungo Stray Dogs',
    author: 'Kafka Asagiri & Sango Harukawa',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Acción Sobrenatural / Detectives Literarios',
    totalPages: 10,
    year: 2012,
    description: 'Atsushi Nakajima se une a la Agencia Armada de Detectives en Yokohama, cuyos miembros poseen habilidades basadas en célebres autores de la literatura universal.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Bungo Stray Dogs',
        'Kafka Asagiri & Sango Harukawa',
        createDefaultMangaPanels(
          'Bungo Stray Dogs',
          'Kafka Asagiri & Sango Harukawa',
          'Atsushi Nakajima se une a la Agencia Armada de Detectives en Yokohama, cuyos miembros poseen habilidades basadas en célebres autores de la literatura universal.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-golden-kamuy',
    title: 'Golden Kamuy',
    author: 'Satoru Noda',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Histórico / Supervivencia en Hokkaido',
    totalPages: 10,
    year: 2014,
    description: 'El veterano inmortal Sugimoto y la joven cazadora ainu Asirpa buscan un tesoro de oro escondido cuyo mapa está tatuado en las pieles de peligrosos reclusos fugitivos.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Golden Kamuy',
        'Satoru Noda',
        createDefaultMangaPanels(
          'Golden Kamuy',
          'Satoru Noda',
          'El veterano inmortal Sugimoto y la joven cazadora ainu Asirpa buscan un tesoro de oro escondido cuyo mapa está tatuado en las pieles de peligrosos reclusos fugitivos.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-chi-no-wadachi',
    title: 'Rastro de Sangre (Chi no Wadachi)',
    author: 'Shuzo Oshimi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Terror Psicológico / Vínculo Maternal',
    totalPages: 10,
    year: 2017,
    description: 'Seiichi vive bajo la sofocante sobreprotección de su madre Seiko, hasta que un día descubre la fría crueldad y la locura que se oculta tras su cariñosa sonrisa.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Rastro de Sangre (Chi no Wadachi)',
        'Shuzo Oshimi',
        createDefaultMangaPanels(
          'Rastro de Sangre (Chi no Wadachi)',
          'Shuzo Oshimi',
          'Seiichi vive bajo la sofocante sobreprotección de su madre Seiko, hasta que un día descubre la fría crueldad y la locura que se oculta tras su cariñosa sonrisa.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-aku-no-hana',
    title: 'Las Flores del Mal (Aku no Hana)',
    author: 'Shuzo Oshimi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Drama Psicológico / Rebeldía Adolescente',
    totalPages: 10,
    year: 2009,
    description: 'Kasuga roba impulsivamente la ropa de gimnasia de la chica que le gusta. Sawa Nakamura lo descubre y lo chantajea para arrastrarlo a una espiral de transgresión pura.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Las Flores del Mal (Aku no Hana)',
        'Shuzo Oshimi',
        createDefaultMangaPanels(
          'Las Flores del Mal (Aku no Hana)',
          'Shuzo Oshimi',
          'Kasuga roba impulsivamente la ropa de gimnasia de la chica que le gusta. Sawa Nakamura lo descubre y lo chantajea para arrastrarlo a una espiral de transgresión pura.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-choujin-x',
    title: 'Choujin X',
    author: 'Sui Ishida',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Seinen / Superhumanos Oscuros',
    totalPages: 10,
    year: 2021,
    description: 'Tokio Kurohara y su talentoso amigo Azuma deciden inyectarse una jeringa misteriosa que los transforma en Choujin, seres con poderes monstruosos y deformes.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Choujin X',
        'Sui Ishida',
        createDefaultMangaPanels(
          'Choujin X',
          'Sui Ishida',
          'Tokio Kurohara y su talentoso amigo Azuma deciden inyectarse una jeringa misteriosa que los transforma en Choujin, seres con poderes monstruosos y deformes.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-komi-san',
    title: 'Komi-san no puede comunicarse',
    author: 'Tomohito Oda',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Comedia / Amistad Escolar',
    totalPages: 10,
    year: 2016,
    description: 'Shouko Komi es la chica más bella de la escuela, pero padece de una ansiedad social paralizante. Su compañero Tadano jura ayudarla a conseguir cien amigos.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Komi-san no puede comunicarse',
        'Tomohito Oda',
        createDefaultMangaPanels(
          'Komi-san no puede comunicarse',
          'Tomohito Oda',
          'Shouko Komi es la chica más bella de la escuela, pero padece de una ansiedad social paralizante. Su compañero Tadano jura ayudarla a conseguir cien amigos.',
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
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
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
    id: 'cat-sono-bisque-doll',
    title: 'My Dress-Up Darling (Sono Bisque Doll)',
    author: 'Shinichi Fukuda',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Romance / Cosplay & Muñecas Tradicionales',
    totalPages: 10,
    year: 2018,
    description: 'Wakana Gojo sueña con ser artesano de muñecas Hina; Marin Kitagawa ama el anime y el cosplay. Ambos unen sus talentos para confeccionar trajes espectaculares.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'My Dress-Up Darling (Sono Bisque Doll)',
        'Shinichi Fukuda',
        createDefaultMangaPanels(
          'My Dress-Up Darling (Sono Bisque Doll)',
          'Shinichi Fukuda',
          'Wakana Gojo sueña con ser artesano de muñecas Hina; Marin Kitagawa ama el anime y el cosplay. Ambos unen sus talentos para confeccionar trajes espectaculares.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-cardcaptor-sakura',
    title: 'Cardcaptor Sakura',
    author: 'CLAMP',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Magical Girls / Cartas Clow',
    totalPages: 10,
    year: 1996,
    description: 'Sakura Kinomoto abre accidentalmente un libro mágico y dispersa las Cartas Clow, debiendo convertirse en Cazadora de Cartas con la ayuda de Keroberos.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Cardcaptor Sakura',
        'CLAMP',
        createDefaultMangaPanels(
          'Cardcaptor Sakura',
          'CLAMP',
          'Sakura Kinomoto abre accidentalmente un libro mágico y dispersa las Cartas Clow, debiendo convertirse en Cazadora de Cartas con la ayuda de Keroberos.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-tsubasa-chronicle',
    title: 'Tsubasa Reservoir Chronicle',
    author: 'CLAMP',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Fantasía Dimensional / Crossover CLAMP',
    totalPages: 10,
    year: 2003,
    description: 'Syaoran viaja a través de múltiples dimensiones paralelas junto a Kurogane y Fai para recolectar las plumas que contienen los recuerdos perdidos de la princesa Sakura.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Tsubasa Reservoir Chronicle',
        'CLAMP',
        createDefaultMangaPanels(
          'Tsubasa Reservoir Chronicle',
          'CLAMP',
          'Syaoran viaja a través de múltiples dimensiones paralelas junto a Kurogane y Fai para recolectar las plumas que contienen los recuerdos perdidos de la princesa Sakura.',
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
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
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
    id: 'cat-shaman-king',
    title: 'Shaman King',
    author: 'Hiroyuki Takei',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Chamanes & Espíritus',
    totalPages: 10,
    year: 1998,
    description: 'Yoh Asakura, acompañado por el espíritu samurái Amidamaru, participa en el Gran Torneo de Chamanes que se celebra cada 500 años para coronarse como el Shaman King.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Shaman King',
        'Hiroyuki Takei',
        createDefaultMangaPanels(
          'Shaman King',
          'Hiroyuki Takei',
          'Yoh Asakura, acompañado por el espíritu samurái Amidamaru, participa en el Gran Torneo de Chamanes que se celebra cada 500 años para coronarse como el Shaman King.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-toriko',
    title: 'Toriko',
    author: 'Mitsutoshi Shimabukuro',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Shonen / Caza de Ingredientes Legendarios',
    totalPages: 10,
    year: 2008,
    description: 'En la Era Gourmet donde el sabor lo es todo, el Cazador Gourmet Toriko viaja por ecosistemas salvajes para capturar ingredientes extraordinarios y completar su Menú de Vida.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Toriko',
        'Mitsutoshi Shimabukuro',
        createDefaultMangaPanels(
          'Toriko',
          'Mitsutoshi Shimabukuro',
          'En la Era Gourmet donde el sabor lo es todo, el Cazador Gourmet Toriko viaja por ecosistemas salvajes para capturar ingredientes extraordinarios y completar su Menú de Vida.',
          'manga'
        )
      ),
  },
  {
    id: 'cat-seraph-of-the-end',
    title: 'Seraph of the End (Owari no Seraph)',
    author: 'Takaya Kagami & Yamato Yamamoto',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Fantasía Oscura / Vampiros & Armas Malditas',
    totalPages: 10,
    year: 2012,
    description: 'Un virus aniquila a los adultos y los vampiros esclavizan a los niños como ganado de sangre. Yuichiro escapa y se une al Ejército Demonio Japonés para rescatar a Mikaela.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Seraph of the End (Owari no Seraph)',
        'Takaya Kagami & Yamato Yamamoto',
        createDefaultMangaPanels(
          'Seraph of the End (Owari no Seraph)',
          'Takaya Kagami & Yamato Yamamoto',
          'Un virus aniquila a los adultos y los vampiros esclavizan a los niños como ganado de sangre. Yuichiro escapa y se une al Ejército Demonio Japonés para rescatar a Mikaela.',
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
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
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
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
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
    id: 'cat-urusei-yatsura',
    title: 'Urusei Yatsura: Lamu',
    author: 'Rumiko Takahashi',
    category: 'manga',
    format: 'cbz',
    genre: 'Manga / Comedia de Ciencia Ficción',
    totalPages: 10,
    year: 1978,
    description: 'El mujeriego Ataru Moroboshi gana por accidente un duelo por la Tierra contra Lum, la hermosa princesa alienígena del planeta Oni que se enamora perdidamente de él.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'MANGA EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Urusei Yatsura: Lamu',
        'Rumiko Takahashi',
        createDefaultMangaPanels(
          'Urusei Yatsura: Lamu',
          'Rumiko Takahashi',
          'El mujeriego Ataru Moroboshi gana por accidente un duelo por la Tierra contra Lum, la hermosa princesa alienígena del planeta Oni que se enamora perdidamente de él.',
          'manga'
        )
      ),
  },
];
