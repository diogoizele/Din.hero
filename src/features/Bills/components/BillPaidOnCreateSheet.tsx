import { StyleSheet } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

export const BillPaidOnCreateSheet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conta já paga</Text>

      <Text style={styles.description}>
        Ative esta opção se o pagamento já foi realizado no momento do registro.
        A conta será salva como quitada e não aparecerá como pendente.
      </Text>

      <View style={styles.divider} />

      <Text style={styles.description}>
        Quando desativada, a conta será criada como pendente, permitindo
        acompanhar o vencimento e registrar o pagamento posteriormente.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.textPrimary,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  divider: {
    marginVertical: 8,
  },
});
