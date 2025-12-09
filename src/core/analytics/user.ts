import { getAnalytics } from '@react-native-firebase/analytics';

export async function setUserIdentity(uid: string, tier?: string) {
  await getAnalytics().setUserId(uid);
  await getAnalytics().setUserProperties({
    logged_in: 'true',
    ...(tier ? { user_tier: tier } : {}),
  });
}

export async function clearUserIdentity() {
  await getAnalytics().setUserId(null);
  await getAnalytics().setUserProperties({
    logged_in: 'false',
    user_tier: null,
  });
}
