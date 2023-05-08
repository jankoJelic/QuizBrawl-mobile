import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import InfoLine from 'components/tiles/InfoLine/InfoLine';
import UserTile from 'components/tiles/UserTile/UserTile';
import { AN } from 'constants/styles/appStyles';
import Popup from 'containers/Popup/Popup';
import MyScrollView from 'hoc/MyScrollView';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';

const ArenaRoomScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'ArenaRoom'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { onQuestion } = useAppSelector(state => state.game);
  const { rooms, userData } = useAppSelector(state => state.data);
  const room = rooms.find(r => r.id === route.params.room.id);

  const {
    name,
    admin,
    maxPlayers,
    users,
    questionsCount,
    topic,
    password,
    answerTime,
    id,
    readyUsers
  } = room || {};

  const isRoomAdmin = admin?.id === userData.id;

  const [areYouSureModalVisible, setAreYouSureModalVisible] = useState(false);

  useEffect(() => {
    if (onQuestion === 0) {
      navigation.navigate('GameSplash');
    }
  }, [onQuestion]);

  const closeAreYouSureModal = () => {
    setAreYouSureModalVisible(false);
  };

  const onPressLeftArrow = () => {
    if (isRoomAdmin) {
      setAreYouSureModalVisible(true);
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    return () => {
      SOCKET.emit(SOCKET_EVENTS.USER_LEFT_ROOM, { roomId: id, user: userData });
    };
  }, []);

  // this one only triggers for room admins
  const exitAndDeleteRoom = async () => {
    dispatch(startLoading());
    try {
      await API.deleteRoom(route.params.room.id);
      SOCKET.emit(SOCKET_EVENTS.ROOM_DELETED, route.params.room);
      navigation.navigate('ArenaLobby');
    } catch (e) {
    } finally {
      dispatch(stopLoading());
    }
  };

  const startGame = async () => {
    dispatch(startLoading());
    SOCKET.emit(SOCKET_EVENTS.GAME_STARTED, room);
  };

  const roomIsFull = users?.length === maxPlayers;

  const startGameDisabled = !roomIsFull;

  return (
    <ScreenWrapper>
      <NavHeader
        title={`Room ${name}`}
        fullWidth
        style={{ marginBottom: AN(20) }}
        onPressLeftIcon={onPressLeftArrow}
        showRightIcon={false}
      />
      <MyScrollView>
        <InfoLine title="Host:" value={admin?.firstName} />
        <InfoLine title="Topic:" value={topic} />
        <InfoLine
          title="Players:"
          value={`${String(users?.length)}/${String(maxPlayers)}`}
        />
        <InfoLine title="Answer time:" value={`${answerTime} seconds`} />
        <InfoLine title="Number of questions:" value={String(questionsCount)} />
        <View style={{ marginVertical: AN(10) }}>
          {users?.map(u => (
            <UserTile user={u} />
          ))}
        </View>
        <CTA
          onPress={startGame}
          title="Start Game"
          disabled={startGameDisabled}
        />
      </MyScrollView>
      <Popup
        visible={areYouSureModalVisible}
        closeModal={closeAreYouSureModal}
        title="Are you sure you want to exit room?"
        text="You are the room creator. If you exit, the room will be deleted"
        firstButtonTitle="No, stay"
        secondButtonTitle="Yes, exit"
        onPressFirstButton={closeAreYouSureModal}
        onPressSecondButton={exitAndDeleteRoom}
      />
    </ScreenWrapper>
  );
};

export default ArenaRoomScreen;
