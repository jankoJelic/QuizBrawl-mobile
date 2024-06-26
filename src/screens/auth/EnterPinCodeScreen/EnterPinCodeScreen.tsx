import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBackArrow from 'components/icons/NavBackArrow';
import PinCodeKeyboard from 'components/inputs/PinCodeKeyboard';
import PinCodeDots from 'components/inputs/PinCodeKeyboard/PinCodeDots';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import Logo from 'components/typography/Logo';
import { DEVICE_ID } from 'constants/env/envConstants';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { decryptData } from 'services/aesCrypto/aesCrypto';
import API from 'services/api';
import ENCRYPTED_STORAGE from 'services/encryptedStorage';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';

const EnterPinCodeScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'EnterPinCode'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const applyBackspace = (string: string) =>
    string.substring(0, string.length - 1);

  const onPressButton = (character: string) => {
    if (input.length === 4 && character !== 'backspace') return;

    if (character === 'backspace') {
      setInput(prevState => applyBackspace(prevState));
    } else {
      setInput(prevState => prevState + character);
    }

    setErrorMessage('');
  };

  const validatePin = async () => {
    dispatch(startLoading());
    try {
      const encryptionKey = await API.getPinEncryptionKey({
        deviceId: DEVICE_ID,
        pin: input,
      });

      const storedCredentials = await ENCRYPTED_STORAGE.getValue('credentials');

      const decryptedCredentials = await decryptData(
        storedCredentials,
        encryptionKey,
      );

      const parsedCredentials = JSON.parse(decryptedCredentials);

      await API.loginUser(parsedCredentials);

      await API.getUserData();

      navigation.navigate('Landing');
    } catch (e) {
      setErrorMessage('Invalid PIN');
      setInput('');
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (input.length === 4) {
      validatePin();
    }
  }, [input]);

  const onPressLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScreenWrapper>
      <NavBackArrow onPress={goToLogin} />
      <Logo text="Enter PIN code" style={styles.title} />
      <PinCodeDots input={input} error={errorMessage} />
      <PinCodeKeyboard
        onPressButton={onPressButton}
        errorMessage={errorMessage}
      />
      <BodyMedium text="Forgot PIN?" style={{ textAlign: 'center' }} />
      <BodyLarge
        text="Log in"
        color="brand500"
        onPress={onPressLogin}
        style={{ textAlign: 'center' }}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    title: {
      marginVertical: AN(20),
    },
  });

export default EnterPinCodeScreen;
