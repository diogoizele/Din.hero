import { StyleSheet } from 'react-native';
import { BorderRadiuses, Colors } from 'react-native-ui-lib';

export const styles = StyleSheet.create({
  textField: {
    backgroundColor: Colors.$backgroundNeutralLight,
    borderColor: Colors.$backgroundNeutralLight,
    borderWidth: 1,
    borderRadius: BorderRadiuses.br20,
  },
  placeholder: {
    position: 'absolute',
    left: 12,
    paddingHorizontal: 4,
    borderRadius: BorderRadiuses.br100,
  },
  field: {
    fontSize: 16,
    zIndex: 0,
    height: '100%',
    paddingHorizontal: 16,
  },
  prefix: {
    color: Colors.primary,
    position: 'absolute',
    left: 16,
    fontSize: 13,
  },
  closeIconPressable: {
    position: 'absolute',
    padding: 12,
    right: 0,
  },
  pickerTextContainer: {
    height: '100%',
    top: 0,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
  },
  pickerTextValue: {
    fontSize: 16,
    paddingHorizontal: 16,
    zIndex: -1,
  },
});
