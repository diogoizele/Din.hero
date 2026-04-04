import { BillType, Category } from '@features/Bills/types';
import { BillForm } from '@features/Bills/hooks/useBillForm';
import { toDomain } from '@features/Bills/mappers/billsMapper';
import { DateOnly } from '@shared/types';
import { localDateString } from '@shared/helpers/date';

jest.mock('@shared/helpers/date', () => ({
  localDateString: jest.fn(),
}));

const mockedLocalDateString = localDateString as jest.MockedFunction<
  typeof localDateString
>;

const FIXED_TODAY = '2024-06-15' as DateOnly;
const FIXED_DUE_DATE = new Date('2024-07-01');
const FIXED_DUE = '2024-07-01' as DateOnly;

const baseForm: BillForm = {
  description: 'Electric bill',
  amount: '15000',
  dueDate: FIXED_DUE_DATE,
  category: null,
  notes: null,
  billType: BillType.ONE_TIME,
  installments: null,
  isRecurrentFixedAmount: false,
  isPaidOnCreation: false,
};

beforeEach(() => {
  jest.clearAllMocks();
  mockedLocalDateString.mockImplementation((date?: Date) => {
    if (!date) {
      return FIXED_TODAY;
    }
    return date.toLocaleDateString('sv') as DateOnly;
  });
});

