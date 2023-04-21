import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import BodyMedium from 'components/typography/BodyMedium';
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

      <View style={styles.footer}>
        <BodyMedium
          text="Already have an account?"
          color="mainTextColor"
          style={styles.haveAnAccountText}
        />

        <CTA title="Log in" />
      </View>
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
    haveAnAccountText: { marginBottom: AN(6) },
    footer: {
      position: 'absolute',
      bottom: AN(20),
      width: '100%',
      alignItems: 'center',
    },
  });

export default RegisterScreen;
