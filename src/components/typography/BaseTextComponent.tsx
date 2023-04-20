import { Color } from 'constants/styles/Colors';
import { FONTS } from 'constants/styles/appStyles';
import useTheme from 'hooks/styles/useTheme';
import React from 'react';
import { Text } from 'react-native';

const BaseTextComponent = ({
  text = '',
  weight = 'regular',
  color = 'neutral200',
}: Props) => {
  const { colors } = useTheme();

  const fontFamily = () => {
    switch (weight) {
      case 'regular':
        return FONTS.regular;
      case 'semiBold':
        return FONTS.semiBold;
      case 'bold':
        return FONTS.bold;
      case 'light':
        return FONTS.light;
      default:
        return FONTS.regular;
    }
  };

  return (
    <Text
      style={{
        fontFamily: fontFamily(),
        color: colors[color],
      }}>
      {text}
    </Text>
  );
};

export default BaseTextComponent;

export type FontWeight = 'regular' | 'light' | 'semiBold' | 'bold';

interface Props {
  weight?: FontWeight;
  text: string;
  color?: Color;
}
