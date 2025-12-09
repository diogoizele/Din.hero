import { useAppDispatch, useAppSelector } from '@core/hooks';

import { loginThunk, logoutThunk, signUpThunk } from '../store/auth.thunks';
import { SignupParams } from '../services/authSource.firebase';

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const isLoading = useAppSelector(state => state.auth.status === 'loading');
  const errorMessage = useAppSelector(state => state.auth.error);

  const login = async (email: string, password: string) =>
    dispatch(loginThunk({ email, password }));

  const logout = async () => {
    dispatch(logoutThunk());
  };

  const signUp = async (newUser: SignupParams) =>
    dispatch(signUpThunk(newUser));

  return {
    user,
    isLoading,
    errorMessage,
    login,
    logout,
    signUp,
  };
}
