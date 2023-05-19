import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Color, Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

const NotificationBadge = ({
  color = 'danger500',
  size = AN(17),
  text = '0',
  style = {},
}: Props) => {
  const { styles, colors } = useStyles(createStyles);

  return (
    <View
      style={{
        width: size,
        borderRadius: size,
        ...styles.container,
        ...style,
        backgroundColor: colors[color],
      }}>
      <BodySmall text={text} />
    </View>
  );
};

const createStyles = (color: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: 1,
    },
  });

export default NotificationBadge;

interface Props {
  color?: Color;
  size?: number;
  text: string;
  style?: {};
}
