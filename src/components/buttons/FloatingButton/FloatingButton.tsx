import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import BlueGradient from 'hoc/BlueGradient/BlueGradient';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const FloatingButton = ({ onPress, disabled, title, style = {} }: Props) => {
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
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={styles.container}
      disabled={disabled}>
      <BlueGradient disabled={disabled} pressedIn={pressedIn}>
        <BodyLarge
          weight="bold"
          text={title}
          color={pressedIn ? 'neutral200' : 'neutral500'}
          style={styles.title}
        />
      </BlueGradient>
    </TouchableBounce>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      width: AN(70),
      aspectRatio: 1,
      borderRadius: AN(70),
      backgroundColor: colors.brand600,
      bottom: AN(30),
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    title: { textAlign: 'center' },
  });

export default FloatingButton;

interface Props {
  onPress?: () => any;
  disabled?: boolean;
  title: string;
  style?: {};
}
