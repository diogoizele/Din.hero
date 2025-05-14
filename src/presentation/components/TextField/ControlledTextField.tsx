import { TextInputProps } from 'react-native';
import React from 'react';
import { Control, Controller, ControllerProps } from 'react-hook-form';
import TextField from './TextField';

type UnionTextInputProps = TextInputProps & Omit<ControllerProps, 'render'>;

export interface ControlledTextFieldProps extends UnionTextInputProps {
  name: string;
  control: Control<any, any, any>;
  placeholder?: string;
  type?: 'text' | 'date';
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
