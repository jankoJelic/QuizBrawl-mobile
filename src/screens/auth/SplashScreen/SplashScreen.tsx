import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from '../../../hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const SplashScreen = () => {
  const { styles, colors } = useStyles(createStyles);

  return (
    <ScreenWrapper style={styles.screen}>
      <Text>splash</Text>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      backgroundColor: colors.mainThemeBackground,
    },
  });

export default SplashScreen;
