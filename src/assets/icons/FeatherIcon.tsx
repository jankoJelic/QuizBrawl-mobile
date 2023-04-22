import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import useTheme from 'hooks/styles/useTheme';
import { AN } from 'constants/styles/appStyles';
import { Color } from 'constants/styles/Colors';

const FeatherIcon = ({
  name,
  size = AN(20),
  style = {},
  onPress = () => {},
  color = 'brand500',
}: Props) => {
  const { colors } = useTheme();

  return (
    <Icon
      name={name}
      color={colors[color]}
      size={size}
      style={style}
      onPress={onPress}
    />
  );
};

export default FeatherIcon;

interface Props {
  name: FeatherIconName;
  size: number;
  style?: {};
  onPress?: () => void;
  color?: Color;
}

export type FeatherIconName = 'arrow-left' | 'delete';
