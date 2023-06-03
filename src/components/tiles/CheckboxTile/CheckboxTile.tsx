import Checkbox from 'components/inputs/Checkbox';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

const CheckboxTile = ({ value, onPress, text }: Props) => {
  const { styles } = useStyles(createStyles);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Checkbox value={value} onPress={onPress} style={styles.checkbox} />
      <BodyMedium text={text} />
    </Pressable>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: AN(10),
      maxWidth: SCREEN_WIDTH * 0.85,
    },
    checkbox: { marginRight: AN(10) },
  });

export default CheckboxTile;

interface Props {
  value: boolean;
  onPress: () => any;
  text: string;
}
