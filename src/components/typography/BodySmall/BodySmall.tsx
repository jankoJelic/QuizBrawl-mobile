import React from 'react';
import BaseTextComponent, { TextProps } from '../BaseTextComponent';
import { AN } from 'constants/styles/appStyles';

const BodySmall = (props: TextProps) => {
  return (
    <BaseTextComponent {...props} text={props?.text || ''} fontSize={AN(12)} />
  );
};

export default BodySmall;
