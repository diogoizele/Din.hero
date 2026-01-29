import {
  APP_TIMEZONE,
  storageToAppDate,
  appDateToStorageIso,
  parseAppLocalString,
  formatSmartDate,
  formatDateToDayMonthYear,
  formatFullDatePtBR,
  getStateByDate,
  startOfAppDay,
  endOfAppDay,
  getOnlyDatePart,
} from '@core/helpers/date';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';

describe('date helpers', () => {
  describe('storageToAppDate', () => {
    it('converts UTC ISO string to app timezone date', () => {
      const input = '2024-01-15T12:00:00.000Z';

      const result = storageToAppDate(input);

      const formatted = formatInTimeZone(
        result,
        APP_TIMEZONE,
        'yyyy-MM-dd HH:mm',
      );

      // In America/Sao_Paulo (UTC-3, no DST currently)
      expect(formatted).toBe('2024-01-15 09:00');
    });

    it('accepts Date instance and converts to app timezone date', () => {
      const input = new Date('2024-02-01T00:00:00.000Z');

      const result = storageToAppDate(input);

      const formatted = formatInTimeZone(
        result,
        APP_TIMEZONE,
        'yyyy-MM-dd HH:mm',
      );

      expect(formatted).toBe('2024-01-31 21:00');
    });
  });

  describe('appDateToStorageIso', () => {
    it('converts app-local date to UTC ISO string for storage', () => {
      // Create a date that represents 2024-03-10 10:30 in app timezone
      const appLocal = fromZonedTime('2024-03-10T10:30:00', APP_TIMEZONE);

      const iso = appDateToStorageIso(appLocal);

      // Should be 3h ahead in UTC
      expect(iso.startsWith('2024-03-10T13:30:00.000Z')).toBe(true);
    });
  });

  describe('parseAppLocalString', () => {
    it('parses local string as app timezone date', () => {
      const date = parseAppLocalString('2024-04-01T08:15:00');

      const formatted = formatInTimeZone(
        date,
        APP_TIMEZONE,
        'yyyy-MM-dd HH:mm',
      );

      expect(formatted).toBe('2024-04-01 08:15');
    });
  });

  describe('formatSmartDate', () => {
    it('returns empty string for null input', () => {
      expect(formatSmartDate(null)).toBe('');
    });

    it('formats past date with day and month', () => {
      const result = formatSmartDate('2020-01-01T12:00:00.000Z');

      expect(result).toBe('1 de janeiro'); // e.g. "1 de janeiro"
    });

    it('formats yesterday date', () => {
      const mockTime = new Date('2026-01-29T12:00:00.000Z');
      jest.useFakeTimers();
      jest.setSystemTime(mockTime);

      const yesterdayExpected = new Date('2026-01-28T12:00:00.000Z');

      const result = formatSmartDate(yesterdayExpected);

      expect(result).toBe('Ontem');

      jest.useRealTimers();
    });

    it('formats today date', () => {
      const mockTime = new Date('2026-01-29T12:00:00.000Z');
      jest.useFakeTimers();
      jest.setSystemTime(mockTime);

      const result = formatSmartDate(new Date());

      expect(result).toBe('Hoje');

      jest.useRealTimers();
    });

    it('formats tomorrow date', () => {
      const mockTime = new Date('2026-01-29T12:00:00.000Z');
      jest.useFakeTimers();
      jest.setSystemTime(mockTime);

      const tomorrowExpected = new Date('2026-01-30T12:00:00.000Z');

      const result = formatSmartDate(tomorrowExpected);

      expect(result).toBe('Amanhã');

      jest.useRealTimers();
    });

    it('formats day names when is at the same week', () => {
      const mockTime = new Date('2026-01-28T12:00:00.000Z');
      jest.useFakeTimers();
      jest.setSystemTime(mockTime);

      const dayNameExpected = new Date('2026-01-30T12:00:00.000Z');

      const result = formatSmartDate(dayNameExpected);

      expect(result).toBe('sexta-feira');

      jest.useRealTimers();
    });

    it('formats date with day and month if is a future date when not at the same week', () => {
      const mockTime = new Date('2026-01-28T12:00:00.000Z');
      jest.useFakeTimers();
      jest.setSystemTime(mockTime);

      const futureDate = new Date('2026-02-05T12:00:00.000Z');

      const result = formatSmartDate(futureDate);

      expect(result).toBe('5 de fevereiro');

      jest.useRealTimers();
    });
  });

  describe('formatDateToDayMonthYear', () => {
    it('formats date as dd/MM/yyyy', () => {
      const result = formatDateToDayMonthYear('2024-05-20T12:00:00.000Z');

      expect(result).toBe('20/05/2024');
    });
  });

  describe('formatFullDatePtBR', () => {
    it('formats full date in pt-BR', () => {
      const mockTime = new Date('2026-01-28T12:00:00.000Z');
      jest.useFakeTimers();
      jest.setSystemTime(mockTime);

      const result = formatFullDatePtBR(new Date());

      expect(result).toBe('quarta-feira, 28 de janeiro');

      jest.useRealTimers();
    });

    it('formats full date in pt-BR if is a past year', () => {
      const result = formatFullDatePtBR('2024-01-15T12:00:00.000Z');

      expect(result).toBe('segunda-feira, 15 de janeiro de 2024');
    });
  });

  describe('getStateByDate', () => {
    it('returns "Venceu: " for clearly past date', () => {
      const result = getStateByDate('2000-01-01T00:00:00.000Z');

      expect(result).toBe('Venceu: ');
    });

    it('returns "Vence: " for overdue dates', () => {
      const mockTime = new Date('2026-01-28T12:00:00.000Z');
      jest.useFakeTimers();
      jest.setSystemTime(mockTime);

      const futureDate = '2026-01-28T12:00:00.000Z';

      const result = getStateByDate(futureDate);

      expect(result).toBe('Vence: ');

      jest.useRealTimers();
    });

    it('returns empty string for far future date', () => {
      const result = getStateByDate('2999-01-01T00:00:00.000Z');

      expect(result).toBe('');
    });
  });

  describe('startOfAppDay / endOfAppDay', () => {
    it('returns start of app day in app timezone', () => {
      const input = '2024-06-10T15:45:00.000Z';

      const result = startOfAppDay(input);

      const formatted = formatInTimeZone(
        result,
        APP_TIMEZONE,
        'yyyy-MM-dd HH:mm',
      );

      expect(formatted.endsWith('00:00')).toBe(true);
    });

    it('returns end of app day in app timezone', () => {
      const input = '2024-06-10T15:45:00.000Z';

      const result = endOfAppDay(input);

      const formatted = formatInTimeZone(
        result,
        APP_TIMEZONE,
        'yyyy-MM-dd HH:mm',
      );

      expect(formatted.endsWith('23:59')).toBe(true);
    });
  });

  describe('getOnlyDatePart', () => {
    it('returns yyyy-MM-dd string from date input', () => {
      const result = getOnlyDatePart('2024-07-25T18:30:00.000Z');

      expect(result).toBe('2024-07-25');
    });
  });
});
