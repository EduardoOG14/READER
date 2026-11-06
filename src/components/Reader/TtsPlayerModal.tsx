import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import type { PluginListenerHandle } from '@capacitor/core';
import {
  Play,
  Pause,
  Square,
  Volume2,
  FastForward,
  X,
  Languages,
  SkipBack,
  SkipForward,
  Sparkles,
  Loader2,
} from 'lucide-react';
import {
  parseAudiobookSegments,
  NativeTts,
  isNativeTtsAvailable,
  type AudiobookSegment,
  type TtsVoiceOption,
} from '../../services/audiobookNarrator';

interface TtsPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  totalPages: number;
  bookTitle: string;
  onNextPage: () => void;
  onPrevPage: () => void;
  currentText?: string;
}

export const TtsPlayerModal: React.FC<TtsPlayerModalProps> = ({
  isOpen,
  onClose,
  currentPage,
  totalPages,
  bookTitle,
  onNextPage,
  onPrevPage,
  currentText = '',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [voices, setVoices] = useState<TtsVoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<TtsVoiceOption | null>(null);
  const [segmentIndex, setSegmentIndex] = useState<number>(0);
  const [useNativeTts, setUseNativeTts] = useState<boolean>(false);

  // References to keep event listeners and asynchronous timers fully synchronized
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const pauseTimerRef = useRef<any>(null);
  const activeUtteranceIdRef = useRef<string | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const segmentIndexRef = useRef<number>(0);
  const currentPageRef = useRef<number>(currentPage);
  const totalPagesRef = useRef<number>(totalPages);
  const onNextPageRef = useRef(onNextPage);
  const onPrevPageRef = useRef(onPrevPage);
  const isAwaitingNewPageRef = useRef<boolean>(false);
  const prevPageRef = useRef<number>(currentPage);

  useLayoutEffect(() => {
    isPlayingRef.current = isPlaying;
    segmentIndexRef.current = segmentIndex;
    currentPageRef.current = currentPage;
    totalPagesRef.current = totalPages;
    onNextPageRef.current = onNextPage;
    onPrevPageRef.current = onPrevPage;
  });

  // Extract text from prop or fallback to active reader iframes/containers
  const effectiveText = useMemo(() => {
    if (currentText && currentText.trim().length > 15) {
      return currentText.trim();
    }

    if (typeof document !== 'undefined') {
      const iframes = document.querySelectorAll('iframe');
      for (let i = 0; i < iframes.length; i++) {
        try {
          const bodyText = iframes[i].contentDocument?.body?.innerText;
          if (bodyText && bodyText.trim().length > 15) {
            return bodyText.trim();
          }
        } catch {}
      }

      const textContainer = document.querySelector('.whitespace-pre-wrap');
      if (textContainer && (textContainer as HTMLElement).innerText?.trim().length > 15) {
        return (textContainer as HTMLElement).innerText.trim();
      }
    }

    return currentText ? currentText.trim() : '';
  }, [currentText, currentPage, isOpen]);

  // Parse text using Master Audiobook Narrator guidelines (returns [] if text is still loading)
  const segments: AudiobookSegment[] = useMemo(() => {
    if (!effectiveText || effectiveText.trim().length < 10) {
      return [];
    }
    return parseAudiobookSegments(effectiveText);
  }, [effectiveText]);

  const segmentsRef = useRef<AudiobookSegment[]>(segments);
  segmentsRef.current = segments;

  // Track page changes cleanly
  useEffect(() => {
    if (prevPageRef.current !== currentPage) {
      prevPageRef.current = currentPage;
      setSegmentIndex(0);
      segmentIndexRef.current = 0;

      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = null;
      }

      if (isPlayingRef.current) {
        // Stop current speech so old audio does not leak into the new page
        if (useNativeTts) {
          NativeTts.stop();
        } else if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        isAwaitingNewPageRef.current = true;
      }
    }
  }, [currentPage, useNativeTts]);

  // When new page text is parsed into segments, resume narration seamlessly
  useEffect(() => {
    if (segments.length > 0 && isAwaitingNewPageRef.current && isPlayingRef.current) {
      isAwaitingNewPageRef.current = false;
      const timer = setTimeout(() => {
        if (isPlayingRef.current) {
          speakSegment(0);
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [segments]);

  // Initialize TTS Engine (Native Android TTS vs Web Speech API fallback)
  useEffect(() => {
    let isMounted = true;

    const setupEngine = async () => {
      const nativeAvailable = await isNativeTtsAvailable();
      if (!isMounted) return;

      if (nativeAvailable) {
        setUseNativeTts(true);
        try {
          const vRes = await NativeTts.getVoices();
          const voiceList: TtsVoiceOption[] = (vRes.voices || []).map(v => ({
            name: v.name,
            lang: v.lang,
            isNeural: (v.quality && v.quality >= 400) || v.name.toLowerCase().includes('neural') || v.name.toLowerCase().includes('network'),
            isNative: true,
          }));

          if (voiceList.length > 0 && isMounted) {
            setVoices(voiceList);
            const preferred =
              voiceList.find(v => v.isNeural && v.lang.startsWith('es')) ||
              voiceList.find(v => v.lang.startsWith('es')) ||
              voiceList[0];
            setSelectedVoice(preferred);
          } else if (isMounted) {
            // Default Spanish system voice fallback
            const fallbackVoice: TtsVoiceOption = {
              name: 'Voz del Sistema (Español)',
              lang: 'es-ES',
              isNeural: true,
              isNative: true,
            };
            setVoices([fallbackVoice]);
            setSelectedVoice(fallbackVoice);
          }
        } catch (e) {
          console.warn('[TTS] Error loading native voices:', e);
        }
      } else if (typeof window !== 'undefined' && window.speechSynthesis) {
        setUseNativeTts(false);

        const loadWebVoices = () => {
          const available = window.speechSynthesis.getVoices();
          if (available.length > 0 && isMounted) {
            const mapped: TtsVoiceOption[] = available.map(v => ({
              name: v.name,
              lang: v.lang,
              isNeural: v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('neural') || v.name.toLowerCase().includes('google'),
              isNative: false,
            }));
            setVoices(mapped);

            const spanishVoices = mapped.filter(
              v => v.lang.startsWith('es') || v.lang.includes('ES') || v.lang.includes('MX')
            );
            const preferred =
              spanishVoices.find(v => v.isNeural) ||
              spanishVoices[0] ||
              mapped[0];
            setSelectedVoice(preferred);
          }
        };

        loadWebVoices();
        window.speechSynthesis.onvoiceschanged = loadWebVoices;
      }
    };

    setupEngine();

    return () => {
      isMounted = false;
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handler when a sentence completes reading
  const handleSegmentDone = (completedIndex: number) => {
    if (!isPlayingRef.current) return;

    const list = segmentsRef.current;
    const next = completedIndex + 1;

    if (next < list.length) {
      setSegmentIndex(next);
      segmentIndexRef.current = next;

      // Guideline 2: Natural breathing micropause between phrases
      const nextSeg = list[next];
      const pauseDuration = Math.max(120, Math.min(600, nextSeg?.pauseBeforeMs || 250));

      pauseTimerRef.current = setTimeout(() => {
        if (isPlayingRef.current) {
          speakSegment(next);
        }
      }, pauseDuration);
    } else {
      // Reached the end of the current page!
      if (currentPageRef.current < totalPagesRef.current) {
        isAwaitingNewPageRef.current = true;
        // Breathes for 350ms before turning page
        pauseTimerRef.current = setTimeout(() => {
          if (isPlayingRef.current) {
            onNextPageRef.current();
          }
        }, 350);
      } else {
        // End of the entire book
        setIsPlaying(false);
        setIsPaused(false);
      }
    }
  };

  // Listen to native Android TTS playback events
  useEffect(() => {
    if (!useNativeTts) return;

    let onStartHandle: PluginListenerHandle | null = null;
    let onDoneHandle: PluginListenerHandle | null = null;
    let onErrorHandle: PluginListenerHandle | null = null;

    NativeTts.addListener('onStart', data => {
      if (!data || data.utteranceId !== activeUtteranceIdRef.current) return;
      setIsPlaying(true);
      setIsPaused(false);
    }).then(h => (onStartHandle = h));

    NativeTts.addListener('onDone', data => {
      // STRICT FILTER: Only proceed if utteranceId strictly matches the active utterance
      if (!data || data.utteranceId !== activeUtteranceIdRef.current) {
        return;
      }
      activeUtteranceIdRef.current = null;
      handleSegmentDone(segmentIndexRef.current);
    }).then(h => (onDoneHandle = h));

    NativeTts.addListener('onError', data => {
      if (!data || data.utteranceId !== activeUtteranceIdRef.current) return;
      activeUtteranceIdRef.current = null;
      setIsPlaying(false);
      setIsPaused(false);
    }).then(h => (onErrorHandle = h));

    return () => {
      onStartHandle?.remove();
      onDoneHandle?.remove();
      onErrorHandle?.remove();
    };
  }, [useNativeTts]);

  // Stop speech when modal is closed
  useEffect(() => {
    if (!isOpen) {
      handleStop();
    }
  }, [isOpen]);

  // Speak a specific segment by index applying all 5 Narrator Guidelines
  const speakSegment = async (index: number) => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }

    const list = segmentsRef.current;
    if (!list || list.length === 0) return;

    if (index >= list.length) {
      if (currentPageRef.current < totalPagesRef.current) {
        isAwaitingNewPageRef.current = true;
        onNextPageRef.current();
      } else {
        setIsPlaying(false);
        setIsPaused(false);
      }
      return;
    }

    const seg = list[index];
    if (!seg || !seg.text || !seg.text.trim()) {
      handleSegmentDone(index);
      return;
    }

    setSegmentIndex(index);
    segmentIndexRef.current = index;

    // Guideline 1 & 4: Master Audiobook Narrator prosody (Pacing, Cadence & Pitch)
    const finalRate = Math.max(0.65, Math.min(1.8, speed * seg.rateMultiplier));
    const finalPitch = Math.max(0.75, Math.min(1.3, seg.pitch));

    // NATIVE ANDROID TTS PATH
    if (useNativeTts) {
      try {
        const generatedId = 'utt_' + Date.now();
        activeUtteranceIdRef.current = generatedId;

        const res = await NativeTts.speak({
          text: seg.text,
          rate: finalRate,
          pitch: finalPitch,
          voiceName: selectedVoice?.name && selectedVoice.name !== 'Voz del Sistema (Español)' ? selectedVoice.name : undefined,
        });

        if (res && res.utteranceId) {
          activeUtteranceIdRef.current = res.utteranceId;
        }

        setIsPlaying(true);
        setIsPaused(false);
      } catch (err) {
        console.warn('[NativeTts] speak notice:', err);
      }
      return;
    }

    // WEB SPEECH API PATH (Fallback for Web / Desktop)
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(seg.text);

    if (selectedVoice) {
      const matchingWebVoice = window.speechSynthesis.getVoices().find(v => v.name === selectedVoice.name);
      if (matchingWebVoice) {
        utterance.voice = matchingWebVoice;
      }
    }

    utterance.lang = selectedVoice?.lang || 'es-ES';
    utterance.rate = finalRate;
    utterance.pitch = finalPitch;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      if (!isPlayingRef.current) return;
      handleSegmentDone(index);
    };

    utterance.onerror = e => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('[WebSpeech] utterance notice:', e.error);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Play / Resume
  const handlePlay = () => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }

    if (segments.length === 0) return;

    setIsPlaying(true);
    setIsPaused(false);
    speakSegment(segmentIndex);
  };

  // Pause
  const handlePause = () => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }

    activeUtteranceIdRef.current = null;

    if (useNativeTts) {
      NativeTts.stop();
    } else if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(true);
  };

  // Stop
  const handleStop = () => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }

    activeUtteranceIdRef.current = null;

    if (useNativeTts) {
      NativeTts.stop();
    } else if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setSegmentIndex(0);
    segmentIndexRef.current = 0;
  };

  // Adjust speed on the fly
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      handleStop();
      setTimeout(() => {
        setIsPlaying(true);
        speakSegment(segmentIndexRef.current);
      }, 120);
    }
  };

  // Skip forward to next phrase
  const handleNextSegment = () => {
    if (segmentIndex + 1 < segments.length) {
      const next = segmentIndex + 1;
      setSegmentIndex(next);
      segmentIndexRef.current = next;
      if (isPlaying) speakSegment(next);
    } else if (currentPage < totalPages) {
      onNextPageRef.current();
    }
  };

  // Skip backward to previous phrase
  const handlePrevSegment = () => {
    if (segmentIndex > 0) {
      const prev = segmentIndex - 1;
      setSegmentIndex(prev);
      segmentIndexRef.current = prev;
      if (isPlaying) speakSegment(prev);
    } else if (currentPage > 1) {
      onPrevPageRef.current();
    }
  };

  if (!isOpen) return null;

  const activeSegment = segments[segmentIndex] || segments[0];
  const progressPercent = segments.length > 0 ? Math.round(((segmentIndex + 1) / segments.length) * 100) : 0;
  const isTextLoading = segments.length === 0;

  return (
    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg bg-slate-900/95 dark:bg-[#18191c]/95 text-white backdrop-blur-md border border-slate-700/80 dark:border-zinc-700/80 rounded-3xl shadow-2xl p-4 animate-in slide-in-from-bottom duration-150">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 dark:bg-zinc-800 dark:text-zinc-200">
            <Volume2 className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Narrador de Audiolibro Profesional</span>
              </h4>
              {/* Dynamic Mood Badge following guidelines */}
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 dark:bg-zinc-800 border border-slate-700 dark:border-zinc-700 text-rose-300 dark:text-zinc-200 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                {isTextLoading ? '📖 Preparando...' : (isPaused ? '⏸️ En pausa' : activeSegment?.moodLabel || '🎙️ Narrador Cálido')}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-zinc-400">
              Pág. {currentPage} de {totalPages} • {isTextLoading ? 'Extrayendo texto...' : `Frase ${segmentIndex + 1} de ${segments.length} (${progressPercent}%)`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            handleStop();
            onClose();
          }}
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Cerrar reproductor"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Spoken Text Preview Card with Audio Waves */}
      <div className="my-2.5 p-3.5 rounded-2xl bg-black/40 border border-slate-800/80 dark:border-zinc-800/60 max-h-24 overflow-y-auto relative">
        {isTextLoading ? (
          <div className="flex items-center justify-center gap-2 py-2 text-slate-400 dark:text-zinc-400 text-xs">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
            <span>Extrayendo texto de «{bookTitle}»...</span>
          </div>
        ) : (
          <p className="text-xs text-slate-200 dark:text-zinc-200 font-sans leading-relaxed">
            {activeSegment?.fullPhrase ? (
              <span>
                <span className="text-rose-400 dark:text-zinc-400 font-bold mr-1">“</span>
                {activeSegment.fullPhrase}
                <span className="text-rose-400 dark:text-zinc-400 font-bold ml-1">”</span>
              </span>
            ) : (
              <span className="text-slate-400 dark:text-zinc-400 italic">Listo para narrar.</span>
            )}
          </p>
        )}

        {isPlaying && !isTextLoading && (
          <div className="absolute top-2 right-2 flex items-end gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-rose-400 dark:bg-zinc-300 animate-pulse" />
            <span className="w-0.5 h-2 bg-rose-400 dark:bg-zinc-300 animate-ping" />
            <span className="w-0.5 h-3.5 bg-rose-400 dark:bg-zinc-300 animate-pulse" />
          </div>
        )}
      </div>

      {/* Progress Bar of Current Page */}
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-2.5">
        <div
          className="h-full bg-rose-500 dark:bg-zinc-300 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Playback Controls & Voice Customizer */}
      <div className="flex items-center justify-between pt-1">
        {/* Speed toggle */}
        <div className="flex items-center gap-1 bg-slate-800/80 dark:bg-zinc-800/80 px-2 py-1 rounded-xl">
          <FastForward className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={speed}
            onChange={e => handleSpeedChange(Number(e.target.value))}
            className="bg-transparent text-xs text-slate-200 dark:text-zinc-200 font-bold outline-none cursor-pointer"
            title="Velocidad base de lectura"
          >
            <option value={0.75} className="bg-slate-900 text-white">0.75x</option>
            <option value={1.0} className="bg-slate-900 text-white">1.0x</option>
            <option value={1.25} className="bg-slate-900 text-white">1.25x</option>
            <option value={1.5} className="bg-slate-900 text-white">1.5x</option>
            <option value={2.0} className="bg-slate-900 text-white">2.0x</option>
          </select>
        </div>

        {/* Play / Skip Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevSegment}
            disabled={isTextLoading}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
            title="Frase anterior"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={isPlaying ? handlePause : handlePlay}
            disabled={isTextLoading}
            className="p-3 rounded-2xl bg-rose-500 hover:bg-rose-600 dark:bg-zinc-200 dark:hover:bg-white text-white dark:text-zinc-950 disabled:opacity-40 shadow-lg transition-transform active:scale-95 cursor-pointer"
            title={isPlaying ? 'Pausar narración' : 'Iniciar narración humana'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current" />
            )}
          </button>

          <button
            type="button"
            onClick={handleStop}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Detener"
          >
            <Square className="w-4 h-4 fill-slate-300" />
          </button>

          <button
            type="button"
            onClick={handleNextSegment}
            disabled={isTextLoading}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
            title="Siguiente frase"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Voice selector */}
        {voices.length > 0 && (
          <div className="flex items-center gap-1 bg-slate-800/80 dark:bg-zinc-800/80 px-2 py-1 rounded-xl max-w-[125px]">
            <Languages className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <select
              value={selectedVoice?.name || ''}
              onChange={e => {
                const v = voices.find(vc => vc.name === e.target.value);
                if (v) {
                  setSelectedVoice(v);
                  if (isPlaying) {
                    handleStop();
                    setTimeout(() => {
                      setIsPlaying(true);
                      speakSegment(segmentIndexRef.current);
                    }, 120);
                  }
                }
              }}
              className="bg-transparent text-[11px] text-slate-200 dark:text-zinc-200 font-medium outline-none truncate cursor-pointer w-full"
              title="Voz del narrador"
            >
              {voices.map(v => (
                <option key={v.name} value={v.name} className="bg-slate-900 text-white">
                  {v.isNeural ? `⭐ ${v.name}` : v.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
