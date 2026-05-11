// Home.tsx

import React, { memo, useCallback, useMemo } from 'react';
import { ListRenderItemInfo, SectionList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { AppRoutes } from '@app/navigation/AppeStackNavigator.types';

import { BottomSheet } from '@shared/components';
import { useBottomSheet } from '@app/providers/BottomSheetProvider';
import { useAppDispatch, useAppSelector, useStyled } from '@shared/hooks';
import { Text, FloatActionButton } from '@shared/ui';
import { capitalize } from '@shared/helpers/strings';
import { formatSmartDate, getStateByDate } from '@shared/helpers/date';
import { DateOnly } from '@shared/types';
import BillsListEmptyState from '@shared/components/BillsListEmptyState';

import {
  fetchMonthlyBills,
  markBillAsPaid,
} from '../../stores/home/home.thunks';

import {
  hasBillsSelector,
  selectBillDetails,
  selectFetchBillsStatus,
  selectGroupedBills,
  selectTotalAmount,
} from '../../stores/home/home.selectors';

import { resetBottomSheet, selectBill } from '../../stores/home/home.slice';

import { Bill } from '../../../Bills/types';

import { BillDetailsSheet } from '../../components/BillDetailsSheet';
import SimpleBillCard from '../../components/SimpleBillCard';
import { ListHeader } from '../../components/ListHeader';

import { createStyles } from './Home.styles';

type BillSection = {
  title: DateOnly;
  data: Bill[];
};

function Home() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [styles] = useStyled(createStyles);

  const billDetailsSheetRef = useBottomSheet('billDetails');

  const bills = useAppSelector(selectGroupedBills);
  const hasBills = useAppSelector(hasBillsSelector);
  const totalAmount = useAppSelector(selectTotalAmount);
  const selectedBill = useAppSelector(selectBillDetails);
  const fetchBillsStatus = useAppSelector(selectFetchBillsStatus);

  const isLoading = fetchBillsStatus === 'loading';

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMonthlyBills());
    }, [dispatch]),
  );

  const sections = useMemo<BillSection[]>(
    () =>
      Object.entries(bills).map(([date, group]) => ({
        title: date as DateOnly,
        data: group,
      })),
    [bills],
  );

  const handleMarkAsPaid = useCallback(
    (id: string, paymentDate: Date) => {
      dispatch(markBillAsPaid({ id, paymentDate }));
      dispatch(fetchMonthlyBills());
    },
    [dispatch],
  );

  const handleOpenBillDetails = useCallback(
    (bill: Bill) => {
      dispatch(selectBill(bill));
      billDetailsSheetRef.present();
    },
    [billDetailsSheetRef, dispatch],
  );

  const handleResetBottomSheetState = useCallback(
    (index: number) => {
      if (index === -1) {
        dispatch(resetBottomSheet());
      }
    },
    [dispatch],
  );

  const renderListHeader = useCallback(
    () => (
      <ListHeader
        sections={sections}
        hasBills={hasBills}
        totalAmount={totalAmount}
      />
    ),
    [sections, hasBills, totalAmount],
  );

  const renderSectionHeader = useCallback(
    ({ section: { title } }: { section: BillSection }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{getStateByDate(title)}</Text>

        <Text style={styles.sectionSubtitle}>
          {capitalize(formatSmartDate(title))}
        </Text>
      </View>
    ),
    [styles],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Bill>) => (
      <SimpleBillCard
        {...item}
        onPress={handleOpenBillDetails}
        onPaid={handleMarkAsPaid}
      />
    ),
    [handleMarkAsPaid, handleOpenBillDetails],
  );

  const keyExtractor = useCallback((item: Bill) => item.id, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={!isLoading ? <BillsListEmptyState /> : null}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        removeClippedSubviews
        initialNumToRender={8}
        maxToRenderPerBatch={6}
        windowSize={7}
        updateCellsBatchingPeriod={16}
      />

      <FloatActionButton
        icon="plus"
        onPress={() => navigation.navigate(AppRoutes.BILLS as never)}
      />

      <BottomSheet
        useModal
        ref={billDetailsSheetRef.ref}
        snapPoints={['65%']}
        onChange={handleResetBottomSheetState}>
        <BillDetailsSheet
          bill={selectedBill}
          onClose={billDetailsSheetRef.close}
        />
      </BottomSheet>
    </SafeAreaView>
  );
}

export default memo(Home);
