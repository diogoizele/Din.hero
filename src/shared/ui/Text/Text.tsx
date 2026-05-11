import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

import { useTheme } from '@shared/hooks';

export interface TextProps extends RNTextProps {
  color?: string;
  size?: number;
}

export function Text({ style, color, size = 14, ...props }: TextProps) {
  const { colors } = useTheme();
  return (
    <RNText
      style={[
        styles.text,
        { color: color ?? colors.textPrimary, fontSize: size },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Regular',
  },
});
