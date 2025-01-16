// src/navigation/CourseNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CourseStackParamList } from './types';
import { CourseListScreen } from '../screens/course/CourseListScreen';
import { CourseDetailsScreen } from '../screens/course/CourseDetailsScreen';
import { CourseContentScreen } from '../screens/course/CourseContentScreen';
import { CoursePracticeScreen } from '../screens/course/CoursePracticeScreen';
import { theme } from '../theme';

const Stack = createStackNavigator<CourseStackParamList>();

export const CourseNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background.default },
      }}
    >
      <Stack.Screen name="CourseList" component={CourseListScreen} />
      <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
      <Stack.Screen name="CourseContent" component={CourseContentScreen} />
      <Stack.Screen name="CoursePractice" component={CoursePracticeScreen} />
    </Stack.Navigator>
  );
};