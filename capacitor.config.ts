import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'POS redes',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: 'native',           
      resizeOnFullScreen: true,  
    },
  },
};

export default config;
