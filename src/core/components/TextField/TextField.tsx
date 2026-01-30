import {
  Pressable,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Animated from 'react-native-reanimated';
import { Picker, PickerValue, Text, View } from 'react-native-ui-lib';
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from '@core/hooks/useTheme';

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
  value?: string | Date;
  name: string;
  placeholder?: string;
  type?: 'text' | 'date' | 'picker';
  mask?: 'currency';
  items?: DropdownItemProps[];
  showSearch?: boolean;
  error?: string;
  minimumDate?: Date;
  fullWidth?: boolean;
  disabled?: boolean;
  format?: (value: string) => string;
  parse?: (value: string) => string;
}

type UnionTextInputProps = Omit<TextInputProps, 'value'> &
  PrimitiveTextFieldProps;

export interface TextFieldProps extends UnionTextInputProps {
  onChangeText?: (text: string | Date | PickerValue | DateType) => void;
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
      format: formatProp,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
      disabled: props.disabled,
    });

    const { prefix, handleFormat, handleParse } = useTextFieldMask({
      mask,
      format: formatProp,
      onChangeText,
      parse,
    });
    const defaultDateTimePickerStyles = useDefaultStyles();

    const clear = () => {
      if (typeof onChangeText === 'function' && !props.disabled) {
        onChangeText('');
      }
    };

    const openDatePicker = () => {
      if (!props.disabled) {
        setIsFocused(true);
        setIsDatePickerOpen(true);
      }
    };

    const closeDatePicker = () => {
      setIsFocused(false);
      setIsDatePickerOpen(false);
    };

    const formattedDate =
      value instanceof Date
        ? format(value, 'dd/MM/yyyy', { locale: ptBR })
        : '';

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
              secureTextEntry={props.secureTextEntry && !isPasswordVisible}
              value={value ? handleFormat(String(value)) : undefined}
              style={[styles.field, prefixStyles(prefix)]}
              placeholderTextColor={colors.$textNeutralLight}
              onChangeText={handleParse}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {props.secureTextEntry && value && (
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(v => !v)}
                style={styles.eyeIconPressable}>
                <Icon
                  name={isPasswordVisible ? 'eye' : 'eye-slash'}
                  size={20}
                  color={colors.textPrimary}
                />
              </TouchableOpacity>
            )}
          </>
        )}

        {type === 'date' && (
          <>
            <Pressable onPress={openDatePicker}>
              <TextInput
                ref={inputRef}
                value={formattedDate}
                editable={false}
                pointerEvents="none"
                style={styles.field}
                placeholderTextColor={colors.$textNeutralLight}
              />
            </Pressable>

            {value && (
              <Pressable style={styles.closeIconPressable} onPress={clear}>
                <Icon
                  name="close"
                  color={colors.$backgroundNeutralHeavy}
                  size={24}
                />
              </Pressable>
            )}

            <Modal
              visible={isDatePickerOpen}
              transparent
              animationType="fade"
              onRequestClose={closeDatePicker}>
              <Pressable style={styles.modalBackdrop} onPress={closeDatePicker}>
                <Pressable style={styles.modalContainer}>
                  <DateTimePicker
                    styles={defaultDateTimePickerStyles}
                    mode="single"
                    date={value ? value : undefined}
                    minDate={minimumDate}
                    locale="pt-BR"
                    startDate={new Date()}
                    onChange={({ date }) => {
                      if (date) {
                        onChangeText?.(date);
                      }
                      closeDatePicker();
                    }}
                  />
                </Pressable>
              </Pressable>
            </Modal>
          </>
        )}

        {type === 'picker' && (
          <>
            <Picker
              editable={!props.disabled}
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
