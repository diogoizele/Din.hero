import { useState } from 'react';
import { View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { Meta, StoryObj } from '@storybook/react-native';

import { Container } from '../../../../../.rnstorybook/Container';
import { Select, SelectProps, SelectOption } from './Select';
import { TextField } from '../TextField/TextField';

const meta = {
  title: 'Fields/Select',
  component: Select,
  decorators: [
    Story => (
      <Container style={{ padding: 24, gap: 24 }}>
        <Story />
      </Container>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;

type Story = Partial<StoryObj<typeof meta>>;

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const SIMPLE_OPTIONS: SelectOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

const MONTH_OPTIONS: SelectOption[] = [
  { label: 'January', value: 'jan' },
  { label: 'February', value: 'feb' },
  { label: 'March', value: 'mar' },
  { label: 'April', value: 'apr' },
  { label: 'May', value: 'may' },
  { label: 'June', value: 'jun' },
  { label: 'July', value: 'jul' },
  { label: 'August', value: 'aug' },
  { label: 'September', value: 'sep' },
  { label: 'October', value: 'oct' },
  { label: 'November', value: 'nov' },
  { label: 'December', value: 'dec' },
];

const ICON_OPTIONS: SelectOption[] = [
  { label: 'Home', value: 'home', icon: 'home' },
  { label: 'Profile', value: 'profile', icon: 'user' },
  { label: 'Settings', value: 'settings', icon: 'icons' },
  { label: 'Logout', value: 'logout', icon: 'icons' },
];

const COUNTRY_OPTIONS: SelectOption[] = [
  { label: 'Brazil', value: 'br', icon: 'icons' },
  { label: 'Argentina', value: 'ar', icon: 'icons' },
  { label: 'Chile', value: 'cl', icon: 'icons' },
  { label: 'Uruguay', value: 'uy', icon: 'icons' },
  { label: 'Paraguay', value: 'py', icon: 'icons' },
  { label: 'Peru', value: 'pe', icon: 'icons' },
  { label: 'Colombia', value: 'co', icon: 'icons' },
  { label: 'Ecuador', value: 'ec', icon: 'icons' },
  { label: 'Bolivia', value: 'bo', icon: 'icons' },
  { label: 'Venezuela', value: 've', icon: 'icons' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const StatefulSelect = (props: Omit<SelectProps, 'value' | 'onChange'>) => {
  const [value, setValue] = useState<string | number | undefined>(undefined);
  return <Select {...props} value={value} onChange={setValue} />;
};

const SectionLabel = ({ title }: { title: string }) => (
  <Text
    style={{
      fontSize: 11,
      fontWeight: '600',
      color: '#888',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginTop: 8,
    }}>
    {title}
  </Text>
);

// ─── Base ─────────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => <StatefulSelect options={SIMPLE_OPTIONS} />,
};

export const WithLabel: Story = {
  render: () => <StatefulSelect label="Month" options={MONTH_OPTIONS} />,
};

export const WithCustomPlaceholder: Story = {
  render: () => (
    <StatefulSelect
      label="Month"
      placeholder="Pick a month"
      options={MONTH_OPTIONS}
    />
  ),
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SectionLabel title="Empty" />
      <StatefulSelect label="Disabled" options={SIMPLE_OPTIONS} disabled />

      <SectionLabel title="With value (clear must not appear)" />
      <Select
        label="Disabled with value"
        options={SIMPLE_OPTIONS}
        value={2}
        onChange={() => {}}
        disabled
      />
    </View>
  ),
};

// ─── Type: fullscreen vs sheet ────────────────────────────────────────────────

export const TypeFullscreen: Story = {
  render: () => (
    <StatefulSelect
      label="Fullscreen (default)"
      options={MONTH_OPTIONS}
      type="fullscreen"
    />
  ),
};

export const TypeSheet: Story = {
  render: () => (
    <StatefulSelect label="Sheet" options={MONTH_OPTIONS} type="sheet" />
  ),
};

export const TypeComparison: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SectionLabel title="Fullscreen" />
      <StatefulSelect
        label="Select a month"
        options={MONTH_OPTIONS}
        type="fullscreen"
      />

      <SectionLabel title="Sheet" />
      <StatefulSelect
        label="Select a month"
        options={MONTH_OPTIONS}
        type="sheet"
      />
    </View>
  ),
};

// ─── Icons ────────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <StatefulSelect
      label="Navigation"
      options={ICON_OPTIONS}
      type="fullscreen"
    />
  ),
};

export const WithIconsSheet: Story = {
  render: () => (
    <StatefulSelect label="Navigation" options={ICON_OPTIONS} type="sheet" />
  ),
};

// ─── Searchable ───────────────────────────────────────────────────────────────

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | undefined>(undefined);
    const [options, setOptions] = useState(COUNTRY_OPTIONS);

    const handleSearch = (text: string) => {
      setOptions(
        COUNTRY_OPTIONS.filter(o =>
          o.label.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    };

    return (
      <Select
        label="Country"
        options={options}
        value={value}
        onChange={setValue}
        searchable
        onSearch={handleSearch}
        type="fullscreen"
      />
    );
  },
};

export const SearchableSheet: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | undefined>(undefined);
    const [options, setOptions] = useState(COUNTRY_OPTIONS);

    const handleSearch = (text: string) => {
      setOptions(
        COUNTRY_OPTIONS.filter(o =>
          o.label.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    };

    return (
      <Select
        label="Country"
        options={options}
        value={value}
        onChange={setValue}
        searchable
        onSearch={handleSearch}
        type="sheet"
      />
    );
  },
};

