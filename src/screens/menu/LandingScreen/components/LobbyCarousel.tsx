import React, { useEffect, useRef } from 'react';
import FeatherIcon from 'assets/icons/MyIcon';
import TileWrapper from 'hoc/TileWrapper';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from 'store/index';
import { Lobby, LobbyName } from 'store/types/dataSliceTypes';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import API from 'services/api';
import { joinLobby, setLobbies } from 'store/slices/dataSlice';
import Title from 'components/typography/Title';
import BodyMedium from 'components/typography/BodyMedium';
import { Color, Colors } from 'constants/styles/Colors';
import useStyles from 'hooks/styles/useStyles';
import { setRooms } from 'store/slices/dataSlice';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { LOBBY_IDS } from 'constants/constants';
import FastImage from 'react-native-fast-image';
import BodySmall from 'components/typography/BodySmall/BodySmall';

const LobbyCarousel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const carouselRef = useRef(null);

  const { styles, colors } = useStyles(createStyles);

  const { lobbies, rooms, userData } = useAppSelector(state => state.data);

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
          <FastImage
            source={require('../../../../assets/icons/lobbies/arena.png')}
            style={{ width: SCREEN_WIDTH * 0.2, aspectRatio: 1 }}
          />
        );

      case 'Cash game':
        return (
          <FastImage
            source={require('../../../../assets/icons/lobbies/money.png')}
            style={{ width: SCREEN_WIDTH * 0.2, aspectRatio: 1 }}
          />
        );

      case 'Solo':
        return (
          <FastImage
            source={require('../../../../assets/icons/lobbies/shield.png')}
            style={{ width: SCREEN_WIDTH * 0.2, aspectRatio: 1 }}
          />
        );

      default:
        return <></>;
    }
  };

  const emitJoinLobbyEvent = (lobbyId: number) => {
    SOCKET.emit(SOCKET_EVENTS.USER_JOINED_LOBBY, {
      user: userData,
      lobbyId,
    });
  };

  const selectLobby = (name: LobbyName) => {
    switch (name) {
      case 'Arena':
        emitJoinLobbyEvent(LOBBY_IDS.ARENA);
        dispatch(joinLobby(lobbies.find(l => l.id === LOBBY_IDS.ARENA)));
        navigation.navigate('Lobby', {lobbyId: LOBBY_IDS.ARENA});
        break;
      case 'Cash game':
        emitJoinLobbyEvent(LOBBY_IDS.CASH_GAME);
        dispatch(joinLobby(lobbies.find(l => l.id === LOBBY_IDS.CASH_GAME)));
        navigation.navigate('Lobby', {lobbyId: LOBBY_IDS.CASH_GAME});
        break;
      case 'Solo':
        emitJoinLobbyEvent(LOBBY_IDS.SOLO);
        dispatch(joinLobby(lobbies.find(l => l.id === LOBBY_IDS.SOLO)));
        navigation.navigate('Lobby', {lobbyId: LOBBY_IDS.SOLO});
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

    const renderDescription = (lobbyName: string) => {
      switch (lobbyName) {
        case 'Arena':
          return (
            <BodySmall
              text="Play real-time multiplayer game to win trophies"
              style={styles.description}
              color="warning100"
            />
          );
        case 'Cash game':
          return (
            <BodySmall
              text="Play different game modes with other players for cash or for fun"
              style={styles.description}
              color="success500"
            />
          );
        case 'Solo':
          return (
            <BodySmall
              text="Play solo events to win prizes"
              style={styles.description}
              color="brand500"
            />
          );
        default:
          return <></>;
      }
    };

    const color = (lobbyName: string) => {
      switch (lobbyName) {
        case 'Arena':
          return 'warning100';
        case 'Cash game':
          return 'success500';
        case 'Solo':
          return 'brand500';
      }
    };

    return (
      <TileWrapper style={styles.itemContainer} onPress={onPressTile}>
        <Title
          text={item.name}
          color={color(item.name) as Color}
          style={styles.title}
        />
        {renderDescription(item?.name)}
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
    description: { textAlign: 'center', marginBottom: AN(6), opacity: 0.7 },
  });

export default LobbyCarousel;
