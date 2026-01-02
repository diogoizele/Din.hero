import { PropsWithChildren } from 'react';
import { SkeletonView } from 'react-native-ui-lib';

import { useTheme } from '@core/hooks';
import {
  AlignmentModifiers,
  MarginModifiers,
  PaddingModifiers,
} from 'react-native-ui-lib/src/commons/modifiers';
import { useWindowDimensions } from 'react-native';
import { Template } from 'react-native-ui-lib/src/components/skeletonView';

type Props = PropsWithChildren<{
  showContent: boolean;
  width?: number;
  height: number;
  /**
   * If provided, the skeleton will take the full width of the screen minus
   * the specified padding on both sides.
   */
  fullWidthWithPaddingOf?: number;
  template?: Template | 'listItem' | 'content';
  borderRadius?: number;
}> &
  AlignmentModifiers &
  PaddingModifiers &
  MarginModifiers;

export function Skeleton({
  children,
  height,
  width,
  showContent,
  fullWidthWithPaddingOf,

  ...modifiers
}: Props) {
  const { colors } = useTheme();
  const { width: windowWidth } = useWindowDimensions();

  return (
    <SkeletonView
      {...modifiers}
      width={
        fullWidthWithPaddingOf
          ? windowWidth - fullWidthWithPaddingOf * 2
          : width
      }
      height={height}
      colors={[colors.shimmerBase, colors.shimmerHighlight]}
      showContent={showContent}
      renderContent={() => <>{children}</>}
    />
  );
}
