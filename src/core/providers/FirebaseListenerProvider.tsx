import { PropsWithChildren, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

import { useAppDispatch } from '@core/hooks';
import { Analytics } from '@core/analytics';
import { setUser } from '@features/Auth/stores/auth.slice';
import { authFirebaseToUserMapper } from '@features/Auth/services/authMapper.firebase';

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

  return children;
}

export default FirebaseListenerProvider;
