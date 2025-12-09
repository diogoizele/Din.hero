export const AnalyticsEvents = {
  FIRST_ACCESS_GO_TO_LOGIN: 'first_access_go_to_login',
  FIRST_ACCESS_GO_TO_SIGNUP: 'first_access_go_to_signup',
  LOGIN_SUBMIT: 'login_submit',
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  SIGNUP_SUBMIT: 'signup_submit',
  SIGNUP_SUCCESS: 'signup_success',
  SIGNUP_FAILURE: 'signup_failure',
} as const;

export type AnalyticsEventName = keyof typeof AnalyticsEvents;

export type AnalyticsEventParams = {
  FIRST_ACCESS_GO_TO_LOGIN: {};
  FIRST_ACCESS_GO_TO_SIGNUP: {};
  LOGIN_SUBMIT: {
    method: string;
  };
  LOGIN_SUCCESS: {
    userId: string;
  };
  LOGIN_FAILURE: {
    method: string;
    error: unknown;
  };
  SIGNUP_SUBMIT: {
    method: string;
  };
  SIGNUP_SUCCESS: {
    userId: string;
  };
  SIGNUP_FAILURE: {
    method: string;
    error: unknown;
  };
};
