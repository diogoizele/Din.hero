import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme/new_tokens';
import { createFieldBaseStyles } from '../FieldBase.styles';

export const createStyles = (theme: Theme) => StyleSheet.create({
  ...createFieldBaseStyles(theme),
  field: {
    paddingVertical: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(1.5),
  },
  fieldDisabled: {
    color: theme.colors.textDisabled,
  },
  eyeIconTouchable: {
    position: 'absolute',
    right: 0,
    padding: 12,
  },

});
