import React from 'react';
import { Platform, SectionList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@shared/hooks/useTheme';
import FloatActionButton from '@shared/components/FloatActionButton';
import { capitalize } from '@shared/helpers/strings';
import { currencyFormat } from '@shared/helpers/currency';
import { formatSmartDate, getStateByDate } from '@shared/helpers/date';
import { NavigationProps } from '@app/navigation/RootStackNavigator';

import SimpleBillCard from './components/SimpleBillCard';
import BillsListEmptyState from './components/BillsListEmptyState';
import useHomeViewModel from './HomeViewModel';
import { styles } from './styles';

function Home() {
  const { colors } = useTheme();
  const { groupedBills, totalAmount, hasBills, markAsPaid } =
    useHomeViewModel();
  const { navigate } = useNavigation<NavigationProps>();

  return (
    <View style={styles.container} useSafeArea>
      <View paddingH-24>
        <Text
          heading
          style={{ marginTop: Platform.select({ ios: 32, android: 64 }) }}
          text45BO>
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
