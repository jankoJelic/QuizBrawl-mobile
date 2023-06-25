import { useAppSelector } from 'store/index';

export const getUserLevel = (correctAnswersCount: number) => {
  if (correctAnswersCount < 100) return levels[100];
  if (correctAnswersCount < 200) return levels[200];
  if (correctAnswersCount < 400) return levels[400];
  if (correctAnswersCount < 800) return levels[800];
  if (correctAnswersCount < 1500) return levels[1500];
  if (correctAnswersCount < 2400) return levels[2400];
  if (correctAnswersCount < 3500) return levels[3500];
  if (correctAnswersCount < 5000) return levels[5000];
  if (correctAnswersCount < 7000) return levels[7000];
  return levels[10000];
};

export const useUserData = () => {
  const { inbox, correctAnswers } = useAppSelector(
    state => state.data.userData,
  );

  const unreadMessages = inbox?.filter(m => !m.read) || [];

  const notificationsCount = unreadMessages.length;

  const totalCorrectAnswers = !correctAnswers
    ? 0
    : Object.values(correctAnswers).reduce((a, b) => a + b, 0);

  const userLevel = getUserLevel(totalCorrectAnswers);

  return { unreadMessages, notificationsCount, userLevel };
};

const levels = {
  100: 'Clueless Casual',
  200: 'Rookie Riddler',
  400: 'Curious Quizer',
  800: 'Trivia Tumbler',
  1500: 'Smarty Pants Novice',
  2400: 'Brainy Buffoon',
  3500: 'Wise Wackadoo',
  5000: 'Quiztastic Guru',
  7000: 'Master of Mirthful Knowledge',
  10000: 'Supreme Quizard',
};
