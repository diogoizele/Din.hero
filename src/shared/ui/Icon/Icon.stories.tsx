import React, { memo, use, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

import { Container } from '../../../../.rnstorybook/Container';

import { Text } from '@shared/ui';
import { Theme } from '@shared/theme';
import { useStyled } from '@shared/hooks';

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

        <IconsList icons={svgIcons} />
      </View>

      <View style={{ gap: 16 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
          }}>
          FontAwesome6 Icons
        </Text>

        <IconsList icons={fontAwesomeIcons} />
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

          <IconsList icons={iconNames.slice(0, 9)} size={size} />
        </View>
      ))}
    </View>
  ),
};

// ─── Colors ───────────────────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => {
    return (
      <View style={{ gap: 24 }}>
        {[
          { label: 'Default', color: undefined },
          { label: 'Blue', color: '#2563EB' },
          { label: 'Green', color: '#16A34A' },
          { label: 'Amber', color: '#D97706' },
          { label: 'Red', color: '#DC2626' },
        ].map(({ label, color }) => (
          <View key={label} style={{ gap: 12 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
              }}>
              {label}
            </Text>

            <IconsList icons={iconNames.slice(0, 9)} color={color} />
          </View>
        ))}
      </View>
    );
  },
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

          <IconsList icons={iconNames.slice(0, 9)} opacity={opacity} />
        </View>
      ))}
    </View>
  ),
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

export const SvgIcons: Story = {
  render: () => <IconsList icons={svgIcons} />,
};

// ─── FontAwesome6 Icons ───────────────────────────────────────────────────────

export const FontAwesomeIcons: Story = {
  render: () => <IconsList icons={fontAwesomeIcons} />,
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

          <IconsList
            icons={iconNames.slice(0, 9)}
            size={config.size}
            color={config.color}
            opacity={config.opacity}
          />
        </View>
      ))}
    </View>
  ),
};

type __internal_StoryIconType = {
  icons: IconName[];
  size?: number;
  color?: string;
  opacity?: number;
};

const IconsList = memo(
  ({ icons, color, opacity, size }: __internal_StoryIconType) => {
    const [styles] = useStyled(createStyles);

    const sortedIcons = useMemo(() => [...icons].sort(), [icons]);

    const renderItem = useCallback(
      ({ item: name }: { item: IconName }) => (
        <View style={styles.iconCard}>
          <Icon name={name} size={size} color={color} opacity={opacity} />

          <Text style={styles.iconName}>{name}</Text>
        </View>
      ),
      [size, color, opacity],
    );

    return (
      <FlatList
        data={sortedIcons}
        keyExtractor={__keyExtractor}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
        removeClippedSubviews
        initialNumToRender={18}
        windowSize={5}
      />
    );
  },
);

const __keyExtractor = (name: IconName) => name;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      gap: 16,
      marginBottom: 16,
      justifyContent: 'space-between',
    },
    iconCard: {
      width: 80,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    iconName: {
      fontSize: 12,
      textAlign: 'center',
    },
  });
