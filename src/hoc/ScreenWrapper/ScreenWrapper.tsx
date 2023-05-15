import { Colors } from 'constants/styles/Colors';
import {
  PADDING_HORIZONTAL,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from 'constants/styles/appStyles';
import useStyles from '../../hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ScreenWrapper = ({ children, style, fullWidth }: Props) => {
  const { styles } = useStyles(createStyles);

  return (
    <View style={[styles.screen, style, fullWidth && { paddingHorizontal: 0 }]}>
      {children}
    </View>
  );
};

export default ScreenWrapper;

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      paddingHorizontal: PADDING_HORIZONTAL,
      flex: 1,
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
      backgroundColor: colors.mainThemeBackground,
    },
  });

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: {};
  fullWidth?: boolean;
}
