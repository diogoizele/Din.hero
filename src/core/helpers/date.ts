// time.ts

import {
  isToday,
  isTomorrow,
  isSameWeek,
  endOfWeek,
  isBefore,
  isAfter,
  isSameYear,
  startOfDay,
  endOfDay,
  isYesterday,
} from 'date-fns';

import { parseISO } from 'date-fns';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

export const APP_TIMEZONE = 'America/Sao_Paulo';

export function parseAppDate(input: string | Date): Date {
  if (input instanceof Date) {
    return input;
  }
  if (!input.endsWith('Z') && !input.includes('+')) {
    return fromZonedTime(input, APP_TIMEZONE);
  }

  return parseISO(input);
}

function formatAppDate(date: Date, pattern: string): string {
  return formatInTimeZone(date, APP_TIMEZONE, pattern, { locale: ptBR });
}

function nowInAppTimezone(): Date {
  return toZonedTime(new Date(), APP_TIMEZONE);
}

export function now() {
  return nowInAppTimezone();
}

export function formatSmartDate(dateInput: string | Date): string {
  const date = parseAppDate(dateInput);
  const now = nowInAppTimezone();

  if (isYesterday(date)) return 'Ontem';
  if (isToday(date)) return 'Hoje';
  if (isTomorrow(date)) return 'Amanhã';

  if (isBefore(date, now)) {
    return formatAppDate(date, "d 'de' MMMM");
  }

  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 });

  if (
    isSameWeek(date, now, { weekStartsOn: 1 }) ||
    isBefore(date, endOfThisWeek)
  ) {
    return formatAppDate(date, 'EEEE');
  }

  return formatAppDate(date, "d 'de' MMMM");
}

export function formatDateToDayMonthYear(dateInput: string | Date): string {
  return formatAppDate(parseAppDate(dateInput), 'dd/MM/yyyy');
}

export function formatFullDatePtBR(dateInput: string | Date): string {
  const date = parseAppDate(dateInput);
  const now = nowInAppTimezone();

  const baseFormat = "EEEE, dd 'de' MMMM";
  const formatWithYear = "EEEE, dd 'de' MMMM 'de' yyyy";

  return formatAppDate(
    date,
    isSameYear(date, now) ? baseFormat : formatWithYear,
  );
}

export function getStateByDate(dueDate: string): string {
  const date = parseAppDate(dueDate);
  const now = nowInAppTimezone();

  if (isToday(date)) return 'Vence: ';
  if (isAfter(now, date)) return 'Venceu: ';

  return '';
}

export function startOfAppDay(input: string | Date): Date {
  const date = parseAppDate(input);
  return fromZonedTime(startOfDay(date), APP_TIMEZONE);
}

export function endOfAppDay(input: string | Date): Date {
  const date = parseAppDate(input);
  return fromZonedTime(endOfDay(date), APP_TIMEZONE);
}

export function getOnlyDatePart(input: string | Date): string {
  return formatAppDate(parseAppDate(input), 'yyyy-MM-dd');
}
