import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
  useState,
} from 'react';
import { TextInputProps, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { useNewTheme, useStyled } from '@shared/hooks/useTheme';
import { Icon } from '@shared/components';

import { createStyles } from './TextField.styles';
import { useAnimations } from './useAnimations';

export interface TextFieldProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, disabled, onFocus, onBlur, ...props }, ref) => {
    const [isTextVisible, setIsTextVisible] = useState(false);

    const theme = useNewTheme();
    const styles = useStyled(createStyles);
    const animations = useAnimations({ onFocus, onBlur });

    return (
      <View>
        {label && (
          <Text style={[styles.label, disabled && styles.labelDisabled]}>
            {label}
          </Text>
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
            editable={!disabled && props.editable !== false}
            style={[styles.field, disabled && styles.fieldDisabled]}
            onFocus={animations.handleFocus}
            onBlur={animations.handleBlur}
            cursorColor={theme.colors.brand}
            selectionColor={theme.colors.brand}
            selectionHandleColor={theme.colors.brand}
            placeholderTextColor={theme.colors.textDisabled}
            secureTextEntry={props.secureTextEntry && !isTextVisible}
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
      </View>
    );
  },
) as ForwardRefExoticComponent<TextFieldProps & RefAttributes<TextInput>> & {
  Controlled: <T extends FieldValues>(
    props: ControlledTextFieldProps<T>,
  ) => ReactElement;
};

interface ControlledTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'value' | 'onChange'> {
  control: Control<T>;
  name: Path<T>;
}

TextField.Controlled = function CustomInput<T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...props}
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
