import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TileWrapper from 'hoc/TileWrapper';
import React from 'react';
import { View } from 'react-native';
import { useAppSelector } from 'store/index';

const QuestionScreen = () => {
  const { questions, onQuestion, users, score, activeRoom } = useAppSelector(
    state => state.game,
  );

  return (
    <ScreenWrapper>
      <TileWrapper>
        <BodyMedium text={questions[onQuestion]?.question} />
      </TileWrapper>
    </ScreenWrapper>
  );
};

export default QuestionScreen;
