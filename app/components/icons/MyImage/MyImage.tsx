import React from 'react';
import { Image } from 'expo-image';

const MyImage = ({ name, style }: Props) => {
  switch (name) {
    case 'money':
      return (
        <Image
          style={style}
          source={require('../../../assets/icons/lobbies/money.png')}
        />
      );
    case 'trophy':
      return (
        <Image
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
