import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import useTheme from 'hooks/styles/useTheme';
import { AN } from 'constants/styles/appStyles';
import { Color } from 'constants/styles/Colors';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FeatherIcon = ({
  name,
  size = AN(20),
  style = {},
  onPress = () => {},
  color = 'brand500',
  family = 'feather',
}: Props) => {
  const { colors } = useTheme();

  if (family === 'fontAwesome5')
    return (
      <FontAwesome5
        name={name}
        color={colors[color]}
        size={size}
        style={style}
        onPress={onPress}
      />
    );

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
  family?: 'feather' | 'simpleLine' | 'fontAwesome5';
}

export type IconName = 'arrow-left' | 'delete' | 'align-justify' | 'trophy';
