import FeatherIcon from 'assets/icons/FeatherIcon';
import { Color } from 'constants/styles/Colors';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import React from 'react';
import { StyleSheet } from 'react-native';

const NavBackArrow = ({ onPress = () => {}, color = 'brand500' as Color }) => {
  return (
    <FeatherIcon
      name="arrow-left"
      size={AN(26)}
      style={styles.leftArrow}
      onPress={onPress}
      color={color}
    />
  );
};

const styles = StyleSheet.create({
  leftArrow: {
    left: PADDING_HORIZONTAL,
    top: AN(0),
  },
});

export default NavBackArrow;
