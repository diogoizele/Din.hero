import { AppErrorKey } from './appErrorKeys';

export class AppError extends Error {
  constructor(
    public message: string,
    public userMessage: string,
    public code: number,
    public key?: AppErrorKey,
    public raw?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
    this.userMessage = userMessage;
    this.key = key;
    this.raw = raw;
  }
}
