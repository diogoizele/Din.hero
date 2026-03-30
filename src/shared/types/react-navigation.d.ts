import type { PublicStackParamList } from '@app/navigation/PublicStackNavigator.types';
import type { AppStackParamList } from '@app/navigation/PrivateStackNavigator.types';
import type { RootStackParamList } from '@app/navigation/RootStackNavigator.types';

type GlobalParamList = PublicStackParamList &
  AppStackParamList &
  RootStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends GlobalParamList {}
  }
}
