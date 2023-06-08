import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import AnswerTile from 'components/tiles/AnswerTile';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { CorrectAnswer, Question } from 'services/socket/socketPayloads';
import { RootState, useAppSelector } from 'store/index';
import {
  SelectedAnswerPayload,
  goToNextQuestion,
  selectCorrectQuestion,
  selectWrongQuestion,
} from 'store/slices/gameSlice';
import UsersTopBar from './components/UsersTopBar';
import FullScreenSpinner from 'components/modals/FullScreenSpinner';
import { registerAnswer } from 'store/slices/dataSlice';
import RateQuestionBar from './components/RateQuestionBar';
import QuestionCountdown from './components/QuestionCountdown';
import API from 'services/api';

const startingUsersByAnswer = {
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
};

export const answersArray: CorrectAnswer[] = [
  'answer1',
  'answer2',
  'answer3',
  'answer4',
];

const QuestionScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Question'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);
  const countdownInterval = useRef(null);
  const { userData } = useAppSelector(state => state.data);
  const {
    questions,
    activeRoom,
    type,
    selectedAnswers,
    onQuestion,
    leagueId,
    leagueType,
  } = useAppSelector((state: RootState) => state.game);
  const IS_LEAGUE_GAME = !!leagueId;
  const youAreAdmin = activeRoom.userId === userData.id;

  const isBrawlGame = type === 'brawl';
  const isClassicGame = type === 'classic';
  const nextQuestionTimeout = isBrawlGame ? 2000 : 0;

  const { answerTime, id: roomId, users, topic } = activeRoom || {};
  const isAdminLeagueGame = IS_LEAGUE_GAME && leagueType === 'ADMIN';

  const currentQuestion: Question = questions[onQuestion];
  const {
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
    question,
    image,
    id,
  } = currentQuestion || {};

  const [secondsLeft, setSecondsLeft] = useState(answerTime);
  const [wrongUsers, setWrongUsers] = useState<number[]>([]);
  const [correctUser, setCorrectUser] = useState(0);
  const [liked, setLiked] = useState<undefined | boolean>(undefined);

  const [userNameByAnswer, setUserNameByAnswer] = useState<
    Record<CorrectAnswer, string>
  >(startingUsersByAnswer);

  const isSelected = (answer: CorrectAnswer) =>
    selectedAnswers.includes(answer);

  const correctAnswerGuessed = isSelected(correctAnswer);
  const allUsersGuessed = wrongUsers?.length === users?.length;

  const answeringDisabled =
    allUsersGuessed ||
    correctAnswerGuessed ||
    secondsLeft < 1 ||
    wrongUsers.some(id => id === userData.id);

  const isLastQuestion = questions.length <= onQuestion + 1;
  const lastQuestionBugCheck = onQuestion > questions.length - 1 || !question;

  const nextQuestion = () => {
    setUserNameByAnswer(startingUsersByAnswer);
    clearCountdownInterval();

    setTimeout(() => {
      if (isClassicGame) {
        setLiked(undefined);
      }
      if (isLastQuestion) {
        goToResults();
      } else {
        dispatch(goToNextQuestion());
        setWrongUsers([]);
        setCorrectUser(-1);
      }
    }, nextQuestionTimeout);
  };

  const goToResults = () => {
    setTimeout(() => {
      clearCountdownInterval();
      navigation.navigate('Results', { leagueId });
    }, nextQuestionTimeout);
  };

  const handleWrongAnswer = ({ answer, userId }: SelectedAnswerPayload) => {
    if (isClassicGame) clearCountdownInterval();
    if (selectedAnswers.includes(answer)) return;

    dispatch(selectWrongQuestion({ answer, userId }));
    setWrongUsers(prevState => prevState.concat([userId]));
    setUserNameForAnswer(answer, userId);
  };

  useEffect(() => {
    const allUsersHaveAnsweredWrong = isAdminLeagueGame
      ? wrongUsers.length + 1 === users.length
      : wrongUsers.length === users.length;

    if (allUsersHaveAnsweredWrong && isBrawlGame) nextQuestion();
  }, [wrongUsers.length]);

  const handleCorrectAnswer = ({ answer, userId }: SelectedAnswerPayload) => {
    if (isClassicGame) clearCountdownInterval();
    if (selectedAnswers.includes(answer)) return;

    dispatch(selectCorrectQuestion({ answer, userId }));
    setCorrectUser(userId);
    setUserNameForAnswer(answer, userId);
    if (isBrawlGame) nextQuestion();
  };

  const setUserNameForAnswer = (answer: CorrectAnswer, userId: number) => {
    setUserNameByAnswer(prevState => {
      let updatedState = prevState;
      updatedState[answer] = users.find(u => u.id === userId)
        ?.firstName as string;

      return updatedState;
    });
  };

  useEffect(() => {
    if (isBrawlGame) {
      SOCKET.on(SOCKET_EVENTS.WRONG_ANSWER_SELECTED, handleWrongAnswer);
      SOCKET.on(SOCKET_EVENTS.CORRECT_ANSWER_SELECTED, handleCorrectAnswer);
    }
  }, []);

  const clearCountdownInterval = () => {
    clearInterval(countdownInterval?.current);
    setSecondsLeft(answerTime);
  };

  useEffect(() => {
    if (onQuestion < 0) return;
    if (lastQuestionBugCheck) {
      goToResults();
      return;
    }

    countdownInterval.current = setInterval(() => {
      setSecondsLeft(prevState => {
        if (prevState === 0) {
          if (isBrawlGame) nextQuestion();
        }
        return prevState - 1;
      });
    }, 1000);

    return () => {
      clearCountdownInterval();
    };
  }, [onQuestion]);

  const onPressNext = () => {
    nextQuestion();
  };

  const onSelectAnswer = (answer: CorrectAnswer) => {
    if (isBrawlGame) {
      const payload = {
        answer,
        userId: userData.id,
        roomId,
        topic,
        ...(IS_LEAGUE_GAME && { leagueId }),
      };

      if (answer === correctAnswer) {
        if (IS_LEAGUE_GAME) API.registerLeagueAnswer(leagueId, true);
        SOCKET.emit(SOCKET_EVENTS.CORRECT_ANSWER_SELECTED, payload);
      } else {
        if (IS_LEAGUE_GAME) API.registerLeagueAnswer(leagueId, false);
        SOCKET.emit(SOCKET_EVENTS.WRONG_ANSWER_SELECTED, payload);
      }
    } else if (type === 'classic') {
      const payload = { answer, userId: userData.id };
      if (answer === correctAnswer) {
        // in brawl games, these stats are updated by events
        handleCorrectAnswer(payload);
        API.registerAnswer(true, topic);
      } else {
        handleWrongAnswer(payload);
        API.registerAnswer(false, topic);
      }
    }

    dispatch(
      registerAnswer({
        correct: answer === correctAnswer,
        topic,
      }),
    );
  };

  const answerStatus = (answer: CorrectAnswer) =>
    correctAnswer === answer && correctAnswerGuessed
      ? 'correct'
      : isSelected(answer)
      ? 'wrong'
      : 'regular';

  if (lastQuestionBugCheck) return <FullScreenSpinner />;

  const onRate = (like: boolean) => {
    setLiked(like);
    API.likeQuestion(id, like);
  };

  return (
    <ScreenWrapper style={{ paddingTop: AN(30) }}>
      <>
        <View>
          {isBrawlGame ? (
            <UsersTopBar wrongUsers={wrongUsers} correctUser={correctUser} />
          ) : (
            <></>
          )}
          <QuestionCountdown
            allUSersGuessed={allUsersGuessed}
            correctUser={correctUser}
            isClassicGame={isClassicGame}
            secondsLeft={secondsLeft}
            correctAnswerGuessed={correctAnswerGuessed}
          />
          <TileWrapper style={styles.questionTile}>
            <BodyMedium text={question} style={{ textAlign: 'center' }} />
          </TileWrapper>
          {answersArray.map((a: CorrectAnswer, index: number) => (
            <AnswerTile
              disabled={
                answeringDisabled ||
                isSelected(a) ||
                (IS_LEAGUE_GAME && youAreAdmin)
              }
              status={answerStatus(a)}
              title={
                index === 0
                  ? answer1
                  : index === 1
                  ? answer2
                  : index === 2
                  ? answer3
                  : answer4
              }
              onPress={() => {
                onSelectAnswer(a);
              }}
              userName={userNameByAnswer[a]}
            />
          ))}
        </View>
        {type === 'classic' ? (
          <>
            {liked === undefined ? <RateQuestionBar onRate={onRate} /> : <></>}
            <CTA
              title="Next"
              onPress={onPressNext}
              style={styles.nextQuestionCta}
            />
          </>
        ) : (
          <></>
        )}
      </>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    questionTile: {
      minHeight: AN(100),
      justifyContent: 'center',
      padding: AN(20),
      marginVertical: AN(20),
    },
    nextQuestionCta: {
      position: 'absolute',
      bottom: AN(20),
      alignSelf: 'center',
    },
  });

export default QuestionScreen;
