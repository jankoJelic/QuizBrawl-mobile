import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import useTheme from 'hooks/styles/useTheme';
import { AN } from 'constants/styles/appStyles';
import { Color } from 'constants/styles/Colors';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import GoogleLogo from './googleLogo.svg';
import FastImage from 'react-native-fast-image';

const MyIcon = ({
  name,
  size = AN(20),
  style = {},
  onPress,
  color = 'brand500',
  family = 'feather',
}: Props) => {
  const { colors } = useTheme();

  const vectorIconProps = {
    name,
    color: colors[color],
    size,
    style,
    onPress: onPress ? onPress : undefined,
  };

  const imageStyle = { width: size, height: size, ...style };
  if (name === 'money')
    return (
      <FastImage
        source={require('../../assets/icons/lobbies/money.png')}
        style={imageStyle}
      />
    );

  if (name === 'ranking')
    return (
      <FastImage source={require('../icons/ranking.png')} style={imageStyle} />
    );
  if (name === 'googleLogo') return <GoogleLogo style={style} />;
  if (name === 'colorPalette')
    return (
      <FastImage
        source={require('./colorPalette.png')}
        tintColor={colors[color]}
        style={imageStyle}
      />
    );

  if (family === 'material') return <MaterialIcon {...vectorIconProps} />;
  if (family === 'fontAwesome5') return <FontAwesome5 {...vectorIconProps} />;
  if (family === 'simpleLine') return <SimpleLineIcon {...vectorIconProps} />;
  if (family === 'antDesign') return <AntDesignIcon {...vectorIconProps} />;
  return <Icon {...vectorIconProps} />;
};

export default MyIcon;

interface Props {
  name: IconName;
  size?: number;
  style?: {};
  onPress?: () => void;
  color?: Color;
  family?: IconFamily;
}

export type IconFamily =
  | 'feather'
  | 'simpleLine'
  | 'fontAwesome5'
  | 'material'
  | 'antDesign';

export type IconName =
  | 'arrow-left'
  | 'delete'
  | 'align-justify'
  | 'colorPalette'
  | 'trophy'
  | 'users'
  | 'user'
  | 'user-friends'
  | 'user-alt'
  | 'x'
  | 'eye'
  | 'eye-off'
  | 'log-out'
  | 'shopping-cart'
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
  | 'mail'
  | 'explore'
  | 'ranking'
  | 'like2'
  | 'dislike2'
  | 'money'
  | 'chevron-down'
  | 'chevron-up';
