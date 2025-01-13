import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Get device screen dimensions

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.background} />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome back!</Text>

      {/* Email and Password Fields */}
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Email</Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Password</Text>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign in with Google Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../../../assets/google_icon.png')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
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
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FDFDFD',
    position: 'absolute',
  },
  welcomeText: {
    position: 'absolute',
    top: height * 0.28, // Adjusted for iPhone 11
    left: width * 0.3,
    textAlign: 'center',
    color: 'black',
    fontSize: width * 0.065, // Responsive font size
    fontFamily: 'Work Sans',
    fontWeight: '400',
    lineHeight: width * 0.09, // Adjusted line height
    letterSpacing: 0.8,
  },
  inputContainer: {
    position: 'absolute',
    top: height * 0.35,
    left: width * 0.05,
  },
  inputBox: {
    width: width * 0.9,
    height: height * 0.065,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: height * 0.02,
    justifyContent: 'center',
    paddingLeft: width * 0.04,
  },
  inputLabel: {
    color: 'black',
    fontSize: width * 0.045,
    fontFamily: 'Work Sans',
    fontWeight: '400',
  },
  passwordMask: {
    width: width * 0.06,
    height: height * 0.015,
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    right: width * 0.04,
    top: '50%',
    transform: [{ translateY: -height * 0.0075 }],
  },
  forgotPassword: {
    position: 'absolute',
    top: height * 0.45,
    left: width * 0.6,
    textAlign: 'right',
    color: 'black',
    fontSize: width * 0.035,
    fontFamily: 'Work Sans',
    fontWeight: '400',
  },
  loginButton: {
    position: 'absolute',
    top: height * 0.51,
    left: width * 0.05,
    width: width * 0.9,
    height: height * 0.075,
    backgroundColor: '#4D2C5E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: width * 0.05,
    fontFamily: 'Work Sans',
    fontWeight: '700',
  },
  googleButton: {
    position: 'absolute',
    top: height * 0.6,
    left: width * 0.05,
    width: width * 0.9,
    height: height * 0.075,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1.36,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: height * 0.04,
    height: height * 0.04,
    marginRight: width * 0.02,
  },
  googleButtonText: {
    color: 'black',
    fontSize: width * 0.045,
    fontFamily: 'Work Sans',
    fontWeight: '500',
  },
  placeholderImage: {
    position: 'absolute',
    top: height * 0.11,
    left: width * 0.28,
    width: width * 0.5,
    height: height * 0.2,
  },
});

export default LoginScreen;
