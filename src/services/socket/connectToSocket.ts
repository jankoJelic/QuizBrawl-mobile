import { store } from 'store/index';
import { SOCKET, SOCKET_EVENTS } from './socket';
import {
  UserJoinedLobbyPayload,
  UserJoinedRoomPayload,
} from './socketPayloads';
import {
  addUserToLobby,
  addUserToRoom,
  removeUserFromLobby,
  removeUserFromRoom,
} from 'store/slices/dataSlice';

export const connectToSocket = () => {
  SOCKET.on(
    SOCKET_EVENTS.USER_JOINED_LOBBY,
    (payload: UserJoinedLobbyPayload) => {
      store.dispatch(addUserToLobby(payload));
    },
  );

  SOCKET.on(
    SOCKET_EVENTS.USER_LEFT_LOBBY,
    (payload: UserJoinedLobbyPayload) => {
      store.dispatch(removeUserFromLobby(payload));
    },
  );

  SOCKET.on(
    SOCKET_EVENTS.USER_JOINED_ROOM,
    (payload: UserJoinedRoomPayload) => {
      store.dispatch(addUserToRoom(payload));
    },
  );

  SOCKET.on(SOCKET_EVENTS.USER_LEFT_ROOM, (payload: UserJoinedRoomPayload) => {
    store.dispatch(removeUserFromRoom(payload));
  });
};
