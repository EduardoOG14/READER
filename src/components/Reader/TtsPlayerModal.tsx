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

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveTimerRef = useRef<any>(null);
  const pauseTimerRef = useRef<any>(null);
  const isPlayingRef = useRef<boolean>(false);
  const onNextPageRef = useRef(onNextPage);
  const onPrevPageRef = useRef(onPrevPage);

  useLayoutEffect(() => {
    isPlayingRef.current = isPlaying;
    onNextPageRef.current = onNextPage;
    onPrevPageRef.current = onPrevPage;
  });

  // Extract fallback text directly from active reader if currentText was empty
  const effectiveText = useMemo(() => {
    if (currentText && currentText.trim().length > 15) {
      return currentText;
    }

    // Try extracting from active iframe in DOM
    if (typeof document !== 'undefined') {
      const iframes = document.querySelectorAll('iframe');
      for (let i = 0; i < iframes.length; i++) {
        try {
          const bodyText = iframes[i].contentDocument?.body?.innerText;
          if (bodyText && bodyText.trim().length > 20) {
            return bodyText.trim();
          }
        } catch {}
      }

      // Try text reader container
      const textContainer = document.querySelector('.whitespace-pre-wrap');
      if (textContainer && (textContainer as HTMLElement).innerText?.trim().length > 20) {
        return (textContainer as HTMLElement).innerText.trim();
      }
    }

    return currentText || '';
  }, [currentText, currentPage, isOpen]);

  // Parse text using Master Audiobook Narrator guidelines
  const segments: AudiobookSegment[] = useMemo(() => {
    if (!effectiveText || !effectiveText.trim()) {
      return [
        {
          text: `${bookTitle}, página ${currentPage}.`,
          fullPhrase: `${bookTitle}, página ${currentPage}.`,
          role: 'narrator',
          pitch: 0.98,
          rateMultiplier: 1.0,
          pauseBeforeMs: 300,
          moodLabel: '🎙️ Narrador',
        },
      ];
    }

    const parsed = parseAudiobookSegments(effectiveText);
    if (parsed.length > 0) return parsed;

    return [
      {
        text: effectiveText.trim(),
        fullPhrase: effectiveText.trim(),
        role: 'narrator',
        pitch: 0.98,
        rateMultiplier: 1.0,
        pauseBeforeMs: 300,
        moodLabel: '🎙️ Narrador',
      },
    ];
  }, [effectiveText, bookTitle, currentPage]);

  const segmentsRef = useRef<AudiobookSegment[]>(segments);
  segmentsRef.current = segments;

  const isAwaitingNewPageRef = useRef<boolean>(false);
  const prevPageRef = useRef<number>(currentPage);

  // Track page transitions
  useEffect(() => {
    if (prevPageRef.current !== currentPage) {
      prevPageRef.current = currentPage;
      setSegmentIndex(0);
      if (isPlayingRef.current) {
        isAwaitingNewPageRef.current = true;
      }
    }
  }, [currentPage]);

  // Initialize TTS Engine (Native Android vs Web Speech API) and load Spanish voices
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
            // Prioritize neural voice, then es-ES, then first available
            const preferred =
              voiceList.find(v => v.isNeural && v.lang.startsWith('es')) ||
              voiceList.find(v => v.lang.startsWith('es')) ||
              voiceList[0];
            setSelectedVoice(preferred);
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

  // Listen to native Android TTS playback events
  useEffect(() => {
    if (!useNativeTts) return;

    let onStartHandle: PluginListenerHandle | null = null;
    let onDoneHandle: PluginListenerHandle | null = null;
    let onErrorHandle: PluginListenerHandle | null = null;

    NativeTts.addListener('onStart', () => {
      setIsPlaying(true);
      setIsPaused(false);
    }).then(h => (onStartHandle = h));

    NativeTts.addListener('onDone', () => {
      // Advance to next segment
      setSegmentIndex(prev => {
        const next = prev + 1;
        const currentList = segmentsRef.current;
        if (next < currentList.length) {
          setTimeout(() => {
            if (isPlayingRef.current) {
              speakSegment(next);
            }
          }, 80);
          return next;
        } else {
          // Finished current page
          if (currentPage < totalPages) {
            isAwaitingNewPageRef.current = true;
            onNextPageRef.current();
          } else {
            setIsPlaying(false);
            setIsPaused(false);
          }
          return 0;
        }
      });
    }).then(h => (onDoneHandle = h));

    NativeTts.addListener('onError', () => {
      setIsPlaying(false);
      setIsPaused(false);
    }).then(h => (onErrorHandle = h));

    return () => {
      onStartHandle?.remove();
      onDoneHandle?.remove();
      onErrorHandle?.remove();
    };
  }, [useNativeTts, currentPage, totalPages]);

  // Stop speech when modal is closed
  useEffect(() => {
    if (!isOpen) {
      handleStop();
    }
  }, [isOpen]);

  // Web Speech API Keepalive for mobile Android WebView
  useEffect(() => {
    if (!useNativeTts && isPlaying && !isPaused) {
      keepAliveTimerRef.current = setInterval(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);
    } else {
      if (keepAliveTimerRef.current) {
        clearInterval(keepAliveTimerRef.current);
      }
    }

    return () => {
      if (keepAliveTimerRef.current) clearInterval(keepAliveTimerRef.current);
    };
  }, [isPlaying, isPaused, useNativeTts]);

  // Speak a specific segment by index applying all 5 Narrator Guidelines
  const speakSegment = async (index: number) => {
    const list = segmentsRef.current;
    if (index >= list.length) {
      if (currentPage < totalPages) {
        isAwaitingNewPageRef.current = true;
        onNextPageRef.current();
      } else {
        setIsPlaying(false);
        setIsPaused(false);
      }
      return;
    }

    const seg = list[index];
    if (!seg || !seg.text) return;

    // Guideline 1 & 4: Calculate final prosody
    const finalRate = Math.max(0.6, Math.min(2.5, speed * seg.rateMultiplier));
    const finalPitch = Math.max(0.7, Math.min(1.4, seg.pitch));

    // NATIVE ANDROID TTS PATH
    if (useNativeTts) {
      try {
        await NativeTts.speak({
          text: seg.text,
          rate: finalRate,
          pitch: finalPitch,
          voiceName: selectedVoice?.name,
          pauseBeforeMs: seg.pauseBeforeMs,
        });
      } catch (err) {
        console.warn('[NativeTts] speak notice:', err);
      }
      return;
    }

    // WEB SPEECH API PATH (Fallback for Web / Desktop)
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    // Guideline 2: Natural breathing micropause before speaking
    pauseTimerRef.current = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(seg.text);

      // Match voice
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
        setSegmentIndex(prev => {
          const next = prev + 1;
          const currentList = segmentsRef.current;
          if (next < currentList.length) {
            setTimeout(() => {
              if (isPlayingRef.current) {
                speakSegment(next);
              }
            }, 60);
            return next;
          } else {
            if (currentPage < totalPages) {
              isAwaitingNewPageRef.current = true;
              onNextPageRef.current();
            } else {
              setIsPlaying(false);
              setIsPaused(false);
            }
            return 0;
          }
        });
      };

      utterance.onerror = e => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('[WebSpeech] utterance notice:', e.error);
        }
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }, Math.min(250, seg.pauseBeforeMs));
  };

  // Play / Resume
  const handlePlay = () => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    if (isPaused) {
      if (!useNativeTts && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.resume();
      }
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);
    speakSegment(segmentIndex);
  };

  // Pause
  const handlePause = () => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    if (useNativeTts) {
      NativeTts.stop();
    } else if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
    setIsPlaying(false);
    setIsPaused(true);
  };

  // Stop
  const handleStop = () => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    if (useNativeTts) {
      NativeTts.stop();
    } else if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setSegmentIndex(0);
  };

  // Automatically continue narration when new page text is delivered
  useEffect(() => {
    if (isAwaitingNewPageRef.current && isPlaying && !isPaused) {
      isAwaitingNewPageRef.current = false;
      const timer = setTimeout(() => {
        speakSegment(0);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [effectiveText]);

  // Adjust speed on the fly
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      handleStop();
      setTimeout(() => {
        setIsPlaying(true);
        speakSegment(segmentIndex);
      }, 120);
    }
  };

  // Skip forward to next phrase
  const handleNextSegment = () => {
    if (segmentIndex + 1 < segments.length) {
      const next = segmentIndex + 1;
      setSegmentIndex(next);
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
      if (isPlaying) speakSegment(prev);
    } else if (currentPage > 1) {
      onPrevPageRef.current();
    }
  };

  if (!isOpen) return null;

  const activeSegment = segments[segmentIndex] || segments[0];
  const progressPercent = segments.length > 0 ? Math.round(((segmentIndex + 1) / segments.length) * 100) : 0;

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
                {activeSegment?.moodLabel || '🎙️ Narrador'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-zinc-400">
              Pág. {currentPage} de {totalPages} • Frase {segmentIndex + 1} de {segments.length} ({progressPercent}%)
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
        <p className="text-xs text-slate-200 dark:text-zinc-200 font-sans leading-relaxed">
          {activeSegment?.fullPhrase ? (
            <span>
              <span className="text-rose-400 dark:text-zinc-400 font-bold mr-1">“</span>
              {activeSegment.fullPhrase}
              <span className="text-rose-400 dark:text-zinc-400 font-bold ml-1">”</span>
            </span>
          ) : (
            <span className="text-slate-400 dark:text-zinc-400 italic">Preparando narración de la página...</span>
          )}
        </p>

        {isPlaying && (
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
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Frase anterior"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={isPlaying ? handlePause : handlePlay}
            className="p-3 rounded-2xl bg-rose-500 hover:bg-rose-600 dark:bg-zinc-200 dark:hover:bg-white text-white dark:text-zinc-950 shadow-lg transition-transform active:scale-95 cursor-pointer"
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
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
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
                      speakSegment(segmentIndex);
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
