import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useStyled } from '@shared/hooks';
import { Text, Icon, Button } from '@shared/ui';
import { applyOpacity } from '@shared/helpers/colors';

import {
  AppRoutes,
  AppStackNavigationProps,
} from '@app/navigation/AppStackNavigator.types';
import { Theme } from '../../theme';

type Props = {
  isLoading?: boolean;
};

function BillsListEmptyState({ isLoading }: Props) {
  const [styles, theme] = useStyled(createStyles);
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const { height } = useWindowDimensions();
  const { bottom, top } = useSafeAreaInsets();
  const viewHeight = height * 0.5 - (top + bottom);

  if (isLoading) {
    return null;
  }

  return (
    <View style={[styles.container, { height: viewHeight }]}>
      <Icon
        name="calendar"
        color={applyOpacity(theme.colors.brand, 0.2)}
        size={64}
      />
      <Text
        style={styles.centralize}
        color={applyOpacity(theme.colors.textPrimary, 0.6)}>
        {'Nenhuma conta pendente\npara os próximos dias'}
      </Text>
      <Text
        style={styles.centralize}
        color={applyOpacity(theme.colors.textSecondary, 0.6)}>
        {'Adicione suas contas para começar\na organizar suas finanças.'}
      </Text>
      <View style={styles.actionContainer}>
        <Button label="Nova Conta" onPress={() => navigate(AppRoutes.BILLS)} />
      </View>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(1.5),
    },
    centralize: {
      textAlign: 'center',
    },
    actionContainer: {
      marginTop: theme.spacing(2),
    },
  });

export default BillsListEmptyState;
