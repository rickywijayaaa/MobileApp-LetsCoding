// src/screens/auth/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase/config';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '385249045633-9pqlqpu2bs8m5jlk67tt65riuo3otu1u.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      // Handle Google Sign-In logic
      if (id_token) {
        Alert.alert('Success', 'Signed in with Google successfully!', [
          { text: 'OK', onPress: () => navigation.replace('Home') },
        ]);
      } else {
        Alert.alert('Error', 'Google Sign-In failed.');
      }
    }
  }, [response]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully!', [
        { text: 'OK', onPress: () => navigation.replace('Home') },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to log in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.background} />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome back!</Text>

      {/* Email and Password Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      {/* Google Sign-In Button */}
      <TouchableOpacity
        style={[styles.googleButton, !request && { opacity: 0.5 }]}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Image source={require('../../assets/google_icon.png')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* Register Navigation */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>

      {/* Placeholder Image */}
      <Image
        source={require('../../assets/appicon.png')}
        style={styles.placeholderImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFE',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FDFDFD',
    position: 'absolute',
  },
  welcomeText: {
    position: 'absolute',
    top: height * 0.26,
    textAlign: 'center',
    color: 'black',
    fontSize: width * 0.065,
    fontWeight: '400',
  },
  inputContainer: {
    marginTop: height * 0.05,
  },
  inputBox: {
    width: width * 0.9,
    height: height * 0.065,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: height * 0.02,
    paddingLeft: width * 0.04,
    fontSize: width * 0.045,
  },
  loginButton: {
    width: width * 0.9,
    height: height * 0.075,
    backgroundColor: '#4D2C5E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  loginButtonText: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
  googleButton: {
    width: width * 0.9,
    height: height * 0.075,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1.36,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.02,
  },
  googleIcon: {
    width: height * 0.04,
    height: height * 0.04,
    marginRight: width * 0.02,
  },
  googleButtonText: {
    color: 'black',
    fontSize: width * 0.045,
    fontWeight: '500',
  },
  link: {
    marginTop: height * 0.02,
    fontSize: width * 0.045,
    color: '#0098FF',
  },
  placeholderImage: {
    position: 'absolute',
    top: height * 0.09,
    width: width * 0.5,
    height: height * 0.2,
    resizeMode: 'contain',
  },
});

export default LoginScreen;