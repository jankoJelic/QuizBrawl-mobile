import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';

const TileWrapper = ({ children, style = {}, onPress = () => {} }: Props) => {
  const { styles } = useStyles(createStyles);

  return (
    <TouchableBounce onPress={onPress} style={[styles.container, style]}>
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
    },
  });

export default TileWrapper;

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: {};
  onPress?: () => void;
}
