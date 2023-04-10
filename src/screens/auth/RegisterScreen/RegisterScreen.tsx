import InputField from 'components/inputs/InputField';
import Logo from 'components/typography/Logo';
import { Colors } from 'constants/styles/Colors';
import { SCREEN_HEIGHT } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';

const RegisterScreen = () => {
  const { styles } = useStyles(createStyles);

  return (
    <ScreenWrapper style={styles.screen}>
      <Logo text="Welcome" />
      <InputField />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      alignItems: 'center',
      paddingTop: SCREEN_HEIGHT * 0.1,
    },
  });

export default RegisterScreen;
