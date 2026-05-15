import { HomeSummaryResponse } from '../../services/homeService.types';
import { financialStatusMessages } from '../../static/financialStatusMessage';
import { UpcomingMoment } from '../../types';

const billOverdueLabel = (quantity: number) => quantity > 1 ? 'contas vencidas' : 'conta vencida';
const billUpcomingLabel = (quantity: number) => quantity > 1 ? 'contas vencem' : 'conta vence';

export const resolveHomeAlert = (alerts?: HomeSummaryResponse['alerts']) => {
  if (!alerts) {
    return null;
  }

  const periodicityMapper = {
    [UpcomingMoment.Today]: 'hoje',
    [UpcomingMoment.Tomorrow]: 'amanhã',
    [UpcomingMoment.Week]: 'essa semana',
  };

  if (alerts.overdue > 0 && alerts.upcoming > 0 && alerts.upcomingMoment) {
    const description = `${alerts?.overdue} ${billOverdueLabel(alerts.overdue)} e ${alerts.upcoming} ${billUpcomingLabel(alerts.upcoming)}`;

    const periodicity = periodicityMapper[alerts.upcomingMoment];

    return {
      variant: 'danger',
      text: `${description} ${periodicity}`,
    } as const;
  } else if (alerts.overdue > 0) {
    return {
      variant: 'danger',
      text: `${alerts?.overdue} ${billOverdueLabel(alerts.overdue)}`,
    } as const;
  } else if (alerts.upcoming > 0 && alerts.upcomingMoment) {
    const periodicity = periodicityMapper[alerts.upcomingMoment];
    return {
      variant: 'warning',
      text: `${alerts?.upcoming} ${billUpcomingLabel(alerts.upcoming)} ${periodicity}`,
    } as const;
  }

  return null;
};

export const resolveFinancialStatus = (
  staticStatus: typeof financialStatusMessages,
  score: number = 0,
) => {
  const statusByScore = staticStatus[score];

  const getRandom = Math.floor(
    Math.random() * (statusByScore.messages.length - 1),
  );

  return statusByScore.messages[getRandom];
};

