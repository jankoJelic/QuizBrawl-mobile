import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const CTA = ({
  onPress = () => {},
  title = 'Title',
  isLoading = false,
  disabled = false,
  style = {},
}) => {
  const { styles, colors } = useStyles(createStyles);
  const [pressedIn, setPressedIn] = useState(false);

  const onPressIn = () => {
    setPressedIn(true);
  };
  const onPressOut = () => {
    setPressedIn(false);
  };

  const gradientColors = disabled
    ? [colors.neutral400, colors.neutral400, colors.neutral400]
    : pressedIn
    ? [colors.brand600, colors.brand700, colors.brand800]
    : [colors.brand400, colors.brand500, colors.brand600];

  return (
    <TouchableBounce
      onPress={onPress}
      style={{ ...styles.container, ...style }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}>
      <LinearGradient
        style={styles.gradient}
        colors={gradientColors}
        useAngle
        angle={290}>
        {isLoading ? (
          <FastImage
            style={styles.spinner}
            source={require('../../../assets/spinners/doubleRingSpinner.png')}
          />
        ) : (
          <BodyLarge text={title} color="mainTextColor" weight="bold" />
        )}
      </LinearGradient>
    </TouchableBounce>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      borderRadius: BORDER_RADIUS,
      height: AN(42),
      width: '100%',
      marginVertical: AN(10),
    },
    gradient: {
      width: '100%',
      height: '100%',
      borderRadius: BORDER_RADIUS,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    spinner: {
      width: AN(30),
      aspectRatio: 1,
    },
  });

export default CTA;
