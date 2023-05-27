import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import MyImage from 'components/icons/MyImage';
import NavHeader from 'components/layout/NavHeader';
import UserTile from 'components/tiles/UserTile/UserTile';
import BodyLarge from 'components/typography/BodyLarge';
import Title from 'components/typography/Title';
import { LOBBY_IDS } from 'constants/constants';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import usePreventNativeBackButton from 'navigation/hooks/usePreventNativeBack';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import {
  registerDailyResult,
  storeReward,
  updateMoneyBalance,
  updateTrophies,
} from 'store/slices/dataSlice';
import { finishGame } from 'store/slices/gameSlice';
import { UserData } from 'store/types/authSliceTypes';

const ResultsScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Results'>
> = ({ navigation }) => {
  const { styles, colors } = useStyles(createStyles);
  usePreventNativeBackButton();
  const dispatch = useDispatch();
  const { id } = useAppSelector(state => state.data.userData);
  const { activeRoom, score, answers, type, selectedAnswers } =
    useAppSelector(state => state.game) || {};
  const { users, bet } = activeRoom || [];

  const [rewardOpacity] = useState(new Animated.Value(0));
  const [rewardTranslateY] = useState(new Animated.Value(0));
  const [reward, setReward] = useState('0');

  const displayReward = () => {
    Animated.sequence([
      Animated.spring(rewardOpacity, {
        toValue: 1,
        useNativeDriver: true,
        delay: 250,
      }),
      Animated.spring(rewardTranslateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        delay: 800,
      }),
    ]).start();
  };

  const usersByScore =
    users?.slice().sort((a, b) => (score[a.id] <= score[b.id] ? 1 : -1)) ||
    users;

  const isArenaGame = activeRoom.lobbyId === LOBBY_IDS.ARENA;
  const isSoloGame = activeRoom.lobbyId === LOBBY_IDS.SOLO;
  const myScore = score[id];
  const myAccuracy = ((myScore * 100) / activeRoom.questionsCount).toFixed(2);
  const perfectScore = myAccuracy === '100.00';

  const renderUser = ({ item }: { item: UserData }) => (
    <UserTile user={item} score={String(score[item.id]) || '0'} />
  );

  const goToRoom = () => {
    navigation.navigate('Room', { room: activeRoom });
    dispatch(finishGame());
  };

  const goToLobby = () => {
    console.log('here');
    navigation.navigate('Lobby', { lobbyId: activeRoom.lobbyId });
    dispatch(finishGame());
  };

  const submitScoreAndGetReward = async () => {
    if (isArenaGame) {
      const myRewardInTrophies = await API.registerArenaGameScore(score);
      setReward(String(myRewardInTrophies));

      dispatch(updateTrophies(myRewardInTrophies));
    } else if (isSoloGame) {
      const { money, reward } = await API.registerDailyScore(
        activeRoom.id,
        myScore,
      );

      setReward(String(money));
      dispatch(updateMoneyBalance(money));
      dispatch(registerDailyResult({ id: activeRoom.id, score: myScore }));

      if (reward) {
        dispatch(storeReward(reward));
      }
    }

    displayReward();
  };

  useEffect(() => {
    submitScoreAndGetReward();

    if (isArenaGame) {
      API.registerArenaGameScore(score);
      SOCKET.emit(SOCKET_EVENTS.GAME_ENDED, activeRoom);
      SOCKET.off(SOCKET_EVENTS.CORRECT_ANSWER_SELECTED);
      SOCKET.off(SOCKET_EVENTS.WRONG_ANSWER_SELECTED);
    }

    API.updateQuestionStats(answers);
  }, []);

  return (
    <ScreenWrapper>
      <NavHeader
        title="Results"
        showLeftIcon={false}
        showRightIcon={false}
        style={{ marginBottom: AN(24) }}
        fullWidth
      />
      {isArenaGame ? (
        <FlatList
          data={usersByScore}
          renderItem={renderUser}
          keyExtractor={item => item.id + 'user_results'}
        />
      ) : (
        <>
          <Title
            text={`${String(myScore)} / ${String(activeRoom.questionsCount)}`}
            style={{
              textAlign: 'center',
              fontSize: AN(50),
              lineHeight: AN(50),
              marginTop: AN(30),
            }}
          />
          <BodyLarge
            text={myAccuracy + '%'}
            style={{
              textAlign: 'center',
              marginTop: AN(10),
              marginBottom: AN(20),
            }}
          />
        </>
      )}
      <CTA
        title={isArenaGame ? 'Go to room' : 'Go to lobby'}
        onPress={isArenaGame ? goToRoom : goToLobby}
      />
      <Animated.View
        style={{
          transform: [{ translateY: rewardTranslateY }],
          opacity: rewardOpacity,
          ...styles.trophyContainer,
        }}>
        <MyImage
          name={isArenaGame ? 'trophy' : 'money'}
          style={styles.trophy}
        />
        <Title color="warning400" text={reward} />
      </Animated.View>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    trophyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      alignSelf: 'center',
      margin: 'auto',
    },
    trophy: {
      width: SCREEN_WIDTH * 0.4,
      aspectRatio: 1,
      marginTop: SCREEN_HEIGHT * 0.2,
    },
  });

export default ResultsScreen;
