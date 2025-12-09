import { track } from './analytics';
import { setStaticProperties } from './static';
import { clearUserIdentity, setUserIdentity } from './user';

export const Analytics = {
  track,
  setStaticProperties,
  setUserIdentity,
  clearUserIdentity,
};
