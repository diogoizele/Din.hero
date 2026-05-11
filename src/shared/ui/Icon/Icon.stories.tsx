import React from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

import { Container } from '../../../../.rnstorybook/Container';

import { Icon } from './Icon';
import { iconRegistry, IconName } from './iconRegistry';

const iconNames = Object.keys(iconRegistry) as IconName[];

const svgIcons = iconNames.filter(
  name => iconRegistry[name].provider === 'svg',
);

const fontAwesomeIcons = iconNames.filter(
  name => iconRegistry[name].provider === 'fontawesome6',
);

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  decorators: [
    Story => (
      <Container style={{ padding: 24 }}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: iconNames,
    },
    size: {
      control: { type: 'number' },
    },
    color: {
      control: { type: 'color' },
    },
    opacity: {
      control: {
        type: 'number',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
  },
  args: {
    name: 'home',
    size: 24,
    opacity: 1,
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

function IconGrid({
  icons,
  size = 24,
  color,
  opacity = 1,
}: {
  icons: IconName[];
  size?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
      }}>
      {icons.map(name => (
        <View
          key={name}
          style={{
            width: 88,
            alignItems: 'center',
            gap: 8,
          }}>
          <Icon name={name} size={size} color={color} opacity={opacity} />

          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
            }}>
            {name}
          </Text>
        </View>
      ))}
    </View>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All Icons ────────────────────────────────────────────────────────────────

export const All: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      <View style={{ gap: 16 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
          }}>
          SVG Custom Icons
        </Text>

        <IconGrid icons={svgIcons} />
      </View>

      <View style={{ gap: 16 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
          }}>
          FontAwesome6 Icons
        </Text>

        <IconGrid icons={fontAwesomeIcons} />
      </View>
    </View>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {[16, 20, 24, 32, 40, 48].map(size => (
        <View key={size} style={{ gap: 12 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
            }}>
            {size}px
          </Text>

          <IconGrid icons={iconNames.slice(0, 8)} size={size} />
        </View>
      ))}
    </View>
  ),
};

// ─── Colors ───────────────────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {[
        { label: 'Default', color: undefined },
        { label: 'Primary', color: '#2563EB' },
        { label: 'Success', color: '#16A34A' },
        { label: 'Warning', color: '#D97706' },
        { label: 'Danger', color: '#DC2626' },
      ].map(({ label, color }) => (
        <View key={label} style={{ gap: 12 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
            }}>
            {label}
          </Text>

          <IconGrid icons={iconNames.slice(0, 8)} color={color} />
        </View>
      ))}
    </View>
  ),
};

// ─── Opacity ──────────────────────────────────────────────────────────────────

export const Opacity: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {[1, 0.75, 0.5, 0.25].map(opacity => (
        <View key={opacity} style={{ gap: 12 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
            }}>
            Opacity: {opacity}
          </Text>

          <IconGrid icons={iconNames.slice(0, 8)} opacity={opacity} />
        </View>
      ))}
    </View>
  ),
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

export const SvgIcons: Story = {
  render: () => <IconGrid icons={svgIcons} />,
};

// ─── FontAwesome6 Icons ───────────────────────────────────────────────────────

export const FontAwesomeIcons: Story = {
  render: () => <IconGrid icons={fontAwesomeIcons} />,
};

// ─── Real Usage Surface ───────────────────────────────────────────────────────

export const VariantMatrix: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {[
        { size: 20, color: '#111827', opacity: 1 },
        { size: 24, color: '#2563EB', opacity: 1 },
        { size: 32, color: '#DC2626', opacity: 1 },
        { size: 40, color: '#16A34A', opacity: 0.5 },
      ].map(config => (
        <View
          key={`${config.size}-${config.color}-${config.opacity}`}
          style={{ gap: 12 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
            }}>
            size={config.size} · opacity={config.opacity}
          </Text>

          <IconGrid
            icons={iconNames.slice(0, 8)}
            size={config.size}
            color={config.color}
            opacity={config.opacity}
          />
        </View>
      ))}
    </View>
  ),
};
