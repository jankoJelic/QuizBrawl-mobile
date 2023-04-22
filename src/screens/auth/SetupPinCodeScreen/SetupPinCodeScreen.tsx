import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBackArrow from 'components/icons/NavBackArrow';
import BodyLarge from 'components/typography/BodyLarge';
import HeadingH1 from 'components/typography/HeadingH1';
import Title from 'components/typography/Title';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';
import { StyleSheet } from 'react-native';

const EnterPinCodeScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'SetupPinCode'>
> = ({ navigation }) => {
  const { styles } = useStyles(createStyles);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <NavBackArrow onPress={goBack} />
      <Title text="Set up PIN code" style={styles.title} />
      <BodyLarge
        text="Your PIN will be used for easier sign in"
        color="brand600"
        style={styles.description}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    title: {
      marginTop: AN(20),
    },
  });

export default EnterPinCodeScreen;
