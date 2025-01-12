// src/screens/main/ProfileScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../components/common/Typography/Typography';
import { useAppDispatch } from '../../../store/hooks';
import { Button } from '../../../components/common/Button/Button';
import { logoutUser } from '../../../store/slices/authSlice';
import { theme } from '../../../theme';

export const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Typography variant="h1">Profile</Typography>
      <Button 
        title="Logout" 
        onPress={() => dispatch(logoutUser())}
        variant="outlined"
      />
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