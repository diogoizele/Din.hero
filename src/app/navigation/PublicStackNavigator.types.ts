import { RootRoutes } from './RootStackNavigator.types';

export enum PublicRoutes {
  LOGIN = `${RootRoutes.PUBLIC}/login`,
}

export type PublicStackParamList = {
  [PublicRoutes.LOGIN]: undefined;
};
