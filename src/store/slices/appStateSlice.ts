import { createSlice } from '@reduxjs/toolkit';
import { Colors, lightThemeColors } from 'constants/styles/Colors';

export interface AppState {
  theme: 'light' | 'dark';
  isLoading: boolean;
  colors: Colors;
}

const initialState: AppState = {
  theme: 'light',
  isLoading: false,
  colors: lightThemeColors,
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

export const { toggleTheme } = appStateSlice.actions;

export default appStateSlice.reducer;
