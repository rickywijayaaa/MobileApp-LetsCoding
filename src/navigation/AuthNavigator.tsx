// src/navigation/AuthNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthStackParamList, MainTabParamList } from './types';
import SplashScreen from '../components/screens/main/SplashScreen';
import LoginScreen from '../components/screens/auth/LoginScreen';
import RegisterScreen from '../components/screens/auth/RegisterScreen';
import { HomeScreen } from '../components/screens/main/HomeScreen';
import { LearnScreen } from '../components/screens/main/LearnScreen';
import { ProfileScreen } from '../components/screens/main/ProfileScreen';
import { Image } from 'react-native';

const Stack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Define the Bottom Tab Navigator
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide default header
        tabBarShowLabel: true, // Show tab labels
        tabBarActiveTintColor: '#4D2C5E', // Active tab color
        tabBarInactiveTintColor: '#999', // Inactive tab color
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Tab bar background
          borderTopWidth: 1,
          borderTopColor: '#ddd', // Border color
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;

          // Assign appropriate icon based on the route
          if (route.name === 'Home') {
            iconSource = focused
              ? require('../assets/home-active.png') // Replace with your active PNG
              : require('../assets/home-inactive.jpg'); // Replace with your inactive PNG
          } else if (route.name === 'Learn') {
            iconSource = focused 
            ? require('../assets/explore-active.png')
            : require('../assets/explore-inactive.jpg'); // Same for both states
          } else if (route.name === 'Profile') {
            iconSource = focused 
            ? require('../assets/profile-active.png')
            : require('../assets/profile-inactive.jpg'); // Same for both states
          }

          // Return the image with conditional style
          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                marginBottom: focused ? 8 : 0, // Raise the icon when active
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main Auth Navigator with Bottom Navigation Integrated
export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide headers for all screens
      }}
    >
      {/* Splash Screen */}
      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* Login and Registration Screens */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Main App with Bottom Navigation */}
      <Stack.Screen name="Home" component={MainNavigator} />
    </Stack.Navigator>
  );
};
