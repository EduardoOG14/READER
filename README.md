# READER - Lector de Libros y Mangas 📖

**READER** es una aplicación moderna, fluida y potente para la lectura de libros digitales y cómics/mangas en dispositivos móviles y web, construida con React, TypeScript, Tailwind CSS y Capacitor para Android.

---

## ✨ Características Principales

### 📚 Soporte Multi-Formato
- **PDF**: Motor de renderizado vectorial de alta resolución vía PDF.js.
- **Mangas / Cómics (CBZ, CBR, ZIP)**: Descompresión en memoria, soporte Webtoon (cascada vertical continua) y modo página a página.
- **EPUB**: Renderizado fluido con paginación dinámica y memoria de ubicación CFI.
- **Texto Plano (TXT / Markdown)**: Paginación calculada y formateo adaptable.

### 👓 Modos de Lectura Esenciales
- **Modo Paginado**: Lectura página por página a pantalla completa, toque en bordes para pasar página, paneo suave.
- **Modo Continuo (Lectura Vertical)**: Desplazamiento vertical adaptado al ancho de pantalla sin saltos ni barras negras.
- **Zoom Dinámico y Persistente ("Fijar Zoom")**:
  - Gesto de pellizco (*pinch-to-zoom*) con 2 dedos y controles flotantes (`+`, `-`, reset).
  - Redibujado nítido a resolución nativa sin pixelado.
  - Bloqueo de zoom con persistencia independiente por cada libro.

### 🎨 Temas Visuales y Cuidado Ocular
- **Sakura Pastel (Modo Claro)**: Paleta suave inspirada en cerezos.
- **Gris Industrial (Modo Oscuro)**: Tonos grafito y zinc mate para lectura nocturna sin fatiga.
- **Filtros de Luz**: Modo Cálido (anti luz azul regulable), Sepia de lectura e Invertido de alto contraste.
- **Control de Brillo por Gestos**: Ajusta el brillo deslizando verticalmente en el borde izquierdo de la pantalla.

### 🚀 Funcionalidades Avanzadas Estilo Moon+ Reader
- **Barra de Estado en Tiempo Real**: Reloj, porcentaje de batería, título de la obra y avance porcentual.
- **Marcadores Rápidos**: Guarda y administra puntos de lectura favoritos por libro.
- **Lectura en Voz Alta (TTS)**: Síntesis de voz integrada con selector de idiomas y velocidades.
- **Auto-Avance / Auto-Scroll**: Lectura manos libres con temporizador configurable.
- **Catálogo Online**: Búsqueda y descarga directa desde repositorios públicos como Project Gutenberg.
- **Actualizador Integrado**: Comprueba directamente desde la app si hay nuevos releases o APKs disponibles en GitHub Releases.

---

## 🛠️ Tecnologías

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Empaquetado Móvil**: [Capacitor 8](https://capacitorjs.com/) (Android)
- **Librerías de Lectura**: `pdfjs-dist`, `jszip`, `epubjs`
- **Almacenamiento Local**: IndexedDB (`idb`) + SharedPreferences (`@capacitor/preferences`)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Bundler & Linter**: [Vite 8](https://vitejs.dev/), [Oxlint](https://oxc.rs/)

---

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- Node.js (v18 o superior)
- Android Studio / Android SDK (para compilar el APK)
- JDK 21

### Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción
npm run build

# Sincronizar cambios web con el proyecto Android
npx cap sync android

# Compilar APK de depuración (Android)
cd android
./gradlew assembleDebug
```

El APK generado se ubica en:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔄 Actualizaciones
La aplicación incluye un sistema de comprobación de actualizaciones conectado a GitHub Releases (`api.github.com/repos/EduardoOG14/READER/releases/latest`), permitiendo a los usuarios descargar nuevas versiones del APK con un solo toque.

---

## 📄 Licencia
Este proyecto es privado y de uso personal.
