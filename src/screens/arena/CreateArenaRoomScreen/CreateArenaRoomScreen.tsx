import NavBackArrow from 'components/icons/NavBackArrow';
import HeadingH1 from 'components/typography/HeadingH1';
import Title from 'components/typography/Title';
import ScreenWrapper from 'hoc/ScreenWrapper';
import Carousel from 'react-native-snap-carousel';
import React, { useRef } from 'react';
import TileWrapper from 'hoc/TileWrapper';
import { Colors } from 'constants/styles/Colors';
import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from 'constants/styles/appStyles';

const CreateArenaRoomScreen = () => {
  const carouselRef = useRef(null);

  const renderItem = () => <TileWrapper></TileWrapper>;

  return (
    <ScreenWrapper>
      <NavBackArrow />
      <Title text="Create room" />
      <HeadingH1 text="Topic" />
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
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});
export default CreateArenaRoomScreen;
