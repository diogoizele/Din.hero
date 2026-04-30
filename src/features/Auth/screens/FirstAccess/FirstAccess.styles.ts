import { StyleSheet } from 'react-native';

import { applyOpacity } from '@shared/helpers/colors';
import { Theme } from '@shared/theme';

import { SCREEN_WIDTH } from './constants/layout';
import { createCommonAuthStyles } from '../../styles/common-styles';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    ...createCommonAuthStyles(theme),
    logoBadge: {
      width: 112,
      height: 112,
      borderRadius: 28,
      backgroundColor: applyOpacity(theme.colors.white, 0.15),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing(4),
      borderWidth: 1,
      borderColor: applyOpacity(theme.colors.white, 0.25),
    },
    logo: {
      width: 64,
      height: 64,
    },
    carousel: {
      flexGrow: 0,
      width: SCREEN_WIDTH,
    },
    dotsRow: {
      flexDirection: 'row',
      gap: theme.spacing(0.75),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing(3),
    },
  });
