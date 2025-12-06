import { NavigationProp } from '@react-navigation/native';

export enum RootRoutes {
  PUBLIC = '@public',
  PRIVATE = "@app',",
}

export type RootStackParamList = {
  [RootRoutes.PUBLIC]: undefined;
  [RootRoutes.PRIVATE]: undefined;
};

export type NavigationProps<T extends RootStackParamList> = Omit<
  NavigationProp<T>,
  'state'
>;
