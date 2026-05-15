import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';

import { StyleParams } from './Shimmer.types';

export const createStyles = (
  theme: Theme,
  params: StyleParams,
) =>
  StyleSheet.create({
    wrapper: {
      overflow: params?.isLoading ? 'hidden' : 'visible',
      borderRadius:
        typeof params.borderRadius === 'function'
          ? params.borderRadius(theme.spacing)
          : params.borderRadius,
    },

    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.skeletonBackground,
    },

    highlightContainer: {
      ...StyleSheet.absoluteFillObject,

      transform: [
        {
          skewX: '-15deg',
        },
      ],
    },

    highlight: {
      height: '100%',
      backgroundColor: theme.colors.shimmerHighlight,
    },

  });
