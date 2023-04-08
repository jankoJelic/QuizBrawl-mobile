import { createSlice } from '@reduxjs/toolkit';
import {
  lightThemeColors,
  Colors,
  darkThemeColors,
} from '../../constants/styles/Colors';

export interface AppState {
  theme: 'light' | 'dark';
  colors: Colors;
  isLoading: boolean;
}

const initialState: AppState = {
  theme: 'light',
  colors: lightThemeColors,
  isLoading: false,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.theme === 'light') {
        state.theme = 'dark';
        state.colors = darkThemeColors;
      } else {
        state.theme = 'light';
        state.colors = lightThemeColors;
      }
    },
    startLoading: state => {
      state.isLoading = true;
    },
    stopLoading: state => {
      state.isLoading = false;
    },
  },
});

export const { toggleTheme } = appStateSlice.actions;

export default appStateSlice.reducer;
