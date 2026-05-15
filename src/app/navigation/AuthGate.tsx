import { useUser } from '@features/Auth';

import AppStackNavigator from './AppStackNavigator';
import PublicStackNavigator from './PublicStackNavigator';

export function AuthGate() {
  const user = useUser();

  if (user) {
    return <AppStackNavigator />;
  }

  return <PublicStackNavigator />;
}
