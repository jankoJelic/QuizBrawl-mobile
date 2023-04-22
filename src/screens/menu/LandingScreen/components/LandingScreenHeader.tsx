import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'assets/icons/FeatherIcon';
import BodyMedium from 'components/typography/BodyMedium';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useAppSelector } from 'store/index';

const LandingScreenHeader = () => {
  const navigation = useNavigation();
  const { styles, colors } = useStyles(createStyles);
  const { userData } = useAppSelector(state => state.auth);

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.header}>
      <View>
        <Title text={`Hi, ${userData.firstName}`} color="mainTextColor" />
        <BodyMedium text="Wanna play a little game?" />
      </View>
      <TouchableBounce
        onPress={navigateToProfile}
        style={[styles.userAvatar, { borderColor: userData.color }]}>
        {userData.avatar ? (
          <FastImage source={{ uri: userData.avatar }} />
        ) : (
          <FeatherIcon family="fontAwesome5" name="user-alt" />
        )}
      </TouchableBounce>
    </View>
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
    userAvatar: {
      width: AN(48),
      aspectRatio: 1,
      borderRadius: AN(48),
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default React.memo(LandingScreenHeader);
