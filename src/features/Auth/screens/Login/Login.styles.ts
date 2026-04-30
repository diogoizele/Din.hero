import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';
import { applyOpacity } from '@shared/helpers/colors';

import { createCommonAuthStyles } from '../../styles/common-styles';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    ...createCommonAuthStyles(theme),
    logoBadge: {
      width: 96,
      height: 96,
      borderRadius: 28,
      backgroundColor: applyOpacity(theme.colors.white, 0.15),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: applyOpacity(theme.colors.white, 0.25),
    },
    logo: {
      width: 52,
      height: 52,
    },
    subline: {
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 22,
      color: applyOpacity(theme.colors.white, 0.72),
      textAlign: 'center',
    },
  });
