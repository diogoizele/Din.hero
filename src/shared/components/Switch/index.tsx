import React from 'react';
import { Control, Controller, ControllerProps } from 'react-hook-form';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import {
  Colors,
  Switch as RNUILibSwitch,
  SwitchProps as RNUILibSwitchProps,
} from 'react-native-ui-lib';

type UnionProps = RNUILibSwitchProps & Omit<ControllerProps, 'render'>;

export interface SwitchProps extends UnionProps {
  control?: Control<any, any, any>;
}

function Switch({
  thumbColor = Colors.white,
  onColor = Colors.secondary,
  offColor = Colors.$textNeutralLight,
  thumbSize = 20,
  onPress,
  ...props
}: SwitchProps) {
  const switchGesture = Gesture.Tap();

  const wrapperGesture = Gesture.Tap()
    .simultaneousWithExternalGesture(switchGesture)
    .onEnd(() => {
      if (typeof onPress === 'function') {
        runOnJS(onPress)();
      }
    });

  if (!props.control) {
    return (
      <GestureDetector gesture={wrapperGesture}>
        <RNUILibSwitch
          {...props}
          onColor={onColor}
          offColor={offColor}
          thumbColor={thumbColor}
          thumbSize={thumbSize}
          onPress={onPress}
        />
      </GestureDetector>
    );
  }

  return (
    <Controller
      {...props}
      render={({ field: { value, onChange } }) => (
        <GestureDetector gesture={wrapperGesture}>
          <RNUILibSwitch
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

export default Switch;
