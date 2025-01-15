// src/navigation/AuthNavigator.tsx
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from './types';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the app has been launched before
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // This is the first launch
          await AsyncStorage.setItem('hasLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          // App has been launched before
          setIsFirstLaunch(false);
        }
      } catch (error) {
        // If there's an error reading storage, default to false
        console.error('Error checking first launch:', error);
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  // Show a loading indicator while checking first launch status
  if (isFirstLaunch === null) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <Stack.Navigator
      initialRouteName={isFirstLaunch ? "Splash" : "Login"}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        presentation: 'card',
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress
          }
        })
      }}
    >
      {isFirstLaunch && (
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{
            gestureEnabled: false
          }}
        />
      )}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            }
          })
        }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            }
          })
        }}
      />
    </Stack.Navigator>
  );
};