import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import Logo from 'components/typography/Logo';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React, { useRef, useState } from 'react';
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

  const loginUser = async () => {
    try {
      const { accessToken, refreshToken } = await API.loginUser({
        email,
        password,
      });

      storeTokens(accessToken, refreshToken);

      navigation.navigate('EnterPinCode');
    } catch (e) {}
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <Logo text="Log in" style={styles.title} />
      <InputField title="E-mail" onChangeText={setEmail} ref={emailInputRef} />
      <InputField
        title="Password"
        onChangeText={setPassword}
        ref={passwordInputRef}
      />
      <CTA title="Log in" />
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
  });

export default LoginScreen;
