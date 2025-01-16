// src/screens/course/CourseListScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CourseStackParamList } from '../../navigation/types';
import { CourseSearch } from '../../components/course/CourseSearch';
import { CourseList } from '../../components/course/CourseList';
import { Typography } from '../../components/common/Typography/Typography';
import { theme } from '../../theme';
import { MOCK_COURSES } from '../../data/mockCourses';

type CourseListNavigationProp = StackNavigationProp<CourseStackParamList, 'CourseList'>;

export const CourseListScreen: React.FC = () => {
  const navigation = useNavigation<CourseListNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCoursePress = (courseId: string) => {
    navigation.navigate('CourseDetails', { courseId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h1" style={styles.title}>Explore</Typography>
      </View>
      
      <CourseSearch 
        value={searchQuery} 
        onChangeText={setSearchQuery}
        placeholder="Search for a course..."
      />
      
      <CourseList 
        courses={MOCK_COURSES}
        searchQuery={searchQuery}
        onCoursePress={handleCoursePress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: '600',
  },
});