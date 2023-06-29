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
import { AN, IS_ANDROID } from 'constants/styles/appStyles';
import Sidebar from 'containers/SideBar';
import { PermissionsAndroid, StyleSheet } from 'react-native';
import useFCM from 'services/fcm/useFCM';
import { Colors } from 'constants/styles/Colors';
import useStyles from 'hooks/styles/useStyles';
import BottomNavigation from 'navigation/BottomNavigation';
import { getMyQuizzes } from 'store/actions/dataActions';
import { setStatusBar } from 'store/slices/appStateSlice';
import { checkMusicEnabled } from 'services/encryptedStorage/tokens/musicEnabledStorage';

const LandingScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Landing'>
> = ({ navigation }) => {
  usePreventNativeBackButton();
  const { colors } = useStyles(createStyles);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useFCM();

  useEffect(() => {
    if (isFocused) {
      dispatch(setStatusBar({ topColor: colors.neutral500 }));
      dispatch(exitLobby());
      dispatch(exitRoom());
    }
  }, [isFocused]);

  useEffect(() => {
    connectToSocket(navigation);
    if (IS_ANDROID)
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

    getMyQuizzes();
    checkMusicEnabled();
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
      <BottomNavigation />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LandingScreen;
