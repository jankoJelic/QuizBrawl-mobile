import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from 'constants/styles/Colors';
import { AN, FONTS } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Animated } from 'react-native';

const GameSplashScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'GameSplash'>
> = ({ navigation }) => {
  const { styles, colors } = useStyles(createStyles);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let countdownInterval = setInterval(() => {
      setCountdown(c => {
        if (c === 0) {
          clearInterval(countdownInterval);
          navigation.navigate('Question');
          return 3;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <ScreenWrapper style={styles.screen}>
      <Animated.Text style={styles.number}>{String(countdown)}</Animated.Text>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    number: {
      fontFamily: FONTS.bold,
      color: colors.brand500,
      textAlign: 'center',
      fontSize: AN(55),
    },
    screen: { alignItems: 'center', justifyContent: 'center' },
  });

export default GameSplashScreen;
