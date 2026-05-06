import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';

import { PublicRoutes, PublicStackNavigationProps } from '@app';
import { notifyError } from '@core/services';
import { AppErrorKey } from '@core/api';
import { useShake } from '@shared/hooks';

import { useAuth } from '../../../hooks/useAuth';
import { AuthRoutes } from '../../../navigation/AuthNavigator.types';
import { signupSchema } from '../../../schemas/auth.schemas';

type SignUpForm = {
  name: string;
  email: string;
  password: string;
};

export function useSignup() {
  const { shake, style } = useShake();
  const navigation = useNavigation<PublicStackNavigationProps>();
  const { signup, signupMutation } = useAuth();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
  });

  const handleNavigateToLogin = () => {
    const emailAlreadyUsed =
      signupMutation.error?.key === AppErrorKey.AUTH_EMAIL_ALREADY_IN_USE;

    const params = emailAlreadyUsed ? { email: getValues('email') } : undefined;

    navigation.navigate(PublicRoutes.AUTH, {
      screen: AuthRoutes.LOGIN,
      params,
    });
  };

  const onSignup = handleSubmit(async data => {
    try {
      await signup({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      setValue('email', '');
      setValue('password', '');
      setValue('name', '');
    } catch (e) {
      notifyError();
      shake();
    }
  });

  useFocusEffect(
    useCallback(
      () => () => {
        signupMutation.reset();
      },
      [],
    ),
  );

  return {
    control,
    errors,
    error: signupMutation.error,
    shakeStyle: style,
    isLoading: signupMutation.isPending,
    onSignup,
    navigateToLogin: handleNavigateToLogin,
  };
}
