import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import NavHeader from 'components/layout/NavHeader';
import EventTile from 'components/tiles/EventTile';
import RoomTile from 'components/tiles/RoomTile';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { LOBBY_IDS } from 'constants/constants';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import Popup from 'containers/Popup/Popup';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { joinRoom } from 'store/slices/dataSlice';
import { Room } from 'store/types/dataSliceTypes';

const LobbyScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Lobby'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { lobbyId } = route.params || {};
  const { styles, colors } = useStyles(createStyles);

  const { rooms, userData } = useAppSelector(state => state.data);
  const lobbyRooms = rooms.filter(room => room.lobbyId === lobbyId);

  const [passwordPopupVisible, setPasswordPopupVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room>();

  const isSoloLobby = lobbyId === LOBBY_IDS.SOLO;

  const openPasswordPopup = () => {
    setPasswordPopupVisible(true);
  };

  const closePasswordPopup = () => {
    setPasswordPopupVisible(false);
  };

  const goToCreateRoom = () => {
    navigation.navigate('CreateRoom', { lobbyId });
  };

  const renderItem = ({ item, index }: { item: Room; index: number }) => {
    const onPressRoom = () => {
      setSelectedRoom(item);

      if (!!item.password) {
        openPasswordPopup();
      } else {
        enterRoom(item);
      }
    };

    const onPressEvent = () => {
      
    };

    if (isSoloLobby)
      return <EventTile room={item} index={index} onPress={onPressEvent} />;

    return <RoomTile room={item} index={index} onPress={onPressRoom} />;
  };

  const enterRoom = (room: Room) => {
    dispatch(joinRoom(room));
    SOCKET.emit(SOCKET_EVENTS.USER_JOINED_ROOM, {
      roomId: room.id,
      user: userData,
    });

    navigation.navigate('Room', { room });
  };

  const submitPassword = () => {
    if (passwordInput === selectedRoom?.password) {
      enterRoom(selectedRoom);
    } else {
      setPasswordInputError(true);
    }
  };

  const title = () => {
    if (lobbyId === LOBBY_IDS.ARENA) return 'Arena';
    if (lobbyId === LOBBY_IDS.CASH_GAME) return 'Cash game';
    if (lobbyId === LOBBY_IDS.SOLO) return 'Solo';
    return '';
  };

  const leaveLobby = () => {
    SOCKET.emit(SOCKET_EVENTS.USER_LEFT_LOBBY, { lobbyId, user: userData });
    navigation.navigate('Landing');
  };

  return (
    <ScreenWrapper>
      <NavHeader
        title={title()}
        fullWidth
        onPressLeftIcon={leaveLobby}
        onPressRightIcon={leaveLobby}
      />
      {isSoloLobby ? (
        <>
          <BodyMedium text="Daily challenges" weight="semiBold" />
          <BodyMedium
            color="neutral300"
            text="Win a buck for every correct answer and special rewards for completing an event with 100% efficiency"
            style={{ marginBottom: AN(10) }}
          />
        </>
      ) : (
        <></>
      )}
      {lobbyRooms?.length ? (
        <FlatList
          data={lobbyRooms}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{ paddingTop: AN(20) }}
          keyExtractor={item => item.id + 'room'}
        />
      ) : (
        <BodyLarge text="No open rooms" style={styles.emptyState} />
      )}
      {lobbyId !== LOBBY_IDS.SOLO ? (
        <CTA
          title="Create new room"
          onPress={goToCreateRoom}
          style={styles.cta}
        />
      ) : (
        <></>
      )}
      <Popup
        visible={passwordPopupVisible}
        closeModal={closePasswordPopup}
        title="Enter password"
        firstButtonTitle="Submit"
        secondButtonTitle="Cancel"
        onPressFirstButton={submitPassword}
        onPressSecondButton={closePasswordPopup}
        Content={
          <InputField
            value={passwordInput}
            onChangeText={setPasswordInput}
            error={passwordInputError}
          />
        }
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    roomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginVertical: AN(4.2),
    },
    cta: { position: 'absolute', bottom: AN(10), alignSelf: 'center' },
    emptyState: { textAlign: 'center', marginTop: AN(30) },
  });

export default LobbyScreen;
