import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@shared/hooks/useTheme';
import { applyOpacity } from '@shared/helpers/colors';
import Icon from '@shared/components/Icon';
import {
  AppRoutes,
  AppStackNavigationProps,
} from '@app/navigation/PrivateStackNavigator.types';

type Props = {
  isLoading?: boolean;
};

function BillsListEmptyState({ isLoading }: Props) {
  const { colors } = useTheme();
  const { navigate } = useNavigation<AppStackNavigationProps>();
  const { height } = useWindowDimensions();
  const { bottom, top } = useSafeAreaInsets();
  const viewHeight = height - (top + bottom + 200);

  if (isLoading) {
    return null;
  }

  return (
    <View height={viewHeight} paddingH-24 center gap-8>
      <Icon
        name="calendar"
        color={applyOpacity(colors.primary, 0.2)}
        size={64}
      />
      <Text
        marginT-16
        text60M
        center
        color={applyOpacity(colors.textPrimary, 0.6)}>
        {'Nenhuma conta pendente \n para os próximos dias'}
      </Text>
      <Text
        marginT-8
        text80
        center
        color={applyOpacity(colors.textSecondary, 0.6)}>
        {'Adicione suas contas para começar \n  a organizar suas finanças.'}
      </Text>
      <Button
        label="Nova Conta"
        text70M
        marginT-16
        onPress={() => navigate(AppRoutes.BILLS)}
      />
    </View>
  );
}

export default BillsListEmptyState;
