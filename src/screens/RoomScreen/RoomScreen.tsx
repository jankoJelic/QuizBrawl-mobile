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
import MyScrollView from 'hoc/MyScrollView';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { startLoading } from 'store/slices/appStateSlice';
import { removeUserFromRoom } from 'store/slices/dataSlice';
import { UserData } from 'store/types/authSliceTypes';
import { Room } from 'store/types/dataSliceTypes';

const RoomScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Room'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { onQuestion } = useAppSelector(state => state.game);
  const { rooms, userData } = useAppSelector(state => state.data);
  const room = rooms.find(r => r.id === route.params.room.id);

  const {
    name,
    userId,
    maxPlayers,
    users,
    questionsCount,
    topic,
    password,
    answerTime,
    readyUsers,
    hostName,
  } = room || {};

  const isRoomAdmin = userId === userData.id;

  const [userActionSheetVisible, setUserActionSheetVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData>();

  const youAreSelected = selectedUser?.id === userData.id;

  useEffect(() => {
    if (onQuestion === 0) {
      navigation.navigate('GameSplash');
    }
  }, [onQuestion]);

  const onPressLeftArrow = () => {
    navigation.navigate('Lobby', { lobbyId: room?.lobbyId as number });
    SOCKET.emit(SOCKET_EVENTS.USER_LEFT_ROOM, { user: userData, room });
    dispatch(removeUserFromRoom({ room: room as Room, user: userData }));
  };

  const startGame = async () => {
    dispatch(startLoading());
    SOCKET.emit(SOCKET_EVENTS.GAME_STARTED, { room });
  };

  const roomIsFull = users?.length === maxPlayers;
  const startGameDisabled = !roomIsFull || readyUsers?.length !== maxPlayers;
  const youAreReady = readyUsers?.includes(userData?.id);

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

  const sendFriendRequest = async () => {
    SOCKET.emit(SOCKET_EVENTS.FRIEND_REQUEST_SENT, {
      user: userData,
      recipientId: selectedUser?.id,
    });
    closeUserActionSheet();
  };

  const closeUserActionSheet = () => {
    setUserActionSheetVisible(false);
    setTimeout(() => {
      setSelectedUser(undefined);
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
        <InfoLine title="Host:" value={hostName} />
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
        {youAreSelected ? (
          <></>
        ) : (
          <GhostButton
            title="+ Send friend request"
            onPress={sendFriendRequest}
          />
        )}
        {isRoomAdmin && !youAreSelected ? (
          <>
            <GhostButton
              title="Kick from room"
              onPress={kickPlayerFromRoom}
              color="danger500"
            />
          </>
        ) : (
          <></>
        )}
      </ActionSheet>
    </ScreenWrapper>
  );
};

export default RoomScreen;
