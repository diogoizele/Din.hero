import { useDispatch } from 'react-redux';

import { AppDispatch, RootState, store } from '@core/config/redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
): TSelected => {
  return selector(store.getState());
};
