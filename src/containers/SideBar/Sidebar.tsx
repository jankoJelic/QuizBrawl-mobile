import { useNavigation } from '@react-navigation/native';
import MenuTile from 'components/tiles/MenuTile';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { APP_DISPLAY_NAME } from 'constants/constants';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/styles/appStyles';
import UserInfoTile from 'containers/UserInfoTile/UserInfoTile';
import MyScrollView from 'hoc/MyScrollView';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { Share, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useDispatch } from 'react-redux';
import { deleteTokens } from 'services/encryptedStorage/tokens/tokenStorage';
import { useAppSelector } from 'store/index';
import { hideSideBar } from 'store/slices/appStateSlice';

const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { sideBarVisible } = useAppSelector(state => state.appState);
  const { styles, colors } = useStyles(createStyles);

  const onClose = () => {
    dispatch(hideSideBar());
  };

  const onOpen = () => {};

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const onPressLogout = () => {
    deleteTokens();
    navigation.navigate('SelectProvider', { flow: 'login' });
  };

  const onPressShare = async () => {
    await Share.share({
      message: `We can playe ${APP_DISPLAY_NAME} together!`,
    });
  };

  return (
    <Drawer
      open={sideBarVisible}
      drawerType="slide"
      onOpen={onOpen}
      onClose={onClose}
      renderDrawerContent={() => {
        return (
          <MyScrollView
            style={{
              ...styles.container,
              right: sideBarVisible ? 0 : AN(12),
            }}>
            <UserInfoTile />
            <BodySmall
              text="Profile"
              color="neutral400"
              style={{ marginTop: AN(18) }}
            />
            <MenuTile title="My profile" icon="user" onPress={goToProfile} />
            <MenuTile title="Logout" icon="log-out" onPress={onPressLogout} />

            <BodySmall
              text="Show some love"
              color="neutral400"
              style={{ marginTop: AN(18) }}
            />
            <MenuTile
              title="Rate Quiz Clash"
              icon="star"
              onPress={goToProfile}
            />
            <MenuTile
              title="Share to friend"
              icon="share-2"
              onPress={onPressShare}
            />
            <MenuTile
              title="Get to know me"
              icon="coffee"
              onPress={goToProfile}
            />

            <BodySmall
              text="Legal"
              color="neutral400"
              style={{ marginTop: AN(18) }}
            />
            <MenuTile
              title="Terms of service"
              icon="columns"
              onPress={goToProfile}
            />
            <MenuTile
              title="Refund policy"
              icon="briefcase"
              onPress={goToProfile}
            />
            <MenuTile
              title="Privacy statement"
              icon="key"
              onPress={goToProfile}
            />
          </MyScrollView>
        );
      }}>
      {children}
    </Drawer>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      height: SCREEN_HEIGHT,
      backgroundColor: colors.neutral500,
      width: SCREEN_WIDTH * 0.75,
      paddingLeft: AN(10),
    },
  });

export default Sidebar;
