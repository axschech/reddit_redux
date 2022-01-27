import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import imagesSlice from '../features/images/imagesSlice';


export const store = configureStore({
  reducer: {
    images: imagesSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
