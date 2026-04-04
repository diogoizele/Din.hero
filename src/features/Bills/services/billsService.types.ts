import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { DateOnly } from '@shared/types';

import { Bill } from '../types';

export type AddBillData = Omit<Bill, 'id' | 'recurringRuleId'>;

export type UpdateBillData = Pick<
  Bill,
  'amount' | 'description' | 'category' | 'notes'
> & {
  dueDate?: DateOnly;
};

export type ListBillsParams = {
  startDate: string;
  endDate: string;
  onlyUnpaid?: boolean;
};

export type ListBillsPaginatedParams = {
  pageSize: number;
  lastDoc?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
  sortOption?: 'dueDate' | 'createdAt' | 'paymentDate';
};

export type { Bill };
