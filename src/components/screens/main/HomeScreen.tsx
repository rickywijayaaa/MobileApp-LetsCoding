// src/screens/main/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../components/common/Typography/Typography';
import { theme } from '../../../theme';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="h1">Home</Typography>
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

export default HomeScreen;