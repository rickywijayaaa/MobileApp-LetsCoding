// src/screens/main/PracticeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../components/common/Typography/Typography';
import { theme } from '../../../theme';

export const PracticeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="h1">Practice</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
});