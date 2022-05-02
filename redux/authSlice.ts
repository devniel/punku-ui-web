import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from './store';
import * as api from '../services/api';

// Define a type for the slice state
interface AuthState {
  user?: any;
  errors?: AuthError[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  token?: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  loading: 'idle',
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
      return state;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    // signup flow
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.errors = [action.error] as AuthError[];
    });
    // signin flow
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signIn.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.errors = [action.error] as AuthError[];
    });
  },
});

export default authSlice.reducer;
