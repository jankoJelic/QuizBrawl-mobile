import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAppSelector } from 'store/index';
import LandingScreenHeader from './components/LandingScreenHeader';
import LobbyCarousel from './components/LobbyCarousel';
import AssetsTile from './components/AssetsTile';
import TileWrapper from 'hoc/TileWrapper';
import MyScrollView from 'hoc/MyScrollView';
import {
  AN,
  PADDING_HORIZONTAL,
  SCREEN_WIDTH,
} from 'constants/styles/appStyles';
import FastImage from 'react-native-fast-image';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { SOCKET } from 'services/socket/socket';
import { BASE_URL } from 'constants/env/envConstants';

const LandingScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Landing'>
> = ({ navigation }) => {
  const { userData } = useAppSelector(state => state.auth);
  const { styles, colors } = useStyles(createStyles);

  const onLogin = () => {
    console.log('logged in');
  };

  const connectToSocket = async () => {
    try {
      SOCKET.connect();
      SOCKET.emit('events', 'message');
    } catch (e) {}

    // const status = SOCKET.connect();

    // SOCKET.emit('events', { janko: true });
    console.log('here');
  };

  useEffect(() => {
    connectToSocket();

    SOCKET.on('dummyEvent', () => {
      console.log('dummy event arrive to FE');
    });
    // SOCKET.connect();
    // SOCKET.on('login', onLogin);
  }, []);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 0 }}>
      <MyScrollView>
        <LandingScreenHeader />
        <AssetsTile />
        <LobbyCarousel />
        <TileWrapper
          style={{
            marginTop: AN(35),
            marginHorizontal: PADDING_HORIZONTAL,
            paddingVertical: AN(14),
            flexDirection: 'row',
          }}>
          <FastImage
            style={{ width: AN(56), aspectRatio: 1 }}
            source={require('../../../assets/icons/mushroom.png')}
          />
          <View>
            <BodyLarge text="Create your quiz!" color="brand500" />
            <BodyMedium
              text="Make cool trivia checks by yourself or with friends"
              style={{ width: SCREEN_WIDTH * 0.7 }}
              color="neutral300"
            />
          </View>
        </TileWrapper>
      </MyScrollView>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LandingScreen;
