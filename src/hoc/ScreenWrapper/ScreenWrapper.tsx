import { Colors } from 'constants/styles/Colors';
import { PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ScreenWrapper = ({ children, style }: Props) => {
  const { styles } = useStyles(createStyles);
  
  return <View style={[styles.screen, style]}>{children}</View>;
};

export default ScreenWrapper;

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      paddingHorizontal: PADDING_HORIZONTAL,
    },
  });

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: {};
}
