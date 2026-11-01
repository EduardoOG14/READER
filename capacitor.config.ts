import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.antigravity.reader',
  appName: 'READER',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
