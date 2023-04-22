import React, { useEffect, useRef } from 'react';
import FeatherIcon from 'assets/icons/FeatherIcon';
import HeadingH1 from 'components/typography/HeadingH1';
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
import BodyLarge from 'components/typography/BodyLarge';
import { setLobbies } from 'store/slices/dataSlice';
import Title from 'components/typography/Title';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import useStyles from 'hooks/styles/useStyles';

const LobbyCarousel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const carouselRef = useRef<Carousel>(null);

  const { styles } = useStyles(createStyles);

  const { lobbies } = useAppSelector((state: RootState) => state.data);

  const getLobbies = async () => {
    const lobbies = await API.getLobbies();
    dispatch(setLobbies(lobbies));
  };

  useEffect(() => {
    getLobbies();
  }, []);

  const renderIcon = (lobbyName: LobbyName) => {
    switch (lobbyName) {
      case 'Arena':
        return (
          <FeatherIcon
            family="fontAwesome5"
            name="users"
            size={SCREEN_WIDTH * 0.2}
          />
        );

      case '1v1':
        return (
          <FeatherIcon
            family="fontAwesome5"
            name="user-friends"
            size={SCREEN_WIDTH * 0.2}
          />
        );

      case 'Solo':
        return (
          <FeatherIcon
            family="fontAwesome5"
            name="user-alt"
            size={SCREEN_WIDTH * 0.2}
          />
        );

      default:
        return <></>;
    }
  };

  const renderItem = ({ item }: { item: Lobby }) => {
    console.log(item);
    return (
      <TileWrapper style={styles.itemContainer}>
        <Title
          text={item.name}
          color="brand400"
          style={{ marginBottom: AN(10) }}
        />
        {renderIcon(item?.name)}
        <View style={{ alignItems: 'center', marginTop: AN(10) }}>
          <BodyMedium text={`Players online: ${String(item.playersCount)}`} />
          <BodyMedium text={`Rooms: ${String(item.playersCount)}`} />
        </View>
      </TileWrapper>
    );
  };

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
  });

export default LobbyCarousel;
