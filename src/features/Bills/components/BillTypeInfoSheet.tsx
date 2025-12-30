import { StyleSheet } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import GorhomBottomSheet from '@gorhom/bottom-sheet';

import { BottomSheet } from '@core/components/BottomSheet';
import { forwardRef } from 'react';

function InfoItem({
  title,
  description,
  examples,
  isLastItem,
}: {
  title: string;
  description: string;
  examples: string;
  isLastItem?: boolean;
}) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
      <Text style={styles.itemExample}>{examples}</Text>

      {!isLastItem && <View style={styles.divider} />}
    </View>
  );
}

export const BillTypeInfoSheet = forwardRef<GorhomBottomSheet, {}>((_, ref) => {
  return (
    <BottomSheet ref={ref}>
      <View style={styles.container}>
        <Text style={styles.title}>Tipo de conta</Text>
        <Text style={styles.subtitle}>
          Escolha como essa conta acontece ao longo do tempo.
        </Text>
        <InfoItem
          title="Única"
          description="Pagamento feito uma única vez, sem repetição."
          examples="Consulta médica, compra à vista, taxa eventual."
        />

        <InfoItem
          title="Parcelada"
          description="Valor dividido em parcelas com quantidade e valor definidos."
          examples="12x no cartão, financiamento de curto prazo."
        />

        <InfoItem
          title="Recorrente"
          description="Pagamento que se repete periodicamente, sem data final."
          examples="Aluguel, internet, luz, condomínio."
        />
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  item: {
    paddingVertical: 12,
  },

  divider: {
    marginTop: 16,
    height: 1,
    backgroundColor: Colors.grey40,
    opacity: 0.4,
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },

  itemDescription: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 2,
  },

  itemExample: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
