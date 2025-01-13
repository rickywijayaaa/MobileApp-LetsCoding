// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useAppSelector } from '../store/hooks';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    // Handle navigation based on auth state
    const timer = setTimeout(() => {
      navigation.replace(isAuthenticated ? 'Main' : 'Auth');
    }, 3000); // Reduced from 9s to 3s for better UX

    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/flow-splash.json')}
        autoPlay
        loop={false}
        style={styles.animation}
        resizeMode="cover"
        onAnimationFinish={() => {
          // Optional: Add any cleanup or state updates here
          console.log('Animation finished');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D2C5E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    height: height * 0.7, // Responsive sizing
    width: height * 0.7,
  },
});

export default SplashScreen;