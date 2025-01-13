import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList, MainTabParamList } from '../../../navigation/types';


type SplashScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Pastikan 'Login' adalah nama layar yang benar
    }, 9000); // Durasi splash screen

    return () => clearTimeout(timer); // Bersihkan timer saat komponen unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/flow-splash.json')} // Path ke file JSON Lottie
        autoPlay
        loop={false} // Stop animasi setelah satu iterasi
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Warna latar belakang
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 1000, // Sesuaikan dengan desain Anda
    height: 1000,
  },
});

export default SplashScreen;
