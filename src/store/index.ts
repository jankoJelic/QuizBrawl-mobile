import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './slices/appStateSlice';
import authReducer from './slices/authSlice';
import dataReducer from './slices/dataSlice';
import gameReducer from './slices/gameSlice';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    auth: authReducer,
    data: dataReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
