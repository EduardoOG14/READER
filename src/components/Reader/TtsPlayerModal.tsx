import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
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
} from 'lucide-react';

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
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveTimerRef = useRef<any>(null);
  const isPlayingRef = useRef<boolean>(false);
  const onNextPageRef = useRef(onNextPage);
  const onPrevPageRef = useRef(onPrevPage);

  useLayoutEffect(() => {
    isPlayingRef.current = isPlaying;
    onNextPageRef.current = onNextPage;
    onPrevPageRef.current = onPrevPage;
  });

  // Stop speech when modal is closed
  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [isOpen]);

  // Split current page text into readable sentences/segments
  const sentences = useMemo(() => {
    if (!currentText || !currentText.trim()) {
      return [`${bookTitle}, página ${currentPage}.`];
    }

    // Clean text
    const clean = currentText
      .replace(/\s+/g, ' ')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .trim();

    // Split by punctuation (. ? ! ; \n) into natural sentences
    const matches = clean.match(/[^.!?;\n]+[.!?;\n]+|[^.!?;\n]+$/g);
    if (matches && matches.length > 0) {
      return matches.map(s => s.trim()).filter(s => s.length > 0);
    }
    return [clean];
  }, [currentText, bookTitle, currentPage]);

  const isAwaitingNewPageRef = useRef<boolean>(false);
  const prevPageRef = useRef<number>(currentPage);
  const sentencesRef = useRef<string[]>(sentences);
  sentencesRef.current = sentences;

  // Track page transitions
  useEffect(() => {
    if (prevPageRef.current !== currentPage) {
      prevPageRef.current = currentPage;
      setSentenceIndex(0);
      if (isPlayingRef.current) {
        isAwaitingNewPageRef.current = true;
      }
    }
  }, [currentPage]);

  // Load available voices from SpeechSynthesis
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        setVoices(available);
        // Find Spanish voice or first available
        const spanishVoice = available.find(
          v => v.lang.startsWith('es') || v.lang.includes('ES') || v.lang.includes('MX')
        );
        setSelectedVoice(spanishVoice || available[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
      if (keepAliveTimerRef.current) {
        clearInterval(keepAliveTimerRef.current);
      }
    };
  }, []);

  // Web Speech API Keepalive for mobile Android WebView / Chrome
  useEffect(() => {
    if (isPlaying && !isPaused) {
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
      if (keepAliveTimerRef.current) {
        clearInterval(keepAliveTimerRef.current);
      }
    };
  }, [isPlaying, isPaused]);

  // Speak a specific sentence by index
  const speakSentence = (index: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const list = sentencesRef.current;
    if (index >= list.length) {
      // Reached the end of current page!
      if (currentPage < totalPages) {
        isAwaitingNewPageRef.current = true;
        onNextPageRef.current();
      } else {
        setIsPlaying(false);
        setIsPaused(false);
      }
      return;
    }

    const textToSpeak = list[index];
    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = speed;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      // Advance to next sentence
      setSentenceIndex(prev => {
        const next = prev + 1;
        const currentList = sentencesRef.current;
        if (next < currentList.length) {
          setTimeout(() => {
            if (isPlayingRef.current) {
              speakSentence(next);
            }
          }, 80);
          return next;
        } else {
          // Finished this page completely
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

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('TTS utterance notice:', e.error);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Play button
  const handlePlay = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);
    speakSentence(sentenceIndex);
  };

  // Pause button
  const handlePause = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  // Stop button
  const handleStop = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setSentenceIndex(0);
  };

  // Resume reading when new page content arrives
  useEffect(() => {
    if (isAwaitingNewPageRef.current && isPlaying && !isPaused) {
      isAwaitingNewPageRef.current = false;
      const timer = setTimeout(() => {
        speakSentence(0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentText]);

  // Fallback timer if text did not trigger or took longer
  useEffect(() => {
    if (isPlaying && !isPaused) {
      const fallback = setTimeout(() => {
        if (isAwaitingNewPageRef.current) {
          isAwaitingNewPageRef.current = false;
          speakSentence(0);
        }
      }, 450);
      return () => clearTimeout(fallback);
    }
  }, [currentPage]);

  // Adjust speed on the fly
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      handleStop();
      setTimeout(() => {
        setIsPlaying(true);
        speakSentence(sentenceIndex);
      }, 100);
    }
  };

  // Jump to next sentence
  const handleNextSentence = () => {
    if (sentenceIndex + 1 < sentences.length) {
      const next = sentenceIndex + 1;
      setSentenceIndex(next);
      if (isPlaying) speakSentence(next);
    } else if (currentPage < totalPages) {
      onNextPageRef.current();
    }
  };

  // Jump to previous sentence
  const handlePrevSentence = () => {
    if (sentenceIndex > 0) {
      const prev = sentenceIndex - 1;
      setSentenceIndex(prev);
      if (isPlaying) speakSentence(prev);
    } else if (currentPage > 1) {
      onPrevPageRef.current();
    }
  };

  if (!isOpen) return null;

  const activeSentence = sentences[sentenceIndex] || sentences[0] || '';
  const progressPercent = sentences.length > 0 ? Math.round(((sentenceIndex + 1) / sentences.length) * 100) : 0;

  return (
    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg bg-slate-900/95 dark:bg-[#18191c]/95 text-white backdrop-blur-md border border-slate-700/80 dark:border-zinc-700/80 rounded-3xl shadow-2xl p-4 animate-in slide-in-from-bottom duration-150">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800 dark:border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400 dark:bg-zinc-700 dark:text-zinc-200">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Lectura en Voz Alta (TTS)</span>
              {isPlaying && (
                <span className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-3 bg-rose-400 dark:bg-zinc-400 animate-pulse" />
                  <span className="w-0.5 h-2 bg-rose-400 dark:bg-zinc-400 animate-ping" />
                  <span className="w-0.5 h-3.5 bg-rose-400 dark:bg-zinc-400 animate-pulse" />
                </span>
              )}
            </h4>
            <p className="text-[10px] text-slate-400 dark:text-zinc-400">
              Página {currentPage} de {totalPages} • Frase {sentenceIndex + 1} de {sentences.length} ({progressPercent}%)
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            handleStop();
            onClose();
          }}
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Spoken Text Preview Card */}
      <div className="my-2.5 p-3 rounded-2xl bg-black/40 border border-slate-800/80 dark:border-zinc-800/60 max-h-24 overflow-y-auto">
        <p className="text-xs text-slate-200 dark:text-zinc-200 font-sans leading-relaxed">
          {activeSentence ? (
            <span>
              <span className="text-rose-400 dark:text-zinc-400 font-bold mr-1">“</span>
              {activeSentence}
              <span className="text-rose-400 dark:text-zinc-400 font-bold ml-1">”</span>
            </span>
          ) : (
            <span className="text-slate-500 italic">Cargando texto de la página...</span>
          )}
        </p>
      </div>

      {/* Progress Bar of Current Page Sentences */}
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-rose-500 dark:bg-zinc-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between pt-1">
        {/* Speed toggle */}
        <div className="flex items-center gap-1 bg-slate-800/80 dark:bg-zinc-800/80 px-2 py-1 rounded-xl">
          <FastForward className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={speed}
            onChange={e => handleSpeedChange(Number(e.target.value))}
            className="bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer"
          >
            <option value={0.75} className="bg-slate-900 text-white">0.75x</option>
            <option value={1.0} className="bg-slate-900 text-white">1.0x</option>
            <option value={1.25} className="bg-slate-900 text-white">1.25x</option>
            <option value={1.5} className="bg-slate-900 text-white">1.5x</option>
            <option value={2.0} className="bg-slate-900 text-white">2.0x</option>
          </select>
        </div>

        {/* Center: Prev sentence, Play/Pause, Next sentence, Stop */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevSentence}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Frase anterior"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="p-3 rounded-2xl bg-rose-500 hover:bg-rose-600 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white shadow-lg transition-transform active:scale-95"
            title={isPlaying ? 'Pausar voz' : 'Iniciar lectura'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
          </button>

          <button
            onClick={handleNextSentence}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Frase siguiente"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleStop}
            disabled={!isPlaying && !isPaused}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Detener voz"
          >
            <Square className="w-4 h-4 fill-slate-400" />
          </button>
        </div>

        {/* Voice selector */}
        {voices.length > 0 && (
          <div className="flex items-center gap-1 bg-slate-800/80 dark:bg-zinc-800/80 px-2 py-1 rounded-xl max-w-[110px]">
            <Languages className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <select
              value={selectedVoice?.name || ''}
              onChange={e => {
                const v = voices.find(vox => vox.name === e.target.value);
                if (v) {
                  setSelectedVoice(v);
                  if (isPlaying) {
                    handleStop();
                    setTimeout(() => {
                      setIsPlaying(true);
                      speakSentence(sentenceIndex);
                    }, 100);
                  }
                }
              }}
              className="bg-transparent text-xs text-slate-200 outline-none truncate cursor-pointer w-full"
            >
              {voices.map(vox => (
                <option key={vox.name} value={vox.name} className="bg-slate-900 text-white">
                  {vox.name.replace(/Google|Microsoft/g, '').trim()}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
