import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.background,
    alignItems: 'flex-start',
  },
  backButton: {
    marginTop: 16,
    padding: 8,
  },
  formContainer: {
    width: '100%',
    padding: 24,
    gap: 16,
    backgroundColor: Colors.background,
  },
});
