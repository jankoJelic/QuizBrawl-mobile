import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useAppSelector } from 'store/index';
import LandingScreenHeader from './components/LandingScreenHeader';
import LobbyCarousel from './components/LobbyCarousel';
import AssetsTile from './components/AssetsTile';
import MyScrollView from 'hoc/MyScrollView';
import { SOCKET } from 'services/socket/socket';
import CreateYourQuizTile from './components/CreateYourQuizTile';
import { connectToSocket } from 'services/socket/connectToSocket';

const LandingScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Landing'>
> = ({ navigation }) => {
  const { userData } = useAppSelector(state => state.auth);
  const { styles, colors } = useStyles(createStyles);

  useEffect(() => {
    connectToSocket();
  }, []);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 0 }}>
      <MyScrollView>
        <LandingScreenHeader />
        <AssetsTile />
        <LobbyCarousel />
        <CreateYourQuizTile />
      </MyScrollView>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LandingScreen;
