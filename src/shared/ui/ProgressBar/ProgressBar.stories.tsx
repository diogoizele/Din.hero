import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

import { Container } from '../../../../.rnstorybook/Container';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  decorators: [
    Story => (
      <Container style={{ padding: 24, gap: 12 }}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    variant: {},
  },
  args: {
    progress: 1,
    total: 2,
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// ─── All (baseline overview) ──────────────────────────────────────────────────

export const All: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <ProgressBar variant="default" progress={1} total={2} />
      <ProgressBar variant="success" progress={1} total={2} />
      <ProgressBar variant="warning" progress={1} total={2} />
      <ProgressBar variant="danger" progress={1} total={2} />

      <ProgressBar variant="default" progress={0} total={1} />
      <ProgressBar variant="default" progress={0.25} total={1} />
      <ProgressBar variant="default" progress={0.33} total={1} />
      <ProgressBar variant="default" progress={0.75} total={1} />
      <ProgressBar variant="default" progress={0.99} total={1} />
      <ProgressBar variant="default" progress={1} total={1} />
    </View>
  ),
};
