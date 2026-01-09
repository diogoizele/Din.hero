import { Colors } from 'react-native-ui-lib';
import { IconName } from '@core/components/Icon';
import { BillStatus } from '@features/Bills/types';

export const billCardUiState = {
  [BillStatus.PAID_YESTERDAY]: {
    icon: 'circle-check' as IconName,
    iconColor: Colors.green40,
    dataLabelColor: Colors.green30,
    dataLabelBackground: Colors.green80,
  },
  [BillStatus.PAID_TODAY]: {
    icon: 'circle-check' as IconName,
    iconColor: Colors.green40,
    dataLabelColor: Colors.green30,
    dataLabelBackground: Colors.green80,
  },
  [BillStatus.PAID]: {
    icon: 'circle-check' as IconName,
    iconColor: Colors.green40,
    dataLabelColor: Colors.green30,
    dataLabelBackground: Colors.green80,
  },
  [BillStatus.OVERDUE_YESTERDAY]: {
    icon: 'circle-exclamation' as IconName,
    iconColor: Colors.red40,
    dataLabelColor: Colors.red30,
    dataLabelBackground: Colors.red80,
  },
  [BillStatus.OVERDUE]: {
    icon: 'circle-exclamation' as IconName,
    iconColor: Colors.red40,
    dataLabelColor: Colors.red30,
    dataLabelBackground: Colors.red80,
  },
  [BillStatus.DUE_TODAY]: {
    icon: 'circle-exclamation' as IconName,
    iconColor: Colors.yellow20,
    dataLabelColor: Colors.yellow10,
    dataLabelBackground: Colors.yellow80,
  },
  [BillStatus.DUE_TOMORROW]: {
    icon: 'clock' as IconName,
    iconColor: Colors.grey40,
    dataLabelColor: Colors.grey30,
    dataLabelBackground: Colors.grey70,
  },
  [BillStatus.UPCOMING]: {
    icon: 'clock' as IconName,
    iconColor: Colors.grey40,
    dataLabelColor: Colors.grey30,
    dataLabelBackground: Colors.grey70,
  },
};
