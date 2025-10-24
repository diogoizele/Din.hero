import { Button, Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../../../hooks/useTheme';
import Icon from '../../../../components/Icon';
import { applyOpacity } from '../../../../helpers/colors';
import { NavigationProps } from '../../../../routes/RootStackNavigator';

function BillsListEmptyState() {
  const { colors } = useTheme();
  const { navigate } = useNavigation<NavigationProps>();

  return (
    <View flex paddingH-24 center gap-8>
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
        {'Nenhuma conta cadastrada \n para este mês'}
      </Text>
      <Text
        marginT-8
        text80L
        center
        color={applyOpacity(colors.textSecondary, 0.4)}>
        {'Adicione suas contas \n para acompanhar seus pagamentos'}
      </Text>
      <Button
        label="Nova Conta"
        text70M
        marginT-16
        onPress={() => navigate('RegisterBill')}
      />
    </View>
  );
}

export default BillsListEmptyState;
