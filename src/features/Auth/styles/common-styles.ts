import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';

export const createCommonAuthStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.brand,
    },
    keyboardAvoid: {
      flex: 1,
    },

    // ── Hero
    hero: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing(3),
      gap: theme.spacing(3),
    },

    heroText: {
      alignItems: 'center',
      gap: theme.spacing(1.5),
    },
    headline: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 36,
      color: theme.colors.white,
      textAlign: 'center',
      letterSpacing: -0.5,
    },

    // ── Panel
    panel: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.spacing(2),
      borderTopRightRadius: theme.spacing(2),
      paddingHorizontal: theme.spacing(3),
      paddingTop: theme.spacing(3),
      gap: theme.spacing(3),
      ...theme.shadow.card,
    },
    fields: {
      gap: theme.spacing(1.5),
    },
    cta: {
      gap: theme.spacing(1.5),
    },
    external: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    externalText: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    externalLink: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.brand,
      lineHeight: 18,
    },
  });
