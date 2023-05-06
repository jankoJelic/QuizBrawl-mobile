import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import RoomTile from 'components/tiles/RoomTile';
import { LOBBY_IDS } from 'constants/constants';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { joinRoom } from 'store/slices/dataSlice';
import { Room } from 'store/types/dataSliceTypes';

const ArenaLobbyScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'ArenaLobby'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles, colors } = useStyles(createStyles);
  const { rooms, userData } = useAppSelector(state => state.data);

  const arenaRooms = rooms.filter(room => room?.lobby?.id === LOBBY_IDS.ARENA);

  const goToCreateArenaRoom = () => {
    navigation.navigate('CreateArenaRoom');
  };

  const renderItem = ({ item, index }: { item: Room; index: number }) => {
    const onPressRoom = () => {
      SOCKET.emit(SOCKET_EVENTS.USER_JOINED_ROOM, {
        roomId: item.id,
        user: userData,
      });

      navigation.navigate('ArenaRoom', { room: item });
      dispatch(joinRoom(item));
    };

    return <RoomTile room={item} index={index} onPress={onPressRoom} />;
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Arena" fullWidth />
      <FlatList
        data={arenaRooms}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingTop: AN(20) }}
        keyExtractor={item => item.id + 'room'}
      />
      <CTA title="Create new room" onPress={goToCreateArenaRoom} />
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
  });

export default ArenaLobbyScreen;
