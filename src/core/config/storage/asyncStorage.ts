import AsyncStorage from '@react-native-async-storage/async-storage';

interface AsyncStorageSchema {
  lastRecurringBillCheck: Date | null;
}

type Keys = keyof AsyncStorageSchema;

const get = async (key: Keys): Promise<AsyncStorageSchema[Keys] | null> => {
  const item = await AsyncStorage.getItem(key);

  if (item) {
    return JSON.parse(item) as AsyncStorageSchema[Keys];
  }

  return null;
};

const set = async (
  key: Keys,
  value: AsyncStorageSchema[Keys],
): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const asyncStorage = {
  get,
  set,
};
