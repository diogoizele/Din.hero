import { currencyFormat, currencyParse } from '@core/helpers/currency';

describe('currencyFormat', () => {
  it('formats 0 as BRL currency', () => {
    const result = currencyFormat(0);
    expect(result).toBe('R$\u00a00,00'); // "R$ 0,00" with non‑breaking space
  });

  it('formats positive numbers with thousands and decimals', () => {
    const result = currencyFormat(1234.56);
    expect(result).toBe('R$\u00a01.234,56');
  });

  it('formats negative numbers correctly', () => {
    const result = currencyFormat(-99.9);
    expect(result).toBe('-R$\u00a099,90');
  });
});

describe('currencyParse', () => {
  it('returns null when value is undefined', () => {
    expect(currencyParse(undefined)).toBeNull();
  });

  it('returns null when value is empty string', () => {
    expect(currencyParse('')).toBeNull();
  });

  it('parses BRL formatted string with currency symbol and separators', () => {
    const result = currencyParse('R$ 1.234,56');
    expect(result).toBe(1234.56);
  });

  it('parses number string with comma as decimal separator', () => {
    const result = currencyParse('1234,56');
    expect(result).toBe(1234.56);
  });

  it('parses string with only digits as value in cents', () => {
    const result = currencyParse('100');
    expect(result).toBe(1); // 100 cents -> 1.00
  });

  it('parses zero value correctly', () => {
    const result = currencyParse('R$ 0,00');
    expect(result).toBe(0);
  });

  it('ignores non-digit characters', () => {
    const result = currencyParse('R$ -1.234,56 abc');
    expect(result).toBe(1234.56);
  });
});
