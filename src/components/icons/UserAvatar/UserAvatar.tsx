import FeatherIcon from 'assets/icons/FeatherIcon';
import { Colors } from 'constants/styles/Colors';
import TouchableBounce from 'hoc/TouchableBounce';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { useAppSelector } from 'store/index';
import useStyles from 'hooks/styles/useStyles';
import { AN } from 'constants/styles/appStyles';

const UserAvatar = ({ onPress = () => {} }) => {
  const { styles } = useStyles(createStyles);
  const { userData } = useAppSelector(state => state.auth);

  return (
    <TouchableBounce
      onPress={onPress}
      style={[styles.userAvatar, { borderColor: userData.color }]}>
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
      width: AN(48),
      aspectRatio: 1,
      borderRadius: AN(48),
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default UserAvatar;
