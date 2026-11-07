import type { CatalogItem } from './types';
import { generateBookFile, createDefaultBookChapters } from './generators';

export const BOOKS_CATALOG: CatalogItem[] = [
  {
    id: 'cat-quijote',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Clásico Universal / Sátira',
    totalPages: 863,
    year: 1605,
    description: 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, un hidalgo enloquecido por los libros de caballerías sale en busca de aventuras junto a su fiel escudero Sancho Panza.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'Don Quijote de la Mancha',
        'Miguel de Cervantes',
        createDefaultBookChapters(
          'Don Quijote de la Mancha',
          'Miguel de Cervantes',
          'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, un hidalgo enloquecido por los libros de caballerías sale en busca de aventuras junto a su fiel escudero Sancho Panza.'
        )
      ),
  },
  {
    id: 'cat-soledad',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Realismo Mágico / Obra Cumbre',
    totalPages: 471,
    year: 1967,
    description: 'Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo en el mítico pueblo de Macondo.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Cien Años de Soledad',
        'Gabriel García Márquez',
        createDefaultBookChapters(
          'Cien Años de Soledad',
          'Gabriel García Márquez',
          'Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo en el mítico pueblo de Macondo.'
        )
      ),
  },
  {
    id: 'cat-metamorfosis',
    title: 'La Metamorfosis',
    author: 'Franz Kafka',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Ficción Existencialista',
    totalPages: 128,
    year: 1915,
    description: 'Al despertar Gregorio Samsa una mañana, tras un sueño intranquilo, se encontró sobre su cama convertido en un monstruoso insecto.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Metamorfosis',
        'Franz Kafka',
        createDefaultBookChapters(
          'La Metamorfosis',
          'Franz Kafka',
          'Al despertar Gregorio Samsa una mañana, tras un sueño intranquilo, se encontró sobre su cama convertido en un monstruoso insecto.'
        )
      ),
  },
  {
    id: 'cat-principito',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    category: 'libros',
    format: 'epub',
    genre: 'Fábula Filosófica / Clásico Universal',
    totalPages: 96,
    year: 1943,
    description: 'Pido perdón a los niños por haber dedicado este libro a una persona grande. Solo con el corazón se puede ver bien; lo esencial es invisible para los ojos.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Principito',
        'Antoine de Saint-Exupéry',
        createDefaultBookChapters(
          'El Principito',
          'Antoine de Saint-Exupéry',
          'Pido perdón a los niños por haber dedicado este libro a una persona grande. Solo con el corazón se puede ver bien; lo esencial es invisible para los ojos.'
        )
      ),
  },
  {
    id: 'cat-arte-guerra',
    title: 'El Arte de la Guerra',
    author: 'Sun Tzu',
    category: 'libros',
    format: 'epub',
    genre: 'Tratado Militar / Filosofía Clásica',
    totalPages: 112,
    year: -500,
    description: 'El arte supremo de la guerra es someter al enemigo sin luchar. Conoce a tu enemigo y conócete a ti mismo y saldrás victorioso en mil batallas.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Arte de la Guerra',
        'Sun Tzu',
        createDefaultBookChapters(
          'El Arte de la Guerra',
          'Sun Tzu',
          'El arte supremo de la guerra es someter al enemigo sin luchar. Conoce a tu enemigo y conócete a ti mismo y saldrás victorioso en mil batallas.'
        )
      ),
  },
  {
    id: 'cat-frankenstein',
    title: 'Frankenstein o el Moderno Prometeo',
    author: 'Mary Shelley',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Gótica / Ciencia Ficción',
    totalPages: 280,
    year: 1818,
    description: 'El doctor Víctor Frankenstein desafía las leyes naturales creando una criatura viva a partir de restos humanos, desatando una tragedia de rechazo y venganza.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Frankenstein o el Moderno Prometeo',
        'Mary Shelley',
        createDefaultBookChapters(
          'Frankenstein o el Moderno Prometeo',
          'Mary Shelley',
          'El doctor Víctor Frankenstein desafía las leyes naturales creando una criatura viva a partir de restos humanos, desatando una tragedia de rechazo y venganza.'
        )
      ),
  },
  {
    id: 'cat-dorian-gray',
    title: 'El Retrato de Dorian Gray',
    author: 'Oscar Wilde',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Filosófica / Decadentismo',
    totalPages: 254,
    year: 1890,
    description: 'Un joven de extraordinaria belleza desea que su retrato pinte el envejecimiento y la corrupción de su alma mientras él conserva la eterna juventud.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Retrato de Dorian Gray',
        'Oscar Wilde',
        createDefaultBookChapters(
          'El Retrato de Dorian Gray',
          'Oscar Wilde',
          'Un joven de extraordinaria belleza desea que su retrato pinte el envejecimiento y la corrupción de su alma mientras él conserva la eterna juventud.'
        )
      ),
  },
  {
    id: 'cat-dracula',
    title: 'Drácula',
    author: 'Bram Stoker',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Gótica / Terror Clásico',
    totalPages: 418,
    year: 1897,
    description: 'El abogado Jonathan Harker viaja a los Cárpatos para asesorar al conde Drácula, descubriendo un terror milenario que se dispone a invadir las calles de Londres.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Drácula',
        'Bram Stoker',
        createDefaultBookChapters(
          'Drácula',
          'Bram Stoker',
          'El abogado Jonathan Harker viaja a los Cárpatos para asesorar al conde Drácula, descubriendo un terror milenario que se dispone a invadir las calles de Londres.'
        )
      ),
  },
  {
    id: 'cat-holmes-escarlata',
    title: 'Estudio en Escarlata',
    author: 'Arthur Conan Doyle',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Policíaca / Detectives',
    totalPages: 188,
    year: 1887,
    description: 'El doctor John H. Watson conoce al excéntrico consultor Sherlock Holmes en el 221B de Baker Street, resolviendo su primer crimen con la ciencia de la deducción.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Estudio en Escarlata',
        'Arthur Conan Doyle',
        createDefaultBookChapters(
          'Estudio en Escarlata',
          'Arthur Conan Doyle',
          'El doctor John H. Watson conoce al excéntrico consultor Sherlock Holmes en el 221B de Baker Street, resolviendo su primer crimen con la ciencia de la deducción.'
        )
      ),
  },
  {
    id: 'cat-divina-comedia',
    title: 'La Divina Comedia',
    author: 'Dante Alighieri',
    category: 'libros',
    format: 'epub',
    genre: 'Poema Épico / Clásico Medieval',
    totalPages: 580,
    year: 1320,
    description: 'En medio del camino de nuestra vida, me encontré en una selva oscura. Guiado por Virgilio y Beatriz, Dante recorre el Infierno, el Purgatorio y el Paraíso.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Divina Comedia',
        'Dante Alighieri',
        createDefaultBookChapters(
          'La Divina Comedia',
          'Dante Alighieri',
          'En medio del camino de nuestra vida, me encontré en una selva oscura. Guiado por Virgilio y Beatriz, Dante recorre el Infierno, el Purgatorio y el Paraíso.'
        )
      ),
  },
  {
    id: 'cat-cuentos-poe',
    title: 'El Cuervo y Cuentos Macabros',
    author: 'Edgar Allan Poe',
    category: 'libros',
    format: 'epub',
    genre: 'Relatos de Terror / Suspenso Gótico',
    totalPages: 220,
    year: 1845,
    description: 'Colección de obras maestras del misterio: El corazón delator, El gato negro, La caída de la casa Usher y el legendario poema El Cuervo.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'El Cuervo y Cuentos Macabros',
        'Edgar Allan Poe',
        createDefaultBookChapters(
          'El Cuervo y Cuentos Macabros',
          'Edgar Allan Poe',
          'Colección de obras maestras del misterio: El corazón delator, El gato negro, La caída de la casa Usher y el legendario poema El Cuervo.'
        )
      ),
  },
  {
    id: 'cat-odisea',
    title: 'La Odisea',
    author: 'Homero',
    category: 'libros',
    format: 'epub',
    genre: 'Epopeya Griega / Clásico Mitológico',
    totalPages: 448,
    year: -800,
    description: 'El regreso de Odiseo a Ítaca tras la Guerra de Troya, sorteando la cólera de Poseidón, cíclopes, sirenas y hechiceras para reencontrarse con Penélope.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Odisea',
        'Homero',
        createDefaultBookChapters(
          'La Odisea',
          'Homero',
          'El regreso de Odiseo a Ítaca tras la Guerra de Troya, sorteando la cólera de Poseidón, cíclopes, sirenas y hechiceras para reencontrarse con Penélope.'
        )
      ),
  },
  {
    id: 'cat-crimen-castigo',
    title: 'Crimen y Castigo',
    author: 'Fiódor Dostoyevski',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Psicológica / Realismo Ruso',
    totalPages: 671,
    year: 1866,
    description: 'El estudiante Raskólnikov asesina a una vieja usurera creyéndose superior a la moral ordinaria, pero la culpa y el remordimiento devoran su mente en San Petersburgo.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Crimen y Castigo',
        'Fiódor Dostoyevski',
        createDefaultBookChapters(
          'Crimen y Castigo',
          'Fiódor Dostoyevski',
          'El estudiante Raskólnikov asesina a una vieja usurera creyéndose superior a la moral ordinaria, pero la culpa y el remordimiento devoran su mente en San Petersburgo.'
        )
      ),
  },
  {
    id: 'cat-1984',
    title: '1984',
    author: 'George Orwell',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Distopía / Obra Clásica Universal',
    totalPages: 326,
    year: 1949,
    description: 'En Oceanía, el Partido y el Gran Hermano controlan cada pensamiento a través de la telepantalla. Winston Smith comete el peor crimen: pensar por sí mismo y amar.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        '1984',
        'George Orwell',
        createDefaultBookChapters(
          '1984',
          'George Orwell',
          'En Oceanía, el Partido y el Gran Hermano controlan cada pensamiento a través de la telepantalla. Winston Smith comete el peor crimen: pensar por sí mismo y amar.'
        )
      ),
  },
  {
    id: 'cat-un-mundo-feliz',
    title: 'Un Mundo Feliz',
    author: 'Aldous Huxley',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Ciencia Ficción / Distopía Filosófica',
    totalPages: 280,
    year: 1932,
    description: 'En un mundo donde el dolor ha sido erradicado mediante acondicionamiento genético y soma, la estabilidad social reina a costa del arte y los sentimientos humanos.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Un Mundo Feliz',
        'Aldous Huxley',
        createDefaultBookChapters(
          'Un Mundo Feliz',
          'Aldous Huxley',
          'En un mundo donde el dolor ha sido erradicado mediante acondicionamiento genético y soma, la estabilidad social reina a costa del arte y los sentimientos humanos.'
        )
      ),
  },
  {
    id: 'cat-gran-gatsby',
    title: 'El Gran Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Clásico Americano / Romance & Drama',
    totalPages: 210,
    year: 1925,
    description: 'En los dorados años veinte en Long Island, el millonario Jay Gatsby organiza fiestas fastuosas con la única esperanza de reconquistar a su amor de juventud.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Gran Gatsby',
        'F. Scott Fitzgerald',
        createDefaultBookChapters(
          'El Gran Gatsby',
          'F. Scott Fitzgerald',
          'En los dorados años veinte en Long Island, el millonario Jay Gatsby organiza fiestas fastuosas con la única esperanza de reconquistar a su amor de juventud.'
        )
      ),
  },
  {
    id: 'cat-pedro-paramo',
    title: 'Pedro Páramo',
    author: 'Juan Rulfo',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Realismo Mágico / Clásico Mexicano',
    totalPages: 132,
    year: 1955,
    description: 'Vine a Comala porque me dijeron que acá vivía mi padre, un tal Pedro Páramo. Un viaje espectral a un pueblo donde murmuran las ánimas de los difuntos.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Pedro Páramo',
        'Juan Rulfo',
        createDefaultBookChapters(
          'Pedro Páramo',
          'Juan Rulfo',
          'Vine a Comala porque me dijeron que acá vivía mi padre, un tal Pedro Páramo. Un viaje espectral a un pueblo donde murmuran las ánimas de los difuntos.'
        )
      ),
  },
  {
    id: 'cat-rayuela',
    title: 'Rayuela',
    author: 'Julio Cortázar',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Boom Latinoamericano / Contranovela',
    totalPages: 640,
    year: 1963,
    description: '¿Encontraría a la Maga? Las andanzas bohemias de Horacio Oliveira entre París y Buenos Aires en una novela que puede leerse de múltiples formas.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Rayuela',
        'Julio Cortázar',
        createDefaultBookChapters(
          'Rayuela',
          'Julio Cortázar',
          '¿Encontraría a la Maga? Las andanzas bohemias de Horacio Oliveira entre París y Buenos Aires en una novela que puede leerse de múltiples formas.'
        )
      ),
  },
  {
    id: 'cat-miserables',
    title: 'Los Miserables',
    author: 'Víctor Hugo',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Histórica / Romanticismo Francés',
    totalPages: 1200,
    year: 1862,
    description: 'La redención del exconvicto Jean Valjean en la Francia convulsa del siglo XIX, perseguido implacablemente por el inflexible inspector Javert.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Los Miserables',
        'Víctor Hugo',
        createDefaultBookChapters(
          'Los Miserables',
          'Víctor Hugo',
          'La redención del exconvicto Jean Valjean en la Francia convulsa del siglo XIX, perseguido implacablemente por el inflexible inspector Javert.'
        )
      ),
  },
  {
    id: 'cat-montecristo',
    title: 'El Conde de Montecristo',
    author: 'Alejandro Dumas',
    category: 'libros',
    format: 'epub',
    genre: 'Novela de Aventuras / Venganza y Justicia',
    totalPages: 1100,
    year: 1844,
    description: 'Traicionado y encarcelado injustamente en el Castillo de If, Edmond Dantès escapa para reclamar un tesoro legendario y ejecutar una fría y calculada venganza.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Conde de Montecristo',
        'Alejandro Dumas',
        createDefaultBookChapters(
          'El Conde de Montecristo',
          'Alejandro Dumas',
          'Traicionado y encarcelado injustamente en el Castillo de If, Edmond Dantès escapa para reclamar un tesoro legendario y ejecutar una fría y calculada venganza.'
        )
      ),
  },
  {
    id: 'cat-orgullo-prejuicio',
    title: 'Orgullo y Prejuicio',
    author: 'Jane Austen',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Romántica / Costumbrismo',
    totalPages: 416,
    year: 1813,
    description: 'Elizabeth Bennet y el altivo señor Darcy deben superar sus prejuicios de clase y su propio orgullo para admitir el profundo amor que los une.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'Orgullo y Prejuicio',
        'Jane Austen',
        createDefaultBookChapters(
          'Orgullo y Prejuicio',
          'Jane Austen',
          'Elizabeth Bennet y el altivo señor Darcy deben superar sus prejuicios de clase y su propio orgullo para admitir el profundo amor que los une.'
        )
      ),
  },
  {
    id: 'cat-ficciones',
    title: 'Ficciones',
    author: 'Jorge Luis Borges',
    category: 'libros',
    format: 'epub',
    genre: 'Cuentos / Laberintos / Metaficción',
    totalPages: 214,
    year: 1944,
    description: 'La biblioteca de Babel, El jardín de senderos que se bifurcan, Tlön, Uqbar, Orbis Tertius y las creaciones filosóficas más asombrosas de la literatura en español.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Ficciones',
        'Jorge Luis Borges',
        createDefaultBookChapters(
          'Ficciones',
          'Jorge Luis Borges',
          'La biblioteca de Babel, El jardín de senderos que se bifurcan, Tlön, Uqbar, Orbis Tertius y las creaciones filosóficas más asombrosas de la literatura en español.'
        )
      ),
  },
  {
    id: 'cat-aleph',
    title: 'El Aleph',
    author: 'Jorge Luis Borges',
    category: 'libros',
    format: 'epub',
    genre: 'Cuentos Filosóficos / Literatura Fantástica',
    totalPages: 208,
    year: 1949,
    description: 'En el sótano de una vieja casa en la calle Garay se encuentra el Aleph: el punto que contiene todos los puntos del universo vistos simultáneamente.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Aleph',
        'Jorge Luis Borges',
        createDefaultBookChapters(
          'El Aleph',
          'Jorge Luis Borges',
          'En el sótano de una vieja casa en la calle Garay se encuentra el Aleph: el punto que contiene todos los puntos del universo vistos simultáneamente.'
        )
      ),
  },
  {
    id: 'cat-tunel',
    title: 'El Túnel',
    author: 'Ernesto Sabato',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Psicológica / Existencialismo',
    totalPages: 158,
    year: 1948,
    description: 'El pintor Juan Pablo Castel confiesa desde prisión el asesinato de María Iribarne, la única persona que pareció comprender el oscuro túnel de su soledad.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Túnel',
        'Ernesto Sabato',
        createDefaultBookChapters(
          'El Túnel',
          'Ernesto Sabato',
          'El pintor Juan Pablo Castel confiesa desde prisión el asesinato de María Iribarne, la única persona que pareció comprender el oscuro túnel de su soledad.'
        )
      ),
  },
  {
    id: 'cat-ceguera',
    title: 'Ensayo sobre la Ceguera',
    author: 'José Saramago',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Distopía / Alegoría Humana',
    totalPages: 384,
    year: 1995,
    description: 'Una misteriosa epidemia de ceguera blanca azota a la sociedad, desnudando los instintos más ruines y la compasión más pura de la naturaleza humana.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Ensayo sobre la Ceguera',
        'José Saramago',
        createDefaultBookChapters(
          'Ensayo sobre la Ceguera',
          'José Saramago',
          'Una misteriosa epidemia de ceguera blanca azota a la sociedad, desnudando los instintos más ruines y la compasión más pura de la naturaleza humana.'
        )
      ),
  },
  {
    id: 'cat-cronica-muerte',
    title: 'Crónica de una Muerte Anunciada',
    author: 'Gabriel García Márquez',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Periodismo Mágico',
    totalPages: 156,
    year: 1981,
    description: 'El día en que lo iban a matar, Santiago Nasar se levantó a las 5:30 de la mañana. Todo el pueblo sabía del crimen de honor, pero nadie lo impidió.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Crónica de una Muerte Anunciada',
        'Gabriel García Márquez',
        createDefaultBookChapters(
          'Crónica de una Muerte Anunciada',
          'Gabriel García Márquez',
          'El día en que lo iban a matar, Santiago Nasar se levantó a las 5:30 de la mañana. Todo el pueblo sabía del crimen de honor, pero nadie lo impidió.'
        )
      ),
  },
  {
    id: 'cat-amor-colera',
    title: 'El Amor en los Tiempos del Cólera',
    author: 'Gabriel García Márquez',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Romance Épico',
    totalPages: 490,
    year: 1985,
    description: 'Florentino Ariza espera más de cincuenta años y nueve meses por Fermina Daza, demostrando que el amor es tan invencible como una peste.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Amor en los Tiempos del Cólera',
        'Gabriel García Márquez',
        createDefaultBookChapters(
          'El Amor en los Tiempos del Cólera',
          'Gabriel García Márquez',
          'Florentino Ariza espera más de cincuenta años y nueve meses por Fermina Daza, demostrando que el amor es tan invencible como una peste.'
        )
      ),
  },
  {
    id: 'cat-iliada',
    title: 'La Ilíada',
    author: 'Homero',
    category: 'libros',
    format: 'epub',
    genre: 'Epopeya Griega / Clásico Bélico',
    totalPages: 512,
    year: -800,
    description: 'Canta, oh diosa, la cólera del pélida Aquiles: la batalla entre griegos y troyanos ante las murallas de Ilión con la intervención de los dioses del Olimpo.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Ilíada',
        'Homero',
        createDefaultBookChapters(
          'La Ilíada',
          'Homero',
          'Canta, oh diosa, la cólera del pélida Aquiles: la batalla entre griegos y troyanos ante las murallas de Ilión con la intervención de los dioses del Olimpo.'
        )
      ),
  },
  {
    id: 'cat-rebelion-granja',
    title: 'La Rebelión en la Granja',
    author: 'George Orwell',
    category: 'libros',
    format: 'epub',
    genre: 'Fábula Política / Sátira Totalitaria',
    totalPages: 144,
    year: 1945,
    description: 'Los animales de la Granja Solar se rebelan contra la tiranía humana, pero pronto los cerdos imponen su propia dictadura: todos los animales son iguales, pero algunos más que otros.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Rebelión en la Granja',
        'George Orwell',
        createDefaultBookChapters(
          'La Rebelión en la Granja',
          'George Orwell',
          'Los animales de la Granja Solar se rebelan contra la tiranía humana, pero pronto los cerdos imponen su propia dictadura: todos los animales son iguales, pero algunos más que otros.'
        )
      ),
  },
  {
    id: 'cat-fahrenheit-451',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    category: 'libros',
    format: 'epub',
    genre: 'Ciencia Ficción / Distopía Literaria',
    totalPages: 224,
    year: 1953,
    description: 'Guy Montag es un bombero cuya misión no es apagar fuegos, sino quemar libros prohibidos, hasta que una joven despierta en él la llama de la curiosidad.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Fahrenheit 451',
        'Ray Bradbury',
        createDefaultBookChapters(
          'Fahrenheit 451',
          'Ray Bradbury',
          'Guy Montag es un bombero cuya misión no es apagar fuegos, sino quemar libros prohibidos, hasta que una joven despierta en él la llama de la curiosidad.'
        )
      ),
  },
  {
    id: 'cat-flores-mal',
    title: 'Las Flores del Mal',
    author: 'Charles Baudelaire',
    category: 'libros',
    format: 'epub',
    genre: 'Poesía / Simbolismo Francés',
    totalPages: 240,
    year: 1857,
    description: 'La obra maestra poética que desentrañó el spleen y el ideal de la vida moderna en el París bohemio del siglo XIX.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'Las Flores del Mal',
        'Charles Baudelaire',
        createDefaultBookChapters(
          'Las Flores del Mal',
          'Charles Baudelaire',
          'La obra maestra poética que desentrañó el spleen y el ideal de la vida moderna en el París bohemio del siglo XIX.'
        )
      ),
  },
  {
    id: 'cat-madame-bovary',
    title: 'Madame Bovary',
    author: 'Gustave Flaubert',
    category: 'libros',
    format: 'epub',
    genre: 'Realismo Francés / Tragedia Social',
    totalPages: 440,
    year: 1856,
    description: 'Emma Bovary, consumida por el tedio conyugal y sus lecturas románticas, busca desesperadamente la pasión a través de amantes e ilusiones de lujo.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Madame Bovary',
        'Gustave Flaubert',
        createDefaultBookChapters(
          'Madame Bovary',
          'Gustave Flaubert',
          'Emma Bovary, consumida por el tedio conyugal y sus lecturas románticas, busca desesperadamente la pasión a través de amantes e ilusiones de lujo.'
        )
      ),
  },
  {
    id: 'cat-la-peste',
    title: 'La Peste',
    author: 'Albert Camus',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Filosófica / Existencialismo',
    totalPages: 308,
    year: 1947,
    description: 'En la ciudad argelina de Orán estalla un brote letal de peste bubónica. El doctor Rieux y un puñado de hombres deciden luchar contra el absurdo de la muerte.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Peste',
        'Albert Camus',
        createDefaultBookChapters(
          'La Peste',
          'Albert Camus',
          'En la ciudad argelina de Orán estalla un brote letal de peste bubónica. El doctor Rieux y un puñado de hombres deciden luchar contra el absurdo de la muerte.'
        )
      ),
  },
  {
    id: 'cat-el-extranjero',
    title: 'El Extranjero',
    author: 'Albert Camus',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Filosófica / Absurdismo',
    totalPages: 160,
    year: 1942,
    description: 'Hoy mamá ha muerto. O tal vez ayer, no sé. Meursault asiste impertérrito a los eventos que lo llevarán ante la justicia bajo el sol abrasador de Argel.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Extranjero',
        'Albert Camus',
        createDefaultBookChapters(
          'El Extranjero',
          'Albert Camus',
          'Hoy mamá ha muerto. O tal vez ayer, no sé. Meursault asiste impertérrito a los eventos que lo llevarán ante la justicia bajo el sol abrasador de Argel.'
        )
      ),
  },
  {
    id: 'cat-guerra-paz',
    title: 'Guerra y Paz',
    author: 'León Tolstói',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Histórica / Realismo Ruso',
    totalPages: 1300,
    year: 1869,
    description: 'El colosal retrato de la sociedad aristocrática rusa entrelazado con las sangrientas guerras napoleónicas y la invasión de 1812.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Guerra y Paz',
        'León Tolstói',
        createDefaultBookChapters(
          'Guerra y Paz',
          'León Tolstói',
          'El colosal retrato de la sociedad aristocrática rusa entrelazado con las sangrientas guerras napoleónicas y la invasión de 1812.'
        )
      ),
  },
  {
    id: 'cat-anna-karenina',
    title: 'Anna Karénina',
    author: 'León Tolstói',
    category: 'libros',
    format: 'epub',
    genre: 'Realismo Ruso / Tragedia Conyugal',
    totalPages: 864,
    year: 1877,
    description: 'Todas las familias felices se parecen entre sí; cada familia desdichada lo es a su manera. La apasionada y trágica historia de amor entre Anna y Vronsky.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Anna Karénina',
        'León Tolstói',
        createDefaultBookChapters(
          'Anna Karénina',
          'León Tolstói',
          'Todas las familias felices se parecen entre sí; cada familia desdichada lo es a su manera. La apasionada y trágica historia de amor entre Anna y Vronsky.'
        )
      ),
  },
  {
    id: 'cat-guardian-centeno',
    title: 'El Guardián entre el Centeno',
    author: 'J.D. Salinger',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Juventud y Desencanto',
    totalPages: 240,
    year: 1951,
    description: 'Expulsado de su colegio, el adolescente Holden Caulfield deambula durante dos días por Nueva York enfrentando la falsedad del mundo adulto.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Guardián entre el Centeno',
        'J.D. Salinger',
        createDefaultBookChapters(
          'El Guardián entre el Centeno',
          'J.D. Salinger',
          'Expulsado de su colegio, el adolescente Holden Caulfield deambula durante dos días por Nueva York enfrentando la falsedad del mundo adulto.'
        )
      ),
  },
  {
    id: 'cat-grandes-esperanzas',
    title: 'Grandes Esperanzas',
    author: 'Charles Dickens',
    category: 'libros',
    format: 'epub',
    genre: 'Novela de Aprendizaje / Clásico Victoriano',
    totalPages: 540,
    year: 1861,
    description: 'El huérfano Pip recibe una misteriosa fortuna que transforma su vida, cruzando su destino con la amargada señorita Havisham y la fría Estella.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Grandes Esperanzas',
        'Charles Dickens',
        createDefaultBookChapters(
          'Grandes Esperanzas',
          'Charles Dickens',
          'El huérfano Pip recibe una misteriosa fortuna que transforma su vida, cruzando su destino con la amargada señorita Havisham y la fría Estella.'
        )
      ),
  },
  {
    id: 'cat-cancion-navidad',
    title: 'Canción de Navidad',
    author: 'Charles Dickens',
    category: 'libros',
    format: 'epub',
    genre: 'Cuento Moral / Fantasía Navideña',
    totalPages: 128,
    year: 1843,
    description: 'El avaro Ebenezer Scrooge es visitado por los tres espíritus de la Navidad para mostrarle el pasado, el presente y el desolador futuro de su egoísmo.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Canción de Navidad',
        'Charles Dickens',
        createDefaultBookChapters(
          'Canción de Navidad',
          'Charles Dickens',
          'El avaro Ebenezer Scrooge es visitado por los tres espíritus de la Navidad para mostrarle el pasado, el presente y el desolador futuro de su egoísmo.'
        )
      ),
  },
  {
    id: 'cat-jane-eyre',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Gótica / Romance Victoriano',
    totalPages: 560,
    year: 1847,
    description: 'Una institutriz huérfana y de espíritu inquebrantable se enamora del enigmático señor Rochester en Thornfield Hall, donde un secreto acecha en el ático.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Jane Eyre',
        'Charlotte Brontë',
        createDefaultBookChapters(
          'Jane Eyre',
          'Charlotte Brontë',
          'Una institutriz huérfana y de espíritu inquebrantable se enamora del enigmático señor Rochester en Thornfield Hall, donde un secreto acecha en el ático.'
        )
      ),
  },
  {
    id: 'cat-cumbres-borrascosas',
    title: 'Cumbres Borrascosas',
    author: 'Emily Brontë',
    category: 'libros',
    format: 'epub',
    genre: 'Gótico / Pasión y Venganza',
    totalPages: 410,
    year: 1847,
    description: 'En los páramos desolados de Yorkshire, el amor obsesivo y salvaje entre Heathcliff y Catherine Earnshaw desata una tormenta de odios y rencores generacionales.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'Cumbres Borrascosas',
        'Emily Brontë',
        createDefaultBookChapters(
          'Cumbres Borrascosas',
          'Emily Brontë',
          'En los páramos desolados de Yorkshire, el amor obsesivo y salvaje entre Heathcliff y Catherine Earnshaw desata una tormenta de odios y rencores generacionales.'
        )
      ),
  },
  {
    id: 'cat-isla-tesoro',
    title: 'La Isla del Tesoro',
    author: 'Robert Louis Stevenson',
    category: 'libros',
    format: 'epub',
    genre: 'Novela de Piratas / Aventura Clásica',
    totalPages: 280,
    year: 1883,
    description: 'El joven Jim Hawkins encuentra el mapa del tesoro del capitán Flint y zarpa en la Hispaniola junto al carismático pirata Long John Silver.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Isla del Tesoro',
        'Robert Louis Stevenson',
        createDefaultBookChapters(
          'La Isla del Tesoro',
          'Robert Louis Stevenson',
          'El joven Jim Hawkins encuentra el mapa del tesoro del capitán Flint y zarpa en la Hispaniola junto al carismático pirata Long John Silver.'
        )
      ),
  },
  {
    id: 'cat-jekyll-hyde',
    title: 'El Extraño Caso del Dr. Jekyll y Mr. Hyde',
    author: 'Robert Louis Stevenson',
    category: 'libros',
    format: 'epub',
    genre: 'Terror Psicológico / Doble Personalidad',
    totalPages: 140,
    year: 1886,
    description: 'A través de un brebaje químico, un respetable médico londinense libera la encarnación pura de sus impulsos más malvados y violentos.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Extraño Caso del Dr. Jekyll y Mr. Hyde',
        'Robert Louis Stevenson',
        createDefaultBookChapters(
          'El Extraño Caso del Dr. Jekyll y Mr. Hyde',
          'Robert Louis Stevenson',
          'A través de un brebaje químico, un respetable médico londinense libera la encarnación pura de sus impulsos más malvados y violentos.'
        )
      ),
  },
  {
    id: 'cat-hermanos-karamazov',
    title: 'Los Hermanos Karamázov',
    author: 'Fiódor Dostoyevski',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Filosófica / Parricidio y Fe',
    totalPages: 980,
    year: 1880,
    description: 'La tormentosa relación entre el libertino Fiódor Pávlovich y sus cuatro hijos, donde se debaten la existencia de Dios, el libre albedrío y la culpa.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Los Hermanos Karamázov',
        'Fiódor Dostoyevski',
        createDefaultBookChapters(
          'Los Hermanos Karamázov',
          'Fiódor Dostoyevski',
          'La tormentosa relación entre el libertino Fiódor Pávlovich y sus cuatro hijos, donde se debaten la existencia de Dios, el libre albedrío y la culpa.'
        )
      ),
  },
  {
    id: 'cat-noches-blancas',
    title: 'Noches Blancas',
    author: 'Fiódor Dostoyevski',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Romántica Sentimental',
    totalPages: 110,
    year: 1848,
    description: 'Durante cuatro mágicas noches luminosas en San Petersburgo, un joven soñador y solitario traba amistad y se enamora de Nástenka en un puente del canal.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Noches Blancas',
        'Fiódor Dostoyevski',
        createDefaultBookChapters(
          'Noches Blancas',
          'Fiódor Dostoyevski',
          'Durante cuatro mágicas noches luminosas en San Petersburgo, un joven soñador y solitario traba amistad y se enamora de Nástenka en un puente del canal.'
        )
      ),
  },
  {
    id: 'cat-moby-dick',
    title: 'Moby Dick',
    author: 'Herman Melville',
    category: 'libros',
    format: 'epub',
    genre: 'Aventura Épica / Monomanía y Naturaleza',
    totalPages: 720,
    year: 1851,
    description: 'Llamadme Ismael. La trágica expedición del ballenero Pequod comandado por el capitán Ahab en su obsesiva cacería del gigantesco cachalote blanco.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Moby Dick',
        'Herman Melville',
        createDefaultBookChapters(
          'Moby Dick',
          'Herman Melville',
          'Llamadme Ismael. La trágica expedición del ballenero Pequod comandado por el capitán Ahab en su obsesiva cacería del gigantesco cachalote blanco.'
        )
      ),
  },
  {
    id: 'cat-robinson-crusoe',
    title: 'Robinson Crusoe',
    author: 'Daniel Defoe',
    category: 'libros',
    format: 'epub',
    genre: 'Novela de Supervivencia / Náufrago',
    totalPages: 340,
    year: 1719,
    description: 'Tras naufragar en una isla desierta en el Caribe, un marinero inglés sobrevive durante veintiocho años con su ingenio y la ayuda de Viernes.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Robinson Crusoe',
        'Daniel Defoe',
        createDefaultBookChapters(
          'Robinson Crusoe',
          'Daniel Defoe',
          'Tras naufragar en una isla desierta en el Caribe, un marinero inglés sobrevive durante veintiocho años con su ingenio y la ayuda de Viernes.'
        )
      ),
  },
  {
    id: 'cat-viajes-gulliver',
    title: 'Los Viajes de Gulliver',
    author: 'Jonathan Swift',
    category: 'libros',
    format: 'epub',
    genre: 'Sátira Política / Aventuras Fantásticas',
    totalPages: 360,
    year: 1726,
    description: 'Las extraordinarias travesías de Lemuel Gulliver a las tierras de Liliput, Brobdingnag, Laputa y el país de los virtuosos caballos Houyhnhnms.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Los Viajes de Gulliver',
        'Jonathan Swift',
        createDefaultBookChapters(
          'Los Viajes de Gulliver',
          'Jonathan Swift',
          'Las extraordinarias travesías de Lemuel Gulliver a las tierras de Liliput, Brobdingnag, Laputa y el país de los virtuosos caballos Houyhnhnms.'
        )
      ),
  },
  {
    id: 'cat-tom-sawyer',
    title: 'Las Aventuras de Tom Sawyer',
    author: 'Mark Twain',
    category: 'libros',
    format: 'epub',
    genre: 'Aventuras / Clásico Juvenil Americano',
    totalPages: 290,
    year: 1876,
    description: 'Las divertidas peripecias de Tom Sawyer y su amigo Huckleberry Finn a orillas del río Mississippi en un pintoresco pueblo de Misuri.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Las Aventuras de Tom Sawyer',
        'Mark Twain',
        createDefaultBookChapters(
          'Las Aventuras de Tom Sawyer',
          'Mark Twain',
          'Las divertidas peripecias de Tom Sawyer y su amigo Huckleberry Finn a orillas del río Mississippi en un pintoresco pueblo de Misuri.'
        )
      ),
  },
  {
    id: 'cat-huck-finn',
    title: 'Las Aventuras de Huckleberry Finn',
    author: 'Mark Twain',
    category: 'libros',
    format: 'epub',
    genre: 'Aventuras / Libertad y Sociedad',
    totalPages: 366,
    year: 1884,
    description: 'Huck escapa de su padre y desciende por el río Mississippi en una balsa junto al esclavo prófugo Jim, en un viaje fundamental sobre la libertad humana.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Las Aventuras de Huckleberry Finn',
        'Mark Twain',
        createDefaultBookChapters(
          'Las Aventuras de Huckleberry Finn',
          'Mark Twain',
          'Huck escapa de su padre y desciende por el río Mississippi en una balsa junto al esclavo prófugo Jim, en un viaje fundamental sobre la libertad humana.'
        )
      ),
  },
  {
    id: 'cat-el-alquimista',
    title: 'El Alquimista',
    author: 'Paulo Coelho',
    category: 'libros',
    format: 'epub',
    genre: 'Fábula Espiritual / Crecimiento Personal',
    totalPages: 192,
    year: 1988,
    description: 'Santiago, un joven pastor andaluz, emprende un viaje hacia las pirámides de Egipto en busca de un tesoro y de su propia Leyenda Personal.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'El Alquimista',
        'Paulo Coelho',
        createDefaultBookChapters(
          'El Alquimista',
          'Paulo Coelho',
          'Santiago, un joven pastor andaluz, emprende un viaje hacia las pirámides de Egipto en busca de un tesoro y de su propia Leyenda Personal.'
        )
      ),
  },
  {
    id: 'cat-veinte-mil-leguas',
    title: 'Veinte Mil Leguas de Viaje Submarino',
    author: 'Julio Verne',
    category: 'libros',
    format: 'epub',
    genre: 'Ciencia Ficción / Aventuras Marinas',
    totalPages: 480,
    year: 1870,
    description: 'El profesor Aronnax explora los fondos oceánicos a bordo del asombroso submarino Nautilus, capitaneado por el misterioso y rebelde Capitán Nemo.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Veinte Mil Leguas de Viaje Submarino',
        'Julio Verne',
        createDefaultBookChapters(
          'Veinte Mil Leguas de Viaje Submarino',
          'Julio Verne',
          'El profesor Aronnax explora los fondos oceánicos a bordo del asombroso submarino Nautilus, capitaneado por el misterioso y rebelde Capitán Nemo.'
        )
      ),
  },
  {
    id: 'cat-viaje-centro-tierra',
    title: 'Viaje al Centro de la Tierra',
    author: 'Julio Verne',
    category: 'libros',
    format: 'epub',
    genre: 'Ciencia Ficción / Exploración Fantástica',
    totalPages: 310,
    year: 1864,
    description: 'El profesor Lidenbrock, su sobrino Axel y el guía Hans descienden por el cráter de un volcán en Islandia para descubrir un mundo prehistórico subterráneo.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Viaje al Centro de la Tierra',
        'Julio Verne',
        createDefaultBookChapters(
          'Viaje al Centro de la Tierra',
          'Julio Verne',
          'El profesor Lidenbrock, su sobrino Axel y el guía Hans descienden por el cráter de un volcán en Islandia para descubrir un mundo prehistórico subterráneo.'
        )
      ),
  },
  {
    id: 'cat-vuelta-mundo-80-dias',
    title: 'La Vuelta al Mundo en Ochenta Días',
    author: 'Julio Verne',
    category: 'libros',
    format: 'epub',
    genre: 'Aventuras / Precisión y Geografía',
    totalPages: 270,
    year: 1872,
    description: 'El metódico caballero inglés Phileas Fogg y su leal criado Picaporte aceptan una osada apuesta del Reform Club para circunnavegar el globo terrestre.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Vuelta al Mundo en Ochenta Días',
        'Julio Verne',
        createDefaultBookChapters(
          'La Vuelta al Mundo en Ochenta Días',
          'Julio Verne',
          'El metódico caballero inglés Phileas Fogg y su leal criado Picaporte aceptan una osada apuesta del Reform Club para circunnavegar el globo terrestre.'
        )
      ),
  },
  {
    id: 'cat-siddhartha',
    title: 'Siddhartha',
    author: 'Hermann Hesse',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Filosófica / Espiritualidad Oriental',
    totalPages: 180,
    year: 1922,
    description: 'Un joven indio de casta noble abandona comodidades familiares para emprender la senda ascética de la iluminación, la verdad y la paz interior.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Siddhartha',
        'Hermann Hesse',
        createDefaultBookChapters(
          'Siddhartha',
          'Hermann Hesse',
          'Un joven indio de casta noble abandona comodidades familiares para emprender la senda ascética de la iluminación, la verdad y la paz interior.'
        )
      ),
  },
  {
    id: 'cat-lobo-estepario',
    title: 'El Lobo Estepario',
    author: 'Hermann Hesse',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Psicológica / Crisis Existencial',
    totalPages: 270,
    year: 1927,
    description: 'Harry Haller siente en su pecho el desgarro de dos naturalezas en pugna: el hombre civilizado y el lobo salvaje y huraño de la estepa.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Lobo Estepario',
        'Hermann Hesse',
        createDefaultBookChapters(
          'El Lobo Estepario',
          'Hermann Hesse',
          'Harry Haller siente en su pecho el desgarro de dos naturalezas en pugna: el hombre civilizado y el lobo salvaje y huraño de la estepa.'
        )
      ),
  },
  {
    id: 'cat-demian',
    title: 'Demian',
    author: 'Hermann Hesse',
    category: 'libros',
    format: 'epub',
    genre: 'Novela de Iniciación / Iluminación y Sombra',
    totalPages: 190,
    year: 1919,
    description: 'La historia de la juventud de Emil Sinclair y su amistad con Max Demian, un compañero que le enseña a romper el cascarón de las apariencias.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Demian',
        'Hermann Hesse',
        createDefaultBookChapters(
          'Demian',
          'Hermann Hesse',
          'La historia de la juventud de Emil Sinclair y su amistad con Max Demian, un compañero que le enseña a romper el cascarón de las apariencias.'
        )
      ),
  },
  {
    id: 'cat-nombre-rosa',
    title: 'El Nombre de la Rosa',
    author: 'Umberto Eco',
    category: 'libros',
    format: 'epub',
    genre: 'Misterio Histórico / Teología & Semiótica',
    totalPages: 620,
    year: 1980,
    description: 'En una abadía benedictina del norte de Italia en 1327, fray Guillermo de Baskerville investiga una serie de misteriosos asesinatos en torno a la biblioteca secreta.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Nombre de la Rosa',
        'Umberto Eco',
        createDefaultBookChapters(
          'El Nombre de la Rosa',
          'Umberto Eco',
          'En una abadía benedictina del norte de Italia en 1327, fray Guillermo de Baskerville investiga una serie de misteriosos asesinatos en torno a la biblioteca secreta.'
        )
      ),
  },
  {
    id: 'cat-casa-espiritus',
    title: 'La Casa de los Espíritus',
    author: 'Isabel Allende',
    category: 'libros',
    format: 'epub',
    genre: 'Saga Familiar / Realismo Mágico Chileno',
    totalPages: 490,
    year: 1982,
    description: 'La crónica de cuatro generaciones de la familia Trueba a través de las transformaciones políticas, las pasiones y los dones clarividentes de Clara del Valle.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Casa de los Espíritus',
        'Isabel Allende',
        createDefaultBookChapters(
          'La Casa de los Espíritus',
          'Isabel Allende',
          'La crónica de cuatro generaciones de la familia Trueba a través de las transformaciones políticas, las pasiones y los dones clarividentes de Clara del Valle.'
        )
      ),
  },
  {
    id: 'cat-dona-barbara',
    title: 'Doña Bárbara',
    author: 'Rómulo Gallegos',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Criollista / Civilización y Barbarie',
    totalPages: 360,
    year: 1929,
    description: 'En los llanos venezolanos, Santos Luzardo se enfrenta a la temible cacica doña Bárbara en una encarnizada lucha por la ley y la justicia.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Doña Bárbara',
        'Rómulo Gallegos',
        createDefaultBookChapters(
          'Doña Bárbara',
          'Rómulo Gallegos',
          'En los llanos venezolanos, Santos Luzardo se enfrenta a la temible cacica doña Bárbara en una encarnizada lucha por la ley y la justicia.'
        )
      ),
  },
  {
    id: 'cat-voragine',
    title: 'La Vorágine',
    author: 'José Eustasio Rivera',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Selvática / Caucho y Aventura',
    totalPages: 320,
    year: 1924,
    description: 'Jugué mi corazón al azar y me lo ganó la violencia. Arturo Cova se interna en los infiernos verdes de las selvas del Amazonas colombiano.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'La Vorágine',
        'José Eustasio Rivera',
        createDefaultBookChapters(
          'La Vorágine',
          'José Eustasio Rivera',
          'Jugué mi corazón al azar y me lo ganó la violencia. Arturo Cova se interna en los infiernos verdes de las selvas del Amazonas colombiano.'
        )
      ),
  },
  {
    id: 'cat-fiesta-chivo',
    title: 'La Fiesta del Chivo',
    author: 'Mario Vargas Llosa',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Histórica / Dictadura y Poder',
    totalPages: 520,
    year: 2000,
    description: 'Los últimos días del dictador dominicano Rafael Leónidas Trujillo y la conspiración heroica de los conjurados para ajustar cuentas con el tirano.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Fiesta del Chivo',
        'Mario Vargas Llosa',
        createDefaultBookChapters(
          'La Fiesta del Chivo',
          'Mario Vargas Llosa',
          'Los últimos días del dictador dominicano Rafael Leónidas Trujillo y la conspiración heroica de los conjurados para ajustar cuentas con el tirano.'
        )
      ),
  },
  {
    id: 'cat-ciudad-perros',
    title: 'La Ciudad y los Perros',
    author: 'Mario Vargas Llosa',
    category: 'libros',
    format: 'epub',
    genre: 'Novela de Aprendizaje / Realismo Urbano',
    totalPages: 440,
    year: 1963,
    description: 'La disciplina brutal y los códigos de supervivencia entre los cadetes del Colegio Militar Leoncio Prado de Lima en una de las obras cumbre del boom.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Ciudad y los Perros',
        'Mario Vargas Llosa',
        createDefaultBookChapters(
          'La Ciudad y los Perros',
          'Mario Vargas Llosa',
          'La disciplina brutal y los códigos de supervivencia entre los cadetes del Colegio Militar Leoncio Prado de Lima en una de las obras cumbre del boom.'
        )
      ),
  },
  {
    id: 'cat-niebla',
    title: 'Niebla',
    author: 'Miguel de Unamuno',
    category: 'libros',
    format: 'epub',
    genre: 'Nivola / Metaficción & Filosofía Existencial',
    totalPages: 240,
    year: 1914,
    description: 'Augusto Pérez se rebela contra su propio creador, Miguel de Unamuno, desafiando a su autor al proclamar que los personajes literarios son más inmortales que los hombres.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Niebla',
        'Miguel de Unamuno',
        createDefaultBookChapters(
          'Niebla',
          'Miguel de Unamuno',
          'Augusto Pérez se rebela contra su propio creador, Miguel de Unamuno, desafiando a su autor al proclamar que los personajes literarios son más inmortales que los hombres.'
        )
      ),
  },
  {
    id: 'cat-platero-yo',
    title: 'Platero y Yo',
    author: 'Juan Ramón Jiménez',
    category: 'libros',
    format: 'epub',
    genre: 'Prosa Poética / Clásico Español',
    totalPages: 160,
    year: 1914,
    description: 'Platero es pequeño, peludo, suave; tan blando por fuera, que se diría todo de algodón. Recuerdos tiernos y luminosos del pueblo andaluz de Moguer.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Platero y Yo',
        'Juan Ramón Jiménez',
        createDefaultBookChapters(
          'Platero y Yo',
          'Juan Ramón Jiménez',
          'Platero es pequeño, peludo, suave; tan blando por fuera, que se diría todo de algodón. Recuerdos tiernos y luminosos del pueblo andaluz de Moguer.'
        )
      ),
  },
  {
    id: 'cat-romancero-gitano',
    title: 'Romancero Gitano',
    author: 'Federico García Lorca',
    category: 'libros',
    format: 'epub',
    genre: 'Poesía Lírica / Simbolismo Andaluz',
    totalPages: 120,
    year: 1928,
    description: 'Verde que te quiero verde. Las pasiones, la tragedia, la luna y la Guardia Civil en los versos más memorables de la Generación del 27.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Romancero Gitano',
        'Federico García Lorca',
        createDefaultBookChapters(
          'Romancero Gitano',
          'Federico García Lorca',
          'Verde que te quiero verde. Las pasiones, la tragedia, la luna y la Guardia Civil en los versos más memorables de la Generación del 27.'
        )
      ),
  },
  {
    id: 'cat-bodas-sangre',
    title: 'Bodas de Sangre',
    author: 'Federico García Lorca',
    category: 'libros',
    format: 'epub',
    genre: 'Tragedia Teatral / Pasión y Destino',
    totalPages: 110,
    year: 1933,
    description: 'En el día de su boda, una novia huye a caballo con su antiguo amante Leonardo, desatando la venganza de sangre entre dos familias campesinas.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Bodas de Sangre',
        'Federico García Lorca',
        createDefaultBookChapters(
          'Bodas de Sangre',
          'Federico García Lorca',
          'En el día de su boda, una novia huye a caballo con su antiguo amante Leonardo, desatando la venganza de sangre entre dos familias campesinas.'
        )
      ),
  },
  {
    id: 'cat-casa-bernarda-alba',
    title: 'La Casa de Bernarda Alba',
    author: 'Federico García Lorca',
    category: 'libros',
    format: 'epub',
    genre: 'Drama Teatral / Luto y Represión',
    totalPages: 120,
    year: 1936,
    description: 'Tras enviudar, Bernarda Alba impone un luto asfixiante de ocho años a sus cinco hijas, encerradas entre muros blancos donde hierve el deseo insatisfecho.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Casa de Bernarda Alba',
        'Federico García Lorca',
        createDefaultBookChapters(
          'La Casa de Bernarda Alba',
          'Federico García Lorca',
          'Tras enviudar, Bernarda Alba impone un luto asfixiante de ocho años a sus cinco hijas, encerradas entre muros blancos donde hierve el deseo insatisfecho.'
        )
      ),
  },
  {
    id: 'cat-fantasma-opera',
    title: 'El Fantasma de la Ópera',
    author: 'Gastón Leroux',
    category: 'libros',
    format: 'epub',
    genre: 'Misterio Gótico / Romance Trágico',
    totalPages: 310,
    year: 1910,
    description: 'En los subterráneos del majestuoso teatro de la Ópera de París se oculta Erik, un genio deforme y atormentado que instruye y ama a la joven soprano Christine Daaé.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Fantasma de la Ópera',
        'Gastón Leroux',
        createDefaultBookChapters(
          'El Fantasma de la Ópera',
          'Gastón Leroux',
          'En los subterráneos del majestuoso teatro de la Ópera de París se oculta Erik, un genio deforme y atormentado que instruye y ama a la joven soprano Christine Daaé.'
        )
      ),
  },
  {
    id: 'cat-mil-y-una-noches',
    title: 'Las Mil y Una Noches',
    author: 'Anónimo',
    category: 'libros',
    format: 'epub',
    genre: 'Cuentos Orientales / Tradición Popular',
    totalPages: 800,
    year: 850,
    description: 'Para salvar su vida, la astuta Sherezade cautiva cada noche al sultán Shahriar con relatos mágicos de alfombras voladoras, genios y tesoros ocultos.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Las Mil y Una Noches',
        'Anónimo',
        createDefaultBookChapters(
          'Las Mil y Una Noches',
          'Anónimo',
          'Para salvar su vida, la astuta Sherezade cautiva cada noche al sultán Shahriar con relatos mágicos de alfombras voladoras, genios y tesoros ocultos.'
        )
      ),
  },
  {
    id: 'cat-lazarillo',
    title: 'La Vida de Lazarillo de Tormes',
    author: 'Anónimo',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Picaresca / Sátira Social',
    totalPages: 120,
    year: 1554,
    description: 'El ingenioso Lázaro relata su dura infancia sirviendo a un ciego avaro, a un clérigo mezquino y a un escudero pobre en la España renacentista.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'La Vida de Lazarillo de Tormes',
        'Anónimo',
        createDefaultBookChapters(
          'La Vida de Lazarillo de Tormes',
          'Anónimo',
          'El ingenioso Lázaro relata su dura infancia sirviendo a un ciego avaro, a un clérigo mezquino y a un escudero pobre en la España renacentista.'
        )
      ),
  },
  {
    id: 'cat-mio-cid',
    title: 'El Cantar de Mio Cid',
    author: 'Anónimo',
    category: 'libros',
    format: 'epub',
    genre: 'Cantar de Gesta / Poema Épico Castellano',
    totalPages: 160,
    year: 1200,
    description: 'Rodrigo Díaz de Vivar, desterrado por el rey Alfonso VI, conquista Valencia y recupera el honor de sus hijas en las cortes de Toledo.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Cantar de Mio Cid',
        'Anónimo',
        createDefaultBookChapters(
          'El Cantar de Mio Cid',
          'Anónimo',
          'Rodrigo Díaz de Vivar, desterrado por el rey Alfonso VI, conquista Valencia y recupera el honor de sus hijas en las cortes de Toledo.'
        )
      ),
  },
  {
    id: 'cat-regenta',
    title: 'La Regenta',
    author: 'Leopoldo Alas Clarín',
    category: 'libros',
    format: 'epub',
    genre: 'Realismo Español / Hipocresía Social',
    totalPages: 920,
    year: 1884,
    description: 'En la opresiva y provinciana ciudad de Vetusta, Ana Ozores se debate entre el matrimonio con un hombre mayor, la devoción religiosa y la seducción mundana.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Regenta',
        'Leopoldo Alas Clarín',
        createDefaultBookChapters(
          'La Regenta',
          'Leopoldo Alas Clarín',
          'En la opresiva y provinciana ciudad de Vetusta, Ana Ozores se debate entre el matrimonio con un hombre mayor, la devoción religiosa y la seducción mundana.'
        )
      ),
  },
  {
    id: 'cat-rimas-leyendas',
    title: 'Rimas y Leyendas',
    author: 'Gustavo Adolfo Bécquer',
    category: 'libros',
    format: 'epub',
    genre: 'Romanticismo Español / Poesía y Misterio',
    totalPages: 240,
    year: 1871,
    description: '¿Qué es poesía? Dices mientras clavas en mi pupila tu pupila azul. Versos inmortales y leyendas fantásticas del monte de las ánimas y el rayo de luna.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Rimas y Leyendas',
        'Gustavo Adolfo Bécquer',
        createDefaultBookChapters(
          'Rimas y Leyendas',
          'Gustavo Adolfo Bécquer',
          '¿Qué es poesía? Dices mientras clavas en mi pupila tu pupila azul. Versos inmortales y leyendas fantásticas del monte de las ánimas y el rayo de luna.'
        )
      ),
  },
  {
    id: 'cat-sabueso-baskerville',
    title: 'El Sabueso de los Baskerville',
    author: 'Arthur Conan Doyle',
    category: 'libros',
    format: 'epub',
    genre: 'Novela de Detectives / Misterio en los Páramos',
    totalPages: 250,
    year: 1902,
    description: 'Una maldición ancestral acecha a los herederos de Baskerville Hall en los pantanos de Dartmoor en forma de una gigantesca bestia infernal.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Sabueso de los Baskerville',
        'Arthur Conan Doyle',
        createDefaultBookChapters(
          'El Sabueso de los Baskerville',
          'Arthur Conan Doyle',
          'Una maldición ancestral acecha a los herederos de Baskerville Hall en los pantanos de Dartmoor en forma de una gigantesca bestia infernal.'
        )
      ),
  },
  {
    id: 'cat-maquina-tiempo',
    title: 'La Máquina del Tiempo',
    author: 'H.G. Wells',
    category: 'libros',
    format: 'epub',
    genre: 'Ciencia Ficción / Viajes Temporales',
    totalPages: 140,
    year: 1895,
    description: 'Un inventor victoriano construye un artefacto para viajar al año 802.701, descubriendo la división de la humanidad en los pacíficos Eloi y los siniestros Morlocks.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Máquina del Tiempo',
        'H.G. Wells',
        createDefaultBookChapters(
          'La Máquina del Tiempo',
          'H.G. Wells',
          'Un inventor victoriano construye un artefacto para viajar al año 802.701, descubriendo la división de la humanidad en los pacíficos Eloi y los siniestros Morlocks.'
        )
      ),
  },
  {
    id: 'cat-guerra-mundos',
    title: 'La Guerra de los Mundos',
    author: 'H.G. Wells',
    category: 'libros',
    format: 'epub',
    genre: 'Ciencia Ficción / Invasión Extraterrestre',
    totalPages: 230,
    year: 1898,
    description: 'Cilindros metálicos caen sobre Inglaterra: los marcianos con sus colosales trípodes y rayos calóricos inician la despiadada conquista de la Tierra.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Guerra de los Mundos',
        'H.G. Wells',
        createDefaultBookChapters(
          'La Guerra de los Mundos',
          'H.G. Wells',
          'Cilindros metálicos caen sobre Inglaterra: los marcianos con sus colosales trípodes y rayos calóricos inician la despiadada conquista de la Tierra.'
        )
      ),
  },
  {
    id: 'cat-hombre-invisible',
    title: 'El Hombre Invisible',
    author: 'H.G. Wells',
    category: 'libros',
    format: 'epub',
    genre: 'Ciencia Ficción / Ética y Poder',
    totalPages: 190,
    year: 1897,
    description: 'Griffin, un brillante científico que logra volver transparente su cuerpo, cae presa de la locura y el delirio de dominio absoluto en un tranquilo pueblo inglés.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Hombre Invisible',
        'H.G. Wells',
        createDefaultBookChapters(
          'El Hombre Invisible',
          'H.G. Wells',
          'Griffin, un brillante científico que logra volver transparente su cuerpo, cae presa de la locura y el delirio de dominio absoluto en un tranquilo pueblo inglés.'
        )
      ),
  },
  {
    id: 'cat-isla-moreau',
    title: 'La Isla del Dr. Moreau',
    author: 'H.G. Wells',
    category: 'libros',
    format: 'epub',
    genre: 'Ciencia Ficción / Terror Biológico',
    totalPages: 200,
    year: 1896,
    description: 'Un náufrago arriba a una remota isla tropical donde un cirujano proscrito transforma animales en humanos mediante dolorosas cirugías.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Isla del Dr. Moreau',
        'H.G. Wells',
        createDefaultBookChapters(
          'La Isla del Dr. Moreau',
          'H.G. Wells',
          'Un náufrago arriba a una remota isla tropical donde un cirujano proscrito transforma animales en humanos mediante dolorosas cirugías.'
        )
      ),
  },
  {
    id: 'cat-cronicas-marcianas',
    title: 'Crónicas Marcianas',
    author: 'Ray Bradbury',
    category: 'libros',
    format: 'epub',
    genre: 'Ciencia Ficción Poética / Colonización Espacial',
    totalPages: 280,
    year: 1950,
    description: 'La llegada de expediciones humanas a Marte y el melancólico ocaso de la civilización marciana frente a las ambiciones y nostalgias terrestres.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Crónicas Marcianas',
        'Ray Bradbury',
        createDefaultBookChapters(
          'Crónicas Marcianas',
          'Ray Bradbury',
          'La llegada de expediciones humanas a Marte y el melancólico ocaso de la civilización marciana frente a las ambiciones y nostalgias terrestres.'
        )
      ),
  },
  {
    id: 'cat-alicia-maravillas',
    title: 'Alicia en el País de las Maravillas',
    author: 'Lewis Carroll',
    category: 'libros',
    format: 'epub',
    genre: 'Literatura Infantil / Lógica del Absurdo',
    totalPages: 180,
    year: 1865,
    description: 'Alicia cae por la madriguera del Conejo Blanco entrando a un mundo de orugas fumadoras, sombrereros locos, gatos risueños y reinas de corazones.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'Alicia en el País de las Maravillas',
        'Lewis Carroll',
        createDefaultBookChapters(
          'Alicia en el País de las Maravillas',
          'Lewis Carroll',
          'Alicia cae por la madriguera del Conejo Blanco entrando a un mundo de orugas fumadoras, sombrereros locos, gatos risueños y reinas de corazones.'
        )
      ),
  },
  {
    id: 'cat-traves-espejo',
    title: 'A Través del Espejo y lo que Alicia Encontró Allí',
    author: 'Lewis Carroll',
    category: 'libros',
    format: 'epub',
    genre: 'Fantasía / Ajedrez y Lógica',
    totalPages: 190,
    year: 1871,
    description: 'Alicia cruza el cristal del salón para participar como peón en una descomunal partida de ajedrez viviente junto a Tweedledum, Tweedledee y Humpty Dumpty.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'A Través del Espejo y lo que Alicia Encontró Allí',
        'Lewis Carroll',
        createDefaultBookChapters(
          'A Través del Espejo y lo que Alicia Encontró Allí',
          'Lewis Carroll',
          'Alicia cruza el cristal del salón para participar como peón en una descomunal partida de ajedrez viviente junto a Tweedledum, Tweedledee y Humpty Dumpty.'
        )
      ),
  },
  {
    id: 'cat-decameron',
    title: 'El Decamerón',
    author: 'Giovanni Boccaccio',
    category: 'libros',
    format: 'epub',
    genre: 'Cuentos Renacentistas / Amor e Ingenio',
    totalPages: 640,
    year: 1353,
    description: 'Diez jóvenes refugiados en una villa toscana para huir de la peste negra se turnan para narrar cien cuentos picantes, alegres y cargados de ingenio.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Decamerón',
        'Giovanni Boccaccio',
        createDefaultBookChapters(
          'El Decamerón',
          'Giovanni Boccaccio',
          'Diez jóvenes refugiados en una villa toscana para huir de la peste negra se turnan para narrar cien cuentos picantes, alegres y cargados de ingenio.'
        )
      ),
  },
  {
    id: 'cat-aura',
    title: 'Aura',
    author: 'Carlos Fuentes',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Gótica Mexicana / Fantasía Oscura',
    totalPages: 90,
    year: 1962,
    description: 'Felipe Montero acude a una vieja casona en la calle Donceles para ordenar las memorias de un general difunto, quedando hechizado por la misteriosa Aura.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Aura',
        'Carlos Fuentes',
        createDefaultBookChapters(
          'Aura',
          'Carlos Fuentes',
          'Felipe Montero acude a una vieja casona en la calle Donceles para ordenar las memorias de un general difunto, quedando hechizado por la misteriosa Aura.'
        )
      ),
  },
  {
    id: 'cat-muerte-artemio-cruz',
    title: 'La Muerte de Artemio Cruz',
    author: 'Carlos Fuentes',
    category: 'libros',
    format: 'epub',
    genre: 'Boom Latinoamericano / Memoria y Poder',
    totalPages: 320,
    year: 1962,
    description: 'En su lecho de muerte, un poderoso magnate y antiguo revolucionario mexicano rememora los instantes decisivos donde sacrificó sus ideales por el poder.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Muerte de Artemio Cruz',
        'Carlos Fuentes',
        createDefaultBookChapters(
          'La Muerte de Artemio Cruz',
          'Carlos Fuentes',
          'En su lecho de muerte, un poderoso magnate y antiguo revolucionario mexicano rememora los instantes decisivos donde sacrificó sus ideales por el poder.'
        )
      ),
  },
  {
    id: 'cat-sobre-heroes-tumbas',
    title: 'Sobre Héroes y Tumbas',
    author: 'Ernesto Sabato',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Psicológica / Buenos Aires Oscuro',
    totalPages: 490,
    year: 1961,
    description: 'La tormentosa relación entre Martín y la enigmática Alejandra Vidal Olmos, que incluye el célebre y perturbador Informe sobre Ciegos.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Sobre Héroes y Tumbas',
        'Ernesto Sabato',
        createDefaultBookChapters(
          'Sobre Héroes y Tumbas',
          'Ernesto Sabato',
          'La tormentosa relación entre Martín y la enigmática Alejandra Vidal Olmos, que incluye el célebre y perturbador Informe sobre Ciegos.'
        )
      ),
  },
  {
    id: 'cat-reino-este-mundo',
    title: 'El Reino de Este Mundo',
    author: 'Alejo Carpentier',
    category: 'libros',
    format: 'epub',
    genre: 'Real Maravilloso / Revolución Haitiana',
    totalPages: 150,
    year: 1949,
    description: 'La sublevación de esclavos en el Haití colonial y el surgimiento del tiránico rey Henri Christophe bajo la mirada del esclavo Ti Noel.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Reino de Este Mundo',
        'Alejo Carpentier',
        createDefaultBookChapters(
          'El Reino de Este Mundo',
          'Alejo Carpentier',
          'La sublevación de esclavos en el Haití colonial y el surgimiento del tiránico rey Henri Christophe bajo la mirada del esclavo Ti Noel.'
        )
      ),
  },
  {
    id: 'cat-pasos-perdidos',
    title: 'Los Pasos Perdidos',
    author: 'Alejo Carpentier',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Tiempo y Selva Americana',
    totalPages: 290,
    year: 1953,
    description: 'Un musicólogo aburrido de la vida moderna remonta las aguas de un río amazónico en busca de instrumentos indígenas antiguos, retrocediendo en el tiempo.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Los Pasos Perdidos',
        'Alejo Carpentier',
        createDefaultBookChapters(
          'Los Pasos Perdidos',
          'Alejo Carpentier',
          'Un musicólogo aburrido de la vida moderna remonta las aguas de un río amazónico en busca de instrumentos indígenas antiguos, retrocediendo en el tiempo.'
        )
      ),
  },
  {
    id: 'cat-huasipungo',
    title: 'Huasipungo',
    author: 'Jorge Icaza',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Indigenista / Lucha y Denuncia Social',
    totalPages: 210,
    year: 1934,
    description: 'El drama de los indígenas ecuatorianos despojados de sus huasipungos por los terratenientes y las compañías petroleras extranjeras.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Huasipungo',
        'Jorge Icaza',
        createDefaultBookChapters(
          'Huasipungo',
          'Jorge Icaza',
          'El drama de los indígenas ecuatorianos despojados de sus huasipungos por los terratenientes y las compañías petroleras extranjeras.'
        )
      ),
  },
  {
    id: 'cat-marianela',
    title: 'Marianela',
    author: 'Benito Pérez Galdós',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Romántica / Belleza y Realismo',
    totalPages: 230,
    year: 1878,
    description: 'Nela, una muchacha pobre y de aspecto frágil, sirve de lazarillo al joven ciego Pablo, quien idealiza su bondad interior hasta que recupera la vista.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Marianela',
        'Benito Pérez Galdós',
        createDefaultBookChapters(
          'Marianela',
          'Benito Pérez Galdós',
          'Nela, una muchacha pobre y de aspecto frágil, sirve de lazarillo al joven ciego Pablo, quien idealiza su bondad interior hasta que recupera la vista.'
        )
      ),
  },
  {
    id: 'cat-fortunata-jacinta',
    title: 'Fortunata y Jacinta',
    author: 'Benito Pérez Galdós',
    category: 'libros',
    format: 'epub',
    genre: 'Realismo Español / Retrato de Madrid',
    totalPages: 850,
    year: 1887,
    description: 'La historia de dos mujeres casadas y su relación con el frívolo Juanito Santa Cruz en el rico y vibrante Madrid decimonónico.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'Fortunata y Jacinta',
        'Benito Pérez Galdós',
        createDefaultBookChapters(
          'Fortunata y Jacinta',
          'Benito Pérez Galdós',
          'La historia de dos mujeres casadas y su relación con el frívolo Juanito Santa Cruz en el rico y vibrante Madrid decimonónico.'
        )
      ),
  },
  {
    id: 'cat-san-manuel-bueno',
    title: 'San Manuel Bueno, Mártir',
    author: 'Miguel de Unamuno',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Filosófica / Fe y Duda',
    totalPages: 100,
    year: 1931,
    description: 'Don Manuel, el querido párroco de Valverde de Lucerna, realiza milagros y consuela a sus feligreses mientras guarda en secreto su trágica falta de fe.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'San Manuel Bueno, Mártir',
        'Miguel de Unamuno',
        createDefaultBookChapters(
          'San Manuel Bueno, Mártir',
          'Miguel de Unamuno',
          'Don Manuel, el querido párroco de Valverde de Lucerna, realiza milagros y consuela a sus feligreses mientras guarda en secreto su trágica falta de fe.'
        )
      ),
  },
  {
    id: 'cat-minas-rey-salomon',
    title: 'Las Minas del Rey Salomón',
    author: 'H. Rider Haggard',
    category: 'libros',
    format: 'epub',
    genre: 'Aventuras Coloniales / Exploración Africana',
    totalPages: 300,
    year: 1885,
    description: 'Allan Quatermain lidera una expedición al corazón inexplorado de África en busca de un caballero perdido y de las legendarias minas de diamantes bíblicas.',
    coverGradient: { from: '#064e3b', to: '#042f2e', accent: '#10b981' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Las Minas del Rey Salomón',
        'H. Rider Haggard',
        createDefaultBookChapters(
          'Las Minas del Rey Salomón',
          'H. Rider Haggard',
          'Allan Quatermain lidera una expedición al corazón inexplorado de África en busca de un caballero perdido y de las legendarias minas de diamantes bíblicas.'
        )
      ),
  },
  {
    id: 'cat-dona-perfecta',
    title: 'Doña Perfecta',
    author: 'Benito Pérez Galdós',
    category: 'libros',
    format: 'epub',
    genre: 'Novela de Tesis / Intolerancia Religiosa',
    totalPages: 260,
    year: 1876,
    description: 'El ingeniero liberal Pepe Rey viaja a la ciudad provinciana de Orbajosa para casarse con su prima Rosario, chocando con el fanatismo de su tía Doña Perfecta.',
    coverGradient: { from: '#78350f', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Doña Perfecta',
        'Benito Pérez Galdós',
        createDefaultBookChapters(
          'Doña Perfecta',
          'Benito Pérez Galdós',
          'El ingeniero liberal Pepe Rey viaja a la ciudad provinciana de Orbajosa para casarse con su prima Rosario, chocando con el fanatismo de su tía Doña Perfecta.'
        )
      ),
  },
  {
    id: 'cat-astillero',
    title: 'El Astillero',
    author: 'Juan Carlos Onetti',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Existencial / La Ilusión y la Ruina',
    totalPages: 220,
    year: 1961,
    description: 'Larsen regresa a la decadente Santa María para dirigir un astillero herrumbroso que ya no construye barcos, aferrándose a una farsa heroica.',
    coverGradient: { from: '#581c87', to: '#18181b', accent: '#a855f7' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Astillero',
        'Juan Carlos Onetti',
        createDefaultBookChapters(
          'El Astillero',
          'Juan Carlos Onetti',
          'Larsen regresa a la decadente Santa María para dirigir un astillero herrumbroso que ya no construye barcos, aferrándose a una farsa heroica.'
        )
      ),
  },
  {
    id: 'cat-casa-fieras',
    title: 'La Colmena',
    author: 'Camilo José Cela',
    category: 'libros',
    format: 'epub',
    genre: 'Realismo Social / Madrid de Posguerra',
    totalPages: 340,
    year: 1951,
    description: 'Un enjambre de personajes entrelazan sus vidas precarias en el Madrid gris de 1943, reflejando el hambre, el miedo y la lucha cotidiana.',
    coverGradient: { from: '#172554', to: '#0f172a', accent: '#3b82f6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Colmena',
        'Camilo José Cela',
        createDefaultBookChapters(
          'La Colmena',
          'Camilo José Cela',
          'Un enjambre de personajes entrelazan sus vidas precarias en el Madrid gris de 1943, reflejando el hambre, el miedo y la lucha cotidiana.'
        )
      ),
  },
  {
    id: 'cat-familia-pascual-duarte',
    title: 'La Familia de Pascual Duarte',
    author: 'Camilo José Cela',
    category: 'libros',
    format: 'epub',
    genre: 'Tremendismo / Crónica Negra Rural',
    totalPages: 180,
    year: 1942,
    description: 'Pascual Duarte, campesino extremeño condenado a muerte, relata desde su celda la espiral de fatalidad y violencia que marcó su existencia.',
    coverGradient: { from: '#701a75', to: '#18181b', accent: '#d946ef' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'La Familia de Pascual Duarte',
        'Camilo José Cela',
        createDefaultBookChapters(
          'La Familia de Pascual Duarte',
          'Camilo José Cela',
          'Pascual Duarte, campesino extremeño condenado a muerte, relata desde su celda la espiral de fatalidad y violencia que marcó su existencia.'
        )
      ),
  },
  {
    id: 'cat-corazon-tinieblas',
    title: 'El Corazón de las Tinieblas',
    author: 'Joseph Conrad',
    category: 'libros',
    format: 'epub',
    genre: 'Aventura Psicológica / Colonialismo y Locura',
    totalPages: 150,
    year: 1899,
    description: 'El marinero Marlow remonta las turbias aguas del río Congo en busca del enigmático señor Kurtz, sumergiéndose en el abismo moral del alma humana.',
    coverGradient: { from: '#0f172a', to: '#334155', accent: '#94a3b8' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Corazón de las Tinieblas',
        'Joseph Conrad',
        createDefaultBookChapters(
          'El Corazón de las Tinieblas',
          'Joseph Conrad',
          'El marinero Marlow remonta las turbias aguas del río Congo en busca del enigmático señor Kurtz, sumergiéndose en el abismo moral del alma humana.'
        )
      ),
  },
  {
    id: 'cat-retrato-artista',
    title: 'Retrato del Artista Adolescente',
    author: 'James Joyce',
    category: 'libros',
    format: 'epub',
    genre: 'Modernismo / Conciencia y Religión',
    totalPages: 280,
    year: 1916,
    description: 'La evolución intelectual y espiritual del joven Stephen Dedalus en Dublín, decidiendo romper con la iglesia y la patria para abrazar el arte.',
    coverGradient: { from: '#831843', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'Retrato del Artista Adolescente',
        'James Joyce',
        createDefaultBookChapters(
          'Retrato del Artista Adolescente',
          'James Joyce',
          'La evolución intelectual y espiritual del joven Stephen Dedalus en Dublín, decidiendo romper con la iglesia y la patria para abrazar el arte.'
        )
      ),
  },
  {
    id: 'cat-senor-presidente',
    title: 'El Señor Presidente',
    author: 'Miguel Ángel Asturias',
    category: 'libros',
    format: 'epub',
    genre: 'Realismo Mágico / Dictadura y Terror',
    totalPages: 320,
    year: 1946,
    description: 'La asfixiante atmósfera de terror y delación bajo la mirada de un dictador sin nombre en un país latinoamericano devastado por la tiranía.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#14b8a6' },
    badgeText: 'LIBRO EN ESPAÑOL',
    createFile: () =>
      generateBookFile(
        'El Señor Presidente',
        'Miguel Ángel Asturias',
        createDefaultBookChapters(
          'El Señor Presidente',
          'Miguel Ángel Asturias',
          'La asfixiante atmósfera de terror y delación bajo la mirada de un dictador sin nombre en un país latinoamericano devastado por la tiranía.'
        )
      ),
  },
  {
    id: 'cat-pantaleon-visitadoras',
    title: 'Pantaleón y las Visitadoras',
    author: 'Mario Vargas Llosa',
    category: 'libros',
    format: 'epub',
    genre: 'Sátira Militar / Humor y Burocracia',
    totalPages: 310,
    year: 1973,
    description: 'El capitán Pantaleón Pantoja recibe la secreta misión de organizar un servicio de visitadoras para atender las necesidades del ejército en la selva.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Aventura', 'Novela'],
    createFile: () =>
      generateBookFile(
        'Pantaleón y las Visitadoras',
        'Mario Vargas Llosa',
        createDefaultBookChapters(
          'Pantaleón y las Visitadoras',
          'Mario Vargas Llosa',
          'El capitán Pantaleón Pantoja recibe la secreta misión de organizar un servicio de visitadoras para atender las necesidades del ejército en la selva.'
        )
      ),
  },
  {
    id: 'cat-dama-camelias',
    title: 'La Dama de las Camelias',
    author: 'Alexandre Dumas hijo',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Clásico Universal / Drama Romántico',
    totalPages: 288,
    year: 1848,
    description: 'La trágica y devota historia de amor entre Marguerite Gautier, la cortesana más deseada de los salones de París, y el joven Armand Duval, marcada por los prejuicios sociales y el sacrificio.',
    coverGradient: { from: '#831843', to: '#500724', accent: '#f43f5e' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Romance', 'Drama'],
    createFile: () =>
      generateBookFile(
        'La Dama de las Camelias',
        'Alexandre Dumas hijo',
        createDefaultBookChapters(
          'La Dama de las Camelias',
          'Alexandre Dumas hijo',
          'La trágica y devota historia de amor entre Marguerite Gautier, la cortesana más deseada de los salones de París, y el joven Armand Duval, marcada por los prejuicios sociales y el sacrificio.'
        )
      ),
  },
  {
    id: 'cat-sensatez-sentimiento',
    title: 'Sensatez y Sentimiento',
    author: 'Jane Austen',
    category: 'libros',
    format: 'epub',
    genre: 'Novela / Romance de Costumbres / Clásico Inglés',
    totalPages: 384,
    year: 1811,
    description: 'Tras la muerte de su padre, las hermanas Elinor y Marianne Dashwood deben enfrentarse a la ruina y a los dilemas del corazón: la sensatez y la reserva de una frente a la pasión desmedida de la otra.',
    coverGradient: { from: '#134e4a', to: '#042f2e', accent: '#2dd4bf' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Romance', 'Novela'],
    createFile: () =>
      generateBookFile(
        'Sensatez y Sentimiento',
        'Jane Austen',
        createDefaultBookChapters(
          'Sensatez y Sentimiento',
          'Jane Austen',
          'Tras la muerte de su padre, las hermanas Elinor y Marianne Dashwood deben enfrentarse a la ruina y a los dilemas del corazón: la sensatez y la reserva de una frente a la pasión desmedida de la otra.'
        )
      ),
  },
  {
    id: 'cat-werther',
    title: 'Las Penas del Joven Werther',
    author: 'Johann Wolfgang von Goethe',
    category: 'libros',
    format: 'epub',
    genre: 'Novela Epistolar / Romanticismo Clásico',
    totalPages: 176,
    year: 1774,
    description: 'A través de sentidas cartas, el joven artista Werther confiesa su amor apasionado y desgarrador por Charlotte, una mujer virtuosa que ya está comprometida con otro hombre.',
    coverGradient: { from: '#451a03', to: '#1c1917', accent: '#f59e0b' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Romance', 'Drama'],
    createFile: () =>
      generateBookFile(
        'Las Penas del Joven Werther',
        'Johann Wolfgang von Goethe',
        createDefaultBookChapters(
          'Las Penas del Joven Werther',
          'Johann Wolfgang von Goethe',
          'A través de sentidas cartas, el joven artista Werther confiesa su amor apasionado y desgarrador por Charlotte, una mujer virtuosa que ya está comprometida con otro hombre.'
        )
      ),
  },
  {
    id: 'cat-romeo-julieta',
    title: 'Romeo y Julieta',
    author: 'William Shakespeare',
    category: 'libros',
    format: 'epub',
    genre: 'Drama Clásico / Tragedia Romántica',
    totalPages: 192,
    year: 1597,
    description: 'En Verona, el amor fulminante y clandestino entre dos jóvenes pertenecientes a las familias rivales Montesco y Capuleto desafía un odio ancestral en la tragedia romántica más célebre de la historia.',
    coverGradient: { from: '#3b0764', to: '#18181b', accent: '#ec4899' },
    badgeText: 'LIBRO EN ESPAÑOL',
    tags: ['Clásico', 'Romance', 'Teatro'],
    createFile: () =>
      generateBookFile(
        'Romeo y Julieta',
        'William Shakespeare',
        createDefaultBookChapters(
          'Romeo y Julieta',
          'William Shakespeare',
          'En Verona, el amor fulminante y clandestino entre dos jóvenes pertenecientes a las familias rivales Montesco y Capuleto desafía un odio ancestral en la tragedia romántica más célebre de la historia.'
        )
      ),
  },
];
