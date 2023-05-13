import FeatherIcon from 'assets/icons/MyIcon';
import { Colors, lightThemeColors } from 'constants/styles/Colors';
import TouchableBounce from 'hoc/TouchableBounce';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { useAppSelector } from 'store/index';
import useStyles from 'hooks/styles/useStyles';
import { AN } from 'constants/styles/appStyles';
import { getKeyByValue } from 'util/objects/getKeyByValue';

const UserAvatar = ({ onPress = () => {}, size = AN(48), avatar = '' }) => {
  const { styles } = useStyles(createStyles);
  const { userData } = useAppSelector(state => state.data);

  const AVATAR = !!avatar ? avatar : userData.avatar;

  return (
    <TouchableBounce
      onPress={onPress}
      style={[
        styles.userAvatar,
        { borderColor: userData.color, borderRadius: size, width: size },
      ]}>
      {AVATAR ? (
        <FastImage
          source={{ uri: AVATAR }}
          style={{ width: size, aspectRatio: 1 }}
        />
      ) : (
        <FeatherIcon
          family="fontAwesome5"
          name="user-alt"
          size={size / 2}
          color={getKeyByValue(lightThemeColors, userData.color)}
        />
      )}
    </TouchableBounce>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    userAvatar: {
      aspectRatio: 1,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default UserAvatar;
