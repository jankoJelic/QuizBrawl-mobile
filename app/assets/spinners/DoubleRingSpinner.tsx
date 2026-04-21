import { AN } from 'constants/styles/appStyles';
import React from 'react';
import FastImage from 'react-native-fast-image';

const DoubleRingSpinner = ({
  style = { width: AN(25), aspectRatio: 1 },
}: Props) => (
  <FastImage style={style} source={require('./doubleRingSpinner.png')} />
);

export default DoubleRingSpinner;

interface Props {
  style?: {};
}
