import { Text, View } from 'react-native-ui-lib';

import { Header } from '@core/components';
import { useAppDispatch, useAppSelector, useTheme } from '../../../core/hooks';
import {
  selectRecurringRules,
  selectRecurringRulesStatus,
} from '../stores/recurringRules.selectors';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { fetchRecurringRules } from '../stores/recurringRules.thunks';
import { FlatList } from 'react-native-gesture-handler';
import { useLoading } from '../../../core/providers/LoadingProvider';
import { RecurringRuleCard } from '../components/RecurringRuleCard';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function RecurringRulesListView() {
  const dispatch = useAppDispatch();
  const { shadows, borderRadiuses, colors } = useTheme();
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
      style={{ flex: 1 }}
      edges={['top', 'bottom', 'left', 'right']}>
      <Header title="Contas Recorrentes" />
      <View padding-16>
        <FlatList
          data={recurringRules}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => <RecurringRuleCard rule={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 12,
    paddingBottom: 16,
  },
});

export default RecurringRulesListView;
