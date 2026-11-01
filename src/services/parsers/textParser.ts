export interface TextMetadata {
  title: string;
  totalPages: number;
  coverUrl: string;
  wordCount: number;
}

export function parseTextFile(content: string, fileName: string): TextMetadata {
  const cleanTitle = fileName.replace(/\.[^/.]+$/, '').trim();
  const words = content.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  // Estimate ~350 words per page
  const totalPages = Math.max(1, Math.ceil(wordCount / 350));

  const coverUrl = createMinimalistTextCover(cleanTitle, 'TXT');

  return {
    title: cleanTitle,
    totalPages,
    coverUrl,
    wordCount,
  };
}

export function createMinimalistTextCover(title: string, format: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="300" height="420" rx="8" fill="url(#grad)"/>
    <rect x="20" y="20" width="260" height="380" rx="4" fill="none" stroke="#334155" stroke-width="2"/>
    <text x="35" y="60" fill="#94a3b8" font-size="12" font-family="system-ui, sans-serif" letter-spacing="2" font-weight="600">${format.toUpperCase()}</text>
    <line x1="35" y1="75" x2="100" y2="75" stroke="#38bdf8" stroke-width="2"/>
    <foreignObject x="35" y="100" width="230" height="200">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: system-ui, sans-serif; font-size: 20px; font-weight: 700; color: #f8fafc; line-height: 1.3; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical;">
        ${escapeXml(title)}
      </div>
    </foreignObject>
    <circle cx="150" cy="350" r="14" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    <path d="M145 350 L155 350" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
