export const FirebaseAuthErrorCode = {
  USER_NOT_FOUND: 'auth/user-not-found',
  INVALID_CREDENTIAL: 'auth/invalid-credential',
  WEAK_PASSWORD: 'auth/weak-password',
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
} as const;

export type FirebaseAuthErrorCodeValue =
  (typeof FirebaseAuthErrorCode)[keyof typeof FirebaseAuthErrorCode];
