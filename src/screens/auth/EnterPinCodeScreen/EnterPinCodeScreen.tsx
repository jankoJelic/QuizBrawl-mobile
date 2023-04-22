import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBackArrow from 'components/icons/NavBackArrow';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';
import { StyleSheet } from 'react-native';

const EnterPinCodeScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'EnterPinCode'>
> = ({ navigation }) => {
  const { styles } = useStyles(createStyles);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <NavBackArrow onPress={goBack} />
      <Title text="Set up PIN code" style={styles.title} />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    title: {},
  });

export default EnterPinCodeScreen;
