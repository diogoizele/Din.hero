import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';

import { PublicRoutes, PublicStackNavigationProps } from '@app';
import { notifyError } from '@core/services';
import { useShake } from '@shared/hooks';

import { useAuth } from '../../../hooks/useAuth';
import { AuthRoutes } from '../../../navigation/AuthNavigator.types';
import { loginSchema } from '../../../schemas/auth.schemas';

type LoginForm = {
  email: string;
  password: string;
};

type UseLoginParams = {
  email?: string;
};

export function useLogin({ email }: UseLoginParams) {
  const { shake, style } = useShake();

  const navigation = useNavigation<PublicStackNavigationProps>();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email,
    },
  });

  const { login, loginMutation } = useAuth();

  const navigateToSignup = () => {
    setValue('email', '');
    setValue('password', '');
    navigation.navigate(PublicRoutes.AUTH, { screen: AuthRoutes.SIGNUP });
  };

  const navigateToResetPassword = () => {
    const emailText = getValues('email');

    const params = emailText ? { email: emailText } : undefined;

    navigation.navigate(PublicRoutes.AUTH, {
      screen: AuthRoutes.RESET_PASSWORD,
      params,
    });
  };

  useFocusEffect(
    useCallback(
      () => () => {
        loginMutation.reset();
      },
      [],
    ),
  );

  const onLogin = handleSubmit(async data => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });

      setValue('email', '');
      setValue('password', '');
    } catch (e) {
      notifyError();
      shake();
    }
  });

  return {
    control,
    error: loginMutation.error,
    errors,
    shakeStyle: style,
    isLoading: loginMutation.isPending,
    onLogin,
    navigateToSignup,
    navigateToResetPassword,
  };
}
