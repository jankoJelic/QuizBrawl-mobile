import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from '../../../hooks/styles/useStyles';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Logo from 'components/typography/Logo';
import ENCRYPTED_STORAGE from 'services/encryptedStorage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamsList, ROUTES } from 'navigation/navConstants';

const SplashScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamsList, 'Splash'>) => {
  const { styles, colors } = useStyles(createStyles);

  const checkForPin = async () => {
    const pin = await ENCRYPTED_STORAGE.getValue('pin');

    if (!!pin) {
      navigation.navigate('EnterPinCode');
    } else {
      navigation.navigate('Register');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkForPin();
    }, 500);
  }, []);

  return (
    <ScreenWrapper style={styles.screen}>
      <Logo />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      backgroundColor: colors.mainThemeBackground,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SplashScreen;
