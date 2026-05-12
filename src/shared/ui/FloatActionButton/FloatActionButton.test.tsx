import { fireEvent, render } from '@testing-library/react-native';

import { FloatActionButton } from './FloatActionButton';

const mockTrigger = jest.fn();
const mockOnPressIn = jest.fn();
const mockOnPressOut = jest.fn();

jest.mock('react-native-haptic-feedback', () => ({
  trigger: (...args: any[]) => mockTrigger(...args),
}));

jest.mock('react-native-reanimated', () => {
  const React = require('react');

  const MockAnimatedView = (props: any) => {
    return React.createElement('View', props, props.children);
  };

  return {
    __esModule: true,

    default: {
      View: MockAnimatedView,

      createAnimatedComponent: (Component: any) => Component,
    },

    createAnimatedComponent: (Component: any) => Component,

    useSharedValue: (value: any) => ({
      value,
    }),

    useAnimatedStyle: (callback: any) => callback(),

    withSpring: (value: any) => value,

    withTiming: (value: any) => value,

    useReducedMotion: () => false,
  };
});

jest.mock('@shared/hooks', () => ({
  useStyled: (factory: any) => [
    factory({
      mode: 'light',

      colors: {
        brand: '#2563EB',
        brandPressed: '#1D4ED8',

        success: '#16A34A',
        successPressed: '#15803D',

        warning: '#D97706',
        warningPressed: '#B45309',

        danger: '#DC2626',
        dangerPressed: '#B91C1C',

        background: '#FFFFFF',
        backgroundDisabled: '#E5E7EB',

        textDisabled: '#9CA3AF',

        border: '#D1D5DB',
      },

      shadow: {
        card: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.18,
          shadowRadius: 4,
          elevation: 4,
        },
      },
    }),
  ],
}));

jest.mock('./useAnimations', () => ({
  useAnimations: () => ({
    animatedStyle: {
      opacity: 1,
    },
    onPressIn: mockOnPressIn,
    onPressOut: mockOnPressOut,
  }),
}));

jest.mock('@shared/ui', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const MockIcon = ({ name, color, size }: any) => {
    return React.createElement(
      Text,
      {
        testID: 'fab-icon',
      },
      JSON.stringify({
        name,
        color,
        size,
      }),
    );
  };

  return {
    Icon: MockIcon,
  };
});

describe('FloatActionButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders icon correctly', () => {
      const { getByTestId } = render(
        <FloatActionButton icon="plus" onPress={jest.fn()} />,
      );

      const icon = getByTestId('fab-icon');

      expect(icon.props.children).toContain('"name":"plus"');
      expect(icon.props.children).toContain('"size":24');
    });

    it('uses default props', () => {
      const { getByRole } = render(
        <FloatActionButton icon="plus" onPress={jest.fn()} />,
      );

      const button = getByRole('button');

      expect(button.props.accessibilityState).toEqual({
        disabled: false,
      });
    });

    it('renders disabled state correctly', () => {
      const { getByRole, getByTestId } = render(
        <FloatActionButton icon="plus" disabled onPress={jest.fn()} />,
      );

      const button = getByRole('button');
      const icon = getByTestId('fab-icon');

      expect(button.props.accessibilityState).toEqual({
        disabled: true,
      });

      expect(icon.props.children).toContain('"color":"#9CA3AF"');
    });

    it('applies sm size correctly', () => {
      const { getByTestId } = render(
        <FloatActionButton icon="plus" size="sm" onPress={jest.fn()} />,
      );

      const icon = getByTestId('fab-icon');

      expect(icon.props.children).toContain('"size":16');
    });

    it('renders correct accessibility props', () => {
      const { getByLabelText } = render(
        <FloatActionButton icon="plus" onPress={jest.fn()} />,
      );

      expect(getByLabelText('plus')).toBeTruthy();
    });
  });

  describe('press interactions', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn();

      const { getByRole } = render(
        <FloatActionButton icon="plus" onPress={onPress} />,
      );

      fireEvent.press(getByRole('button'));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('triggers light haptic feedback on press', () => {
      const { getByRole } = render(
        <FloatActionButton icon="plus" onPress={jest.fn()} />,
      );

      fireEvent.press(getByRole('button'));

      expect(mockTrigger).toHaveBeenCalledWith('impactLight', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    });

    it('calls onLongPress when long pressed', () => {
      const onLongPress = jest.fn();

      const { getByRole } = render(
        <FloatActionButton
          icon="plus"
          onPress={jest.fn()}
          onLongPress={onLongPress}
        />,
      );

      fireEvent(getByRole('button'), 'onLongPress');

      expect(onLongPress).toHaveBeenCalledTimes(1);
    });

    it('triggers strong haptic configuration on long press', () => {
      const { getByRole } = render(
        <FloatActionButton
          icon="plus"
          onPress={jest.fn()}
          onLongPress={jest.fn()}
        />,
      );

      fireEvent(getByRole('button'), 'onLongPress');

      expect(mockTrigger).toHaveBeenCalledWith('impactLight', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      });
    });

    it('does not call onLongPress when callback is undefined', () => {
      const { getByRole } = render(
        <FloatActionButton icon="plus" onPress={jest.fn()} />,
      );

      expect(() => {
        fireEvent(getByRole('button'), 'onLongPress');
      }).not.toThrow();
    });
  });

  describe('disabled behavior', () => {
    it('does not call onPress when disabled', () => {
      const onPress = jest.fn();

      const { getByRole } = render(
        <FloatActionButton icon="plus" disabled onPress={onPress} />,
      );

      fireEvent.press(getByRole('button'));

      expect(onPress).not.toHaveBeenCalled();
    });

    it('does not call onLongPress when disabled', () => {
      const onLongPress = jest.fn();

      const { getByRole } = render(
        <FloatActionButton
          icon="plus"
          disabled
          onPress={jest.fn()}
          onLongPress={onLongPress}
        />,
      );

      fireEvent(getByRole('button'), 'onLongPress');

      expect(onLongPress).not.toHaveBeenCalled();
    });

    it('does not trigger haptic feedback when disabled', () => {
      const { getByRole } = render(
        <FloatActionButton icon="plus" disabled onPress={jest.fn()} />,
      );

      fireEvent.press(getByRole('button'));

      expect(mockTrigger).not.toHaveBeenCalled();
    });
  });

  describe('animation integration', () => {
    it('calls onPressIn animation handler', () => {
      const { getByRole } = render(
        <FloatActionButton icon="plus" onPress={jest.fn()} />,
      );

      fireEvent(getByRole('button'), 'pressIn');

      expect(mockOnPressIn).toHaveBeenCalledTimes(1);
    });

    it('calls onPressOut animation handler', () => {
      const { getByRole } = render(
        <FloatActionButton icon="plus" onPress={jest.fn()} />,
      );

      fireEvent(getByRole('button'), 'pressOut');

      expect(mockOnPressOut).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('renders all supported color variants', () => {
      const colors = ['primary', 'success', 'warning', 'danger'] as const;

      colors.forEach(color => {
        const { getByRole, unmount } = render(
          <FloatActionButton icon="plus" color={color} onPress={jest.fn()} />,
        );

        expect(getByRole('button')).toBeTruthy();

        unmount();
      });
    });

    it('renders all supported size variants', () => {
      const sizes = ['sm', 'default'] as const;

      sizes.forEach(size => {
        const { getByRole, unmount } = render(
          <FloatActionButton icon="plus" size={size} onPress={jest.fn()} />,
        );

        expect(getByRole('button')).toBeTruthy();

        unmount();
      });
    });
  });
});
