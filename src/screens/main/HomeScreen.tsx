// src/screens/main/HomeScreen.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { ResponsiveLayout } from '../../components/common/Layout/ResponsiveLayout';
import { Typography } from '../../components/common/Typography/Typography';
import { Card } from '../../components/common/Card/Card';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/responsive';
import { theme } from '../../theme';

export const HomeScreen: React.FC = () => {
  return (
    <ResponsiveLayout>
      <Typography 
        variant="h1" 
        style={styles.title}
      >
        Welcome to Virtual Lab
      </Typography>
      
      <Card style={styles.card}>
        <Typography variant="body1">
          Start your learning journey today!
        </Typography>
      </Card>
    </ResponsiveLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: verticalScale(20),
    fontSize: moderateScale(32),
  },
  card: {
    padding: moderateScale(16),
    marginVertical: verticalScale(10),
  },
});