import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app-slice';
import gomokuReducer from './gomoku-slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    gomoku: gomokuReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
