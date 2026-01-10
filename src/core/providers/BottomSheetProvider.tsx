import GorhomBottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from 'react';

type BottomSheetContextType = {
  register: (id: string, ref: GorhomBottomSheet | BottomSheetModal) => void;
  open: (id: string, index?: number) => void;
  close: (id: string) => void;
  present: (id: string) => void;
};

type CombinedSheets = GorhomBottomSheet | BottomSheetModal;

const BottomSheetContext = createContext({} as BottomSheetContextType);

type Props = PropsWithChildren<{}>;

function BottomSheetProvider({ children }: Props) {
  const sheets = useRef<Record<string, CombinedSheets>>(Object.create(null));

  const register = (id: string, ref: CombinedSheets) => {
    sheets.current[id] = ref;
  };

  const open = (id: string, index?: number) => {
    const sheet = sheets.current[id];

    if (index !== undefined && typeof index === 'number') {
      sheet.snapToIndex(index);
      return;
    }

    sheet.expand();
  };

  const close = (id: string) => {
    sheets.current[id]?.close();
  };

  const present = (id: string) => {
    const sheet = sheets.current[id];

    console.log({
      id,
      sheet,
      sheets: sheets.current,
    });

    if (sheet && 'present' in sheet) {
      sheet.present();
      return;
    }

    sheet.expand();
  };

  return (
    <BottomSheetContext.Provider value={{ register, open, close, present }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export const useBottomSheet = (id: string) => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }

  const ref = useRef<CombinedSheets>(null);

  const { register, close, open, present } = context;

  useEffect(() => {
    if (ref.current) {
      register(id, ref.current);
      console.log('registrando sheet com id: ', id);
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
