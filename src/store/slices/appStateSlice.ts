import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AppState {
  theme: 'light' | 'dark';
  isLoading: boolean;
}

const initialState: AppState = {
  theme: 'light',
  isLoading: false,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.theme === 'light') {
        state.theme = 'dark';
      } else {
        state.theme = 'light';
      }
    },
  },
});

export const {toggleTheme} = appStateSlice.actions;

export default appStateSlice.reducer;
