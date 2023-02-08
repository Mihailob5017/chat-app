import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './slices';

export const store = configureStore({
  reducer: {
    state: stateReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
