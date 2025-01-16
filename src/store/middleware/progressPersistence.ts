// src/store/middleware/progressPersistence.ts
import { Middleware } from '@reduxjs/toolkit';
import { saveProgressToStorage } from '../../utils/progressStorage';
import type { RootState } from '../index';

const progressPersistenceMiddleware: Middleware = 
  (store) => (next) => (action) => {
    const result = next(action);
    
    // Save progress when relevant actions are dispatched
    if (typeof action === 'object' && action !== null && 'type' in action && typeof action.type === 'string' && action.type.startsWith('progress/')) {
      const state = store.getState() as { progress: { courseProgress: RootState['progress']['courseProgress'] } };
      saveProgressToStorage(state.progress.courseProgress);
    }
    
    return result;
  };

export default progressPersistenceMiddleware;