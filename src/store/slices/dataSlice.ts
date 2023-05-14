import { createSlice } from '@reduxjs/toolkit';
import { UserData } from 'store/types/authSliceTypes';
import { Lobby, Room } from 'store/types/dataSliceTypes';

export interface DataState {
  lobbies: Lobby[];
  rooms: Room[];
  userData: UserData;
}

const initialState: DataState = {
  lobbies: [],
  rooms: [],
  userData: <UserData>{},
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
    storeUserData: (state, action) => {
      state.userData = action.payload;
    },
    setProfileColor: (state, action) => {
      state.userData.color = action.payload;
    },
    setUserAvatar: (state, action) => {
      state.userData.avatar = action.payload;
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
    removeUserFromLobby: (state, action) => {
      const { lobbyId, user } = action.payload || {};
      const updatedLobbies = state.lobbies.map(lobby =>
        lobbyId === lobby.id
          ? {
              ...lobby,
              users: lobby.users.filter(u => u.id !== user.id),
            }
          : lobby,
      );
      state.lobbies = updatedLobbies;
    },
    addUserToRoom: (state, action) => {
      const { roomId, user } = action.payload || {};
      const updatedRooms = state.rooms.map(room =>
        roomId === room.id
          ? {
              ...room,
              users: room.users.concat([user]),
            }
          : room,
      );
      state.rooms = updatedRooms;
    },
    removeUserFromRoom: (
      state,
      action: { payload: { user: UserData; room: Room } },
    ) => {
      const {
        room: { id: roomId },
        user,
      } = action.payload || {};
      const updatedRooms = state.rooms.map(room =>
        room.id === roomId
          ? {
              ...room,
              users: room.users.filter(u => u.id !== user.id),
              readyUsers: room.readyUsers.filter(
                id => String(id) !== String(user.id),
              ),
            }
          : room,
      );
      state.rooms = updatedRooms;
    },
    addNewRoom: (state, action: { payload: Room }) => {
      const currentRooms = state.rooms;
      state.rooms = currentRooms.concat([action.payload]);
    },
    removeRoom: (state, action: { payload: Room }) => {
      const currentRooms = state.rooms;
      state.rooms = currentRooms.filter(room => room.id !== action.payload.id);
    },
    joinRoom: (state, action) => {
      state.userData.room = action.payload;
    },
    unreadyUsersInRoom: (state, action) => {
      const roomId = action.payload;
      const updatedRooms = state.rooms.map(r => {
        if (r.id !== roomId) return r;
        return { ...r, readyUsers: [] };
      });
      state.rooms = updatedRooms;
    },
    joinLobby: (state, action) => {
      state.userData.lobby = action.payload;
    },
    exitLobby: state => {
      state.userData.lobby = null;
      const currentLobbies = state.lobbies;
      const updatedLobbies = currentLobbies.map(lobby => {
        if (lobby.users.some(user => user.id === state.userData.id)) {
          return {
            ...lobby,
            users: lobby.users.filter(u => u.id !== state.userData.id),
          };
        } else return lobby;
      });
      state.lobbies = updatedLobbies;
    },
    exitRoom: state => {
      state.userData.room = null;
    },
    setUserReady: (state, action) => {
      const { userId, roomId } = action.payload || {};

      const updatedRooms = state.rooms.map(r =>
        r.id === roomId
          ? {
              ...r,
              readyUsers: r.readyUsers.concat([userId]),
            }
          : r,
      );

      state.rooms = updatedRooms;
    },
  },
});

export const {
  setLobbies,
  setRooms,
  addUserToLobby,
  removeUserFromLobby,
  addUserToRoom,
  removeUserFromRoom,
  addNewRoom,
  removeRoom,
  storeUserData,
  joinLobby,
  joinRoom,
  exitLobby,
  exitRoom,
  setUserReady,
  unreadyUsersInRoom,
  setProfileColor,
  setUserAvatar,
} = authSlice.actions;

export default authSlice.reducer;
