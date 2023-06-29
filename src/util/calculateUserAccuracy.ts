import { Topic } from 'store/types/dataSliceTypes';

const initialAnswers = {
  General: 0,
  Sports: 0,
  Music: 0,
  History: 0,
  Geography: 0,
  Showbiz: 0,
  Art: 0,
  Science: 0,
};

export const calculateUserAccuracy = (
  correctAnswers: Record<Topic, number>,
  totalAnswers: Record<Topic, number>,
) => {
  const realCorrectAnswers = correctAnswers || initialAnswers;
  const realTotalAnswers = totalAnswers || initialAnswers;

  const correctAnswersCount = Object.values(realCorrectAnswers).reduce(
    (a, b) => a + b,
    0,
  );

  const totalAnswersCount = Object.values(realTotalAnswers).reduce(
    (a, b) => a + b,
    0,
  );

  const totalAccuracy =
    totalAnswersCount === 0
      ? '0.00'
      : ((correctAnswersCount / totalAnswersCount) * 100).toFixed(2);

  return totalAccuracy;
};
