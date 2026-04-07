import { AppError } from './AppError';

const GENERIC_ERROR = new AppError(
  'Internal App Error',
  'Ocorreu um erro inesperado! Tente novamente mais tarde',
  999,
);

export function parseApiError(error: unknown): AppError {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code: string }).code;
    const message =
      'message' in error && typeof error.message === 'string'
        ? error?.message
        : GENERIC_ERROR.message;

    console.log({ code });

    switch (code) {
      case 'auth/user-not-found':
        return new AppError(
          message,
          'Falha ao entrar.\n Usuário não encontrado.',
          404,
        );

      case 'auth/invalid-credential': {
        return new AppError(
          message,
          'Falha ao entrar.\n Verifique suas credenciais.',
          401,
        );
      }
      default:
        return GENERIC_ERROR;
    }
  }

  return GENERIC_ERROR;
}
