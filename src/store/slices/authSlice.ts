import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  isLoggedIn: boolean;
  musicEnabled: boolean;
}

const initialState: AppState = {
  isLoggedIn: false,
  musicEnabled: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isLoggedIn = true;
    },
    logout: state => {
      state.isLoggedIn = false;
    },
    setMusicEnabled: (state, action) => {
      state.musicEnabled = action.payload;
    },
  },
});

export const { login, logout, setMusicEnabled } = authSlice.actions;

export default authSlice.reducer;
