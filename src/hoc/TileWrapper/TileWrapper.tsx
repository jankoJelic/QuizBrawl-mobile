import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { setColorOpacity } from 'util/strings/setColorOpacity';

const TileWrapper = ({ children, style = {}, onPress = () => {} }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);

  const onPressIn = () => {
    setBackgroundOpacity(0.7);
  };

  const onPressOut = () => {
    setBackgroundOpacity(1);
  };

  return (
    <TouchableBounce
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.container,
        style,
        {
          backgroundColor: setColorOpacity(
            colors.tileBackground,
            backgroundOpacity,
          ),
        },
      ]}>
      {children}
    </TouchableBounce>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      borderRadius: BORDER_RADIUS,
      backgroundColor: colors.tileBackground,
      padding: AN(10),
      shadowRadius: AN(4),
      shadowOpacity: 0.15,
      elevation: AN(4),
    },
  });

export default TileWrapper;

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: {};
  onPress?: () => void;
}
