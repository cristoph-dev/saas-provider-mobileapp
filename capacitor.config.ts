import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.redesip.pos',
  appName: 'POS RedesIP',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resize: 'native',           
      resizeOnFullScreen: true,  
    },
  },
};

export default config;
