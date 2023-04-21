import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import Logo from 'components/typography/Logo';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const RegisterScreen = () => {
  const { styles } = useStyles(createStyles);

  return (
    <ScreenWrapper style={styles.screen}>
      <Logo text="Welcome" />
      <View style={styles.formContainer}>
        <InputField title="E-mail" />
        <InputField title="Password" />
      </View>

      <CTA title="Register" />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      alignItems: 'center',
      paddingTop: SCREEN_HEIGHT * 0.1,
    },
    formContainer: { marginTop: AN(30), width: '100%' },
  });

export default RegisterScreen;
