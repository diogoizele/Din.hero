import { useAuthStore } from '@features/Auth';

import AppStackNavigator from './AppStackNavigator';
import PublicStackNavigator from './PublicStackNavigator';

export function AuthGate() {
  const user = useAuthStore(state => state.user);

  if (user) {
    return <AppStackNavigator />;
  }

  return <PublicStackNavigator />;
}
