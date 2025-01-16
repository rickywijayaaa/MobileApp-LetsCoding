// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import progressReducer from './slices/progressSlice';
import progressPersistenceMiddleware from './middleware/progressPersistence';
import { loadProgressFromStorage } from '../utils/progressStorage';

// Create store with initial configuration
export const store = configureStore({
  reducer: {
    auth: authReducer,
    progress: progressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user'],
      },
    }).concat(progressPersistenceMiddleware),
});

// Load saved progress when app starts
loadProgressFromStorage().then(savedProgress => {
  if (savedProgress) {
    store.dispatch({
      type: 'progress/loadSavedProgress',
      payload: savedProgress,
    });
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;