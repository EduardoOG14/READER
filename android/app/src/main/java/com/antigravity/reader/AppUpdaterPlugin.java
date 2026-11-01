package com.antigravity.reader;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@CapacitorPlugin(name = "AppUpdater")
public class AppUpdaterPlugin extends Plugin {

    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private volatile boolean isDownloading = false;

    @PluginMethod
    public void canRequestPackageInstalls(PluginCall call) {
        JSObject ret = new JSObject();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            boolean canInstall = getContext().getPackageManager().canRequestPackageInstalls();
            ret.put("value", canInstall);
        } else {
            ret.put("value", true);
        }
        call.resolve(ret);
    }

    @PluginMethod
    public void openInstallPermissionSettings(PluginCall call) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            try {
                Intent intent = new Intent(
                    Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                    Uri.parse("package:" + getContext().getPackageName())
                );
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getContext().startActivity(intent);
                call.resolve();
            } catch (Exception e) {
                call.reject("Error al abrir ajustes de instalación: " + e.getMessage());
            }
        } else {
            call.resolve();
        }
    }

    @PluginMethod
    public void downloadAndInstall(PluginCall call) {
        String downloadUrl = call.getString("url");
        if (downloadUrl == null || downloadUrl.trim().isEmpty()) {
            call.reject("URL de descarga no especificada.");
            return;
        }

        String rawFileName = call.getString("fileName");
        String fileName = (rawFileName != null && !rawFileName.trim().isEmpty())
            ? rawFileName.replaceAll("[^a-zA-Z0-9._-]", "_")
            : "READER_update.apk";

        if (!fileName.toLowerCase().endsWith(".apk")) {
            fileName += ".apk";
        }

        final String finalFileName = fileName;

        if (isDownloading) {
            call.reject("Ya hay una descarga de actualización en curso.");
            return;
        }

        isDownloading = true;

        executor.execute(() -> {
            HttpURLConnection connection = null;
            InputStream input = null;
            FileOutputStream output = null;

            try {
                // Follow redirects (GitHub Releases redirect to AWS S3 / objects.githubusercontent.com)
                URL currentUrl = new URL(downloadUrl);
                int redirectCount = 0;
                while (redirectCount < 7) {
                    connection = (HttpURLConnection) currentUrl.openConnection();
                    connection.setInstanceFollowRedirects(true);
                    connection.setRequestProperty("User-Agent", "READER-Android-Updater");
                    connection.setConnectTimeout(20000);
                    connection.setReadTimeout(40000);
                    int status = connection.getResponseCode();

                    if (status == HttpURLConnection.HTTP_MOVED_TEMP ||
                        status == HttpURLConnection.HTTP_MOVED_PERM ||
                        status == HttpURLConnection.HTTP_SEE_OTHER ||
                        status == 307 || status == 308) {
                        String newUrl = connection.getHeaderField("Location");
                        connection.disconnect();
                        if (newUrl == null) {
                            throw new Exception("Cabecera de redirección vacía recibida de GitHub.");
                        }
                        currentUrl = new URL(newUrl);
                        redirectCount++;
                    } else if (status == HttpURLConnection.HTTP_OK) {
                        break;
                    } else {
                        throw new Exception("Error del servidor HTTP (" + status + "): " + connection.getResponseMessage());
                    }
                }

                long fileLength = connection.getContentLength();
                input = connection.getInputStream();

                File updateDir = new File(getContext().getCacheDir(), "updates");
                if (!updateDir.exists()) {
                    updateDir.mkdirs();
                }

                File apkFile = new File(updateDir, finalFileName);
                if (apkFile.exists()) {
                    apkFile.delete();
                }

                output = new FileOutputStream(apkFile);

                byte[] data = new byte[8192];
                long totalDownloaded = 0;
                int count;
                long lastProgressTime = 0;
                int lastPercent = -1;

                while ((count = input.read(data)) != -1) {
                    totalDownloaded += count;
                    output.write(data, 0, count);

                    int percent = (fileLength > 0) ? (int) ((totalDownloaded * 100) / fileLength) : 0;
                    long now = System.currentTimeMillis();

                    if (percent != lastPercent && (now - lastProgressTime > 120 || percent == 100)) {
                        lastPercent = percent;
                        lastProgressTime = now;

                        JSObject progressObj = new JSObject();
                        progressObj.put("percent", percent);
                        progressObj.put("bytesDownloaded", totalDownloaded);
                        progressObj.put("totalBytes", fileLength > 0 ? fileLength : totalDownloaded);
                        notifyListeners("downloadProgress", progressObj);
                    }
                }

                output.flush();
                output.close();
                output = null;

                input.close();
                input = null;

                if (connection != null) {
                    connection.disconnect();
                    connection = null;
                }

                isDownloading = false;

                if (!apkFile.exists() || apkFile.length() == 0) {
                    throw new Exception("El archivo descargado está vacío.");
                }

                // Make readable
                apkFile.setReadable(true, false);

                // Notify completion
                JSObject completeObj = new JSObject();
                completeObj.put("percent", 100);
                completeObj.put("bytesDownloaded", apkFile.length());
                completeObj.put("totalBytes", apkFile.length());
                notifyListeners("downloadComplete", completeObj);

                // Launch Package Installer directly
                launchInstaller(apkFile);

                JSObject result = new JSObject();
                result.put("success", true);
                result.put("path", apkFile.getAbsolutePath());
                call.resolve(result);

            } catch (Exception e) {
                isDownloading = false;
                try {
                    if (output != null) output.close();
                    if (input != null) input.close();
                    if (connection != null) connection.disconnect();
                } catch (Exception ignored) {}

                JSObject errorObj = new JSObject();
                errorObj.put("error", e.getMessage());
                notifyListeners("downloadError", errorObj);

                call.reject("Error al descargar e instalar la actualización: " + e.getMessage());
            }
        });
    }

    @PluginMethod
    public void installApk(PluginCall call) {
        String path = call.getString("path");
        if (path == null || path.trim().isEmpty()) {
            call.reject("Ruta de archivo no especificada.");
            return;
        }

        try {
            File apkFile = new File(path);
            if (!apkFile.exists()) {
                call.reject("El archivo APK no existe en la ruta: " + path);
                return;
            }

            launchInstaller(apkFile);

            JSObject ret = new JSObject();
            ret.put("success", true);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Error al iniciar el instalador: " + e.getMessage());
        }
    }

    private void launchInstaller(File apkFile) throws Exception {
        Context context = getContext();
        String authority = context.getPackageName() + ".fileprovider";
        Uri apkUri = FileProvider.getUriForFile(context, authority, apkFile);

        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if (getActivity() != null) {
            getActivity().startActivity(intent);
        } else {
            context.startActivity(intent);
        }
    }
}
