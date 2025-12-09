import { useForm } from 'react-hook-form';
import { useAuth } from './useAuth';
import { Analytics } from '../../../core/analytics';

type LoginForm = {
  email: string;
  password: string;
};

type FormErrors = {
  email?: string;
  password?: string;
};

export function useLoginForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginForm>();
  const { login } = useAuth();

  const performLogin = (data: LoginForm) => {
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

  return {
    control,
    errors,
    handleSubmit: handleSubmit(performLogin),
  };
}
