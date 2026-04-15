import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

import { Container } from '../../../../.rnstorybook/Container';
import { Button } from './Button';

const fnPress = () => {
  // Alert.alert('OI');
};

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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
      options: ['contained', 'outlined', 'text'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'warning', 'danger', 'success'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    label: 'Button',
    onPress: () => {},
    variant: 'contained',
    size: 'default',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── All (baseline overview) ──────────────────────────────────────────────────

export const All: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button onPress={fnPress} label="Contained" variant="contained" />
      <Button onPress={fnPress} label="Outlined" variant="outlined" />
      <Button onPress={fnPress} label="Text" variant="text" />

      <Button onPress={fnPress} label="Disabled" disabled />
      <Button onPress={fnPress} label="Loading" loading />
      <Button onPress={fnPress} label="Full width" fullWidth />
    </View>
  ),
};

// ─── Variants (same color, same size) ─────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button onPress={fnPress} label="Contained" variant="contained" />
      <Button onPress={fnPress} label="Outlined" variant="outlined" />
      <Button onPress={fnPress} label="Text" variant="text" />
    </View>
  ),
};

// ─── Sizes (same variant/color) ───────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button onPress={fnPress} label="Small" size="sm" />
      <Button onPress={fnPress} label="Medium" size="default" />
    </View>
  ),
};

// ─── Colors (same variant/size) ───────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button onPress={fnPress} label="Primary" color="primary" />
      <Button onPress={fnPress} label="Secondary" color="warning" />
      <Button onPress={fnPress} label="Danger" color="danger" />
      <Button onPress={fnPress} label="Success" color="success" />
    </View>
  ),
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button onPress={fnPress} label="Default" />
      <Button onPress={fnPress} label="Disabled" disabled />
      <Button onPress={fnPress} label="Loading" loading />
    </View>
  ),
};

// ─── Variant × Color (real usage surface) ─────────────────────────────────────

export const VariantColorMatrix: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {(['contained', 'outlined', 'text'] as const).map(variant => (
        <View key={variant} style={{ gap: 8 }}>
          {(['primary', 'warning', 'danger', 'success'] as const).map(color => (
            <Button
              onPress={fnPress}
              key={`${variant}-${color}`}
              label={`${variant} · ${color}`}
              variant={variant}
              color={color}
            />
          ))}
        </View>
      ))}
    </View>
  ),
};
