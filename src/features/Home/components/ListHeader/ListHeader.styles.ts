import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'red',
    },
    header: {
      paddingTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },

    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    greetingShimmer: {
      marginBottom: theme.spacing(0.5),
    },

    greeting: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },

    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.textSecondary,
    },

    avatar: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: theme.colors.brandSubtle,
      alignItems: 'center',
      justifyContent: 'center',
    },

    avatarText: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.brand,
    },

    scoreContainer: {
      marginBottom: theme.spacing(3),
      gap: theme.spacing(1),
    },

    balanceCardContainer: {
      marginBottom: theme.spacing(3),
    },
    balanceLinearContainer: {
      borderRadius: theme.spacing(4),
    },
    balanceCard: {
      padding: theme.spacing(4),
      justifyContent: 'space-between',

      shadowColor: '#1A2340',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.18,
      shadowRadius: 18,
      elevation: 10,
    },

    balanceLabel: {
      fontSize: 15,
      color: theme.colors.white,
      opacity: 0.9,
    },

    balanceAmount: {
      fontSize: 40,
      fontWeight: '800',
      color: theme.colors.white,
      marginVertical: theme.spacing(2),
    },

    balanceDescription: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.colors.white,
      opacity: 0.9,
    },

    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1),
    },

    progressTextHighlight: {
      fontWeight: '600',
    },

    listHeader: {
      marginTop: theme.spacing(4),
    },

    listHeaderTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
  });
