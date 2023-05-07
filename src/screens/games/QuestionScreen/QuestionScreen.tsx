import CTA from 'components/buttons/CTA';
import UserAvatar from 'components/icons/UserAvatar';
import AnswerTile from 'components/tiles/AnswerTile';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS, SCREEN_WIDTH } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, View } from 'react-native';
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
import { UserData } from 'store/types/authSliceTypes';

const QuestionScreen = () => {
  const dispatch = useDispatch();
  const { colors, styles } = useStyles(createStyles);
  const countdownInterval = useRef(null);
  const { userData } = useAppSelector(state => state.data);
  const { questions, onQuestion, score, activeRoom, type, selectedAnswers } =
    useAppSelector(state => state.game);

  const { answerTime, id: roomId } = activeRoom || {};

  const currentQuestion: Question = questions[onQuestion];
  const { answer1, answer2, answer3, answer4, correctAnswer, question, image } =
    currentQuestion || {};

  const [secondsLeft, setSecondsLeft] = useState(answerTime);
  const [wrongUsers, setWrongUsers] = useState<number[]>([]);
  const [correctUser, setCorrectUser] = useState(0);

  const correctAnswerGuessed = selectedAnswers.includes(correctAnswer);

  useEffect(() => {
    SOCKET.on(
      SOCKET_EVENTS.WRONG_ANSWER_SELECTED,
      ({ answer, userId }: SelectedAnswerPayload) => {
        if (type === 'brawl') {
          dispatch(selectWrongQuestion({ answer, userId }));
          setWrongUsers(prevState => prevState.concat([userId]));
        }
      },
    );

    SOCKET.on(
      SOCKET_EVENTS.CORRECT_ANSWER_SELECTED,
      ({ answer, userId }: SelectedAnswerPayload) => {
        if (type === 'brawl') {
          dispatch(selectCorrectQuestion({ answer, userId }));
          setCorrectUser(userId);
          clearCountdownInterval();

          setTimeout(() => {
            dispatch(goToNextQuestion());
            setWrongUsers([]);
            setCorrectUser(-1);
          }, 2000);
        }
      },
    );
  }, []);

  const clearCountdownInterval = () => {
    clearInterval(countdownInterval.current);
    setSecondsLeft(15);
  };

  useEffect(() => {
    countdownInterval.current = setInterval(() => {
      setSecondsLeft(prevState => {
        if (prevState === 0) {
          if (type === 'brawl') {
          }
        }
        return prevState - 1;
      });
    }, 1000);

    return () => {
      clearCountdownInterval();
    };
  }, []);

  const renderUser = ({ item }: { item: UserData }) => {
    const borderColor = () => {
      if (wrongUsers.includes(item.id)) {
        return colors.danger500;
      } else if (correctUser === item.id) {
        return colors.brand500;
      } else {
        return colors.tileBackground;
      }
    };

    return (
      <View
        style={{
          ...styles.userTile,
          width: SCREEN_WIDTH / (activeRoom.users.length + 2),
          borderColor: borderColor(),
        }}>
        <UserAvatar size={AN(20)} avatar={item.avatar} />
        <BodySmall text={item.firstName} style={{ marginTop: AN(2) }} />
        <BodySmall text={String(score[item.id])} />
      </View>
    );
  };

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

  const countdownColor = secondsLeft <= 3 ? 'danger500' : 'neutral200';

  const answerStatus = (answer: CorrectAnswer) =>
    correctAnswer === answer && correctAnswerGuessed
      ? 'correct'
      : selectedAnswers.includes(answer)
      ? 'wrong'
      : 'regular';

  const renderCountdown = () => {
    const text = () => {
      if (correctAnswerGuessed) {
        return `Well done ${
          activeRoom.users.find(u => correctUser === u.id)?.firstName
        }!`;
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

  return (
    <ScreenWrapper style={{ paddingTop: AN(30) }}>
      <View>
        <FlatList
          data={activeRoom.users}
          renderItem={renderUser}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.id + 'player' + String(index)}
          contentContainerStyle={styles.usersList}
        />
        {secondsLeft < answerTime && secondsLeft > 0 && (
          <BodyLarge
            text={String(secondsLeft)}
            style={{ textAlign: 'center', marginVertical: AN(12) }}
            color={countdownColor}
          />
        )}
        <TileWrapper style={styles.questionTile}>
          <BodyMedium
            text={currentQuestion?.question}
            style={{ textAlign: 'center' }}
          />
        </TileWrapper>
        <AnswerTile
          disabled={correctAnswerGuessed}
          status={answerStatus('answer1')}
          title={answer1}
          onPress={() => {
            onSelectAnswer('answer1');
          }}
        />
        <AnswerTile
          title={answer2}
          status={answerStatus('answer2')}
          disabled={correctAnswerGuessed}
          onPress={() => {
            onSelectAnswer('answer2');
          }}
        />
        <AnswerTile
          title={answer3}
          status={answerStatus('answer3')}
          disabled={correctAnswerGuessed}
          onPress={() => {
            onSelectAnswer('answer3');
          }}
        />
        <AnswerTile
          title={answer4}
          status={answerStatus('answer4')}
          disabled={correctAnswerGuessed}
          onPress={() => {
            onSelectAnswer('answer4');
          }}
        />
      </View>
      {type !== 'brawl' ? (
        <CTA title="Next" onPress={onPressNext} style={{ marginTop: AN(30) }} />
      ) : (
        <></>
      )}
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    userTile: {
      borderRadius: BORDER_RADIUS,
      alignItems: 'center',
      borderWidth: AN(1),
      padding: AN(10),
      justifyContent: 'center',
    },
    usersList: {
      minWidth: SCREEN_WIDTH * 0.9,
      flexGrow: 1,
      justifyContent: 'space-evenly',
      height: AN(70),
    },
    questionTile: {
      minHeight: AN(100),
      justifyContent: 'center',
      padding: AN(20),
      marginVertical: AN(20),
    },
  });

export default QuestionScreen;
