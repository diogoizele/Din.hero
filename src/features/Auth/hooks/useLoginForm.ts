import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '@core/hooks';
import { useAuth } from './useAuth';
import { resetState } from '../stores/auth.slice';

type LoginForm = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
};

export function useLoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm<LoginForm>();
  const { login } = useAuth();

  const performLogin = (data: LoginForm) => {
    setErrorMessage(null);
    if (!handleValidate(data)) {
      return;
    }

    login(data.email, data.password);
  };

  const handleValidate = (data: LoginForm) => {
    const fieldErrors: FormErrors = {};

    if (!data.email) {
      fieldErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      fieldErrors.email = 'Insira um e-mail válido.';
    }

    if (!data.password) {
      fieldErrors.password = 'A senha é obrigatória.';
    }

    const errorsList = Object.entries(fieldErrors);

    errorsList.forEach(([field, message]) => {
      setError(field as keyof LoginForm, { message });
    });

    return errorsList.length === 0;
  };

  const handleLoginError = () => {
    setErrorMessage('Falha ao entrar.\n Verifique suas credenciais.');
    setValue('email', '');
    setValue('password', '');
  };

  const handleResetState = () => {
    dispatch(resetState());
    setErrorMessage(null);
    setValue('email', '');
    setValue('password', '');
  };

  return {
    control,
    errors,
    errorMessage,
    handleSubmit: handleSubmit(performLogin),
    handleLoginError,
    handleResetState,
  };
}
