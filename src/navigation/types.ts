// src/navigation/types.ts
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Learn: undefined;
  Profile: undefined;
};

export type CourseStackParamList = {
  CourseList: undefined;
  CourseDetails: { courseId: string };
  CourseContent: { courseId: string; sectionId: string };
  CoursePractice: { courseId: string; sectionId: string };
};