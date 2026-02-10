import { capitalize } from '@core/helpers/strings';

describe('capitalize', () => {
  it('should capitalize the first letter of the string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it("should return the same string if it's already capitalized", () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it("should return the same string if it's empty", () => {
    expect(capitalize('')).toBe('');
  });

  it("should return the same strinf if it's uppercase", () => {
    expect(capitalize('HELLO')).toBe('HELLO');
  });
});
