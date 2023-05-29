import { createSlice } from '@reduxjs/toolkit';
import { Reward, UserData } from 'store/types/authSliceTypes';
import { Lobby, Room, Topic } from 'store/types/dataSliceTypes';

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
    updateTrophies: (state, action) => {
      const currentTrophies = state.userData.trophies;
      const trophiesSum = currentTrophies + action.payload;
      const updatedTrophies = trophiesSum > 0 ? trophiesSum : 0;
      state.userData.trophies = updatedTrophies;
    },
    setFriends: (state, action) => {
      state.userData.friends = action.payload;
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
      if (state.userData.id === user.id) state.userData.room = null;
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
    addMessageToInbox: (state, action) => {
      const currentInbox = !!state.userData.inbox ? state.userData.inbox : [];
      state.userData.inbox = [action.payload].concat(currentInbox);
    },
    deleteMessage: (state, action: { payload: string }) => {
      const currentInbox = !!state.userData.inbox ? state.userData.inbox : [];
      state.userData.inbox = currentInbox.filter(
        mess => mess.id !== action.payload,
      );
    },
    addFriend: (state, action: { payload: Partial<UserData> }) => {
      const currentFriends = state.userData.friends;
      state.userData.friends = [action.payload].concat(currentFriends || []);
    },
    removeFriend: (state, action: { payload: Partial<UserData> }) => {
      const currentFriends = state.userData.friends;
      const updatedFriends = currentFriends.filter(
        f => f.id != action.payload.id,
      );
      state.userData.friends = updatedFriends;
    },
    readMessage: (state, action) => {
      const currentInbox = state.userData.inbox;

      const updatedInbox = currentInbox?.map(mess =>
        mess.id === action.payload
          ? {
              ...mess,
              read: 'true',
            }
          : mess,
      );

      state.userData.inbox = updatedInbox || [];
    },
    registerAnswer: (
      state,
      action: { payload: { topic: Topic; correct: boolean } },
    ) => {
      const { correct, topic } = action.payload;
      const currentCorrectAnswers = state.userData.correctAnswers || {};
      const currentTotalAnswers = state.userData.totalAnswers || {};
      const currentTopicCorrectAnswers = currentCorrectAnswers[topic] || 0;
      const currentTopicTotalAnswers = currentTotalAnswers[topic] || 0;

      if (correct) {
        state.userData.correctAnswers[topic] = currentTopicCorrectAnswers + 1;
      }
      state.userData.totalAnswers[topic] = currentTopicTotalAnswers + 1;
    },
    updateMoneyBalance: (state, action: { payload: number }) => {
      const currentMoney = state.userData.money;
      const updatedMoney = currentMoney + action.payload;
      state.userData.money = updatedMoney;
    },
    storeReward: (state, action: { payload: Reward }) => {
      switch (action.payload.type) {
        case 'AVATAR':
          const currentUserAvatars = state.userData.avatars;
          const updatedAvatars = currentUserAvatars.concat([
            action.payload.payload,
          ]);
          state.userData.avatars = updatedAvatars;
      }
    },
    registerDailyResult: (
      state,
      action: { payload: { id: number; score: number } },
    ) => {
      let updatedDailies = state.userData.dailies ? state.userData.dailies : {};
      updatedDailies[action.payload.id] = action.payload.score;
      state.userData.dailies = updatedDailies;
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
  addMessageToInbox,
  addFriend,
  removeFriend,
  deleteMessage,
  readMessage,
  setFriends,
  registerAnswer,
  updateTrophies,
  updateMoneyBalance,
  storeReward,
  registerDailyResult,
} = authSlice.actions;

export default authSlice.reducer;
