import {
  billFormToPayload,
  billInstallmentFormToPayload,
  recurringRuleToPayload,
} from '@features/Bills/mappers/billFormToPayload';
import { BillType, Category } from '@features/Bills/types';
import type { BillForm } from '@features/Bills/hooks/useBillForm';
import { getOnlyDatePart } from '@core/helpers/date';

const mockedNow = new Date('2024-01-15T12:00:00.000Z');

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(mockedNow);
});

afterAll(() => {
  jest.useRealTimers();
});

describe('billFormToPayload', () => {
  it('maps basic form data to bill payload when not paid on creation', () => {
    const formData: BillForm = {
      description: '  Netflix  ',
      amount: 'R$ 1.234,56',
      dueDate: new Date('2024-02-10T00:00:00.000Z'),
      category: Category.SUBSCRIPTION,
      notes: 'Some note',
      billType: BillType.RECURRING,
      installments: null,
      isRecurrentFixedAmount: true,
      isPaidOnCreation: false,
    };

    const result = billFormToPayload(formData);

    expect(result.description).toBe('Netflix');
    expect(result.amount).toBe(1234.56);
    expect(result.dueDate).toBe(getOnlyDatePart(formData.dueDate));
    expect(result.category).toBe(Category.SUBSCRIPTION);
    expect(result.billType).toBe(BillType.RECURRING);
    expect(result.notes).toBe('Some note');

    expect(result.createdAt).toBe(mockedNow.toISOString());
    expect(result.updatedAt).toBe(mockedNow.toISOString());
    expect(result.paymentDate).toBeNull();
    expect(result.installment).toBeNull();
    expect(result.recurringRuleId).toBeNull();
  });

  it('uses current date as dueDate and sets paymentDate when isPaidOnCreation is true', () => {
    const formData: BillForm = {
      description: 'Gym',
      amount: 'R$ 100,00',
      // This dueDate should be ignored when isPaidOnCreation is true
      dueDate: new Date('2024-03-01T00:00:00.000Z'),
      category: Category.HEALTH,
      notes: null,
      billType: BillType.ONE_TIME,
      installments: null,
      isRecurrentFixedAmount: false,
      isPaidOnCreation: true,
    };

    const result = billFormToPayload(formData);
    const expectedDueDate = getOnlyDatePart(mockedNow);

    expect(result.dueDate).toBe(expectedDueDate);
    expect(result.paymentDate).toBe(mockedNow.toISOString());
    expect(result.createdAt).toBe(mockedNow.toISOString());
    expect(result.updatedAt).toBe(mockedNow.toISOString());
  });

  it('sets amount to null when amount is empty and resolves nullable fields via undefinedResolver', () => {
    const formData: BillForm = {
      description: 'Bill without amount',
      amount: '',
      dueDate: new Date('2024-02-10T00:00:00.000Z'),
      // simulate undefined via casting, since type is Category | null
      category: undefined as unknown as Category | null,
      notes: undefined as unknown as string | null,
      billType: BillType.RECURRING,
      installments: null,
      isRecurrentFixedAmount: false,
      isPaidOnCreation: false,
    };

    const result = billFormToPayload(formData);

    expect(result.amount).toBeNull();
    expect(result.category).toBeNull();
    expect(result.notes).toBeNull();
  });

  it('trims description even when it is only spaces', () => {
    const formData: BillForm = {
      description: '   ',
      amount: 'R$ 0,00',
      dueDate: new Date('2024-02-10T00:00:00.000Z'),
      category: Category.OTHERS,
      notes: null,
      billType: BillType.ONE_TIME,
      installments: null,
      isRecurrentFixedAmount: false,
      isPaidOnCreation: false,
    };

    const result = billFormToPayload(formData);

    expect(result.description).toBe('');
    expect(result.amount).toBe(0);
  });
});

