import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import BodyMedium from 'components/typography/BodyMedium';
import Logo from 'components/typography/Logo';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT } from 'constants/styles/appStyles';
import MyScrollView from 'hoc/MyScrollView';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import API from 'services/api';

const RegisterScreen = () => {
  const { styles } = useStyles(createStyles);

  const firstNameInputRef = useRef<TextInput>();
  const lastNameInputRef = useRef<TextInput>();
  const emailInputRef = useRef<TextInput>();
  const passwordInputRef = useRef<TextInput>();

  const registerUser = async () => {
    try {
      // API.registerUser({firstName: firstNameInputRef.current.})
    } catch (e) {}
  };

  const focusNextInput = (title: string) => {
    if (title === 'First name') {
      lastNameInputRef.current?.focus();
    } else if (title === 'Last name') {
      emailInputRef.current?.focus();
    } else if (title === 'E-mail') {
      passwordInputRef.current?.focus();
    }
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <MyScrollView>
        <Logo text="Welcome" />
        <View style={styles.formContainer}>
          <InputField
            title="First name"
            ref={firstNameInputRef}
            onSubmitEditing={() => {
              focusNextInput('First name');
            }}
            autoFocus
          />
          <InputField title="Last name" ref={lastNameInputRef} />
          <InputField title="E-mail" autoCapitalize="none" inputMode="email" />
          <InputField title="Password" />
        </View>

        <CTA title="Register" />

        <View style={styles.footer}>
          <BodyMedium
            text="Already have an account?"
            color="mainTextColor"
            style={styles.haveAnAccountText}
          />

          <CTA title="Log in" onPress={registerUser} />
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
