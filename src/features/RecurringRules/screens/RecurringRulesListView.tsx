import { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native-ui-lib';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import { Header, RecurringRulesListEmptyState } from '@core/components';
import { useAppDispatch, useAppSelector } from '@core/hooks';
import { useLoading } from '@core/providers/LoadingProvider';
import {
  selectRecurringRules,
  selectRecurringRulesStatus,
} from '../stores/recurringRules.selectors';
import { fetchRecurringRules } from '../stores/recurringRules.thunks';
import { RecurringRuleCard } from '../components/RecurringRuleCard';

function RecurringRulesListView() {
  const dispatch = useAppDispatch();
  const { setIsLoading } = useLoading();
  const recurringRules = useAppSelector(selectRecurringRules);
  const status = useAppSelector(selectRecurringRulesStatus);
  const isLoading = status === 'loading';

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchRecurringRules());
    }, []),
  );

  useEffect(() => {
    setIsLoading(isLoading);

    return () => {
      setIsLoading(false);
    };
  }, [isLoading]);

  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
      edges={['top', 'bottom', 'left', 'right']}>
      <Header title="Contas Recorrentes" />
      <View padding-16 paddingH-12>
        <FlatList
          data={recurringRules}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => <RecurringRuleCard rule={item} />}
          ListEmptyComponent={RecurringRulesListEmptyState}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  contentContainer: {
    gap: 12,
    paddingBottom: 16,
  },
});

export default RecurringRulesListView;
