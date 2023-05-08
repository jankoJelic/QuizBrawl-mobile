import { store } from 'store/index';
import { SOCKET, SOCKET_EVENTS } from './socket';
import {
  CorrectAnswer,
  Question,
  UserJoinedLobbyPayload,
  UserJoinedRoomPayload,
} from './socketPayloads';
import {
  addNewRoom,
  addUserToLobby,
  addUserToRoom,
  removeRoom,
  removeUserFromLobby,
  removeUserFromRoom,
} from 'store/slices/dataSlice';
import { Room } from 'store/types/dataSliceTypes';
import { showToast, stopLoading } from 'store/slices/appStateSlice';
import { UserData } from 'store/types/authSliceTypes';
import {
  SelectedAnswerPayload,
  initializeGame,
  selectCorrectQuestion,
  selectWrongQuestion,
} from 'store/slices/gameSlice';

const {
  USER_JOINED_LOBBY,
  ROOM_CREATED,
  ROOM_DELETED,
  USER_JOINED_ROOM,
  USER_LEFT_LOBBY,
  USER_LEFT_ROOM,
  USER_DISCONNECTED,
  GAME_STARTED,
} = SOCKET_EVENTS;

export const connectToSocket = (navigation: any) => {
  const { dispatch } = store;

  SOCKET.on(USER_JOINED_LOBBY, (payload: UserJoinedLobbyPayload) => {
    dispatch(addUserToLobby(payload));
  });

  SOCKET.on(USER_LEFT_LOBBY, (payload: UserJoinedLobbyPayload) => {
    dispatch(removeUserFromLobby(payload));
  });

  SOCKET.on(USER_JOINED_ROOM, (payload: UserJoinedRoomPayload) => {
    dispatch(addUserToRoom(payload));
  });

  SOCKET.on(USER_LEFT_ROOM, (payload: UserJoinedRoomPayload) => {
    dispatch(removeUserFromRoom(payload));
  });

  SOCKET.on(ROOM_CREATED, (payload: Room) => {
    dispatch(addNewRoom(payload));
  });

  SOCKET.on(ROOM_DELETED, (payload: Room) => {
    const state = store.getState();

    const { userData } = state.data;
    dispatch(removeRoom(payload));

    if (userData?.room?.id === payload?.id) {
      const lobbyId = userData.lobby.id;

      switch (lobbyId) {
        case 1:
          dispatch(
            showToast({
              visible: true,
              text: 'Room dismissed',
              type: 'warning',
            }),
          );
          navigation.navigate('ArenaLobby');
        default:
          return;
      }
    }
  });

  SOCKET.on(GAME_STARTED, (questions: Question[]) => {
    const state = store.getState();
    const {
      data: { userData, rooms },
    } = state || {};

    dispatch(
      initializeGame({
        room: rooms.find(r => r.id === userData.room.id) as Room,
        questions,
      }),
    );
    dispatch(stopLoading());
  });

  // SOCKET.on(USER_DISCONNECTED, (payload: UserData) => {

  // })
};
