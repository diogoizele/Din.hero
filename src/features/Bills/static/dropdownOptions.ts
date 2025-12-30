import { Category, Frequency } from '../types';

export const categoryOptions = [
  { label: 'Moradia', value: Category.GROCERIES },
  { label: 'Transporte', value: Category.TRANSPORT },
  { label: 'Alimentação', value: Category.FOOD },
  { label: 'Assinatura', value: Category.SUBSCRIPTION },
  { label: 'Telefonia e Internet', value: Category.PHONE_INTERNET },
  { label: 'Saúde', value: Category.HEALTH },
  { label: 'Educação', value: Category.EDUCATION },
  { label: 'Lazer', value: Category.LEISURE },
  { label: 'Pets', value: Category.PETS },
  { label: 'Fatura do Cartão', value: Category.CREDIT_CARD },
  { label: 'Imprevistos', value: Category.UNEXPECTED },
  { label: 'Outros', value: Category.OTHERS },
];

export const frequencyOptions = [
  { label: 'Mensal', value: Frequency.MONTHLY },
  { label: 'Semestral', value: Frequency.BIANNUAL },
  { label: 'Anual', value: Frequency.YEARLY },
];
