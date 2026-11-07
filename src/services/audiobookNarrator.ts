import { registerPlugin, type PluginListenerHandle } from '@capacitor/core';

export interface AudiobookSegment {
  text: string;           // Cleaned phonetic text strictly for the TTS engine
  fullPhrase: string;     // Formatted text including quotes and punctuation for the UI card
  role: 'narrator' | 'dialogue' | 'action' | 'suspense';
  pitch: number;          // Guideline 3 & 4: Natural human pitch modulation
  rateMultiplier: number; // Guideline 1: Dynamic pacing and cadence
  pauseBeforeMs: number;  // Guideline 2: Subtle breathing micropause before speaking
  moodLabel: string;      // Visual feedback of emotional tone in UI
}

export interface TtsVoiceOption {
  id: string;
  name: string;
  rawName?: string;
  lang: string;
  isNeural?: boolean;
  isNative?: boolean;
  gender?: 'male' | 'female' | 'neutral';
  quality?: number;
}

export interface TtsEngineInfo {
  name: string;
  label: string;
  isDefault: boolean;
  isCurrent: boolean;
}

export interface CloudAiTtsSettings {
  provider: 'system' | 'openai' | 'elevenlabs';
  openaiApiKey?: string;
  openaiVoice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  openaiModel?: 'tts-1' | 'tts-1-hd';
  elevenlabsApiKey?: string;
  elevenlabsVoiceId?: string;
}

interface NativeTtsPluginInterface {
  isAvailable(): Promise<{ available: boolean }>;
  getVoices(): Promise<{
    voices: Array<{
      id: string;
      name: string;
      rawName: string;
      lang: string;
      isNetworkConnectionRequired?: boolean;
      quality?: number;
      isNeural?: boolean;
      gender?: 'male' | 'female' | 'neutral';
      isSelected?: boolean;
    }>;
    currentVoiceId?: string;
  }>;
  getEngines(): Promise<{
    engines: TtsEngineInfo[];
    defaultEngine: string;
  }>;
  setEngine(options: { engine: string }): Promise<{ success: boolean; engine: string }>;
  openTtsSettings(): Promise<void>;
  speak(options: {
    text: string;
    rate?: number;
    pitch?: number;
    voiceName?: string;
  }): Promise<{ utteranceId: string }>;
  stop(): Promise<void>;
  addListener(eventName: 'onStart', listenerFunc: (data: { utteranceId: string }) => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onDone', listenerFunc: (data: { utteranceId: string }) => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onError', listenerFunc: (data: { utteranceId: string; error?: string; errorCode?: number }) => void): Promise<PluginListenerHandle>;
}

export const NativeTts = registerPlugin<NativeTtsPluginInterface>('NativeTts');

/**
 * Guideline 5: Relaxed Spanish Diction & Phonetic Cleanliness
 * Removes typographic artifacts, bracketed footnote citations, and expands abbreviations.
 */
