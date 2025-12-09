import {
  getAnalytics,
  setUserId,
  setUserProperties,
} from '@react-native-firebase/analytics';

export async function setUserIdentity(uid: string, tier?: string) {
  await setUserId(getAnalytics(), uid);
  await setUserProperties(getAnalytics(), {
    logged_in: 'true',
    ...(tier ? { user_tier: tier } : {}),
  });
}

export async function clearUserIdentity() {
  await setUserId(getAnalytics(), null);
  await setUserProperties(getAnalytics(), {
    logged_in: 'false',
    user_tier: null,
  });
}
