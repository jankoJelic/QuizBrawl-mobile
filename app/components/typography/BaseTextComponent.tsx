import { IS_TABLET } from 'constants/constants';
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
  numberOfLines,
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
      numberOfLines={numberOfLines}
      style={{
        fontFamily: fontFamily(),
        color: colors[color],
        fontSize,
        lineHeight: fontSize * (IS_TABLET ? 2 : 1.4),
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
  numberOfLines?: number;
}
