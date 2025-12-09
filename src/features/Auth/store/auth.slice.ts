import { User } from '@data/models/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, signUpThunk } from './auth.thunks';

type AuthStateSchema = {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: AuthStateSchema = {
  error: null,
  status: 'idle',
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      console.log('Received user in setUser:', action.payload);
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        console.log('Login pending...');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        console.log('Login failed:', action.error);
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(logoutThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.status = 'succeeded';
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        console.log('Logout failed:', action.error);
        state.status = 'failed';
        state.error = action.error.message || 'Failed to logout';
      })
      .addCase(signUpThunk.pending, state => {
        console.log('Sign up pending...');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        console.log('Sign up failed:', action.error);
        state.status = 'failed';
        state.error = action.error.message || 'Failed to sign up';
      });
  },
});

export const { logout, setUser } = slice.actions;
export default slice.reducer;
