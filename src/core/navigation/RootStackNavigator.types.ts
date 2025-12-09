export enum RootRoutes {
  PUBLIC = '@public',
  PRIVATE = "@app',",
}

export type RootStackParamList = {
  [RootRoutes.PUBLIC]: undefined;
  [RootRoutes.PRIVATE]: undefined;
};
