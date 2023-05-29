import { Color } from 'constants/styles/Colors';
import { FONTS } from 'constants/styles/appStyles';
import useTheme from 'hooks/styles/useTheme';
import React from 'react';
import { Text } from 'react-native';

const BaseTextComponent = ({
  text = '',
  weight = 'regular',
  color = 'mainTextColor',
  fontSize = 14,
  onPress,
  style = {},
}: TextProps) => {
  const { colors } = useTheme();

  const fontFamily = () => {
    switch (weight) {
      case 'regular':
        return FONTS.regular;
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
        fontSize,
        lineHeight: fontSize * 1.4,
        ...style,
      }}
      onPress={onPress ? onPress : undefined}>
      {text}
    </Text>
  );
};

export default BaseTextComponent;

export type FontWeight = 'regular' | 'light' | 'bold';

export interface TextProps {
  weight?: FontWeight;
  text: string;
  color?: Color;
  fontSize?: number;
  onPress?: () => void;
  style?: {};
}
