import MenuTile from "components/tiles/MenuTile";
import BodySmall from "components/typography/BodySmall/BodySmall";
import { Colors } from "constants/styles/Colors";
import { AN, SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/styles/appStyles";
import PasswordPopup from "containers/Popup/PasswordPopup";
import UserInfoTile from "containers/UserInfoTile/UserInfoTile";
import MyScrollView from "hoc/MyScrollView";
import useStyles from "hooks/styles/useStyles";
import { useUserData } from "hooks/useUserData";
import { useMyNavigation } from "navigation/hooks/useMyNavigation";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import API from "services/api";
import { deleteTokens } from "services/encryptedStorage/tokens/tokenStorage";
import { useAppSelector } from "store/index";
import {
  hideSideBar,
  startLoading,
  stopLoading,
} from "store/slices/appStateSlice";
import { clearDataSlice } from "store/slices/dataSlice";
import { Children } from "util/types/children.type";

const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

const Sidebar = ({ children }: Props) => {
  const dispatch = useDispatch();
  const navigation = useMyNavigation();
  const { sideBarVisible } = useAppSelector((state) => state.appState);
  const { userData } = useAppSelector((state) => state.data);
  const { styles } = useStyles(createStyles);
  const { unreadMessages } = useUserData();

  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const [passwordPopupVisible, setPasswordPopupVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > Math.abs(dy) && dx < -10,
      onPanResponderMove: (_, { dx }) => {
        if (dx < 0) translateX.setValue(dx);
      },
      onPanResponderRelease: (_, { dx, vx }) => {
        if (dx < -DRAWER_WIDTH / 3 || vx < -0.5) {
          dispatch(hideSideBar());
        } else {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: sideBarVisible ? 0 : -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: sideBarVisible ? 0.5 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [sideBarVisible]);

  const openPasswordPopup = () => {
    setPasswordPopupVisible(true);
  };

  const closePasswordPopup = () => {
    setPasswordPopupVisible(false);
  };

  const onClose = () => {
    dispatch(hideSideBar());
  };

  const goToProfile = () => {
    navigation.navigate("Profile", userData);
    onClose();
  };

  const goToAboutScreen = () => {
    navigation.navigate("About");
  };

  const onPressLogout = () => {
    deleteTokens();
    navigation.navigate("SelectProvider", { flow: "login" });
    onClose();
    dispatch(clearDataSlice());
  };

  const showInvalidPassword = () => {
    setPasswordError("Invalid password");
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
    navigation.navigate("Inbox");
  };

  const goToCustomizeProfile = () => {
    navigation.navigate("CustomizeProfile");
  };

  const onSubmitDeleteAccount = async (password: string) => {
    dispatch(startLoading());
    try {
      const success = await API.deleteUser(password);
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
    <View style={styles.root}>
      {children}
      <Animated.View
        style={[styles.backdrop, { opacity: backdropOpacity }]}
        pointerEvents={sideBarVisible ? "auto" : "none"}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX }] }]}
        pointerEvents={sideBarVisible ? "auto" : "none"}
        {...panResponder.panHandlers}
      >
        <MyScrollView style={styles.container}>
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
              unreadMessages?.length ? String(unreadMessages.length) : undefined
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
      </Animated.View>
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      paddingTop: AN(15),
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "#000",
      zIndex: 1,
    },
    drawer: {
      position: "absolute",
      left: 0,
      top: 0,
      width: DRAWER_WIDTH,
      height: SCREEN_HEIGHT,
      zIndex: 2,
    },
    container: {
      flex: 1,
      backgroundColor: colors.neutral500,
      paddingLeft: AN(10),
      paddingTop: AN(15),
    },
  });

export default Sidebar;

interface Props {
  children: Children;
}
