export class AppError extends Error {
  constructor(
    public message: string,
    public userMessage: string,
    public code: number,
    public raw?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
    this.userMessage = userMessage;
    this.raw = raw;
  }
}
