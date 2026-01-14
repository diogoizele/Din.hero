import { AppStorage } from '@core/config/storage';
import { getOnlyDatePart } from '@core/helpers/date';

export const canRunDailyGeneration = async (): Promise<boolean> => {
  const lastCheck = await AppStorage.get('lastRecurringBillCheck');

  if (!lastCheck) {
    return true;
  }

  const nowDate = getOnlyDatePart(new Date());
  const lastCheckDate = getOnlyDatePart(new Date(lastCheck));

  return nowDate > lastCheckDate;
};

export const markDailyGenerationAsDone = async () => {
  await AppStorage.set('lastRecurringBillCheck', new Date());
};
