import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';

import { PublicRoutes, PublicStackNavigationProps, useLoading } from '@app';
import { notifyError } from '@core/services';
import { useShake } from '@shared/hooks';

import { useAuth } from '../../../hooks/useAuth';
import { AuthRoutes } from '../../../navigation/AuthNavigator.types';
import { loginSchema } from '../../../schemas/auth.schemas';

type LoginForm = {
  email: string;
  password: string;
};

export function useLogin() {
  const { shake, style } = useShake();
  const { setIsLoading } = useLoading();
  const navigation = useNavigation<PublicStackNavigationProps>();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });

  const { login, loginMutation } = useAuth();

  const handleNavigateToSignup = () => {
    setValue('email', '');
    setValue('password', '');
    navigation.navigate(PublicRoutes.AUTH, { screen: AuthRoutes.SIGNUP });
  };

  return {
    control,
    error: loginMutation.error,
    errors,
    shakeStyle: style,
    onLogin: handleSubmit(data => {
      setIsLoading(true);
      login(data, {
        onSuccess: () => {
          setValue('email', '');
          setValue('password', '');
          setIsLoading(false);
        },
        onError: () => {
          notifyError();
          shake();
          setIsLoading(false);
        },
      });
    }),
    navigateToSignup: handleNavigateToSignup,
  };
}
