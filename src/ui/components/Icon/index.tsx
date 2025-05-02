import { Colors } from 'react-native-ui-lib';
import { iconObjectMapper } from './icon-object-mapper';

export interface IconProps {
  name: keyof typeof iconObjectMapper;
  size?: number;
  color?: string;
}

function Icon({ name, color = Colors.white, size = 36 }: IconProps) {
  const SvgIcon = iconObjectMapper[name]?.component;

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  const colorProp = iconObjectMapper[name].colorProp;
  const fillProp = colorProp === 'fill' ? color : undefined;
  const strokeProp = colorProp === 'stroke' ? color : undefined;

  return (
    <SvgIcon width={size} height={size} fill={fillProp} stroke={strokeProp} />
  );
}

export default Icon;
