// src/components/course/CourseList.tsx
import React from 'react';
import { ImageSourcePropType, ScrollView, StyleSheet, View } from 'react-native';
import { CourseCard } from './CourseCard';
import { Typography } from '../common/Typography/Typography';
import { theme } from '../../theme';

interface Course {
  id: string;
  title: string;
  description: string;
  studentCount: number;
  sectionCount: number;
  imageUrl: ImageSourcePropType;
}

interface CourseListProps {
  courses: Course[];
  searchQuery: string;
  onCoursePress: (courseId: string) => void;
}

export const CourseList: React.FC<CourseListProps> = ({ 
  courses, 
  searchQuery,
  onCoursePress 
}) => {
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.divider} />
        <Typography variant="h2" style={styles.headerText}>
          Recommended Courses
        </Typography>
        <View style={styles.divider} />
      </View>

      <View style={styles.courseList}>
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            studentCount={course.studentCount}
            sectionCount={course.sectionCount}
            imageUrl={course.imageUrl}
            onPress={() => onCoursePress(course.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  headerText: {
    marginHorizontal: theme.spacing.md,
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: theme.colors.grey[300],
  },
  courseList: {
    padding: theme.spacing.md,
  },
});