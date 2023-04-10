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
  statusBar: {
    topColor: string;
    bottomColor: string;
    barStyle: 'light-content' | 'dark-content';
  };
}

const initialState: AppState = {
  theme: 'light',
  colors: lightThemeColors,
  isLoading: false,
  statusBar: {
    topColor: lightThemeColors.mainThemeBackground,
    bottomColor: lightThemeColors.mainThemeBackground,
    barStyle: 'light-content',
  },
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
    setStatusBar: (state, action) => {
      state.statusBar = { ...state.statusBar, ...action.payload };
    },
  },
});

export const { toggleTheme, startLoading, stopLoading, setStatusBar } =
  appStateSlice.actions;

export default appStateSlice.reducer;
