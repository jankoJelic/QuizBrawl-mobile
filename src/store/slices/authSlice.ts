import { createSlice } from '@reduxjs/toolkit';
import { UserData } from 'store/types/authSliceTypes';

export interface AppState {
  userData: UserData;
  isLoggedIn: boolean;
}

const initialState: AppState = {
  userData: <UserData>{},
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
    storeUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, storeUserData } = authSlice.actions;

export default authSlice.reducer;
