import { Text, View } from 'react-native-ui-lib';

import { Button } from '@core/components';
import { useTheme } from '@core/hooks';

type Props = {
  onClose: () => void;
};

export const ActiveRecurringSheet = ({ onClose }: Props) => {
  const { colors } = useTheme();

  return (
    <View padding-16 paddingB-32 paddingT-8 gap-12>
      <Text text60BO>A regra está ativa?</Text>
      <Text text80 color={colors.textPrimary}>
        Quando uma regra recorrente está ativa, mensalmente novas contas
        <Text text80BO> serão criadas automaticamente </Text>
        com base nas configurações definidas na regra.
      </Text>
      <Text>
        Desativar a regra interrompe essa criação automática, mas as contas já
        geradas permanecem inalteradas.
      </Text>
      <Button marginT-8 label="Ok, Entendi" onPress={onClose} />
    </View>
  );
};
