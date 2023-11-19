import { store } from 'store/index';
import { SOCKET, SOCKET_EVENTS } from './socket';
import {
  Question,
  UserJoinedLobbyPayload,
  UserJoinedRoomPayload,
} from './socketPayloads';
import {
  addFriend,
  addMessageToInbox,
  addNewRoom,
  addUserToLobby,
  addUserToRoom,
  removeFriend,
  removeRoom,
  removeUserFromLobby,
  removeUserFromRoom,
  setUserReady,
  unreadyUsersInRoom,
} from 'store/slices/dataSlice';
import { Room } from 'store/types/dataSliceTypes';
import { showToast, stopLoading } from 'store/slices/appStateSlice';
import { initializeGame } from 'store/slices/gameSlice';
import { LOBBY_IDS } from 'constants/constants';
import { ShallowUser, UserData } from 'store/types/authSliceTypes';

const {
  USER_JOINED_LOBBY,
  ROOM_CREATED,
  ROOM_DELETED,
  USER_JOINED_ROOM,
  USER_LEFT_LOBBY,
  USER_LEFT_ROOM,
  USER_DISCONNECTED,
  GAME_STARTED,
  USER_READY,
  KICK_USER_FROM_ROOM,
  FRIEND_REQUEST_SENT,
  FRIEND_REQUEST_ACCEPTED,
  FRIEND_REMOVED,
} = SOCKET_EVENTS;

export const connectToSocket = (navigation: any) => {
  if (SOCKET.connected) return;

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

  SOCKET.on(KICK_USER_FROM_ROOM, (payload: UserJoinedRoomPayload) => {
    dispatch(removeUserFromRoom(payload));

    const state = store.getState();
    const {
      userData: { id: myId, room: myRoom, lobby },
    } = state.data || {};
    const { user, room } = payload || {};

    const iWasKicked = user?.id === myId;

    if (iWasKicked) {
      navigation.navigate('Lobby', { lobbyId: lobby?.id });
      dispatch(
        showToast({
          text: 'You got kicked from the room',
          visible: true,
          type: 'error',
        }),
      );
    }
  });

  SOCKET.on(ROOM_CREATED, (payload: Room) => {
    const state = store.getState();
    const {
      data: { rooms },
    } = state;
    const roomAlreadyExists = rooms.some(r => r.id === payload.id);
    if (roomAlreadyExists) return;
    dispatch(addNewRoom(payload));
  });

  SOCKET.on(ROOM_DELETED, (payload: Room) => {
    const state = store.getState();

    const { userData } = state.data;
    dispatch(removeRoom(payload));

    if (userData?.room?.id === payload?.id) {
      const lobbyId = userData.lobby.id;

      if (lobbyId === LOBBY_IDS.ARENA) {
        dispatch(
          showToast({
            text: 'Room dismissed',
            type: 'warning',
          }),
        );
        navigation.navigate('Lobby', { lobbyId: LOBBY_IDS.ARENA });
      }
    }
  });

  SOCKET.on(USER_READY, ({ roomId, userId }) => {
    dispatch(setUserReady({ roomId, userId }));
  });

  SOCKET.on(
    GAME_STARTED,
    ({ questions, roomId }: { questions: Question[]; roomId: number }) => {
      const state = store.getState();
      const {
        data: { userData, rooms },
      } = state || {};

      dispatch(unreadyUsersInRoom(roomId));
      if (userData?.room?.id !== roomId) return;

      dispatch(
        initializeGame({
          room: rooms?.find(r => r?.id === userData?.room?.id) as Room,
          questions,
        }),
      );
      dispatch(stopLoading());
    },
  );

  SOCKET.on(FRIEND_REQUEST_SENT, ({ friendRequest }) => {
    dispatch(
      showToast({ text: friendRequest.title, type: friendRequest.type }),
    );
    dispatch(addMessageToInbox(friendRequest));
  });

  SOCKET.on(FRIEND_REQUEST_ACCEPTED, (user: UserData) => {
    dispatch(
      showToast({
        text: `${user.firstName} accepted your friend request`,
        type: 'success',
      }),
    );
    dispatch(addFriend(user));
  });

  SOCKET.on(FRIEND_REMOVED, (userId: number) => {
    const state = store.getState();

    const friendThatNeedsToBeRemoved = state.data.userData.friends?.find(
      (fr: ShallowUser) => fr?.id == userId,
    );
    dispatch(removeFriend(friendThatNeedsToBeRemoved as Partial<UserData>));
  });

  SOCKET.on(USER_DISCONNECTED, (userId: number) => {});
};
