// src/screens/auth/RegisterScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../../store/hooks';
import { Button } from '../../../components/common/Button/Button';
import { Typography } from '../../../components/common/Typography/Typography';
import { theme } from '../../../theme';
import { registerUser } from '../../../store/slices/authSlice';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Typography variant="h1" align="center">Register</Typography>
      <Button 
        title="Login Instead" 
        onPress={() => navigation.navigate('Login')}
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