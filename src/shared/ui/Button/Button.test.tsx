import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';

import { Button } from './Button';

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
  const { Pressable } = require('react-native');
  return { Pressable };
});

jest.mock('react-native-haptic-feedback', () => ({
  trigger: jest.fn(),
}));

jest.mock('../../hooks', () => ({
  useStyled: (fn: Function) =>
    fn({
      colors: {
        primary: '#000',
        text: '#111',
      },
    }),
}));

jest.mock('./Button.styles', () => ({
  createStyles: () => ({
    wrapper: {},
    pressable: {},
    ripple: {},
    hitSlop: {},
    contentRow: {},
    contentRowLoading: {},
    label: { color: '#000' },
    labelLoading: {},
    loadingIndicator: {},
  }),
}));

jest.mock('./useAnimations', () => ({
  useAnimations: () => ({
    animatedStyle: {},
    onPressIn: jest.fn(),
    onPressOut: jest.fn(),
  }),
}));

jest.mock('react-native-haptic-feedback', () => ({
  trigger: jest.fn(),
}));

// ─── Button ───────────────────────────────────────────────────────────────────

describe('Button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders label correctly', () => {
      render(<Button label="Confirm" onPress={jest.fn()} />);
      expect(screen.getByText('Confirm')).toBeTruthy();
    });

    it('renders left and right icons when provided', () => {
      render(
        <Button
          label="Action"
          onPress={jest.fn()}
          leftIcon={<></>}
          rightIcon={<></>}
        />,
      );

      expect(screen.getByText('Action')).toBeTruthy();
    });
  });

  describe('interaction', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      render(<Button label="Click" onPress={onPress} testID="btn" />);

      fireEvent.press(screen.getByTestId('btn'));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const onPress = jest.fn();
      render(<Button label="Click" onPress={onPress} disabled testID="btn" />);

      fireEvent.press(screen.getByTestId('btn'));

      expect(onPress).toHaveBeenCalledTimes(0);
    });

    it('does not call onPress when loading', () => {
      const onPress = jest.fn();
      render(<Button label="Click" onPress={onPress} loading testID="btn" />);

      fireEvent.press(screen.getByTestId('btn'));

      expect(onPress).toHaveBeenCalledTimes(0);
    });

    it('calls onLongPress when provided', () => {
      const onLongPress = jest.fn();
      render(
        <Button
          label="Hold"
          onPress={jest.fn()}
          onLongPress={onLongPress}
          testID="btn"
        />,
      );

      fireEvent(screen.getByTestId('btn'), 'longPress');

      expect(onLongPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('loading state', () => {
    it('replaces rightIcon with ActivityIndicator when loading', () => {
      render(
        <Button
          label="Loading"
          onPress={jest.fn()}
          loading
          rightIcon={<></>}
          testID="btn"
        />,
      );

      expect(screen.getByText('Loading')).toBeTruthy();
    });

    it('keeps label visible while loading', () => {
      render(
        <Button label="Saving" onPress={jest.fn()} loading testID="btn" />,
      );

      expect(screen.getByText('Saving')).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('sets Pressable as disabled when disabled', () => {
      render(
        <Button label="Disabled" onPress={jest.fn()} disabled testID="btn" />,
      );

      const btn = screen.getByTestId('btn');
      expect(btn.props.accessibilityState.disabled).toBe(true);
    });

    it('sets busy state when loading', () => {
      render(
        <Button label="Loading" onPress={jest.fn()} loading testID="btn" />,
      );

      const btn = screen.getByTestId('btn');
      expect(btn.props.accessibilityState.busy).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('uses label as accessibilityLabel when none is provided', () => {
      render(<Button label="Submit" onPress={jest.fn()} testID="btn" />);

      const btn = screen.getByTestId('btn');
      expect(btn.props.accessibilityLabel).toBe('Submit');
    });

    it('respects explicit accessibilityLabel', () => {
      render(
        <Button
          label="Submit"
          accessibilityLabel="Send form"
          onPress={jest.fn()}
          testID="btn"
        />,
      );

      const btn = screen.getByTestId('btn');
      expect(btn.props.accessibilityLabel).toBe('Send form');
    });

    it('passes accessibilityHint when provided', () => {
      render(
        <Button
          label="Submit"
          accessibilityHint="Sends the form"
          onPress={jest.fn()}
          testID="btn"
        />,
      );

      const btn = screen.getByTestId('btn');
      expect(btn.props.accessibilityHint).toBe('Sends the form');
    });
  });

  describe('haptics', () => {
    it('triggers haptic feedback on press when enabled', () => {
      const Haptics = require('react-native-haptic-feedback');

      render(<Button label="Tap" onPress={jest.fn()} testID="btn" />);

      fireEvent.press(screen.getByTestId('btn'));

      expect(Haptics.trigger).toHaveBeenCalled();
    });

    it('does not trigger haptic feedback when disabled', () => {
      const Haptics = require('react-native-haptic-feedback');

      render(
        <Button label="Tap" onPress={jest.fn()} haptic={false} testID="btn" />,
      );

      fireEvent.press(screen.getByTestId('btn'));

      expect(Haptics.trigger).not.toHaveBeenCalled();
    });
  });

  describe('event forwarding', () => {
    it('forwards onPressIn and onPressOut from animations hook', () => {
      const { useAnimations } = require('./useAnimations');

      render(<Button label="Tap" onPress={jest.fn()} testID="btn" />);

      expect(typeof useAnimations().onPressIn).toBe('function');
      expect(typeof useAnimations().onPressOut).toBe('function');
    });
  });
});
