import React from 'react';
import { FlatList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

import { styles } from './styles';
import FloatActionButton from '../../components/FloatActionButton';
import { useTheme } from '../../../providers/ThemeProvider';
import SimpleBillCard from './components/SimpleBillCard';

const bills = [
  {
    id: '1',
    description: 'Conta de luz - Copel',
    amount: 230.75,
    dueDate: '2025-05-10',
    paid: false,
    paymentDate: null,
    category: 'Moradia',
    frequency: 'Monthly',
    notes: 'Varia conforme consumo',
  },
  {
    id: '2',
    description: 'Internet fibra óptica',
    amount: 119.9,
    dueDate: '2025-05-12',
    paid: true,
    paymentDate: '2025-05-01',
    category: 'Serviços',
    frequency: 'Monthly',
    notes: 'Assinatura Vivo Fibra 300mbps',
  },
  {
    id: '3',
    description: 'Cartão de crédito Nubank',
    amount: 1423.18,
    dueDate: '2025-05-15',
    paid: false,
    paymentDate: null,
    category: 'Financeiro',
    frequency: 'Monthly',
    notes: 'Compra parcelada da TV + gastos diversos',
  },
  {
    id: '4',
    description: 'Parcela 3/10 - Notebook Dell',
    amount: 489.99,
    dueDate: '2025-05-20',
    paid: false,
    paymentDate: null,
    category: 'Tecnologia',
    frequency: 'Installment',
    notes: 'Compra realizada em março via cartão',
  },
  {
    id: '5',
    description: 'Spotify Premium',
    amount: 19.9,
    dueDate: '2025-05-05',
    paid: true,
    paymentDate: '2025-05-02',
    category: 'Assinaturas',
    frequency: 'Monthly',
    notes: 'Plano familiar dividido com amigos',
  },
  {
    id: '6',
    description: 'Parcela 1/12 - Seguro do carro',
    amount: 129.5,
    dueDate: '2025-05-25',
    paid: false,
    paymentDate: null,
    category: 'Veículo',
    frequency: 'Installment',
    notes: 'Seguro Allianz, cobertura completa',
  },
  {
    id: '7',
    description: 'Curso de inglês online',
    amount: 297.0,
    dueDate: '2025-05-08',
    paid: true,
    paymentDate: '2025-05-03',
    category: 'Educação',
    frequency: 'Monthly',
    notes: 'Aulas semanais ao vivo',
  },
  {
    id: '8',
    description: 'Academia - Smart Fit',
    amount: 99.9,
    dueDate: '2025-05-01',
    paid: true,
    paymentDate: '2025-04-29',
    category: 'Saúde',
    frequency: 'Monthly',
    notes: 'Plano Black com acesso ilimitado',
  },
  {
    id: '9',
    description: 'Assinatura Netflix',
    amount: 45.9,
    dueDate: '2025-05-02',
    paid: false,
    paymentDate: null,
    category: 'Entretenimento',
    frequency: 'Monthly',
    notes: 'Plano padrão com 2 telas simultâneas',
  },
  {
    id: '10',
    description: 'Conta de água - Sanepar',
    amount: 89.99,
    dueDate: '2025-05-03',
    paid: false,
    paymentDate: null,
    category: 'Moradia',
    frequency: 'Monthly',
    notes: 'Varia conforme consumo',
  },
].sort((a, b) => {
  const dateA = new Date(a.dueDate);
  const dateB = new Date(b.dueDate);

  return dateA.getTime() - dateB.getTime();
});

function Home() {
  const { colors } = useTheme();

  return (
    <View style={styles.container} useSafeArea>
      <View paddingH-24>
        <Text heading marginT-64 text40BO>
          R$ 2.5000,00
        </Text>
        <Text subheading marginT-8 text70 color={colors.$textNeutral}>
          Total a pagar este mês
        </Text>
      </View>
      <View paddingH-24>
        <Text text50M marginT-36 marginB-8>
          Contas atuais
        </Text>
      </View>
      <View flex-1>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bills}
          renderItem={({ item }) => (
            <SimpleBillCard
              amount={item.amount}
              dueDate={item.dueDate}
              paid={item.paid}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <FloatActionButton icon="plus" />
    </View>
  );
}

export default Home;
