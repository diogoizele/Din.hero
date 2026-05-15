import type { UpcomingMoment } from '../types';

export interface HomeSummaryResponse {
  totalUpcomingAmount: number,
  score: number
  alerts: {
    upcoming: number,
    upcomingMoment: UpcomingMoment | null,
    overdue: number,
  } | null
  progress: {
    total: number,
    paid: number,
  }
}
