import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import useTheme from 'hooks/styles/useTheme';
import { AN } from 'constants/styles/appStyles';
import { Color } from 'constants/styles/Colors';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GoogleLogo from './googleLogo.svg';

const MyIcon = ({
  name,
  size = AN(20),
  style = {},
  onPress,
  color = 'brand500',
  family = 'feather',
}: Props) => {
  const { colors } = useTheme();

  if (name === 'googleLogo') {
    return <GoogleLogo style={style} />;
  }

  if (family === 'fontAwesome5')
    return (
      <FontAwesome5
        name={name}
        color={colors[color]}
        size={size}
        style={style}
        onPress={onPress ? onPress : undefined}
      />
    );

  if (family === 'simpleLine')
    return (
      <SimpleLineIcon
        name={name}
        color={colors[color]}
        size={size}
        style={style}
        onPress={onPress ? onPress : undefined}
      />
    );

  return (
    <Icon
      name={name}
      color={colors[color]}
      size={size}
      style={style}
      onPress={onPress ? onPress : undefined}
    />
  );
};

export default MyIcon;

interface Props {
  name: IconName;
  size?: number;
  style?: {};
  onPress?: () => void;
  color?: Color;
  family?: 'feather' | 'simpleLine' | 'fontAwesome5';
}

export type IconName =
  | 'arrow-left'
  | 'delete'
  | 'align-justify'
  | 'trophy'
  | 'users'
  | 'user'
  | 'user-friends'
  | 'user-alt'
  | 'x'
  | 'eye'
  | 'eye-off'
  | 'log-out'
  | 'clock'
  | 'lock'
  | 'unlock'
  | 'coffee'
  | 'check'
  | 'check-circle'
  | 'googleLogo'
  | 'share-2'
  | 'star'
  | 'briefcase'
  | 'columns'
  | 'key'
  | 'mail';
