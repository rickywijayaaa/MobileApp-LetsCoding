// src/theme/index.ts
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { Theme } from './types';

export const theme: Theme = {
  colors,
  typography,
  spacing
};

// Add a helper function to create consistent spacing
export const createSpacing = (value: number) => `${value * 4}px`;

// Add a helper function for responsive font sizes
export const createResponsiveFontSize = (size: number) => {
  // We can add responsive logic here later
  return size;
};

export * from './types';