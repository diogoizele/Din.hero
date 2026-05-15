import React, { memo, useCallback } from 'react';
import {
  SectionList,
  SectionListRenderItemInfo,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { AppRoutes } from '@app/navigation/AppStackNavigator.types';
import { BottomSheet } from '@shared/components';
import { useBottomSheet } from '@app/providers/BottomSheetProvider';
import { useAppDispatch, useAppSelector, useStyled } from '@shared/hooks';
import { Text, FloatActionButton, Shimmer } from '@shared/ui';
import { capitalize } from '@shared/helpers/strings';
import { formatSmartDate, getStateByDate } from '@shared/helpers/date';
import { DateOnly } from '@shared/types';
import BillsListEmptyState from '@shared/components/BillsListEmptyState';
import { Bill } from '@features/Bills/types';

import {
  fetchMonthlyBills,
  markBillAsPaid,
} from '../../stores/home/home.thunks';
import { selectBillDetails } from '../../stores/home/home.selectors';
import { resetBottomSheet, selectBill } from '../../stores/home/home.slice';
import { BillDetailsSheet } from '../../components/BillDetailsSheet';
import BillCardGroup from '../../components/BillCardGroup';
import { ListHeader } from '../../components/ListHeader/ListHeader';
import { use30DaysSectionBills } from '../../hooks/use30DaysSectionBills';
import { createStyles } from './Home.styles';
import { SectionLoadingShimmer } from '../../components/SectionLoadingShimmers';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../../Auth';

type BillSection = {
  title: DateOnly;
  data: Array<Bill[]>;
};

function Home() {
  const user = useUser();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [styles] = useStyled(createStyles);
  const billDetailsSheetRef = useBottomSheet('billDetails');
  const selectedBill = useAppSelector(selectBillDetails);
  const { data = [], isFetching } = use30DaysSectionBills();
  const queryClient = useQueryClient();

  const handleMarkAsPaid = useCallback(
    (id: string, paymentDate: Date) => {
      dispatch(markBillAsPaid({ id, paymentDate }));
      queryClient.invalidateQueries({
        queryKey: ['upcoming-bills-in-30-days', user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['home/summary', user?.id],
      });
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

  const renderListHeader = useCallback(() => <ListHeader />, []);

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
    ({ item }: SectionListRenderItemInfo<Bill[], BillSection>) => {
      return (
        <BillCardGroup
          bills={item}
          onPress={handleOpenBillDetails}
          onPaid={handleMarkAsPaid}
        />
      );
    },
    [handleMarkAsPaid, handleOpenBillDetails],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionList
        sections={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={
          !isFetching ? <BillsListEmptyState /> : <SectionLoadingShimmer />
        }
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

const keyExtractor = (item: Bill[]) => item.map(b => b.id).join('-');

export default memo(Home);
