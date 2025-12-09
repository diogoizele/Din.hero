import { useAppDispatch, useAppSelector } from '@core/hooks';

import { loginThunk } from '../store/auth.thunks';

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const isLoading = useAppSelector(state => state.auth.status === 'loading');
  const errorMessage = useAppSelector(state => state.auth.error);

  const login = async (email: string, password: string) =>
    dispatch(loginThunk({ email, password }));

  return {
    user,
    isLoading,
    errorMessage,
    login,
  };
}
