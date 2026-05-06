import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
  useState,
} from 'react';
import {
  TextInputProps,
  View,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from 'react-hook-form';

import { useNewTheme, useStyled } from '@shared/hooks/useTheme';
import { applyOpacity } from '@shared/helpers/colors';
import { Icon } from '@shared/components';

import { createStyles } from './TextField.styles';
import { useAnimations } from './useAnimations';

export interface TextFieldProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  animatedStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      label,
      disabled,
      error,
      errorMessage,
      required,
      onFocus,
      onBlur,
      autoCapitalize = 'none',
      autoComplete = 'off',
      autoCorrect = false,
      animatedStyle,
      ...props
    },
    ref,
  ) => {
    const [isTextVisible, setIsTextVisible] = useState(false);

    const theme = useNewTheme();
    const styles = useStyled(createStyles);
    const animations = useAnimations({ error, onFocus, onBlur });
    const tintColor = error ? theme.colors.danger : theme.colors.brand;

    return (
      <Animated.View style={animatedStyle}>
        {label && (
          <Animated.Text
            testID="text-field-label"
            style={[
              styles.label,
              disabled && styles.labelDisabled,
              animations.labelStyle,
            ]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Animated.Text>
        )}
        <Animated.View
          style={[
            styles.box,
            animations.inputBox,
            disabled && styles.boxDisabled,
          ]}>
          <TextInput
            {...props}
            ref={ref}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            autoCorrect={autoCorrect}
            editable={!disabled && props.editable !== false}
            style={[styles.field, disabled && styles.fieldDisabled]}
            onFocus={animations.handleFocus}
            onBlur={animations.handleBlur}
            cursorColor={tintColor}
            selectionColor={applyOpacity(tintColor, 0.5)}
            selectionHandleColor={tintColor}
            placeholderTextColor={theme.colors.textDisabled}
            secureTextEntry={props.secureTextEntry && !isTextVisible}
            accessibilityLabel={label}
            accessibilityState={{ disabled }}
          />
          {props.secureTextEntry && (
            <TouchableOpacity
              onPress={() => setIsTextVisible(v => !v)}
              style={styles.eyeIconTouchable}>
              <Icon
                name={isTextVisible ? 'eye' : 'eye-slash'}
                size={16}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </Animated.View>

        <Animated.View
          style={[styles.errorContainer, animations.errorMessageStyle]}>
          <View style={styles.errorIcon}>
            <Icon
              name={'triangle-exclamation'}
              size={10}
              color={theme.colors.danger}
            />
          </View>
          <Text style={styles.textError}>{errorMessage}</Text>
        </Animated.View>
      </Animated.View>
    );
  },
) as ForwardRefExoticComponent<TextFieldProps & RefAttributes<TextInput>> & {
  Controlled: <T extends FieldValues>(
    props: ControlledTextFieldProps<T>,
  ) => ReactElement;
};

interface ControlledTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'value' | 'onChange'>,
    Omit<ControllerProps<T>, 'render' | 'defaultValue'> {
  control: Control<T>;
  name: Path<T>;
}

TextField.Controlled = function CustomInput<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...props}
          required={!!rules?.required?.valueOf()}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={e => {
            field.onBlur();
            props?.onBlur?.(e);
          }}
          ref={field.ref}
        />
      )}
    />
  );
};
