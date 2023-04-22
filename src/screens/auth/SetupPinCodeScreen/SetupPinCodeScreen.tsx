import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PinCodeKeyboard from 'components/inputs/PinCodeKeyboard';
import NavBackArrow from 'components/icons/NavBackArrow';
import BodyLarge from 'components/typography/BodyLarge';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import PinCodeDots from 'components/inputs/PinCodeKeyboard/PinCodeDots';

const EnterPinCodeScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'SetupPinCode'>
> = ({ navigation }) => {
  const { styles } = useStyles(createStyles);

  const [confirmingInput, setConfirmingInput] = useState(false);
  const [input, setInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const [error, setError] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const applyBackspace = (string: string) =>
    string.substring(0, string.length - 1);

  const onPressButton = (character: string) => {
    if (confirmingInput) {
      if (character === 'backspace') {
        setConfirmInput(applyBackspace);
      } else {
        setConfirmInput(prevState => prevState + character);
      }
    } else {
      if (character === 'backspace') {
        setInput(applyBackspace);
      } else {
        setInput(prevState => prevState + character);
      }
    }
  };

  const title = confirmingInput ? 'Confirm PIN code' : 'Set up PIN code';

  const onSuccessfullPinSetup = () => {};

  useEffect(() => {
    if (!confirmingInput) {
      if (input.length === 4) {
        setConfirmingInput(true);
      }
    } else {
      if (confirmInput.length === 4) {
        if (input !== confirmInput) {
          setError('PIN does not match');
        } else {
          onSuccessfullPinSetup();
        }
      } else {
        setError('');
      }
    }
  }, [input, confirmInput]);

  return (
    <ScreenWrapper>
      <NavBackArrow onPress={goBack} />
      <Title text={title} style={styles.title} />
      <BodyLarge
        text="Your PIN will be used for easier sign in"
        color="brand600"
        style={styles.description}
      />
      <PinCodeDots input={confirmingInput ? confirmInput : input} error={error} />
      <PinCodeKeyboard onPressButton={onPressButton} errorMessage={error} />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    title: {
      marginTop: AN(20),
    },
    description: { marginBottom: SCREEN_HEIGHT * 0.05 },
  });

export default EnterPinCodeScreen;
