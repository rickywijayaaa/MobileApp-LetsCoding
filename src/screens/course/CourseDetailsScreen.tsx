// src/screens/course/CourseDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CourseStackParamList } from '../../navigation/types';
import { Typography } from '../../components/common/Typography/Typography';
import { MOCK_COURSES } from '../../data/mockCourses';
import { theme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCourseProgress, setCurrentCourse } from '../../store/slices/progressSlice';
import { Feather } from '@expo/vector-icons';

type CourseDetailsRouteProp = RouteProp<CourseStackParamList, 'CourseDetails'>;
type CourseDetailsNavigationProp = StackNavigationProp<CourseStackParamList, 'CourseDetails'>;

export const CourseDetailsScreen: React.FC = () => {
  const route = useRoute<CourseDetailsRouteProp>();
  const navigation = useNavigation<CourseDetailsNavigationProp>();
  const [activeTab, setActiveTab] = useState<'content' | 'details'>('content');
  const dispatch = useAppDispatch(); // Add this
  const courseId = route.params.courseId;
  const courseProgress = useAppSelector(state => selectCourseProgress(state, courseId));

  // Initialize course progress when screen loads
  useEffect(() => {
    dispatch(setCurrentCourse(courseId));
  }, [courseId, dispatch]);

  // Find course data based on the courseId from navigation params
  const course = MOCK_COURSES.find(c => c.id === route.params.courseId);

  const isSubsectionCompleted = (subsectionId: string, isQuiz: boolean) => {
    if (!courseProgress) return false;
    
    if (isQuiz) {
      return courseProgress.completedQuizzes.some(quiz => quiz.quizId === subsectionId);
    } else {
      return courseProgress.completedLessons.includes(subsectionId);
    }
  };

  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <Typography variant="h2">Course not found</Typography>
      </SafeAreaView>
    );
  }

  const handleSectionPress = (sectionId: string) => {
    navigation.navigate('CourseContent', { 
      courseId: course.id, 
      sectionId 
    });
  };

  const handlePracticePress = (sectionId: string) => {
    navigation.navigate('CoursePractice', {
      courseId: course.id,
      sectionId
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Video Preview Section */}
      <View style={styles.videoContainer}>
        <View style={styles.videoPlaceholder}>
          <Typography variant="h3" style={styles.previewText}>
            Course Preview
          </Typography>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'content' && styles.activeTab]}
          onPress={() => setActiveTab('content')}
        >
          <Typography 
            style={styles.tabText}
            color={activeTab === 'content' ? 'primary' : 'secondary'}
          >
            Content
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'details' && styles.activeTab]}
          onPress={() => setActiveTab('details')}
        >
          <Typography 
            style={styles.tabText}
            color={activeTab === 'details' ? 'primary' : 'secondary'}
          >
            Details
          </Typography>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'content' ? (
          // Course Content Tab
          <View style={styles.sectionContainer}>
            {course.sections.map((section) => (
              <View key={section.id} style={styles.section}>
                <Typography variant="h2" style={styles.sectionTitle}>
                  {section.title}
                </Typography>
                
                {section.subsections.map((subsection) => {
                  const isQuiz = Boolean(subsection.questionCount);
                  const isCompleted = isSubsectionCompleted(subsection.id, isQuiz);
                  
                  return (
                    <TouchableOpacity
                      key={subsection.id}
                      style={[
                        styles.subsectionItem,
                        isCompleted && styles.completedSubsection
                      ]}
                      onPress={() => 
                        subsection.duration 
                          ? handleSectionPress(section.id)
                          : handlePracticePress(section.id)
                      }
                    >
                      <View style={styles.subsectionContent}>
                        <View style={styles.subsectionLeft}>
                          {isCompleted && (
                            <Feather 
                              name="check-circle" 
                              size={20} 
                              color={theme.colors.success.main}
                              style={styles.completionIcon}
                            />
                          )}
                          <Typography variant="body1">
                            {subsection.title}
                          </Typography>
                        </View>
                        <Typography variant="caption" color="secondary">
                          {subsection.duration 
                            ? `${subsection.duration} mins`
                            : `${subsection.questionCount} questions`
                          }
                        </Typography>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        ) : (
          // Course Details Tab
          <View style={styles.detailsContainer}>
            <Typography variant="h1" style={styles.courseTitle}>
              {course.title}
            </Typography>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Typography variant="h2">{course.studentCount}</Typography>
                <Typography variant="caption" color="secondary">
                  Students
                </Typography>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Typography variant="h2">{course.sectionCount}</Typography>
                <Typography variant="caption" color="secondary">
                  Sections
                </Typography>
              </View>
            </View>

            <Typography variant="body1" style={styles.description}>
              {course.description}
            </Typography>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: theme.colors.primary.main,
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 110,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.grey[300],
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.paper,
  },
  activeTab: {
    backgroundColor: theme.colors.background.default,
  },
  tabText: {
    fontSize: 25,
  },
  previewText: {
    color: theme.colors.background.paper,
  },
  content: {
    flex: 1,
  },
  sectionContainer: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
  subsectionItem: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: 8,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  subsectionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: theme.spacing.lg,
  },
  courseTitle: {
    marginBottom: theme.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.grey[300],
    marginHorizontal: theme.spacing.xl,
  },
  description: {
    lineHeight: 24,
  },
  subsectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  completionIcon: {
    marginRight: theme.spacing.sm,
  },
  completedSubsection: {
    backgroundColor: `${theme.colors.success.main}10`,
    borderColor: theme.colors.success.main,
  },
});