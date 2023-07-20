import MenuTile from 'components/tiles/MenuTile';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { APP_DISPLAY_NAME } from 'constants/constants';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/styles/appStyles';
import PasswordPopup from 'containers/Popup/PasswordPopup';
import UserInfoTile from 'containers/UserInfoTile/UserInfoTile';
import MyScrollView from 'hoc/MyScrollView';
import useStyles from 'hooks/styles/useStyles';
import { useUserData } from 'hooks/useUserData';
import { useMyNavigation } from 'navigation/hooks/useMyNavigation';
import React, { useState } from 'react';
import { Share, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { deleteTokens } from 'services/encryptedStorage/tokens/tokenStorage';
import { useAppSelector } from 'store/index';
import {
  hideSideBar,
  startLoading,
  stopLoading,
} from 'store/slices/appStateSlice';
import { clearDataSlice } from 'store/slices/dataSlice';
import { Children } from 'util/types/children.type';

const Sidebar = ({ children }: Props) => {
  const dispatch = useDispatch();
  const navigation = useMyNavigation();
  const { sideBarVisible } = useAppSelector(state => state.appState);
  const { userData } = useAppSelector(state => state.data);
  const { styles } = useStyles(createStyles);
  const { unreadMessages } = useUserData();

  const [passwordPopupVisible, setPasswordPopupVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const openPasswordPopup = () => {
    setPasswordPopupVisible(true);
  };

  const closePasswordPopup = () => {
    setPasswordPopupVisible(false);
  };

  const onClose = () => {
    dispatch(hideSideBar());
  };

  const onOpen = () => {};

  const goToProfile = () => {
    navigation.navigate('Profile', userData);
    onClose();
  };

  const goToAboutScreen = () => {
    navigation.navigate('About');
  };

  const onPressLogout = () => {
    deleteTokens();
    navigation.navigate('SelectProvider', { flow: 'login' });
    onClose();
    dispatch(clearDataSlice());
  };

  const showInvalidPassword = () => {
    setPasswordError('Invalid password');
  };

  // const onPressShare = async () => {
  //   try {
  //     await Share.share({
  //       message: `We can playe ${APP_DISPLAY_NAME} together!`,
  //     });
  //   } catch (e) {
  //   } finally {
  //   }
  // };

  const goToInbox = () => {
    navigation.navigate('Inbox');
  };

  const goToCustomizeProfile = () => {
    navigation.navigate('CustomizeProfile');
  };

  const onSubmitDeleteAccount = async (password: string) => {
    dispatch(startLoading());
    try {
      const success = await API.deleteUser(password);
      console.log(success);
      if (success) {
        closePasswordPopup();
        onPressLogout();
      } else {
        showInvalidPassword();
      }
    } catch (error) {
      showInvalidPassword();
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <Drawer
      open={sideBarVisible}
      drawerType="slide"
      onOpen={onOpen}
      onClose={onClose}
      swipeEnabled={false}
      renderDrawerContent={() => {
        return (
          <MyScrollView
            style={{
              ...styles.container,
              right: sideBarVisible ? 0 : AN(12),
            }}>
            <UserInfoTile onPress={goToProfile} />
            <BodySmall
              text="Profile"
              color="neutral400"
              style={{ marginTop: AN(18) }}
            />
            <MenuTile title="My profile" icon="user" onPress={goToProfile} />
            <MenuTile
              title="Inbox"
              icon="mail"
              onPress={goToInbox}
              notification={
                unreadMessages?.length
                  ? String(unreadMessages.length)
                  : undefined
              }
            />
            <MenuTile
              title="Customize"
              icon="colorPalette"
              onPress={goToCustomizeProfile}
            />
            <MenuTile title="Logout" icon="log-out" onPress={onPressLogout} />
            <MenuTile
              title="Delete my account"
              icon="trash"
              iconColor="danger500"
              onPress={openPasswordPopup}
            />
            <BodySmall
              text="Show some love"
              color="neutral400"
              style={{ marginTop: AN(18) }}
            />
            {/* <MenuTile
              title="Rate Quiz Clash"
              icon="star"
              onPress={goToProfile}
            /> */}
            {/* <MenuTile
              title="Share to friend"
              icon="share-2"
              onPress={onPressShare}
            /> */}
            <MenuTile title="Credits" icon="coffee" onPress={goToAboutScreen} />

            {/* <BodySmall
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
            /> */}
            <PasswordPopup
              visible={passwordPopupVisible}
              closeModal={closePasswordPopup}
              text="Caution! All your progress will be lost"
              error={!!passwordError}
              onSubmit={onSubmitDeleteAccount}
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

interface Props {
  children: Children;
}
