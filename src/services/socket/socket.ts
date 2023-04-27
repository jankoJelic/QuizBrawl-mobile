import SocketIOClient from 'socket.io-client';

export const SOCKET = SocketIOClient(
  'http://localhost:3000/events',

  {
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,
  },
);
