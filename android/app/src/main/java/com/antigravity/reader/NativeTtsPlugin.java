package com.antigravity.reader;

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

import java.util.Locale;
import java.util.Set;

@CapacitorPlugin(name = "NativeTts")
public class NativeTtsPlugin extends Plugin implements TextToSpeech.OnInitListener {
    private TextToSpeech tts;
    private boolean isInitialized = false;
    private volatile String currentUtteranceId = null;

    @Override
    public void load() {
        super.load();
        initTts();
    }

    private synchronized void initTts() {
        if (tts == null) {
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

            tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override
                public void onStart(String utteranceId) {
                    // Only notify if this matches the currently active utterance
                    if (utteranceId != null && utteranceId.equals(currentUtteranceId)) {
                        JSObject data = new JSObject();
                        data.put("utteranceId", utteranceId);
                        notifyListeners("onStart", data);
                    }
                }

                @Override
                public void onDone(String utteranceId) {
                    // Strictly filter by current utterance ID to prevent phantom or silent pause callbacks
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

    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("available", isInitialized && tts != null);
        call.resolve(ret);
    }

    @PluginMethod
    public void getVoices(PluginCall call) {
        JSArray voicesArray = new JSArray();
        if (tts != null && isInitialized && Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            try {
                Set<Voice> voices = tts.getVoices();
                if (voices != null) {
                    for (Voice v : voices) {
                        if (v.getLocale() != null && v.getLocale().getLanguage().startsWith("es")) {
                            JSObject voiceObj = new JSObject();
                            voiceObj.put("name", v.getName());
                            voiceObj.put("lang", v.getLocale().toLanguageTag());
                            voiceObj.put("isNetworkConnectionRequired", v.isNetworkConnectionRequired());
                            voiceObj.put("quality", v.getQuality());
                            voicesArray.put(voiceObj);
                        }
                    }
                }
            } catch (Exception ignored) {}
        }
        JSObject ret = new JSObject();
        ret.put("voices", voicesArray);
        call.resolve(ret);
    }

    @PluginMethod
    public void speak(PluginCall call) {
        String text = call.getString("text", "");
        if (text == null || text.trim().isEmpty()) {
            call.resolve();
            return;
        }

        if (tts == null || !isInitialized) {
            initTts();
            call.reject("El motor de voz de Android se está inicializando. Intenta de nuevo.");
            return;
        }

        // Clamp rate to safe, natural bounds (0.6x to 2.0x)
        Double rateD = call.getDouble("rate", 1.0);
        float rate = rateD != null ? rateD.floatValue() : 1.0f;
        rate = Math.max(0.6f, Math.min(2.0f, rate));

        // Clamp pitch to safe, natural bounds (0.75x to 1.35x)
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
                            break;
                        }
                    }
                }
            } catch (Exception ignored) {}
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
        super.handleOnDestroy();
    }
}
