import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import RoomTile from 'components/tiles/RoomTile';
import { LOBBY_IDS } from 'constants/constants';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { Room } from 'store/types/dataSliceTypes';

const ArenaLobbyScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'ArenaLobby'>
> = ({ navigation }) => {
  const { styles, colors } = useStyles(createStyles);
  const { rooms } = useAppSelector(state => state.data);
  const { userData } = useAppSelector(state => state.auth);

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
