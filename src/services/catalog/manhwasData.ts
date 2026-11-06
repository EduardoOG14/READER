import type { CatalogItem } from './types';
import { generateMangaCbz, createDefaultMangaPanels } from './generators';

export const MANHWAS_CATALOG: CatalogItem[] = [
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
    coverGradient: { from: '#450a0a', to: '#09090b', accent: '#dc2626' },
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
    id: 'cat-eleceed',
    title: 'Eleceed',
    author: 'Jeho Son & ZHENA',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Acción / Despertados & Gatos',
    totalPages: 10,
    year: 2018,
    description: 'Jiwoo es un chico bondadoso con súper velocidad que rescata a un gato gordo callejero, sin saber que es Kayden, un temido agente internacional atrapado en forma felina.',
    coverGradient: { from: '#451a03', to: '#18181b', accent: '#f59e0b' },
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
    id: 'cat-leviathan',
    title: 'Leviathan (Deep Water)',
    author: 'Lee Gyuntak',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Postapocalíptico Marino / Monstruos Acuáticos',
    totalPages: 10,
    year: 2018,
    description: 'La Tierra se ha inundado por completo y la humanidad vive en barcos oxidados acechados por colosales bestias marinas. Bota y su hermana empuñan arpones para sobrevivir.',
    coverGradient: { from: '#082f49', to: '#0f172a', accent: '#0284c7' },
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
    id: 'cat-the-breaker',
    title: 'The Breaker',
    author: 'Jeon Geuk-jin & Park Jin-hwan',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Artes Marciales Modernas / Murim',
    totalPages: 10,
    year: 2007,
    description: 'Shi-Woon Yi, acosado a diario en la escuela, convence a su excéntrico profesor suplente Chun-Woo Han de entrenarlo en el secreto y letal mundo subterráneo del Murim.',
    coverGradient: { from: '#18181b', to: '#09090b', accent: '#71717a' },
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
    coverGradient: { from: '#09090b', to: '#18181b', accent: '#64748b' },
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
    id: 'cat-get-schooled',
    title: 'Get Schooled (True Education)',
    author: 'Chae Yong-taek & Han Ga-ram',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Webtoon / Acción / Ministerio de Educación',
    totalPages: 10,
    year: 2020,
    description: 'Tras el colapso de la autoridad en las aulas, el gobierno crea la Oficina de Protección de Derechos Docentes con inspectores autorizados a utilizar fuerza correctiva.',
    coverGradient: { from: '#18181b', to: '#0f172a', accent: '#3b82f6' },
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
    id: 'cat-battle-through-heavens',
    title: 'Battle Through the Heavens (Doupo Cangqiong)',
    author: 'Tian Can Tu Dou',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Alquimia / Fuego Celestial',
    totalPages: 10,
    year: 2012,
    description: 'Xiao Yan pierde todo su talento repentinamente cuando el espíritu de Yao Lao despierta en el anillo de su madre, guiándolo para dominar los Fuegos Celestiales.',
    coverGradient: { from: '#450a0a', to: '#0f172a', accent: '#f97316' },
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
    id: 'cat-i-am-fated-villain',
    title: 'I Am the Fated Villain',
    author: 'Tian Fu',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhua / Antihéroe / El Villano del Destino',
    totalPages: 10,
    year: 2021,
    description: 'Gu Changge transmigra como el joven maestro de un clan sagrado del reino superior cuyo rol es aplastar a los supuestos elegidos del cielo y arrebatarles su suerte.',
    coverGradient: { from: '#3b0764', to: '#0f172a', accent: '#8b5cf6' },
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
    id: 'cat-chronicles-heavenly-demon',
    title: 'Chronicles of Heavenly Demon',
    author: 'Il-Hwang',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Murim / Lanza del Demonio Celestial',
    totalPages: 10,
    year: 2018,
    description: 'Woon-seong es ejecutado falsamente y reencarna como un niño novato en la Cueva de los Demonios, empuñando la lanza para vengar la muerte de su maestro del Monte Hua.',
    coverGradient: { from: '#450a0a', to: '#18181b', accent: '#ef4444' },
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
    id: 'cat-the-live',
    title: 'The Live',
    author: 'Chae-Hoo',
    category: 'manhwa',
    format: 'cbz',
    genre: 'Manhwa / Fantasía / Diario del Futuro & Resurrección',
    totalPages: 10,
    year: 2020,
    description: 'Kim Yun-jae pierde a su esposa e hija en un trágico accidente. Un día recibe un diario misterioso que predice el futuro y le promete reencontrarse con su familia si supera los desafíos del Mundo Paralelo.',
    coverGradient: { from: '#1e1b4b', to: '#0f172a', accent: '#6366f1' },
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
