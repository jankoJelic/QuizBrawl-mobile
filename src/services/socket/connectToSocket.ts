import { store } from 'store/index';
import { SOCKET } from './socket';
import { UserJoinedLobbyPayload } from './socketPayloads';
import { addUserToLobby } from 'store/slices/dataSlice';

export const connectToSocket = () => {
  SOCKET.on('USER_JOINED_LOBBY', (payload: UserJoinedLobbyPayload) => {
    store.dispatch(addUserToLobby(payload));
  });
};
