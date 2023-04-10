import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from '../../../hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Logo from 'components/typography/Logo';

const SplashScreen = () => {
  const { styles, colors } = useStyles(createStyles);

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
