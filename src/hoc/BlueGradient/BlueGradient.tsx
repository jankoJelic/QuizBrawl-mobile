import { Colors } from 'constants/styles/Colors';
import { BORDER_RADIUS } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BlueGradient = ({ children, disabled, pressedIn, style = {} }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const gradientColors = disabled
    ? [colors.neutral400, colors.neutral400, colors.neutral400]
    : pressedIn
    ? [colors.brand600, colors.brand700, colors.brand800]
    : [colors.brand400, colors.brand500, colors.brand600];

  return (
    <LinearGradient
      style={[styles.gradient, style]}
      colors={gradientColors}
      useAngle
      angle={290}>
      {children}
    </LinearGradient>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    gradient: {
      width: '100%',
      height: '100%',
      borderRadius: BORDER_RADIUS,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  });

export default BlueGradient;

interface Props {
  children: JSX.Element | JSX.Element[];
  disabled?: boolean;
  pressedIn?: boolean;
  style?: {};
}