export const SearchableWithIcons: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | undefined>(undefined);
    const [options, setOptions] = useState(COUNTRY_OPTIONS);

    const handleSearch = (text: string) => {
      setOptions(
        COUNTRY_OPTIONS.filter(o =>
          o.label.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    };

    return (
      <Select
        label="Country"
        options={options}
        value={value}
        onChange={setValue}
        searchable
        onSearch={handleSearch}
        type="fullscreen"
      />
    );
  },
};

// ─── Clear ────────────────────────────────────────────────────────────────────

export const WithClear: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SectionLabel title="Select a value and use the X to clear" />
      <StatefulSelect label="Clearable" options={SIMPLE_OPTIONS} />
    </View>
  ),
};

export const WithClearPreselected: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | undefined>(2);
    return (
      <Select
        label="Starts with value"
        options={SIMPLE_OPTIONS}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// ─── Controlled (react-hook-form) ─────────────────────────────────────────────

type AddressForm = { country: string; state: string };

const ControlledExample = () => {
  const { control, watch, reset } = useForm<AddressForm>({
    defaultValues: { country: '', state: '' },
  });

  const values = watch();

  return (
    <View style={{ gap: 16 }}>
      <Select.Controlled
        control={control}
        name="country"
        label="Country"
        placeholder="Select a country"
        options={COUNTRY_OPTIONS}
        type="fullscreen"
      />
      <Select.Controlled
        control={control}
        name="state"
        label="State"
        placeholder="Select a state"
        options={[
          { label: 'Rio Grande do Sul', value: 'rs' },
          { label: 'Santa Catarina', value: 'sc' },
          { label: 'Paraná', value: 'pr' },
        ]}
        type="sheet"
      />
      <Text style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>
        {JSON.stringify(values, null, 2)}
      </Text>
      <Text
        onPress={() => reset()}
        style={{
          fontSize: 12,
          color: '#3B8BD4',
          textDecorationLine: 'underline',
        }}>
        reset form
      </Text>
    </View>
  );
};

export const Controlled: StoryObj = {
  render: () => <ControlledExample />,
};

type SearchableForm = { country: string };

const ControlledSearchableExample = () => {
  const { control, watch } = useForm<SearchableForm>({
    defaultValues: { country: '' },
  });

  const [options, setOptions] = useState(COUNTRY_OPTIONS);

  const handleSearch = (text: string) => {
    setOptions(
      COUNTRY_OPTIONS.filter(o =>
        o.label.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <View style={{ gap: 16 }}>
      <Select.Controlled
        control={control}
        name="country"
        label="Country (searchable + controlled)"
        placeholder="Select a country"
        options={options}
        searchable
        onSearch={handleSearch}
        type="fullscreen"
      />
      <Text style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>
        {JSON.stringify(watch(), null, 2)}
      </Text>
    </View>
  );
};

export const ControlledSearchable: StoryObj = {
  render: () => <ControlledSearchableExample />,
};

// ─── Edge cases ───────────────────────────────────────────────────────────────

export const EmptyOptions: Story = {
  render: () => <StatefulSelect label="Empty list" options={[]} />,
};

export const EmptyOptionsSearchable: Story = {
  render: () => (
    <StatefulSelect label="Empty + searchable" options={[]} searchable />
  ),
};

export const LongLabels: Story = {
  render: () => (
    <StatefulSelect
      label="Long option labels"
      options={[
        {
          label: 'This is a very long option label that might overflow',
          value: 1,
        },
        {
          label: 'Another considerably long option description here',
          value: 2,
        },
        { label: 'Short', value: 3 },
      ]}
    />
  ),
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: StoryObj = {
  render: () => (
    <View style={{ gap: 16 }}>
      <TextField placeholder="TextField for reference" label="Label" />

      <SectionLabel title="Base" />
      <StatefulSelect options={SIMPLE_OPTIONS} />
      <StatefulSelect label="With label" options={SIMPLE_OPTIONS} />
      <StatefulSelect
        label="Custom placeholder"
        placeholder="Pick one..."
        options={SIMPLE_OPTIONS}
      />

      <SectionLabel title="Types" />
      <StatefulSelect
        label="Fullscreen"
        options={MONTH_OPTIONS}
        type="fullscreen"
      />
      <StatefulSelect label="Sheet" options={MONTH_OPTIONS} type="sheet" />

      <SectionLabel title="Icons" />
      <StatefulSelect label="With icons" options={ICON_OPTIONS} />

      <SectionLabel title="Searchable" />
      <StatefulSelect
        label="Searchable (no handler)"
        options={MONTH_OPTIONS}
        searchable
      />

      <StatefulSelect
        label="Searchable sheet (no handler)"
        options={MONTH_OPTIONS}
        searchable
        type="sheet"
      />

      <SectionLabel title="Disabled" />
      <StatefulSelect
        label="Disabled empty"
        options={SIMPLE_OPTIONS}
        disabled
      />
      <Select
        label="Disabled with value"
        options={SIMPLE_OPTIONS}
        value={1}
        onChange={() => {}}
        disabled
      />

      <SectionLabel title="Edge cases" />
      <StatefulSelect label="Empty list" options={[]} />
      <StatefulSelect
        label="Long labels"
        options={[
          {
            label: 'This is a very long option label that might overflow',
            value: 1,
          },
          { label: 'Short', value: 2 },
        ]}
      />
    </View>
  ),
};
