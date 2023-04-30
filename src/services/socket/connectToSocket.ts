import { store } from 'store/index';
import { SOCKET, SOCKET_EVENTS } from './socket';
import {
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

const {
  USER_JOINED_LOBBY,
  ROOM_CREATED,
  ROOM_DELETED,
  USER_JOINED_ROOM,
  USER_LEFT_LOBBY,
  USER_LEFT_ROOM,
} = SOCKET_EVENTS;

export const connectToSocket = () => {
  SOCKET.on(USER_JOINED_LOBBY, (payload: UserJoinedLobbyPayload) => {
    store.dispatch(addUserToLobby(payload));
  });

  SOCKET.on(USER_LEFT_LOBBY, (payload: UserJoinedLobbyPayload) => {
    store.dispatch(removeUserFromLobby(payload));
  });

  SOCKET.on(USER_JOINED_ROOM, (payload: UserJoinedRoomPayload) => {
    store.dispatch(addUserToRoom(payload));
  });

  SOCKET.on(USER_LEFT_ROOM, (payload: UserJoinedRoomPayload) => {
    store.dispatch(removeUserFromRoom(payload));
  });

  SOCKET.on(ROOM_CREATED, (payload: Room) => {
    store.dispatch(addNewRoom(payload));
  });

  SOCKET.on(ROOM_DELETED, (payload: Room) => {
    store.dispatch(removeRoom(payload));
  });
};
