import { Text, View } from 'react-native-ui-lib';
import { Button } from '@core/components';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmExitSheet = ({ onConfirm, onCancel }: Props) => {
  return (
    <View padding-24 paddingT-8 gap-8>
      <Text text65BO>Tem certeza que deseja sair?</Text>
      <Text text80>Ao sair, você terá que fazer login novamente</Text>
      <View marginT-8>
        <Button label="Sim, desejo sair" onPress={onConfirm} marginB-12 />
        <Button label="Cancelar" onPress={onCancel} mode="outlined" marginB-8 />
      </View>
    </View>
  );
};
