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
  statusBar: StatusBarState;
  toast: ToastState;
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
  toast: {
    visible: false,
    text: '',
    type: 'success',
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
    setStatusBar: (state, action: { payload: Partial<StatusBarState> }) => {
      state.statusBar = { ...state.statusBar, ...action.payload };
    },
    showToast: (state, action: { payload: ToastState }) => {
      state.toast = {...action.payload, visible: true};
    },
    hideToast: state => {
      state.toast.visible = false;
    },
  },
});

export const {
  toggleTheme,
  startLoading,
  stopLoading,
  setStatusBar,
  showToast,
  hideToast,
} = appStateSlice.actions;

export default appStateSlice.reducer;

interface ToastState {
  visible?: boolean;
  text: string;
  type: 'success' | 'error' | 'warning';
}

interface StatusBarState {
  topColor: string;
  bottomColor: string;
  barStyle: 'light-content' | 'dark-content';
}
