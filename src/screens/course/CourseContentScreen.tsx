// src/screens/course/CourseContentScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator 
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CourseStackParamList } from '../../navigation/types';
import { Typography } from '../../components/common/Typography/Typography';
import { MOCK_COURSES } from '../../data/mockCourses';
import { theme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { completeLesson, selectCourseProgress } from '../../store/slices/progressSlice';
import { Feather } from '@expo/vector-icons';

// Type definitions for navigation and route props
type CourseContentRouteProp = RouteProp<CourseStackParamList, 'CourseContent'>;
type CourseContentNavigationProp = StackNavigationProp<CourseStackParamList, 'CourseContent'>;

export const CourseContentScreen: React.FC = () => {
  // State management and hooks initialization
  const route = useRoute<CourseContentRouteProp>();
  const navigation = useNavigation<CourseContentNavigationProp>();
  const dispatch = useAppDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Fetch course and progress data
  const course = MOCK_COURSES.find(c => c.id === route.params.courseId);
  const section = course?.sections.find(s => s.id === route.params.sectionId);
  const courseProgress = useAppSelector(state => 
    selectCourseProgress(state, route.params.courseId)
  );

  // Determine if the current section is completed
  const isCompleted = courseProgress?.completedLessons.includes(section?.id || '');

  const handleLessonComplete = () => {
    if (!course || !section) return;
  
    try {
      // Dispatch the completion action (synchronously)
      dispatch(completeLesson({
        courseId: course.id,
        lessonId: section.id
      }));
  
      // Navigate back immediately after dispatching
      navigation.navigate('CourseDetails', { 
        courseId: course.id 
      });
      
    } catch (error) {
      console.error('Failed to mark lesson as complete:', error);
    }
  };

  // Error handling for missing course data
  if (!course || !section) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Typography variant="h2" style={styles.errorText}>
            Content not found
          </Typography>
          <TouchableOpacity 
            style={styles.errorButton}
            onPress={() => navigation.goBack()}
          >
            <Typography style={styles.errorButtonText}>
              Go Back
            </Typography>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Find the duration from the concept subsection
  const conceptSubsection = section.subsections.find(sub => sub.duration);
  const duration = conceptSubsection?.duration;

  return (
    <SafeAreaView style={styles.container}>
      {/* Video Preview Section with simplified controls */}
      <View style={styles.videoContainer}>
        <ImageBackground 
          source={require('../../assets/video-preview.png')}
          style={styles.videoPreview}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        >
          {imageLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : (
            <View style={styles.overlayContainer}>
              <TouchableOpacity 
                style={styles.playButton}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                <Feather 
                  name={isPlaying ? "pause" : "play"} 
                  size={48} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
      </View>

      {/* Content Section */}
      <ScrollView style={styles.content}>
        <View style={styles.titleSection}>
          <Typography variant="h1" style={styles.title}>
            {section.title}
          </Typography>
          <Typography variant="body1" color="secondary">
            {duration ? `${duration} mins` : 'Practice Section'}
          </Typography>
        </View>

        {/* Completion Button */}
        <View style={styles.progressSection}>
          <TouchableOpacity 
            style={[
              styles.completeButton,
              isCompleted && styles.completedButton
            ]}
            onPress={handleLessonComplete}
          >
            <Typography style={styles.buttonText}>
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles definition
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: '#000',
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  titleSection: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  progressSection: {
    marginBottom: theme.spacing.xl,
  },
  completeButton: {
    backgroundColor: theme.colors.primary.main,
    padding: theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: theme.spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  completedButton: {
    backgroundColor: theme.colors.success.main,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  errorText: {
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: theme.colors.primary.main,
    padding: theme.spacing.md,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  errorButtonText: {
    color: theme.colors.primary.contrast,
    fontWeight: '600',
  },
});