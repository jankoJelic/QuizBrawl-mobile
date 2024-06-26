import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Color, Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

const Tag = ({
  text = '',
  color = 'success400',
  textColor = 'neutral500',
  style = {},
}: Props) => {
  const { colors, styles } = useStyles(createStyles);

  return (
    <View
      style={{
        ...styles.container,
        // borderColor: colors[color],
        ...style,
      }}>
      <BodySmall text={`• ${text} •`} color={color} weight="bold" />
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: AN(8),
      borderRadius: BORDER_RADIUS,
      height: AN(24),
      alignItems: 'center',
      justifyContent: 'center',
      // borderWidth: 1,
    },
  });

export default Tag;

interface Props {
  color?: Color;
  text: string;
  textColor?: Color;
  style?: {};
}
