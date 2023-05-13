import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import RoundButton from 'components/buttons/RoundButton/RoundButton';
import NavHeader from 'components/layout/NavHeader';
import InfoLine from 'components/tiles/InfoLine/InfoLine';
import UserTile from 'components/tiles/UserTile/UserTile';
import BodyLarge from 'components/typography/BodyLarge';
import { AN } from 'constants/styles/appStyles';
import ActionSheet from 'containers/ActionSheet';
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
import { UserData } from 'store/types/authSliceTypes';

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
    readyUsers,
  } = room || {};

  const isRoomAdmin = admin?.id === userData.id;

  const [areYouSureModalVisible, setAreYouSureModalVisible] = useState(false);
  const [userActionSheetVisible, setUserActionSheetVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData>();

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
      SOCKET.emit(SOCKET_EVENTS.USER_LEFT_ROOM, { user: userData, room });
    }
  };

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

  const startGameDisabled = !roomIsFull || readyUsers?.length !== maxPlayers;

  const youAreReady = readyUsers?.includes(userData.id);

  const onPressReady = () => {
    SOCKET.emit(SOCKET_EVENTS.USER_READY, {
      isReady: true,
      userId: userData.id,
      roomId: room?.id,
    });
  };

  const showUserInfo = (user: UserData) => {
    setSelectedUser(user);
    setUserActionSheetVisible(true);
  };

  const kickPlayerFromRoom = () => {
    SOCKET.emit(SOCKET_EVENTS.KICK_USER_FROM_ROOM, {
      user: selectedUser,
      room,
    });
    closeUserActionSheet();
  };

  const closeUserActionSheet = () => {
    setUserActionSheetVisible(false);
    setTimeout(() => {
      setSelectedUser();
    }, 300);
  };

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
            <UserTile
              user={u}
              isReady={readyUsers?.includes(u.id)}
              onPress={showUserInfo}
            />
          ))}
        </View>
        <CTA
          onPress={startGame}
          title="Start Game"
          disabled={startGameDisabled}
        />
        {!youAreReady ? (
          <RoundButton
            title="Ready"
            style={{ alignSelf: 'center', marginTop: AN(10) }}
            color="success500"
            size={AN(50)}
            onPress={onPressReady}
          />
        ) : (
          <></>
        )}
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
      <ActionSheet
        visible={userActionSheetVisible && !!selectedUser}
        close={closeUserActionSheet}>
        <BodyLarge
          text={`${selectedUser?.firstName} ${selectedUser?.lastName}`}
          weight="bold"
          style={{ marginBottom: AN(24) }}
        />
        <InfoLine title="Level" value={String(selectedUser?.level)} />
        <InfoLine
          title="Accuracy"
          value={String(selectedUser?.accuracyPercentage) + '%'}
        />
        <InfoLine
          title="Favourite topic"
          value={selectedUser?.favouriteTopic}
        />
        <InfoLine title="Rank" value={String(selectedUser?.rank)} />
        {isRoomAdmin && selectedUser?.id !== userData.id ? (
          <GhostButton
            title="Kick from room"
            onPress={kickPlayerFromRoom}
            color="danger500"
          />
        ) : (
          <></>
        )}
      </ActionSheet>
    </ScreenWrapper>
  );
};

export default ArenaRoomScreen;
