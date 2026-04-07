import { PropsWithChildren, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import {
  setUserId,
  setAttributes,
  getCrashlytics,
} from '@react-native-firebase/crashlytics';

import { Analytics } from '@core/analytics';
import { useAuthStore } from '@features/Auth';

import { version } from '../../../package.json';

function FirebaseListenerProvider({ children }: PropsWithChildren) {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        setUser({
          ...user,
          email: user.email,
          id: user.uid,
          name: user.displayName,
        });
        Analytics.setUserIdentity(user.uid);
      } else {
        setUser(null);
        Analytics.clearUserIdentity();
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      Analytics.setStaticProperties();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const crashlytics = getCrashlytics();
      await Promise.all([
        setUserId(crashlytics, getAuth().currentUser?.uid || 'unknown'),
        setAttributes(crashlytics, {
          app_version: version,
          email: getAuth().currentUser?.email || 'unknown',
          name: getAuth().currentUser?.displayName || 'unknown',
        }),
      ]);
    })();
  }, []);

  return children;
}

export default FirebaseListenerProvider;
