import { store } from 'store/index';
import { SOCKET, SOCKET_EVENTS } from './socket';
import { UserJoinedLobbyPayload } from './socketPayloads';
import { addUserToLobby } from 'store/slices/dataSlice';

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
      
    },
  );

  SOCKET.on(SOCKET_EVENTS.USER_JOINED_ROOM, () => {});

  SOCKET.on(SOCKET_EVENTS.USER_LEFT_ROOM, () => {});
};
