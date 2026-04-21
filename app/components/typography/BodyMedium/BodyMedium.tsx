import React from 'react';
import BaseTextComponent, { TextProps } from '../BaseTextComponent';
import { AN } from 'constants/styles/appStyles';

const BodyMedium = (props: TextProps) => {
  return (
    <BaseTextComponent
      {...props}
      text={props?.text || ''}
      style={{ fontSize: AN(14), ...props.style }}
    />
  );
};

export default BodyMedium;
