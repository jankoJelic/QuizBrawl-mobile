import FeatherIcon from 'assets/icons/FeatherIcon';
import BodyLarge from 'components/typography/BodyLarge';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from 'store';

const LandingScreenHeader = ({ navigateToProfile = () => {} }) => {
  const { userData } = useAppSelector(state => state.auth);

  const { styles } = useStyles(createStyles);
  console.log(userData);
  return (
    <View style={styles.header}>
      <FeatherIcon
        name="align-justify"
        size={AN(35)}
        onPress={navigateToProfile}
      />
      <Title text={`Hi, ${userData.firstName}`} />
      <View style={styles.trophiesContainer}>
        <FeatherIcon family="simpleLine" name="trophy" size={AN(22)} />
        <BodyLarge
          text={String(userData.trophies)}
          style={styles.trophiesCount}
          color="brand500"
        />
      </View>
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
  });

export default LandingScreenHeader;
