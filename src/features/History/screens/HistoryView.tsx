import { useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

import { useAppDispatch, useAppSelector, useStyled } from '@shared/hooks';
import { BottomSheet } from '@shared/components';
import { Text } from '@shared/ui';
import { Theme } from '@shared/theme';
import { useBottomSheet } from '@app/providers/BottomSheetProvider';
import { useLoading } from '@app/providers/LoadingProvider';
import BillsListEmptyState from '@shared/components/BillsListEmptyState';

import { BillHistoryCard } from '../components/BillHistoryCard';
import { BillsSortSheet } from '../components/BillsSortSheet';
import {
  selectAllBills,
  selectFetchBillsStatus,
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

  const sortBottomSheet = useBottomSheet('historySortOptions');
  const { setIsLoading } = useLoading();
  const { bottom } = useSafeAreaInsets();
  const [styles] = useStyled(createStyles);

  const bills = useAppSelector(selectAllBills);
  const sortOption = useAppSelector(selectSortOption);
  const hasMore = useAppSelector(selectHasMoreBills);
  const fetchStatus = useAppSelector(selectFetchBillsStatus);

  const isLoading = fetchStatus === 'loading';

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
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.header}>
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
      <View style={styles.listContainer}>
        <FlatList
          data={bills}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <BillHistoryCard bill={mapBillToHistoryBill(item)} />
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    header: {
      paddingHorizontal: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },

    listContainer: {
      paddingHorizontal: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    orderByText: {
      fontSize: theme.spacing(2),
      color: theme.colors.textPrimary,
      fontWeight: '500',
    },
    orderByHighlight: {
      fontSize: theme.spacing(2),
      fontWeight: '700',
    },

    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    contentContainer: {
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(0.25),
    },
    filterButton: {
      padding: 8,
    },
  });

export default History;
