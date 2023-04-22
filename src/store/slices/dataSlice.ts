import { createSlice } from '@reduxjs/toolkit';
import { Lobby, Room } from 'store/types/dataSliceTypes';

export interface DataState {
  lobbies: Lobby[];
  rooms: Room[];
}

const initialState: DataState = {
  lobbies: [],
  rooms: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setLobbies: (state, action) => {
      state.lobbies = action.payload;
    },
  },
});

export const { setLobbies, setRooms } = authSlice.actions;

export default authSlice.reducer;
