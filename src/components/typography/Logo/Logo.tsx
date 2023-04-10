import { Colors } from 'constants/styles/Colors';
import { AN, FONTS } from 'constants/styles/appStyles';
import useStyles from '../../../hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Logo = () => {
  const { styles } = useStyles(createStyles);

  return <Text style={styles.logo}>HumorMe</Text>;
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    logo: {
      fontFamily: FONTS.extraBold,
      color: colors.primaryGold,
      fontSize: AN(40),
      letterSpacing: 2,
    },
  });
export default Logo;
