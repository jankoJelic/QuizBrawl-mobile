import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect } from 'react';
import LandingScreenHeader from './components/LandingScreenHeader';
import LobbyCarousel from './components/LobbyCarousel';
import AssetsTile from './components/AssetsTile';
import MyScrollView from 'hoc/MyScrollView';
import CreateYourQuizTile from './components/CreateYourQuizTile';
import { connectToSocket } from 'services/socket/connectToSocket';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { exitLobby, exitRoom } from 'store/slices/dataSlice';
import usePreventNativeBackButton from 'navigation/hooks/usePreventNativeBack';
import { AN } from 'constants/styles/appStyles';

const LandingScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Landing'>
> = ({ navigation }) => {
  usePreventNativeBackButton();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(exitLobby());
      dispatch(exitRoom());
    }
  }, [isFocused]);

  useEffect(() => {
    connectToSocket(navigation);
  }, []);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 0, paddingTop: AN(15) }}>
      <MyScrollView>
        <LandingScreenHeader />
        <AssetsTile />
        <LobbyCarousel />
        <CreateYourQuizTile />
      </MyScrollView>
    </ScreenWrapper>
  );
};

export default LandingScreen;
