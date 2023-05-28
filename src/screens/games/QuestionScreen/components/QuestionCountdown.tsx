import BodyLarge from 'components/typography/BodyLarge';
import { AN } from 'constants/styles/appStyles';
import React from 'react';
import { useAppSelector } from 'store/index';

const QuestionCountdown = ({
  secondsLeft,
  isClassicGame,
  allUsersGuessed,
  correctUser,
  correctAnswerGuessed,
}: Props) => {
  const { activeRoom, selectedAnswers } = useAppSelector(state => state.game);
  const { answerTime } = activeRoom || {};

  const countdownColor =
    secondsLeft <= 3 || allUsersGuessed
      ? 'danger500'
      : correctUser
      ? 'brand500'
      : 'neutral200';

  const text = () => {
    if (isClassicGame) {
      if (selectedAnswers.length) return ' ';
      if (secondsLeft < 1) return 'Time is up!';
      return String(secondsLeft);
    }

    if (allUsersGuessed || (!correctUser && secondsLeft < 1)) {
      return 'No correct answers!';
    } else if (correctAnswerGuessed) {
      return `${
        activeRoom.users.find(u => correctUser === u.id)?.firstName
      } guessed right!`;
    }
    if (secondsLeft < answerTime && secondsLeft > 0) {
      return String(secondsLeft);
    }
  };

  return (
    <BodyLarge
      text={text()}
      style={{ textAlign: 'center', marginVertical: AN(12) }}
      color={countdownColor}
    />
  );
};

export default QuestionCountdown;

interface Props {
  secondsLeft: number;
  isClassicGame: boolean;
  correctUser: number;
  allUSersGuessed: boolean;
  correctAnswerGuessed: boolean;
}
