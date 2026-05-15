import { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { SpacingFn } from '@shared/theme';

export type SpacingCallback = (cb: SpacingFn) => number

export type ShimmerProps = PropsWithChildren<{
  isLoading: boolean

  autoLayout?: boolean

  style?: StyleProp<ViewStyle>;

  borderRadius?: number | SpacingCallback
  width?: number | SpacingCallback
  height?: number | SpacingCallback
}>

export type StyleParams = Required<Pick<ShimmerProps, 'borderRadius'>> & { isLoading: boolean };
