import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavBackArrow from 'components/icons/NavBackArrow';
import InputField from 'components/inputs/InputField';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import Logo from 'components/typography/Logo';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import API from 'services/api';
import { storeTokens } from 'services/encryptedStorage/tokens/tokenStorage';

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamsList, 'Login'>) => {
  const { styles } = useStyles(createStyles);
  const emailInputRef = useRef<TextInput>();
  const passwordInputRef = useRef<TextInput>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!!error) setError('');
  }, [email, password]);

  const loginUser = async () => {
    setIsLoading(true);
    try {
      const { accessToken, refreshToken } = await API.loginUser({
        email,
        password,
      });

      storeTokens(accessToken, refreshToken);

      navigation.navigate('SetupPinCode', { email, password });
    } catch (e: any) {
      const { status } = e?.response || {};

      switch (status) {
        case 404:
          setError('User does not exist');
          break;
        case 400:
          setError('Invalid password');
          break;
        default:
          return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const focusPassword = () => {
    passwordInputRef.current?.focus();
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <NavBackArrow onPress={goBack} />
      <Logo text="Log in" style={styles.title} />
      <InputField
        title="E-mail"
        onChangeText={setEmail}
        ref={emailInputRef}
        keyboardType="email-address"
        autoCapitalize="none"
        onSubmitEditing={focusPassword}
      />
      <InputField
        title="Password"
        autoCapitalize="none"
        onChangeText={setPassword}
        ref={passwordInputRef}
        icon="eye"
      />
      <CTA
        title="Log in"
        onPress={loginUser}
        disabled={!email || !password}
        isLoading={isLoading}
      />
      <BodyLarge text={error} color="danger400" style={styles.errorMessage} />
      <BodyMedium
        text="Don't have an account?"
        style={{ textAlign: 'center' }}
      />
      <BodyMedium
        text="Register"
        color="brand500"
        onPress={navigateToRegister}
        style={{ textAlign: 'center' }}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      paddingTop: AN(20),
    },
    title: {
      marginBottom: AN(20),
    },
    errorMessage: {
      marginTop: AN(20),
    },
  });

export default LoginScreen;
