import SocketIOClient from 'socket.io-client';

export const SOCKET = SocketIOClient(
  'http://localhost:3000/events',

  {
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,
  },
);

export const SOCKET_EVENTS = {
  USER_JOINED_LOBBY: 'USER_JOINED_LOBBY', // in progress
  USER_LEFT_LOBBY: 'USER_LEFT_LOBBY',
  USER_JOINED_ROOM: 'USER_JOINED_ROOM',
  USER_LEFT_ROOM: 'USER_LEFT_ROOM',
  ROOM_CREATED: 'ROOM_CREATED',
  ROOM_DELETED: 'ROOM_DELETED',
};

export type SocketEvent = keyof typeof SOCKET_EVENTS;
