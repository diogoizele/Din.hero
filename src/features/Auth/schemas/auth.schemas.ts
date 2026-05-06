import { z } from 'zod';
import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../core/config/constants/auth.constants';

const usernameSchema = z
  .string({ error: 'O nome de usuário é obrigatório' })
  .min(
    MIN_NAME_LENGTH,
    `O nome de usuário deve ter pelo menos ${MIN_NAME_LENGTH} caracteres`,
  )
  .max(
    MAX_NAME_LENGTH,
    `O nome de usuário não pode ter mais de ${MAX_NAME_LENGTH} caracteres`,
  );

const emailSchema = z.email('Por favor, insira um e-mail válido');

const passwordSchema = z
  .string({ error: 'A senha é obrigatória' })
  .min(
    MIN_PASSWORD_LENGTH,
    `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`,
  );

const baseAuthSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = baseAuthSchema;

export const signupSchema = baseAuthSchema.extend({
  name: usernameSchema,
});

export const passwordResetSchema = z.object({
  email: emailSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
