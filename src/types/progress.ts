// src/types/progress.ts
export interface QuizScore {
    quizId: string;
    score: number;
    completedAt: string;
  }
  
  export interface CourseProgress {
    courseId: string;
    completedLessons: string[];
    completedQuizzes: QuizScore[];
    lastAccessedAt: string;
    isCompleted: boolean;
  }
  
  export interface ProgressState {
    courseProgress: Record<string, CourseProgress>;
    currentCourseId: string | null;
    currentSectionId: string | null;
  }