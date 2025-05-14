import { Pressable, TextInput, TextInputProps } from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Animated from 'react-native-reanimated';
import { DateTimePicker } from 'react-native-ui-lib';

import { useTheme } from '../../../shared/providers/ThemeProvider';
import { styles } from './styles';
import useTextFieldAnimation from './useTextFieldAnimation';
import Icon from '../Icon';

export interface TextFieldProps extends TextInputProps {
  name: string;
  placeholder?: string;
  type?: 'text' | 'date';

  onChangeText?: (text: string | Date) => void;
}

export interface TextFieldHandles {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

const TextField = forwardRef<TextFieldHandles, TextFieldProps>(
  ({ value, placeholder, type = 'text', onChangeText, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<TextInput>(null);

    const { colors } = useTheme();
    const { animatedPlaceholderStyle, animatedTextFieldStyle } =
      useTextFieldAnimation(!!value, isFocused);

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
      <Animated.View style={animatedTextFieldStyle}>
        <Animated.Text style={animatedPlaceholderStyle}>
          {placeholder}
        </Animated.Text>
        {type === 'text' && (
          <TextInput
            {...props}
            ref={inputRef}
            value={value}
            style={styles.field}
            placeholderTextColor={colors.$textNeutralLight}
            onChangeText={onChangeText}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        )}
        {type === 'date' && (
          <>
            <DateTimePicker
              mode="date"
              style={styles.field}
              value={value ? new Date(value) : undefined}
              locale="pt-BR"
              confirmButtonProps={{ color: colors.primary }}
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
      </Animated.View>
    );
  },
);

export default TextField;
