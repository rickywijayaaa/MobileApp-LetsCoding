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

const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple-choice',
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
    backgroundColor: '#4D2C5E',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
  },
  titleSection: {
    marginTop: theme.spacing.xl, // Increased margin for proper spacing
  },
  title: {
    fontSize: 48, // Reduced size for proper layout
    fontWeight: '700',
    marginBottom: theme.spacing.md,
    color: 'white',
  } as TextStyle,
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: 'white',
    marginHorizontal: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16, // Reduced size
    fontWeight: '400',
    color: 'white',
    marginTop: theme.spacing.sm,
  } as TextStyle,
  startButton: {
    width: '90%',
    height: 50, // Adjusted size
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: theme.spacing.xxl,
    marginTop: theme.spacing.lg,
  },
  startButtonText: {
    fontSize: 18, // Adjusted font size
    fontWeight: '700',
    color: theme.colors.text.primary,
  } as TextStyle,
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  whiteText: {
    color: 'white',
  } as TextStyle,
  exitButton: {
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.background.paper,
    padding: theme.spacing.md,
    borderRadius: 8,
  },
});


