import React from 'react';
import BaseTextComponent, { TextProps } from '../BaseTextComponent';
import { AN } from 'constants/styles/appStyles';

const BodyLarge = (props: Partial<TextProps>) => {
  return (
    <BaseTextComponent {...props} text={props?.text || ''} fontSize={AN(16)} />
  );
};

export default BodyLarge;
