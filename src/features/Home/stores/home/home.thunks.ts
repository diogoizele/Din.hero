import { createAsyncThunk } from '@reduxjs/toolkit';
import { endOfDay, startOfDay } from 'date-fns';

import { RootState } from '@core/config/redux/store';
import * as billService from '@features/Bills/services/billsService';

import { MarkBillAsPaidArgs } from './home.types';

const fetchMonthlyBills = createAsyncThunk(
  'home/fetchMonthlyBills',
  async () => {
    const startDate = startOfDay(new Date()).toISOString();
    const endDate = endOfDay(
      new Date(new Date().setDate(new Date().getDate() + 30)),
    ).toISOString();

    const fetchedBills = await billService.getBillsDueInPeriod({
      startDate,
      endDate,
    });

    return fetchedBills;
  },
);

const updateBillAmount = createAsyncThunk(
  'home/updateBillAmount',
  async (amount: number, thunkAPI) => {
    const { home } = thunkAPI.getState() as RootState;
    const { main } = home;

    if (!main.bottomSheet.billDetails?.id) {
      return thunkAPI.rejectWithValue('No bill selected');
    }

    try {
      await billService.updateBill(main.bottomSheet.billDetails?.id, {
        amount,
      });

      return {
        ...main.bottomSheet.billDetails,
        amount,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update bill amount');
    }
  },
);

const markBillAsPaid = createAsyncThunk(
  'home/markAsPaid',
  async ({ id, paymentDate }: MarkBillAsPaidArgs, thunkAPI) => {
    try {
      const paymentDateIso = paymentDate
        ? paymentDate.toISOString()
        : new Date().toISOString();
      await billService.updateBill(id, {
        paymentDate: paymentDateIso,
      });

      return paymentDateIso;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to mark bill as paid');
    }
  },
);

export { fetchMonthlyBills, updateBillAmount, markBillAsPaid };
