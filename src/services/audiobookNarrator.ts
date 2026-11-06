import { registerPlugin, type PluginListenerHandle } from '@capacitor/core';

export interface AudiobookSegment {
  text: string;
  fullPhrase: string;
  role: 'narrator' | 'dialogue' | 'action' | 'suspense';
  pitch: number;
  rateMultiplier: number;
  pauseBeforeMs: number;
  moodLabel: string;
}

export interface TtsVoiceOption {
  name: string;
  lang: string;
  isNeural?: boolean;
  isNative?: boolean;
}

interface NativeTtsPluginInterface {
  isAvailable(): Promise<{ available: boolean }>;
  getVoices(): Promise<{ voices: Array<{ name: string; lang: string; isNetworkConnectionRequired?: boolean; quality?: number }> }>;
  speak(options: {
    text: string;
    rate?: number;
    pitch?: number;
    voiceName?: string;
    pauseBeforeMs?: number;
  }): Promise<{ utteranceId: string }>;
  stop(): Promise<void>;
  addListener(eventName: 'onStart', listenerFunc: (data: { utteranceId: string }) => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onDone', listenerFunc: (data: { utteranceId: string }) => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onError', listenerFunc: (data: { utteranceId: string; error: string }) => void): Promise<PluginListenerHandle>;
}

export const NativeTts = registerPlugin<NativeTtsPluginInterface>('NativeTts');

/**
 * Guideline 5: Relaxed Spanish Diction & Phonetic Cleanliness
 * Cleans punctuation noise, footnote markers, and expands abbreviations.
 */
export function cleanPhonetics(raw: string): string {
  let text = (raw || '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Remove bracketed citations like [1], [12], *, etc.
  text = text.replace(/\[\d+\]/g, '');
  text = text.replace(/\s*[*†‡§]\s*/g, ' ');

  // Abbreviation phonetic expansion into natural spoken Spanish
  const abbrevs: Array<[RegExp, string]> = [
    [/\bSr\./g, 'Señor'],
    [/\bSra\./g, 'Señora'],
    [/\bSrta\./g, 'Señorita'],
    [/\bDon\./g, 'Don'],
    [/\bDña\./g, 'Doña'],
    [/\bDr\./g, 'Doctor'],
    [/\bDra\./g, 'Doctora'],
    [/\bcap\./gi, 'capítulo'],
    [/\bpág\./gi, 'página'],
    [/\bpágs\./gi, 'páginas'],
    [/\bvol\./gi, 'volumen'],
    [/\betc\./gi, 'etcétera'],
    [/\bej\./gi, 'ejemplo'],
  ];

  for (const [pattern, replacement] of abbrevs) {
    text = text.replace(pattern, replacement);
  }

  return text.trim();
}

/**
 * Guidelines 1-4: Pacing, Cadence, Natural Pauses & Character Differentiation
 * Segments text into interpretive units with dynamic prosody.
 */
export function parseAudiobookSegments(fullText: string): AudiobookSegment[] {
  if (!fullText || !fullText.trim()) return [];

  const cleaned = cleanPhonetics(fullText);
  const paragraphs = cleaned.split(/\n+/).filter(Boolean);
  const segments: AudiobookSegment[] = [];

  let isAlternateCharacter = false;

  for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
    const para = paragraphs[pIdx];

    // Split paragraph by sentence delimiters (. ! ? ; or dialogue chunks)
    const rawPhrases = (para.match(/[^.!?;\n]+[.!?;\n]+|[^.!?;\n]+$/g) || [para])
      .map(p => p.trim())
      .filter(p => p.length > 0 && !/^[\s—–\-.]+$/.test(p));

    for (let sIdx = 0; sIdx < rawPhrases.length; sIdx++) {
      const phrase = rawPhrases[sIdx];
      const isFirstInParagraph = sIdx === 0 && pIdx > 0;
      let role: AudiobookSegment['role'] = 'narrator';
      let pitch = 0.98; // Warm, enveloping narrator pitch
      let rateMultiplier = 1.0;
      let pauseBeforeMs = isFirstInParagraph ? 650 : (sIdx === 0 ? 200 : 320);
      let moodLabel = '🎙️ Narrador';

      // 1. Detect Dialogue
      const isDialogue =
        phrase.startsWith('—') ||
        phrase.startsWith('–') ||
        phrase.startsWith('-') ||
        phrase.startsWith('«') ||
        phrase.startsWith('"') ||
        phrase.startsWith('“') ||
        phrase.endsWith('»') ||
        phrase.endsWith('"') ||
        phrase.endsWith('”');

      if (isDialogue) {
        role = 'dialogue';
        isAlternateCharacter = !isAlternateCharacter;
        // Subtle character differentiation (subtle pitch shift between conversation turns)
        pitch = isAlternateCharacter ? 1.04 : 0.96;
        rateMultiplier = 1.02;
        pauseBeforeMs = Math.max(pauseBeforeMs, 280);
        moodLabel = '💬 Diálogo';
      }

      // 2. Detect Action / Urgency
      const isExclamation = phrase.includes('!') || phrase.includes('¡');
      const actionWords = /\b(corri[oó]|grit[oó]|escap[oó]|dispar[oó]|r[aá]pido|fuego|peligro|urgente|golpe|s[uú]bito)\b/i;
      if (isExclamation || actionWords.test(phrase)) {
        if (!isDialogue) role = 'action';
        rateMultiplier = Math.min(1.15, rateMultiplier * 1.08);
        pitch = Math.min(1.12, pitch * 1.05);
        moodLabel = isDialogue ? '💬 Diálogo Emotivo' : '⚡ Acción / Emoción';
      }

      // 3. Detect Suspense / Mystery / Deep Reflection
      const isSuspense = phrase.includes('...') || phrase.includes('…');
      const mysteryWords = /\b(silencio|oscuridad|sombra|misterio|muerte|miedo|pesar|tristeza|pensaba|recordaba|lejos)\b/i;
      if (isSuspense || mysteryWords.test(phrase)) {
        if (!isDialogue && !isExclamation) role = 'suspense';
        rateMultiplier = Math.max(0.88, rateMultiplier * 0.92);
        pitch = Math.max(0.92, pitch * 0.96);
        pauseBeforeMs = Math.max(pauseBeforeMs, 450);
        moodLabel = '🌙 Tensión / Misterio';
      }

      // Clean spoken text: strip wrapping dialogue em-dashes and quotes
      const cleanSpoken = phrase
        .replace(/^[—–\-«"“\s]+/, '')
        .replace(/[»"”\s]+$/, '')
        .trim();

      if (cleanSpoken.length > 0) {
        segments.push({
          text: cleanSpoken,
          fullPhrase: phrase,
          role,
          pitch,
          rateMultiplier,
          pauseBeforeMs,
          moodLabel,
        });
      }
    }
  }

  return segments;
}

/**
 * Checks whether native Android TTS is available
 */
export async function isNativeTtsAvailable(): Promise<boolean> {
  try {
    const res = await NativeTts.isAvailable();
    return !!res?.available;
  } catch {
    return false;
  }
}
