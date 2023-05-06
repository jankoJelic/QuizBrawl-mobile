import { BASE_URL } from 'constants/env/envConstants';
import SocketIOClient from 'socket.io-client';
import { store } from 'store/index';

export const SOCKET = SocketIOClient(`${BASE_URL}/events`, {
  transports: ['websocket'],
  autoConnect: true,
  forceNew: true,
  query: { userId: store.getState().data.userData.id },
});

export const SOCKET_EVENTS = {
  USER_JOINED_LOBBY: 'USER_JOINED_LOBBY', // in progress
  USER_LEFT_LOBBY: 'USER_LEFT_LOBBY',
  USER_JOINED_ROOM: 'USER_JOINED_ROOM',
  USER_LEFT_ROOM: 'USER_LEFT_ROOM',
  ROOM_CREATED: 'ROOM_CREATED',
  ROOM_DELETED: 'ROOM_DELETED',
  USER_DISCONNECTED: 'USER_DISCONNECTED',
  GAME_STARTED: 'GAME_STARTED',
};

export type SocketEvent = keyof typeof SOCKET_EVENTS;
