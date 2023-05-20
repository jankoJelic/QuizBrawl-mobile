import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import NavHeader from 'components/layout/NavHeader';
import RoomTile from 'components/tiles/RoomTile';
import BodyLarge from 'components/typography/BodyLarge';
import { LOBBY_IDS } from 'constants/constants';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
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
  const lobbyRooms = rooms.filter(room => room?.lobby?.id === lobbyId);

  const [passwordPopupVisible, setPasswordPopupVisible] = useState(false);

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
      if (!!item.password) {
        openPasswordPopup();
        return;
      }

      SOCKET.emit(SOCKET_EVENTS.USER_JOINED_ROOM, {
        roomId: item.id,
        user: userData,
      });

      navigation.navigate('Room', { room: item });
      dispatch(joinRoom(item));
    };

    return <RoomTile room={item} index={index} onPress={onPressRoom} />;
  };

  const submitPassword = () => {};

  const title = () => {
    if (lobbyId === LOBBY_IDS.ARENA) return 'Arena';
    if (lobbyId === LOBBY_IDS.CASH_GAME) return 'Cash game';
    if (lobbyId === LOBBY_IDS.SOLO) return 'Solo';
    return '';
  };

  return (
    <ScreenWrapper>
      <NavHeader title={title()} fullWidth />
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
      <CTA
        title="Create new room"
        onPress={goToCreateRoom}
        style={styles.cta}
      />
      <Popup
        visible={passwordPopupVisible}
        closeModal={closePasswordPopup}
        title="Enter password"
        firstButtonTitle="Submit"
        secondButtonTitle="Cancel"
        onPressFirstButton={submitPassword}
        onPressSecondButton={closePasswordPopup}
        Content={<InputField />}
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
