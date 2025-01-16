import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { moderateScale, verticalScale, horizontalScale } from '../../utils/responsive';

interface Course {
  id: string;
  title: string;
  description: string;
  studentCount: number;
  sectionCount: number;
  imageUrl: any;
}

interface CourseListProps {
  courses: Course[];
  searchQuery: string;
  onCoursePress: (courseId: string) => void;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, searchQuery, onCoursePress }) => {
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity style={styles.card} onPress={() => onCoursePress(item.id)}>
      <View style={styles.imageContainer}>
        <Image source={item.imageUrl} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredCourses}
      keyExtractor={(item) => item.id}
      renderItem={renderCourseItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: verticalScale(10),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
    padding: moderateScale(10),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  imageContainer: {
    width: horizontalScale(67), // Same width as the image
    height: verticalScale(55), // Same height as the image
    backgroundColor: '#4D2C5E', // Background color
    borderRadius: moderateScale(8), // Same border radius as the image
    justifyContent: 'center',
    alignItems: 'center', // Center the image inside the container
    marginRight: horizontalScale(10),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(8),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  description: {
    fontSize: moderateScale(12),
    color: '#555',
  },
});
