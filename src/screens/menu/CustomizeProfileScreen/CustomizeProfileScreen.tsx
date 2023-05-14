import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { useAppSelector } from 'store/index';
import { setProfileColor, setUserAvatar } from 'store/slices/dataSlice';
import FastImage from 'react-native-fast-image';

const CustomizeProfileScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CustomizeProfile'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles, colors } = useStyles(createStyles);
  const { avatars } = useAppSelector(state => state.data.userData);

  const {
    pink,
    beige,
    darkGreen,
    darkPink,
    orange,
    pastelBlue,
    vividGreen,
    red,
    lightGrey,
    arena,
    brightYellow,
    brand500,
  } = colors;

  const profileColors = [
    brand500,
    pink,
    beige,
    pastelBlue,
    darkGreen,
    darkPink,
    vividGreen,
    brightYellow,
    arena,
    red,
    lightGrey,
    orange,
  ];

  const [availableAvatars, setAvailableAvatars] = useState<string[]>([]);

  const onPressProfileColor = (color: string) => {
    dispatch(setProfileColor(color));
    API.updateUser({ color });
  };

  const renderColor = ({ item }: { item: string }) => {
    return (
      <TouchableBounce
        style={{ ...styles.colorTile, backgroundColor: item }}
        onPress={() => {
          onPressProfileColor(item);
        }}
      />
    );
  };

  const renderAvatar = ({ item }) => {
    const onSelectAvatar = () => {
      API.updateUser({ avatar: item });
      dispatch(setUserAvatar(item));
    };

    return (
      <TouchableBounce onPress={onSelectAvatar} style={styles.avatar}>
        <FastImage source={{ uri: item }} style={styles.fullWidth} />
      </TouchableBounce>
    );
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Customize" fullWidth style={{ marginBottom: AN(20) }} />
      <BodyLarge text="Select color" />
      <FlatList
        data={profileColors}
        renderItem={renderColor}
        numColumns={4}
        keyExtractor={item => item + 'profileColor'}
        ListFooterComponent={
          <>
            <BodyLarge text="Select avatar" style={{ marginTop: AN(20) }} />
            <FlatList
              data={avatars}
              renderItem={renderAvatar}
              numColumns={4}
              keyExtractor={item => item + 'avatarProfile'}
            />
          </>
        }
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    colorTile: {
      width: '20%',
      aspectRatio: 1,
      borderRadius: BORDER_RADIUS / 2,
      margin: '2.5%',
    },
    avatar: {
      width: '20%',
      aspectRatio: 1,
      borderRadius: BORDER_RADIUS,
      margin: '2.5%',
      overflow: 'hidden',
    },
    fullWidth: {
      width: '100%',
      aspectRatio: 1,
    },
  });

export default CustomizeProfileScreen;
