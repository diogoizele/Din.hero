
import { FontAwesome6IconName } from '@react-native-vector-icons/fontawesome6';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

export type SVGIconEntry = {
  provider: 'svg';
  component: FC<SvgProps>;
  colorProp: 'fill' | 'stroke';
};

export type FontAwesomeIconEntry = {
  provider: 'fontawesome6';
  name: FontAwesome6IconName
  style: 'solid' | 'regular' | 'brand'
};

export type IconRegistryEntry =
  | SVGIconEntry
  | FontAwesomeIconEntry;
