import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebase/config';

const { width, height } = Dimensions.get('window');

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.background} />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Create an account</Text>

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

      {/* Register Button */}
      <TouchableOpacity
        style={[styles.loginButton, loading && { opacity: 0.7 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>

      {/* Navigation to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>

      {/* Placeholder Image */}
      <Image
        source={require('../../../assets/appicon.png')}
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

export default RegisterScreen;