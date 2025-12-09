import { Colors } from 'react-native-ui-lib';

import { iconObjectMapper } from './icon-object-mapper';

export type IconName = keyof typeof iconObjectMapper;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  opacity?: number;
}

function Icon({
  name,
  color = Colors.white,
  size = 36,
  opacity = 1,
}: IconProps) {
  const SvgIcon = iconObjectMapper[name];

  if (!SvgIcon) {
    return null;
  }

  const { colorProp, component: SvgIconComponent } = SvgIcon;

  const fillProp = colorProp === 'fill' ? color : undefined;
  const strokeProp = colorProp === 'stroke' ? color : undefined;

  const iconStyle = {
    opacity,
  };

  return (
    <SvgIconComponent
      width={size}
      height={size}
      fill={fillProp}
      style={iconStyle}
      stroke={strokeProp}
    />
  );
}

export default Icon;
