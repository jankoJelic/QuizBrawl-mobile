import React from 'react';
import { View } from 'react-native';

const ScreenWrapper = ({ children }: Props) => {
  return <View>{children}</View>;
};

export default ScreenWrapper;

interface Props {
  children: JSX.Element | JSX.Element[];
}
