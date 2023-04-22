import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import useTheme from 'hooks/styles/useTheme';
import { AN } from 'constants/styles/appStyles';
import { Color } from 'constants/styles/Colors';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

const FeatherIcon = ({
  name,
  size = AN(20),
  style = {},
  onPress = () => {},
  color = 'brand500',
  family = 'feather',
}: Props) => {
  const { colors } = useTheme();

  if (family === 'simpleLine')
    return (
      <SimpleLineIcon
        name={name}
        color={colors[color]}
        size={size}
        style={style}
        onPress={onPress}
      />
    );

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
  name: IconName;
  size: number;
  style?: {};
  onPress?: () => void;
  color?: Color;
  family?: 'feather' | 'simpleLine';
}

export type IconName = 'arrow-left' | 'delete' | 'align-justify' | 'trophy';
