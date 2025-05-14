export function currencyFormatter(value: string): string {
  const cleanedValue = value.replace(/\D/g, '');
  const formattedValue = parseFloat(cleanedValue) / 100;

  if (isNaN(formattedValue) || formattedValue === 0) {
    return '';
  }

  return formattedValue.toLocaleString('pt-BR', {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function currencyParser(value: string): string {
  const cleanedValue = value.replace(/\D/g, '');

  if (parseFloat(cleanedValue) === 0) {
    return '';
  }

  return cleanedValue;
}
