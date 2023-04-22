import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import useTheme from 'hooks/styles/useTheme';
import { AN } from 'constants/styles/appStyles';

const FeatherIcon = ({
  name,
  size = AN(20),
  style = {},
  onPress = () => {},
}: Props) => {
  const { colors } = useTheme();

  return (
    <Icon
      name={name}
      color={colors.brand500}
      size={size}
      style={style}
      onPress={onPress}
    />
  );
};

export default FeatherIcon;

interface Props {
  name: 'arrow-left';
  size: number;
  style?: {};
  onPress?: () => void;
}
