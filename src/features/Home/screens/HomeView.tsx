import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Platform, SectionList, StyleSheet } from 'react-native';
import { Colors, SkeletonView, Text, View } from 'react-native-ui-lib';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@core/hooks/useTheme';
import FloatActionButton from '@core/components/FloatActionButton';
import { capitalize } from '@core/helpers/strings';
import { currencyFormat } from '@core/helpers/currency';
import { formatSmartDate, getStateByDate } from '@core/helpers/date';
import { AppRoutes } from '@core/navigation/PrivateStackNavigator.types';
import { useAppDispatch, useAppSelector } from '@core/hooks';
import { ActivityIndicator, BottomSheet, Skeleton } from '@core/components';

import SimpleBillCard from '../components/SimpleBillCard';
import BillsListEmptyState from '../components/BillsListEmptyState';
import { BillDetailsSheet } from '../components/BillDetailsSheet';

import { useBottomSheet } from '../../../core/providers/BottomSheetProvider';
import {
  hasBillsSelector,
  selectBillDetails,
  selectFetchBillsStatus,
  selectGroupedBills,
  selectTotalAmount,
} from '../stores/home.selectors';
import { selectUser } from '../../Auth/stores/auth.selectors';
import { resetBottomSheet, selectBill } from '../stores/home.slice';
import { Bill } from '../../Bills/types';
import { fetchMonthlyBills } from '../stores/home.thunks';

function Home() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const { top } = useSafeAreaInsets();
  const billDetailsSheetRef = useBottomSheet('billDetails');

  const user = useAppSelector(selectUser);
  const bills = useAppSelector(selectGroupedBills);
  const hasBills = useAppSelector(hasBillsSelector);
  const totalAmount = useAppSelector(selectTotalAmount);
  const selectedBill = useAppSelector(selectBillDetails);
  const fetchBillsStatus = useAppSelector(selectFetchBillsStatus);

  const isLoading = fetchBillsStatus === 'loading';

  const markAsPaid = (id: string, paymentDate: Date) => {};

  const handleOpenBillDetails = (bill: Bill) => {
    billDetailsSheetRef.open(0);
    dispatch(selectBill(bill));
  };

  const handleResetBottomSheetState = (index: number) => {
    if (index === -1) {
      dispatch(resetBottomSheet());
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMonthlyBills());
    }, [dispatch]),
  );

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      billDetailsSheetRef.open(1);
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      if (selectedBill === null) return;
      billDetailsSheetRef.open(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [selectedBill]);

  return (
    <View style={styles.container} useSafeArea>
      <View paddingH-24>
        <Skeleton
          width={250}
          height={40}
          marginT-16
          showContent={user !== null}>
          <Text
            heading
            style={{
              marginTop: Platform.select({ ios: 32, android: 32 + top }),
            }}
            text45BO>
            Olá, {user?.name}
          </Text>
        </Skeleton>

        <Skeleton
          fullWidthWithPaddingOf={24}
          height={40}
          showContent={hasBills}
          marginT-8>
          <Text text70R marginT-8 color={colors.$textNeutral}>
            {hasBills
              ? 'Aqui está um resumo das suas contas pendentes.'
              : 'Você não tem contas pendentes no momento.'}
          </Text>
        </Skeleton>
        <Skeleton
          width={150}
          height={46}
          showContent={totalAmount !== 0}
          marginV-16>
          <Text heading marginV-16 text40BO color={colors.red30}>
            {currencyFormat(totalAmount * -1)}
          </Text>
        </Skeleton>
      </View>
      {hasBills && (
        <View paddingH-24>
          <Text text50M marginT-8 marginB-16>
            Contas atuais
          </Text>
        </View>
      )}
      <View flex-1>
        {isLoading && (
          <View
            style={styles.loadingContainer}
            pointerEvents={isLoading ? 'auto' : 'none'}>
            <ActivityIndicator isLoading={isLoading} />
          </View>
        )}
        <SectionList
          sections={Object.entries(bills).map(([date, group]) => ({
            title: date,
            data: group,
          }))}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.internalListStyle}
          ListEmptyComponent={() => {
            if (!isLoading) return <BillsListEmptyState />;
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View backgroundColor={colors.background} paddingB-2>
              <Text text70M marginL-8>
                {getStateByDate(title)}
                <Text text70M color={colors.$textNeutral}>
                  {capitalize(formatSmartDate(title))}
                </Text>
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <SimpleBillCard {...item} onPress={handleOpenBillDetails} />
          )}
        />
      </View>
      <FloatActionButton
        icon="plus"
        onPress={() => navigate(AppRoutes.BILLS)}
      />
      <BottomSheet
        ref={billDetailsSheetRef.ref}
        snapPoints={['65%']}
        onChange={handleResetBottomSheetState}>
        <BillDetailsSheet bill={selectedBill} />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.background,
  },

  internalListStyle: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 16,
  },

  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Home;
