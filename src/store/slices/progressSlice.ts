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
  if (!course) {
    console.log('Course not found:', courseId);
    return false;
  }

  console.log('Checking course completion for:', courseId);
  console.log('Current progress:', {
    completedLessons: progress.completedLessons,
    completedQuizzes: progress.completedQuizzes.map(q => q.quizId)
  });

  let allCompleted = true;
  
  // Check completion for each section and its subsections
  for (const section of course.sections) {
    console.log('Checking section:', section.id);
    
    // Get content and quiz subsections
    const contentSubsections = section.subsections.filter(sub => sub.duration);
    const quizSubsections = section.subsections.filter(sub => sub.questionCount);
    
    // Check content subsections
    for (const contentSub of contentSubsections) {
      const isCompleted = progress.completedLessons.includes(contentSub.id);
      console.log(`Content subsection ${contentSub.id} completion:`, isCompleted);
      if (!isCompleted) {
        allCompleted = false;
        console.log('Missing content completion');
        break;
      }
    }
    
    // Check quiz subsections
    for (const quizSub of quizSubsections) {
      const isCompleted = progress.completedQuizzes.some(quiz => quiz.quizId === quizSub.id);
      console.log(`Quiz subsection ${quizSub.id} completion:`, isCompleted);
      if (!isCompleted) {
        allCompleted = false;
        console.log('Missing quiz completion');
        break;
      }
    }
    
    if (!allCompleted) break;
  }

  console.log('Course completion result:', allCompleted);
  return allCompleted;
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
          console.log(`Loaded progress for course ${courseId}, isCompleted:`, progress.isCompleted);
        }
      });
    },

    setCurrentCourse: (state, action: PayloadAction<string>) => {
      console.log('Setting current course:', action.payload);
      state.currentCourseId = action.payload;
      
      // Initialize or get course progress
      if (!state.courseProgress[action.payload]) {
        console.log('Initializing new course progress');
        state.courseProgress[action.payload] = {
          courseId: action.payload,
          completedLessons: [],
          completedQuizzes: [],
          lastAccessedAt: new Date().toISOString(),
          isCompleted: false
        };
      } else {
        console.log('Found existing course progress:', state.courseProgress[action.payload]);
      }
    },
    
    setCurrentSection: (state, action: PayloadAction<string>) => {
      state.currentSectionId = action.payload;
    },
    
    completeLesson: (state, action: PayloadAction<{ 
      courseId: string; 
      lessonId: string;
      subsectionId: string;
    }>) => {
      console.log('Completing lesson:', action.payload);
      
      // Initialize course progress if it doesn't exist
      if (!state.courseProgress[action.payload.courseId]) {
        state.courseProgress[action.payload.courseId] = {
          courseId: action.payload.courseId,
          completedLessons: [],
          completedQuizzes: [],
          lastAccessedAt: new Date().toISOString(),
          isCompleted: false
        };
      }
      
      const courseProgress = state.courseProgress[action.payload.courseId];
      if (courseProgress && !courseProgress.completedLessons.includes(action.payload.subsectionId)) {
        courseProgress.completedLessons.push(action.payload.subsectionId);
        courseProgress.lastAccessedAt = new Date().toISOString();
        courseProgress.isCompleted = checkCourseCompletion(courseProgress, action.payload.courseId);
        console.log('Updated course completion after lesson:', courseProgress.isCompleted);
      }
    },
    
    recordQuizScore: (state, action: PayloadAction<{ 
      courseId: string; 
      quizId: string;
      subsectionId: string;
      score: number 
    }>) => {
      console.log('Recording quiz score:', action.payload);
      
      // Initialize course progress if it doesn't exist
      if (!state.courseProgress[action.payload.courseId]) {
        state.courseProgress[action.payload.courseId] = {
          courseId: action.payload.courseId,
          completedLessons: [],
          completedQuizzes: [],
          lastAccessedAt: new Date().toISOString(),
          isCompleted: false
        };
      }
      
      const courseProgress = state.courseProgress[action.payload.courseId];
      if (courseProgress) {
        // Only consider quiz completed if score is 100%
        if (action.payload.score === 100) {
          courseProgress.completedQuizzes = courseProgress.completedQuizzes.filter(
            quiz => quiz.quizId !== action.payload.subsectionId
          );
          
          courseProgress.completedQuizzes.push({
            quizId: action.payload.subsectionId,
            score: action.payload.score,
            completedAt: new Date().toISOString()
          });
          
          courseProgress.lastAccessedAt = new Date().toISOString();
          courseProgress.isCompleted = checkCourseCompletion(courseProgress, action.payload.courseId);
          console.log('Updated course completion after quiz:', courseProgress.isCompleted);
        }
      }
    },
    
    clearProgress: (state, action: PayloadAction<string>) => {
      delete state.courseProgress[action.payload];
      console.log('Cleared progress for course:', action.payload);
    }
  }
});

export const selectCourseProgress = (state: { progress: ProgressState }, courseId: string) => 
  state.progress.courseProgress[courseId];

export const selectQuizScore = (
  state: { progress: ProgressState }, 
  courseId: string, 
  subsectionId: string
) => {
  const courseProgress = state.progress.courseProgress[courseId];
  return courseProgress?.completedQuizzes.find(quiz => quiz.quizId === subsectionId)?.score || null;
};

export const selectCompletedLessons = (state: { progress: ProgressState }, courseId: string) =>
  state.progress.courseProgress[courseId]?.completedLessons || [];

export const selectCompletedCoursesCount = (state: { progress: ProgressState }) => {
  const completedCount = Object.values(state.progress.courseProgress)
    .filter(progress => progress.isCompleted).length;
  console.log('Completed courses count:', completedCount);
  return completedCount;
};

export const {
  loadSavedProgress,
  setCurrentCourse,
  setCurrentSection,
  completeLesson,
  recordQuizScore,
  clearProgress
} = progressSlice.actions;

export default progressSlice.reducer;