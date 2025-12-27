import type { PublicStackParamList } from '@core/navigation/PublicStackNavigator.types';
import type { AppStackParamList } from '@core/navigation/PrivateStackNavigator.types';
import type { RootStackParamList } from '@core/navigation/RootStackNavigator.types';

type GlobalParamList = PublicStackParamList &
  AppStackParamList &
  RootStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends GlobalParamList {}
  }
}
