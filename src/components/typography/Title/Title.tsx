import React from 'react';
import BaseTextComponent, { TextProps } from '../BaseTextComponent';
import { AN } from 'constants/styles/appStyles';

const Title = (props: TextProps) => {
  return (
    <BaseTextComponent
      {...props}
      text={props.text}
      color={props.color || 'brand500'}
      fontSize={AN(24)}
    />
  );
};

export default Title;
