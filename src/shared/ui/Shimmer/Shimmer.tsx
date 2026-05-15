import React, { memo, useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';

import { useStyled } from '@shared/hooks';
import { SpacingFn } from '@shared/theme';

import { useAnimations } from './useAnimations';

import { ShimmerProps, SpacingCallback } from './Shimmer.types';
import { createStyles } from './Shimmer.styles';

const dimensionResolver = (
  dimension: number | SpacingCallback | undefined,
  spacing: SpacingFn,
) => (typeof dimension === 'function' ? dimension(spacing) : dimension);

const ShimmerComponent = ({
  isLoading,
  children,
  borderRadius = 0,
  style,
  autoLayout = true,
  height,
  width,
}: ShimmerProps) => {
  const [styles, theme] = useStyled(t =>
    createStyles(t, {
      borderRadius,
      isLoading,
    }),
  );

  const [containerWidth, setContainerWidth] = useState(0);

  const resolvedWidth = autoLayout
    ? containerWidth
    : dimensionResolver(width, theme.spacing) ?? 0;

  const ready = resolvedWidth > 0;

  const staticContainerHeight = isLoading
    ? dimensionResolver(height, theme.spacing)
    : 'auto';

  const staticContainerWidth = isLoading
    ? dimensionResolver(width, theme.spacing)
    : 'auto';

  const { contentStyle, overlayStyle, sweepStyle, highlightWidth } =
    useAnimations(isLoading, resolvedWidth);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const elementWidth = e.nativeEvent.layout.width;

      if (elementWidth !== resolvedWidth) {
        setContainerWidth(elementWidth);
      }
    },
    [containerWidth],
  );

  if (__DEV__) {
    if (!autoLayout && (!width || !height)) {
      console.warn(
        '[Shimmer]: width and height are required when autoLayout is false.',
      );
    }
  }

  return (
    <Animated.View
      onLayout={autoLayout ? handleLayout : undefined}
      style={[
        styles.wrapper,
        {
          width: staticContainerWidth,
          height: staticContainerHeight,
        },
        style,
      ]}>
      <Animated.View style={contentStyle}>{children}</Animated.View>

      {isLoading && (
        <Animated.View
          pointerEvents="none"
          style={[styles.overlay, overlayStyle]}>
          {ready && (
            <Animated.View
              renderToHardwareTextureAndroid
              shouldRasterizeIOS
              style={[styles.highlightContainer]}>
              <Animated.View
                style={[
                  styles.highlight,
                  {
                    width: highlightWidth,
                  },
                  sweepStyle,
                ]}
              />
            </Animated.View>
          )}
        </Animated.View>
      )}
    </Animated.View>
  );
};

export const Shimmer = memo(ShimmerComponent);

export default Shimmer;
