import BodyMedium from 'components/typography/BodyMedium';
import { Color } from 'constants/styles/Colors';
import TouchableBounce from 'hoc/TouchableBounce';
import React from 'react';
import FastImage from 'react-native-fast-image';

const ClearButton = ({
  title,
  color = 'brand500',
  onPress,
  disabled,
  isLoading = false,
  style = {},
}: Props) => {
  return (
    <TouchableBounce
      onPress={onPress}
      disabled={disabled || isLoading}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // width: '100%',
        ...style,
      }}>
      {isLoading ? (
        <FastImage
          source={require('../../../assets/spinners/doubleRingSpinner.png')}
          style={{}}
        />
      ) : (
        <BodyMedium text={title} color={color} />
      )}
    </TouchableBounce>
  );
};

export default ClearButton;

interface Props {
  title: string;
  color?: Color;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: {};
}
