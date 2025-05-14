import { TouchableOpacity, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { styles } from './styles';
import Icon from '../../components/Icon';
import TextField from '../../components/TextField';
import { Keyboard } from 'react-native';

/**
 * 
  description: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  paymentDate?: string;
  category: string;
  frequency: string;
  notes?: string;
 */

type RegisterBillForm = {
  description: string;
  amount: number;
  dueDate: string;
  category?: string;
  frequency?: string;
  notes?: string;
};

function RegisterBill() {
  const { control, handleSubmit } = useForm<RegisterBillForm>({});
  const { goBack } = useNavigation();

  const onSubmit = (data: RegisterBillForm) => {
    console.log(data);
  };

  return (
    <View style={styles.container} useSafeArea>
      <View
        style={styles.container}
        onTouchStart={Keyboard.dismiss}
        onTouchEnd={event => event?.stopPropagation()}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Icon name="arrow-left" color="transparent" />
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <TextField
            control={control}
            name="description"
            placeholder="Descrição"
          />
          <TextField
            control={control}
            name="amount"
            placeholder="Valor"
            keyboardType="numeric"
            mask="currency"
          />
          <TextField
            control={control}
            name="dueDate"
            placeholder="Data de Vencimento"
            type="date"
          />
          <TextField
            control={control}
            name="category"
            placeholder="Categoria"
          />
          <TextField
            control={control}
            name="frequency"
            placeholder="Frequência"
          />
          <TextField
            control={control}
            name="notes"
            placeholder="Notas"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>
    </View>
  );
}

export default RegisterBill;
