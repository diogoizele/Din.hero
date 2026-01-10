import { useCallback, useEffect } from 'react';
import { SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import Header from '@core/components/Header';
import { useAppDispatch, useAppSelector, useTheme } from '@core/hooks';
import { formatFullDatePtBR } from '@core/helpers/date';
import { capitalize } from '@core/helpers/strings';
import { BottomSheet, Icon } from '@core/components';
import { useBottomSheet } from '@core/providers/BottomSheetProvider';
import { useLoading } from '@core/providers/LoadingProvider';
import BillsListEmptyState from '@core/components/BillsListEmptyState';

import { BillHistoryCard } from '../components/BillHistoryCard';
import { BillsSortSheet } from '../components/BillsSortSheet';
import {
  selectFetchBillsStatus,
  selectGroupedBills,
  selectHasMoreBills,
  selectSortOption,
} from '../stores/history/history.selectors';
import { fetchNextBillsPage } from '../stores/history/history.thunks';
import { resetBills, setSortOption } from '../stores/history/history.slice';
import { SortOption } from '../stores/history/history.types';
import { mapBillToHistoryBill } from '../mappers/mapBillToHistoryBill';

const sortOptionsLabels: Record<SortOption, string> = {
  [SortOption.CREATED_AT]: 'Data de criação',
  [SortOption.PAID_AT]: 'Data de pagamento',
  [SortOption.DUE_DATE]: 'Data de vencimento',
};

function History() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const sortBottomSheet = useBottomSheet('historySortOptions');
  const { setIsLoading } = useLoading();
  const { bottom } = useSafeAreaInsets();

  const groupedBills = useAppSelector(selectGroupedBills);
  const sortOption = useAppSelector(selectSortOption);
  const hasMore = useAppSelector(selectHasMoreBills);
  const fetchStatus = useAppSelector(selectFetchBillsStatus);

  const isLoading = fetchStatus === 'loading';

  const billsMappedToSections = Object.entries(groupedBills).map(
    ([date, bills]) => ({ title: date, data: bills.map(mapBillToHistoryBill) }),
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchNextBillsPage());
    }
  };

  const handleOpenSortOptions = () => {
    sortBottomSheet.present();
  };

  const handleCancelSortOptions = () => {
    sortBottomSheet.close();
  };

  const handleConfirmSortOptions = (sort: SortOption) => {
    dispatch(resetBills());
    dispatch(setSortOption(sort));
    dispatch(fetchNextBillsPage());
    sortBottomSheet.close();
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Chamei 2x');
      dispatch(fetchNextBillsPage());
    }, [dispatch]),
  );

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    return () => {
      dispatch(resetBills());
    };
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <Header
        title="Histórico"
        rightComponent={
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter" color={Colors.textPrimary} size={20} />
          </TouchableOpacity>
        }
      />
      <View paddingH-24 marginT-16>
        {!isLoading && (
          <TouchableOpacity onPress={handleOpenSortOptions}>
            <Text style={styles.orderByText}>
              Ordenar por:{' '}
              <Text style={styles.orderByHighlight}>
                {sortOptionsLabels[sortOption]}
              </Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View paddingH-16 paddingV-16>
        <SectionList
          sections={billsMappedToSections}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <BillHistoryCard bill={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View backgroundColor={colors.background} paddingB-2>
              <Text text70M marginL-8 marginV-4>
                <Text text70M color={colors.$textNeutral}>
                  {capitalize(formatFullDatePtBR(title))}
                </Text>
              </Text>
            </View>
          )}
          contentContainerStyle={styles.contentContainer}
          style={{ marginBottom: bottom }}
          ListEmptyComponent={<BillsListEmptyState isLoading={isLoading} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomSheet ref={sortBottomSheet.ref}>
        <BillsSortSheet
          initialValue={sortOption}
          onCancel={handleCancelSortOptions}
          onConfirm={handleConfirmSortOptions}
        />
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  orderByText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  orderByHighlight: {
    fontWeight: '700',
  },

  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  filterButton: {
    padding: 8,
  },
});

export default History;
