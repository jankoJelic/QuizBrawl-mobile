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
import {
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import useFCM from 'services/fcm/useFCM';
import MyIcon from 'assets/icons/MyIcon';
import { Colors } from 'constants/styles/Colors';
import useStyles from 'hooks/styles/useStyles';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import BottomNavigation from 'navigation/BottomNavigation';

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
      <BottomNavigation />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LandingScreen;
