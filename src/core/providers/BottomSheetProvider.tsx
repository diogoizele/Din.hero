import GorhomBottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from 'react';

type BottomSheetId =
  | 'billTypeInfo'
  | 'billRecurrentFixedAmount'
  | 'billPaidOnCreation'
  | 'billDetails';

type BottomSheetContextType = {
  register: (
    id: BottomSheetId,
    ref: GorhomBottomSheet | BottomSheetModal,
  ) => void;
  open: (id: BottomSheetId, index?: number) => void;
  close: (id: BottomSheetId) => void;
  present: (id: BottomSheetId) => void;
};

type CombinedSheets = GorhomBottomSheet | BottomSheetModal;

const BottomSheetContext = createContext({} as BottomSheetContextType);

type Props = PropsWithChildren<{}>;

function BottomSheetProvider({ children }: Props) {
  const sheets = useRef<Record<BottomSheetId, CombinedSheets>>(
    Object.create(null),
  );

  const register = (id: BottomSheetId, ref: CombinedSheets) => {
    sheets.current[id] = ref;
  };

  const open = (id: BottomSheetId, index?: number) => {
    const sheet = sheets.current[id];

    if (index !== undefined) {
      sheet.snapToIndex(index);
      return;
    }

    sheet.expand();
  };

  const close = (id: BottomSheetId) => {
    sheets.current[id]?.close();
  };

  const present = (id: BottomSheetId) => {
    const sheet = sheets.current[id];

    if ('present' in sheet) {
      sheet.present();
    }
  };

  return (
    <BottomSheetContext.Provider value={{ register, open, close, present }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export const useBottomSheet = (id: BottomSheetId) => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }

  const ref = useRef<CombinedSheets>(null);

  const { register, close, open, present } = context;

  useEffect(() => {
    if (ref.current) {
      console.log('registering bottom sheet:', id, ref.current);
      register(id, ref.current);
    }
  }, [id, register]);

  return {
    ref,
    open: (index?: number) => open(id, index),
    close: () => close(id),
    present: () => present(id),
  };
};

export default BottomSheetProvider;
