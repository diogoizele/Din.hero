import {
  format,
  isToday,
  isTomorrow,
  isSameWeek,
  endOfWeek,
  isBefore,
  parseISO,
  isAfter,
} from 'date-fns';

import { ptBR } from 'date-fns/locale';

export function formatSmartDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
  const now = new Date();

  if (isBefore(date, now)) {
    return format(date, "d 'de' MMMM", { locale: ptBR });
  }

  if (isToday(date)) {
    return 'Hoje';
  }

  if (isTomorrow(date)) {
    return 'Amanhã';
  }

  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 });

  if (
    isBefore(date, endOfThisWeek) ||
    isSameWeek(date, now, { weekStartsOn: 1 })
  ) {
    return format(date, 'EEEE', { locale: ptBR });
  }

  return format(date, "d 'de' MMMM", { locale: ptBR });
}

export function getStateByDate(dueDate: string) {
  const billDate = parseISO(dueDate);
  const now = new Date();

  if (isToday(billDate)) {
    return 'Vence: ';
  }

  if (!isToday(billDate) && isAfter(now, billDate)) {
    return 'Venceu: ';
  }

  return '';
}
