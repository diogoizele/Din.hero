import { getAnalytics } from '@react-native-firebase/analytics';
import DeviceInfo from 'react-native-device-info';

export async function setStaticProperties() {
  const version = DeviceInfo.getVersion();
  const build = DeviceInfo.getBuildNumber();
  const platform = DeviceInfo.getSystemName();
  const location = DeviceInfo.getAvailableLocationProvidersSync();
  const batteryLevel = DeviceInfo.getBatteryLevelSync();

  await getAnalytics().setUserProperties({
    app_version: version,
    build_number: build,
    platform,
    device_location: JSON.stringify(location),
    battery_level: `${Math.round(batteryLevel * 100)}%`,
  });
}
