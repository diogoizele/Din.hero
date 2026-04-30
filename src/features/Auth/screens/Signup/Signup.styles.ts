import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';
import { applyOpacity } from '@shared/helpers/colors';

export const createStyles = (theme: Theme) =>
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
      paddingTop: theme.spacing(4),
      gap: theme.spacing(3),
      ...theme.shadow.card,
    },
    fields: {
      gap: theme.spacing(2),
    },
    error: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.colors.danger,
      textAlign: 'center',
      lineHeight: 18,
    },
    cta: {
      gap: theme.spacing(1.5),
    },
    signup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupText: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },
    signupLink: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.brand,
      lineHeight: 18,
    },
  });
