import { TouchableOpacity, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { styles } from './styles';
import Icon from '../../components/Icon';
import TextField from '../../components/TextField';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.container}>
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
            type="picker"
            items={[
              { label: 'Alimentação', value: 'food' },
              { label: 'Transporte', value: 'transport' },
              { label: 'Saúde', value: 'health' },
              { label: 'Educação', value: 'education' },
              { label: 'Lazer', value: 'leisure' },
            ]}
          />

          <TextField
            control={control}
            name="frequency"
            placeholder="Frequência"
            type="picker"
            items={[
              { label: 'Mensal', value: 'monthly' },
              { label: 'Anual', value: 'yearly' },
              { label: 'Semanal', value: 'weekly' },
            ]}
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
    </SafeAreaView>
  );
}

export default RegisterBill;
