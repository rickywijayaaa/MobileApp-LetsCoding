// src/screens/auth/LoginScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../../store/hooks';
import { Button } from '../../../components/common/Button/Button';
import { Typography } from '../../../components/common/Typography/Typography';
import { theme } from '../../../theme';
import { loginUser } from '../../../store/slices/authSlice';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Typography variant="h1" align="center">Login</Typography>
      <Button 
        title="Register Instead" 
        onPress={() => navigation.navigate('Register')}
        variant="outlined"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
});