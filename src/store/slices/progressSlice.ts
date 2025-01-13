// src/store/slices/progressSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  completedLessons: string[];
  currentLesson: string | null;
  scores: Record<string, number>;
}

const initialState: ProgressState = {
  completedLessons: [],
  currentLesson: null,
  scores: {},
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    completeLesson: (state, action: PayloadAction<string>) => {
      if (!state.completedLessons.includes(action.payload)) {
        state.completedLessons.push(action.payload);
      }
    },
    setCurrentLesson: (state, action: PayloadAction<string>) => {
      state.currentLesson = action.payload;
    },
    updateScore: (state, action: PayloadAction<{ lessonId: string; score: number }>) => {
      state.scores[action.payload.lessonId] = action.payload.score;
    },
    resetProgress: (state) => {
      state.completedLessons = [];
      state.currentLesson = null;
      state.scores = {};
    },
  },
});

export const { completeLesson, setCurrentLesson, updateScore, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;