// src/components/common/Typography/Typography.tsx
import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../../theme';

interface TypographyProps {
  variant?: keyof typeof theme.typography;
  color?: keyof typeof theme.colors.text;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: TextStyle;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'primary',
  align = 'left',
  style,
  children,
}) => {
  return (
    <Text
      style={[
        styles[variant],
        { color: theme.colors.text[color], textAlign: align },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: theme.typography.h1,
  h2: theme.typography.h2,
  h3: theme.typography.h3,
  body1: theme.typography.body1,
  body2: theme.typography.body2,
  caption: theme.typography.caption,
  button: theme.typography.button,
});