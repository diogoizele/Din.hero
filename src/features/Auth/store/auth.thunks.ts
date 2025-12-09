import { createAsyncThunk } from '@reduxjs/toolkit';

import * as authService from '@features/Auth/services/authService';
import { setUser } from './auth.slice';

type LoginParams = {
  email: string;
  password: string;
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginParams, { dispatch }) => {
    const user = await authService.login(email, password);

    dispatch(setUser(user));

    return user;
  },
);
