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
import ArrowReload from './icons/Arrow-Reload.svg';

export const iconRegistry = {
  plus: { provider: 'svg', component: Plus, colorProp: 'stroke' },
  'arrow-left': { provider: 'svg', component: ArrowLeft, colorProp: 'fill' },
  close: { provider: 'svg', component: Close, colorProp: 'fill' },
  calendar: { provider: 'svg', component: Calendar, colorProp: 'fill' },
  home: { provider: 'svg', component: Home, colorProp: 'fill' },
  history: { provider: 'svg', component: History, colorProp: 'fill' },
  menu: { provider: 'svg', component: Menu, colorProp: 'fill' },
  info: { provider: 'svg', component: CircleIcon, colorProp: 'fill' },
  car: { provider: 'fontawesome6', name: 'car', style: 'solid' },
  house: { provider: 'fontawesome6', name: 'house', style: 'solid' },
  utensils: { provider: 'fontawesome6', name: 'utensils', style: 'solid' },
  'file-invoice-dollar': {
    provider: 'fontawesome6',
    name: 'file-invoice-dollar',
    style: 'solid',
  },
  wifi: { provider: 'fontawesome6', name: 'wifi', style: 'solid' },
  stethoscope: {
    provider: 'fontawesome6',
    name: 'stethoscope',
    style: 'solid',
  },
  'graduation-cap': {
    provider: 'fontawesome6',
    name: 'graduation-cap',
    style: 'solid',
  },
  icons: {
    provider: 'fontawesome6',
    name: 'icons',
    style: 'solid',
  },
  paw: { provider: 'fontawesome6', name: 'paw', style: 'solid' },
  'credit-card': {
    provider: 'fontawesome6',
    name: 'credit-card',
    style: 'solid',
  },
  'triangle-exclamation': {
    provider: 'fontawesome6',
    name: 'triangle-exclamation',
    style: 'solid',
  },
  ellipsis: {
    provider: 'fontawesome6',
    name: 'ellipsis',
    style: 'solid',
  },
  eye: { provider: 'fontawesome6', name: 'eye', style: 'solid' },
  'eye-slash': {
    provider: 'fontawesome6',
    name: 'eye-slash',
    style: 'solid',
  },
  'circle-check': {
    provider: 'fontawesome6',
    name: 'circle-check',
    style: 'solid',
  },
  'circle-exclamation': {
    provider: 'fontawesome6',
    name: 'circle-exclamation',
    style: 'solid',
  },
  'circle-xmark': {
    provider: 'fontawesome6',
    name: 'circle-xmark',
    style: 'solid',
  },
  clock: {
    provider: 'fontawesome6',
    name: 'clock',
    style: 'solid',
  },
  filter: {
    provider: 'fontawesome6',
    name: 'filter',
    style: 'solid',
  },
  user: {
    provider: 'fontawesome6',
    name: 'user',
    style: 'solid',
  },
  pen: {
    provider: 'fontawesome6',
    name: 'pen',
    style: 'solid',
  },
  trash: {
    provider: 'fontawesome6',
    name: 'trash',
    style: 'solid',
  },
  recurring: {
    provider: 'svg',
    component: ArrowReload,
    colorProp: 'stroke',
  },
  "angle-left": {
    provider: 'fontawesome6',
    name: 'angle-left',
    style: 'solid',
  },
} as const;

export type IconSVGEntry = {
  provider: 'svg';
  component: FC<SvgProps>;
  colorProp: 'fill' | 'stroke';
};
