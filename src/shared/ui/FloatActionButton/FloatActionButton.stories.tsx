import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

import { Container } from '../../../../.rnstorybook/Container';

import { FloatActionButton } from './FloatActionButton';

const fnPress = () => {
  // noop
};

const FABFrame = ({ children }: React.PropsWithChildren) => (
  <View
    style={{
      width: 140,
      height: 140,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 16,
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#FFFFFF',
    }}>
    {children}
  </View>
);

const FABGrid = ({ children }: React.PropsWithChildren) => (
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    }}>
    {children}
  </View>
);

const meta: Meta<typeof FloatActionButton> = {
  title: 'Components/FloatActionButton',
  component: FloatActionButton,
  decorators: [
    Story => (
      <Container
        style={{
          padding: 24,
          gap: 24,
        }}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: [
        'plus',
        'close',
        'menu',
        'search',
        'calendar',
        'home',
        'pen',
        'trash',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'warning', 'danger', 'success'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    icon: 'plus',
    onPress: fnPress,
    size: 'default',
    color: 'primary',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof FloatActionButton>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: args => (
    <FABFrame>
      <FloatActionButton {...args} />
    </FABFrame>
  ),
};

// ─── All ──────────────────────────────────────────────────────────────────────

export const All: Story = {
  render: () => (
    <FABGrid>
      <FABFrame>
        <FloatActionButton icon="plus" color="primary" onPress={fnPress} />
      </FABFrame>

      <FABFrame>
        <FloatActionButton icon="plus" color="warning" onPress={fnPress} />
      </FABFrame>

      <FABFrame>
        <FloatActionButton icon="plus" color="danger" onPress={fnPress} />
      </FABFrame>

      <FABFrame>
        <FloatActionButton icon="plus" color="success" onPress={fnPress} />
      </FABFrame>

      <FABFrame>
        <FloatActionButton icon="plus" size="sm" onPress={fnPress} />
      </FABFrame>

      <FABFrame>
        <FloatActionButton icon="plus" disabled onPress={fnPress} />
      </FABFrame>
    </FABGrid>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <FABGrid>
      <FABFrame>
        <FloatActionButton icon="plus" size="sm" onPress={fnPress} />
      </FABFrame>

      <FABFrame>
        <FloatActionButton icon="plus" size="default" onPress={fnPress} />
      </FABFrame>
    </FABGrid>
  ),
};

// ─── Colors ───────────────────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <FABGrid>
      {(['primary', 'warning', 'danger', 'success'] as const).map(color => (
        <FABFrame key={color}>
          <FloatActionButton icon="plus" color={color} onPress={fnPress} />
        </FABFrame>
      ))}
    </FABGrid>
  ),
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <FABGrid>
      <FABFrame>
        <FloatActionButton icon="plus" onPress={fnPress} />
      </FABFrame>

      <FABFrame>
        <FloatActionButton icon="plus" disabled onPress={fnPress} />
      </FABFrame>
    </FABGrid>
  ),
};

// ─── Icons ────────────────────────────────────────────────────────────────────

export const Icons: Story = {
  render: () => (
    <FABGrid>
      {[
        'plus',
        'close',
        'menu',
        'search',
        'calendar',
        'home',
        'pen',
        'trash',
      ].map(icon => (
        <FABFrame key={icon}>
          <FloatActionButton icon={icon as never} onPress={fnPress} />
        </FABFrame>
      ))}
    </FABGrid>
  ),
};

// ─── Size × Color Matrix ──────────────────────────────────────────────────────

export const SizeColorMatrix: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {(['sm', 'default'] as const).map(size => (
        <FABGrid key={size}>
          {(['primary', 'warning', 'danger', 'success'] as const).map(color => (
            <FABFrame key={`${size}-${color}`}>
              <FloatActionButton
                icon="plus"
                size={size}
                color={color}
                onPress={fnPress}
              />
            </FABFrame>
          ))}
        </FABGrid>
      ))}
    </View>
  ),
};

// ─── Full Surface Matrix ──────────────────────────────────────────────────────

export const FullMatrix: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {(['sm', 'default'] as const).map(size => (
        <FABGrid key={size}>
          {(['primary', 'warning', 'danger', 'success'] as const).flatMap(
            color =>
              (['plus', 'search', 'pen', 'trash'] as const).map(icon => (
                <FABFrame key={`${size}-${color}-${icon}`}>
                  <FloatActionButton
                    icon={icon}
                    size={size}
                    color={color}
                    disabled={icon === 'trash'}
                    onPress={fnPress}
                  />
                </FABFrame>
              )),
          )}
        </FABGrid>
      ))}
    </View>
  ),
};
