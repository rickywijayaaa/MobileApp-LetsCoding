// src/screens/main/LearnScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../components/common/Typography/Typography';
import { theme } from '../../../theme';

export const LearnScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="h1">Learn</Typography>
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