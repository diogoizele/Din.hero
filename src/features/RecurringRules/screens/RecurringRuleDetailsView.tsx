import { useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ActionCard,
  BottomSheet,
  Header,
  Icon,
  Switch,
} from '@core/components';
import { useAppDispatch, useAppSelector, useTheme } from '@core/hooks';
import {
  AppRoutes,
  AppStackNavigationProps,
  AppStackParamList,
} from '@core/navigation/PrivateStackNavigator.types';
import { currencyFormat } from '@core/helpers/currency';
import { useLoading } from '@core/providers/LoadingProvider';
import { formatDateToDayMonthYear } from '@core/helpers/date';
import { useBottomSheet } from '@core/providers/BottomSheetProvider';

import {
  selectRecurringRulesActionStatus,
  selectRuleDetails,
  selectRuleDetailsStatus,
} from '../stores/recurringRules.selectors';
import {
  deleteRecurringRule,
  fetchRuleById,
  toggleActiveStatus,
} from '../stores/recurringRules.thunks';
import { resetRecurringRulesState } from '../stores/recurringRules.slice';
import { ActiveRecurringSheet } from '../components/ActiveRecurringSheet';

type Props = {
  navigation: AppStackNavigationProps;
  route: { params: AppStackParamList[AppRoutes.RECURRING_RULE_DETAILS] };
};

const RecurringRuleDetailsView = ({ navigation, route }: Props) => {
  const { recurringRuleId } = route.params;
  const { colors } = useTheme();
  const { setIsLoading } = useLoading();
  const dispatch = useAppDispatch();

  const ruleDetails = useAppSelector(selectRuleDetails);
  const status = useAppSelector(selectRuleDetailsStatus);
  const actionStatus = useAppSelector(selectRecurringRulesActionStatus);
  const isLoading = status === 'loading';

  const deleteConfirmationSheet = useBottomSheet(
    'deleteRecurringRuleConfirmation',
  );
  const activeRecurringSheet = useBottomSheet('activeRecurringSheet');

  const handleToggleActiveStatus = (value: boolean) => {
    dispatch(toggleActiveStatus({ id: recurringRuleId, isActive: value }));
  };

  const handleConfirmDelete = () => {
    deleteConfirmationSheet.open();
  };

  const handleDelete = () => {
    dispatch(deleteRecurringRule(recurringRuleId));
    navigation.goBack();
    deleteConfirmationSheet.close();
  };

  const handleEditRule = () => {
    if (ruleDetails) {
      navigation.navigate(AppRoutes.RECURRING_RULE_EDIT, {
        recurringRule: ruleDetails,
      });
    }
  };

  const renderContent = () => {
    if (!ruleDetails) {
      return null;
    }

    return (
      <View>
        <View padding-16 gap-8>
          <Text text60BO>{ruleDetails.description}</Text>
          <Text text80M>
            Está conta vence todo dia {ruleDetails.dayOfMonth}
          </Text>
          {ruleDetails.fixedAmount && (
            <Text text80M>
              Valor fixo: {currencyFormat(ruleDetails.fixedAmount)}
            </Text>
          )}
          <View row centerV spread>
            <View row centerV>
              <Text text70M>Esta regra está ativa?</Text>
              <TouchableOpacity
                marginT-2
                padding-4
                onPress={activeRecurringSheet.open}>
                <Icon name="info" color={colors.$textNeutralLight} size={20} />
              </TouchableOpacity>
            </View>
            <Switch
              name="active"
              value={ruleDetails.active}
              onValueChange={handleToggleActiveStatus}
            />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.actions}>
          <ActionCard
            icon={{ name: 'pen', color: colors.blue40 }}
            label="Editar"
            onPress={handleEditRule}
          />
          <ActionCard
            icon={{ name: 'trash', color: colors.red30 }}
            label="Excluir"
            onPress={handleConfirmDelete}
          />
        </ScrollView>
        <View padding-16 gap-8>
          {ruleDetails.startDate && (
            <View marginB-8>
              <Text text80M>Data de início</Text>
              <Text color={colors.textSecondary}>
                {formatDateToDayMonthYear(ruleDetails.startDate)}
              </Text>
            </View>
          )}
          {ruleDetails.endDate && (
            <View marginB-8>
              <Text text80M>Data de término</Text>
              <Text color={colors.textSecondary}>
                {formatDateToDayMonthYear(ruleDetails.endDate)}
              </Text>
            </View>
          )}
          {ruleDetails.notes && (
            <View marginB-8>
              <Text text80M>Observações</Text>
              <Text color={colors.textSecondary}>{ruleDetails.notes}</Text>
            </View>
          )}

          {ruleDetails.lastGeneratedAt && (
            <Text>
              A última conta foi gerada em{' '}
              {formatDateToDayMonthYear(ruleDetails.lastGeneratedAt)}
            </Text>
          )}
        </View>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchRuleById(recurringRuleId));
    }, [recurringRuleId]),
  );

  useEffect(() => {
    setIsLoading(isLoading || actionStatus === 'loading');

    return () => setIsLoading(false);
  }, [isLoading, actionStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetRecurringRulesState());
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Header title="Detalhes da Regra" />
      <View>{renderContent()}</View>
      <BottomSheet ref={deleteConfirmationSheet.ref}>
        {ruleDetails && (
          <BottomSheet.DeleteConfirmation
            item="a recorrência"
            description={ruleDetails.description}
            deleteButtonLabel="Sim, excluir recorrência"
            onClose={deleteConfirmationSheet.close}
            onDelete={handleDelete}
          />
        )}
      </BottomSheet>
      <BottomSheet ref={activeRecurringSheet.ref}>
        <ActiveRecurringSheet onClose={activeRecurringSheet.close} />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  actions: {
    paddingLeft: 8,
  },
});

export default RecurringRuleDetailsView;
