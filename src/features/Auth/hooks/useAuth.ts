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
  const logout = useAuthStore(state => state.logout);

  const loginMutation = useMutation<User, AppError, APILoginPayload>({
    mutationFn: LoginService.login,
    onSuccess: setUser,
  });

  const login = (
    payload: APILoginPayload,
    options?: MutateOptions<User, AppError, APILoginPayload>,
  ) => loginMutation.mutate(payload, options);

  const signupMutation = useMutation<User, AppError, APISignupPayload>({
    mutationFn: LoginService.signup,
    onSuccess: setUser,
  });

  const signup = (
    payload: APISignupPayload,
    options?: MutateOptions<User, AppError, APISignupPayload>,
  ) => signupMutation.mutate(payload, options);

  const logoutMutation = useMutation({
    mutationFn: LoginService.logout,
    onSuccess: logout,
  });

  return {
    login,
    signup,
    logout: (options?: MutateOptions) =>
      logoutMutation.mutate(undefined, options),
    loginMutation,
    signupMutation,
    logoutMutation,
  };
}
