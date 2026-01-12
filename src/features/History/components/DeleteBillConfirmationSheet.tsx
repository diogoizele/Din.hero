import { View, Text } from 'react-native-ui-lib';

import { Button, Icon } from '@core/components';
import { useTheme } from '@core/hooks';
import { Bill } from '@features/Bills/types';

type Props = {
  bill: Bill;
  onDelete: () => void;
  onClose: () => void;
};

export function DeleteBillConfirmationSheet({
  bill,
  onDelete,
  onClose,
}: Props) {
  const { colors } = useTheme();
  return (
    <View padding-24 paddingT-16 paddingB-32>
      <View center gap-16 marginB-24>
        <Icon name="circle-exclamation" size={48} color={colors.red30} />
        <Text center marginTop-16 textCenter text70>
          Tem certeza que deseja excluir a conta{' '}
          <Text text70BO>"{bill.description}"?</Text>
        </Text>
        <Text color={colors.textSecondary} text80>
          Esta ação não pode ser desfeita.
        </Text>
      </View>
      <View gap-8 spread marginTop-24>
        <Button
          marginB-4
          label="Sim, excluir conta"
          mode="contained"
          variant="error"
          onPress={onDelete}
        />
        <Button label="Cancelar" mode="outlined" onPress={onClose} />
      </View>
    </View>
  );
}
