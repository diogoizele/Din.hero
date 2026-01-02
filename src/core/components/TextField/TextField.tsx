import { Pressable, TextInput, TextInputProps } from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Animated from 'react-native-reanimated';
import {
  Colors,
  DateTimePicker,
  Picker,
  PickerValue,
  Text,
  View,
} from 'react-native-ui-lib';

import { useTheme } from '../../hooks/useTheme';
import { styles } from './styles';
import useTextFieldAnimation from './useTextFieldAnimation';
import Icon, { IconProps } from '../Icon';
import useTextFieldMask from './useTextFieldMask';

export type DropdownItemProps = {
  label: string;
  value: string;
  icon?: IconProps['name'];
};

export interface PrimitiveTextFieldProps {
  name: string;
  placeholder?: string;
  type?: 'text' | 'date' | 'picker';
  mask?: 'currency';
  items?: DropdownItemProps[];
  showSearch?: boolean;
  error?: string;
  minimumDate?: Date;
  fullWidth?: boolean;
  format?: (value: string) => string;
  parse?: (value: string) => string;
}

type UnionTextInputProps = TextInputProps & PrimitiveTextFieldProps;

export interface TextFieldProps extends UnionTextInputProps {
  onChangeText?: (text: string | Date | PickerValue) => void;
}

export interface TextFieldHandles {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

const prefixStyles = (prefix?: string) => ({ paddingLeft: prefix ? 40 : 16 });
const multilineStyles = (multiline?: boolean) =>
  ({
    height: multiline ? 100 : 48,
    paddingVertical: multiline ? 8 : 0,
    justifyContent: multiline ? 'flex-start' : 'center',
  } as const);
const fullWidthStyles = (fullWidth?: boolean) =>
  fullWidth ? ({ width: '100%' } as const) : {};

const TextField = forwardRef<TextFieldHandles, TextFieldProps>(
  (
    {
      value,
      placeholder,
      type = 'text',
      mask,
      items,
      showSearch,
      error,
      minimumDate,
      fullWidth,
      onChangeText,
      parse,
      format,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<TextInput>(null);

    const { colors } = useTheme();
    const {
      animatedPlaceholderStyle,
      animatedTextFieldStyle,
      animatedPrefixStyle,
    } = useTextFieldAnimation({
      hasValue: !!value,
      isFocused,
      error,
      multiline: props.multiline,
    });
    const { prefix, handleFormat, handleParse } = useTextFieldMask({
      mask,
      format,
      onChangeText,
      parse,
    });

    const handleFocus = () => {
      setIsFocused(true);
    };
    const handleBlur = () => {
      setIsFocused(false);
    };

    const clear = () => {
      if (typeof onChangeText === 'function') {
        onChangeText('');
      }
    };

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear,
    }));

    return (
      <Animated.View
        style={[
          animatedTextFieldStyle,
          multilineStyles(props.multiline),
          fullWidthStyles(fullWidth),
        ]}>
        <Animated.Text style={animatedPlaceholderStyle}>
          {placeholder}
        </Animated.Text>
        {type === 'text' && (
          <>
            {(isFocused || value) && (
              <Animated.Text style={animatedPrefixStyle}>
                {prefix}
              </Animated.Text>
            )}
            <TextInput
              {...props}
              ref={inputRef}
              value={handleFormat(value)}
              style={[styles.field, prefixStyles(prefix)]}
              placeholderTextColor={colors.$textNeutralLight}
              onChangeText={handleParse}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </>
        )}
        {type === 'date' && (
          <>
            <DateTimePicker
              mode="date"
              style={styles.field}
              value={value ? new Date(value) : undefined}
              locale="pt-BR"
              confirmButtonProps={{ color: colors.primary }}
              minimumDate={minimumDate}
              onChange={onChangeText}
              onBlur={handleBlur}
              onFocus={handleFocus}
              dialogProps={{
                bottom: true,
                containerStyle: {
                  backgroundColor: Colors.white,
                  bottom: -20,
                },
              }}
            />
            {value && (
              <Pressable style={styles.closeIconPressable} onPress={clear}>
                <Icon
                  name="close"
                  color={colors.$backgroundNeutralHeavy}
                  size={24}
                />
              </Pressable>
            )}
          </>
        )}
        {type === 'picker' && (
          <>
            <Picker
              fieldStyle={styles.field}
              onChange={onChangeText}
              showSearch={showSearch}
              items={items?.map(item => ({
                ...item,
                renderItem: () => <DropdownItem {...item} />,
              }))}
            />
            {value && (
              <View style={styles.pickerTextContainer}>
                <Text style={styles.pickerTextValue}>
                  {items?.find(i => i.value === value)?.label}
                </Text>
              </View>
            )}
            {value && (
              <Pressable style={styles.closeIconPressable} onPress={clear}>
                <Icon
                  name="close"
                  color={colors.$backgroundNeutralHeavy}
                  size={24}
                />
              </Pressable>
            )}
          </>
        )}
        {error && (
          <Animated.Text style={styles.errorText}>{error}</Animated.Text>
        )}
      </Animated.View>
    );
  },
);

const DropdownItem = (props: DropdownItemProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.dropdownItemContainer}>
      {props.icon && (
        <View style={styles.dropdownItemIcon}>
          <Icon name={props.icon} size={16} color={colors.textSecondary} />
        </View>
      )}
      <Text style={styles.dropdownItemLabel}>{props.label}</Text>
    </View>
  );
};

export default TextField;
