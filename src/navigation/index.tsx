// src/navigation/index.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../store/hooks';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        // Instead of using animationEnabled, we control transitions through cardStyleInterpolator
        gestureEnabled: false,
        // This creates an immediate transition with no animation
        cardStyleInterpolator: () => ({
          cardStyle: {
            opacity: 1
          }
        }),
        // Ensures screens don't stack on top of each other
        presentation: 'card'
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen 
          name="Main" 
          component={MainNavigator}
          options={{
            gestureEnabled: false
          }}
        />
      ) : (
        <Stack.Screen 
          name="Auth" 
          component={AuthNavigator}
          options={{
            gestureEnabled: false
          }}
        />
      )}
    </Stack.Navigator>
  );
};