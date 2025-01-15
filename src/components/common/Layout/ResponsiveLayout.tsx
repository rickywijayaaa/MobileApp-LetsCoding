// src/components/common/Layout/ResponsiveLayout.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useOrientation } from '../../../utils/responsive';
import { theme } from '../../../theme';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  style,
  padded = true,
}) => {
  const orientation = useOrientation();
  
  return (
    <View
      style={[
        styles.container,
        padded && styles.padding,
        orientation === 'landscape' && styles.landscape,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  padding: {
    padding: theme.spacing.md,
  },
  landscape: {
    paddingHorizontal: theme.spacing.xl,
  },
});