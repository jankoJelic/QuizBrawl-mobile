import Checkbox from 'components/inputs/Checkbox';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const CheckboxTile = ({ value, onPress, text }: Props) => {
  return (
    <Pressable
      style={{ alignItems: 'center', flexDirection: 'row' }}
      onPress={onPress}>
      <Checkbox value={value} onPress={onPress} />
      <BodyMedium text={text} />
    </Pressable>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {},
  });

export default CheckboxTile;

interface Props {
  value: boolean;
  onPress: () => any;
  text: string;
}
