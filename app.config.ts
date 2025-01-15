// app.config.ts
import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'Virtual Lab Mobile',
  slug: 'virtual-lab-mobile',
  owner: 'letscoding',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'virtuallab', // Add URL scheme for deep linking
  userInterfaceStyle: 'light',
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/396b4c3d-7001-47a5-9f66-f99c6e119458'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.virtuallab.mobile'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/appicon.png',
      backgroundColor: '#4D2C5E'
    },
    package: 'com.virtuallab.mobile'
  },
  extra: {
    eas: {
      projectId: '396b4c3d-7001-47a5-9f66-f99c6e119458'
    }
  }
};

export default config;