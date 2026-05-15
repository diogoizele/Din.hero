import React from 'react';
import { DimensionValue, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

import { Container } from '../../../../.rnstorybook/Container';
import { Shimmer } from './Shimmer';

const meta: Meta<typeof Shimmer> = {
  title: 'Components/Shimmer',
  component: Shimmer,
  decorators: [
    Story => (
      <Container style={{ padding: 24 }}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    isLoading: {
      control: 'boolean',
    },
    borderRadius: {
      control: {
        type: 'range',
        min: 0,
        max: 32,
        step: 2,
      },
    },
  },
  args: {
    isLoading: true,
    borderRadius: 4,
  },
};

export default meta;

type Story = StoryObj<typeof Shimmer>;

const Block = ({
  width = '100%',
  height,
  borderRadius = 4,
}: {
  width?: DimensionValue;
  height: number;
  borderRadius?: number;
}) => (
  <View
    style={{
      width,
      height,
      borderRadius,
      backgroundColor: '#FFF',
    }}
  />
);

// ───────────────────────────────────────────────────────────────────────────────

export const All: Story = {
  render: args => (
    <View style={{ gap: 12 }}>
      <Shimmer {...args}>
        <Block height={16} />
      </Shimmer>

      <Shimmer {...args}>
        <Block height={24} />
      </Shimmer>

      <Shimmer {...args} borderRadius={8}>
        <Block height={48} borderRadius={8} />
      </Shimmer>

      <Shimmer {...args} borderRadius={24}>
        <Block width={48} height={48} borderRadius={24} />
      </Shimmer>
    </View>
  ),
};

// ───────────────────────────────────────────────────────────────────────────────

export const Heights: Story = {
  render: args => (
    <View style={{ gap: 12 }}>
      <Shimmer {...args}>
        <Block height={8} />
      </Shimmer>

      <Shimmer {...args}>
        <Block height={12} />
      </Shimmer>

      <Shimmer {...args}>
        <Block height={16} />
      </Shimmer>

      <Shimmer {...args}>
        <Block height={24} />
      </Shimmer>

      <Shimmer {...args}>
        <Block height={40} />
      </Shimmer>
    </View>
  ),
};

// ───────────────────────────────────────────────────────────────────────────────

export const BorderRadii: Story = {
  render: args => (
    <View style={{ gap: 12 }}>
      <Shimmer {...args} borderRadius={0}>
        <Block height={40} borderRadius={0} />
      </Shimmer>

      <Shimmer {...args} borderRadius={4}>
        <Block height={40} borderRadius={4} />
      </Shimmer>

      <Shimmer {...args} borderRadius={8}>
        <Block height={40} borderRadius={8} />
      </Shimmer>

      <Shimmer {...args} borderRadius={20}>
        <Block height={40} borderRadius={20} />
      </Shimmer>
    </View>
  ),
};

// ───────────────────────────────────────────────────────────────────────────────

export const Widths: Story = {
  render: args => (
    <View style={{ gap: 12 }}>
      <Shimmer {...args}>
        <Block height={16} width="100%" />
      </Shimmer>

      <Shimmer {...args}>
        <Block height={16} width="75%" />
      </Shimmer>

      <Shimmer {...args}>
        <Block height={16} width="50%" />
      </Shimmer>

      <Shimmer {...args}>
        <Block height={16} width="25%" />
      </Shimmer>
    </View>
  ),
};

// ───────────────────────────────────────────────────────────────────────────────

export const ContentCard: Story = {
  render: args => (
    <View style={{ gap: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          alignItems: 'center',
        }}>
        <Shimmer {...args} borderRadius={20}>
          <Block width={40} height={40} borderRadius={20} />
        </Shimmer>

        <View style={{ flex: 1, gap: 8 }}>
          <Shimmer {...args} borderRadius={4}>
            <Block height={12} width="55%" borderRadius={4} />
          </Shimmer>

          <Shimmer {...args} borderRadius={4}>
            <Block height={10} width="35%" borderRadius={4} />
          </Shimmer>
        </View>
      </View>

      <Shimmer {...args} borderRadius={4}>
        <Block height={12} borderRadius={4} />
      </Shimmer>

      <Shimmer {...args} borderRadius={4}>
        <Block height={12} borderRadius={4} />
      </Shimmer>

      <Shimmer {...args} borderRadius={4}>
        <Block height={12} width="80%" borderRadius={4} />
      </Shimmer>

      <Shimmer {...args} borderRadius={8}>
        <Block height={40} borderRadius={8} />
      </Shimmer>
    </View>
  ),
};

// ───────────────────────────────────────────────────────────────────────────────

export const ListRows: Story = {
  render: args => (
    <View style={{ gap: 16 }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
          }}>
          <Shimmer {...args} borderRadius={8}>
            <Block width={44} height={44} borderRadius={8} />
          </Shimmer>

          <View style={{ flex: 1, gap: 8 }}>
            <Shimmer {...args} borderRadius={4}>
              <Block height={12} width="65%" borderRadius={4} />
            </Shimmer>

            <Shimmer {...args} borderRadius={4}>
              <Block height={10} width="40%" borderRadius={4} />
            </Shimmer>
          </View>

          <Shimmer {...args} borderRadius={4}>
            <Block width={32} height={12} borderRadius={4} />
          </Shimmer>
        </View>
      ))}
    </View>
  ),
};

// ───────────────────────────────────────────────────────────────────────────────

export const LoadedState: Story = {
  args: {
    isLoading: false,
  },
  render: args => (
    <View style={{ gap: 12 }}>
      <Shimmer {...args} borderRadius={8}>
        <View
          style={{
            height: 48,
            borderRadius: 8,
            backgroundColor: '#E5E7EB',
          }}
        />
      </Shimmer>

      <Shimmer {...args} borderRadius={4}>
        <View
          style={{
            height: 16,
            width: '70%',
            borderRadius: 4,
            backgroundColor: '#E5E7EB',
          }}
        />
      </Shimmer>
    </View>
  ),
};
