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
import Sidebar from 'containers/SideBar';
import { PermissionsAndroid } from 'react-native';
import useFCM from 'services/fcm/useFCM';

const LandingScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Landing'>
> = ({ navigation }) => {
  usePreventNativeBackButton();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useFCM();

  useEffect(() => {
    if (isFocused) {
      dispatch(exitLobby());
      dispatch(exitRoom());
    }
  }, [isFocused]);

  useEffect(() => {
    connectToSocket(navigation);

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);

  usePreventNativeBackButton(() => true);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 0, paddingTop: AN(15) }}>
      <Sidebar>
        <MyScrollView>
          <LandingScreenHeader />
          <AssetsTile />
          <LobbyCarousel />
          <CreateYourQuizTile />
        </MyScrollView>
      </Sidebar>
    </ScreenWrapper>
  );
};

export default LandingScreen;
