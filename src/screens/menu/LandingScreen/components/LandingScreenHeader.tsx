import { useNavigation } from '@react-navigation/native';
import UserAvatar from 'components/icons/UserAvatar';
import BodyMedium from 'components/typography/BodyMedium';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from 'store/index';

const LandingScreenHeader = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(createStyles);
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
      <UserAvatar onPress={navigateToProfile} />
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
  });

export default React.memo(LandingScreenHeader);
