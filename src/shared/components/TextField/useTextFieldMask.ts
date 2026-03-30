import { useEffect, useState } from 'react';
import { masks } from '.';
import { TextFieldProps } from './TextField';

interface Props
  extends Pick<TextFieldProps, 'mask' | 'format' | 'parse' | 'onChangeText'> {}

function useTextFieldMask({ mask, format, parse, onChangeText }: Props) {
  const [prefix, setPrefix] = useState<string>();

  const maskFunction = masks[mask as keyof typeof masks];

  const handleFormat = (inputValue?: string) => {
    if (!inputValue) {
      return '';
    }

    if (maskFunction) {
      return maskFunction.format(inputValue);
    }

    if (typeof format === 'function') {
      return format(inputValue);
    }

    return inputValue;
  };

  const handleParse = (inputValue: string | Date) => {
    if (typeof inputValue === 'string') {
      if (maskFunction) {
        const parsed = maskFunction.parse(inputValue);

        onChangeText?.(parsed);
      } else {
        const parsed = parse ? parse(inputValue) : inputValue;

        onChangeText?.(parsed);
      }
    }
  };

  useEffect(() => {
    if (maskFunction) {
      setPrefix(maskFunction.prefix);
    }
  }, [maskFunction]);

  return {
    handleFormat,
    handleParse,
    prefix,
  };
}

export default useTextFieldMask;
