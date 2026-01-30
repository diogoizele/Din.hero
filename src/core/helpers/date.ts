import {
  isToday,
  isTomorrow,
  isSameWeek,
  endOfWeek,
  isBefore,
  isAfter,
  isSameYear,
  isYesterday,
  format,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { DateOnly } from '../types';

const dateOptions = {
  locale: ptBR,
};

export function normalizeDate(input: string | Date | null | undefined): Date {
  if (!input) {
    throw new Error('Invalid date input: empty');
  }

  if (typeof input === 'string') {
    if (isDateOnly(input)) {
      return dateOnlyToLocalDate(input);
    }

    const parsed = new Date(input);
    if (isNaN(parsed.getTime())) {
      throw new Error(`Invalid date string: ${input}`);
    }
    return parsed;
  }

  if (isNaN(input.getTime())) {
    throw new Error('Invalid Date object');
  }
  return input;
}

export function isDateOnly(value: unknown): value is DateOnly {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function formatSmartDate(
  dateInput: string | Date | DateOnly | null,
): string {
  if (!dateInput) {
    return '';
  }

  const date = normalizeDate(dateInput);
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
    return format(date, "d 'de' MMMM", dateOptions);
  }

  const endOfThisWeek = endOfWeek(nowDate, { weekStartsOn: 1 });

  if (
    isSameWeek(date, nowDate, { weekStartsOn: 1 }) ||
    isBefore(date, endOfThisWeek)
  ) {
    return format(date, 'EEEE', dateOptions);
  }

  return format(date, "d 'de' MMMM", dateOptions);
}

export function formatDateToDayMonthYear(dateInput: string | Date): string {
  const date = normalizeDate(dateInput);
  return format(date, 'dd/MM/yyyy', dateOptions);
}

export function formatFullDatePtBR(
  dateInput: string | Date | DateOnly,
): string {
  const date = normalizeDate(dateInput);

  const nowDate = new Date();

  const baseFormat = "EEEE, dd 'de' MMMM";
  const formatWithYear = "EEEE, dd 'de' MMMM 'de' yyyy";

  return format(
    date,
    isSameYear(date, nowDate) ? baseFormat : formatWithYear,
    dateOptions,
  );
}

export function getStateByDate(dueDate: DateOnly): string {
  const date = dateOnlyToLocalDate(dueDate);
  const nowDate = new Date();

  if (isToday(date)) {
    return 'Vence: ';
  }

  if (isAfter(nowDate, date)) {
    return 'Venceu: ';
  }

  return '';
}

export function getOnlyDatePart(input: string | Date): string {
  return format(new Date(input), 'yyyy-MM-dd', dateOptions);
}

export function localDateToDateOnly(value: Date): DateOnly {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}` as DateOnly;
}

export function dateOnlyToLocalDate(dateOnly: DateOnly): Date {
  if (!isDateOnly(dateOnly)) {
    throw new Error(`Invalid DateOnly format: ${dateOnly}`);
  }

  const [year, month, day] = dateOnly.split('-').map(Number);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    throw new Error(`Invalid DateOnly format: ${dateOnly}`);
  }

  return date;
}
