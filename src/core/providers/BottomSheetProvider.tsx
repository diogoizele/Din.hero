import GorhomBottomSheet from '@gorhom/bottom-sheet';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from 'react';

type BottomSheetId = 'billTypeInfo' | 'billRecurrentFixedAmount';

type BottomSheetContextType = {
  register: (id: BottomSheetId, ref: GorhomBottomSheet) => void;
  open: (id: BottomSheetId) => void;
  close: (id: BottomSheetId) => void;
};

const BottomSheetContext = createContext({} as BottomSheetContextType);

type Props = PropsWithChildren<{}>;

function BottomSheetProvider({ children }: Props) {
  const sheets = useRef<Record<BottomSheetId, GorhomBottomSheet>>(
    Object.create(null),
  );

  const register = (id: BottomSheetId, ref: GorhomBottomSheet) => {
    sheets.current[id] = ref;
  };

  const open = (id: BottomSheetId) => {
    sheets.current[id]?.expand();
  };

  const close = (id: BottomSheetId) => {
    sheets.current[id]?.close();
  };

  return (
    <BottomSheetContext.Provider value={{ register, open, close }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export const useBottomSheet = (id: BottomSheetId) => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }

  const ref = useRef<GorhomBottomSheet>(null);

  const { register, close, open } = context;

  useEffect(() => {
    if (ref.current) {
      register(id, ref.current);
    }
  }, [id, register]);

  return { ref, open: () => open(id), close: () => close(id) };
};

export default BottomSheetProvider;
