import { Control, FieldValues, Path } from 'react-hook-form';
import { IconProps } from '@shared/components/Icon';
import { createStyles } from './Select.styles';

export interface SelectOption {
  label: string;
  value: string | number;
  icon?: IconProps['name'];
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number | undefined) => void;
  disabled?: boolean;
  type?: 'sheet' | 'fullscreen';
  searchable?: boolean;
  onSearch?: (text: string) => void;
}

export interface ControlledSelectProps<T extends FieldValues>
  extends Omit<SelectProps, 'value' | 'onChange'> {
  control: Control<T>;
  name: Path<T>;
}

export type OptionItemProps = {
  item: SelectOption;
  isSelected: boolean;
  onSelect: (value: string | number) => void;
  styles: ReturnType<typeof createStyles>;
};
