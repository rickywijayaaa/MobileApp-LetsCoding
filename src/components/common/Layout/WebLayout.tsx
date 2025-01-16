import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const WebLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // Add padding for smaller screens
  },
  innerContainer: {
    width: '100%',
    maxWidth: 480, // Mimic a mobile screen width, slightly wider than 420px
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default WebLayout;
