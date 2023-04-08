import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  userData: {};
  isLoggedIn: boolean;
}

const initialState: AppState = {
  userData: {},
  isLoggedIn: false,
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
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
