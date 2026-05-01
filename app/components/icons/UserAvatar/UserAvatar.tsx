import FeatherIcon from "assets/icons/MyIcon";
import { Color, Colors, lightThemeColors } from "constants/styles/Colors";
import TouchableBounce from "hoc/TouchableBounce";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { useAppSelector } from "store/index";
import useStyles from "hooks/styles/useStyles";
import { AN } from "constants/styles/appStyles";
import { getKeyByValue } from "util/objects/getKeyByValue";
import { normalizeImageUri } from "util/normalizeImageUri";

const UserAvatar = ({
  onPress = () => {},
  size = AN(48),
  avatar = "",
  color = "",
  showBorder = false,
  style = {},
}) => {
  const { styles, colors } = useStyles(createStyles);
  const { userData } = useAppSelector((state) => state.data);

  const AVATAR = !!avatar ? avatar : userData.avatar;
  const COLOR = color || userData.color;

  return (
    <TouchableBounce
      onPress={onPress}
      style={[
        styles.userAvatar,
        {
          backgroundColor: COLOR,
          borderRadius: size,
          width: size,
          borderWidth: showBorder ? 1 : 0,
          borderColor: colors.neutral500,
        },
        style,
      ]}
    >
      {AVATAR ? (
        <Image
          source={{ uri: normalizeImageUri(AVATAR) }}
          style={{ width: size, height: size }}
          resizeMode="cover"
        />
      ) : (
        <FeatherIcon
          family="fontAwesome5"
          name="user-alt"
          size={size / 2}
          color={getKeyByValue(lightThemeColors, COLOR) as Color}
        />
      )}
    </TouchableBounce>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    userAvatar: {
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
  });

export default UserAvatar;
