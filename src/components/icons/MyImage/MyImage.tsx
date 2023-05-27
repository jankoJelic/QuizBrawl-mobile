import React from 'react';
import FastImage from 'react-native-fast-image';

const MyImage = ({ name, style }: Props) => {
  switch (name) {
    case 'money':
      return (
        <FastImage
          style={style}
          source={require('../../../assets/icons/lobbies/money.png')}
        />
      );
    case 'trophy':
      return (
        <FastImage
          style={style}
          source={require('../../../assets/icons/trophy.png')}
        />
      );
  }
};

export default MyImage;

interface Props {
  name: 'money' | 'trophy';
  style?: {};
}
