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
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        Analytics.setUserIdentity(firebaseUser.uid);
        setUser({
          ...firebaseUser,
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
        });
      } else {
        Analytics.clearUserIdentity();
        logout();
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
