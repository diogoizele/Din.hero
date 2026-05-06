import { MutateOptions, useMutation } from '@tanstack/react-query';

import { AppError } from '@core/api';

import {
  APILoginPayload,
  APISignupPayload,
} from '../services/authService.types';
import { LoginService } from '../services/authService';
import { useAuthStore } from '../stores/auth.store';
import { User } from '../types';

export function useAuth() {
  const setUser = useAuthStore(state => state.setUser);
  const logoutStore = useAuthStore(state => state.logout);

  const loginMutation = useMutation<User, AppError, APILoginPayload>({
    mutationFn: LoginService.login,
    onSuccess: setUser,
  });

  const login = (
    payload: APILoginPayload,
    options?: MutateOptions<User, AppError, APILoginPayload>,
  ) => loginMutation.mutateAsync(payload, options);

  const signupMutation = useMutation<User, AppError, APISignupPayload>({
    mutationFn: LoginService.signup,
    onSuccess: setUser,
  });

  const signup = (
    payload: APISignupPayload,
    options?: MutateOptions<User, AppError, APISignupPayload>,
  ) => signupMutation.mutateAsync(payload, options);

  const logoutMutation = useMutation({
    mutationFn: LoginService.logout,
    onSuccess: logoutStore,
  });

  const logout = (options?: MutateOptions) =>
    logoutMutation.mutateAsync(undefined, options);

  const requestPasswordResetMutation = useMutation<void, AppError, string>({
    mutationFn: (email: string) => LoginService.requestPasswordReset(email),
  });

  const requestPasswordReset = (email: string) =>
    requestPasswordResetMutation.mutateAsync(email);

  return {
    login,
    signup,
    logout,
    requestPasswordReset,
    loginMutation,
    signupMutation,
    logoutMutation,
    requestPasswordResetMutation,
  };
}
