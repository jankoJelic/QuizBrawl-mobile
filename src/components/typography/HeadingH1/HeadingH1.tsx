import React from 'react';
import BaseTextComponent, { TextProps } from '../BaseTextComponent';
import { AN } from 'constants/styles/appStyles';

const HeadingH1 = (props: TextProps) => {
  return <BaseTextComponent {...props} fontSize={AN(20)} />;
};

export default HeadingH1;
