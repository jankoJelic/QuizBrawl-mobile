import { LOBBY_IDS } from 'constants/constants';
import { navigate } from 'navigation/MainStackNavigator';
import API from 'services/api';
import { CreateRoomBody } from 'services/api/endpoints/roomsAPI';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { store } from 'store/index';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';
import { addNewRoom, joinRoom } from 'store/slices/dataSlice';
import { initializeGame } from 'store/slices/gameSlice';
import { Lobby, Room, Topic } from 'store/types/dataSliceTypes';

export const goToRoomScreen = (room: Room) => {
  const state = store.getState();
  store.dispatch(joinRoom(room));
  SOCKET.emit(SOCKET_EVENTS.USER_JOINED_ROOM, {
    roomId: room.id,
    user: state.data.userData,
  });
  navigate('Room', { room });
};

export const goToSoloEvent = async (room: Room) => {
  store.dispatch(startLoading());
  const state = store.getState();
  const userData = state.data.userData;

  try {
    const questions = await API.startDailyEvent(room.id);
    store.dispatch(
      initializeGame({
        room: { ...room, users: [userData] },
        questions,
      }),
    );
    navigate('GameSplash');
  } catch (error) {
  } finally {
    store.dispatch(stopLoading());
  }
};

export const quickRoomData = () => {
  const state = store.getState();
  const { userData, lobbies } = state.data;
  const roomName = `${userData.firstName}'s room`;
  return {
    name: roomName,
    topic: 'General' as Topic,
    answerTime: 12,
    maxPlayers: 2,
    lobby: lobbies.find(l => l.id === LOBBY_IDS.ARENA) as Lobby,
    questionsCount: 10,
    readyUsers: [userData.id],
    password: '',
  };
};

export const createNewRoom = async (body?: CreateRoomBody) => {
  store.dispatch(startLoading());
  try {
    const payload = body || quickRoomData();
    const room = await API.createRoom(payload);
    store.dispatch(joinRoom(room));
    store.dispatch(addNewRoom(room));

    SOCKET.emit(SOCKET_EVENTS.ROOM_CREATED, room);

    navigate('Room', { room });
  } catch (e) {
  } finally {
    store.dispatch(stopLoading());
  }
};
