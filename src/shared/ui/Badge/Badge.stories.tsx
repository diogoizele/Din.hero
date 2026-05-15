import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

import { Container } from '../../../../.rnstorybook/Container';
import { Badge } from './Badge';

const fnPress = () => {
  // Alert.alert('Pressed');
};

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  decorators: [
    Story => (
      <Container style={{ padding: 24, gap: 12 }}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger'],
    },
    onPress: {
      control: false,
    },
  },
  args: {
    text: 'Badge',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ─── All (baseline overview) ──────────────────────────────────────────────────

export const All: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Badge text="Default" variant="default" />
      <Badge text="Success" variant="success" />
      <Badge text="Warning" variant="warning" />
      <Badge text="Danger" variant="danger" />

      <Badge text="Interactive" variant="default" onPress={fnPress} />

      <Badge text="Default (outlined)" variant="default" iconStyle="outlined" />
      <Badge text="Success (outlined)" variant="success" iconStyle="outlined" />
      <Badge text="Warning (outlined)" variant="warning" iconStyle="outlined" />
      <Badge text="Danger (outlined)" variant="danger" iconStyle="outlined" />

      <Badge
        text="Interactive (outlined)"
        variant="default"
        iconStyle="outlined"
        onPress={fnPress}
      />
    </View>
  ),
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Badge text="Default" variant="default" />
      <Badge text="Success" variant="success" />
      <Badge text="Warning" variant="warning" />
      <Badge text="Danger" variant="danger" />
    </View>
  ),
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Badge text="Static" variant="default" />

      <Badge text="Pressable" variant="success" onPress={fnPress} />
    </View>
  ),
};

// ─── Variant Matrix ───────────────────────────────────────────────────────────

export const VariantMatrix: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {(['default', 'success', 'warning', 'danger'] as const).map(variant => (
        <Badge key={variant} text={variant} variant={variant} />
      ))}
    </View>
  ),
};

// ─── Long Content ─────────────────────────────────────────────────────────────

export const LongContent: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Badge text="Payment scheduled for tomorrow" variant="default" />

      <Badge text="Invoice overdue for 12 days" variant="danger" />
    </View>
  ),
};

// ─── Interactive Matrix ───────────────────────────────────────────────────────

export const InteractiveMatrix: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      {(['default', 'success', 'warning', 'danger'] as const).map(variant => (
        <Badge
          key={variant}
          text={`${variant} interactive`}
          variant={variant}
          onPress={fnPress}
        />
      ))}
    </View>
  ),
};
