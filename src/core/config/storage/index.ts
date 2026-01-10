import { asyncStorage } from './asyncStorage';

export const AppStorage = {
  get: asyncStorage.get,
  set: asyncStorage.set,
};