describe('billInstallmentFormToPayload', () => {
  it('maps installment form data to bill payload', () => {
    const formData: BillForm = {
      description: '  Laptop  ',
      amount: '1234.56',
      dueDate: new Date('2024-04-05T00:00:00.000Z'),
      category: Category.CREDIT_CARD,
      notes: '12x installment',
      billType: BillType.INSTALLMENT,
      installments: 12,
      isRecurrentFixedAmount: false,
      isPaidOnCreation: false,
    };

    const installments = { current: 1, total: 12 } as const;

    const result = billInstallmentFormToPayload(formData, installments);

    expect(result.description).toBe('Laptop');
    expect(result.billType).toBe(BillType.INSTALLMENT);
    expect(result.amount).toBe(1234.56); // parseFloat
    expect(result.dueDate).toBe(getOnlyDatePart(formData.dueDate));
    expect(result.category).toBe(Category.CREDIT_CARD);
    expect(result.notes).toBe('12x installment');

    expect(typeof result.createdAt).toBe('string');
    expect(typeof result.updatedAt).toBe('string');
    expect(new Date(result.createdAt).toString()).not.toBe('Invalid Date');
    expect(new Date(result.updatedAt).toString()).not.toBe('Invalid Date');

    expect(result.paymentDate).toBeNull();
    expect(result.installment).toEqual(installments);
    expect(result.recurringRuleId).toBeNull();
  });

  it('resolves nullable fields with undefinedResolver', () => {
    const formData: BillForm = {
      description: ' Phone ',
      amount: '100',
      dueDate: new Date('2024-04-05T00:00:00.000Z'),
      category: undefined as unknown as Category | null,
      notes: undefined as unknown as string | null,
      billType: BillType.INSTALLMENT,
      installments: 3,
      isRecurrentFixedAmount: false,
      isPaidOnCreation: false,
    };

    const installments = { current: 1, total: 3 } as const;

    const result = billInstallmentFormToPayload(formData, installments);

    expect(result.description).toBe('Phone');
    expect(result.category).toBeNull();
    expect(result.notes).toBeNull();
  });
});

describe('recurringRuleToPayload', () => {
  it('maps form data to recurring rule payload with fixed amount', () => {
    const dueDate = new Date('2024-05-20T00:00:00.000');

    const formData: BillForm = {
      description: '  Rent  ',
      amount: 'R$ 1.500,00',
      dueDate,
      category: Category.HABITATION,
      notes: 'Main apartment',
      billType: BillType.RECURRING,
      installments: null,
      isRecurrentFixedAmount: true,
      isPaidOnCreation: false,
    };

    const result = recurringRuleToPayload(formData);

    expect(result.description).toBe('Rent');
    expect(result.fixedAmount).toBe(1500);
    expect(result.category).toBe(Category.HABITATION);
    expect(result.dayOfMonth).toBe(20);
    expect(result.startDate).toBe(getOnlyDatePart(dueDate));
    expect(result.endDate).toBeNull();
    expect(result.lastGeneratedAt).toBeNull();
    expect(result.notes).toBe('Main apartment');
    expect(typeof result.createdAt).toBe('string');
    expect(typeof result.updatedAt).toBe('string');
    expect(result.active).toBe(true);
  });

  it('handles empty amount and undefined nullable fields', () => {
    const dueDate = new Date('2024-06-10T00:00:00.000Z');

    const formData: BillForm = {
      description: '  Variable bill  ',
      amount: '',
      dueDate,
      category: undefined as unknown as Category | null,
      notes: undefined as unknown as string | null,
      billType: BillType.RECURRING,
      installments: null,
      isRecurrentFixedAmount: false,
      isPaidOnCreation: false,
    };

    const result = recurringRuleToPayload(formData);

    expect(result.description).toBe('Variable bill');
    expect(result.fixedAmount).toBeNull();
    expect(result.category).toBeNull();
    expect(result.notes).toBeNull();
    expect(result.startDate).toBe(getOnlyDatePart(dueDate));
  });
});
