import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.background,
  },
  externalListContentContainer: {
    flexGrow: 1,
    gap: 32,
  },
  internalListStyle: {
    gap: 16,
    marginBottom: 16,
  },
});
