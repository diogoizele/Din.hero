import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useStyled } from '@shared/hooks';
import { Theme } from '@shared/theme';
import { Bill } from '@features/Bills/types/Bill';

import { BillSectionItem } from './BillSectionItem/BillSectionItem';

type BillCardGroupProps = {
  bills: Bill[];
  onPaid: (id: string, paymentDate: Date) => Promise<void> | void;
  onPress: (bill: Bill) => void;
};

export default function BillCardGroup({
  bills,
  onPaid,
  onPress,
}: BillCardGroupProps) {
  const [styles] = useStyled(createStyles);

  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.card}>
        {bills.map((bill, index) => (
          <BillSectionItem
            key={bill.id}
            {...bill}
            onPaid={onPaid}
            onPress={onPress}
            showDivider={index < bills.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    shadowWrapper: {
      marginBottom: theme.spacing(1),
      borderRadius: theme.spacing(2),
      backgroundColor: theme.colors.surface,
      ...theme.shadow.card,
    },

    card: {
      borderRadius: theme.spacing(2),
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
    },
  });
