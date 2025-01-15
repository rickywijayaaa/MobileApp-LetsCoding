// src/store/slices/authSlice.ts
import { 
  createSlice, 
  createAsyncThunk,
  PayloadAction 
} from '@reduxjs/toolkit';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  AuthError
} from 'firebase/auth';
import { auth } from '../../services/firebase/config';

// Define our serialized user interface to ensure type safety
interface SerializedUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  createdAt: string | null;
  lastLoginAt: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: SerializedUser | null;
  loading: boolean;
  error: string | null;
  loginAttempts: number;
  lastLoginAttempt: number | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  loginAttempts: 0,
  lastLoginAttempt: null
};

// Convert Firebase user object to serializable format
const serializeUser = (user: FirebaseUser): SerializedUser => {
  const createdAtTime = user.metadata.creationTime 
    ? new Date(user.metadata.creationTime).getTime().toString()
    : null;
  
  const lastLoginTime = user.metadata.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).getTime().toString()
    : null;

  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: createdAtTime,
    lastLoginAt: lastLoginTime
  };
};

// Handle Firebase-specific error messages
const handleAuthError = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email address format';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later';
    default:
      return error.message || 'Authentication failed';
  }
};

// Async thunk for login with rate limiting
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState };
    
    const now = Date.now();
    const timeSinceLastAttempt = state.auth.lastLoginAttempt 
      ? now - state.auth.lastLoginAttempt 
      : Infinity;
    
    if (state.auth.loginAttempts >= 5 && timeSinceLastAttempt < 300000) {
      return rejectWithValue('Too many login attempts. Please try again later.');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return serializeUser(userCredential.user);
    } catch (error) {
      return rejectWithValue(handleAuthError(error as AuthError));
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return serializeUser(userCredential.user);
    } catch (error) {
      return rejectWithValue(handleAuthError(error as AuthError));
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue('Failed to log out');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseUser | null>) => {
      state.user = action.payload ? serializeUser(action.payload) : null;
      state.isAuthenticated = !!action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetLoginAttempts: (state) => {
      state.loginAttempts = 0;
      state.lastLoginAttempt = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loginAttempts += 1;
        state.lastLoginAttempt = Date.now();
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loginAttempts = 0;
        state.lastLoginAttempt = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return initialState;
      });
  },
});

export const { setUser, clearError, resetLoginAttempts } = authSlice.actions;
export default authSlice.reducer;