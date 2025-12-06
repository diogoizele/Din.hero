import { Pressable, TextInput, TextInputProps } from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Animated from 'react-native-reanimated';
import {
  DateTimePicker,
  Picker,
  PickerValue,
  Text,
  View,
} from 'react-native-ui-lib';

import { useTheme } from '../../hooks/useTheme';
import { styles } from './styles';
import useTextFieldAnimation from './useTextFieldAnimation';
import Icon from '../Icon';
import useTextFieldMask from './useTextFieldMask';

export interface PrimitiveTextFieldProps {
  name: string;
  placeholder?: string;
  type?: 'text' | 'date' | 'picker';
  mask?: 'currency';
  items?: Array<{ label: string; value: string }>;
  showSearch?: boolean;
  error?: string;
  minimumDate?: Date;
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
        style={[animatedTextFieldStyle, multilineStyles(props.multiline)]}>
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
              items={items}
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

export default TextField;
