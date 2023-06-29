import { navigate } from 'navigation/MainStackNavigator';
import API from 'services/api';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { store } from 'store/index';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';
import { joinRoom } from 'store/slices/dataSlice';
import { initializeGame } from 'store/slices/gameSlice';
import { Room } from 'store/types/dataSliceTypes';

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
