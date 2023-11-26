import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import AnswerTile from 'components/tiles/AnswerTile';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT } from 'constants/styles/appStyles';
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
import FastImage from 'react-native-fast-image';
import { getFirebaseImageUrl } from 'services/firebaseStorage/firebaseStorage';
import { playSound } from 'services/sounds/soundPlayer';
import selectRandomFromArray from 'util/array/selectRandomFromArray';
import { shuffleArray } from 'util/array/shuffleArray';

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
  const { questions, activeRoom, type, selectedAnswers, onQuestion, leagueId } =
    useAppSelector((state: RootState) => state.game);
  const IS_LEAGUE_GAME = !!leagueId;

  const isBrawlGame = type === 'brawl';
  const isClassicGame = type === 'classic';
  const nextQuestionTimeout = isBrawlGame ? 2000 : 0;

  const {
    answerTime,
    id: roomId,
    users,
    topic,
    userId,
    questionsCount,
  } = activeRoom || {};
  const youAreAdmin = userId === userData.id;
  const isBotGame = users.some(u => u.isBot);

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
  const [imageUrl, setImageUrl] = useState('');
  const [liked, setLiked] = useState<undefined | boolean>(undefined);
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);

  const [userNameByAnswer, setUserNameByAnswer] = useState<
    Record<CorrectAnswer, string>
  >(startingUsersByAnswer);

  const isSelected = (answer: CorrectAnswer) =>
    selectedAnswers.includes(answer);

  const correctAnswerGuessed = isSelected(correctAnswer);
  const allUsersGuessed = IS_LEAGUE_GAME
    ? wrongUsers?.length === users?.length - 1
    : wrongUsers?.length === users?.length;

  const allUsersHaveAnsweredWrong = IS_LEAGUE_GAME
    ? wrongUsers?.length + 1 === users?.length
    : wrongUsers?.length === users?.length;

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
      setCorrectAnswerShown(false);
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
    playSound('error');
    if (isClassicGame) clearCountdownInterval();
    if (selectedAnswers.includes(answer)) return;

    dispatch(selectWrongQuestion({ answer, userId }));
    setWrongUsers(prevState => prevState.concat([userId]));
    setUserNameForAnswer(answer, userId);
  };

  useEffect(() => {
    if (
      allUsersHaveAnsweredWrong ||
      (!isClassicGame && !correctAnswerGuessed && !secondsLeft) ||
      (isClassicGame && (allUsersHaveAnsweredWrong || !secondsLeft))
    ) {
      setCorrectAnswerShown(true);
    }
  }, [allUsersHaveAnsweredWrong, correctAnswerGuessed, secondsLeft]);

  const [botAnswerTime, setBotAnswerTime] = useState<number[]>([]);
  useEffect(() => {
    const listOfAvailableSeconds = [];
    for (let i = 3; i < answerTime; i++) {
      listOfAvailableSeconds.push(i);
    }
    const numberOfBots = users.filter(u => u.isBot).length;
    const randomBotTimes = shuffleArray(listOfAvailableSeconds).slice(
      0,
      numberOfBots - 1,
    );
    setBotAnswerTime(randomBotTimes);
  }, []);

  useEffect(() => {
    if (botAnswerTime.includes(secondsLeft) && isBotGame) mockBotAnswer();
  }, [secondsLeft]);

  useEffect(() => {
    if (!!image && typeof image === 'string') {
      getFirebaseImageUrl(image).then(res => {
        setImageUrl(res);
      });
    }
  }, [onQuestion]);

  useEffect(() => {
    if (allUsersHaveAnsweredWrong && (isBrawlGame || IS_LEAGUE_GAME))
      nextQuestion();
  }, [wrongUsers.length]);

  const handleCorrectAnswer = ({ answer, userId }: SelectedAnswerPayload) => {
    playSound('success');
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
    // @ts-ignore
    clearInterval(countdownInterval?.current);
    setSecondsLeft(answerTime);
  };

  useEffect(() => {
    if (onQuestion < 0) return;
    if (lastQuestionBugCheck) {
      goToResults();
      return;
    }

    // @ts-ignore
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

  const mockBotAnswer = () => {
    const botIds = users.filter(u => u.isBot).map(u => u.id);
    const randomBotThatHasNotAnsweredId = selectRandomFromArray(
      botIds.filter(id => !wrongUsers.includes(id)),
    );
    const notSelectdAnswers = answersArray.filter(
      a => !selectedAnswers.some(ans => ans === a),
    );
    const randomAnswerThatHasNotBeenAnsweredYet =
      selectRandomFromArray(notSelectdAnswers);
    if (
      !randomBotThatHasNotAnsweredId ||
      !randomAnswerThatHasNotBeenAnsweredYet
    )
      return;
    sendBrawlAnswer({
      userId: randomBotThatHasNotAnsweredId,
      answer: randomAnswerThatHasNotBeenAnsweredYet,
    });
  };

  const sendBrawlAnswer = ({ userId, answer }: SendBrawlAnswerParams) => {
    const payload = {
      answer,
      userId,
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
  };

  const onSelectAnswer = (answer: CorrectAnswer) => {
    if (isBrawlGame) {
      sendBrawlAnswer({ userId: userData.id, answer });
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
    answer === correctAnswer && correctAnswerShown
      ? 'green'
      : correctAnswer === answer && correctAnswerGuessed
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
          <BodyMedium
            style={{ alignSelf: 'center' }}
            text={`${onQuestion + 1} / ${questionsCount}`}
          />
          <QuestionCountdown
            allUSersGuessed={allUsersGuessed}
            correctUser={correctUser}
            isClassicGame={isClassicGame}
            secondsLeft={secondsLeft}
            correctAnswerGuessed={correctAnswerGuessed}
          />
          <TileWrapper style={styles.questionTile}>
            <BodyMedium text={question} style={{ textAlign: 'center' }} />
            {imageUrl ? (
              <FastImage
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <></>
            )}
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
              userName={userNameByAnswer[a] || ''}
              key={`${a}${index}`}
            />
          ))}
          {youAreAdmin && IS_LEAGUE_GAME ? (
            <BodyMedium
              text="Spectator"
              color="warning500"
              style={{ textAlign: 'center', marginTop: AN(20) }}
            />
          ) : (
            <></>
          )}
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
    image: {
      width: '100%',
      marginTop: AN(10),
      height: SCREEN_HEIGHT * 0.22,
    },
  });

export default QuestionScreen;

interface SendBrawlAnswerParams {
  userId: number;
  answer: CorrectAnswer;
}
