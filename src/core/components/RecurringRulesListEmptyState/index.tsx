import { Button, Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@core/hooks/useTheme';
import { applyOpacity } from '@core/helpers/colors';
import Icon from '@core/components/Icon';
import {
  AppRoutes,
  AppStackNavigationProps,
} from '@core/navigation/PrivateStackNavigator.types';
import { BillType } from '@features/Bills/types';

type Props = {
  isLoading?: boolean;
};

function RecurringRulesListEmptyState({ isLoading }: Props) {
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
      <Icon name="recurring" color={colors.black} size={64} opacity={0.4} />
      <Text
        marginT-16
        text60M
        center
        color={applyOpacity(colors.textPrimary, 0.6)}>
        {'Você não possui nenhuma \n regra de recorrência cadastrada'}
      </Text>
      <Text
        marginT-8
        text80
        center
        color={applyOpacity(colors.textSecondary, 0.6)}>
        {'Ao cadastrar uma conta do tipo \n "Recorrente" ela aparecerá aqui.'}
      </Text>
      <Button
        label="Cadastrar Conta"
        text70M
        marginT-16
        onPress={() =>
          navigate(AppRoutes.BILLS, { billType: BillType.RECURRING })
        }
      />
    </View>
  );
}

export default RecurringRulesListEmptyState;
