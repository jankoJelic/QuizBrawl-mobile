import React, { useEffect, useRef } from 'react';
import FeatherIcon from 'assets/icons/FeatherIcon';
import TileWrapper from 'hoc/TileWrapper';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from 'store/index';
import { Lobby, LobbyName } from 'store/types/dataSliceTypes';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import API from 'services/api';
import { setLobbies } from 'store/slices/dataSlice';
import Title from 'components/typography/Title';
import BodyMedium from 'components/typography/BodyMedium';
import { Color, Colors } from 'constants/styles/Colors';
import useStyles from 'hooks/styles/useStyles';
import { setRooms } from 'store/slices/dataSlice';
import { SOCKET } from 'services/socket/socket';
import { LOBBY_IDS } from 'constants/constants';

const LobbyCarousel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const carouselRef = useRef(null);

  const { userData } = useAppSelector(state => state.auth);

  const { styles, colors } = useStyles(createStyles);

  const { lobbies, rooms } = useAppSelector(state => state.data);

  const getLobbies = async () => {
    const lobbies = await API.getLobbies();
    dispatch(setLobbies(lobbies));
  };

  const getRooms = async () => {
    const rooms = await API.getRooms();
    dispatch(setRooms(rooms));
  };

  useEffect(() => {
    getLobbies();
    getRooms();
  }, []);

  const renderIcon = (lobbyName: LobbyName) => {
    switch (lobbyName) {
      case 'Arena':
        return (
          <FeatherIcon
            family="fontAwesome5"
            name="users"
            size={SCREEN_WIDTH * 0.2}
            color="arena"
          />
        );

      case '1v1':
        return (
          <FeatherIcon
            family="fontAwesome5"
            name="user-friends"
            size={SCREEN_WIDTH * 0.2}
            color="1v1"
          />
        );

      case 'Solo':
        return (
          <FeatherIcon
            family="fontAwesome5"
            name="user-alt"
            size={SCREEN_WIDTH * 0.2}
            color="solo"
          />
        );

      default:
        return <></>;
    }
  };

  const selectLobby = (name: LobbyName) => {
    switch (name) {
      case 'Arena':
        SOCKET.emit('USER_JOINED_LOBBY', {
          user: userData,
          lobbyId: LOBBY_IDS.ARENA,
        });
        navigation.navigate('ArenaLobby');
        break;
      default:
        return;
    }
  };

  const getLobbyRoomsCount = (lobbyId: number) => {
    return rooms.filter(room => room?.lobby?.id === lobbyId).length;
  };

  const renderItem = ({ item }: { item: Lobby }) => {
    const onPressTile = () => {
      selectLobby(item.name);
    };

    return (
      <TileWrapper style={styles.itemContainer} onPress={onPressTile}>
        <Title
          text={item.name}
          color={item.name.toLowerCase() as Color}
          style={styles.title}
        />
        {renderIcon(item?.name)}
        <View style={styles.infoContainer}>
          <BodyMedium
            text={`Players online: ${String(item?.users?.length || '0')}`}
          />
          <BodyMedium text={`Rooms: ${String(getLobbyRoomsCount(item.id))}`} />
        </View>
      </TileWrapper>
    );
  };

  return (
    <View style={{ marginTop: AN(12) }}>
      <Carousel
        layout="default"
        ref={carouselRef}
        data={lobbies}
        renderItem={renderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH / 1.65}
        windowSize={SCREEN_WIDTH}
        loop
      />
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    itemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: AN(20),
    },
    infoContainer: { alignItems: 'center', marginTop: AN(10) },
    title: { marginBottom: AN(10) },
  });

export default LobbyCarousel;
