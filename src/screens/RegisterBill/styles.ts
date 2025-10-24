import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.background,
    alignItems: 'flex-start',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginTop: 16,
    padding: 8,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    padding: 24,
    gap: 20,
    backgroundColor: Colors.background,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  switchLabel: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  footerContainer: {
    width: '100%',
    padding: 24,
    justifyContent: 'flex-end',
    backgroundColor: Colors.background,
  },
});
