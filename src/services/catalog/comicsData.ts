import type { CatalogItem } from './types';
import { generateMangaCbz, createDefaultMangaPanels } from './generators';

export const COMICS_CATALOG: CatalogItem[] = [
  {
    id: 'cat-watchmen',
    title: 'Watchmen',
    author: 'Alan Moore & Dave Gibbons',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Obra Maestra / Deconstrucción de Héroes',
    totalPages: 10,
    year: 1986,
    description: 'En un 1985 alternativo al borde de la guerra nuclear entre EE.UU. y la Unión Soviética, el asesinato de El Comediante reúne a un grupo de vigilantes proscritos.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Watchmen',
        'Alan Moore & Dave Gibbons',
        createDefaultMangaPanels(
          'Watchmen',
          'Alan Moore & Dave Gibbons',
          'En un 1985 alternativo al borde de la guerra nuclear entre EE.UU. y la Unión Soviética, el asesinato de El Comediante reúne a un grupo de vigilantes proscritos.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-batman-year-one',
    title: 'Batman: Año Uno',
    author: 'Frank Miller & David Mazzucchelli',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Orígenes Noir',
    totalPages: 10,
    year: 1987,
    description: 'Bruce Wayne regresa a Gotham para iniciar su cruzada contra el crimen mientras el teniente Jim Gordon intenta mantenerse incorruptible en un departamento de policía podrido.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: Año Uno',
        'Frank Miller & David Mazzucchelli',
        createDefaultMangaPanels(
          'Batman: Año Uno',
          'Frank Miller & David Mazzucchelli',
          'Bruce Wayne regresa a Gotham para iniciar su cruzada contra el crimen mientras el teniente Jim Gordon intenta mantenerse incorruptible en un departamento de policía podrido.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-dark-knight-returns',
    title: 'The Dark Knight Returns',
    author: 'Frank Miller',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Obra Maestra Noir',
    totalPages: 10,
    year: 1986,
    description: 'Diez años después del retiro de los superhéroes, una Gotham City decadente cae en manos de los Mutantes. Bruce Wayne, a sus 55 años, se enfunda el manto por última vez.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Dark Knight Returns',
        'Frank Miller',
        createDefaultMangaPanels(
          'The Dark Knight Returns',
          'Frank Miller',
          'Diez años después del retiro de los superhéroes, una Gotham City decadente cae en manos de los Mutantes. Bruce Wayne, a sus 55 años, se enfunda el manto por última vez.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-spiderman-af15',
    title: 'Spider-Man: Amazing Fantasy #15',
    author: 'Stan Lee & Steve Ditko',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Nacimiento del Héroe',
    totalPages: 10,
    year: 1962,
    description: 'La picadura de una araña radiactiva otorga poderes asombrosos al tímido Peter Parker. La pérdida de su tío Ben le enseña que un gran poder conlleva una gran responsabilidad.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Spider-Man: Amazing Fantasy #15',
        'Stan Lee & Steve Ditko',
        createDefaultMangaPanels(
          'Spider-Man: Amazing Fantasy #15',
          'Stan Lee & Steve Ditko',
          'La picadura de una araña radiactiva otorga poderes asombrosos al tímido Peter Parker. La pérdida de su tío Ben le enseña que un gran poder conlleva una gran responsabilidad.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-allstar-superman',
    title: 'All-Star Superman',
    author: 'Grant Morrison & Frank Quitely',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Obra Maestra Heroica',
    totalPages: 10,
    year: 2005,
    description: 'Tras una sobrecarga solar que le otorga un año de vida, el Hombre de Acero se propone completar doce grandes hazañas para asegurar el futuro pacífico de la humanidad.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'All-Star Superman',
        'Grant Morrison & Frank Quitely',
        createDefaultMangaPanels(
          'All-Star Superman',
          'Grant Morrison & Frank Quitely',
          'Tras una sobrecarga solar que le otorga un año de vida, el Hombre de Acero se propone completar doce grandes hazañas para asegurar el futuro pacífico de la humanidad.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-sandman',
    title: 'The Sandman: Preludios y Nocturnos',
    author: 'Neil Gaiman',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Fantasía Oscura / Vertigo',
    totalPages: 10,
    year: 1989,
    description: 'Sueño de los Eternos es capturado por un ritual ocultista y encerrado durante siete décadas. Tras liberarse, debe recuperar sus tres símbolos de poder: el rubí, el yelmo y la arena.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Sandman: Preludios y Nocturnos',
        'Neil Gaiman',
        createDefaultMangaPanels(
          'The Sandman: Preludios y Nocturnos',
          'Neil Gaiman',
          'Sueño de los Eternos es capturado por un ritual ocultista y encerrado durante siete décadas. Tras liberarse, debe recuperar sus tres símbolos de poder: el rubí, el yelmo y la arena.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-xmen-days',
    title: 'X-Men: Días del Futuro Pasado',
    author: 'Chris Claremont & John Byrne',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Distopía Mutante',
    totalPages: 10,
    year: 1981,
    description: 'En un futuro donde los mutantes son recluidos en campos por Centinelas gigantes, la mente de Kitty Pryde viaja al pasado para evitar el asesinato que provocó la catástrofe.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'X-Men: Días del Futuro Pasado',
        'Chris Claremont & John Byrne',
        createDefaultMangaPanels(
          'X-Men: Días del Futuro Pasado',
          'Chris Claremont & John Byrne',
          'En un futuro donde los mutantes son recluidos en campos por Centinelas gigantes, la mente de Kitty Pryde viaja al pasado para evitar el asesinato que provocó la catástrofe.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-invincible',
    title: 'Invincible: Invencible',
    author: 'Robert Kirkman & Cory Walker',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Superhéroes / Acción & Drama Épico',
    totalPages: 10,
    year: 2003,
    description: 'Mark Grayson es el hijo de Omni-Man, el protector alienígena más poderoso de la Tierra. Al despertar sus poderes, descubre la siniestra verdad del imperio de su padre.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Invincible: Invencible',
        'Robert Kirkman & Cory Walker',
        createDefaultMangaPanels(
          'Invincible: Invencible',
          'Robert Kirkman & Cory Walker',
          'Mark Grayson es el hijo de Omni-Man, el protector alienígena más poderoso de la Tierra. Al despertar sus poderes, descubre la siniestra verdad del imperio de su padre.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-spiderman-kraven',
    title: 'Spider-Man: La Última Cacería de Kraven',
    author: 'J.M. DeMatteis & Mike Zeck',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Clásico Psicológico',
    totalPages: 10,
    year: 1987,
    description: 'Sintiendo su fin próximo, Kraven seda y entierra vivo a Peter Parker, vistiéndose con el traje negro del Hombre Araña para demostrar que es superior a su presa en todo aspecto.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Spider-Man: La Última Cacería de Kraven',
        'J.M. DeMatteis & Mike Zeck',
        createDefaultMangaPanels(
          'Spider-Man: La Última Cacería de Kraven',
          'J.M. DeMatteis & Mike Zeck',
          'Sintiendo su fin próximo, Kraven seda y entierra vivo a Peter Parker, vistiéndose con el traje negro del Hombre Araña para demostrar que es superior a su presa en todo aspecto.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-batman-halloween',
    title: 'Batman: El Largo Halloween',
    author: 'Jeph Loeb & Tim Sale',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Detective Noir',
    totalPages: 10,
    year: 1996,
    description: 'Un misterioso asesino conocido como "Festivo" elimina a capos de la mafia de Gotham en cada fecha conmemorativa. Batman forja una alianza con Gordon y Harvey Dent.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: El Largo Halloween',
        'Jeph Loeb & Tim Sale',
        createDefaultMangaPanels(
          'Batman: El Largo Halloween',
          'Jeph Loeb & Tim Sale',
          'Un misterioso asesino conocido como "Festivo" elimina a capos de la mafia de Gotham en cada fecha conmemorativa. Batman forja una alianza con Gordon y Harvey Dent.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-civil-war',
    title: 'Civil War (Guerra Civil)',
    author: 'Mark Millar & Steve McNiven',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Evento Épico',
    totalPages: 10,
    year: 2006,
    description: 'Tras una tragedia provocada por héroes novatos, el Congreso aprueba el Acta de Registro Sobrehumano. Iron Man apoya el control mientras el Capitán América lidera la resistencia.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Civil War (Guerra Civil)',
        'Mark Millar & Steve McNiven',
        createDefaultMangaPanels(
          'Civil War (Guerra Civil)',
          'Mark Millar & Steve McNiven',
          'Tras una tragedia provocada por héroes novatos, el Congreso aprueba el Acta de Registro Sobrehumano. Iron Man apoya el control mientras el Capitán América lidera la resistencia.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-v-for-vendetta',
    title: 'V de Vendetta',
    author: 'Alan Moore & David Lloyd',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Distopía / Libertad y Anarquismo',
    totalPages: 10,
    year: 1982,
    description: 'En una Gran Bretaña fascista postguerra nuclear, un enigmático revolucionario con la máscara de Guy Fawkes inicia una campaña para derrocar al régimen totalitario.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'V de Vendetta',
        'Alan Moore & David Lloyd',
        createDefaultMangaPanels(
          'V de Vendetta',
          'Alan Moore & David Lloyd',
          'En una Gran Bretaña fascista postguerra nuclear, un enigmático revolucionario con la máscara de Guy Fawkes inicia una campaña para derrocar al régimen totalitario.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-kingdom-come',
    title: 'Kingdom Come',
    author: 'Mark Waid & Alex Ross',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Obra Maestra Pintada',
    totalPages: 10,
    year: 1996,
    description: 'En un futuro donde una nueva generación de metahumanos imprudentes desata el caos, un envejecido Superman sale de su retiro para restaurar el heroísmo auténtico.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Kingdom Come',
        'Mark Waid & Alex Ross',
        createDefaultMangaPanels(
          'Kingdom Come',
          'Mark Waid & Alex Ross',
          'En un futuro donde una nueva generación de metahumanos imprudentes desata el caos, un envejecido Superman sale de su retiro para restaurar el heroísmo auténtico.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-killing-joke',
    title: 'Batman: La Broma Asesina (The Killing Joke)',
    author: 'Alan Moore & Brian Bolland',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / El Origen del Joker',
    totalPages: 10,
    year: 1988,
    description: 'El Joker escapa de Arkham e intenta demostrar que solo hace falta un mal día para transformar al hombre más cuerdo en un monstruo desquiciado, atacando a Jim y Barbara Gordon.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: La Broma Asesina (The Killing Joke)',
        'Alan Moore & Brian Bolland',
        createDefaultMangaPanels(
          'Batman: La Broma Asesina (The Killing Joke)',
          'Alan Moore & Brian Bolland',
          'El Joker escapa de Arkham e intenta demostrar que solo hace falta un mal día para transformar al hombre más cuerdo en un monstruo desquiciado, atacando a Jim y Barbara Gordon.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-batman-hush',
    title: 'Batman: Silencio (Hush)',
    author: 'Jeph Loeb & Jim Lee',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Misterio y Acción',
    totalPages: 10,
    year: 2002,
    description: 'Un misterioso villano con vendas en el rostro manipula a los peores enemigos del murciélago en una conspiración coordinada para destruir la vida de Bruce Wayne.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: Silencio (Hush)',
        'Jeph Loeb & Jim Lee',
        createDefaultMangaPanels(
          'Batman: Silencio (Hush)',
          'Jeph Loeb & Jim Lee',
          'Un misterioso villano con vendas en el rostro manipula a los peores enemigos del murciélago en una conspiración coordinada para destruir la vida de Bruce Wayne.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-daredevil-born-again',
    title: 'Daredevil: Born Again',
    author: 'Frank Miller & David Mazzucchelli',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Caída y Redención',
    totalPages: 10,
    year: 1986,
    description: 'Karen Page vende la identidad secreta de Daredevil por una dosis de heroína. Kingpin utiliza la información para demoler sistemáticamente la vida personal y profesional de Matt Murdock.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Daredevil: Born Again',
        'Frank Miller & David Mazzucchelli',
        createDefaultMangaPanels(
          'Daredevil: Born Again',
          'Frank Miller & David Mazzucchelli',
          'Karen Page vende la identidad secreta de Daredevil por una dosis de heroína. Kingpin utiliza la información para demoler sistemáticamente la vida personal y profesional de Matt Murdock.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-flashpoint',
    title: 'Flashpoint',
    author: 'Geoff Johns & Andy Kubert',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Líneas Temporales Alteradas',
    totalPages: 10,
    year: 2011,
    description: 'Barry Allen viaja al pasado para salvar a su madre y despierta en una realidad devastada donde Atlantis y Themyscira libran una guerra mundial y Thomas Wayne es Batman.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Flashpoint',
        'Geoff Johns & Andy Kubert',
        createDefaultMangaPanels(
          'Flashpoint',
          'Geoff Johns & Andy Kubert',
          'Barry Allen viaja al pasado para salvar a su madre y despierta en una realidad devastada donde Atlantis y Themyscira libran una guerra mundial y Thomas Wayne es Batman.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-spiderman-blue',
    title: 'Spider-Man: Blue',
    author: 'Jeph Loeb & Tim Sale',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Romance Melancólico',
    totalPages: 10,
    year: 2002,
    description: 'En el día de San Valentín, un Peter Parker adulto graba una cinta de audio recordando cómo se enamoró de Gwen Stacy en los años dorados de su juventud universitaria.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Spider-Man: Blue',
        'Jeph Loeb & Tim Sale',
        createDefaultMangaPanels(
          'Spider-Man: Blue',
          'Jeph Loeb & Tim Sale',
          'En el día de San Valentín, un Peter Parker adulto graba una cinta de audio recordando cómo se enamoró de Gwen Stacy en los años dorados de su juventud universitaria.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-superman-red-son',
    title: 'Superman: Hijo Rojo (Red Son)',
    author: 'Mark Millar',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Elseworlds / La Guerra Fría',
    totalPages: 10,
    year: 2003,
    description: '¿Qué habría ocurrido si la nave espacial del bebé Kal-El hubiera aterrizado en una granja colectiva de la Unión Soviética en plena Guerra Fría en lugar de Kansas?',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Superman: Hijo Rojo (Red Son)',
        'Mark Millar',
        createDefaultMangaPanels(
          'Superman: Hijo Rojo (Red Son)',
          'Mark Millar',
          '¿Qué habría ocurrido si la nave espacial del bebé Kal-El hubiera aterrizado en una granja colectiva de la Unión Soviética en plena Guerra Fría en lugar de Kansas?',
          'comics'
        )
      ),
  },
  {
    id: 'cat-infinity-gauntlet',
    title: 'El Guantelete del Infinito (Infinity Gauntlet)',
    author: 'Jim Starlin & George Pérez',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Cósmico & Thanos',
    totalPages: 10,
    year: 1991,
    description: 'Para complacer a su amada Muerte, el titán loco Thanos reúne las seis Gemas del Infinito y con un simple chasquido de dedos borra la mitad de la vida en el universo.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'El Guantelete del Infinito (Infinity Gauntlet)',
        'Jim Starlin & George Pérez',
        createDefaultMangaPanels(
          'El Guantelete del Infinito (Infinity Gauntlet)',
          'Jim Starlin & George Pérez',
          'Para complacer a su amada Muerte, el titán loco Thanos reúne las seis Gemas del Infinito y con un simple chasquido de dedos borra la mitad de la vida en el universo.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-old-man-logan',
    title: 'Old Man Logan (El Viejo Logan)',
    author: 'Mark Millar & Steve McNiven',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Postapocalíptico del Páramo',
    totalPages: 10,
    year: 2008,
    description: 'Cincuenta años después de que los supervillanos masacraron a todos los héroes, un Logan envejecido y pacifista cruza los Estados Unidos junto a un Hawkeye ciego.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Old Man Logan (El Viejo Logan)',
        'Mark Millar & Steve McNiven',
        createDefaultMangaPanels(
          'Old Man Logan (El Viejo Logan)',
          'Mark Millar & Steve McNiven',
          'Cincuenta años después de que los supervillanos masacraron a todos los héroes, un Logan envejecido y pacifista cruza los Estados Unidos junto a un Hawkeye ciego.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-secret-wars',
    title: 'Secret Wars: Guerras Secretas',
    author: 'Jim Shooter & Mike Zeck',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Crossover Clásico',
    totalPages: 10,
    year: 1984,
    description: 'La entidad cósmica Beyonder transporta a los mayores héroes y villanos a Battleworld obligándolos a combatir entre sí: el debut histórico del traje negro alienígena de Spider-Man.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Secret Wars: Guerras Secretas',
        'Jim Shooter & Mike Zeck',
        createDefaultMangaPanels(
          'Secret Wars: Guerras Secretas',
          'Jim Shooter & Mike Zeck',
          'La entidad cósmica Beyonder transporta a los mayores héroes y villanos a Battleworld obligándolos a combatir entre sí: el debut histórico del traje negro alienígena de Spider-Man.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-batman-court-owls',
    title: 'Batman: La Corte de los Búhos',
    author: 'Scott Snyder & Greg Capullo',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Secretos Ancestrales de Gotham',
    totalPages: 10,
    year: 2011,
    description: 'Batman descubre que Gotham City no le pertenece: una sociedad secreta de aristócratas ha controlado los destinos de la ciudad desde las sombras durante siglos con sus garras Talon.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: La Corte de los Búhos',
        'Scott Snyder & Greg Capullo',
        createDefaultMangaPanels(
          'Batman: La Corte de los Búhos',
          'Scott Snyder & Greg Capullo',
          'Batman descubre que Gotham City no le pertenece: una sociedad secreta de aristócratas ha controlado los destinos de la ciudad desde las sombras durante siglos con sus garras Talon.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-hellboy-seed-destruction',
    title: 'Hellboy: Semilla de Destrucción',
    author: 'Mike Mignola & John Byrne',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Mignolaverse / Mitología y Ocultismo',
    totalPages: 10,
    year: 1994,
    description: 'Invocado por nazis en 1944 y criado por el profesor Bruttenholm, Hellboy investiga la muerte de su padre adoptivo enfrentando a monstruos de los mitos de Cthulhu.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Hellboy: Semilla de Destrucción',
        'Mike Mignola & John Byrne',
        createDefaultMangaPanels(
          'Hellboy: Semilla de Destrucción',
          'Mike Mignola & John Byrne',
          'Invocado por nazis en 1944 y criado por el profesor Bruttenholm, Hellboy investiga la muerte de su padre adoptivo enfrentando a monstruos de los mitos de Cthulhu.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-sin-city',
    title: 'Sin City: El Duro Adiós',
    author: 'Frank Miller',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Noir Puro / Blanco y Negro de Alto Contraste',
    totalPages: 10,
    year: 1991,
    description: 'Marv, un gigante con problemas de furia, se despierta en una habitación de hotel con la hermosa Goldie asesinada a su lado, desatando una cacería sangrienta por Basin City.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Sin City: El Duro Adiós',
        'Frank Miller',
        createDefaultMangaPanels(
          'Sin City: El Duro Adiós',
          'Frank Miller',
          'Marv, un gigante con problemas de furia, se despierta en una habitación de hotel con la hermosa Goldie asesinada a su lado, desatando una cacería sangrienta por Basin City.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-saga',
    title: 'Saga',
    author: 'Brian K. Vaughan & Fiona Staples',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Space Opera / Fantasía para Adultos',
    totalPages: 10,
    year: 2012,
    description: 'Alana y Marko, dos soldados de razas alienígenas en guerra interestelar perpetua, se enamoran y tienen una hija, huyendo de cazarrecompensas a través del cosmos.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Saga',
        'Brian K. Vaughan & Fiona Staples',
        createDefaultMangaPanels(
          'Saga',
          'Brian K. Vaughan & Fiona Staples',
          'Alana y Marko, dos soldados de razas alienígenas en guerra interestelar perpetua, se enamoran y tienen una hija, huyendo de cazarrecompensas a través del cosmos.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-walking-dead',
    title: 'The Walking Dead: Los Muertos Vivientes',
    author: 'Robert Kirkman & Charlie Adlard',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Zombis / Supervivencia y Humanidad',
    totalPages: 10,
    year: 2003,
    description: 'El policía Rick Grimes despierta de un coma en un hospital abandonado y descubre que los muertos caminan, buscando a su familia en un mundo donde los vivos son el peor peligro.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Walking Dead: Los Muertos Vivientes',
        'Robert Kirkman & Charlie Adlard',
        createDefaultMangaPanels(
          'The Walking Dead: Los Muertos Vivientes',
          'Robert Kirkman & Charlie Adlard',
          'El policía Rick Grimes despierta de un coma en un hospital abandonado y descubre que los muertos caminan, buscando a su familia en un mundo donde los vivos son el peor peligro.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-the-boys',
    title: 'The Boys',
    author: 'Garth Ennis & Darick Robertson',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Sátira Violenta / Corporaciones y Corrupción',
    totalPages: 10,
    year: 2006,
    description: 'Billy Butcher recluta a un equipo de agentes clandestinos respaldados por la CIA para vigilar, chantajear y liquidar a los superhéroes corruptos de la multinacional Vought.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Boys',
        'Garth Ennis & Darick Robertson',
        createDefaultMangaPanels(
          'The Boys',
          'Garth Ennis & Darick Robertson',
          'Billy Butcher recluta a un equipo de agentes clandestinos respaldados por la CIA para vigilar, chantajear y liquidar a los superhéroes corruptos de la multinacional Vought.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-maus',
    title: 'Maus: Relato de un Superviviente',
    author: 'Art Spiegelman',
    category: 'comics',
    format: 'cbz',
    genre: 'Novela Gráfica / Holocausto / Premio Pulitzer',
    totalPages: 10,
    year: 1980,
    description: 'La conmovedora historia real de Vladek Spiegelman, un judío polaco sobreviviente de Auschwitz, retratando a los judíos como ratones y a los nazis como gatos.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Maus: Relato de un Superviviente',
        'Art Spiegelman',
        createDefaultMangaPanels(
          'Maus: Relato de un Superviviente',
          'Art Spiegelman',
          'La conmovedora historia real de Vladek Spiegelman, un judío polaco sobreviviente de Auschwitz, retratando a los judíos como ratones y a los nazis como gatos.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-preacher',
    title: 'Preacher: Predicador',
    author: 'Garth Ennis & Steve Dillon',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Vertigo / Western Sobrenatural & Sátira',
    totalPages: 10,
    year: 1995,
    description: 'Jesse Custer es poseído por Génesis, una entidad celestial nacida de un ángel y un demonio que le otorga La Palabra de Dios, viajando por Texas para exigir respuestas al Creador.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Preacher: Predicador',
        'Garth Ennis & Steve Dillon',
        createDefaultMangaPanels(
          'Preacher: Predicador',
          'Garth Ennis & Steve Dillon',
          'Jesse Custer es poseído por Génesis, una entidad celestial nacida de un ángel y un demonio que le otorga La Palabra de Dios, viajando por Texas para exigir respuestas al Creador.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-y-the-last-man',
    title: 'Y: El Último Hombre',
    author: 'Brian K. Vaughan & Pia Guerra',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Postapocalíptico / El Último Cromosoma Y',
    totalPages: 10,
    year: 2002,
    description: 'Una plaga simultánea aniquila a todos los mamíferos con cromosoma Y en la Tierra. Solo sobreviven el escapista Yorick Brown y su pequeño mono capuchino Ampersand.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Y: El Último Hombre',
        'Brian K. Vaughan & Pia Guerra',
        createDefaultMangaPanels(
          'Y: El Último Hombre',
          'Brian K. Vaughan & Pia Guerra',
          'Una plaga simultánea aniquila a todos los mamíferos con cromosoma Y en la Tierra. Solo sobreviven el escapista Yorick Brown y su pequeño mono capuchino Ampersand.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-locke-and-key',
    title: 'Locke & Key',
    author: 'Joe Hill & Gabriel Rodríguez',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Terror / Llaves Mágicas en Keyhouse',
    totalPages: 10,
    year: 2008,
    description: 'Tras el brutal asesinato de su padre, los tres hermanos Locke se mudan a la vieja mansión familiar Keyhouse, donde puertas mágicas confieren asombrosos y terroríficos poderes.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Locke & Key',
        'Joe Hill & Gabriel Rodríguez',
        createDefaultMangaPanels(
          'Locke & Key',
          'Joe Hill & Gabriel Rodríguez',
          'Tras el brutal asesinato de su padre, los tres hermanos Locke se mudan a la vieja mansión familiar Keyhouse, donde puertas mágicas confieren asombrosos y terroríficos poderes.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-spawn',
    title: 'Spawn',
    author: 'Todd McFarlane',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Antihéroe / El Engendro del Infierno',
    totalPages: 10,
    year: 1992,
    description: 'El asesino del gobierno Al Simmons es traicionado y enviado al Infierno. Hace un pacto con Malebolgia para volver a ver a su esposa, regresando como un Hellspawn con traje viviente.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Spawn',
        'Todd McFarlane',
        createDefaultMangaPanels(
          'Spawn',
          'Todd McFarlane',
          'El asesino del gobierno Al Simmons es traicionado y enviado al Infierno. Hace un pacto con Malebolgia para volver a ver a su esposa, regresando como un Hellspawn con traje viviente.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-marvels',
    title: 'Marvels',
    author: 'Kurt Busiek & Alex Ross',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / La Era de los Prodigios',
    totalPages: 10,
    year: 1994,
    description: 'La historia del Universo Marvel desde la década de 1930 hasta los años setenta contada a través de la lente del fotoperiodista ordinario Phil Sheldon con arte fotorrealista al óleo.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Marvels',
        'Kurt Busiek & Alex Ross',
        createDefaultMangaPanels(
          'Marvels',
          'Kurt Busiek & Alex Ross',
          'La historia del Universo Marvel desde la década de 1930 hasta los años setenta contada a través de la lente del fotoperiodista ordinario Phil Sheldon con arte fotorrealista al óleo.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-hawkeye',
    title: 'Hawkeye: Ojo de Halcón',
    author: 'Matt Fraction & David Aja',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Lo que Clint Barton hace fuera de los Vengadores',
    totalPages: 10,
    year: 2012,
    description: 'Clint Barton intenta vivir una vida normal en su departamento de Brooklyn junto a su protegida Kate Bishop y su perro amante de la pizza, defendiéndose de la mafia del chándal.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Hawkeye: Ojo de Halcón',
        'Matt Fraction & David Aja',
        createDefaultMangaPanels(
          'Hawkeye: Ojo de Halcón',
          'Matt Fraction & David Aja',
          'Clint Barton intenta vivir una vida normal en su departamento de Brooklyn junto a su protegida Kate Bishop y su perro amante de la pizza, defendiéndose de la mafia del chándal.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-weapon-x',
    title: 'Wolverine: Arma X',
    author: 'Barry Windsor-Smith',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / El Experimento de Adamantium',
    totalPages: 10,
    year: 1991,
    description: 'Científicos del gobierno secuestran al mutante Logan en las montañas de Canadá para someterlo a una brutal operación que recubre todo su esqueleto con adamantium indestructible.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Wolverine: Arma X',
        'Barry Windsor-Smith',
        createDefaultMangaPanels(
          'Wolverine: Arma X',
          'Barry Windsor-Smith',
          'Científicos del gobierno secuestran al mutante Logan en las montañas de Canadá para someterlo a una brutal operación que recubre todo su esqueleto con adamantium indestructible.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-winter-soldier',
    title: 'Capitán América: El Soldado de Invierno',
    author: 'Ed Brubaker & Steve Epting',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Espionaje Militar / Bucky Barnes',
    totalPages: 10,
    year: 2005,
    description: 'Steve Rogers investiga el asesinato de Cráneo Rojo y descubre que el legendario asesino de la Guerra Fría conocido como el Soldado de Invierno es su amigo de la infancia Bucky.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Capitán América: El Soldado de Invierno',
        'Ed Brubaker & Steve Epting',
        createDefaultMangaPanels(
          'Capitán América: El Soldado de Invierno',
          'Ed Brubaker & Steve Epting',
          'Steve Rogers investiga el asesinato de Cráneo Rojo y descubre que el legendario asesino de la Guerra Fría conocido como el Soldado de Invierno es su amigo de la infancia Bucky.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-man-without-fear',
    title: 'Daredevil: El Hombre Sin Miedo',
    author: 'Frank Miller & John Romita Jr.',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Los Orígenes de Hell’s Kitchen',
    totalPages: 10,
    year: 1993,
    description: 'La infancia del joven Matt Murdock en las duras calles de la Cocina del Infierno, el accidente con residuos tóxicos que cegó sus ojos agudizando sus sentidos y el entrenamiento con Stick.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Daredevil: El Hombre Sin Miedo',
        'Frank Miller & John Romita Jr.',
        createDefaultMangaPanels(
          'Daredevil: El Hombre Sin Miedo',
          'Frank Miller & John Romita Jr.',
          'La infancia del joven Matt Murdock en las duras calles de la Cocina del Infierno, el accidente con residuos tóxicos que cegó sus ojos agudizando sus sentidos y el entrenamiento con Stick.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-death-in-the-family',
    title: 'Batman: Una Muerte en la Familia',
    author: 'Jim Starlin & Jim Aparo',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / La Muerte de Jason Todd',
    totalPages: 10,
    year: 1988,
    description: 'El segundo Robin, Jason Todd, viaja a Oriente Medio buscando a su verdadera madre y cae en una trampa mortal del Joker armado con una palanca de hierro.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: Una Muerte en la Familia',
        'Jim Starlin & Jim Aparo',
        createDefaultMangaPanels(
          'Batman: Una Muerte en la Familia',
          'Jim Starlin & Jim Aparo',
          'El segundo Robin, Jason Todd, viaja a Oriente Medio buscando a su verdadera madre y cae en una trampa mortal del Joker armado con una palanca de hierro.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-death-of-superman',
    title: 'La Muerte de Superman',
    author: 'Dan Jurgens & Brett Breeding',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / La Caída del Héroe',
    totalPages: 10,
    year: 1992,
    description: 'Un monstruo imparable llamado Doomsday arrasa todo a su paso camino a Metrópolis. Superman libra un combate titánico a puño limpio hasta que ambos corazones se detienen.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'La Muerte de Superman',
        'Dan Jurgens & Brett Breeding',
        createDefaultMangaPanels(
          'La Muerte de Superman',
          'Dan Jurgens & Brett Breeding',
          'Un monstruo imparable llamado Doomsday arrasa todo a su paso camino a Metrópolis. Superman libra un combate titánico a puño limpio hasta que ambos corazones se detienen.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-crisis-infinite-earths',
    title: 'Crisis en Tierras Infinitas',
    author: 'Marv Wolfman & George Pérez',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / El Multiverso Colapsa',
    totalPages: 10,
    year: 1985,
    description: 'El Antimonitor devora universos enteros con una ola de antimateria. Héroes y villanos de todas las Tierras paralelas deben unirse para salvar la realidad del exterminio total.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Crisis en Tierras Infinitas',
        'Marv Wolfman & George Pérez',
        createDefaultMangaPanels(
          'Crisis en Tierras Infinitas',
          'Marv Wolfman & George Pérez',
          'El Antimonitor devora universos enteros con una ola de antimateria. Héroes y villanos de todas las Tierras paralelas deben unirse para salvar la realidad del exterminio total.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-dark-phoenix-saga',
    title: 'X-Men: La Saga de Fénix Oscura',
    author: 'Chris Claremont & John Byrne',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Poder Cósmico & Sacrificio',
    totalPages: 10,
    year: 1980,
    description: 'La entidad cósmica de la Fuerza Fénix corrompe el alma de Jean Grey, transformándola en Fénix Oscura, capaz de consumir estrellas enteras ante el dolor de Cíclope y los X-Men.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'X-Men: La Saga de Fénix Oscura',
        'Chris Claremont & John Byrne',
        createDefaultMangaPanels(
          'X-Men: La Saga de Fénix Oscura',
          'Chris Claremont & John Byrne',
          'La entidad cósmica de la Fuerza Fénix corrompe el alma de Jean Grey, transformándola en Fénix Oscura, capaz de consumir estrellas enteras ante el dolor de Cíclope y los X-Men.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-blackest-night',
    title: 'Green Lantern: La Noche Más Oscura',
    author: 'Geoff Johns & Ivan Reis',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Los Black Lanterns',
    totalPages: 10,
    year: 2009,
    description: 'Los muertos de todo el universo resucitan con anillos de poder negros hambrientos de emociones vivas. Hal Jordan y los cuerpos de linternas de colores deben formar una alianza.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Green Lantern: La Noche Más Oscura',
        'Geoff Johns & Ivan Reis',
        createDefaultMangaPanels(
          'Green Lantern: La Noche Más Oscura',
          'Geoff Johns & Ivan Reis',
          'Los muertos de todo el universo resucitan con anillos de poder negros hambrientos de emociones vivas. Hal Jordan y los cuerpos de linternas de colores deben formar una alianza.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-tower-of-babel',
    title: 'JLA: La Torre de Babel',
    author: 'Mark Waid & Howard Porter',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Los Planes de Contingencia de Batman',
    totalPages: 10,
    year: 2000,
    description: 'Ra’s al Ghul roba los archivos secretos de Batman que contienen los métodos exactos para neutralizar y derrotar a cada miembro de la Liga de la Justicia si se volvieran corruptos.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'JLA: La Torre de Babel',
        'Mark Waid & Howard Porter',
        createDefaultMangaPanels(
          'JLA: La Torre de Babel',
          'Mark Waid & Howard Porter',
          'Ra’s al Ghul roba los archivos secretos de Batman que contienen los métodos exactos para neutralizar y derrotar a cada miembro de la Liga de la Justicia si se volvieran corruptos.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-arkham-asylum',
    title: 'Batman: Arkham Asylum (Una Casa Seria)',
    author: 'Grant Morrison & Dave McKean',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Novela Gráfica Psicológica / Simbolismo',
    totalPages: 10,
    year: 1989,
    description: 'Los pacientes de Arkham toman el control del manicomio en el día de los inocentes y exigen que Batman ingrese en solitario, cruzando un laberinto de pesadillas freudianas.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: Arkham Asylum (Una Casa Seria)',
        'Grant Morrison & Dave McKean',
        createDefaultMangaPanels(
          'Batman: Arkham Asylum (Una Casa Seria)',
          'Grant Morrison & Dave McKean',
          'Los pacientes de Arkham toman el control del manicomio en el día de los inocentes y exigen que Batman ingrese en solitario, cruzando un laberinto de pesadillas freudianas.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-white-knight',
    title: 'Batman: Caballero Blanco',
    author: 'Sean Murphy',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC Black Label / El Joker Cuerdo',
    totalPages: 10,
    year: 2017,
    description: 'Tras recuperar la cordura gracias a un medicamento, Jack Napier utiliza la política y los medios para exponer a Batman como el verdadero criminal que destruye Gotham City.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: Caballero Blanco',
        'Sean Murphy',
        createDefaultMangaPanels(
          'Batman: Caballero Blanco',
          'Sean Murphy',
          'Tras recuperar la cordura gracias a un medicamento, Jack Napier utiliza la política y los medios para exponer a Batman como el verdadero criminal que destruye Gotham City.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-three-jokers',
    title: 'Batman: Tres Jokers',
    author: 'Geoff Johns & Jason Fabok',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / El Criminal, el Payaso y el Comediante',
    totalPages: 10,
    year: 2020,
    description: 'Batman, Batgirl y Red Hood descubren que el Joker no es una sola persona, sino tres individuos distintos que han actuado coordinadamente desde las sombras.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: Tres Jokers',
        'Geoff Johns & Jason Fabok',
        createDefaultMangaPanels(
          'Batman: Tres Jokers',
          'Geoff Johns & Jason Fabok',
          'Batman, Batgirl y Red Hood descubren que el Joker no es una sola persona, sino tres individuos distintos que han actuado coordinadamente desde las sombras.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-swamp-thing',
    title: 'La Saga de la Cosa del Pantano (Lección de Anatomía)',
    author: 'Alan Moore',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Vertigo / Terror Ecológico & Poesía',
    totalPages: 10,
    year: 1984,
    description: 'La autopsia del doctor Woodrue revela una verdad devastadora: la criatura no es el científico Alec Holland convertido en planta, sino un ser vegetal que soñaba que era un hombre.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'La Saga de la Cosa del Pantano (Lección de Anatomía)',
        'Alan Moore',
        createDefaultMangaPanels(
          'La Saga de la Cosa del Pantano (Lección de Anatomía)',
          'Alan Moore',
          'La autopsia del doctor Woodrue revela una verdad devastadora: la criatura no es el científico Alec Holland convertido en planta, sino un ser vegetal que soñaba que era un hombre.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-hellblazer',
    title: 'Hellblazer: Hábitos Peligrosos',
    author: 'Garth Ennis & Will Simpson',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Vertigo / Magia Urbana & Tabaco',
    totalPages: 10,
    year: 1991,
    description: 'John Constantine es diagnosticado con cáncer terminal de pulmón y engaña al mismísimo Diablo y a los señores del Infierno para salvar su alma de la condenación.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Hellblazer: Hábitos Peligrosos',
        'Garth Ennis & Will Simpson',
        createDefaultMangaPanels(
          'Hellblazer: Hábitos Peligrosos',
          'Garth Ennis & Will Simpson',
          'John Constantine es diagnosticado con cáncer terminal de pulmón y engaña al mismísimo Diablo y a los señores del Infierno para salvar su alma de la condenación.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-fables',
    title: 'Fábulas: Leyendas en el Exilio',
    author: 'Bill Willingham & Lan Medina',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Vertigo / Cuentos de Hadas en Manhattan',
    totalPages: 10,
    year: 2002,
    description: 'Los personajes de los cuentos clásicos viven exiliados en un barrio secreto de Nueva York, con Lobo Feroz como sheriff investigando el presunto asesinato de Blanca Nieves.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Fábulas: Leyendas en el Exilio',
        'Bill Willingham & Lan Medina',
        createDefaultMangaPanels(
          'Fábulas: Leyendas en el Exilio',
          'Bill Willingham & Lan Medina',
          'Los personajes de los cuentos clásicos viven exiliados en un barrio secreto de Nueva York, con Lobo Feroz como sheriff investigando el presunto asesinato de Blanca Nieves.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-100-bullets',
    title: '100 Balas',
    author: 'Brian Azzarello & Eduardo Risso',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Noir Puro / Venganza sin Rastro',
    totalPages: 10,
    year: 1999,
    description: 'El enigmático agente Graves entrega a personas agraviadas un maletín con una pistola no rastreable y 100 balas con inmunidad legal total para vengarse de sus enemigos.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        '100 Balas',
        'Brian Azzarello & Eduardo Risso',
        createDefaultMangaPanels(
          '100 Balas',
          'Brian Azzarello & Eduardo Risso',
          'El enigmático agente Graves entrega a personas agraviadas un maletín con una pistola no rastreable y 100 balas con inmunidad legal total para vengarse de sus enemigos.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-transmetropolitan',
    title: 'Transmetropolitan',
    author: 'Warren Ellis & Darick Robertson',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Cyberpunk Gonzo / Periodismo y Verdad',
    totalPages: 10,
    year: 1997,
    description: 'Spider Jerusalem, un mordaz periodista gonzo armado con su pluma y una máquina que causa diarrea a los políticos, combate la corrupción en una caótica megalópolis futurista.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Transmetropolitan',
        'Warren Ellis & Darick Robertson',
        createDefaultMangaPanels(
          'Transmetropolitan',
          'Warren Ellis & Darick Robertson',
          'Spider Jerusalem, un mordaz periodista gonzo armado con su pluma y una máquina que causa diarrea a los políticos, combate la corrupción en una caótica megalópolis futurista.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-scott-pilgrim',
    title: 'Scott Pilgrim contra el Mundo',
    author: 'Bryan Lee O’Malley',
    category: 'comics',
    format: 'cbz',
    genre: 'Novela Gráfica / Comedia / Videojuegos y Romance',
    totalPages: 10,
    year: 2004,
    description: 'Scott Pilgrim debe derrotar a los siete malvados exnovios de Ramona Flowers en combates estilo beat-em-up para poder salir con la chica de sus sueños en Toronto.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Scott Pilgrim contra el Mundo',
        'Bryan Lee O’Malley',
        createDefaultMangaPanels(
          'Scott Pilgrim contra el Mundo',
          'Bryan Lee O’Malley',
          'Scott Pilgrim debe derrotar a los siete malvados exnovios de Ramona Flowers en combates estilo beat-em-up para poder salir con la chica de sus sueños en Toronto.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-persepolis',
    title: 'Persépolis',
    author: 'Marjane Satrapi',
    category: 'comics',
    format: 'cbz',
    genre: 'Novela Gráfica Autobiográfica / Revolución Iraní',
    totalPages: 10,
    year: 2000,
    description: 'La infancia y juventud de Marjane en Teherán durante la Revolución Islámica de 1979 y la posterior guerra contra Irak, narrada con honestidad, ironía y coraje.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Persépolis',
        'Marjane Satrapi',
        createDefaultMangaPanels(
          'Persépolis',
          'Marjane Satrapi',
          'La infancia y juventud de Marjane en Teherán durante la Revolución Islámica de 1979 y la posterior guerra contra Irak, narrada con honestidad, ironía y coraje.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-blacksad',
    title: 'Blacksad: Un Lugar entre las Sombras',
    author: 'Juan Díaz Canales & Juanjo Guarnido',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic Europeo / Animales Antropomórficos / Noir Clásico',
    totalPages: 10,
    year: 2000,
    description: 'El detective privado John Blacksad investiga el asesinato de su antigua amante, la actriz Natalia Willford, en los bajos fondos del Nueva York de la posguerra con acuarelas soberbias.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Blacksad: Un Lugar entre las Sombras',
        'Juan Díaz Canales & Juanjo Guarnido',
        createDefaultMangaPanels(
          'Blacksad: Un Lugar entre las Sombras',
          'Juan Díaz Canales & Juanjo Guarnido',
          'El detective privado John Blacksad investiga el asesinato de su antigua amante, la actriz Natalia Willford, en los bajos fondos del Nueva York de la posguerra con acuarelas soberbias.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-el-eternauta',
    title: 'El Eternauta',
    author: 'Héctor Germán Oesterheld & Francisco Solano López',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic Argentino / Invasión Extraterrestre / Clásico',
    totalPages: 10,
    year: 1957,
    description: 'Una nevada mortal fosforescente cae sobre Buenos Aires como preludio de una invasión alienígena. Juan Salvo y sus vecinos combaten por sus vidas organizando la resistencia popular.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'El Eternauta',
        'Héctor Germán Oesterheld & Francisco Solano López',
        createDefaultMangaPanels(
          'El Eternauta',
          'Héctor Germán Oesterheld & Francisco Solano López',
          'Una nevada mortal fosforescente cae sobre Buenos Aires como preludio de una invasión alienígena. Juan Salvo y sus vecinos combaten por sus vidas organizando la resistencia popular.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-tintin-loto-azul',
    title: 'Las Aventuras de Tintín: El Loto Azul',
    author: 'Hergé',
    category: 'comics',
    format: 'cbz',
    genre: 'Ligne Claire / Aventura Histórica en Shanghái',
    totalPages: 10,
    year: 1936,
    description: 'El reportero belga Tintín y su fiel perro Milú viajan a China en 1931 para desmantelar una red de narcotráfico de opio y proteger a sus aliados de los invasores japoneses.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Las Aventuras de Tintín: El Loto Azul',
        'Hergé',
        createDefaultMangaPanels(
          'Las Aventuras de Tintín: El Loto Azul',
          'Hergé',
          'El reportero belga Tintín y su fiel perro Milú viajan a China en 1931 para desmantelar una red de narcotráfico de opio y proteger a sus aliados de los invasores japoneses.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-asterix-galo',
    title: 'Astérix el Galo',
    author: 'René Goscinny & Albert Uderzo',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic Francobelga / Humor & Poción Mágica',
    totalPages: 10,
    year: 1961,
    description: 'Estamos en el año 50 antes de Jesucristo. Toda la Galia está ocupada por los romanos... ¿Toda? ¡No! Una aldea poblada por irreductibles galos resiste todavía y siempre al invasor.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Astérix el Galo',
        'René Goscinny & Albert Uderzo',
        createDefaultMangaPanels(
          'Astérix el Galo',
          'René Goscinny & Albert Uderzo',
          'Estamos en el año 50 antes de Jesucristo. Toda la Galia está ocupada por los romanos... ¿Toda? ¡No! Una aldea poblada por irreductibles galos resiste todavía y siempre al invasor.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-mortadelo-sulfato',
    title: 'Mortadelo y Filemón: El Sulfato Atómico',
    author: 'Francisco Ibáñez',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic Español / Humor Bruguera / Espías de la T.I.A.',
    totalPages: 10,
    year: 1969,
    description: 'Los agentes secretos más chapuceros de la T.I.A. viajan a la tiránica república de Tirania para recuperar un insecticida del profesor Bacterio que agranda a las plagas.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Mortadelo y Filemón: El Sulfato Atómico',
        'Francisco Ibáñez',
        createDefaultMangaPanels(
          'Mortadelo y Filemón: El Sulfato Atómico',
          'Francisco Ibáñez',
          'Los agentes secretos más chapuceros de la T.I.A. viajan a la tiránica república de Tirania para recuperar un insecticida del profesor Bacterio que agranda a las plagas.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-fantastic-four-galactus',
    title: 'Los Cuatro Fantásticos: La Llegada de Galactus',
    author: 'Stan Lee & Jack Kirby',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Amenaza Cósmica',
    totalPages: 10,
    year: 1966,
    description: 'El heraldo Silver Surfer llega a los cielos de Manhattan anunciando el arribo del devorador de mundos Galactus, obligando a Reed Richards a usar el Nulificador Supremo.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Los Cuatro Fantásticos: La Llegada de Galactus',
        'Stan Lee & Jack Kirby',
        createDefaultMangaPanels(
          'Los Cuatro Fantásticos: La Llegada de Galactus',
          'Stan Lee & Jack Kirby',
          'El heraldo Silver Surfer llega a los cielos de Manhattan anunciando el arribo del devorador de mundos Galactus, obligando a Reed Richards a usar el Nulificador Supremo.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-iron-man-demon-bottle',
    title: 'Iron Man: El Demonio en una Botella',
    author: 'David Michelinie & Bob Layton',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Drama y Alcoholismo',
    totalPages: 10,
    year: 1979,
    description: 'Tony Stark enfrenta el sabotaje corporativo de Justin Hammer mientras cae en una destructiva espiral de alcoholismo que amenaza su empresa, sus amigos y su propia armadura.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Iron Man: El Demonio en una Botella',
        'David Michelinie & Bob Layton',
        createDefaultMangaPanels(
          'Iron Man: El Demonio en una Botella',
          'David Michelinie & Bob Layton',
          'Tony Stark enfrenta el sabotaje corporativo de Justin Hammer mientras cae en una destructiva espiral de alcoholismo que amenaza su empresa, sus amigos y su propia armadura.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-planet-hulk',
    title: 'Hulk: Planeta Hulk',
    author: 'Greg Pak & Carlo Pagulayan',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Gladiador en Sakaar',
    totalPages: 10,
    year: 2006,
    description: 'Los Illuminati traicionan a Hulk enviándolo al espacio profundo. Aterriza en el brutal planeta Sakaar, convirtiéndose en gladiador esclavo hasta liderar una rebelión contra el Rey Rojo.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Hulk: Planeta Hulk',
        'Greg Pak & Carlo Pagulayan',
        createDefaultMangaPanels(
          'Hulk: Planeta Hulk',
          'Greg Pak & Carlo Pagulayan',
          'Los Illuminati traicionan a Hulk enviándolo al espacio profundo. Aterriza en el brutal planeta Sakaar, convirtiéndose en gladiador esclavo hasta liderar una rebelión contra el Rey Rojo.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-world-war-hulk',
    title: 'Hulk: World War Hulk',
    author: 'Greg Pak & John Romita Jr.',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Venganza Masiva',
    totalPages: 10,
    year: 2007,
    description: 'Con el corazón roto tras la destrucción de su nuevo hogar, el Rey Hulk regresa a la Tierra al frente de su armada extraterrestre para aplastar a Iron Man, Mr. Fantástico y los Vengadores.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Hulk: World War Hulk',
        'Greg Pak & John Romita Jr.',
        createDefaultMangaPanels(
          'Hulk: World War Hulk',
          'Greg Pak & John Romita Jr.',
          'Con el corazón roto tras la destrucción de su nuevo hogar, el Rey Hulk regresa a la Tierra al frente de su armada extraterrestre para aplastar a Iron Man, Mr. Fantástico y los Vengadores.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-house-of-m',
    title: 'Dinastía de M (House of M)',
    author: 'Brian Michael Bendis & Olivier Coipel',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / No Más Mutantes',
    totalPages: 10,
    year: 2005,
    description: 'La Bruja Escarlata altera la realidad para crear un mundo utópico gobernado por Magneto y la especie mutante, culminando con el susurro más devastador: «No más mutantes».',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Dinastía de M (House of M)',
        'Brian Michael Bendis & Olivier Coipel',
        createDefaultMangaPanels(
          'Dinastía de M (House of M)',
          'Brian Michael Bendis & Olivier Coipel',
          'La Bruja Escarlata altera la realidad para crear un mundo utópico gobernado por Magneto y la especie mutante, culminando con el susurro más devastador: «No más mutantes».',
          'comics'
        )
      ),
  },
  {
    id: 'cat-secret-invasion',
    title: 'Secret Invasion (Invasión Secreta)',
    author: 'Brian Michael Bendis & Leinil Francis Yu',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Paranoia & Skrulls',
    totalPages: 10,
    year: 2008,
    description: 'Los Skrulls metamorfos se han infiltrado en todos los niveles del gobierno y de los equipos de superhéroes reemplazando a amigos por dobles: ¿En quién puedes confiar?',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Secret Invasion (Invasión Secreta)',
        'Brian Michael Bendis & Leinil Francis Yu',
        createDefaultMangaPanels(
          'Secret Invasion (Invasión Secreta)',
          'Brian Michael Bendis & Leinil Francis Yu',
          'Los Skrulls metamorfos se han infiltrado en todos los niveles del gobierno y de los equipos de superhéroes reemplazando a amigos por dobles: ¿En quién puedes confiar?',
          'comics'
        )
      ),
  },
  {
    id: 'cat-ultimate-spiderman',
    title: 'Ultimate Spider-Man: Poder y Responsabilidad',
    author: 'Brian Michael Bendis & Mark Bagley',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / El Renacimiento del Siglo XXI',
    totalPages: 10,
    year: 2000,
    description: 'Una reimaginación moderna y fresca de los orígenes de Peter Parker en el siglo XXI, enfrentando la intimidación escolar, la ciencia corporativa de Oscorp y el despertar heroico.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Ultimate Spider-Man: Poder y Responsabilidad',
        'Brian Michael Bendis & Mark Bagley',
        createDefaultMangaPanels(
          'Ultimate Spider-Man: Poder y Responsabilidad',
          'Brian Michael Bendis & Mark Bagley',
          'Una reimaginación moderna y fresca de los orígenes de Peter Parker en el siglo XXI, enfrentando la intimidación escolar, la ciencia corporativa de Oscorp y el despertar heroico.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-gwen-stacy-death',
    title: 'Spider-Man: La Noche en que Murió Gwen Stacy',
    author: 'Gerry Conway & Gil Kane',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Fin de la Era de la Inocencia',
    totalPages: 10,
    year: 1973,
    description: 'El Duende Verde arroja a Gwen Stacy desde lo alto del puente George Washington. La red de Peter Parker la atrapa a centímetros del agua, con un sonido que partió la historia en dos.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Spider-Man: La Noche en que Murió Gwen Stacy',
        'Gerry Conway & Gil Kane',
        createDefaultMangaPanels(
          'Spider-Man: La Noche en que Murió Gwen Stacy',
          'Gerry Conway & Gil Kane',
          'El Duende Verde arroja a Gwen Stacy desde lo alto del puente George Washington. La red de Peter Parker la atrapa a centímetros del agua, con un sonido que partió la historia en dos.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-spider-verse',
    title: 'Spider-Verse: Universo Spiderman',
    author: 'Dan Slott & Olivier Coipel',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Multiverso Arácnido',
    totalPages: 10,
    year: 2014,
    description: 'Los Herederos cazan a los tótems arácnidos de todas las dimensiones del multiverso. Spider-Men y Spider-Women de todas las realidades deben formar un ejército para sobrevivir.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Spider-Verse: Universo Spiderman',
        'Dan Slott & Olivier Coipel',
        createDefaultMangaPanels(
          'Spider-Verse: Universo Spiderman',
          'Dan Slott & Olivier Coipel',
          'Los Herederos cazan a los tótems arácnidos de todas las dimensiones del multiverso. Spider-Men y Spider-Women de todas las realidades deben formar un ejército para sobrevivir.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-moon-knight-dead',
    title: 'Moon Knight: De entre los Muertos',
    author: 'Warren Ellis & Declan Shalvey',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / El Caballero Luna de Traje Blanco',
    totalPages: 10,
    year: 2014,
    description: 'Marc Spector patrulla la noche de Nueva York vestido con un impecable traje blanco de tres piezas, actuando como el puño vengador y el protector de los viajeros del dios egipcio Khonshu.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Moon Knight: De entre los Muertos',
        'Warren Ellis & Declan Shalvey',
        createDefaultMangaPanels(
          'Moon Knight: De entre los Muertos',
          'Warren Ellis & Declan Shalvey',
          'Marc Spector patrulla la noche de Nueva York vestido con un impecable traje blanco de tres piezas, actuando como el puño vengador y el protector de los viajeros del dios egipcio Khonshu.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-deadpool-kills-marvel',
    title: 'Deadpool Mata al Universo Marvel',
    author: 'Cullen Bunn & Dalibor Talajić',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Masacre Metanarrativa',
    totalPages: 10,
    year: 2012,
    description: 'Tras una sesión de terapia que quiebra sus barreras mentales, Wade Wilson comprende que todos son personajes ficticios atrapados en viñetas y decide aniquilar a cada héroe y villano.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Deadpool Mata al Universo Marvel',
        'Cullen Bunn & Dalibor Talajić',
        createDefaultMangaPanels(
          'Deadpool Mata al Universo Marvel',
          'Cullen Bunn & Dalibor Talajić',
          'Tras una sesión de terapia que quiebra sus barreras mentales, Wade Wilson comprende que todos son personajes ficticios atrapados en viñetas y decide aniquilar a cada héroe y villano.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-vision-tom-king',
    title: 'The Vision (La Visión)',
    author: 'Tom King & Gabriel Hernández Walta',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Tragedia Suburbana & Sintetizoides',
    totalPages: 10,
    year: 2015,
    description: 'La Visión construye una familia sintética de androides en los suburbios de Washington para vivir el sueño americano, pero un secreto enterrado en el jardín marchita la ilusión.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Vision (La Visión)',
        'Tom King & Gabriel Hernández Walta',
        createDefaultMangaPanels(
          'The Vision (La Visión)',
          'Tom King & Gabriel Hernández Walta',
          'La Visión construye una familia sintética de androides en los suburbios de Washington para vivir el sueño americano, pero un secreto enterrado en el jardín marchita la ilusión.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-mister-miracle',
    title: 'Mister Miracle (Señor Milagro)',
    author: 'Tom King & Mitch Gerads',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Los Nuevos Dioses y la Depresión',
    totalPages: 10,
    year: 2017,
    description: 'Scott Free es el mayor escapista del universo: escapó del orfanato infernal de Apokolips. Sin embargo, ahora enfrenta la trampa más asfixiante de todas: su propia mente y la ecuación de la antivida.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Mister Miracle (Señor Milagro)',
        'Tom King & Mitch Gerads',
        createDefaultMangaPanels(
          'Mister Miracle (Señor Milagro)',
          'Tom King & Mitch Gerads',
          'Scott Free es el mayor escapista del universo: escapó del orfanato infernal de Apokolips. Sin embargo, ahora enfrenta la trampa más asfixiante de todas: su propia mente y la ecuación de la antivida.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-paper-girls',
    title: 'Paper Girls',
    author: 'Brian K. Vaughan & Cliff Chiang',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Image / Aventura Ochentera & Viajes en el Tiempo',
    totalPages: 10,
    year: 2015,
    description: 'En la madrugada de Halloween de 1988, cuatro chicas repartidoras de periódicos de 12 años se ven envueltas en una guerra interdimensional entre viajeros temporales.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Paper Girls',
        'Brian K. Vaughan & Cliff Chiang',
        createDefaultMangaPanels(
          'Paper Girls',
          'Brian K. Vaughan & Cliff Chiang',
          'En la madrugada de Halloween de 1988, cuatro chicas repartidoras de periódicos de 12 años se ven envueltas en una guerra interdimensional entre viajeros temporales.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-east-of-west',
    title: 'East of West',
    author: 'Jonathan Hickman & Nick Dragotta',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Sci-Fi Western / Los Cuatro Jinetes del Apocalipsis',
    totalPages: 10,
    year: 2013,
    description: 'En una América distópica fragmentada en siete naciones, Muerte abandona su deber apocalíptico para buscar a su esposa e hijo robados, desatando una guerra entre profecías.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'East of West',
        'Jonathan Hickman & Nick Dragotta',
        createDefaultMangaPanels(
          'East of West',
          'Jonathan Hickman & Nick Dragotta',
          'En una América distópica fragmentada en siete naciones, Muerte abandona su deber apocalíptico para buscar a su esposa e hijo robados, desatando una guerra entre profecías.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-monstress',
    title: 'Monstress',
    author: 'Marjorie Liu & Sana Takeda',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Fantasía Oscura / Arte Decó & Monstruos Arcanos',
    totalPages: 10,
    year: 2015,
    description: 'Maika Halfwolf es una adolescente arcánica que sobrevive a una guerra cataclísmica y alberga en el muñón de su brazo izquierdo a un dios primigenio voraz de poder incalculable.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Monstress',
        'Marjorie Liu & Sana Takeda',
        createDefaultMangaPanels(
          'Monstress',
          'Marjorie Liu & Sana Takeda',
          'Maika Halfwolf es una adolescente arcánica que sobrevive a una guerra cataclísmica y alberga en el muñón de su brazo izquierdo a un dios primigenio voraz de poder incalculable.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-descender',
    title: 'Descender',
    author: 'Jeff Lemire & Dustin Nguyen',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Space Opera / El Pequeño Robot TIM-21',
    totalPages: 10,
    year: 2015,
    description: 'Colosales robots aniquilan civilizaciones enteras y las máquinas son cazadas en la galaxia. El pequeño robot de compañía TIM-21 guarda en su código el secreto de los invasores.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Descender',
        'Jeff Lemire & Dustin Nguyen',
        createDefaultMangaPanels(
          'Descender',
          'Jeff Lemire & Dustin Nguyen',
          'Colosales robots aniquilan civilizaciones enteras y las máquinas son cazadas en la galaxia. El pequeño robot de compañía TIM-21 guarda en su código el secreto de los invasores.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-sweet-tooth',
    title: 'Sweet Tooth',
    author: 'Jeff Lemire',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Postapocalíptico / Niños Híbridos Animales',
    totalPages: 10,
    year: 2009,
    description: 'Gus es un niño híbrido con cornamenta de ciervo que vive oculto en un bosque tras una pandemia letal. Tras la muerte de su padre, viaja con un cazador taciturno hacia la Reserva.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Sweet Tooth',
        'Jeff Lemire',
        createDefaultMangaPanels(
          'Sweet Tooth',
          'Jeff Lemire',
          'Gus es un niño híbrido con cornamenta de ciervo que vive oculto en un bosque tras una pandemia letal. Tras la muerte de su padre, viaja con un cazador taciturno hacia la Reserva.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-deadly-class',
    title: 'Deadly Class',
    author: 'Rick Remender & Wes Craig',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Acción / Escuela de Asesinos en los 80',
    totalPages: 10,
    year: 2014,
    description: 'Marcus López, un adolescente huérfano y sin hogar en San Francisco en 1987, es reclutado en la Escuela Kings Dominion de Artes Mortales donde los hijos de jefes criminales aprenden a matar.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Deadly Class',
        'Rick Remender & Wes Craig',
        createDefaultMangaPanels(
          'Deadly Class',
          'Rick Remender & Wes Craig',
          'Marcus López, un adolescente huérfano y sin hogar en San Francisco en 1987, es reclutado en la Escuela Kings Dominion de Artes Mortales donde los hijos de jefes criminales aprenden a matar.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-black-science',
    title: 'Black Science',
    author: 'Rick Remender & Matteo Scalera',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Multiverso Pulp / El Pilar Anarquista',
    totalPages: 10,
    year: 2013,
    description: 'Grant McKay y su equipo de científicos anarquistas saltan entre infinitas realidades paralelas con el Pilar, un motor interdimensional saboteado que salta al azar sin rumbo fijo.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Black Science',
        'Rick Remender & Matteo Scalera',
        createDefaultMangaPanels(
          'Black Science',
          'Rick Remender & Matteo Scalera',
          'Grant McKay y su equipo de científicos anarquistas saltan entre infinitas realidades paralelas con el Pilar, un motor interdimensional saboteado que salta al azar sin rumbo fijo.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-chew',
    title: 'Chew: Gusto por la Justicia',
    author: 'John Layman & Rob Guillory',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Comedia Policíaca / Cibopatía & Pollo Prohibido',
    totalPages: 10,
    year: 2009,
    description: 'Tony Chu es un detective con habilidades cibopáticas: recibe impresiones psíquicas de todo lo que come, resolviendo crímenes bizarros en un mundo donde la carne de pollo es ilegal.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Chew: Gusto por la Justicia',
        'John Layman & Rob Guillory',
        createDefaultMangaPanels(
          'Chew: Gusto por la Justicia',
          'John Layman & Rob Guillory',
          'Tony Chu es un detective con habilidades cibopáticas: recibe impresiones psíquicas de todo lo que come, resolviendo crímenes bizarros en un mundo donde la carne de pollo es ilegal.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-gideon-falls',
    title: 'Gideon Falls',
    author: 'Jeff Lemire & Andrea Sorrentino',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Terror Psicológico / El Granero Negro',
    totalPages: 10,
    year: 2018,
    description: 'Un joven solitario que busca pistas en la basura de la ciudad y un sacerdote recién llegado a un pueblo rural se ven vinculados por la misteriosa leyenda del Granero Negro.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Gideon Falls',
        'Jeff Lemire & Andrea Sorrentino',
        createDefaultMangaPanels(
          'Gideon Falls',
          'Jeff Lemire & Andrea Sorrentino',
          'Un joven solitario que busca pistas en la basura de la ciudad y un sacerdote recién llegado a un pueblo rural se ven vinculados por la misteriosa leyenda del Granero Negro.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-justice-league-new52',
    title: 'Liga de la Justicia: Origen',
    author: 'Geoff Johns & Jim Lee',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / La Primera Invasión de Darkseid',
    totalPages: 10,
    year: 2011,
    description: 'Batman, Green Lantern, Superman, Flash, Wonder Woman, Cyborg y Aquaman se conocen por primera vez para detener la invasión planetaria de los parademonios de Apokolips.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Liga de la Justicia: Origen',
        'Geoff Johns & Jim Lee',
        createDefaultMangaPanels(
          'Liga de la Justicia: Origen',
          'Geoff Johns & Jim Lee',
          'Batman, Green Lantern, Superman, Flash, Wonder Woman, Cyborg y Aquaman se conocen por primera vez para detener la invasión planetaria de los parademonios de Apokolips.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-batman-under-the-red-hood',
    title: 'Batman: Bajo la Capucha Roja',
    author: 'Judd Winick & Doug Mahnke',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / El Retorno de Jason Todd',
    totalPages: 10,
    year: 2005,
    description: 'Un nuevo vigilante despiadado llamado Red Hood asume el control del tráfico de drogas en Gotham, desafiando a Batman con un conocimiento íntimo de sus secretos.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: Bajo la Capucha Roja',
        'Judd Winick & Doug Mahnke',
        createDefaultMangaPanels(
          'Batman: Bajo la Capucha Roja',
          'Judd Winick & Doug Mahnke',
          'Un nuevo vigilante despiadado llamado Red Hood asume el control del tráfico de drogas en Gotham, desafiando a Batman con un conocimiento íntimo de sus secretos.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-superman-birthright',
    title: 'Superman: Legado (Birthright)',
    author: 'Mark Waid & Leinil Francis Yu',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Los Primeros Días del Héroe',
    totalPages: 10,
    year: 2003,
    description: 'Clark Kent recorre el mundo como periodista novato descubriendo las injusticias de la humanidad antes de ponerse la capa y llegar a Metrópolis para enfrentar a Lex Luthor.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Superman: Legado (Birthright)',
        'Mark Waid & Leinil Francis Yu',
        createDefaultMangaPanels(
          'Superman: Legado (Birthright)',
          'Mark Waid & Leinil Francis Yu',
          'Clark Kent recorre el mundo como periodista novato descubriendo las injusticias de la humanidad antes de ponerse la capa y llegar a Metrópolis para enfrentar a Lex Luthor.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-green-lantern-rebirth',
    title: 'Green Lantern: Renacimiento',
    author: 'Geoff Johns & Ethan Van Sciver',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / El Regreso de Hal Jordan',
    totalPages: 10,
    year: 2004,
    description: 'Hal Jordan se redime de su caída como Parallax, revelando que la impureza amarilla era la entidad cósmica del miedo sellada en la Batería Central de Oa.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Green Lantern: Renacimiento',
        'Geoff Johns & Ethan Van Sciver',
        createDefaultMangaPanels(
          'Green Lantern: Renacimiento',
          'Geoff Johns & Ethan Van Sciver',
          'Hal Jordan se redime de su caída como Parallax, revelando que la impureza amarilla era la entidad cósmica del miedo sellada en la Batería Central de Oa.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-captain-america-death',
    title: 'La Muerte del Capitán América',
    author: 'Ed Brubaker & Steve Epting',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / El Asesinato de un Símbolo',
    totalPages: 10,
    year: 2007,
    description: 'En las escalinatas del tribunal tras la Guerra Civil, Steve Rogers es acribillado por francotiradores bajo el control mental de Cráneo Rojo, dejando a la nación en luto.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'La Muerte del Capitán América',
        'Ed Brubaker & Steve Epting',
        createDefaultMangaPanels(
          'La Muerte del Capitán América',
          'Ed Brubaker & Steve Epting',
          'En las escalinatas del tribunal tras la Guerra Civil, Steve Rogers es acribillado por francotiradores bajo el control mental de Cráneo Rojo, dejando a la nación en luto.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-wolverine-enemy-state',
    title: 'Wolverine: Enemigo del Estado',
    author: 'Mark Millar & John Romita Jr.',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Lobezno Lavado de Cerebro',
    totalPages: 10,
    year: 2004,
    description: 'La Mano y Hydra capturan a Wolverine y le lavan el cerebro, utilizándolo como un arma asesina imparable contra sus propios compañeros de los X-Men y los Vengadores.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Wolverine: Enemigo del Estado',
        'Mark Millar & John Romita Jr.',
        createDefaultMangaPanels(
          'Wolverine: Enemigo del Estado',
          'Mark Millar & John Romita Jr.',
          'La Mano y Hydra capturan a Wolverine y le lavan el cerebro, utilizándolo como un arma asesina imparable contra sus propios compañeros de los X-Men y los Vengadores.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-thor-god-butcher',
    title: 'Thor: El Carnicero de Dioses',
    author: 'Jason Aaron & Esad Ribić',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Gorr y la Necroespada',
    totalPages: 10,
    year: 2012,
    description: 'A través de tres épocas (el joven dios vikingo, el Vengador presente y el Rey anciano del fin de los tiempos), Thor persigue a Gorr, un mortal juramentado a exterminar a todos los dioses.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Thor: El Carnicero de Dioses',
        'Jason Aaron & Esad Ribić',
        createDefaultMangaPanels(
          'Thor: El Carnicero de Dioses',
          'Jason Aaron & Esad Ribić',
          'A través de tres épocas (el joven dios vikingo, el Vengador presente y el Rey anciano del fin de los tiempos), Thor persigue a Gorr, un mortal juramentado a exterminar a todos los dioses.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-punisher-max-born',
    title: 'The Punisher: Nacimiento (Born)',
    author: 'Garth Ennis & Darick Robertson',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel MAX / Guerra de Vietnam',
    totalPages: 10,
    year: 2003,
    description: 'En la base remota de Valley Forge en 1971, el capitán Frank Castle defiende un puesto aislado contra oleadas del Vietcong, sellando un pacto interno con la muerte.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'The Punisher: Nacimiento (Born)',
        'Garth Ennis & Darick Robertson',
        createDefaultMangaPanels(
          'The Punisher: Nacimiento (Born)',
          'Garth Ennis & Darick Robertson',
          'En la base remota de Valley Forge en 1971, el capitán Frank Castle defiende un puesto aislado contra oleadas del Vietcong, sellando un pacto interno con la muerte.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-doctor-strange-the-oath',
    title: 'Doctor Strange: El Juramento',
    author: 'Brian K. Vaughan & Marcos Martín',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Magia Médica y Amistad',
    totalPages: 10,
    year: 2006,
    description: 'El hechicero supremo Stephen Strange emprende la búsqueda de una pócima mágica capaz de curar el cáncer terminal de su fiel sirviente y amigo Wong.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Doctor Strange: El Juramento',
        'Brian K. Vaughan & Marcos Martín',
        createDefaultMangaPanels(
          'Doctor Strange: El Juramento',
          'Brian K. Vaughan & Marcos Martín',
          'El hechicero supremo Stephen Strange emprende la búsqueda de una pócima mágica capaz de curar el cáncer terminal de su fiel sirviente y amigo Wong.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-avengers-disassembled',
    title: 'Vengadores Desunidos',
    author: 'Brian Michael Bendis & David Finch',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / El Peor Día de los Héroes',
    totalPages: 10,
    year: 2004,
    description: 'Jack de Corazones explota en la mansión, Iron Man sufre un ataque de furia y Visión estrella un quinjet: una fuerza interna devastadora destruye a los Vengadores desde dentro.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Vengadores Desunidos',
        'Brian Michael Bendis & David Finch',
        createDefaultMangaPanels(
          'Vengadores Desunidos',
          'Brian Michael Bendis & David Finch',
          'Jack de Corazones explota en la mansión, Iron Man sufre un ataque de furia y Visión estrella un quinjet: una fuerza interna devastadora destruye a los Vengadores desde dentro.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-black-panther-nation',
    title: 'Pantera Negra: Una Nación Bajo Nuestros Pies',
    author: 'Ta-Nehisi Coates & Brian Stelfreeze',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Monarquía y Revolución en Wakanda',
    totalPages: 10,
    year: 2016,
    description: 'T’Challa enfrenta disturbios sociales y rebeliones filosóficas en Wakanda mientras un grupo de guerreras de medianoche desafía la legitimidad de la corona de la Pantera.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Pantera Negra: Una Nación Bajo Nuestros Pies',
        'Ta-Nehisi Coates & Brian Stelfreeze',
        createDefaultMangaPanels(
          'Pantera Negra: Una Nación Bajo Nuestros Pies',
          'Ta-Nehisi Coates & Brian Stelfreeze',
          'T’Challa enfrenta disturbios sociales y rebeliones filosóficas en Wakanda mientras un grupo de guerreras de medianoche desafía la legitimidad de la corona de la Pantera.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-secret-war-bendis',
    title: 'Secret War (Guerra Secreta)',
    author: 'Brian Michael Bendis & Gabriele Dell’Otto',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Operación Clandestina en Latveria',
    totalPages: 10,
    year: 2004,
    description: 'Nick Fury organiza una invasión no autorizada con Spider-Man, Lobezno, Capitán América y Daredevil para derrocar al gobierno de Latveria, borrándoles los recuerdos de la misión.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Secret War (Guerra Secreta)',
        'Brian Michael Bendis & Gabriele Dell’Otto',
        createDefaultMangaPanels(
          'Secret War (Guerra Secreta)',
          'Brian Michael Bendis & Gabriele Dell’Otto',
          'Nick Fury organiza una invasión no autorizada con Spider-Man, Lobezno, Capitán América y Daredevil para derrocar al gobierno de Latveria, borrándoles los recuerdos de la misión.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-flash-rebirth',
    title: 'Flash: Renacimiento',
    author: 'Geoff Johns & Ethan Van Sciver',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / La Fuerza de la Velocidad',
    totalPages: 10,
    year: 2009,
    description: 'Barry Allen regresa de la muerte para descubrir que el Flash Reverso (Eobard Thawne) ha alterado cada tragedia de su vida viajando hacia atrás en la Speed Force.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Flash: Renacimiento',
        'Geoff Johns & Ethan Van Sciver',
        createDefaultMangaPanels(
          'Flash: Renacimiento',
          'Geoff Johns & Ethan Van Sciver',
          'Barry Allen regresa de la muerte para descubrir que el Flash Reverso (Eobard Thawne) ha alterado cada tragedia de su vida viajando hacia atrás en la Speed Force.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-spawn-resurrection',
    title: 'Spawn: Armageddon',
    author: 'David Hine & Philip Tan',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Image / La Batalla Final entre Cielo e Infierno',
    totalPages: 10,
    year: 2006,
    description: 'Las fuerzas del Cielo y del Infierno desatan el juicio final en las calles de Nueva York. Al Simmons utiliza el poder del Hombre de los Milagros para recrear la Tierra.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Spawn: Armageddon',
        'David Hine & Philip Tan',
        createDefaultMangaPanels(
          'Spawn: Armageddon',
          'David Hine & Philip Tan',
          'Las fuerzas del Cielo y del Infierno desatan el juicio final en las calles de Nueva York. Al Simmons utiliza el poder del Hombre de los Milagros para recrear la Tierra.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-nemesis',
    title: 'Nemesis',
    author: 'Mark Millar & Steve McNiven',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Icon / ¿Y si Batman fuera el Joker?',
    totalPages: 10,
    year: 2010,
    description: '¿Qué pasaría si el hombre más rico, inteligente y entrenado del mundo fuera un supervillano sociópata vestido de blanco? Nemesis aterroriza a los mejores policías del planeta.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Nemesis',
        'Mark Millar & Steve McNiven',
        createDefaultMangaPanels(
          'Nemesis',
          'Mark Millar & Steve McNiven',
          '¿Qué pasaría si el hombre más rico, inteligente y entrenado del mundo fuera un supervillano sociópata vestido de blanco? Nemesis aterroriza a los mejores policías del planeta.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-kick-ass',
    title: 'Kick-Ass',
    author: 'Mark Millar & John Romita Jr.',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Icon / Héroes del Mundo Real',
    totalPages: 10,
    year: 2008,
    description: 'Dave Lizewski, un adolescente común fanático de los cómics, compra un traje de buceo verde por internet y sale a patrullar las calles de Nueva York recibiendo brutales golpizas.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Kick-Ass',
        'Mark Millar & John Romita Jr.',
        createDefaultMangaPanels(
          'Kick-Ass',
          'Mark Millar & John Romita Jr.',
          'Dave Lizewski, un adolescente común fanático de los cómics, compra un traje de buceo verde por internet y sale a patrullar las calles de Nueva York recibiendo brutales golpizas.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-silver-surfer-requiem',
    title: 'Silver Surfer: Réquiem',
    author: 'J. Michael Straczynski & Esad Ribić',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / Poesía Cósmica y Mortalidad',
    totalPages: 10,
    year: 2007,
    description: 'Norrin Radd descubre que su piel plateada se está deteriorando y le quedan pocas semanas de vida, emprendiendo un viaje final de despedida hacia su planeta natal Zenn-La.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Silver Surfer: Réquiem',
        'J. Michael Straczynski & Esad Ribić',
        createDefaultMangaPanels(
          'Silver Surfer: Réquiem',
          'J. Michael Straczynski & Esad Ribić',
          'Norrin Radd descubre que su piel plateada se está deteriorando y le quedan pocas semanas de vida, emprendiendo un viaje final de despedida hacia su planeta natal Zenn-La.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-astonishing-x-men',
    title: 'Astonishing X-Men: El Don',
    author: 'Joss Whedon & John Cassaday',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / La Cura Mutante',
    totalPages: 10,
    year: 2004,
    description: 'La doctora Kavita Rao anuncia una cura genética definitiva para el gen X. Cíclope, Emma Frost, Lobezno y Kitty Pryde enfrentan el dilema moral de la identidad mutante.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Astonishing X-Men: El Don',
        'Joss Whedon & John Cassaday',
        createDefaultMangaPanels(
          'Astonishing X-Men: El Don',
          'Joss Whedon & John Cassaday',
          'La doctora Kavita Rao anuncia una cura genética definitiva para el gen X. Cíclope, Emma Frost, Lobezno y Kitty Pryde enfrentan el dilema moral de la identidad mutante.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-batman-black-mirror',
    title: 'Batman: Espejo Negro',
    author: 'Scott Snyder & Jock',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / DC / Dick Grayson como Batman',
    totalPages: 10,
    year: 2011,
    description: 'Mientras Bruce Wayne viaja fundando Batman Inc., Dick Grayson asume el manto del murciélago en Gotham, enfrentando a criminales que reflejan la corrupción oscura de la ciudad.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Batman: Espejo Negro',
        'Scott Snyder & Jock',
        createDefaultMangaPanels(
          'Batman: Espejo Negro',
          'Scott Snyder & Jock',
          'Mientras Bruce Wayne viaja fundando Batman Inc., Dick Grayson asume el manto del murciélago en Gotham, enfrentando a criminales que reflejan la corrupción oscura de la ciudad.',
          'comics'
        )
      ),
  },
  {
    id: 'cat-daredevil-yellow',
    title: 'Daredevil: Yellow',
    author: 'Jeph Loeb & Tim Sale',
    category: 'comics',
    format: 'cbz',
    genre: 'Cómic / Marvel / El Traje Amarillo y Karen',
    totalPages: 10,
    year: 2001,
    description: 'Matt Murdock escribe cartas póstumas a su difunta amada Karen Page, recordando los primeros días en que vestía el traje amarillo y rojo en memoria de su padre boxeador.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'CÓMIC EN ESPAÑOL',
    createFile: () =>
      generateMangaCbz(
        'Daredevil: Yellow',
        'Jeph Loeb & Tim Sale',
        createDefaultMangaPanels(
          'Daredevil: Yellow',
          'Jeph Loeb & Tim Sale',
          'Matt Murdock escribe cartas póstumas a su difunta amada Karen Page, recordando los primeros días en que vestía el traje amarillo y rojo en memoria de su padre boxeador.',
          'comics'
        )
      ),
  },
];
