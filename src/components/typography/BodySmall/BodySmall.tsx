import React from 'react';
import BaseTextComponent, { TextProps } from '../BaseTextComponent';
import { AN } from 'constants/styles/appStyles';

const BodySmall = (props: TextProps) => {
  return (
    <BaseTextComponent {...props} text={props?.text || ''} fontSize={AN(11)} />
  );
};

export default BodySmall;
