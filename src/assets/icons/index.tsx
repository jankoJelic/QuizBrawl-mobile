import React from 'react';
import Question from './question.svg';
import GoogleLogo from './googleLogo.svg';

export const SvgIcon = ({ name, style }: Props) => {
  switch (name) {
    case 'question':
      return <Question style={style} />;
    case 'googleLogo':
      return <GoogleLogo style={style} />;
    default:
      return null;
  }
};

export const QuestionIcon = ({ style = {} }) => <Question style={style} />;

interface Props {
  name: 'question' | 'googleLogo';
  style?: {};
}
