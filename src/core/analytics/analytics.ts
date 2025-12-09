import { getAnalytics, logEvent } from '@react-native-firebase/analytics';
import { AnalyticsEventParams, AnalyticsEvents } from './events';

type EventKey = keyof typeof AnalyticsEvents;

export async function track<K extends EventKey>(
  event: K,
  params?: AnalyticsEventParams[K],
) {
  const eventName = AnalyticsEvents[event];

  await logEvent(getAnalytics(), eventName, params);
}
