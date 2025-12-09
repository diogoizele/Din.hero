import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import {
  Colors,
  Button as RNUIButton,
  ButtonProps as RNUIButtonProps,
} from 'react-native-ui-lib';

export type ButtonProps = RNUIButtonProps & {
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  mode?: 'text' | 'outlined' | 'contained';
};

function buttonStylesResolver(props: ButtonProps) {
  const stylesArray: StyleProp<ViewStyle> = [styles.base];
  let color: string | undefined;

  if (props.variant === 'secondary') {
    if (props.mode === 'text') {
      stylesArray.push(styles.textSecondary);
      color = Colors.secondary;
    } else if (props.mode === 'outlined') {
      stylesArray.push(styles.outlinedSecondary);
      color = Colors.secondary;
    } else {
      stylesArray.push(styles.containedSecondary);
      color = Colors.white;
    }
  } else {
    if (props.mode === 'text') {
      stylesArray.push(styles.textPrimary);
      color = Colors.primary;
    } else if (props.mode === 'outlined') {
      stylesArray.push(styles.outlinedPrimary);
      color = Colors.primary;
    } else {
      stylesArray.push(styles.containedPrimary);
      color = Colors.white;
    }
  }

  return {
    buttonStyles: stylesArray,
    color,
  };
}

function Button(props: ButtonProps) {
  const { color, buttonStyles } = buttonStylesResolver(props);
  return (
    <RNUIButton
      size="large"
      text70BO
      color={color}
      borderRadius={8}
      style={[buttonStyles, props.style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    boxSizing: 'border-box',
    borderWidth: 1,
  },
  containedPrimary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  containedSecondary: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  outlinedPrimary: {
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  outlinedSecondary: {
    borderColor: Colors.secondary,
    backgroundColor: 'transparent',
  },
  textPrimary: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  textSecondary: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});

export default Button;
