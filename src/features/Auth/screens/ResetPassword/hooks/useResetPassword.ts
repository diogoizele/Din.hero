// useRecoverPassword.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { PublicStackNavigationProps } from '@app';
import { notifyError } from '@core/services';
import { useShake } from '@shared/hooks';

import { passwordResetSchema } from '../../../schemas/auth.schemas';
import { useAuth } from '../../../hooks/useAuth';

type Form = { email: string };

type UseResetPasswordParams = {
  email?: string;
};

export function useResetPassword({ email }: UseResetPasswordParams) {
  const { shake, style } = useShake();
  const navigation = useNavigation<PublicStackNavigationProps>();
  const { requestPasswordReset, requestPasswordResetMutation } = useAuth();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Form>({
    resolver: zodResolver(passwordResetSchema),
    mode: 'onSubmit',
    defaultValues: {
      email,
    },
  });

  useFocusEffect(
    useCallback(
      () => () => {
        requestPasswordResetMutation.reset();
      },
      [],
    ),
  );

  const onSubmit = handleSubmit(async formData => {
    try {
      await requestPasswordReset(formData.email);
      setValue('email', '');
    } catch {
      notifyError();
      shake();
    }
  });

  const goBackToLogin = () => {
    navigation.goBack();
  };

  return {
    control,
    errors,
    onSubmit,
    shakeStyle: style,
    error: requestPasswordResetMutation.error,
    success: requestPasswordResetMutation.isSuccess,
    isLoading: requestPasswordResetMutation.isPending,
    goBackToLogin,
  };
}
