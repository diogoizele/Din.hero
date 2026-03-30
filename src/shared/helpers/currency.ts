export const currencyFormat = (value: number): string => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return formatter.format(value);
};

export const currencyParse = (value?: string): number | null => {
  if (!value) {
    return null;
  }

  const parsedValue = value.replace(/\D/g, '');
  return parseFloat(parsedValue) / 100;
};
