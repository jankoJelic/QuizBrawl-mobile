import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import BodyMedium from 'components/typography/BodyMedium';
import Logo from 'components/typography/Logo';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT } from 'constants/styles/appStyles';
import MyScrollView from 'hoc/MyScrollView';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const RegisterScreen = () => {
  const { styles } = useStyles(createStyles);

  return (
    <ScreenWrapper style={styles.screen}>
      <MyScrollView>
        <Logo text="Welcome" />
        <View style={styles.formContainer}>
          <InputField title="First name" />
          <InputField title="Last name" />
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
      </MyScrollView>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      alignItems: 'center',
      paddingTop: AN(20),
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
