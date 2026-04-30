import React from 'react';
import { render } from '@testing-library/react-native';
import { useSharedValue } from 'react-native-reanimated';

import { Dot } from '@features/Auth/screens/FirstAccess/components/Dot';

describe('Dot', () => {
  it('renders without crashing given a valid index and color', () => {
    const scrollX = { value: 0 } as ReturnType<typeof useSharedValue<number>>;
    const { toJSON } = render(
      <Dot index={0} scrollX={scrollX} color="#FFFFFF" />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('matches snapshot for active dot (index 0, scrollX at 0)', () => {
    const scrollX = { value: 0 } as ReturnType<typeof useSharedValue<number>>;
    const { toJSON } = render(
      <Dot index={0} scrollX={scrollX} color="#FFFFFF" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot for inactive dot (index 1, scrollX at 0)', () => {
    const scrollX = { value: 0 } as ReturnType<typeof useSharedValue<number>>;

    const { toJSON } = render(
      <Dot index={1} scrollX={scrollX} color="#FFFFFF" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
