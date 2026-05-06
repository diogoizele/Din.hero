import { StyleSheet } from 'react-native';

import { Theme } from '@shared/theme/new_tokens';
import { createFieldBaseStyles } from '../FieldBase.styles';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    ...createFieldBaseStyles(theme),
    selectBox: {
      height: 42,
    },
    trigger: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing(1.5),
    },
    triggerText: {
      flex: 1,
      color: theme.colors.textPrimary,
    },
    triggerTextDisabled: {
      color: theme.colors.textDisabled,
    },
    placeholder: {
      color: theme.colors.textDisabled,
    },
    triggerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
    clearButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    backdrop: {
      flex: 1,
      backgroundColor: theme.colors.backdrop,
    },
    backdropTouchable: {
      flex: 1,
    },
    sheet: {
      backgroundColor: theme.colors.surface,
      maxHeight: '60%',
    },
    fullscreen: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    fullscreenHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing(2),
      paddingVertical: theme.spacing(1.5),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    fullscreenTitle: {
      fontSize: theme.spacing(2),
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    fullscreenCloseButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullscreenCloseIcon: {
      color: theme.colors.textSecondary,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing(2),
      paddingVertical: theme.spacing(1),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      gap: theme.spacing(1),
    },
    searchIcon: {
      color: theme.colors.textDisabled,
    },
    searchInput: {
      flex: 1,
      color: theme.colors.textPrimary,

      paddingVertical: theme.spacing(0.5),
    },
    searchPlaceholder: {
      color: theme.colors.textDisabled,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing(3),
      paddingHorizontal: theme.spacing(4),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      gap: theme.spacing(1),
    },
    optionSelected: {
      backgroundColor: theme.colors.brandSubtle,
    },
    optionIcon: {
      flexShrink: 0,
      marginRight: theme.spacing(1.5),
    },
    optionText: {
      color: theme.colors.textPrimary,

    },
    optionTextSelected: {
      color: theme.colors.brand,
      fontWeight: '600',
    },
  });
