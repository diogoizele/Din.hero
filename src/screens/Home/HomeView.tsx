import React from 'react';
import { SectionList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../hooks/useTheme';
import FloatActionButton from '../../components/FloatActionButton';
import SimpleBillCard from './components/SimpleBillCard';
import { currencyFormat } from '../../helpers/currency';
import { capitalize } from '../../helpers/strings';
import { formatSmartDate, getStateByDate } from '../../helpers/date';
import { NavigationProps } from '../../routes/RootStackNavigator';

import { styles } from './styles';
import BillsListEmptyState from './components/BillsListEmptyState';
import useHomeViewModel from './HomeViewModel';

function Home() {
  const { colors } = useTheme();
  const { groupedBills, totalAmount, hasBills, markAsPaid } =
    useHomeViewModel();
  const { navigate } = useNavigation<NavigationProps>();

  return (
    <View style={styles.container} useSafeArea>
      <View paddingH-24>
        <Text heading marginT-64 text45BO>
          Olá, User
        </Text>
        <Text text70R marginT-8 color={colors.$textNeutral}>
          Aqui está um resumo das suas contas pendentes.
        </Text>
        <Text heading marginT-16 text40BO>
          {currencyFormat(totalAmount)}
        </Text>
      </View>
      {hasBills && (
        <View paddingH-24>
          <Text text50M marginT-36 marginB-16>
            Contas atuais
          </Text>
        </View>
      )}
      <View flex-1>
        <SectionList
          sections={Object.entries(groupedBills).map(([date, group]) => ({
            title: date,
            data: group,
          }))}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.internalListStyle}
          ListEmptyComponent={BillsListEmptyState}
          renderSectionHeader={({ section: { title } }) => (
            <View backgroundColor={colors.background} paddingB-8>
              <Text text70M marginL-8>
                {getStateByDate(title)}
                <Text text70M color={colors.$textNeutral}>
                  {capitalize(formatSmartDate(title))}
                </Text>
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <SimpleBillCard
              id={item.id}
              description={item.description}
              amount={item.amount}
              dueDate={item.dueDate}
              paid={item.paid}
              onPaid={markAsPaid}
            />
          )}
        />
      </View>
      <FloatActionButton icon="plus" onPress={() => navigate('RegisterBill')} />
    </View>
  );
}

export default Home;
