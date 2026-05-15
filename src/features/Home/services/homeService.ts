import { AppStorage } from '@core/config/storage';
import { Analytics } from '@core/analytics';
import { getOnlyDatePart } from '@shared/helpers/date';

import { HomeSummaryResponse } from './homeService.types';
import { getHomeSummaryFirebase } from './homeSource.firebase';
import { parseApiError } from '../../../core/api';

export const HomeService = {
  canRunDailyGeneration: async (): Promise<boolean> => {
    const lastCheck = await AppStorage.get('lastRecurringBillCheck');

    if (!lastCheck) {
      return true;
    }

    const nowDate = getOnlyDatePart(new Date());
    const lastCheckDate = getOnlyDatePart(new Date(lastCheck));

    return nowDate > lastCheckDate;
  },

  markDailyGenerationAsDone: async () => {
    await AppStorage.set('lastRecurringBillCheck', new Date());
  },
  getHomeSummary: async (): Promise<HomeSummaryResponse> => {
    Analytics.track('GET_HOME_SUMMARY_SUBMIT');
    try {
      const response = await getHomeSummaryFirebase();
      Analytics.track('GET_HOME_SUMMARY_SUCCESS');
      return response;
    } catch (error) {
      Analytics.track('GET_HOME_SUMARRY_FAILURE');
      throw parseApiError(error);
    }
  },
};