export function cleanPhonetics(raw: string): string {
  let text = (raw || '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Zero-width characters
    .replace(/\s+/g, ' ')
    .trim();

  // Strip footnote numbers and bracketed references (e.g. [1], [23], (1), ¹, ², etc.)
  text = text.replace(/\[\d+\]/g, '');
  text = text.replace(/\(\d+\)/g, '');
  text = text.replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]/g, '');
  text = text.replace(/\s*[*†‡§¶#_~^\\\/|]\s*/g, ' ');

  // Spanish abbreviation phonetic expansions into natural spoken words
  const abbrevs: Array<[RegExp, string]> = [
    [/\bSr\./g, 'Señor'],
    [/\bSra\./g, 'Señora'],
    [/\bSrta\./g, 'Señorita'],
    [/\bDon\./g, 'Don'],
    [/\bD\./g, 'Don'],
    [/\bDña\./g, 'Doña'],
    [/\bDr\./g, 'Doctor'],
    [/\bDra\./g, 'Doctora'],
    [/\bProf\./g, 'Profesor'],
    [/\bProfa\./g, 'Profesora'],
    [/\bUd\./g, 'Usted'],
    [/\bUds\./g, 'Ustedes'],
    [/\bcap\./gi, 'capítulo'],
    [/\bcaps\./gi, 'capítulos'],
    [/\bpág\./gi, 'página'],
    [/\bpágs\./gi, 'páginas'],
    [/\bvol\./gi, 'volumen'],
    [/\bart\./gi, 'artículo'],
    [/\bed\./gi, 'edición'],
    [/\betc\./gi, 'etcétera'],
    [/\bej\./gi, 'ejemplo'],
    [/\bn[°º]\.?/gi, 'número '],
    [/\bnúm\./gi, 'número '],
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
  // Split into paragraphs to respect natural chapter and narrative pacing
  const paragraphs = cleaned.split(/\n+/).map(p => p.trim()).filter(Boolean);
  const segments: AudiobookSegment[] = [];

  let isAlternateCharacter = false;

  for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
    const para = paragraphs[pIdx];

    // Split paragraph by natural speech boundaries:
    // Sentence enders (. ! ? ;), dialogue dashes, or ellipsis
    const rawPhrases = (para.match(/[^.!?;\n]+(?:[.!?;\n]+["'»”]?|["'»”]+)|[^.!?;\n]+$/g) || [para])
      .map(p => p.trim())
      .filter(p => p.length > 0 && !/^[\s—–\-.]+$/.test(p));

    for (let sIdx = 0; sIdx < rawPhrases.length; sIdx++) {
      const phrase = rawPhrases[sIdx];
      const isFirstInParagraph = sIdx === 0 && pIdx > 0;
      let role: AudiobookSegment['role'] = 'narrator';
      let pitch = 0.98; // Warm, enveloping narrator pitch
      let rateMultiplier = 1.0;
      let pauseBeforeMs = isFirstInParagraph ? 450 : (sIdx === 0 ? 180 : 260);
      let moodLabel = '🎙️ Narrador Cálido';

      // 1. Detect Dialogue (Spanish em-dash or quotation marks)
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
        // Subtle character differentiation (slight vocal pitch/presence shift)
        pitch = isAlternateCharacter ? 1.04 : 0.96;
        rateMultiplier = 1.02;
        pauseBeforeMs = Math.max(pauseBeforeMs, 240);
        moodLabel = isAlternateCharacter ? '💬 Diálogo (Personaje A)' : '💬 Diálogo (Personaje B)';
      }

      // 2. Detect Action / Urgency / Excitement (Guideline 1 & 4)
      const isExclamation = phrase.includes('!') || phrase.includes('¡');
      const actionWords = /\b(corri[oó]|grit[oó]|escap[oó]|dispar[oó]|r[aá]pido|fuego|peligro|urgente|golpe|s[uú]bito|estall[oó]|huyo|salt[oó]|furia|espada|ataque|lucha)\b/i;
      if (isExclamation || actionWords.test(phrase)) {
        if (!isDialogue) role = 'action';
        rateMultiplier = Math.min(1.12, rateMultiplier * 1.06);
        pitch = Math.min(1.10, pitch * 1.04);
        moodLabel = isDialogue ? '⚡ Diálogo Intenso' : '⚡ Acción / Emoción';
      }

      // 3. Detect Suspense / Melancholy / Deep Reflection (Guideline 1 & 4)
      const isSuspense = phrase.includes('...') || phrase.includes('…');
      const mysteryWords = /\b(silencio|oscuridad|sombra|misterio|muerte|miedo|pesar|tristeza|pensaba|recordaba|lejos|fr[ií]o|soledad|abismo|susurr[oó]|secreto|l[aá]grima)\b/i;
      if (isSuspense || mysteryWords.test(phrase)) {
        if (!isDialogue && !isExclamation) role = 'suspense';
        rateMultiplier = Math.max(0.90, rateMultiplier * 0.93);
        pitch = Math.max(0.94, pitch * 0.97);
        pauseBeforeMs = Math.max(pauseBeforeMs, 380);
        moodLabel = '🌙 Misterio / Reflexión';
      }

      // Guideline 5: Clean spoken text so the engine does not read punctuation marks aloud
      const cleanSpoken = phrase
        .replace(/^[—–\-«"“\s]+/, '')
        .replace(/[»"”\s]+$/, '')
        .replace(/\s+/g, ' ')
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

/**
 * Cloud AI Voice Synthesis (OpenAI TTS & ElevenLabs)
 */
export async function synthesizeCloudAiAudio(
  text: string,
  settings: CloudAiTtsSettings,
  speed: number = 1.0
): Promise<string> {
  if (settings.provider === 'openai') {
    if (!settings.openaiApiKey || !settings.openaiApiKey.trim()) {
      throw new Error('Por favor ingresa tu API Key de OpenAI para usar voces de estudio.');
    }
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${settings.openaiApiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: settings.openaiModel || 'tts-1',
        input: text,
        voice: settings.openaiVoice || 'onyx',
        speed: Math.max(0.75, Math.min(2.0, speed)),
      }),
    });
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Error de OpenAI: ${response.status} - ${err}`);
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  if (settings.provider === 'elevenlabs') {
    if (!settings.elevenlabsApiKey || !settings.elevenlabsApiKey.trim()) {
      throw new Error('Por favor ingresa tu API Key de ElevenLabs para usar voces de doblaje.');
    }
    const voiceId = settings.elevenlabsVoiceId || 'pNInz6obpgDQGcFmaJgB'; // Adam
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': settings.elevenlabsApiKey.trim(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
      }),
    });
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Error de ElevenLabs: ${response.status} - ${err}`);
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  throw new Error('Proveedor no soportado');
}
