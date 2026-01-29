import { undefinedResolver } from '@core/helpers/guards';

describe('undefinedResolver', () => {
  it('returns null when value is undefined', () => {
    expect(undefinedResolver(undefined)).toBeNull();
  });

  it('returns null as-is (does not change null)', () => {
    expect(undefinedResolver(null)).toBeNull();
  });

  it('keeps 0 as-is', () => {
    expect(undefinedResolver(0)).toBe(0);
  });

  it('keeps empty string as-is', () => {
    expect(undefinedResolver('')).toBe('');
  });

  it('keeps false as-is', () => {
    expect(undefinedResolver(false)).toBe(false);
  });

  it('keeps objects as-is', () => {
    const obj = { foo: 'bar' };
    expect(undefinedResolver(obj)).toBe(obj);
  });

  it('keeps arrays as-is', () => {
    const arr = [1, 2, 3];
    expect(undefinedResolver(arr)).toBe(arr);
  });
});
