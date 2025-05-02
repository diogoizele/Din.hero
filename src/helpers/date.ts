import {
  format,
  isToday,
  isTomorrow,
  isSameWeek,
  endOfWeek,
  isBefore,
  parseISO,
} from 'date-fns';

import { ptBR } from 'date-fns/locale';

export function formatSmartDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
  const now = new Date();

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
