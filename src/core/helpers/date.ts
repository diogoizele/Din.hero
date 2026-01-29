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

export function storageToAppDate(input: string | Date): Date {
  if (input instanceof Date) {
    return toZonedTime(input, APP_TIMEZONE);
  }

  const utcDate = parseISO(input);
  return toZonedTime(utcDate, APP_TIMEZONE);
}

export function appDateToStorageIso(input: Date): string {
  const utcDate = fromZonedTime(input, APP_TIMEZONE);
  return utcDate.toISOString();
}

export function parseAppLocalString(input: string): Date {
  return toZonedTime(input, APP_TIMEZONE);
}

function formatAppDate(date: Date, pattern: string): string {
  return formatInTimeZone(date, APP_TIMEZONE, pattern, { locale: ptBR });
}

export function formatSmartDate(dateInput: string | Date | null): string {
  if (!dateInput) {
    return '';
  }

  const date = storageToAppDate(dateInput);
  const nowDate = new Date();

  if (isYesterday(date)) {
    return 'Ontem';
  }

  if (isToday(date)) {
    return 'Hoje';
  }

  if (isTomorrow(date)) {
    return 'Amanhã';
  }

  if (isBefore(date, nowDate)) {
    return formatAppDate(date, "d 'de' MMMM");
  }

  const endOfThisWeek = endOfWeek(nowDate, { weekStartsOn: 1 });

  if (
    isSameWeek(date, nowDate, { weekStartsOn: 1 }) ||
    isBefore(date, endOfThisWeek)
  ) {
    return formatAppDate(date, 'EEEE');
  }

  return formatAppDate(date, "d 'de' MMMM");
}

export function formatDateToDayMonthYear(dateInput: string | Date): string {
  return formatAppDate(storageToAppDate(dateInput), 'dd/MM/yyyy');
}

export function formatFullDatePtBR(dateInput: string | Date): string {
  const date = storageToAppDate(dateInput);
  const nowDate = new Date();

  const baseFormat = "EEEE, dd 'de' MMMM";
  const formatWithYear = "EEEE, dd 'de' MMMM 'de' yyyy";

  return formatAppDate(
    date,
    isSameYear(date, nowDate) ? baseFormat : formatWithYear,
  );
}

export function getStateByDate(dueDate: string): string {
  const date = storageToAppDate(dueDate);
  const nowDate = new Date();

  if (isToday(date)) {
    return 'Vence: ';
  }

  if (isAfter(nowDate, date)) {
    return 'Venceu: ';
  }

  return '';
}

export function startOfAppDay(input: string | Date): Date {
  const date = storageToAppDate(input);
  return fromZonedTime(startOfDay(date), APP_TIMEZONE);
}

export function endOfAppDay(input: string | Date): Date {
  const date = storageToAppDate(input);
  return fromZonedTime(endOfDay(date), APP_TIMEZONE);
}

export function getOnlyDatePart(input: string | Date): string {
  return formatAppDate(storageToAppDate(input), 'yyyy-MM-dd');
}