describe('toDomain', () => {
  describe('description', () => {
    it('trims leading and trailing whitespace from description', () => {
      const result = toDomain({
        ...baseForm,
        description: '  Electric bill  ',
      });
      expect(result.description).toBe('Electric bill');
    });

    it('trims only leading whitespace', () => {
      const result = toDomain({ ...baseForm, description: '  Electric bill' });
      expect(result.description).toBe('Electric bill');
    });

    it('trims only trailing whitespace', () => {
      const result = toDomain({ ...baseForm, description: 'Electric bill  ' });
      expect(result.description).toBe('Electric bill');
    });

    it('preserves description with no surrounding whitespace', () => {
      const result = toDomain({ ...baseForm, description: 'Electric bill' });
      expect(result.description).toBe('Electric bill');
    });

    it('returns empty string when description is only whitespace', () => {
      const result = toDomain({ ...baseForm, description: '   ' });
      expect(result.description).toBe('');
    });
  });

  describe('amount', () => {
    it('parses a valid integer currency string to a decimal number', () => {
      const result = toDomain({ ...baseForm, amount: '15000' });
      expect(result.amount).toBe(150);
    });

    it('parses a currency string with formatting characters stripped', () => {
      const result = toDomain({ ...baseForm, amount: 'R$ 1.234,56' });
      expect(result.amount).toBe(1234.56);
    });

    it('returns null when amount is an empty string', () => {
      const result = toDomain({ ...baseForm, amount: '' });
      expect(result.amount).toBeNull();
    });

    it('returns NaN when amount contains only non-digit characters after stripping', () => {
      // currencyParse strips all non-digits: "R$" → "" → parseFloat("") = NaN
      // undefinedResolver(NaN) passes NaN through since NaN !== undefined
      const result = toDomain({ ...baseForm, amount: 'R$' });
      expect(result.amount).toBeNaN();
    });

    it('handles a single-digit amount string', () => {
      const result = toDomain({ ...baseForm, amount: '1' });
      expect(result.amount).toBe(0.01);
    });

    it('handles amount representing zero', () => {
      const result = toDomain({ ...baseForm, amount: '0' });
      expect(result.amount).toBe(0);
    });

    it('handles a large amount string', () => {
      const result = toDomain({ ...baseForm, amount: '9999999999' });
      expect(result.amount).toBe(99999999.99);
    });
  });

  describe('category', () => {
    it('sets category to null when category is null', () => {
      const result = toDomain({ ...baseForm, category: null });
      expect(result.category).toBeNull();
    });

    it('preserves category when a valid category object is provided', () => {
      const category = Category.FOOD;
      const result = toDomain({ ...baseForm, category });
      expect(result.category).toEqual(category);
    });
  });

  describe('notes', () => {
    it('sets notes to null when notes is null', () => {
      const result = toDomain({ ...baseForm, notes: null });
      expect(result.notes).toBeNull();
    });

    it('preserves notes when a string is provided', () => {
      const result = toDomain({ ...baseForm, notes: 'Pay before due date' });
      expect(result.notes).toBe('Pay before due date');
    });

    it('preserves notes when notes is an empty string', () => {
      // undefinedResolver only converts undefined → null; empty string passes through
      const result = toDomain({ ...baseForm, notes: '' });
      expect(result.notes).toBe('');
    });
  });

  describe('billType', () => {
    it('passes billType ONE_TIME through unchanged', () => {
      const result = toDomain({ ...baseForm, billType: BillType.ONE_TIME });
      expect(result.billType).toBe(BillType.ONE_TIME);
    });

    it('passes billType INSTALLMENT through unchanged', () => {
      const result = toDomain({ ...baseForm, billType: BillType.INSTALLMENT });
      expect(result.billType).toBe(BillType.INSTALLMENT);
    });

    it('passes billType RECURRING through unchanged', () => {
      const result = toDomain({ ...baseForm, billType: BillType.RECURRING });
      expect(result.billType).toBe(BillType.RECURRING);
    });
  });

  describe('installment', () => {
    it('always sets installment to null regardless of form installments value', () => {
      const result = toDomain({ ...baseForm, installments: '3' });
      expect(result.installment).toBeNull();
    });

    it('sets installment to null when installments is null', () => {
      const result = toDomain({ ...baseForm, installments: null });
      expect(result.installment).toBeNull();
    });
  });

  describe('isPaidOnCreation: false', () => {
    it('calls localDateString with formData.dueDate', () => {
      toDomain({ ...baseForm, isPaidOnCreation: false });
      expect(mockedLocalDateString).toHaveBeenCalledWith(FIXED_DUE_DATE);
    });

    it('sets dueDate to the formatted formData.dueDate', () => {
      const result = toDomain({ ...baseForm, isPaidOnCreation: false });
      expect(result.dueDate).toBe(FIXED_DUE);
    });

    it('sets paymentDate to null', () => {
      const result = toDomain({ ...baseForm, isPaidOnCreation: false });
      expect(result.paymentDate).toBeNull();
    });

    it('calls localDateString exactly once', () => {
      toDomain({ ...baseForm, isPaidOnCreation: false });
      expect(mockedLocalDateString).toHaveBeenCalledTimes(1);
    });
  });

  describe('isPaidOnCreation: true', () => {
    it('calls localDateString with undefined for dueDate', () => {
      toDomain({ ...baseForm, isPaidOnCreation: true });
      expect(mockedLocalDateString).toHaveBeenCalledWith(undefined);
    });

    it('sets dueDate to today when isPaidOnCreation is true', () => {
      mockedLocalDateString.mockReturnValue(FIXED_TODAY);
      const result = toDomain({ ...baseForm, isPaidOnCreation: true });
      expect(result.dueDate).toBe(FIXED_TODAY);
    });

    it('sets paymentDate to today', () => {
      mockedLocalDateString.mockReturnValue(FIXED_TODAY);
      const result = toDomain({ ...baseForm, isPaidOnCreation: true });
      expect(result.paymentDate).toBe(FIXED_TODAY);
    });

    it('calls localDateString exactly twice', () => {
      toDomain({ ...baseForm, isPaidOnCreation: true });
      expect(mockedLocalDateString).toHaveBeenCalledTimes(2);
    });
  });

  describe('output shape', () => {
    it('does not include id in the returned object', () => {
      const result = toDomain(baseForm);
      expect(result).not.toHaveProperty('id');
    });

    it('does not include recurringRuleId in the returned object', () => {
      const result = toDomain(baseForm);
      expect(result).not.toHaveProperty('recurringRuleId');
    });

    it('returns all required Bill fields except id and recurringRuleId', () => {
      const result = toDomain(baseForm);
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('category');
      expect(result).toHaveProperty('billType');
      expect(result).toHaveProperty('notes');
      expect(result).toHaveProperty('amount');
      expect(result).toHaveProperty('dueDate');
      expect(result).toHaveProperty('paymentDate');
      expect(result).toHaveProperty('installment');
    });
  });
});
