import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

import { useTheme } from '@shared/hooks';

import { iconRegistry, IconName } from './iconRegistry';
import { FontAwesomeIconEntry, SVGIconEntry } from './Icon.types';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_SIZE = 24;

function renderSvgIcon(
  entry: SVGIconEntry,
  size: number,
  color: string,
  opacity: number,
  style?: StyleProp<ViewStyle>,
) {
  const SvgComponent = entry.component;

  return (
    <SvgComponent
      width={size}
      height={size}
      color={color}
      opacity={opacity}
      style={style}
      fill={entry.colorProp === 'fill' ? color : undefined}
      stroke={entry.colorProp === 'stroke' ? color : undefined}
    />
  );
}

function renderFontAwesomeIcon(
  entry: FontAwesomeIconEntry,
  size: number,
  color: string,
  opacity: number,
  style?: StyleProp<ViewStyle>,
) {
  return (
    <FontAwesome6
      name={entry.name as any}
      iconStyle={entry.style}
      size={size}
      color={color}
      style={[{ opacity }, style]}
    />
  );
}

const PROVIDER_RENDERERS = {
  svg: renderSvgIcon,
  fontawesome6: renderFontAwesomeIcon,
} as const;

function IconComponent({
  name,
  size = DEFAULT_SIZE,
  color,
  opacity = 1,
  style,
}: IconProps) {
  const theme = useTheme();

  const entry = iconRegistry[name];

  if (!entry) {
    return null;
  }

  const resolvedColor = color ?? theme.colors.textPrimary;

  const renderer = PROVIDER_RENDERERS[entry.provider];

  return renderer(entry as never, size, resolvedColor, opacity, style);
}

function areEqual(prev: IconProps, next: IconProps) {
  return (
    prev.name === next.name &&
    prev.size === next.size &&
    prev.color === next.color &&
    prev.opacity === next.opacity &&
    prev.style === next.style
  );
}

export const Icon = memo(IconComponent, areEqual);

export default Icon;
