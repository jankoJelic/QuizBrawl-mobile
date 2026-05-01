import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS, CTA_HEIGHT } from 'constants/styles/appStyles';
import BlueGradient from 'hoc/BlueGradient/BlueGradient';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const CTA = ({
  onPress = () => {},
  title = 'Title',
  isLoading = false,
  disabled = false,
  style = {},
}) => {
  const { styles } = useStyles(createStyles);
  const [pressedIn, setPressedIn] = useState(false);

  const onPressIn = () => {
    setPressedIn(true);
  };
  const onPressOut = () => {
    setPressedIn(false);
  };

  return (
    <TouchableBounce
      onPress={onPress}
      style={{ ...styles.container, ...style }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}>
      <BlueGradient pressedIn={pressedIn} disabled={disabled}>
        {isLoading ? (
          <Image
            style={styles.spinner}
            source={require('../../../assets/spinners/doubleRingSpinner.png')}
          />
        ) : (
          <BodyLarge text={title} color="mainTextColor" weight="bold" />
        )}
      </BlueGradient>
    </TouchableBounce>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      borderRadius: BORDER_RADIUS,
      height: CTA_HEIGHT,
      width: '100%',
      marginVertical: AN(10),
    },
    spinner: {
      width: AN(30),
      aspectRatio: 1,
    },
  });

export default CTA;
