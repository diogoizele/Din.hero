import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

import { Theme } from '@shared/theme';
import { useStyled } from '@shared/hooks';
import { Text } from '@shared/ui';
import { currencyFormat } from '@shared/helpers/currency';
import { useAuthStore } from '@features/Auth';

type Props = {
  sections: {
    title: string;
    data: any[];
  }[];
  hasBills: boolean;
  totalAmount: number;
};

export const ListHeader = memo(({ sections, hasBills, totalAmount }: Props) => {
  const user = useAuthStore(state => state.user);

  const [styles, theme] = useStyled(createStyles);

  return (
    <>
      <View style={[styles.header]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>
              Olá, {user?.name?.split(' ')[0]}
            </Text>

            <Text style={styles.subtitle}>
              Gerencie suas contas com clareza.
            </Text>
          </View>

          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        entering={FadeInDown.springify().damping(18).stiffness(120)}
        style={styles.balanceCardContainer}>
        <LinearGradient
          colors={[theme.colors.brand, theme.colors.brandPressed]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceLinearContainer}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Você tem</Text>

            <Text style={styles.balanceAmount}>
              {currencyFormat(Math.abs(totalAmount))}
            </Text>

            <Text style={styles.balanceDescription}>
              {hasBills ? 'Em contas futuras' : 'Nenhuma conta pendente.'}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(80).springify().damping(18).stiffness(120)}
        style={styles.insightsContainer}>
        <View style={styles.insightCard}>
          <Text style={styles.insightLabel}>Contas</Text>

          <Text style={styles.insightValue}>
            {sections.reduce((acc, section) => acc + section.data.length, 0)}
          </Text>
        </View>

        <View style={styles.insightCard}>
          <Text style={styles.insightLabel}>Status</Text>

          <Text style={styles.insightValue}>
            {hasBills ? 'Pendente' : 'Em dia'}
          </Text>
        </View>
      </Animated.View>

      {hasBills && (
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>Contas atuais</Text>
        </View>
      )}
    </>
  );
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      paddingTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },

    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    greeting: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing(0.5),
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

    insightsContainer: {
      flexDirection: 'row',
      gap: theme.spacing(2),
      marginBottom: theme.spacing(5),
    },

    insightCard: {
      flex: 1,
      borderRadius: theme.spacing(3),
      backgroundColor: theme.colors.surface,
      padding: theme.spacing(3),

      borderWidth: 1,
      borderColor: theme.colors.borderSubtle,

      ...theme.shadow.card,
    },

    insightLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing(1),
    },

    insightValue: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },

    listHeader: {},

    listHeaderTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
  });
