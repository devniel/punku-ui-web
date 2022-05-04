import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from './store';
import * as api from '../services/api';

// Define a type for the slice state
export interface AuthState {
  user?: any;
  errors?: AuthError[];
  status: 'idle' | 'processing' | 'success';
  token?: string;
  message?: string;
}

export const AuthStatus = {
  IDLE: 'idle',
  PROCESSING: 'processing',
  SUCCESS: 'success',
};

// Define the initial state using that type
const initialState: AuthState = {
  status: 'idle',
};

// Action payload types
interface SignupSuccess {
  user: any;
}
interface SigninSuccess {
  user: any;
}
interface AuthError {
  message: string;
}

// thunks
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    params: { username: string; password: string; email: string },
    thunkAPI
  ) => {
    const response = await api.signUp(params);
    if (response.errors) return thunkAPI.rejectWithValue(response.errors);
    return response.data;
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (params: { usernameOrEmail: string; password: string }, thunkAPI) => {
    const response = await api.signIn(params);
    if (response.errors) return thunkAPI.rejectWithValue(response.errors);
    return response.data;
  }
);

export const passwordReset = createAsyncThunk(
  'auth/passwordReset',
  async (params: { usernameOrEmail: string }, thunkAPI) => {
    const response = await api.passwordReset(params);
    if (response.errors) return thunkAPI.rejectWithValue(response.errors);
    return response.data;
  }
);

export const cleanAuthErrors = createAction<undefined>('auth/cleanErrors');

// setup
export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cleanAuthErrors, (state, action) => {
      state.errors = [];
      state.status = 'idle';
      return state;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    // signup flow
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'idle';
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.errors = [];
      state.status = 'processing';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.errors = [action.error] as AuthError[];
      state.status = 'idle';
    });
    // signin flow
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload?.user;
      state.status = 'idle';
    });
    builder.addCase(signIn.pending, (state, action) => {
      state.errors = [];
      state.status = 'processing';
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.errors = [action.error] as AuthError[];
      state.status = 'idle';
    });
    // password reset flow
    builder.addCase(passwordReset.fulfilled, (state, action) => {
      console.log(action);
      state.message = action.payload?.message;
      state.status = 'success';
    });
    builder.addCase(passwordReset.pending, (state, action) => {
      state.errors = [];
      state.status = 'processing';
    });
    builder.addCase(passwordReset.rejected, (state, action) => {
      state.errors = [action.error] as AuthError[];
      state.status = 'idle';
    });
  },
});

export default authSlice.reducer;
