import UserAvatar from 'components/icons/UserAvatar';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/styles/appStyles';
import UserInfoTile from 'containers/UserInfoTile/UserInfoTile';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/index';
import { hideSideBar, showSideBar } from 'store/slices/appStateSlice';

const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const { sideBarVisible } = useAppSelector(state => state.appState);
  const { styles, colors } = useStyles(createStyles);
  console.log(sideBarVisible);
  const onClose = () => {
    dispatch(hideSideBar());
  };

  const onOpen = () => {};

  return (
    <Drawer
      open={sideBarVisible}
      drawerType="slide"
      onOpen={onOpen}
      onClose={onClose}
      renderDrawerContent={() => {
        return (
          <View
            style={{
              ...styles.container,
              right: sideBarVisible ? 0 : AN(12),
            }}>
            <UserInfoTile />
            <View
              style={{
                width: '90%',
                height: 1,
                backgroundColor: colors.brand800,
                marginVertical: AN(10),
              }}
            />
            <BodyMedium text="side bar" />
            <BodyMedium text="side bar" />
            <BodyMedium text="side bar" />
          </View>
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
      paddingLeft: AN(20),
    },
  });

export default Sidebar;
