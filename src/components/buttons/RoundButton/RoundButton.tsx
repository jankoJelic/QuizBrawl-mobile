import { IconName } from 'assets/icons/FeatherIcon';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Color, Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const RoundButton = ({
  onPress = () => {},
  size = AN(40),
  title,
  color = 'brand500',
  icon,
  style = {},
}: Props) => {
  const { styles, colors } = useStyles(createStyles);

  return (
    <TouchableBounce
      onPress={onPress}
      style={{
        ...styles.container,
        ...style,
        borderRadius: size,
        width: size,
        borderColor: colors[color],
      }}>
      <BodySmall text={title} color={color} style={{ top: size / 3.5 }} />
    </TouchableBounce>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      aspectRatio: 1,
      alignItems: 'center',
      justifycontent: 'center',
      borderWidth: AN(2),
    },
  });

export default RoundButton;

interface Props {
  onPress?: () => void;
  title: string;
  size?: number;
  color?: Color;
  icon?: IconName;
  style?: {};
}
