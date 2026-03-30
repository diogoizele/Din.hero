import { StyleSheet } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

export const BillRecurrentFixedAmountSheet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valor fixo na recorrência</Text>
      <Text style={styles.subtitle}>
        Quando ativado, esta conta usará sempre o mesmo valor em todos os meses.
        Você define o valor uma única vez.
      </Text>

      <View style={styles.divider} />

      <Text style={styles.title}>Quando deixar desativado</Text>
      <Text style={styles.subtitle}>
        Esta conta será criada sem valor. A cada novo período, você informa o
        valor quando a cobrança estiver disponível.
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  divider: {
    marginTop: 16,
  },
});
