import React from 'react';
import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native';

const WebLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>My Web App</Text>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 420, // Ensures the container does not exceed 420px
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    boxShadow: Platform.OS === 'web' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : undefined,
    elevation: 3,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});

export default WebLayout;
