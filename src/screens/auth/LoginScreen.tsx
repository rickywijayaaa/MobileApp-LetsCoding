// src/screens/auth/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, clearError } from '../../store/slices/authSlice';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { theme } from '../../theme';
import { moderateScale, verticalScale, horizontalScale } from '../../utils/responsive';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Google Sign In configuration
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '385249045633-9pqlqpu2bs8m5jlk67tt65riuo3otu1u.apps.googleusercontent.com',
  });

  // Monitor keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Clear errors on mount
  useEffect(() => {
    dispatch(clearError());
  }, []);

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      Alert.alert('Authentication Error', error, [
        { text: 'OK', onPress: () => dispatch(clearError()) }
      ]);
    }
  }, [error]);

  // Handle Google Sign In response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      if (id_token) {
        // Here you would typically validate the token with your backend
        navigation.replace('Home');
      }
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (error) {
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          {/* Logo Section - Hidden when keyboard is visible on small screens */}
          {(!isKeyboardVisible || height > 700) && (
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/appicon.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.welcomeText}>Welcome back!</Text>
            </View>
          )}

          {/* Input Section */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={theme.colors.text.secondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={theme.colors.text.secondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.googleButton, !request && styles.disabledButton]}
              onPress={() => promptAsync()}
              disabled={!request}
            >
              <Image 
                source={require('../../assets/google_icon.png')} 
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Navigation Links */}
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  logo: {
    width: horizontalScale(150),
    height: verticalScale(150),
  },
  welcomeText: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginTop: verticalScale(20),
  },
  inputContainer: {
    width: '100%',
    marginBottom: verticalScale(20),
  },
  input: {
    width: '100%',
    height: verticalScale(50),
    backgroundColor: theme.colors.background.paper,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    fontSize: moderateScale(16),
    color: theme.colors.text.primary,
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    height: verticalScale(50),
    backgroundColor: theme.colors.primary.main,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  loginButtonText: {
    color: theme.colors.primary.contrast,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  googleButton: {
    width: '100%',
    height: verticalScale(50),
    backgroundColor: theme.colors.background.paper,
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
  },
  googleIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: horizontalScale(10),
  },
  googleButtonText: {
    color: theme.colors.text.primary,
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  linkContainer: {
    alignItems: 'center',
  },
  link: {
    color: theme.colors.primary.main,
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default LoginScreen;