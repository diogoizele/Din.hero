import { MIN_PASSWORD_LENGTH } from '@core/config/constants/auth.constants';

import { AppError } from './AppError';

const GENERIC_ERROR = new AppError(
  'Internal App Error',
  'Ocorreu um erro inesperado!\nTente novamente mais tarde',
  999,
);

export function parseApiError(error: unknown): AppError {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code: string }).code;
    const message =
      'message' in error && typeof error.message === 'string'
        ? error?.message
        : GENERIC_ERROR.message;

    console.log(error);
    console.log(JSON.stringify(error));

    switch (code) {
      case 'auth/user-not-found':
        return new AppError(
          message,
          'Falha ao entrar.\n Usuário não encontrado.',
          404,
        );

      case 'auth/invalid-credential': {
        return new AppError(message, 'E-mail ou senha incorretos.', 401);
      }

      case 'auth/weak-password': {
        return new AppError(
          message,
          `Senha fraca! A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`,
          400,
        );
      }

      case 'auth/email-already-in-use': {
        return new AppError(
          message,
          'Já existe uma conta com este e-mail.',
          400,
        );
      }

      default:
        return GENERIC_ERROR;
    }
  }

  return GENERIC_ERROR;
}
