import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const TileWrapper = ({ children, style = {} }: Props) => {
  const { styles } = useStyles(createStyles);

  return <View style={[styles.container, style]}>{children}</View>;
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      borderRadius: BORDER_RADIUS,
      backgroundColor: colors.tileBackground,
      width: '100%',
      padding: AN(10),
    },
  });

export default TileWrapper;

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: {};
}
