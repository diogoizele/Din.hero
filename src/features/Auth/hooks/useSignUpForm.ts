import { useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../core/hooks';
import { setUser } from '../store/auth.slice';

type SignUpForm = {
  name: string;
  email: string;
  password: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export function useSignUpForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignUpForm>();

  const dispatch = useAppDispatch();

  const performSignUp = (data: SignUpForm) => {
    if (!handleValidate(data)) {
      return;
    }

    console.log('Sign up data:', data);
    dispatch(
      setUser({
        email: data.email,
        name: data.name,
        id: 'dummy-uid-for-signup',
      }),
    );
  };

  const handleValidate = (data: SignUpForm) => {
    const fieldErrors: FormErrors = {};

    if (!data.name) {
      fieldErrors.name = 'O nome é obrigatório.';
    } else if (data.name.length < 3) {
      fieldErrors.name = 'O nome deve ter pelo menos 3 caracteres.';
    }

    if (!data.email) {
      fieldErrors.email = 'O e-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      fieldErrors.email = 'Insira um e-mail válido.';
    }

    if (!data.password) {
      fieldErrors.password = 'A senha é obrigatória.';
    } else if (data.password.length < 6) {
      fieldErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    } else if (!/[A-Z]/.test(data.password)) {
      fieldErrors.password =
        'A senha deve conter ao menos uma letra maiúscula.';
    } else if (!/[0-9]/.test(data.password)) {
      fieldErrors.password = 'A senha deve conter ao menos um número.';
    }

    const errorsList = Object.entries(fieldErrors);

    errorsList.forEach(([field, message]) => {
      setError(field as keyof SignUpForm, { message });
    });

    return errorsList.length === 0;
  };

  return {
    control,
    errors,
    handleSubmit: handleSubmit(performSignUp),
  };
}
