import { Colors } from 'react-native-ui-lib';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

import { iconRegistry, IconSVGEntry } from './iconRegistry';

export type IconName = keyof typeof iconRegistry;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  opacity?: number;
}

function renderSvgIcon(
  entry: IconSVGEntry,
  size: number,
  color: string,
  opacity: number,
) {
  const Svg = entry.component;

  return (
    <Svg
      width={size}
      height={size}
      style={{ opacity }}
      fill={entry.colorProp === 'fill' ? color : 'none'}
      stroke={entry.colorProp === 'stroke' ? color : 'none'}
    />
  );
}

function renderFontAwesomeIcon(
  entry: any,
  size: number,
  color: string,
  opacity: number,
) {
  return (
    <FontAwesome6
      name={entry.name}
      iconStyle={entry.style}
      size={size}
      color={color}
      style={{ opacity }}
    />
  );
}

function Icon({
  name,
  color = Colors.white,
  size = 36,
  opacity = 1,
}: IconProps) {
  const entry = iconRegistry[name];

  if (!entry) {
    return null;
  }

  switch (entry.provider) {
    case 'svg':
      return renderSvgIcon(entry, size, color, opacity);
    case 'fontawesome6':
      return renderFontAwesomeIcon(entry, size, color, opacity);
    default:
      return null;
  }
}

export default Icon;
