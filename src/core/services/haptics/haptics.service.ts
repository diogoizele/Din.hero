import HapticFeedback from 'react-native-haptic-feedback';

const defaultOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export function notifyError() {
  HapticFeedback.trigger('notificationError', defaultOptions);
}

export function impactLight() {
  HapticFeedback.trigger('impactLight', defaultOptions);
}
