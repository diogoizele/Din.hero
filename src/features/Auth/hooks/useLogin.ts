import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { useLoading, PublicRoutes, PublicStackNavigationProps } from '@app';

import { useAuth } from './useAuth';

type LoginForm = {
  email: string;
  password: string;
};

export function useLogin() {
  const { setIsLoading } = useLoading();
  const navigation = useNavigation<PublicStackNavigationProps>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<LoginForm>({ mode: 'onChange' });

  const { login, loginMutation } = useAuth();

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
    disableSubmit: !isValid,
    error: loginMutation.error,
    onLogin: handleSubmit(data =>
      login(data, {
        onSettled: () => {
          setValue('email', '');
          setValue('password', '');
        },
      }),
    ),
    navigateToSignup: handleNavigateToSignup,
  };
}
