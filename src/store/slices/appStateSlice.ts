import { createSlice } from '@reduxjs/toolkit';
import {
  lightThemeColors,
  Colors,
  darkThemeColors,
} from '../../constants/styles/Colors';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { playSound } from 'services/sounds/soundPlayer';

type Currency = 'trophies' | 'points' | 'money';
type Reward = {
  visible: boolean;
  amount: number;
  currency: Currency;
};
export interface AppState {
  theme: 'light' | 'dark';
  colors: Colors;
  isLoading: boolean;
  statusBar: StatusBarState;
  toast: ToastState;
  sideBarVisible: boolean;
  reward: Reward;
}

const initialRewardState = {
  visible: false,
  amount: 0,
  currency: 'trophies' as Currency,
};

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
    remoteMessage: {},
  },
  sideBarVisible: false,
  reward: initialRewardState,
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
      playSound('notification');
      state.toast = { ...action.payload, visible: true };
    },
    hideToast: state => {
      state.toast.visible = false;
      state.toast.remoteMessage = {};
    },
    showSideBar: state => {
      state.sideBarVisible = true;
    },
    hideSideBar: state => {
      state.sideBarVisible = false;
    },
    hideReward: state => {
      state.reward.visible = false;
    },
    showReward: (state, action: { payload: Reward }) => {
      state.reward = {
        visible: true,
        amount: action.payload.amount,
        currency: action.payload.currency,
      };
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
  showSideBar,
  hideSideBar,
  hideReward,
  showReward,
} = appStateSlice.actions;

export default appStateSlice.reducer;

interface ToastState {
  visible?: boolean;
  text: string;
  type: 'success' | 'error' | 'warning';
  remoteMessage?: FirebaseMessagingTypes.RemoteMessage | {};
}

interface StatusBarState {
  topColor: string;
  bottomColor: string;
  barStyle: 'light-content' | 'dark-content';
}
