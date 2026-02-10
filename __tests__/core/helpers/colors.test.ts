import { applyOpacity } from '@core/helpers/colors';

describe('applyOpacity', () => {
  describe('opacity clamping', () => {
    it('lower clamp', () => {
      expect(applyOpacity('#ff0000', -1)).toBe('#FF000000');
      expect(applyOpacity('#ff0000', -999)).toBe('#FF000000');
    });

    it('upper clamp', () => {
      expect(applyOpacity('#ff0000', 2)).toBe('#FF0000FF');
      expect(applyOpacity('#ff0000', 999)).toBe('#FF0000FF');
    });

    it('valid range', () => {
      expect(applyOpacity('#ff0000', 0)).toBe('#FF000000');
      expect(applyOpacity('#ff0000', 0.5)).toBe('#FF000080');
      expect(applyOpacity('#ff0000', 1)).toBe('#FF0000FF');
    });
  });

  describe('padHex via RGB values', () => {
    it('low digits (0-15)', () => {
      expect(applyOpacity('#000000', 0.5)).toBe('#00000080');
      expect(applyOpacity('#0f0000', 0.5)).toBe('#0F000080');
      expect(applyOpacity('#000f00', 0.5)).toBe('#000F0080');
      expect(applyOpacity('#00000f', 0.5)).toBe('#00000F80');
    });

    it('high digits (16-255)', () => {
      expect(applyOpacity('#ff0000', 0.5)).toBe('#FF000080');
      expect(applyOpacity('#10ff00', 0.5)).toBe('#10FF0080');
      expect(applyOpacity('#a0b0c0', 0.5)).toBe('#A0B0C080');
    });

    it('alpha padding (0-255)', () => {
      expect(applyOpacity('#ff0000', 0.05)).toBe('#FF00000D');
      expect(applyOpacity('#ff0000', 0.1)).toBe('#FF00001A');
      expect(applyOpacity('#ff0000', 0.99)).toBe('#FF0000FC');
    });
  });

  describe('normalizeHexStrict (tolerant=false)', () => {
    it('3 digits expanded', () => {
      expect(applyOpacity('#f00', 0.5)).toBe('#FF000080');
      expect(applyOpacity('#0f0', 0.5)).toBe('#00FF0080');
      expect(applyOpacity('#abc', 0.5)).toBe('#AABBCC80');
      expect(applyOpacity('abc', 0.5)).toBe('#AABBCC80');
    });

    it('6 digits', () => {
      expect(applyOpacity('#ff0000', 0.5)).toBe('#FF000080');
      expect(applyOpacity('abcdef', 0.5)).toBe('#ABCDEF80');
    });

    it('8 digits (alpha replaced)', () => {
      expect(applyOpacity('#ff0000ff', 0.5)).toBe('#FF000080');
      expect(applyOpacity('#ff000080', 1)).toBe('#FF0000FF');
      expect(applyOpacity('#abcdef12', 0)).toBe('#ABCDEF00');
    });

    it('case insensitive', () => {
      expect(applyOpacity('#FF0000', 0.5)).toBe('#FF000080');
      expect(applyOpacity('#AbCdEf', 0.5)).toBe('#ABCDEF80');
      expect(applyOpacity('#FfF', 0.5)).toBe('#FFFFFF80');
    });

    it('error - invalid lengths', () => {
      expect(() => applyOpacity('#f', 0.5)).toThrow(
        'Hex inválido: esperado 3, 6 ou 8 dígitos, recebeu 1',
      );
      expect(() => applyOpacity('#ff', 0.5)).toThrow(
        'Hex inválido: esperado 3, 6 ou 8 dígitos, recebeu 2',
      );
      expect(() => applyOpacity('#ffff', 0.5)).toThrow(
        'Hex inválido: esperado 3, 6 ou 8 dígitos, recebeu 4',
      );
      expect(() => applyOpacity('#fffff', 0.5)).toThrow(
        'Hex inválido: esperado 3, 6 ou 8 dígitos, recebeu 5',
      );
      expect(() => applyOpacity('#fffffff', 0.5)).toThrow(
        'Hex inválido: esperado 3, 6 ou 8 dígitos, recebeu 7',
      );
      expect(() => applyOpacity('#fffffffff', 0.5)).toThrow(
        'Hex inválido: esperado 3, 6 ou 8 dígitos, recebeu 9',
      );
    });
  });

  describe('normalizeHexTolerant (tolerant=true)', () => {
    it('3, 6, 8 digits normal', () => {
      expect(applyOpacity('#f00', 0.5, true)).toBe('#FF000080');
      expect(applyOpacity('#ff0000', 0.5, true)).toBe('#FF000080');
      expect(applyOpacity('#ff0000ff', 0.5, true)).toBe('#FF000080');
    });

    it('7 digits - keeps (no truncate)', () => {
      expect(applyOpacity('#ff0000f', 0.5, true)).toBe('#FF000080');
      expect(applyOpacity('#abcdef1', 0.8, true)).toBe('#ABCDEFCC');
    });

    it('8 digits - uses all 8', () => {
      expect(applyOpacity('#ff000080', 0.5, true)).toBe('#FF000080');
    });

    it('9-10 digits - truncates to 8', () => {
      expect(applyOpacity('#ff0000809', 0.5, true)).toBe('#FF000080');
      expect(applyOpacity('#ff000080ab', 0.5, true)).toBe('#FF000080');
    });

    it('error - lengths <3 or >10', () => {
      expect(() => applyOpacity('#f', 0.5, true)).toThrow(
        'Hex inválido: comprimento inesperado 1',
      );
      expect(() => applyOpacity('#ff', 0.5, true)).toThrow(
        'Hex inválido: comprimento inesperado 2',
      );
      expect(() => applyOpacity('#ffff', 0.5, true)).toThrow(
        'Hex inválido: comprimento inesperado 4',
      );
      expect(() => applyOpacity('#fffff', 0.5, true)).toThrow(
        'Hex inválido: comprimento inesperado 5',
      );
      expect(() => applyOpacity('#fffffffffff', 0.5, true)).toThrow(
        'Hex inválido: comprimento inesperado 11',
      );
    });
  });

  describe('hexToRgba (RGB conversion)', () => {
    it('primary colors', () => {
      expect(applyOpacity('#ff0000', 0.5)).toBe('#FF000080');
      expect(applyOpacity('#00ff00', 0.5)).toBe('#00FF0080');
      expect(applyOpacity('#0000ff', 0.5)).toBe('#0000FF80');
    });

    it('white and black', () => {
      expect(applyOpacity('#ffffff', 0.5)).toBe('#FFFFFF80');
      expect(applyOpacity('#000000', 0.5)).toBe('#00000080');
    });

    it('intermediate values', () => {
      expect(applyOpacity('#808080', 0.5)).toBe('#80808080');
      expect(applyOpacity('#123456', 0.5)).toBe('#12345680');
    });

    it('existing alpha in hex8 (division by 255)', () => {
      expect(applyOpacity('#ff0000ff', 1)).toBe('#FF0000FF');
      expect(applyOpacity('#ff000080', 1)).toBe('#FF0000FF');
      expect(applyOpacity('#ff000000', 1)).toBe('#FF0000FF');
    });
  });

  describe('rgbaToHex (rounding)', () => {
    it('fractional alpha rounded', () => {
      expect(applyOpacity('#ff0000', 0.501)).toBe('#FF000080');
      expect(applyOpacity('#ff0000', 0.499)).toBe('#FF00007F');
      expect(applyOpacity('#ff0000', 0.333)).toBe('#FF000055');
      expect(applyOpacity('#ff0000', 0.666)).toBe('#FF0000AA');
    });

    it('precise alpha values', () => {
      expect(applyOpacity('#ff0000', 0.25)).toBe('#FF000040');
      expect(applyOpacity('#ff0000', 0.75)).toBe('#FF0000BF');
      expect(applyOpacity('#ff0000', 0.1)).toBe('#FF00001A');
      expect(applyOpacity('#ff0000', 0.9)).toBe('#FF0000E6');
    });
  });

  describe('full integration', () => {
    it('hex3 + extreme opacity + tolerant', () => {
      expect(applyOpacity('#f0f', -10, true)).toBe('#FF00FF00');
      expect(applyOpacity('#0f0', 10, true)).toBe('#00FF00FF');
    });

    it('hex6 uppercase + fractional opacity', () => {
      expect(applyOpacity('#ABCDEF', 0.314159)).toBe('#ABCDEF50');
    });

    it('hex8 + alpha override + tolerant', () => {
      expect(applyOpacity('#12345678', 0.25, true)).toBe('#12345640');
    });

    it('hex9 truncated + clamp + tolerant', () => {
      expect(applyOpacity('#ff0000ffff', 1.5, true)).toBe('#FF0000FF');
    });

    it('all valid hex characters', () => {
      expect(() => applyOpacity('#0123456789abcdef', 0.5)).toThrow(
        'Hex inválido: esperado 3, 6 ou 8 dígitos, recebeu 16',
      );
      expect(() => applyOpacity('#FEDCBA9876543210', 0.5)).toThrow(
        'Hex inválido: esperado 3, 6 ou 8 dígitos, recebeu 16',
      );
    });
  });
});
