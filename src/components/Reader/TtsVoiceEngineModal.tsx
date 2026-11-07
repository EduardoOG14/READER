import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  Check,
  Settings,
  Sparkles,
  Smartphone,
  Bot,
  Play,
  Pause,
  ExternalLink,
  Key,
} from 'lucide-react';
import {
  NativeTts,
  type TtsVoiceOption,
  type TtsEngineInfo,
  type CloudAiTtsSettings,
  synthesizeCloudAiAudio,
} from '../../services/audiobookNarrator';
import { useSwipeDownToClose } from '../../hooks/useSwipeDownToClose';
import { useBackHandler } from '../../services/backButton';

interface TtsVoiceEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
  voices: TtsVoiceOption[];
  selectedVoice: TtsVoiceOption | null;
  onSelectVoice: (voice: TtsVoiceOption) => void;
  cloudSettings: CloudAiTtsSettings;
  onUpdateCloudSettings: (settings: CloudAiTtsSettings) => void;
}

export const TtsVoiceEngineModal: React.FC<TtsVoiceEngineModalProps> = ({
  isOpen,
  onClose,
  voices,
  selectedVoice,
  onSelectVoice,
  cloudSettings,
  onUpdateCloudSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'system' | 'cloud'>('system');
  const [engines, setEngines] = useState<TtsEngineInfo[]>([]);
  const [selectedEngine, setSelectedEngine] = useState<string>('');
  const [testingVoiceId, setTestingVoiceId] = useState<string | null>(null);
  const [testAudio, setTestAudio] = useState<HTMLAudioElement | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Cloud form state
  const [provider, setProvider] = useState<'system' | 'openai' | 'elevenlabs'>(cloudSettings.provider || 'system');
  const [openaiKey, setOpenaiKey] = useState<string>(cloudSettings.openaiApiKey || '');
  const [openaiVoice, setOpenaiVoice] = useState<any>(cloudSettings.openaiVoice || 'onyx');
  const [elevenlabsKey, setElevenlabsKey] = useState<string>(cloudSettings.elevenlabsApiKey || '');
  const [elevenlabsVoiceId, setElevenlabsVoiceId] = useState<string>(cloudSettings.elevenlabsVoiceId || 'pNInz6obpgDQGcFmaJgB');
  const [cloudTestLoading, setCloudTestLoading] = useState<boolean>(false);
  const [cloudError, setCloudError] = useState<string | null>(null);

  useBackHandler(() => {
    if (isOpen) {
      handleStopTest();
      onClose();
      return true;
    }
    return false;
  }, 110, isOpen);

  const { dragHandleProps, modalStyle } = useSwipeDownToClose({
    onClose: () => {
      handleStopTest();
      onClose();
    },
  });

  // Load Android engines on open
  useEffect(() => {
    if (isOpen) {
      NativeTts.getEngines().then(res => {
        if (res && res.engines) {
          setEngines(res.engines);
          const current = res.engines.find(e => e.isCurrent) || res.engines.find(e => e.isDefault);
          if (current) setSelectedEngine(current.name);
        }
      }).catch(() => {});
    }
  }, [isOpen]);

  const handleStopTest = () => {
    if (testAudio) {
      testAudio.pause();
      testAudio.currentTime = 0;
      setTestAudio(null);
    }
    setTestingVoiceId(null);
    NativeTts.stop().catch(() => {});
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const handleTestSystemVoice = async (v: TtsVoiceOption) => {
    handleStopTest();
    setTestingVoiceId(v.id);

    const testPhrase = 'Hola, esta es una prueba de mi voz de narración para tus libros y mangas.';
    try {
      await NativeTts.speak({
        text: testPhrase,
        rate: 1.0,
        pitch: 1.0,
        voiceName: v.rawName || v.id,
      });
      setTimeout(() => {
        setTestingVoiceId(null);
      }, 3500);
    } catch {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance(testPhrase);
        u.lang = v.lang || 'es-ES';
        u.onend = () => setTestingVoiceId(null);
        window.speechSynthesis.speak(u);
      }
    }
  };

  const handleTestCloudVoice = async () => {
    handleStopTest();
    setCloudTestLoading(true);
    setCloudError(null);

    const tempSettings: CloudAiTtsSettings = {
      provider,
      openaiApiKey: openaiKey,
      openaiVoice,
      elevenlabsApiKey: elevenlabsKey,
      elevenlabsVoiceId,
    };

    try {
      const audioUrl = await synthesizeCloudAiAudio(
        'Hola, esta es mi voz de inteligencia artificial con entonación de estudio.',
        tempSettings
      );
      const audio = new Audio(audioUrl);
      setTestAudio(audio);
      audio.onended = () => {
        setTestAudio(null);
        setCloudTestLoading(false);
      };
      audio.onerror = () => {
        setCloudError('Error al reproducir el audio generado');
        setCloudTestLoading(false);
      };
      await audio.play();
    } catch (err: any) {
      setCloudError(err.message || 'Error al conectar con la API de IA');
      setCloudTestLoading(false);
    }
  };

  const handleSaveCloudSettings = () => {
    const updated: CloudAiTtsSettings = {
      provider,
      openaiApiKey: openaiKey,
      openaiVoice,
      elevenlabsApiKey: elevenlabsKey,
      elevenlabsVoiceId,
    };
    onUpdateCloudSettings(updated);
    onClose();
  };

  const handleOpenAndroidSettings = async () => {
    try {
      await NativeTts.openTtsSettings();
    } catch (e: any) {
      alert('Abre los Ajustes de tu teléfono > Sistema > Idioma > Texto a Voz.');
    }
  };

  const handleSelectEngine = async (engName: string) => {
    setSelectedEngine(engName);
    try {
      await NativeTts.setEngine({ engine: engName });
      setTimeout(async () => {
        const vRes = await NativeTts.getVoices();
        if (vRes && vRes.voices && vRes.voices.length > 0) {
          const mapped: TtsVoiceOption[] = vRes.voices.map(v => ({
            id: v.id,
            name: v.name,
            rawName: v.rawName,
            lang: v.lang,
            isNeural: v.isNeural,
            gender: v.gender,
            quality: v.quality,
            isNative: true,
          }));
          onSelectVoice(mapped[0]);
        }
      }, 400);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        style={modalStyle}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white dark:bg-[#18191c] border-t sm:border border-slate-200 dark:border-zinc-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 max-h-[90vh] flex flex-col text-slate-800 dark:text-zinc-100 pb-[env(safe-area-inset-bottom,0px)]"
      >
        {/* Swipe Handle */}
        <div
          className="w-full flex items-center justify-center pt-2 pb-1 cursor-grab active:cursor-grabbing touch-none select-none shrink-0 sm:hidden"
          {...dragHandleProps}
        >
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-zinc-600 rounded-full" />
        </div>

        {/* Header */}
        <div
          {...dragHandleProps}
          className="px-5 py-3 border-b border-slate-100 dark:border-zinc-800/80 flex items-center justify-between shrink-0 bg-slate-50/70 dark:bg-zinc-900/70 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-zinc-800 dark:text-zinc-200 flex items-center justify-center shadow-2xs">
              <Settings className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Voz y Motor de Lectura
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                Cambia de voz, motor de audio o conecta IA de estudio
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              handleStopTest();
              onClose();
            }}
            className="p-2 -mr-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-4 py-2 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/40 dark:bg-zinc-900/40 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              handleStopTest();
              setActiveTab('system');
            }}
            className={`flex-1 py-2 px-3 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'system'
                ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Voces del Teléfono (Gratis)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              handleStopTest();
              setActiveTab('cloud');
            }}
            className={`flex-1 py-2 px-3 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'cloud'
                ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>IA de Estudio (Ultra-Humana)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: SYSTEM VOICES & ENGINES */}
          {activeTab === 'system' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* How to get ultra-realistic Google voices tip */}
              <div className="p-3.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>¿Cómo activar la voz más humana en Android?</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowGuide(!showGuide)}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-300 underline cursor-pointer"
                  >
                    {showGuide ? 'Ocultar' : 'Ver pasos'}
                  </button>
                </div>

                {showGuide ? (
                  <div className="mt-2.5 pt-2.5 border-t border-blue-200 dark:border-blue-800/60 text-[11px] text-blue-800 dark:text-blue-200 space-y-1.5 leading-relaxed">
                    <p>1. Asegúrate de tener seleccionado <strong>Servicios de voz de Google</strong> abajo.</p>
                    <p>2. Toca el botón <strong>«Ajustes de Voz de Android»</strong> para abrir la configuración del sistema.</p>
                    <p>3. Toca el engranaje ⚙️ junto a Google → <em>«Instalar datos de voz»</em> → <em>«Español»</em> y descarga el paquete de <strong>Alta Calidad</strong>.</p>
                    <p>4. Elige abajo cualquiera de las voces marcadas con <strong>⭐ [Neuronal HD]</strong>.</p>
                  </div>
                ) : (
                  <p className="mt-1 text-[11px] text-blue-700 dark:text-blue-300">
                    Selecciona abajo las voces marcadas con <strong>⭐ [Neuronal HD]</strong> para escuchar la voz WaveNet natural de Google.
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleOpenAndroidSettings}
                  className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-98 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir Ajustes de Voz de Android (Descargar voces HD)</span>
                </button>
              </div>

              {/* TTS Engine Switcher (if device has multiple engines like Google vs Samsung) */}
              {engines.length > 1 && (
                <div className="p-3.5 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-200/80 dark:border-zinc-800 space-y-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5 text-rose-500" />
                    <span>Motor de Voz del Teléfono</span>
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {engines.map(eng => (
                      <button
                        key={eng.name}
                        type="button"
                        onClick={() => handleSelectEngine(eng.name)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedEngine === eng.name
                            ? 'border-rose-500 bg-rose-50/60 dark:border-zinc-400 dark:bg-zinc-800'
                            : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold block text-slate-900 dark:text-white">
                            {eng.label || eng.name}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
                            {eng.name} {eng.isDefault ? '• (Predeterminado del sistema)' : ''}
                          </span>
                        </div>
                        {selectedEngine === eng.name && (
                          <Check className="w-4 h-4 text-rose-500 dark:text-zinc-200 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Voices List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                  Voces en Español Disponibles ({voices.length})
                </span>

                <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
                  {voices.map(v => {
                    const isSelected = selectedVoice?.name === v.name || selectedVoice?.id === v.id;
                    const isTesting = testingVoiceId === v.id;

                    return (
                      <div
                        key={v.id || v.name}
                        className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                          isSelected
                            ? 'border-rose-500 bg-rose-50/80 dark:border-zinc-400 dark:bg-zinc-800 ring-2 ring-rose-500/20 shadow-xs'
                            : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onSelectVoice(v)}
                          className="flex-1 text-left cursor-pointer min-w-0 pr-2"
                        >
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {v.name}
                            </span>
                            {v.isNeural && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                                ⭐ Neuronal
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-zinc-400 block truncate font-mono">
                            {v.rawName || v.id}
                          </span>
                        </button>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Test button */}
                          <button
                            type="button"
                            onClick={() => handleTestSystemVoice(v)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 transition-colors cursor-pointer"
                            title="Escuchar muestra de voz"
                          >
                            {isTesting ? (
                              <Pause className="w-3.5 h-3.5 fill-current animate-pulse text-rose-500" />
                            ) : (
                              <Play className="w-3.5 h-3.5 fill-current" />
                            )}
                          </button>

                          {/* Select indicator */}
                          <button
                            type="button"
                            onClick={() => onSelectVoice(v)}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-rose-500 text-white dark:bg-zinc-200 dark:text-zinc-950'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300'
                            }`}
                            title="Seleccionar esta voz"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLOUD AI STUDIO (OPENAI & ELEVENLABS) */}
          {activeTab === 'cloud' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>Voces de Estudio con IA Real</span>
                </span>
                <p className="text-[11px] text-purple-800 dark:text-purple-300 leading-relaxed">
                  Conecta tu API Key de <strong>OpenAI</strong> o <strong>ElevenLabs</strong> para que la narración suene 100% como un actor de doblaje profesional humano con respiraciones reales.
                </p>
              </div>

              {/* Provider Selector */}
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block mb-1.5">
                  Proveedor de Voz
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProvider('openai')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      provider === 'openai'
                        ? 'border-purple-500 bg-purple-50/70 dark:border-purple-400 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    <span className="text-sm block font-bold">🤖 OpenAI TTS</span>
                    <span className="text-[10px] block opacity-80 font-medium">Voces Onyx, Echo, Alloy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider('elevenlabs')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      provider === 'elevenlabs'
                        ? 'border-purple-500 bg-purple-50/70 dark:border-purple-400 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    <span className="text-sm block font-bold">🎙️ ElevenLabs</span>
                    <span className="text-[10px] block opacity-80 font-medium">Doblaje Hiperrealista</span>
                  </button>
                </div>
              </div>

              {/* OpenAI Config */}
              {provider === 'openai' && (
                <div className="space-y-3 p-3.5 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5 mb-1">
                      <Key className="w-3.5 h-3.5 text-purple-500" />
                      <span>OpenAI API Key</span>
                    </label>
                    <input
                      type="password"
                      placeholder="sk-proj-..."
                      value={openaiKey}
                      onChange={e => setOpenaiKey(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-mono outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block mb-1">
                      Voz de Narración
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'onyx', label: 'Onyx (Profunda)', badge: 'Narrador' },
                        { id: 'echo', label: 'Echo (Cálida)', badge: 'Hombre' },
                        { id: 'fable', label: 'Fable (Teatral)', badge: 'Europeo' },
                        { id: 'alloy', label: 'Alloy (Neutra)', badge: 'Clara' },
                        { id: 'nova', label: 'Nova (Expresiva)', badge: 'Mujer' },
                        { id: 'shimmer', label: 'Shimmer (Suave)', badge: 'Mujer' },
                      ].map(v => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setOpenaiVoice(v.id as any)}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            openaiVoice === v.id
                              ? 'border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-900/40 text-purple-900 dark:text-purple-100 font-bold'
                              : 'border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                          }`}
                        >
                          <span className="text-[11px] font-bold block">{v.label}</span>
                          <span className="text-[9px] opacity-75">{v.badge}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ElevenLabs Config */}
              {provider === 'elevenlabs' && (
                <div className="space-y-3 p-3.5 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5 mb-1">
                      <Key className="w-3.5 h-3.5 text-purple-500" />
                      <span>ElevenLabs API Key</span>
                    </label>
                    <input
                      type="password"
                      placeholder="xi-api-key..."
                      value={elevenlabsKey}
                      onChange={e => setElevenlabsKey(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-mono outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block mb-1">
                      Voice ID
                    </label>
                    <input
                      type="text"
                      placeholder="pNInz6obpgDQGcFmaJgB (Adam)"
                      value={elevenlabsVoiceId}
                      onChange={e => setElevenlabsVoiceId(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-mono outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              )}

              {cloudError && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs">
                  {cloudError}
                </div>
              )}

              {/* Test Cloud Voice Button */}
              <button
                type="button"
                onClick={handleTestCloudVoice}
                disabled={cloudTestLoading}
                className="w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {cloudTestLoading ? (
                  <span>Generando audio con IA...</span>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>▶️ Probar Voz de IA en Español</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-3 bg-slate-50/70 dark:bg-zinc-900/70 shrink-0">
          <button
            type="button"
            onClick={() => {
              handleStopTest();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => {
              handleStopTest();
              if (activeTab === 'cloud') {
                handleSaveCloudSettings();
              } else {
                onClose();
              }
            }}
            className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-transform active:scale-98 cursor-pointer"
          >
            Aplicar y Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
