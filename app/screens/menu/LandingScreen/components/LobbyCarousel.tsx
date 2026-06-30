import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FlatList, StyleSheet, View } from "react-native";
import { Image } from 'expo-image';

import { useMyNavigation } from "navigation/hooks/useMyNavigation";
import { useAppSelector } from "store/index";
import { SOCKET, SOCKET_EVENTS } from "services/socket/socket";
import { LOBBY_IDS } from "constants/constants";
import { AN, SCREEN_WIDTH } from "constants/styles/appStyles";
import TileWrapper from "hoc/TileWrapper";
import { Lobby, LobbyName } from "store/types/dataSliceTypes";
import Title from "components/typography/Title";
import BodyMedium from "components/typography/BodyMedium";
import { Color, Colors } from "constants/styles/Colors";
import useStyles from "hooks/styles/useStyles";
import { joinLobby, removeUserFromRoom, setLobbies, setRooms } from "store/slices/dataSlice";
import BodySmall from "components/typography/BodySmall/BodySmall";
import API from "services/api";

const LobbyCarousel = () => {
  const dispatch = useDispatch();
  const navigation = useMyNavigation();
  const { styles } = useStyles(createStyles);

  const { lobbies, rooms, userData } = useAppSelector((state) => state.data);
  const { onQuestion, questions } = useAppSelector((state) => state.game);
  const { dailies } = userData || {};
  const dailiesDone = Object.keys(dailies || []).length;

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
      case "Arena":
        return (
          <Image
            source={require("../../../../assets/icons/lobbies/arena.png")}
            style={styles.image}
          />
        );

      case "Cash game":
        return (
          <Image
            source={require("../../../../assets/icons/lobbies/money.png")}
            style={styles.image}
          />
        );

      case "Solo":
        return (
          <Image
            source={require("../../../../assets/icons/lobbies/shield.png")}
            style={styles.image}
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
    if (userData.room) {
      const gameActive = onQuestion >= 0 && questions.length > 0;
      if (gameActive) {
        navigation.navigate("Question");
        return;
      }
      SOCKET.emit(SOCKET_EVENTS.USER_LEFT_ROOM, { user: userData, room: userData.room });
      dispatch(removeUserFromRoom({ room: userData.room, user: userData }));
    }

    switch (name) {
      case "Arena":
        emitJoinLobbyEvent(LOBBY_IDS.ARENA);
        dispatch(joinLobby(lobbies.find((l) => l.id === LOBBY_IDS.ARENA)));
        navigation.navigate("Lobby", { lobbyId: LOBBY_IDS.ARENA });
        break;
      case "Cash game":
        emitJoinLobbyEvent(LOBBY_IDS.CASH_GAME);
        dispatch(joinLobby(lobbies.find((l) => l.id === LOBBY_IDS.CASH_GAME)));
        navigation.navigate("Lobby", { lobbyId: LOBBY_IDS.CASH_GAME });
        break;
      case "Solo":
        emitJoinLobbyEvent(LOBBY_IDS.SOLO);
        dispatch(joinLobby(lobbies.find((l) => l.id === LOBBY_IDS.SOLO)));
        navigation.navigate("Lobby", { lobbyId: LOBBY_IDS.SOLO });
      default:
        return;
    }
  };

  const getLobbyRoomsCount = (lobbyId: number) => {
    return rooms.filter((room) => room?.lobbyId === lobbyId).length;
  };

  const renderItem = ({ item }: { item: Lobby }) => {
    const onPressTile = () => {
      selectLobby(item.name);
    };

    const renderDescription = (lobbyName: string) => {
      switch (lobbyName) {
        case "Arena":
          return (
            <BodySmall
              text="Play real-time multiplayer game to win trophies and ranks"
              style={styles.description}
              color="warning100"
            />
          );
        case "Cash game":
          return (
            <BodySmall
              text="Play different game modes with other players for cash or for fun. Winner takes all"
              style={styles.description}
              color="success500"
            />
          );
        case "Solo":
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
        case "Arena":
          return "warning100";
        case "Cash game":
          return "success500";
        case "Solo":
          return "brand500";
      }
    };

    const isSoloLobby = item.name === "Solo";

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
            text={
              isSoloLobby
                ? ` `
                : `Players online: ${item?.users?.length || "0"}`
            }
          />
          <BodyMedium
            text={
              isSoloLobby
                ? `${rooms.length - dailiesDone} events`
                : `Rooms: ${getLobbyRoomsCount(item.id)}`
            }
            weight={isSoloLobby ? "bold" : "regular"}
            color={isSoloLobby ? "brand500" : "mainTextColor"}
          />
        </View>
      </TileWrapper>
    );
  };

  const ITEM_WIDTH = SCREEN_WIDTH / 1.65;
  const ITEM_GAP = AN(24);
  const SIDE_PADDING = (SCREEN_WIDTH - ITEM_WIDTH) / 3;

  return (
    <View style={{ marginTop: AN(12) }}>
      <FlatList
        horizontal
        data={lobbies}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        snapToInterval={ITEM_WIDTH + ITEM_GAP}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SIDE_PADDING,
          gap: ITEM_GAP,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    itemContainer: {
      width: SCREEN_WIDTH / 1.65,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: AN(20),
    },
    infoContainer: { alignItems: "center", marginTop: AN(10) },
    title: { marginBottom: AN(10) },
    description: { textAlign: "center", marginBottom: AN(6), opacity: 0.7 },
    image: { width: SCREEN_WIDTH * 0.2, aspectRatio: 1 },
  });

export default LobbyCarousel;
