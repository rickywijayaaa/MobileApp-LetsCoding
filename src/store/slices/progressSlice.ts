// src/store/slices/progressSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CourseProgress, ProgressState } from '../../types/progress';
import { MOCK_COURSES } from '../../data/mockCourses';

const initialState: ProgressState = {
  courseProgress: {},
  currentCourseId: null,
  currentSectionId: null
};

// Helper function to check if a course is completed
const checkCourseCompletion = (
  progress: CourseProgress,
  courseId: string
): boolean => {
  const course = MOCK_COURSES.find(c => c.id === courseId);
  if (!course) return false;

  // Collect all sections that require completion
  let allSectionsCompleted = true;
  
  for (const section of course.sections) {
    const hasContentSection = section.subsections.some(sub => sub.duration);
    const hasQuizSection = section.subsections.some(sub => sub.questionCount);

    // Check content completion
    if (hasContentSection) {
      const isContentCompleted = progress.completedLessons.includes(section.id);
      if (!isContentCompleted) {
        allSectionsCompleted = false;
        break;
      }
    }

    // Check quiz completion
    if (hasQuizSection) {
      const isQuizCompleted = progress.completedQuizzes.some(quiz => quiz.quizId === section.id);
      if (!isQuizCompleted) {
        allSectionsCompleted = false;
        break;
      }
    }
  }

  return allSectionsCompleted;
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    loadSavedProgress: (state, action: PayloadAction<Record<string, CourseProgress>>) => {
      state.courseProgress = action.payload;
      // Update completion status for all courses
      Object.keys(state.courseProgress).forEach(courseId => {
        const progress = state.courseProgress[courseId];
        if (progress) {
          progress.isCompleted = checkCourseCompletion(progress, courseId);
        }
      });
    },

    setCurrentCourse: (state, action: PayloadAction<string>) => {
      state.currentCourseId = action.payload;
      // Initialize course progress if it doesn't exist
      if (!state.courseProgress[action.payload]) {
        state.courseProgress[action.payload] = {
          courseId: action.payload,
          completedLessons: [],
          completedQuizzes: [],
          lastAccessedAt: new Date().toISOString(),
          isCompleted: false
        };
      }
    },
    
    setCurrentSection: (state, action: PayloadAction<string>) => {
      state.currentSectionId = action.payload;
    },
    
    completeLesson: (state, action: PayloadAction<{ courseId: string; lessonId: string }>) => {
      const courseProgress = state.courseProgress[action.payload.courseId];
      if (courseProgress && !courseProgress.completedLessons.includes(action.payload.lessonId)) {
        courseProgress.completedLessons.push(action.payload.lessonId);
        courseProgress.lastAccessedAt = new Date().toISOString();
        // Update completion status
        courseProgress.isCompleted = checkCourseCompletion(courseProgress, action.payload.courseId);
      }
    },
    
    recordQuizScore: (state, action: PayloadAction<{ 
      courseId: string; 
      quizId: string; 
      score: number 
    }>) => {
      const { courseId, quizId, score } = action.payload;
      const courseProgress = state.courseProgress[courseId];
      
      if (courseProgress) {
        // Remove any existing score for this quiz
        courseProgress.completedQuizzes = courseProgress.completedQuizzes.filter(
          quiz => quiz.quizId !== quizId
        );
        
        // Add new score
        courseProgress.completedQuizzes.push({
          quizId,
          score,
          completedAt: new Date().toISOString()
        });
        
        courseProgress.lastAccessedAt = new Date().toISOString();
        // Update completion status
        courseProgress.isCompleted = checkCourseCompletion(courseProgress, courseId);
      }
    },
    
    clearProgress: (state, action: PayloadAction<string>) => {
      delete state.courseProgress[action.payload];
    }
  }
});

// Existing Selectors
export const selectCourseProgress = (state: { progress: ProgressState }, courseId: string) => 
  state.progress.courseProgress[courseId];

export const selectQuizScore = (
  state: { progress: ProgressState }, 
  courseId: string, 
  quizId: string
) => {
  const courseProgress = state.progress.courseProgress[courseId];
  return courseProgress?.completedQuizzes.find(quiz => quiz.quizId === quizId)?.score || null;
};

export const selectCompletedLessons = (state: { progress: ProgressState }, courseId: string) =>
  state.progress.courseProgress[courseId]?.completedLessons || [];

// New Selector for completed courses count
export const selectCompletedCoursesCount = (state: { progress: ProgressState }) => 
  Object.values(state.progress.courseProgress).filter(progress => progress.isCompleted).length;

export const {
  loadSavedProgress,
  setCurrentCourse,
  setCurrentSection,
  completeLesson,
  recordQuizScore,
  clearProgress
} = progressSlice.actions;

export default progressSlice.reducer;