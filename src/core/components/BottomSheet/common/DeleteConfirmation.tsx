import { View, Text } from 'react-native-ui-lib';

import { Button, Icon } from '@core/components';
import { useTheme } from '@core/hooks';

type Props = {
  item: string;
  description: string;
  deleteButtonLabel?: string;
  onDelete: () => void;
  onClose: () => void;
};

export function DeleteConfirmation({
  item,
  description,
  deleteButtonLabel = 'Sim, excluir',
  onDelete,
  onClose,
}: Props) {
  const { colors } = useTheme();
  return (
    <View padding-24 paddingT-16 paddingB-32>
      <View center gap-16 marginB-24>
        <Icon name="circle-exclamation" size={48} color={colors.red20} />
        <Text center marginTop-16 textCenter text70>
          Tem certeza que deseja excluir {item}{' '}
          <Text text70BO>"{description}"?</Text>
        </Text>
        <Text color={colors.textSecondary} text80>
          Esta ação não pode ser desfeita.
        </Text>
      </View>
      <View gap-8 spread marginTop-24>
        <Button
          marginB-4
          label={deleteButtonLabel}
          mode="contained"
          variant="error"
          onPress={onDelete}
        />
        <Button label="Cancelar" mode="outlined" onPress={onClose} />
      </View>
    </View>
  );
}
