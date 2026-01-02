import { DropdownItemProps } from '@core/components/TextField/TextField';
import { Category } from '../types';

export const categoryOptions = [
  { label: 'Habitação', value: Category.HABITATION, icon: 'house' },
  { label: 'Transporte', value: Category.TRANSPORT, icon: 'car' },
  { label: 'Alimentação', value: Category.FOOD, icon: 'utensils' },
  {
    label: 'Assinatura',
    value: Category.SUBSCRIPTION,
    icon: 'file-invoice-dollar',
  },
  {
    label: 'Telefonia e Internet',
    value: Category.PHONE_INTERNET,
    icon: 'wifi',
  },
  { label: 'Saúde', value: Category.HEALTH, icon: 'stethoscope' },
  { label: 'Educação', value: Category.EDUCATION, icon: 'graduation-cap' },
  { label: 'Lazer', value: Category.LEISURE, icon: 'icons' },
  { label: 'Pets', value: Category.PETS, icon: 'paw' },
  {
    label: 'Fatura do Cartão',
    value: Category.CREDIT_CARD,
    icon: 'credit-card',
  },
  {
    label: 'Imprevistos',
    value: Category.UNEXPECTED,
    icon: 'triangle-exclamation',
  },
  { label: 'Outros', value: Category.OTHERS, icon: 'ellipsis' },
] as DropdownItemProps[];
