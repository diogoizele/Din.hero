import { StyleSheet } from 'react-native';

import { applyOpacity } from '@shared/helpers/colors';
import { Theme } from '@shared/theme';

import { SCREEN_WIDTH } from './constants/layout';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.brand,
    },
    hero: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
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
    panel: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.spacing(2),
      borderTopRightRadius: theme.spacing(2),
      paddingHorizontal: theme.spacing(3),
      paddingTop: theme.spacing(3),
      gap: theme.spacing(3),
      ...theme.shadow.card,
    },
    actions: {
      gap: theme.spacing(1.5),
    },
    terms: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: theme.spacing(1),
    },
    termsText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    termsLink: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.brand,
      lineHeight: 18,
    },
  });
