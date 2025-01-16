// src/types/course.ts
export interface Course {
    id: string;
    title: string;
    description: string;
    studentCount: number;
    sectionCount: number;
    sections: CourseSection[];
  }
  
  export interface CourseSection {
    id: string;
    title: string;
    type: 'concept' | 'practice';
    duration?: number;
    questionCount?: number;
  }