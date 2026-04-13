import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';

import { Select } from './Select';

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
  };
});

jest.mock('@shared/hooks/useTheme', () => ({
  useStyled: (fn: Function) =>
    fn({
      colors: { text: '#000' },
    }),
}));

jest.mock('./Select.styles', () => ({
  createStyles: () => ({
    label: {},
    labelDisabled: {},
    selectBox: {},
    box: {},
    boxDisabled: {},
    trigger: {},
    triggerText: {},
    triggerTextDisabled: {},
    placeholder: { color: '#999' },
    triggerActions: {},
    clearButton: {},
    option: {},
    optionSelected: {},
    optionText: {},
    optionTextSelected: { color: '#000' },
    optionIcon: {},
    sheet: {},
    fullscreen: {},
    fullscreenHeader: {},
    fullscreenTitle: {},
    fullscreenCloseButton: {},
    fullscreenCloseIcon: { color: '#000' },
    backdrop: {},
    backdropTouchable: {},
    searchContainer: {},
    searchInput: {},
    searchIcon: { color: '#000' },
    searchPlaceholder: { color: '#999' },
  }),
}));

jest.mock('./useAnimations', () => ({
  useAnimations: () => ({
    inputBox: {},
    backdrop: {},
    chevron: {},
    handleOpen: jest.fn(),
    handleClose: jest.fn(),
  }),
}));

jest.mock('@shared/components', () => ({
  Icon: ({ name }: { name: string }) => {
    const { Text } = require('react-native');
    return <Text testID={`icon-${name}`}>{name}</Text>;
  },
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

const OPTIONS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

// ─── Select (unit) ────────────────────────────────────────────────────────────

describe('Select', () => {
  describe('label', () => {
    it('renders label when provided', () => {
      render(<Select label="Category" options={OPTIONS} />);
      expect(screen.getByText('Category')).toBeTruthy();
    });

    it('does not render label when absent', () => {
      render(<Select options={OPTIONS} />);
      expect(screen.queryByText('Category')).toBeNull();
    });
  });

  describe('placeholder and selected value', () => {
    it('renders placeholder when no value is selected', () => {
      render(<Select options={OPTIONS} placeholder="Select..." />);
      expect(screen.getByText('Select...')).toBeTruthy();
    });

    it('renders selected label when value is provided', () => {
      render(<Select options={OPTIONS} value="a" />);
      expect(screen.getByText('Option A')).toBeTruthy();
    });
  });

  describe('open/close behavior', () => {
    it('opens modal on press', () => {
      render(<Select options={OPTIONS} />);
      fireEvent.press(screen.getByText('Selecionar'));
      expect(screen.getByText('Option A')).toBeTruthy();
    });

    it('does not open when disabled', () => {
      render(<Select options={OPTIONS} disabled />);
      fireEvent.press(screen.getByText('Selecionar'));
      expect(screen.queryByText('Option A')).toBeNull();
    });
  });

  describe('selection', () => {
    it('calls onChange when an option is selected', () => {
      const onChange = jest.fn();

      render(<Select options={OPTIONS} onChange={onChange} />);
      fireEvent.press(screen.getByText('Selecionar'));
      fireEvent.press(screen.getByText('Option A'));

      expect(onChange).toHaveBeenCalledWith('a');
    });

    it('closes after selecting an option', () => {
      render(<Select options={OPTIONS} />);
      fireEvent.press(screen.getByText('Selecionar'));
      fireEvent.press(screen.getByText('Option A'));

      expect(screen.queryByText('Option B')).toBeNull();
    });
  });

  describe('clear selection', () => {
    it('renders clear button when value is selected', () => {
      render(<Select options={OPTIONS} value="a" />);
      expect(screen.getByTestId('icon-close')).toBeTruthy();
    });

    it('calls onChange(undefined) when clear is pressed', () => {
      const onChange = jest.fn();

      render(<Select options={OPTIONS} value="a" onChange={onChange} />);
      fireEvent.press(screen.getByTestId('icon-close'));

      expect(onChange).toHaveBeenCalledWith(undefined);
    });

    it('does not render clear button when disabled', () => {
      render(<Select options={OPTIONS} value="a" disabled />);
      expect(screen.queryByTestId('icon-close')).toBeNull();
    });
  });

  describe('search', () => {
    it('renders search input when searchable is true', () => {
      render(<Select options={OPTIONS} searchable />);
      fireEvent.press(screen.getByText('Selecionar'));
      expect(screen.getByPlaceholderText('Buscar...')).toBeTruthy();
    });

    it('does not render search input when searchable is false', () => {
      render(<Select options={OPTIONS} />);
      fireEvent.press(screen.getByText('Selecionar'));
      expect(screen.queryByPlaceholderText('Buscar...')).toBeNull();
    });

    it('calls onSearch when typing', () => {
      const onSearch = jest.fn();

      render(<Select options={OPTIONS} searchable onSearch={onSearch} />);
      fireEvent.press(screen.getByText('Selecionar'));

      fireEvent.changeText(screen.getByPlaceholderText('Buscar...'), 'opt');

      expect(onSearch).toHaveBeenCalledWith('opt');
    });

    it('clears search on close', () => {
      const onSearch = jest.fn();

      render(<Select options={OPTIONS} searchable onSearch={onSearch} />);
      fireEvent.press(screen.getByText('Selecionar'));

      fireEvent.changeText(screen.getByPlaceholderText('Buscar...'), 'abc');

      fireEvent.press(screen.getByTestId('icon-close'));

      expect(onSearch).toHaveBeenCalledWith('');
    });
  });

  describe('type rendering', () => {
    it('renders fullscreen by default', () => {
      render(<Select options={OPTIONS} />);
      fireEvent.press(screen.getByText('Selecionar'));
      expect(screen.getByText('Option A')).toBeTruthy();
    });

    it('renders sheet when type="sheet"', () => {
      render(<Select options={OPTIONS} type="sheet" />);
      fireEvent.press(screen.getByText('Selecionar'));
      expect(screen.getByText('Option A')).toBeTruthy();
    });
  });
});

// ─── Select.Controlled (integration) ──────────────────────────────────────────

type FormValues = {
  category: string | null;
};

function ControlledFixture(
  props: Partial<React.ComponentProps<typeof Select>>,
) {
  const { control } = useForm<FormValues>({
    defaultValues: { category: null },
  });

  return (
    <Select.Controlled
      control={control}
      name="category"
      options={OPTIONS}
      {...props}
    />
  );
}

describe('Select.Controlled', () => {
  it('initializes with default value', () => {
    function Fixture() {
      const { control } = useForm<FormValues>({
        defaultValues: { category: 'a' },
      });

      return (
        <Select.Controlled
          control={control}
          name="category"
          options={OPTIONS}
        />
      );
    }

    render(<Fixture />);
    expect(screen.getByText('Option A')).toBeTruthy();
  });

  it('updates value when selecting option', () => {
    render(<ControlledFixture />);

    fireEvent.press(screen.getByText('Selecionar'));
    fireEvent.press(screen.getByText('Option B'));

    expect(screen.getByText('Option B')).toBeTruthy();
  });

  it('maps undefined to null in form state', () => {
    render(<ControlledFixture />);

    fireEvent.press(screen.getByText('Selecionar'));
    fireEvent.press(screen.getByText('Option A'));

    fireEvent.press(screen.getByTestId('icon-close'));

    expect(screen.getByText('Selecionar')).toBeTruthy();
  });

  it('passes props down correctly', () => {
    render(<ControlledFixture placeholder="Pick one" />);

    expect(screen.getByText('Pick one')).toBeTruthy();
  });
});
