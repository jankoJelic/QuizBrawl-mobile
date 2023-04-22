import React, { useEffect, useRef } from 'react';
import FeatherIcon from 'assets/icons/FeatherIcon';
import TileWrapper from 'hoc/TileWrapper';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, View } from 'react-native';
import { RootState } from 'store';
import { useAppSelector } from 'store';
import { Lobby, LobbyName } from 'store/types/dataSliceTypes';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import API from 'services/api';
import { setLobbies } from 'store/slices/dataSlice';
import Title from 'components/typography/Title';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import useStyles from 'hooks/styles/useStyles';

const LobbyCarousel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const carouselRef = useRef<Carousel>(null);

  const { styles, colors } = useStyles(createStyles);

  const { lobbies } = useAppSelector((state: RootState) => state.data);

  const getLobbies = async () => {
    const lobbies = await API.getLobbies();
    dispatch(setLobbies(lobbies));
  };

  useEffect(() => {
    getLobbies();
  }, []);

  const lobbyColor = (lobbyName: LobbyName) => {
    switch (lobbyName) {
      case 'Arena':
        return colors.brand500;
      case '1v1':
        return colors.warning800;
      default:
        return colors.neutral500;
    }
  };

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

  const renderItem = ({ item }: { item: Lobby }) => (
    <TileWrapper style={styles.itemContainer}>
      <Title
        text={item.name}
        color={item.name.toLowerCase()}
        style={styles.title}
      />
      {renderIcon(item?.name)}
      <View style={styles.infoContainer}>
        <BodyMedium text={`Players online: ${String(item.playersCount)}`} />
        <BodyMedium text={`Rooms: ${String(item.playersCount)}`} />
      </View>
    </TileWrapper>
  );

  return (
    <View style={{ marginTop: AN(40) }}>
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
