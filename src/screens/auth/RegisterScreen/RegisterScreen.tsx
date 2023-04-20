import InputField from 'components/inputs/InputField';
import BaseTextComponent from 'components/typography/BaseTextComponent';
import Logo from 'components/typography/Logo';
import { BASE_URL } from 'constants/env/envConstants';
import { Colors } from 'constants/styles/Colors';
import { SCREEN_HEIGHT } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';

const RegisterScreen = () => {
  const { styles } = useStyles(createStyles);

  console.log(BASE_URL);

  return (
    <ScreenWrapper style={styles.screen}>
      <Logo text="Welcome" />
      <BaseTextComponent text="Janko" />
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
