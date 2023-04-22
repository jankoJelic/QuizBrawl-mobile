import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBackArrow from 'components/icons/NavBackArrow';
import PinCodeKeyboard from 'components/inputs/PinCodeKeyboard';
import PinCodeDots from 'components/inputs/PinCodeKeyboard/PinCodeDots';
import Logo from 'components/typography/Logo';
import { DEVICE_ID } from 'constants/env/envConstants';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { decryptData } from 'services/aesCrypto/aesCrypto';
import API from 'services/api';
import ENCRYPTED_STORAGE from 'services/encryptedStorage';
import { storeTokens } from 'services/encryptedStorage/tokens/tokenStorage';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';
import { storeUserData } from 'store/slices/authSlice';

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
    if (input.length === 4) return;

    if (character === 'backspace') {
      setInput(applyBackspace);
    } else {
      setInput(prevState => prevState + character);
    }
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

      const { accessToken, refreshToken } = await API.loginUser(
        parsedCredentials,
      );

      storeTokens(accessToken, refreshToken);

      const userData = await API.getUserData();
      dispatch(storeUserData(userData));

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

  return (
    <ScreenWrapper>
      <NavBackArrow onPress={goToLogin} />
      <Logo text="Enter PIN code" style={styles.title} />
      <PinCodeDots input={input} error={errorMessage} />
      <PinCodeKeyboard
        onPressButton={onPressButton}
        errorMessage={errorMessage}
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
