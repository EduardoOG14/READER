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
    private String currentUtteranceId = null;

    @Override
    public void load() {
        super.load();
        initTts();
    }

    private void initTts() {
        if (tts == null) {
            tts = new TextToSpeech(getContext(), this);
        }
    }

    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS) {
            isInitialized = true;
            Locale esLocale = new Locale("es", "ES");
            int result = tts.setLanguage(esLocale);
            if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                tts.setLanguage(new Locale("es"));
            }

            tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override
                public void onStart(String utteranceId) {
                    JSObject data = new JSObject();
                    data.put("utteranceId", utteranceId);
                    notifyListeners("onStart", data);
                }

                @Override
                public void onDone(String utteranceId) {
                    JSObject data = new JSObject();
                    data.put("utteranceId", utteranceId);
                    notifyListeners("onDone", data);
                }

                @Override
                public void onError(String utteranceId) {
                    JSObject data = new JSObject();
                    data.put("utteranceId", utteranceId);
                    data.put("error", "Error in utterance " + utteranceId);
                    notifyListeners("onError", data);
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
            } catch (Exception e) {
                // Ignore voice enumeration errors
            }
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

        Double rateD = call.getDouble("rate", 1.0);
        float rate = rateD != null ? rateD.floatValue() : 1.0f;

        Double pitchD = call.getDouble("pitch", 1.0);
        float pitch = pitchD != null ? pitchD.floatValue() : 1.0f;

        String voiceName = call.getString("voiceName", null);
        Integer pauseObj = call.getInt("pauseBeforeMs", 0);
        int pauseBeforeMs = pauseObj != null ? pauseObj : 0;

        if (pauseBeforeMs > 0 && Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            tts.playSilentUtterance((long) pauseBeforeMs, TextToSpeech.QUEUE_FLUSH, "silence_pause");
        }

        tts.setSpeechRate(rate);
        tts.setPitch(pitch);

        if (voiceName != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Set<Voice> voices = tts.getVoices();
            if (voices != null) {
                for (Voice v : voices) {
                    if (v.getName().equals(voiceName)) {
                        tts.setVoice(v);
                        break;
                    }
                }
            }
        }

        currentUtteranceId = "utt_" + System.currentTimeMillis();
        int queueMode = pauseBeforeMs > 0 ? TextToSpeech.QUEUE_ADD : TextToSpeech.QUEUE_FLUSH;

        int res;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Bundle params = new Bundle();
            params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, currentUtteranceId);
            res = tts.speak(text, queueMode, params, currentUtteranceId);
        } else {
            java.util.HashMap<String, String> params = new java.util.HashMap<>();
            params.put(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, currentUtteranceId);
            res = tts.speak(text, queueMode, params);
        }

        if (res == TextToSpeech.SUCCESS) {
            JSObject ret = new JSObject();
            ret.put("utteranceId", currentUtteranceId);
            call.resolve(ret);
        } else {
            call.reject("Error al iniciar reproducción en el motor de voz de Android.");
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        if (tts != null) {
            tts.stop();
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
