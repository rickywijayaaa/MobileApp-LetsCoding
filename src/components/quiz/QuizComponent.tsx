// src/components/quiz/QuizComponent.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Typography } from '../common/Typography/Typography';
import { theme } from '../../theme';

// Define our core question types
export type QuestionType = 'multiple-choice' | 'true-false';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options: string[];
  correctAnswer: string | number;
}

interface QuizComponentProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onExit: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  onComplete,
  onExit
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string | number) => {
    if (isSubmitted) return;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / questions.length) * 100;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setIsSubmitted(true);
    onComplete(score);
  };

  const canNavigateNext = currentQuestionIndex < questions.length - 1;
  const canNavigatePrevious = currentQuestionIndex > 0;
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;

  return (
    <View style={styles.container}>
      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <Typography>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Typography>
      </View>

      {/* Question content */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.questionContainer}>
          <Typography variant="h2" style={styles.questionText}>
            {currentQuestion.text}
          </Typography>

          {/* Answer options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(index)}
                style={[
                  styles.optionButton,
                  answers[currentQuestion.id] === index && styles.selectedOption
                ]}
              >
                <Typography>
                  {option}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Navigation buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={() => setCurrentQuestionIndex(prev => prev - 1)}
          disabled={!canNavigatePrevious}
          style={[
            styles.navButton,
            !canNavigatePrevious && styles.disabledButton
          ]}
        >
          <Typography>Previous</Typography>
        </TouchableOpacity>

        {currentQuestionIndex === questions.length - 1 ? (
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!hasAnsweredCurrent || isSubmitted}
            style={[
              styles.navButton,
              styles.submitButton,
              (!hasAnsweredCurrent || isSubmitted) && styles.disabledButton
            ]}
          >
            <Typography style={styles.submitButtonText}>
              Submit
            </Typography>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setCurrentQuestionIndex(prev => prev + 1)}
            disabled={!canNavigateNext || !hasAnsweredCurrent}
            style={[
              styles.navButton,
              styles.nextButton,
              (!canNavigateNext || !hasAnsweredCurrent) && styles.disabledButton
            ]}
          >
            <Typography style={styles.nextButtonText}>
              Next
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.paper,
    padding: theme.spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  scrollContainer: {
    flex: 1,
  },
  questionContainer: {
    marginBottom: theme.spacing.xl,
  },
  questionText: {
    marginBottom: theme.spacing.md,
  },
  optionsContainer: {
    gap: theme.spacing.sm,
  },
  optionButton: {
    padding: theme.spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    marginBottom: theme.spacing.sm,
  },
  selectedOption: {
    backgroundColor: `${theme.colors.primary.main}20`,
    borderColor: theme.colors.primary.main,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  navButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 8,
    backgroundColor: theme.colors.grey[200],
  },
  submitButton: {
    backgroundColor: theme.colors.primary.main,
  },
  submitButtonText: {
    color: theme.colors.primary.contrast,
  },
  nextButton: {
    backgroundColor: theme.colors.primary.main,
  },
  nextButtonText: {
    color: theme.colors.primary.contrast,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default QuizComponent;