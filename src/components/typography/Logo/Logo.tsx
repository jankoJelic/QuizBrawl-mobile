import { Colors } from 'constants/styles/Colors';
import { AN, FONTS } from 'constants/styles/appStyles';
import useStyles from '../../../hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Logo = ({ text = 'Quiz Clash', style = {} }) => {
  const { styles } = useStyles(createStyles);

  return <Text style={[styles.logo, style]}>{text}</Text>;
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    logo: {
      fontFamily: FONTS.bold,
      color: colors.brand500,
      fontSize: AN(40),
      letterSpacing: 2,
      textAlign: 'center',
    },
  });
export default Logo;
