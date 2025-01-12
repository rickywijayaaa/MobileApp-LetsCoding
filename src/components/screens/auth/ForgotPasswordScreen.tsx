// src/screens/auth/ForgotPasswordScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../../../components/common/Button/Button';
import { Typography } from '../../../components/common/Typography/Typography';
import { theme } from '../../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Typography variant="h1" align="center">Reset Password</Typography>
      <Button 
        title="Back to Login" 
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