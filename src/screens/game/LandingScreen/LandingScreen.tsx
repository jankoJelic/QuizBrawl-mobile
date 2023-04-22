import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FeatherIcon from 'assets/icons/FeatherIcon';
import BodyLarge from 'components/typography/BodyLarge';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from 'store';

const LandingScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Landing'>
> = ({ navigation }) => {
  const { userData } = useAppSelector(state => state.auth);
  const { styles } = useStyles(createStyles);

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <ScreenWrapper>
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
    </ScreenWrapper>
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

export default LandingScreen;
