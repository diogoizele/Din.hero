import React from 'react';
import { Control, Controller, ControllerProps } from 'react-hook-form';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { Colors, Switch, SwitchProps } from 'react-native-ui-lib';

type UnionProps = SwitchProps & Omit<ControllerProps, 'render'>;

export interface ControlledSwitchProps extends UnionProps {
  control: Control<any, any, any>;
}

function ControlledSwitch({
  thumbColor = Colors.white,
  onColor = Colors.primary,
  offColor = Colors.$textNeutralLight,
  thumbSize = 20,
  onPress,
  ...props
}: ControlledSwitchProps) {
  const switchGesture = Gesture.Tap();

  const wrapperGesture = Gesture.Tap()
    .simultaneousWithExternalGesture(switchGesture)
    .onEnd(() => {
      if (typeof onPress === 'function') {
        runOnJS(onPress)();
      }
    });

  return (
    <Controller
      {...props}
      render={({ field: { value, onChange } }) => (
        <GestureDetector gesture={wrapperGesture}>
          <Switch
            {...props}
            onColor={onColor}
            offColor={offColor}
            thumbColor={thumbColor}
            thumbSize={thumbSize}
            value={value}
            onValueChange={onChange}
          />
        </GestureDetector>
      )}
    />
  );
}

export default ControlledSwitch;
