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
    addUserToLobby: (state, action) => {
      const { lobbyId, user } = action.payload || {};
      const updatedLobbies = state.lobbies.map(lobby =>
        lobby.id === lobbyId
          ? {
              ...lobby,
              users: (lobby?.users || []).concat(user),
            }
          : lobby,
      );
      state.lobbies = updatedLobbies;
    },
  },
});

export const { setLobbies, setRooms, addUserToLobby } = authSlice.actions;

export default authSlice.reducer;
