import { PropsWithChildren, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import {
  setUserId,
  setAttributes,
  getCrashlytics,
} from '@react-native-firebase/crashlytics';

import { useAppDispatch } from '@core/hooks';
import { Analytics } from '@core/analytics';
import { setUser } from '@features/Auth/stores/auth.slice';
import { authFirebaseToUserMapper } from '@features/Auth/services/authMapper.firebase';

import { version } from '../../../package.json';

function FirebaseListenerProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user) {
        dispatch(setUser(authFirebaseToUserMapper(user)));
        Analytics.setUserIdentity(user.uid);
      } else {
        dispatch(setUser(null));
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
