import { StyleSheet } from 'react-native';
import {
  Colors,
  Button as RNUIButton,
  ButtonProps as RNUIButtonProps,
} from 'react-native-ui-lib';

export type ButtonProps = RNUIButtonProps & {
  variant?: 'primary' | 'secondary' | 'error';
  type?: 'button' | 'submit' | 'reset';
  mode?: 'text' | 'outlined' | 'contained';
};

function buttonModeResolver(props: ButtonProps) {
  switch (props.mode) {
    case 'text': {
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: Colors[props.variant ?? 'primary'],
      };
    }
    case 'outlined': {
      return {
        backgroundColor: 'transparent',
        borderColor: Colors[props.variant ?? 'primary'],
        color: Colors[props.variant ?? 'primary'],
      };
    }
    case 'contained':
    default: {
      return {
        backgroundColor: Colors[props.variant ?? 'primary'],
        borderColor: Colors[props.variant ?? 'primary'],
        color: Colors.white,
      };
    }
  }
}

function Button(props: ButtonProps) {
  const { color, backgroundColor, borderColor } = buttonModeResolver(props);

  return (
    <RNUIButton
      size="large"
      text70BO
      color={color}
      borderRadius={8}
      {...props}
      style={[styles.base, { backgroundColor, borderColor }, props.style]}
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
});

export default Button;
