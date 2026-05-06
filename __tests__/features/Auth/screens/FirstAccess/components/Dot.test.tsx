import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useSharedValue } from 'react-native-reanimated';

import { Dot } from '@features/Auth/screens/FirstAccess/components/Dot';

describe('Dot', () => {
  const createScrollX = (value: number) =>
    ({ value } as ReturnType<typeof useSharedValue<number>>);

  it('renders without crashing', () => {
    const { toJSON } = render(
      <Dot
        index={0}
        scrollX={createScrollX(0)}
        color="#FFFFFF"
        onPress={jest.fn()}
      />,
    );

    expect(toJSON()).not.toBeNull();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();

    const { getByRole } = render(
      <Dot
        index={0}
        scrollX={createScrollX(0)}
        color="#FFFFFF"
        onPress={onPressMock}
      />,
    );

    const pressable = getByRole('tab');

    fireEvent.press(pressable);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('handles press in and press out without crashing', () => {
    const { getByRole } = render(
      <Dot
        index={0}
        scrollX={createScrollX(0)}
        color="#FFFFFF"
        onPress={jest.fn()}
      />,
    );

    const pressable = getByRole('tab');

    fireEvent(pressable, 'pressIn');
    fireEvent(pressable, 'pressOut');

    expect(pressable).toBeTruthy();
  });

  it('matches snapshot for active dot', () => {
    const { toJSON } = render(
      <Dot
        index={0}
        scrollX={createScrollX(0)}
        color="#FFFFFF"
        onPress={jest.fn()}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot for inactive dot', () => {
    const { toJSON } = render(
      <Dot
        index={1}
        scrollX={createScrollX(0)}
        color="#FFFFFF"
        onPress={jest.fn()}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
