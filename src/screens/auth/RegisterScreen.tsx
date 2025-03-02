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
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUser, clearError } from '../../store/slices/authSlice';
import { theme } from '../../theme';
import { moderateScale, verticalScale, horizontalScale } from '../../utils/responsive';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const passwordRequirements = {
  minLength: 8,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Error', error, [{ text: 'OK', onPress: () => dispatch(clearError()) }]);
    }
  }, [error]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? '' : 'Please enter a valid email address');
    return isValid;
  };

  const validatePassword = (password: string): boolean => {
    const errors = [];
    if (password.length < passwordRequirements.minLength) {
      errors.push(`At least ${passwordRequirements.minLength} characters`);
    }
    if (!passwordRequirements.hasUpperCase.test(password)) {
      errors.push('One uppercase letter');
    }
    if (!passwordRequirements.hasLowerCase.test(password)) {
      errors.push('One lowercase letter');
    }
    if (!passwordRequirements.hasNumber.test(password)) {
      errors.push('One number');
    }
    if (!passwordRequirements.hasSpecialChar.test(password)) {
      errors.push('One special character');
    }

    setPasswordError(errors.length > 0 ? errors.join(', ') : '');
    return errors.length === 0;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
    const isValid = password === confirmPassword;
    setConfirmPasswordError(isValid ? '' : 'Passwords do not match');
    return isValid;
  };

  const handleRegister = async () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    try {
      await dispatch(registerUser({ email, password })).unwrap();

      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {}
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
          <View style={styles.innerContainer}>
            {(!isKeyboardVisible || height > 700) && (
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/appicon.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.welcomeText}>Create Account</Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, emailError && styles.inputError]}
                  placeholder="Email"
                  placeholderTextColor={theme.colors.text.secondary}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    if (emailError) validateEmail(text);
                  }}
                  onBlur={() => validateEmail(email)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, passwordError && styles.inputError]}
                  placeholder="Password"
                  placeholderTextColor={theme.colors.text.secondary}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    setShowPasswordRequirements(true);
                    if (passwordError) validatePassword(text);
                    if (confirmPassword) validateConfirmPassword(text, confirmPassword);
                  }}
                  onBlur={() => validatePassword(password)}
                  secureTextEntry
                  autoComplete="password-new"
                />
                {showPasswordRequirements && (
                  <Text style={styles.requirementsText}>
                    Password must contain: {'\n'}
                    • At least 8 characters{'\n'}
                    • One uppercase letter{'\n'}
                    • One lowercase letter{'\n'}
                    • One number{'\n'}
                    • One special character
                  </Text>
                )}
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, confirmPasswordError && styles.inputError]}
                  placeholder="Confirm Password"
                  placeholderTextColor={theme.colors.text.secondary}
                  value={confirmPassword}
                  onChangeText={text => {
                    setConfirmPassword(text);
                    if (confirmPasswordError) validateConfirmPassword(password, text);
                  }}
                  onBlur={() => validateConfirmPassword(password, confirmPassword)}
                  secureTextEntry
                  autoComplete="password-new"
                />
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.registerButton, loading && styles.disabledButton]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.registerButtonText}>Create Account</Text>}
              </TouchableOpacity>
            </View>

            <View style={styles.linkContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Login</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.default,
  },
  // scrollContainer: {
  //   flexGrow: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: verticalScale(20),
  // },
  innerContainer: {
    width: isWeb ? '100%' : '100%', // Ensure width is flexible on all platforms
    maxWidth: isWeb ? 600 : 600, // 480px for web, 600px for mobile
    backgroundColor: '#FFFFF',
    borderRadius: 10,
    padding: 20,
    boxShadow: Platform.OS === 'web' ? '0 6px 6px rgba(0, 0, 0, 0.1)' : undefined,
    elevation: 3,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  logo: {
    width: horizontalScale(isWeb ? 150 : 150),
    height: verticalScale(isWeb ? 150 : 150),
  },
  welcomeText: {
    fontSize: moderateScale(isWeb ? 12 : 24),
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginTop: verticalScale(20),
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: verticalScale(20),
  },
  inputWrapper: {
    marginBottom: verticalScale(15),
  },
  input: {
    width: '100%',
    height: verticalScale(50),
    backgroundColor: theme.colors.background.paper,
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(15),
    fontSize: moderateScale(isWeb ? 8 : 16),
    color: theme.colors.text.primary,
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
  },
  inputError: {
    borderColor: theme.colors.error.main,
  },
  errorText: {
    color: theme.colors.error.main,
    fontSize: moderateScale(isWeb ? 6 : 12),
    marginTop: verticalScale(5),
  },
  requirementsText: {
    color: theme.colors.text.secondary,
    fontSize: moderateScale(isWeb ? 8 : 12),
    marginTop: verticalScale(5),
    lineHeight: moderateScale(isWeb ? 7 : 18),
  },
  buttonContainer: {
    marginBottom: verticalScale(20),
  },
  registerButton: {
    width: '100%',
    height: verticalScale(50),
    backgroundColor: theme.colors.primary.main,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  registerButtonText: {
    color: theme.colors.primary.contrast,
    fontSize: moderateScale(isWeb ? 8 : 16),
    fontWeight: '600',
  },
  linkContainer: {
    alignItems: 'center',
  },
  link: {
    color: theme.colors.primary.main,
    fontSize: moderateScale(isWeb ? 7 : 14),
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default RegisterScreen;
