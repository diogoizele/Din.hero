import { MIN_PASSWORD_LENGTH } from '../../config/constants/auth.constants';
import { AppError } from './AppError';
import { AppErrorKey } from './appErrorKeys';
import { FirebaseAuthErrorCode } from './firebaseErrorCodes';

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
        ? error.message
        : GENERIC_ERROR.message;

    switch (code) {
      case FirebaseAuthErrorCode.USER_NOT_FOUND:
        return new AppError(
          message,
          'Falha ao entrar.\nUsuário não encontrado.',
          404,
          AppErrorKey.AUTH_USER_NOT_FOUND,
        );
      case FirebaseAuthErrorCode.INVALID_CREDENTIAL:
        return new AppError(
          message,
          'E-mail ou senha incorretos.',
          401,
          AppErrorKey.AUTH_INVALID_CREDENTIAL,
        );
      case FirebaseAuthErrorCode.WEAK_PASSWORD:
        return new AppError(
          message,
          `Senha fraca! A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`,
          400,
          AppErrorKey.AUTH_WEAK_PASSWORD,
        );
      case FirebaseAuthErrorCode.EMAIL_ALREADY_IN_USE:
        return new AppError(
          message,
          'Já existe uma conta com este e-mail.',
          400,
          AppErrorKey.AUTH_EMAIL_ALREADY_IN_USE,
        );
      default:
        return GENERIC_ERROR;
    }
  }

  return GENERIC_ERROR;
}
