// Home.styles.ts

import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    content: {
      paddingBottom: theme.spacing(12),
      paddingHorizontal: theme.spacing(3),
    },

    sectionHeader: {
      paddingHorizontal: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(1.5),
      backgroundColor: theme.colors.background,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing(0.25),
    },

    sectionSubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
  });
