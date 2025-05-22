import { create } from 'zustand';

interface AppStoreSchema {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const AppStateSelectors = {
  isLoading: (state: AppStoreSchema) => state.isLoading,
  setLoading: (state: AppStoreSchema) => state.setLoading,
};

export const AppStore = create<AppStoreSchema>(set => ({
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));

const useApp = () => {
  const isLoading = AppStore(AppStateSelectors.isLoading);
  const setLoading = AppStore(AppStateSelectors.setLoading);

  return {
    isLoading,
    setLoading,
  };
};
export default useApp;
