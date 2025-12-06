import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.background,
  },

  internalListStyle: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 16,
  },
});
