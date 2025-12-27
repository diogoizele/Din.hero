import React from 'react';
import { Platform, SectionList } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@core/hooks/useTheme';
import FloatActionButton from '@core/components/FloatActionButton';
import { capitalize } from '@core/helpers/strings';
import { currencyFormat } from '@core/helpers/currency';
import { formatSmartDate, getStateByDate } from '@core/helpers/date';
import { AppRoutes } from '@core/navigation/PrivateStackNavigator.types';
import { useAppSelector } from '@core/hooks';

import SimpleBillCard from '../components/SimpleBillCard';
import BillsListEmptyState from '../components/BillsListEmptyState';
import useHomeViewModel from '../HomeViewModel';
import { styles } from '../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Home() {
  const { colors } = useTheme();
  const { groupedBills, totalAmount, hasBills, markAsPaid } =
    useHomeViewModel();
  const user = useAppSelector(state => state.auth.user);
  const { navigate } = useNavigation();
  const { top } = useSafeAreaInsets();

  const isPaid = (dueDate: string) => {
    const today = new Date();
    const billDate = new Date(dueDate);
    return billDate < today;
  };

  return (
    <View style={styles.container} useSafeArea>
      <View paddingH-24>
        <Text
          heading
          style={{
            marginTop: Platform.select({ ios: 32, android: 32 + top }),
          }}
          text45BO>
          Olá, {user?.name}
        </Text>
        <Text text70R marginT-8 color={colors.$textNeutral}>
          {hasBills
            ? 'Aqui está um resumo das suas contas pendentes.'
            : 'Você não tem contas pendentes no momento.'}
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
              paid={isPaid(item.dueDate)}
              onPaid={markAsPaid}
            />
          )}
        />
      </View>
      <FloatActionButton
        icon="plus"
        onPress={() => navigate(AppRoutes.BILLS)}
      />
    </View>
  );
}

export default Home;
