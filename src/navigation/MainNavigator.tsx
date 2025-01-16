// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { MainTabParamList } from './types';
import { HomeScreen } from '../screens/main/HomeScreen';
import { LearnScreen } from '../screens/main/LearnScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { CourseNavigator } from './CourseNavigator';
import { theme } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.text.disabled,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../assets/home-active.png')
              : require('../assets/home-inactive.jpg');
          } else if (route.name === 'Learn') {
            iconSource = focused 
              ? require('../assets/explore-active.png')
              : require('../assets/explore-inactive.jpg');
          } else if (route.name === 'Profile') {
            iconSource = focused 
              ? require('../assets/profile-active.png')
              : require('../assets/profile-inactive.jpg');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                marginBottom: focused ? 8 : 0,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="Learn"
        component={CourseNavigator}
        options={{
          tabBarLabel: 'Explore'
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};