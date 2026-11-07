import React, { useState, useEffect } from 'react';
import { X, BookOpen, Globe, Volume2, Copy, Check, Loader2, Bookmark } from 'lucide-react';
import { useSwipeDownToClose } from '../../hooks/useSwipeDownToClose';
import { useBackHandler } from '../../services/backButton';
import { NativeTts } from '../../services/audiobookNarrator';

interface DictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  onSaveBookmarkQuote: (quote: string) => void;
}

export const DictionaryModal: React.FC<DictionaryModalProps> = ({
  isOpen,
  onClose,
  selectedText,
  onSaveBookmarkQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'define' | 'translate'>('define');
  const [loading, setLoading] = useState(false);
  const [definition, setDefinition] = useState<{
    word: string;
    phonetic?: string;
    meanings: { partOfSpeech: string; definitions: string[] }[];
  } | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedQuote, setSavedQuote] = useState(false);

  const { dragHandleProps, modalStyle } = useSwipeDownToClose({ onClose });

  useBackHandler(() => {
    if (isOpen) {
      onClose();
      return true;
    }
    return false;
  }, 130, isOpen);

  const cleanWord = selectedText.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()«»""'']/g, '');

  useEffect(() => {
    if (!isOpen || !selectedText) return;
    setDefinition(null);
    setTranslation(null);
    setErrorMsg(null);
    setSavedQuote(false);

    if (activeTab === 'define') {
      lookupDefinition();
    } else {
      lookupTranslation();
    }
  }, [isOpen, selectedText, activeTab]);

  const lookupDefinition = async () => {
    setLoading(true);
    setErrorMsg(null);

    // Try Spanish definition from Free Dictionary API or Wiktionary
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/es/${encodeURIComponent(cleanWord.toLowerCase())}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const entry = data[0];
        const meanings = (entry.meanings || []).map((m: any) => ({
          partOfSpeech: m.partOfSpeech || 'Definición',
          definitions: (m.definitions || []).map((d: any) => d.definition).slice(0, 3),
        }));
        setDefinition({
          word: entry.word || cleanWord,
          phonetic: entry.phonetic,
          meanings,
        });
        setLoading(false);
        return;
      }
    } catch {}

    // Fallback: Wikipedia Spanish summary
    try {
      const wikiUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanWord)}`;
      const wRes = await fetch(wikiUrl);
      if (wRes.ok) {
        const wData = await wRes.json();
        if (wData.extract) {
          setDefinition({
            word: cleanWord,
            meanings: [
              {
                partOfSpeech: 'Enciclopedia / Definición',
                definitions: [wData.extract],
              },
            ],
          });
          setLoading(false);
          return;
        }
      }
    } catch {}

    setErrorMsg(`No se encontró una definición exacta para «${cleanWord}». Puedes probar la pestaña de Traducción.`);
    setLoading(false);
  };

  const lookupTranslation = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const isEnglishLikely = /^[a-zA-Z\s]+$/.test(selectedText) && !/[áéíóúüñ]/i.test(selectedText);
      const pair = isEnglishLikely ? 'en|es' : 'es|en';
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(selectedText)}&langpair=${pair}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.responseData?.translatedText) {
          setTranslation(data.responseData.translatedText);
          setLoading(false);
          return;
        }
      }
    } catch {}

    setErrorMsg('No se pudo conectar con el servicio de traducción.');
    setLoading(false);
  };

  const handleSpeak = () => {
    NativeTts.speak({ text: cleanWord, rate: 1.0, pitch: 1.0 }).catch(() => {});
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSaveQuote = () => {
    onSaveBookmarkQuote(selectedText);
    setSavedQuote(true);
    setTimeout(() => setSavedQuote(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        style={modalStyle}
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border-t sm:border border-rose-200/80 dark:border-zinc-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div
          className="w-full flex items-center justify-center pt-0 pb-2.5 -mt-2 cursor-grab active:cursor-grabbing touch-none select-none shrink-0 sm:hidden"
          {...dragHandleProps}
        >
          <div className="w-12 h-1.5 bg-rose-200 dark:bg-zinc-700 rounded-full" />
        </div>

        {/* Header */}
        <div
          {...dragHandleProps}
          className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-zinc-800 shrink-0 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <BookOpen className="w-5 h-5 stroke-[2.3]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-[#4c0519] dark:text-zinc-100 truncate max-w-[220px] sm:max-w-xs">
                «{cleanWord}»
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Diccionario y traducción sin salir de lectura
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center gap-1.5 pt-3 pb-2 shrink-0">
          <button
            onClick={() => setActiveTab('define')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'define'
                ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                : 'bg-rose-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-rose-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Definición</span>
          </button>

          <button
            onClick={() => setActiveTab('translate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'translate'
                ? 'bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                : 'bg-rose-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-rose-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Traducción</span>
          </button>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={handleSpeak}
              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Escuchar pronunciación"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Copiar texto"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto py-2 space-y-3 min-h-[140px] pr-1">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2.5 text-slate-400">
              <Loader2 className="w-7 h-7 animate-spin text-rose-500" />
              <span className="text-xs font-semibold">Consultando diccionario...</span>
            </div>
          ) : errorMsg ? (
            <div className="py-8 text-center text-slate-500 dark:text-zinc-400 space-y-2">
              <p className="text-xs leading-relaxed max-w-sm mx-auto">{errorMsg}</p>
            </div>
          ) : activeTab === 'define' && definition ? (
            <div className="space-y-3">
              {definition.phonetic && (
                <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                  {definition.phonetic}
                </div>
              )}
              {definition.meanings.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-rose-50/60 dark:bg-zinc-800/50 border border-rose-100 dark:border-zinc-800/80 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    {m.partOfSpeech}
                  </span>
                  <ul className="space-y-1 text-xs text-[#4c0519] dark:text-zinc-200 leading-relaxed list-disc list-inside">
                    {m.definitions.map((d, dIdx) => (
                      <li key={dIdx} className="font-medium">{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : activeTab === 'translate' && translation ? (
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-zinc-800/60 border border-rose-200/70 dark:border-zinc-800 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Resultado de Traducción:
              </span>
              <p className="text-sm font-semibold text-[#4c0519] dark:text-zinc-100 leading-relaxed">
                {translation}
              </p>
            </div>
          ) : null}
        </div>

        {/* Action: Guardar esta frase en marcadores */}
        <div className="pt-3 border-t border-rose-100 dark:border-zinc-800 shrink-0">
          <button
            onClick={handleSaveQuote}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              savedQuote
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs active:scale-98'
            }`}
          >
            {savedQuote ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>¡Cita guardada en Marcadores!</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Guardar esta frase en los Marcadores</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
