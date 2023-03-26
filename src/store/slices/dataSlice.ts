import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface DataSlice {
  carriers: {
    [key: string]: {
      name: string;
      iata: string;
    };
  };
}

const initialState: DataSlice = {
  carriers: {},
};

export const dataSlice = createSlice({
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

export const {toggleTheme} = dataSlice.actions;

export default dataSlice.reducer;
