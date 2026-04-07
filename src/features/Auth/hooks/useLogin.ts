import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

import { useLoading, PublicRoutes, PublicStackNavigationProps } from '@app';
import { AppError } from '@core/api';

import { useAuthStore } from '../stores/auth.store';
import { LoginService } from '../services/authService';
import { APILoginPayload } from '../services/authService.types';
import { User } from '../types';

type LoginForm = {
  email: string;
  password: string;
};

export function useLogin() {
  const setUser = useAuthStore(state => state.setUser);
  const { setIsLoading } = useLoading();
  const navigation = useNavigation<PublicStackNavigationProps>();
  const { control, handleSubmit, setValue, watch } = useForm<LoginForm>();

  const email = watch('email');
  const password = watch('password');

  const disableSubmit = !email || !password;

  const loginMutation = useMutation<User, AppError, APILoginPayload>({
    mutationFn: LoginService.login,
    onSuccess: setUser,
    onSettled() {
      setValue('email', '');
      setValue('password', '');
    },
  });

  const handleNavigateToSignup = () => {
    setValue('email', '');
    setValue('password', '');
    navigation.navigate(PublicRoutes.SIGNUP);
  };

  useEffect(() => {
    setIsLoading(loginMutation.isPending);

    return () => {
      setIsLoading(false);
    };
  }, [loginMutation.isPending]);

  return {
    control,
    disableSubmit,
    error: loginMutation.error,
    onLogin: handleSubmit(data => loginMutation.mutate(data)),
    navigateToSignup: handleNavigateToSignup,
  };
}
