import React from 'react';
import BaseTextComponent, { TextProps } from '../BaseTextComponent';
import { AN } from 'constants/styles/appStyles';

const Title = (props: TextProps) => {
  return (
    <BaseTextComponent
      fontSize={AN(24)}
      {...props}
      text={props.text}
      color={props.color || 'brand500'}
    />
  );
};

export default Title;
