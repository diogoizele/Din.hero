import { TextInputProps } from 'react-native';
import React from 'react';
import { Control, Controller, ControllerProps } from 'react-hook-form';
import TextField, { PrimitiveTextFieldProps } from './TextField';

type UnionTextInputProps = TextInputProps &
  Omit<ControllerProps, 'render'> &
  PrimitiveTextFieldProps;

export interface ControlledTextFieldProps extends UnionTextInputProps {
  control: Control<any, any, any>;
}

function ControlledTextField({ ...props }: ControlledTextFieldProps) {
  return (
    <Controller
      {...props}
      render={({ field: { value, onBlur, onChange } }) => (
        <TextField
          {...props}
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
        />
      )}
    />
  );
}

export default ControlledTextField;
