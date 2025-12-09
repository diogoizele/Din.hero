import { RootRoutes } from './RootStackNavigator.types';

export enum PrivateRoutes {
  HOME = `${RootRoutes.PRIVATE}/home`,
  BILLS = `${RootRoutes.PRIVATE}/bills`,
  HISTORY = `${RootRoutes.PRIVATE}/history`,
}

export type PrivateStackParamList = {
  [PrivateRoutes.HOME]: undefined;
  [PrivateRoutes.BILLS]: undefined;
  [PrivateRoutes.HISTORY]: undefined;
};
