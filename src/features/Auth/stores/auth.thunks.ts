import { createAsyncThunk } from '@reduxjs/toolkit';

import * as authService from '@features/Auth/services/authService';
import { SignupParams } from '@features/Auth/services/authSource.firebase';
import { Analytics } from '@core/analytics';

import { logout, setUser } from './auth.slice';

type LoginParams = {
  email: string;
  password: string;
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginParams, { dispatch, rejectWithValue }) => {
    Analytics.track('LOGIN_SUBMIT', { method: 'firebase-email' });

    try {
      const user = await authService.login(email, password);
      Analytics.track('LOGIN_SUCCESS', { userId: user.id });
      dispatch(setUser(user));
      return user;
    } catch (error) {
      console.log('Error during loginThunk:', error);
      Analytics.track('LOGIN_FAILURE', { method: 'firebase-email', error });
      return rejectWithValue(error);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await authService.logout();

    dispatch(logout());
  },
);

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (
    { email, password, name }: SignupParams,
    { dispatch, rejectWithValue },
  ) => {
    Analytics.track('SIGNUP_SUBMIT', { method: 'firebase-email' });
    try {
      const user = await authService.signup({ email, password, name });
      Analytics.track('SIGNUP_SUCCESS', { userId: user.id });
      dispatch(setUser(user));
      return user;
    } catch (error) {
      Analytics.track('SIGNUP_FAILURE', { method: 'firebase-email', error });
      return rejectWithValue(error);
    }
  },
);
