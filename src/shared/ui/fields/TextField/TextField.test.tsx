import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';

import { TextField } from './TextField';

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: { View },
    View,
    createAnimatedComponent: (component: any) => component,
    useSharedValue: (init: any) => ({ value: init }),
    useAnimatedStyle: (fn: Function) => fn(),
    withTiming: (val: any) => val,
    withSpring: (val: any) => val,
    interpolate: (val: any) => val,
    Extrapolation: { CLAMP: 'clamp' },
  };
});

jest.mock('react-native-gesture-handler', () => {
  const { TextInput } = require('react-native');
  return { TextInput };
});

jest.mock('@shared/hooks/useTheme', () => ({
  useNewTheme: () => ({
    colors: { brand: '#000', textSecondary: '#666' },
  }),
  useStyled: (fn: Function) => fn(),
}));

jest.mock('./TextField.styles', () => ({
  createStyles: () => ({
    label: {},
    inputBox: {},
    textField: {},
    eyeIconTouchable: {},
  }),
}));

jest.mock('./useAnimations', () => ({
  useAnimations: ({ onFocus, onBlur }: any) => ({
    inputBox: {},
    handleFocus: onFocus ?? jest.fn(),
    handleBlur: onBlur ?? jest.fn(),
  }),
}));

jest.mock('@shared/components', () => ({
  Icon: ({ name }: { name: string }) => {
    const { Text } = require('react-native');
    return <Text testID={`icon-${name}`}>{name}</Text>;
  },
}));

// ─── TextField (unit) ─────────────────────────────────────────────────────────

describe('TextField', () => {
  describe('label', () => {
    it('renders the label when the prop is provided', () => {
      render(<TextField label="Email" />);
      expect(screen.getByText('Email')).toBeTruthy();
    });

    it('does not render a label element when the prop is absent', () => {
      render(<TextField />);
      expect(screen.queryByText(/./)).toBeNull();
    });
  });

  describe('password visibility toggle', () => {
    it('does not render the eye icon when secureTextEntry is false', () => {
      render(<TextField secureTextEntry={false} />);
      expect(screen.queryByTestId(/^icon-eye/)).toBeNull();
    });

    it('renders the eye-slash icon by default when secureTextEntry is true', () => {
      render(<TextField secureTextEntry />);
      expect(screen.getByTestId('icon-eye-slash')).toBeTruthy();
    });

    it('reveals the input text when the eye icon is pressed', () => {
      render(<TextField testID="input" secureTextEntry />);

      const input = screen.getByTestId('input');
      expect(input.props.secureTextEntry).toBe(true);

      fireEvent.press(screen.getByTestId('icon-eye-slash'));
      expect(screen.getByTestId('input').props.secureTextEntry).toBe(false);
    });

    it('conceals the input text again on a second press', () => {
      render(<TextField testID="input" secureTextEntry />);

      fireEvent.press(screen.getByTestId('icon-eye-slash'));
      fireEvent.press(screen.getByTestId('icon-eye'));

      expect(screen.getByTestId('input').props.secureTextEntry).toBe(true);
    });

    it('shows the eye icon (not eye-slash) while text is visible', () => {
      render(<TextField secureTextEntry />);
      fireEvent.press(screen.getByTestId('icon-eye-slash'));
      expect(screen.getByTestId('icon-eye')).toBeTruthy();
    });
  });

  describe('event forwarding', () => {
    it('calls the onFocus callback passed as prop', () => {
      const onFocus = jest.fn();
      render(<TextField testID="input" onFocus={onFocus} />);
      fireEvent(screen.getByTestId('input'), 'focus');
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('calls the onBlur callback passed as prop', () => {
      const onBlur = jest.fn();
      render(<TextField testID="input" onBlur={onBlur} />);
      fireEvent(screen.getByTestId('input'), 'blur');
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('ref forwarding', () => {
    it('forwards the ref to the underlying TextInput', () => {
      const ref = React.createRef<any>();
      render(<TextField ref={ref} />);
      expect(ref.current).not.toBeNull();
    });
  });

  describe('disabled state', () => {
    it('sets TextInput as non-editable when disabled', () => {
      render(<TextField testID="input" disabled />);
      const input = screen.getByTestId('input');

      expect(input.props.editable).toBe(false);
    });

    it('respects explicit editable={false} even when not disabled', () => {
      render(<TextField testID="input" editable={false} />);
      const input = screen.getByTestId('input');

      expect(input.props.editable).toBe(false);
    });

    it('prioritizes disabled over editable=true', () => {
      render(<TextField testID="input" disabled editable />);
      const input = screen.getByTestId('input');

      expect(input.props.editable).toBe(false);
    });

    it('still renders label when disabled', () => {
      render(<TextField label="Email" disabled />);
      expect(screen.getByText('Email')).toBeTruthy();
    });

    it('still renders password toggle when disabled', () => {
      render(<TextField secureTextEntry disabled />);
      expect(screen.getByTestId('icon-eye-slash')).toBeTruthy();
    });

    it('still toggles visibility even when disabled (no guard implemented)', () => {
      render(<TextField testID="input" secureTextEntry disabled />);

      const input = screen.getByTestId('input');
      expect(input.props.secureTextEntry).toBe(true);

      fireEvent.press(screen.getByTestId('icon-eye-slash'));

      expect(screen.getByTestId('input').props.secureTextEntry).toBe(false);
    });
  });
});

// ─── TextField.Controlled (integration) ──────────────────────────────────────

type FormValues = { username: string };

function ControlledFixture(
  props: Partial<React.ComponentProps<typeof TextField>>,
) {
  const { control } = useForm<FormValues>({ defaultValues: { username: '' } });
  return (
    <TextField.Controlled
      testID="controlled-input"
      control={control}
      name="username"
      {...props}
    />
  );
}

describe('TextField.Controlled', () => {
  it('initialises with the default value from the form state', () => {
    function Fixture() {
      const { control } = useForm<FormValues>({
        defaultValues: { username: 'john' },
      });
      return (
        <TextField.Controlled
          testID="controlled-input"
          control={control}
          name="username"
        />
      );
    }

    render(<Fixture />);
    expect(screen.getByTestId('controlled-input').props.value).toBe('john');
  });

  it('updates the field value when text changes', () => {
    render(<ControlledFixture />);
    fireEvent.changeText(screen.getByTestId('controlled-input'), 'jane');
    expect(screen.getByTestId('controlled-input').props.value).toBe('jane');
  });

  it('triggers field onBlur through the controller', () => {
    const onBlur = jest.fn();
    render(<ControlledFixture onBlur={onBlur} />);
    fireEvent(screen.getByTestId('controlled-input'), 'blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('passes arbitrary TextInput props through to the underlying TextField', () => {
    render(<ControlledFixture placeholder="Enter username" />);
    expect(screen.getByTestId('controlled-input').props.placeholder).toBe(
      'Enter username',
    );
  });
});
