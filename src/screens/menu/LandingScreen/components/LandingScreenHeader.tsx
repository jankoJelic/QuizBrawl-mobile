import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'assets/icons/FeatherIcon';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from 'store';

const LandingScreenHeader = () => {
  const { userData } = useAppSelector(state => state.auth);
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.header}>
      {/* <FeatherIcon
        name="align-justify"
        size={AN(35)}
        onPress={navigateToProfile}
      /> */}
      <View>
        <Title text={`Hi, ${userData.firstName}`} />
        <BodyMedium text="Wanna play a little game?" color="brand600" />
      </View>
      <TouchableBounce onPress={navigateToProfile} style={styles.userAvatar}>
        {userData.avatar ? (
          <></>
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
      borderColor: colors.brand500,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default React.memo(LandingScreenHeader);
