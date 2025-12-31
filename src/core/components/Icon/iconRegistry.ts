import { SvgProps } from 'react-native-svg';
import { FC } from 'react';

import Plus from './icons/Plus.svg';
import ArrowLeft from './icons/Arrow-Left.svg';
import Close from './icons/Close.svg';
import Calendar from './icons/Calendar.svg';
import Home from './icons/Home.svg';
import History from './icons/History.svg';
import Menu from './icons/Menu.svg';
import CircleIcon from './icons/CircleInfo.svg';

export const iconRegistry = {
  plus: { provider: 'svg', component: Plus, colorProp: 'stroke' },
  'arrow-left': { provider: 'svg', component: ArrowLeft, colorProp: 'stroke' },
  close: { provider: 'svg', component: Close, colorProp: 'fill' },
  calendar: { provider: 'svg', component: Calendar, colorProp: 'fill' },
  home: { provider: 'svg', component: Home, colorProp: 'fill' },
  history: { provider: 'svg', component: History, colorProp: 'fill' },
  menu: { provider: 'svg', component: Menu, colorProp: 'fill' },
  info: { provider: 'svg', component: CircleIcon, colorProp: 'fill' },
  car: { provider: 'fontawesome6', name: 'car', style: 'solid' },
} as const;

export type IconSVGEntry = {
  provider: 'svg';
  component: FC<SvgProps>;
  colorProp: 'fill' | 'stroke';
};
