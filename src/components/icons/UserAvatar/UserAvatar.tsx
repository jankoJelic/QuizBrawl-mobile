import FeatherIcon from 'assets/icons/FeatherIcon';
import { Colors } from 'constants/styles/Colors';
import TouchableBounce from 'hoc/TouchableBounce';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { useAppSelector } from 'store/index';
import useStyles from 'hooks/styles/useStyles';
import { AN } from 'constants/styles/appStyles';

const UserAvatar = ({ onPress = () => {}, size = AN(48) }) => {
  const { styles } = useStyles(createStyles);
  const { userData } = useAppSelector(state => state.auth);

  return (
    <TouchableBounce
      onPress={onPress}
      style={[
        styles.userAvatar,
        { borderColor: userData.color, borderRadius: size, width: size },
      ]}>
      {userData.avatar ? (
        <FastImage source={{ uri: userData.avatar }} />
      ) : (
        <FeatherIcon family="fontAwesome5" name="user-alt" />
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
