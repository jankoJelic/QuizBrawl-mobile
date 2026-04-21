import MyIcon from 'assets/icons/MyIcon';
import { Colors } from 'constants/styles/Colors';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const Checkbox = ({ value, onPress, style }: Props) => {
  const { styles } = useStyles(createStyles);

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <MyIcon name="check" color={value ? 'brand500' : 'neutral500'} />
    </Pressable>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 4,
      borderColor: colors.mainTextColor,
    },
  });

export default Checkbox;

interface Props {
  value: boolean;
  onPress: () => any;
  style?: {};
}
