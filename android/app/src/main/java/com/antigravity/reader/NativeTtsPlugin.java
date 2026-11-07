package com.antigravity.reader;

import android.content.Intent;
import android.media.session.MediaSession;
import android.media.session.PlaybackState;
import android.os.Build;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@CapacitorPlugin(name = "NativeTts")
public class NativeTtsPlugin extends Plugin implements TextToSpeech.OnInitListener {
    private TextToSpeech tts;
    private boolean isInitialized = false;
    private volatile String currentUtteranceId = null;
    private String currentEngineName = null;
    private Voice currentSelectedVoice = null;
    private MediaSession mediaSession;

    @Override
    public void load() {
        super.load();
        initTts(null);
    }

    private synchronized void initTts(String engineName) {
        if (tts != null) {
            try {
                tts.stop();
                tts.shutdown();
            } catch (Exception ignored) {}
            tts = null;
            isInitialized = false;
        }

        try {
            if (engineName != null && !engineName.isEmpty()) {
                tts = new TextToSpeech(getContext(), this, engineName);
                currentEngineName = engineName;
            } else {
                tts = new TextToSpeech(getContext(), this);
            }
        } catch (Exception e) {
            tts = new TextToSpeech(getContext(), this);
        }
    }

    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS) {
            isInitialized = true;
            try {
                Locale esLocale = new Locale("es", "ES");
                int result = tts.setLanguage(esLocale);
                if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                    tts.setLanguage(new Locale("es"));
                }
            } catch (Exception ignored) {}

            // Automatically select the highest-quality Neural WaveNet Spanish voice available
            selectBestSpanishVoice();

            tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override
                public void onStart(String utteranceId) {
                    if (utteranceId != null && utteranceId.equals(currentUtteranceId)) {
                        JSObject data = new JSObject();
                        data.put("utteranceId", utteranceId);
                        notifyListeners("onStart", data);
                    }
                }

                @Override
                public void onDone(String utteranceId) {
                    if (utteranceId != null && utteranceId.equals(currentUtteranceId)) {
                        JSObject data = new JSObject();
                        data.put("utteranceId", utteranceId);
                        notifyListeners("onDone", data);
                    }
                }

                @Override
                public void onError(String utteranceId) {
                    if (utteranceId != null && utteranceId.equals(currentUtteranceId)) {
                        JSObject data = new JSObject();
                        data.put("utteranceId", utteranceId);
                        data.put("error", "Error in utterance " + utteranceId);
                        notifyListeners("onError", data);
                    }
                }

                @Override
                public void onError(String utteranceId, int errorCode) {
                    if (utteranceId != null && utteranceId.equals(currentUtteranceId)) {
                        JSObject data = new JSObject();
                        data.put("utteranceId", utteranceId);
                        data.put("errorCode", errorCode);
                        data.put("error", "Error " + errorCode + " in utterance " + utteranceId);
                        notifyListeners("onError", data);
                    }
                }
            });
        } else {
            isInitialized = false;
        }
    }

    private Voice selectBestSpanishVoice() {
        if (tts == null || Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
            return null;
        }
        try {
            Set<Voice> voices = tts.getVoices();
            if (voices == null || voices.isEmpty()) {
                return null;
            }

            Voice bestVoice = null;
            int highestScore = Integer.MIN_VALUE;

            for (Voice v : voices) {
                Locale loc = v.getLocale();
                if (loc == null || !loc.getLanguage().equalsIgnoreCase("es")) {
                    continue;
                }

                int score = getVoiceScore(v);
                if (score > highestScore) {
                    highestScore = score;
                    bestVoice = v;
                }
            }

            if (bestVoice != null) {
                tts.setVoice(bestVoice);
                currentSelectedVoice = bestVoice;
                return bestVoice;
            }
        } catch (Exception ignored) {}
        return null;
    }

    private boolean isNeuralVoice(Voice v) {
        String name = v.getName().toLowerCase();
        return v.isNetworkConnectionRequired() || name.contains("network") || name.contains("neural") || name.contains("natural") || v.getQuality() >= Voice.QUALITY_HIGH;
    }

    private String detectVoiceGender(Voice v) {
        String name = v.getName().toLowerCase();
        if (name.contains("eed") || name.contains("eef") || name.contains("sfd") || name.contains("male_1") || name.contains("-d-") || name.contains("-f-") || name.contains("#male")) {
            return "male";
        }
        if (name.contains("eea") || name.contains("sfb") || name.contains("ana") || name.contains("female") || name.contains("-a-") || name.contains("-b-") || name.contains("#female")) {
            return "female";
        }
        return "neutral";
    }

    private int getVoiceScore(Voice v) {
        int s = 0;
        String name = v.getName().toLowerCase();
        if (v.isNetworkConnectionRequired() || name.contains("network") || name.contains("neural") || name.contains("natural")) {
            s += 1000;
        }
        if (v.getQuality() >= Voice.QUALITY_HIGH) {
            s += 500;
        }
        // Penalize legacy offline Google Translate concatenative voices
        if (name.contains("local") || name.contains("ana") || name.contains("compact")) {
            s -= 300;
        }
        Locale loc = v.getLocale();
        if (loc != null) {
            String tag = loc.toLanguageTag().toLowerCase();
            if (tag.contains("es-es")) s += 200;
            else if (tag.contains("es-mx") || tag.contains("es-us")) s += 180;
            else s += 100;
        }
        return s;
    }

    private String formatFriendlyVoiceName(Voice v) {
        String name = v.getName();
        Locale loc = v.getLocale();
        String country = "Español";
        String flag = "🇪🇸";
        if (loc != null) {
            country = loc.getDisplayCountry();
            String tag = loc.toLanguageTag();
            if (tag.contains("ES") || tag.contains("es-ES")) flag = "🇪🇸";
            else if (tag.contains("MX") || tag.contains("es-MX")) flag = "🇲🇽";
            else if (tag.contains("US") || tag.contains("es-US")) flag = "🇺🇸";
            else if (tag.contains("AR") || tag.contains("es-AR")) flag = "🇦🇷";
            else if (tag.contains("CO") || tag.contains("es-CO")) flag = "🇨🇴";
            else if (tag.contains("CL") || tag.contains("es-CL")) flag = "🇨🇱";
        }

        boolean isNeural = isNeuralVoice(v);
        String gender = detectVoiceGender(v);
        String genderLabel = gender.equals("male") ? "Voz Masculina" : (gender.equals("female") ? "Voz Femenina" : "Voz");

        String idSuffix = "";
        if (name.contains("-eed")) idSuffix = " 1";
        else if (name.contains("-eea")) idSuffix = " 2";
        else if (name.contains("-eef")) idSuffix = " 3";
        else if (name.contains("-sfb")) idSuffix = " 1";
        else if (name.contains("-sfd")) idSuffix = " 2";

        String badge = isNeural ? " ⭐ [Neuronal HD]" : " [Básica]";

        return flag + " " + country + " • " + genderLabel + idSuffix + badge;
    }

    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("available", isInitialized && tts != null);
        call.resolve(ret);
    }

    @PluginMethod
    public void getVoices(PluginCall call) {
        JSArray voicesArray = new JSArray();
        Voice currentVoice = null;
        if (tts != null && isInitialized && Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            try {
                currentVoice = currentSelectedVoice != null ? currentSelectedVoice : tts.getVoice();
                Set<Voice> voices = tts.getVoices();
                if (voices != null) {
                    List<Voice> spanishList = new ArrayList<>();
                    for (Voice v : voices) {
                        if (v.getLocale() != null && v.getLocale().getLanguage().equalsIgnoreCase("es")) {
                            spanishList.add(v);
                        }
                    }

                    // Sort so Neural / High Quality voices appear first!
                    Collections.sort(spanishList, new Comparator<Voice>() {
                        @Override
                        public int compare(Voice a, Voice b) {
                            return Integer.compare(getVoiceScore(b), getVoiceScore(a));
                        }
                    });

                    for (Voice v : spanishList) {
                        JSObject voiceObj = new JSObject();
                        voiceObj.put("id", v.getName());
                        voiceObj.put("name", formatFriendlyVoiceName(v));
                        voiceObj.put("rawName", v.getName());
                        voiceObj.put("lang", v.getLocale().toLanguageTag());
                        voiceObj.put("isNetworkConnectionRequired", v.isNetworkConnectionRequired());
                        voiceObj.put("quality", v.getQuality());
                        voiceObj.put("isNeural", isNeuralVoice(v));
                        voiceObj.put("gender", detectVoiceGender(v));
                        voiceObj.put("isSelected", currentVoice != null && v.getName().equals(currentVoice.getName()));
                        voicesArray.put(voiceObj);
                    }
                }
            } catch (Exception ignored) {}
        }
        JSObject ret = new JSObject();
        ret.put("voices", voicesArray);
        ret.put("currentVoiceId", currentVoice != null ? currentVoice.getName() : "");
        call.resolve(ret);
    }

    @PluginMethod
    public void getEngines(PluginCall call) {
        JSArray enginesArray = new JSArray();
        String defaultEngine = "";
        if (tts != null) {
            try {
                defaultEngine = tts.getDefaultEngine();
                List<TextToSpeech.EngineInfo> engines = tts.getEngines();
                if (engines != null) {
                    for (TextToSpeech.EngineInfo info : engines) {
                        JSObject obj = new JSObject();
                        obj.put("name", info.name);
                        obj.put("label", info.label);
                        obj.put("isDefault", info.name.equals(defaultEngine));
                        obj.put("isCurrent", info.name.equals(currentEngineName != null ? currentEngineName : defaultEngine));
                        enginesArray.put(obj);
                    }
                }
            } catch (Exception ignored) {}
        }
        JSObject ret = new JSObject();
        ret.put("engines", enginesArray);
        ret.put("defaultEngine", defaultEngine);
        call.resolve(ret);
    }

    @PluginMethod
    public void setEngine(PluginCall call) {
        String engineName = call.getString("engine");
        if (engineName != null && !engineName.trim().isEmpty()) {
            initTts(engineName.trim());
            JSObject ret = new JSObject();
            ret.put("success", true);
            ret.put("engine", engineName);
            call.resolve(ret);
        } else {
            call.reject("El nombre del motor TTS es requerido");
        }
    }

    @PluginMethod
    public void openTtsSettings(PluginCall call) {
        try {
            Intent intent = new Intent("com.android.settings.TTS_SETTINGS");
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(intent);
            call.resolve();
        } catch (Exception e) {
            try {
                Intent fallback = new Intent(android.provider.Settings.ACTION_SETTINGS);
                fallback.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getContext().startActivity(fallback);
                call.resolve();
            } catch (Exception err) {
                call.reject("No se pudieron abrir los ajustes de voz del sistema: " + err.getMessage());
            }
        }
    }

    @PluginMethod
    public void speak(PluginCall call) {
        String text = call.getString("text", "");
        if (text == null || text.trim().isEmpty()) {
            call.resolve();
            return;
        }

        if (tts == null || !isInitialized) {
            initTts(currentEngineName);
            call.reject("El motor de voz de Android se está inicializando. Intenta de nuevo.");
            return;
        }

        Double rateD = call.getDouble("rate", 1.0);
        float rate = rateD != null ? rateD.floatValue() : 1.0f;
        rate = Math.max(0.6f, Math.min(2.0f, rate));

        Double pitchD = call.getDouble("pitch", 1.0);
        float pitch = pitchD != null ? pitchD.floatValue() : 1.0f;
        pitch = Math.max(0.75f, Math.min(1.35f, pitch));

        String voiceName = call.getString("voiceName", null);

        tts.setSpeechRate(rate);
        tts.setPitch(pitch);

        // Apply voice if selected
        if (voiceName != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            try {
                Set<Voice> voices = tts.getVoices();
                if (voices != null) {
                    for (Voice v : voices) {
                        if (v.getName().equals(voiceName)) {
                            tts.setVoice(v);
                            currentSelectedVoice = v;
                            break;
                        }
                    }
                }
            } catch (Exception ignored) {}
        } else if (currentSelectedVoice != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            tts.setVoice(currentSelectedVoice);
        }

        // Generate unique utterance id for this speech fragment
        currentUtteranceId = "utt_" + System.currentTimeMillis();

        int res;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Bundle params = new Bundle();
            params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, currentUtteranceId);
            res = tts.speak(text, TextToSpeech.QUEUE_FLUSH, params, currentUtteranceId);
        } else {
            java.util.HashMap<String, String> params = new java.util.HashMap<>();
            params.put(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, currentUtteranceId);
            res = tts.speak(text, TextToSpeech.QUEUE_FLUSH, params);
        }

        if (res == TextToSpeech.SUCCESS) {
            JSObject ret = new JSObject();
            ret.put("utteranceId", currentUtteranceId);
            call.resolve(ret);
        } else {
            call.reject("Error al iniciar reproducción en el motor de voz de Android (" + res + ").");
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        currentUtteranceId = null;
        if (tts != null) {
            try {
                tts.stop();
            } catch (Exception ignored) {}
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            updatePlaybackState(PlaybackState.STATE_STOPPED);
        }
        call.resolve();
    }

    private synchronized void initMediaSession() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            try {
                if (mediaSession != null) {
                    mediaSession.release();
                }
                mediaSession = new MediaSession(getContext(), "ReaderAudiobookSession");
                mediaSession.setCallback(new MediaSession.Callback() {
                    @Override
                    public void onPlay() {
                        notifyMediaAction("play");
                    }
                    @Override
                    public void onPause() {
                        notifyMediaAction("pause");
                    }
                    @Override
                    public void onSkipToNext() {
                        notifyMediaAction("next");
                    }
                    @Override
                    public void onSkipToPrevious() {
                        notifyMediaAction("previous");
                    }
                    @Override
                    public void onStop() {
                        notifyMediaAction("stop");
                    }
                });
                mediaSession.setFlags(MediaSession.FLAG_HANDLES_MEDIA_BUTTONS | MediaSession.FLAG_HANDLES_TRANSPORT_CONTROLS);
                mediaSession.setActive(true);
            } catch (Exception ignored) {}
        }
    }

    private void updatePlaybackState(int state) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP && mediaSession != null) {
            try {
                PlaybackState.Builder builder = new PlaybackState.Builder()
                    .setActions(PlaybackState.ACTION_PLAY | PlaybackState.ACTION_PAUSE |
                                PlaybackState.ACTION_PLAY_PAUSE | PlaybackState.ACTION_SKIP_TO_NEXT |
                                PlaybackState.ACTION_SKIP_TO_PREVIOUS | PlaybackState.ACTION_STOP)
                    .setState(state, PlaybackState.PLAYBACK_POSITION_UNKNOWN, 1.0f);
                mediaSession.setPlaybackState(builder.build());
            } catch (Exception ignored) {}
        }
    }

    private void notifyMediaAction(String action) {
        JSObject ret = new JSObject();
        ret.put("action", action);
        notifyListeners("onMediaControlAction", ret);
    }

    @PluginMethod
    public void updateMediaSession(PluginCall call) {
        String state = call.getString("state", "playing");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            if ("playing".equalsIgnoreCase(state)) {
                if (mediaSession == null) {
                    initMediaSession();
                }
                updatePlaybackState(PlaybackState.STATE_PLAYING);
            } else if ("paused".equalsIgnoreCase(state)) {
                updatePlaybackState(PlaybackState.STATE_PAUSED);
            } else {
                updatePlaybackState(PlaybackState.STATE_STOPPED);
            }
        }
        call.resolve();
    }

    @Override
    protected void handleOnDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
            tts = null;
            isInitialized = false;
        }
        if (mediaSession != null) {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    mediaSession.setActive(false);
                    mediaSession.release();
                }
            } catch (Exception ignored) {}
            mediaSession = null;
        }
        super.handleOnDestroy();
    }
}
