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
import QuizComponent from '../../components/quiz/QuizComponent';
import type { Question } from '../../components/quiz/QuizComponent';
import { theme } from '../../theme';
import { useAppDispatch } from '@/store/hooks';
import { recordQuizScore } from '@/store/slices/progressSlice';

// Mock questions for development
const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple-choice' as const,
    text: 'What is the primary purpose of Python\'s "if __name__ == \'__main__\'" statement?',
    options: [
      'To define the main function',
      'To check if the module is being run directly',
      'To import the main module',
      'To start the Python interpreter'
    ],
    correctAnswer: 1
  },
  {
    id: '2',
    type: 'multiple-choice',
    text: 'Which of the following is the correct way to create a list in Python?',
    options: [
      '{1, 2, 3}',
      '[1, 2, 3]',
      '(1, 2, 3)',
      '<1, 2, 3>'
    ],
    correctAnswer: 1
  },
  {
    id: '3',
    type: 'multiple-choice',
    text: 'What is the output of print(type([]))?',
    options: [
      '<class \'list\'>',
      '<class \'array\'>',
      '<class \'tuple\'>',
      '<class \'set\'>'
    ],
    correctAnswer: 0
  },
  {
    id: '4',
    type: 'multiple-choice',
    text: 'Which method is used to add an element to the end of a list?',
    options: [
      'add()',
      'append()',
      'extend()',
      'insert()'
    ],
    correctAnswer: 1
  }
];

type PracticeScreenRouteProp = RouteProp<CourseStackParamList, 'CoursePractice'>;
type PracticeScreenNavigationProp = StackNavigationProp<CourseStackParamList, 'CoursePractice'>;

export const CoursePracticeScreen: React.FC = () => {
  const route = useRoute<PracticeScreenRouteProp>();
  const navigation = useNavigation<PracticeScreenNavigationProp>();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const dispatch = useAppDispatch();
  const { courseId, sectionId } = route.params;
  
  const handleQuizComplete = (finalScore: number) => {
    // Record the quiz score
    dispatch(recordQuizScore({
      courseId,
      quizId: sectionId,
      score: finalScore
    }));
    
    setScore(finalScore);
    setQuizCompleted(true);
  };

  const handleExitQuiz = () => {
    navigation.goBack();
  };

  if (quizCompleted && score !== null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completionContainer}>
          <Typography variant="h1" style={styles.whiteText}>
            Quiz Completed!
          </Typography>
          <Typography variant="h2" style={styles.whiteText}>
            Your Score: {score.toFixed(0)}%
          </Typography>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={handleExitQuiz}
          >
            <Typography>Return to Course</Typography>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (quizStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <QuizComponent
          questions={mockQuestions}
          onComplete={handleQuizComplete}
          onExit={handleExitQuiz}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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
              {mockQuestions.length} questions
            </Typography>
          </View>

          <Typography variant="body1" style={styles.subtitle}>
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
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  exitButton: {
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.background.paper,
    padding: theme.spacing.md,
    borderRadius: 8,
  }
});