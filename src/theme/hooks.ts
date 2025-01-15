// src/theme/hooks.ts
import { useWindowDimensions } from 'react-native';
import { theme } from './index';

export const useTheme = () => {
  const dimensions = useWindowDimensions();
  
  // You can add responsive calculations here
  const isSmallDevice = dimensions.width < 375;

  return {
    ...theme,
    // Add responsive values
    responsive: {
      isSmallDevice,
      fontSize: (size: number) => isSmallDevice ? size * 0.9 : size,
      spacing: (value: number) => isSmallDevice ? value * 0.9 : value,
    }
  };
};