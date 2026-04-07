import { parseApiError } from '@core/api';
import { Analytics } from '@core/analytics';

import { User } from '../types';
import { APILoginPayload, APISignupPayload } from './authService.types';
import {
  loginFirebase,
  signupFirebase,
  logoutFirebase,
  getCurrentUserFirebase,
} from './authSource.firebase';

export const LoginService = {
  login: async (payload: APILoginPayload): Promise<User> => {
    Analytics.track('LOGIN_SUBMIT', { method: 'firebase-email' });
    try {
      const user = await loginFirebase(payload.email, payload.password);
      Analytics.track('LOGIN_SUCCESS', { userId: user.id });
      return user;
    } catch (error) {
      Analytics.track('LOGIN_FAILURE', { method: 'firebase-email', error });
      throw parseApiError(error);
    }
  },

  signup: async (payload: APISignupPayload): Promise<User> => {
    Analytics.track('SIGNUP_SUBMIT', { method: 'firebase-email' });
    try {
      const user = await signupFirebase(payload);
      Analytics.track('SIGNUP_SUCCESS', { userId: user.id });
      return user;
    } catch (error) {
      Analytics.track('SIGNUP_FAILURE', { method: 'firebase-email', error });
      throw parseApiError(error);
    }
  },

  logout: () => logoutFirebase(),

  getUser: (): Promise<User> => getCurrentUserFirebase(),
};
