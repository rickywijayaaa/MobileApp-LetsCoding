// src/screens/course/CoursePracticeScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  StatusBar,
  TextStyle
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CourseStackParamList } from '../../navigation/types';
import { Typography } from '../../components/common/Typography/Typography';
import { MOCK_COURSES } from '../../data/mockCourses';
import { theme } from '../../theme';

type PracticeScreenRouteProp = RouteProp<CourseStackParamList, 'CoursePractice'>;
type PracticeScreenNavigationProp = StackNavigationProp<CourseStackParamList, 'CoursePractice'>;

export const CoursePracticeScreen: React.FC = () => {
  const route = useRoute<PracticeScreenRouteProp>();
  const navigation = useNavigation<PracticeScreenNavigationProp>();
  const [quizStarted, setQuizStarted] = useState(false);

  const course = MOCK_COURSES.find(c => c.id === route.params.courseId);
  const section = course?.sections.find(s => s.id === route.params.sectionId);
  const practiceSubsection = section?.subsections[1];

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  if (!course || !section || !practiceSubsection) {
    return (
      <SafeAreaView style={styles.container}>
        <Typography variant="h2" style={styles.whiteText}>
          Practice session not found
        </Typography>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.courseIcon}>
            <View style={styles.iconInner} />
            <View style={styles.iconSlash} />
            <View style={styles.iconBar} />
          </View>
          <Typography style={styles.headerText}>
            {course.title}
          </Typography>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {!quizStarted ? (
          <>
            <View style={styles.titleSection}>
              <Typography variant="h1" style={styles.title}>
                Practice Quiz
              </Typography>
              
              <View style={styles.infoContainer}>
                <Typography variant="body1" style={styles.whiteText}>
                  Quiz 1
                </Typography>
                <View style={styles.divider} />
                <Typography variant="body1" style={styles.whiteText}>
                  {practiceSubsection.questionCount} questions
                </Typography>
              </View>

              <Typography 
                variant="body1" 
                style={styles.subtitle}
              >
                Apply what you've learned and see how much you know!
              </Typography>
            </View>

            <TouchableOpacity 
              style={styles.startButton}
              onPress={handleStartQuiz}
            >
              <Typography style={styles.startButtonText}>
                Start
              </Typography>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <Typography variant="h2" style={styles.whiteText}>
              Quiz content coming soon
            </Typography>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    height: 218,
    paddingTop: 42,
    paddingBottom: 42,
    paddingHorizontal: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 84,
  },
  courseIcon: {
    width: 134,
    height: 134,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInner: {
    width: 101,
    height: 101,
    borderWidth: 8,
    borderColor: 'white',
    position: 'absolute',
  },
  iconSlash: {
    width: 18,
    height: 36,
    borderWidth: 8,
    borderColor: 'white',
    position: 'absolute',
    top: 49,
    left: 46,
  },
  iconBar: {
    width: 42,
    borderWidth: 4,
    borderColor: 'white',
    position: 'absolute',
    top: 67,
    left: 46,
  },
  whiteText: {
    color: 'white',
  } as TextStyle,
  headerText: {
    fontSize: 59,
    fontFamily: 'Prompt',
    fontWeight: '400',
    color: 'white',
  } as TextStyle,
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  titleSection: {
    marginTop: 150,
  },
  title: {
    fontSize: 100,
    fontWeight: '700',
    marginBottom: 25,
    color: 'white',
  } as TextStyle,
  infoContainer: {
    width: 430,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  divider: {
    width: 51,
    height: 0,
    borderWidth: 1,
    borderColor: 'white',
    transform: [{rotate: '90deg'}],
  },
  subtitle: {
    fontSize: 42,
    fontWeight: '400',
    color: 'white',
  } as TextStyle,
  startButton: {
    width: 1000,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },
  startButtonText: {
    fontSize: 64,
    fontWeight: '700',
    color: theme.colors.text.primary,
  } as TextStyle,
});