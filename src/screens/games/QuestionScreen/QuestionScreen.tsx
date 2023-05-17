import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import AnswerTile from 'components/tiles/AnswerTile';
import BodyLarge from 'components/typography/BodyLarge';
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
import { useAppSelector } from 'store/index';
import {
  SelectedAnswerPayload,
  goToNextQuestion,
  selectCorrectQuestion,
  selectWrongQuestion,
} from 'store/slices/gameSlice';
import UsersTopBar from './components/UsersTopBar';
import FullScreenSpinner from 'components/modals/FullScreenSpinner';

const nextQuestionTimeout = 2000;

const startingUsersByAnswer = {
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
};

const QuestionScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Question'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);
  const countdownInterval = useRef(null);
  const { userData } = useAppSelector(state => state.data);
  const { questions, activeRoom, type, selectedAnswers, onQuestion } =
    useAppSelector(state => state.game);

  const { answerTime, id: roomId, users } = activeRoom || {};

  const currentQuestion: Question = questions[onQuestion];
  const { answer1, answer2, answer3, answer4, correctAnswer, question, image } =
    currentQuestion || {};

  const [secondsLeft, setSecondsLeft] = useState(answerTime);
  const [wrongUsers, setWrongUsers] = useState<number[]>([]);
  const [correctUser, setCorrectUser] = useState(0);

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
      navigation.navigate('Results');
    }, nextQuestionTimeout);
  };

  const handleWrongAnswer = ({ answer, userId }: SelectedAnswerPayload) => {
    if (selectedAnswers.includes(answer)) return;

    if (type === 'brawl') {
      dispatch(selectWrongQuestion({ answer, userId }));
      setWrongUsers(prevState => prevState.concat([userId]));
      setUserNameForAnswer(answer, userId);
    }
  };

  useEffect(() => {
    const allUsersHaveAnsweredWrong =
      wrongUsers.length === activeRoom.users.length;

    if (allUsersHaveAnsweredWrong) nextQuestion();
  }, [wrongUsers.length]);

  const handleCorrectAnswer = ({ answer, userId }: SelectedAnswerPayload) => {
    if (selectedAnswers.includes(answer)) return;

    if (type === 'brawl') {
      dispatch(selectCorrectQuestion({ answer, userId }));
      setCorrectUser(userId);
      setUserNameForAnswer(answer, userId);
      nextQuestion();
    }
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
    SOCKET.on(SOCKET_EVENTS.WRONG_ANSWER_SELECTED, handleWrongAnswer);

    SOCKET.on(SOCKET_EVENTS.CORRECT_ANSWER_SELECTED, handleCorrectAnswer);
  }, []);

  const clearCountdownInterval = () => {
    clearInterval(countdownInterval?.current);
    setSecondsLeft(15);
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
          if (type === 'brawl') {
            nextQuestion();
          }
        }
        return prevState - 1;
      });
    }, 1000);

    return () => {
      clearCountdownInterval();
    };
  }, [onQuestion]);

  const onPressNext = () => {};

  const onSelectAnswer = (answer: CorrectAnswer) => {
    const payload = {
      answer,
      userId: userData.id,
      roomId,
    };

    if (answer === correctAnswer) {
      SOCKET.emit(SOCKET_EVENTS.CORRECT_ANSWER_SELECTED, payload);
    } else {
      SOCKET.emit(SOCKET_EVENTS.WRONG_ANSWER_SELECTED, payload);
    }
  };

  const countdownColor =
    secondsLeft <= 3 || allUsersGuessed
      ? 'danger500'
      : correctUser
      ? 'brand500'
      : 'neutral200';

  const answerStatus = (answer: CorrectAnswer) =>
    correctAnswer === answer && correctAnswerGuessed
      ? 'correct'
      : isSelected(answer)
      ? 'wrong'
      : 'regular';

  const renderCountdown = () => {
    const text = () => {
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

  if (lastQuestionBugCheck) return <FullScreenSpinner />;

  return (
    <ScreenWrapper style={{ paddingTop: AN(30) }}>
      <>
        <View>
          <UsersTopBar wrongUsers={wrongUsers} correctUser={correctUser} />
          {renderCountdown()}
          <TileWrapper style={styles.questionTile}>
            <BodyMedium text={question} style={{ textAlign: 'center' }} />
          </TileWrapper>
          <AnswerTile
            disabled={answeringDisabled || isSelected('answer1')}
            status={answerStatus('answer1')}
            title={answer1}
            onPress={() => {
              onSelectAnswer('answer1');
            }}
            userName={userNameByAnswer['answer1']}
          />
          <AnswerTile
            title={answer2}
            status={answerStatus('answer2')}
            disabled={answeringDisabled || isSelected('answer2')}
            onPress={() => {
              onSelectAnswer('answer2');
            }}
            userName={userNameByAnswer['answer2']}
          />
          <AnswerTile
            title={answer3}
            status={answerStatus('answer3')}
            disabled={answeringDisabled || isSelected('answer3')}
            onPress={() => {
              onSelectAnswer('answer3');
            }}
            userName={userNameByAnswer['answer3']}
          />
          <AnswerTile
            title={answer4}
            status={answerStatus('answer4') || isSelected('answer4')}
            disabled={answeringDisabled}
            onPress={() => {
              onSelectAnswer('answer4');
            }}
            userName={userNameByAnswer['answer4']}
          />
        </View>
        {type !== 'brawl' ? (
          <CTA
            title="Next"
            onPress={onPressNext}
            style={{ marginTop: AN(30) }}
          />
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
  });

export default QuestionScreen;
