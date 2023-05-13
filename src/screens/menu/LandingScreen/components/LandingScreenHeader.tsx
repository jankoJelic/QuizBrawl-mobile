import UserAvatar from 'components/icons/UserAvatar';
import BodyMedium from 'components/typography/BodyMedium';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/index';
import { showSideBar } from 'store/slices/appStateSlice';

const LandingScreenHeader = () => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);
  const { userData } = useAppSelector(state => state.data);

  const openSideBar = () => {
    dispatch(showSideBar());
  };

  return (
    <Pressable style={styles.header} onPress={openSideBar}>
      <View>
        <Title text={`Hi, ${userData.firstName}`} color="mainTextColor" />
        <BodyMedium text="Wanna play a little game?" />
      </View>
      <UserAvatar onPress={openSideBar} />
    </Pressable>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    trophiesContainer: {
      flexDirection: 'row',
    },
    trophiesCount: { marginLeft: AN(6) },
  });

export default React.memo(LandingScreenHeader);
