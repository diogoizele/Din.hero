import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../../shared/providers/ThemeProvider';
import FloatActionButton from '../../components/FloatActionButton';
import SimpleBillCard from './components/SimpleBillCard';
import useBills from '../../../shared/hooks/useBills';
import { currencyFormat } from '../../../shared/helpers/currency';
import { capitalize } from '../../../shared/helpers/strings';
import { formatSmartDate, getStateByDate } from '../../../shared/helpers/date';
import { NavigationProps } from '../../routes/RootStackNavigator';
import useApp from '../../../shared/store/AppStore';

import { styles } from './styles';
import BillsListEmptyState from './components/BillsListEmptyState';

function Home() {
  const { colors } = useTheme();
  const { totalAmount, bills, groupedBills, isLoading, deleteBill } =
    useBills();
  const { setLoading } = useApp();
  const { navigate } = useNavigation<NavigationProps>();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <View style={styles.container} useSafeArea>
      <View paddingH-24>
        <Text heading marginT-64 text40BO>
          {currencyFormat(totalAmount)}
        </Text>
        <Text subheading marginT-8 text70 color={colors.$textNeutral}>
          Total a pagar este mês
        </Text>
      </View>
      <View paddingH-24>
        <Text text50M marginT-36 marginB-16>
          Contas atuais
        </Text>
      </View>
      <View flex-1>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={groupedBills}
          contentContainerStyle={styles.externalListContentContainer}
          ListEmptyComponent={BillsListEmptyState}
          renderItem={({ item: [date, group] }) => (
            <View marginH-24 gap-8>
              <Text text70M marginL-8>
                {getStateByDate(date)}
                <Text text70BL>{capitalize(formatSmartDate(date))}</Text>
              </Text>
              <FlatList
                data={group}
                keyExtractor={item => item.id}
                style={styles.internalListStyle}
                renderItem={({ item }) => (
                  <SimpleBillCard
                    id={item.id}
                    description={item.description}
                    amount={item.amount}
                    dueDate={item.dueDate}
                    paid={item.paid}
                    onPaid={deleteBill}
                  />
                )}
              />
            </View>
          )}
          keyExtractor={([date]) => date}
        />
      </View>
      <FloatActionButton icon="plus" onPress={() => navigate('RegisterBill')} />
    </View>
  );
}

export default Home;
