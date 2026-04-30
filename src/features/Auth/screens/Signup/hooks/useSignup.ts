import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';

import { PublicRoutes, PublicStackNavigationProps, useLoading } from '@app';
import { notifyError } from '@core/services';
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
  const { setIsLoading } = useLoading();
  const navigation = useNavigation<PublicStackNavigationProps>();
  const { signup, signupMutation } = useAuth();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
  });

  const handleNavigateToLogin = () => {
    navigation.navigate(PublicRoutes.AUTH, { screen: AuthRoutes.LOGIN });
  };

  return {
    control,
    errors,
    error: signupMutation.error,
    shakeStyle: style,
    onSignup: handleSubmit(data => {
      setIsLoading(true);
      signup(
        {
          email: data.email,
          password: data.password,
          name: data.name,
        },
        {
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
        },
      );
    }),
    navigateToLogin: handleNavigateToLogin,
  };
}
