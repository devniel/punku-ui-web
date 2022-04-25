import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import * as api from '../services/api';

// Define a type for the slice state
interface AuthState {
  user: any;
  errors: AuthError[] | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  errors: null,
  loading: false,
};

// Action payload types
interface SignupSuccess {
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

// setup
export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.errors = action.error as AuthError[];
    });
  },
});

export default authSlice.reducer;
