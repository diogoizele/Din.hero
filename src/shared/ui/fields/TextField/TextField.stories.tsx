import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-native';

import { Container } from '../../../../../.rnstorybook/Container';
import { TextField } from './TextField';

const meta = {
  title: 'Fields/TextField',
  component: TextField,
  decorators: [
    Story => (
      <Container style={{ padding: 24, gap: 24 }}>
        <Story />
      </Container>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

// ─── Base ─────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Full name',
    placeholder: 'John Doe',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    secureTextEntry: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    value: 'Cannot edit this',
  },
  render: args => <TextField {...args} disabled />,
};

// ─── Keyboard types ───────────────────────────────────────────────────────────

export const Email: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoCorrect: false,
  },
};

export const Numeric: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    keyboardType: 'numeric',
  },
};

export const Phone: Story = {
  args: {
    label: 'Phone',
    placeholder: '+55 (51) 99999-9999',
    keyboardType: 'phone-pad',
  },
};

// ─── Multiline ────────────────────────────────────────────────────────────────

export const Multiline: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Write something...',
    multiline: true,
    numberOfLines: 4,
    style: { minHeight: 96, textAlignVertical: 'top' },
  },
};

// ─── Controlled (react-hook-form) ─────────────────────────────────────────────

type LoginForm = { email: string; password: string };

function ControlledExample() {
  const { control, watch } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  });

  const values = watch();

  return (
    <View style={{ gap: 16 }}>
      <TextField.Controlled
        control={control}
        name="email"
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextField.Controlled
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
      />
      <Text style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>
        {JSON.stringify(values, null, 2)}
      </Text>
    </View>
  );
}

export const Controlled: StoryObj = {
  render: () => <ControlledExample />,
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: StoryObj = {
  render: () => (
    <View style={{ gap: 16 }}>
      <TextField placeholder="No label" />
      <TextField label="With label" placeholder="With label" />
      <TextField label="Password" placeholder="Secret" secureTextEntry />
      <TextField
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextField label="Disabled" value="Read only value" disabled />
      <TextField
        label="Multiline"
        placeholder="Multiple lines..."
        multiline
        numberOfLines={3}
        style={{ minHeight: 72, textAlignVertical: 'top' }}
      />
    </View>
  ),
};
