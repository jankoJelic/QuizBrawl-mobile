import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import BodyMedium from 'components/typography/BodyMedium';
import Logo from 'components/typography/Logo';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import MyScrollView from 'hoc/MyScrollView';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { storeTokens } from 'services/encryptedStorage/tokens/tokenStorage';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';

const RegisterScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamsList, 'Register'>) => {
  const { styles } = useStyles(createStyles);
  const dispatch = useDispatch();

  const firstNameInputRef = useRef<TextInput>();
  const lastNameInputRef = useRef<TextInput>();
  const emailInputRef = useRef<TextInput>();
  const passwordInputRef = useRef<TextInput>();
  const confirmPasswordInputRef = useRef<TextInput>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = async () => {
    dispatch(startLoading());

    try {
      if (password === confirmPassword) {
        await API.registerUser({
          firstName,
          lastName,
          email,
          password,
        });

        await API.getUserData();

        navigation.navigate('Landing');
      }

      // navigation.navigate('SetupPinCode', { email, password });
    } catch (e) {
    } finally {
      dispatch(stopLoading());
    }
  };

  const onPressLogin = () => {
    navigation.navigate('SelectProvider');
  };

  const formValid =
    !!firstName &&
    !!lastName &&
    !!email &&
    !!password &&
    !!confirmPassword &&
    password === confirmPassword;

  const focusNextInput = (title: string) => {
    if (title === 'First name') {
      lastNameInputRef.current?.focus();
    } else if (title === 'Last name') {
      emailInputRef.current?.focus();
    } else if (title === 'E-mail') {
      passwordInputRef.current?.focus();
    } else if (title === 'Password') {
      confirmPasswordInputRef.current?.focus();
    }
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.select({ android: undefined, ios: 'padding' })}>
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
              onChangeText={setFirstName}
            />
            <InputField
              title="Last name"
              ref={lastNameInputRef}
              onChangeText={setLastName}
              onSubmitEditing={() => {
                focusNextInput('Last name');
              }}
            />
            <InputField
              title="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              inputMode="email"
              ref={emailInputRef}
              onChangeText={setEmail}
              onSubmitEditing={() => {
                focusNextInput('E-mail');
              }}
            />
            <InputField
              title="Password"
              ref={passwordInputRef}
              autoCorrect={false}
              onChangeText={setPassword}
              onSubmitEditing={() => {
                focusNextInput('Password');
              }}
              icon="eye"
            />
            <InputField
              title="Confirm password"
              ref={confirmPasswordInputRef}
              onChangeText={setConfirmPassword}
              icon="eye"
            />
          </View>

          <CTA title="Register" onPress={registerUser} disabled={!formValid} />

          <View style={styles.footer}>
            <BodyMedium
              text="Already have an account?"
              color="mainTextColor"
              style={styles.haveAnAccountText}
            />

            <CTA title="Log in" onPress={onPressLogin} />
          </View>
        </MyScrollView>
      </KeyboardAvoidingView>
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
      marginTop: AN(30),
      width: '100%',
      alignItems: 'center',
    },
  });

export default RegisterScreen;
