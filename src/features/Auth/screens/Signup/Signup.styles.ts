import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';
import { applyOpacity } from '@shared/helpers/colors';

import { createCommonAuthStyles } from '../../styles/common-styles';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    ...createCommonAuthStyles(theme),
    logoBadge: {
      width: 64,
      height: 64,
      borderRadius: 16,
      backgroundColor: applyOpacity(theme.colors.white, 0.15),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: applyOpacity(theme.colors.white, 0.25),
    },
    logo: {
      width: 32,
      height: 32,
    },
  });
