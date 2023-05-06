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
    <ScreenWrapper>
      <Animated.Text
        style={{
          fontFamily: FONTS.bold,
          color: colors.brand500,
          textAlign: 'center',
          fontSize: AN(50),
        }}>
        {String(countdown)}
      </Animated.Text>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default GameSplashScreen;
