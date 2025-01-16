// src/utils/progressStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CourseProgress } from '../types/progress';

const PROGRESS_STORAGE_KEY = '@virtual_lab_progress';

export const saveProgressToStorage = async (progress: Record<string, CourseProgress>) => {
  try {
    await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const loadProgressFromStorage = async (): Promise<Record<string, CourseProgress> | null> => {
  try {
    const progressData = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
    return progressData ? JSON.parse(progressData) : null;
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
};