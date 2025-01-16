// src/store/slices/progressSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CourseProgress, ProgressState } from '../../types/progress';

const initialState: ProgressState = {
  courseProgress: {},
  currentCourseId: null,
  currentSectionId: null
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    loadSavedProgress: (state, action: PayloadAction<Record<string, CourseProgress>>) => {
      state.courseProgress = action.payload;
    },
    setCurrentCourse: (state, action: PayloadAction<string>) => {
      state.currentCourseId = action.payload;
      // Initialize course progress if it doesn't exist
      if (!state.courseProgress[action.payload]) {
        state.courseProgress[action.payload] = {
          courseId: action.payload,
          completedLessons: [],
          completedQuizzes: [],
          lastAccessedAt: new Date().toISOString()
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
      }
    },
    
    clearProgress: (state, action: PayloadAction<string>) => {
      delete state.courseProgress[action.payload];
    }
  }
});

// Selectors
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

export const {
  setCurrentCourse,
  setCurrentSection,
  completeLesson,
  recordQuizScore,
  clearProgress
} = progressSlice.actions;

export default progressSlice.reducer;