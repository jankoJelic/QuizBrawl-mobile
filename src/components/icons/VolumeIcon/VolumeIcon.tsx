import MyIcon from 'assets/icons/MyIcon';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import ENCRYPTED_STORAGE from 'services/encryptedStorage';
import { useAppSelector } from 'store/index';
import { setMusicEnabled } from 'store/slices/authSlice';

const size = AN(30);

const VolumeIcon = ({ style = {} }) => {
  const dispatch = useDispatch();
  const { styles, colors } = useStyles(createStyles);
  const { musicEnabled } = useAppSelector(state => state.auth);

  const onPress = () => {
    if (musicEnabled) {
      dispatch(setMusicEnabled(false));
      ENCRYPTED_STORAGE.removeValue('musicEnabled');
    } else {
      dispatch(setMusicEnabled(true));
      ENCRYPTED_STORAGE.storeValue('musicEnabled', 'true');
    }
  };

  return (
    <TouchableBounce
      onPress={onPress}
      style={{
        ...styles.container,
        borderColor: musicEnabled ? colors.brand500 : colors.neutral400,
        ...style,
      }}>
      <MyIcon
        name={musicEnabled ? 'volume-2' : 'volume-x'}
        size={size / 2}
        color={musicEnabled ? 'brand500' : 'neutral400'}
        onPress={onPress}
      />
    </TouchableBounce>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      width: size,
      aspectRatio: 1,
      borderRadius: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: AN(2),
    },
  });

export default VolumeIcon;
