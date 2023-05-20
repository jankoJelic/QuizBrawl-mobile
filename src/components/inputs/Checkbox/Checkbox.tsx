import MyIcon from 'assets/icons/MyIcon';
import { Colors } from 'constants/styles/Colors';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const Checkbox = ({ value, onPress }: Props) => {
  return (
    <Pressable style={{ alignItems: 'center', justifyContent: 'center' }}>
      {value ? <MyIcon name="check" /> : <></>}
    </Pressable>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {},
  });

export default Checkbox;

interface Props {
  value: boolean;
  onPress: () => any;
}
