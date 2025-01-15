// src/utils/responsive.ts
import { Dimensions, ScaledSize } from 'react-native';

// Base dimensions we're designing for
const BASE_WIDTH = 375; // iPhone SE width as our base
const BASE_HEIGHT = 667;

// Get current screen dimensions
const { width, height } = Dimensions.get('window');

// Create a scale factor based on screen width
export const horizontalScale = (size: number): number => {
  return (width / BASE_WIDTH) * size;
};

// Create a scale factor based on screen height
export const verticalScale = (size: number): number => {
  return (height / BASE_HEIGHT) * size;
};

// Create a scale factor that moderates the scaling for smaller values
export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (horizontalScale(size) - size) * factor;
};

// Create a hook to manage orientation changes
import { useState, useEffect } from 'react';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    height > width ? 'portrait' : 'landscape'
  );

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setOrientation(window.height > window.width ? 'portrait' : 'landscape');
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      // @ts-ignore - Type mismatch in RN types
      subscription.remove();
    };
  }, []);

  return orientation;
};