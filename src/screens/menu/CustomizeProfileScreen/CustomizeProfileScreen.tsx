import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import MenuTile from 'components/tiles/MenuTile';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import UserInfoTile from 'containers/UserInfoTile/UserInfoTile';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { useAppSelector } from 'store/index';
import { setProfileColor } from 'store/slices/dataSlice';

const CustomizeProfileScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CustomizeProfile'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles, colors } = useStyles(createStyles);
  const { userData } = useAppSelector(state => state.data);
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

  const goToCustomizeProfile = () => {
    navigation.navigate('CustomizeProfile');
  };

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

  const onPressProfileColor = (color: string) => {
    dispatch(setProfileColor(color));
    API.updateUser({ color });
  };

  const renderColor = ({ item }: { item: string }) => {
    return (
      <TouchableBounce
        style={{
          backgroundColor: item,
          width: '20%',
          aspectRatio: 1,
          borderRadius: BORDER_RADIUS / 2,
          margin: '2.5%',
        }}
        onPress={() => {
          onPressProfileColor(item);
        }}
      />
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
      />

      {/* <InfoLine title="Name" value={firstName} /> */}
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default CustomizeProfileScreen;
