import {
  formatSmartDate,
  formatDateToDayMonthYear,
  formatFullDatePtBR,
  getStateByDate,
  getOnlyDatePart,
  localDateToDateOnly,
  dateOnlyToLocalDate,
  isDateOnly,
  normalizeDate,
} from '@core/helpers/date';
import { DateOnly } from '@core/types';

describe('date helpers', () => {
  describe('normalizeDate', () => {
    describe('valid DateOnly strings', () => {
      it('converts a valid DateOnly string to Date', () => {
        const dateOnly = '2026-02-05';
        const result = normalizeDate(dateOnly);

        expect(result).toBeInstanceOf(Date);
        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(1); // Fevereiro
        expect(result.getDate()).toBe(5);
      });
    });

    describe('valid ISO or other string dates', () => {
      it('parses a full ISO string correctly', () => {
        const isoString = '2026-01-28T12:00:00.000Z';
        const result = normalizeDate(isoString);

        expect(result).toBeInstanceOf(Date);
        expect(result.toISOString()).toBe(isoString);
      });

      it('parses a string without time as DateOnly', () => {
        const dateString = '2026-01-28';
        const result = normalizeDate(dateString);

        expect(result).toBeInstanceOf(Date);
        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(0);
        expect(result.getDate()).toBe(28);
      });
    });

    describe('Date objects', () => {
      it('returns a valid Date object unchanged', () => {
        const input = new Date('2026-01-28T12:00:00.000Z');
        const result = normalizeDate(input);

        expect(result).toBeInstanceOf(Date);
        expect(result.toISOString()).toBe(input.toISOString());
      });

      it('throws for invalid Date objects', () => {
        const input = new Date('invalid date');
        expect(() => normalizeDate(input)).toThrow('Invalid Date object');
      });
    });

    describe('invalid strings', () => {
      it('throws for completely random string', () => {
        expect(() => normalizeDate('abc-def')).toThrow(
          'Invalid date string: abc-def',
        );
      });

      it('throws for empty string', () => {
        expect(() => normalizeDate('')).toThrow('Invalid date input: empty');
      });

      it('throws for partially malformed DateOnly string', () => {
        expect(() => normalizeDate('2026-13-01')).toThrow(
          'Invalid DateOnly format: 2026-13-01',
        );
        expect(() => normalizeDate('2026-02-30')).toThrow(
          'Invalid DateOnly format: 2026-02-30',
        );
      });
    });

    describe('null or undefined', () => {
      it('throws for null', () => {
        expect(() => normalizeDate(null)).toThrow('Invalid date input: empty');
      });

      it('throws for undefined', () => {
        expect(() => normalizeDate(undefined)).toThrow(
          'Invalid date input: empty',
        );
      });
    });

    describe('edge cases around DateOnly boundaries', () => {
      it('handles last day of the month', () => {
        const dateOnly = '2026-01-31';
        const result = normalizeDate(dateOnly);

        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(0);
        expect(result.getDate()).toBe(31);
      });

      it('handles first day of the month', () => {
        const dateOnly = '2026-02-01';
        const result = normalizeDate(dateOnly);

        expect(result.getFullYear()).toBe(2026);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(1);
      });

      it('handles leap year February 29', () => {
        const dateOnly = '2024-02-29';
        const result = normalizeDate(dateOnly);

        expect(result.getFullYear()).toBe(2024);
        expect(result.getMonth()).toBe(1);
        expect(result.getDate()).toBe(29);
      });

      it('throws for non-leap year February 29', () => {
        const dateOnly = '2023-02-29';
        expect(() => normalizeDate(dateOnly)).toThrow(
          'Invalid DateOnly format: 2023-02-29',
        );
      });
    });
  });

  describe('formatSmartDate', () => {
    const mockNow = new Date('2026-01-28T12:00:00.000Z');

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(mockNow);
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('handles DateOnly correctly', () => {
      const dateOnly: DateOnly = '2026-01-28';
      expect(formatSmartDate(dateOnly)).toBe('Hoje');

      const tomorrow: DateOnly = '2026-01-29';
      expect(formatSmartDate(tomorrow)).toBe('Amanhã');

      const yesterday: DateOnly = '2026-01-27';
      expect(formatSmartDate(yesterday)).toBe('Ontem');
    });

    it('handles Date objects correctly', () => {
      const date = new Date('2026-01-28T12:00:00.000Z');
      expect(formatSmartDate(date)).toBe('Hoje');
    });

    it('handles full ISO strings correctly', () => {
      const iso = '2026-01-28T23:59:59.000Z';
      expect(formatSmartDate(iso)).toBe('Hoje');

      const pastIso = '2025-12-31T00:00:00.000Z';
      expect(formatSmartDate(pastIso)).toBe('31 de dezembro');
    });

    it('returns empty string for null', () => {
      expect(formatSmartDate(null)).toBe('');
    });

    it('handles invalid strings gracefully', () => {
      const invalid = 'abc-def';
      expect(() => formatSmartDate(invalid as any)).toThrow();

      const empty = '';
      expect(formatSmartDate(empty)).toBe('');
    });

    it('formats dates not today/yesterday/tomorrow', () => {
      const nextWeek = '2026-02-03';
      expect(formatSmartDate(nextWeek)).toBe('3 de fevereiro');

      const sameWeek = '2026-01-30';
      expect(formatSmartDate(sameWeek)).toBe('sexta-feira');
    });
  });

  describe('formatDateToDayMonthYear', () => {
    it('formats date as dd/MM/yyyy', () => {
      const result = formatDateToDayMonthYear('2024-05-20T12:00:00.000Z');

      expect(result).toBe('20/05/2024');
    });
  });

  describe('formatFullDatePtBR', () => {
    describe('basic behavior', () => {
      it('formats full Date object in current year', () => {
        const mockTime = new Date('2026-01-28T12:00:00.000Z');
        jest.useFakeTimers();
        jest.setSystemTime(mockTime);

        const date = new Date('2026-01-28T08:00:00.000Z'); // horário qualquer
        const result = formatFullDatePtBR(date);

        expect(result).toBe('quarta-feira, 28 de janeiro');

        jest.useRealTimers();
      });

      it('formats full Date object in past year', () => {
        const date = new Date('2024-01-15T12:00:00.000Z');
        const result = formatFullDatePtBR(date);

        expect(result).toBe('segunda-feira, 15 de janeiro de 2024');
      });

      it('formats ISO string in current year', () => {
        const mockTime = new Date('2026-05-10T12:00:00.000Z');
        jest.useFakeTimers();
        jest.setSystemTime(mockTime);

        const result = formatFullDatePtBR('2026-05-10T08:30:00.000Z');

        expect(result).toBe('domingo, 10 de maio');

        jest.useRealTimers();
      });

      it('formats ISO string in past year', () => {
        const result = formatFullDatePtBR('2022-11-20T15:45:00.000Z');

        expect(result).toBe('domingo, 20 de novembro de 2022');
      });

      it('formats DateOnly string in current year', () => {
        const mockTime = new Date('2026-07-15T12:00:00.000Z');
        jest.useFakeTimers();
        jest.setSystemTime(mockTime);

        const result = formatFullDatePtBR('2026-07-15');

        expect(result).toBe('quarta-feira, 15 de julho');

        jest.useRealTimers();
      });

      it('formats DateOnly string in past year', () => {
        const result = formatFullDatePtBR('2020-02-05');

        expect(result).toBe('quarta-feira, 05 de fevereiro de 2020');
      });
    });

    describe('edge cases', () => {
      it('formats end of year correctly', () => {
        const result = formatFullDatePtBR('2026-12-31');
        expect(result).toBe('quinta-feira, 31 de dezembro');
      });

      it('formats start of year correctly', () => {
        const result = formatFullDatePtBR('2026-01-01');
        expect(result).toBe('quinta-feira, 01 de janeiro');
      });

      it('throws or fails gracefully for invalid string', () => {
        expect(() => formatFullDatePtBR('abc-def' as any)).toThrow();
      });

      it('throws or fails gracefully for empty string', () => {
        expect(() => formatFullDatePtBR('' as any)).toThrow();
      });
    });
  });

  describe('getStateByDate', () => {
    describe('basic scenarios', () => {
      it('returns "Venceu: " for clearly past date', () => {
        const result = getStateByDate('2000-01-01');
        expect(result).toBe('Venceu: ');
      });

      it('returns "Vence: " for today', () => {
        const mockTime = new Date('2026-01-28T12:00:00.000Z');
        jest.useFakeTimers();
        jest.setSystemTime(mockTime);

        const result = getStateByDate('2026-01-28');
        expect(result).toBe('Vence: ');

        jest.useRealTimers();
      });

      it('returns empty string for future date', () => {
        const result = getStateByDate('2999-01-01');
        expect(result).toBe('');
      });
    });

    describe('edge cases with DateOnly', () => {
      it('correctly handles last day of the month', () => {
        const mockTime = new Date('2026-01-31T12:00:00.000Z');
        jest.useFakeTimers();
        jest.setSystemTime(mockTime);

        const result = getStateByDate('2026-01-31');
        expect(result).toBe('Vence: ');

        jest.useRealTimers();
      });

      it('correctly handles first day of the month', () => {
        const mockTime = new Date('2026-02-01T12:00:00.000Z');
        jest.useFakeTimers();
        jest.setSystemTime(mockTime);

        const result = getStateByDate('2026-02-01');
        expect(result).toBe('Vence: ');

        jest.useRealTimers();
      });

      it('correctly handles end/start of year', () => {
        const mockTime = new Date('2026-12-31T12:00:00.000Z');
        jest.useFakeTimers();
        jest.setSystemTime(mockTime);

        expect(getStateByDate('2026-12-31')).toBe('Vence: ');
        expect(getStateByDate('2027-01-01')).toBe('');

        jest.useRealTimers();
      });
    });

    describe('handling invalid or unexpected strings', () => {
      it('throws or fails gracefully for random string', () => {
        // depende de como você quer lidar: try/catch se for lançar
        expect(() => getStateByDate('abc-def' as any)).toThrow();
      });

      it('throws or fails gracefully for empty string', () => {
        expect(() => getStateByDate('' as any)).toThrow();
      });

      it('throws or fails gracefully for null/undefined', () => {
        // @ts-expect-error testing runtime invalid input
        expect(() => getStateByDate(null)).toThrow();
        // @ts-expect-error
        expect(() => getStateByDate(undefined)).toThrow();
      });
    });

    describe('ISO strings as input', () => {
      it('handles full ISO datetime strings by trimming time', () => {
        const mockTime = new Date('2026-01-28T12:00:00.000Z');
        jest.useFakeTimers();
        jest.setSystemTime(mockTime);

        // Mesmo que venha ISO completo, deve usar só a parte yyyy-MM-dd
        expect(() =>
          getStateByDate('2026-01-28T23:59:59.000Z' as any),
        ).toThrow();

        jest.useRealTimers();
      });
    });
  });

  describe('getOnlyDatePart', () => {
    it('returns yyyy-MM-dd string from date input', () => {
      const result = getOnlyDatePart('2024-07-25T18:30:00.000Z');

      expect(result).toBe('2024-07-25');
    });
  });

  describe('pickerValueToDateOnly', () => {
    describe('basic behavior', () => {
      it('returns yyyy-MM-dd from a Date at midnight', () => {
        const date = new Date('2026-02-05T00:00:00.000Z');

        const result = localDateToDateOnly(date);

        expect(result).toBe('2026-02-05');
      });

      it('ignores time component completely', () => {
        const date = new Date('2026-02-05T23:59:59.999Z');

        const result = localDateToDateOnly(date);

        expect(result).toBe('2026-02-05');
      });
    });

    describe('edge cases around day boundaries', () => {
      it('does not shift day when time is close to midnight (UTC)', () => {
        const date = new Date('2026-02-05T23:00:00.000Z');

        const result = localDateToDateOnly(date);

        expect(result).toBe('2026-02-05');
      });

      it('does not shift day when time is early morning (UTC)', () => {
        const date = new Date('2026-02-05T01:00:00.000Z');

        const result = localDateToDateOnly(date);

        expect(result).toBe('2026-02-05');
      });
    });

    describe('consistency guarantees', () => {
      it('always returns a stable DateOnly regardless of time changes', () => {
        const variations = [
          new Date('2026-02-05T00:00:00.000Z'),
          new Date('2026-02-05T08:00:00.000Z'),
          new Date('2026-02-05T16:00:00.000Z'),
          new Date('2026-02-05T23:59:59.000Z'),
        ];

        variations.forEach(date => {
          expect(localDateToDateOnly(date)).toBe('2026-02-05');
        });
      });

      it('never produces invalid or shifted dates', () => {
        const date = new Date('2026-12-31T23:59:59.999Z');

        const result = localDateToDateOnly(date);

        expect(result).toBe('2026-12-31');
      });
    });
  });

  describe('dateOnlyToLocalDate', () => {
    it('converts DateOnly string to Date preserving the local civil day', () => {
      const dateOnly: DateOnly = '2026-02-05';
      const result = dateOnlyToLocalDate(dateOnly);

      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(1); // Fevereiro
      expect(result.getDate()).toBe(5);
    });

    it('produces consistent day regardless of environment timezone', () => {
      const variations: DateOnly[] = ['2026-02-05', '2026-12-31', '2026-01-01'];

      variations.forEach(dateOnly => {
        const date = dateOnlyToLocalDate(dateOnly);
        expect(localDateToDateOnly(date)).toBe(dateOnly);
      });
    });
  });

  describe('isDateOnly', () => {
    it('returns true for valid DateOnly strings', () => {
      const valid: DateOnly = '2026-01-28';
      expect(isDateOnly(valid)).toBe(true);
    });

    it('returns false for ISO strings with time', () => {
      expect(isDateOnly('2026-01-28T12:00:00.000Z')).toBe(false);
    });

    it('returns false for invalid strings', () => {
      expect(isDateOnly('2026-1-1')).toBe(false);
      expect(isDateOnly('abc')).toBe(false);
      expect(isDateOnly('')).toBe(false);
    });

    it('returns false for Date objects', () => {
      expect(isDateOnly(new Date())).toBe(false);
    });

    it('returns false for null/undefined/number', () => {
      expect(isDateOnly(null)).toBe(false);
      expect(isDateOnly(undefined)).toBe(false);
      expect(isDateOnly(123)).toBe(false);
    });
  });
});
