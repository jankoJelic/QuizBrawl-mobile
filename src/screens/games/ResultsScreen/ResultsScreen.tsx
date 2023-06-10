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
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import usePreventNativeBackButton from 'navigation/hooks/usePreventNativeBack';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
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
import { Reward, UserData } from 'store/types/authSliceTypes';

const ResultsScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Results'>
> = ({ navigation, route }) => {
  usePreventNativeBackButton();
  const { leagueId } = route.params || {};
  const { styles } = useStyles(createStyles);
  const dispatch = useDispatch();
  const { id } = useAppSelector(state => state.data.userData);
  const { activeRoom, score, answers } =
    useAppSelector(state => state.game) || {};
  const { users, bet, maxPlayers } = activeRoom || [];
  const youAreQuizAdmin = activeRoom.userId === id;

  const isMultiPlayerGame = maxPlayers > 1;

  const [rewardOpacity] = useState(new Animated.Value(0));
  const [rewardTranslateY] = useState(new Animated.Value(0));
  const [reward, setReward] = useState('0');
  const [specialReward, setSpecialReward] = useState<Reward>();

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
  const isCashGame = !!bet;
  const isLeagueGame = !!leagueId;

  const renderUser = ({ item }: { item: UserData }) => (
    <UserTile user={item} score={String(score[item.id]) || '0'} />
  );

  const goToRoom = async () => {
    if (isLeagueGame) {
      const league = await API.getLeague(leagueId);
      navigation.navigate('League', { league });
    } else {
      navigation.navigate('Room', { room: activeRoom });
    }
    dispatch(finishGame());
  };

  const goToLobby = () => {
    navigation.navigate('Lobby', { lobbyId: activeRoom.lobbyId });
    dispatch(finishGame());
  };

  const submitArenaGameScore = async () => {
    const myRewardInTrophies = await API.registerArenaGameScore(score);
    setReward(String(myRewardInTrophies));

    dispatch(updateTrophies(myRewardInTrophies));
  };

  const handleReward = (reward: Reward) => {
    dispatch(storeReward(reward));
    setSpecialReward(reward);
  };

  const submitSoloGameScore = async () => {
    const { money, reward } = await API.registerDailyScore(
      activeRoom.id,
      myScore,
    );

    setReward(String(money));
    dispatch(updateMoneyBalance(money));
    dispatch(registerDailyResult({ id: activeRoom.id, score: myScore }));

    if (!!reward) handleReward(reward);
  };

  const submitCashGameScore = async () => {
    const { money, reward } = await API.registerCashGameScore(
      activeRoom.id,
      score,
    );

    setReward(String(money));
    dispatch(updateMoneyBalance(money));

    if (!!reward) handleReward(reward);
  };

  const submitLeagueScore = async () => {
    if (!leagueId) return;
    if (activeRoom.userId === id) return;
    const reward = await API.submitLeagueScore(leagueId, score, activeRoom.id);
    setReward(String(reward));
  };

  const submitScoreAndGetReward = async () => {
    if (isArenaGame) {
      await submitArenaGameScore();
    } else if (isSoloGame) {
      await submitSoloGameScore();
    } else if (isCashGame) {
      await submitCashGameScore();
    } else if (isLeagueGame) {
      await submitLeagueScore();
    }

    displayReward();
  };

  useEffect(() => {
    submitScoreAndGetReward();

    if (isMultiPlayerGame) {
      if (!leagueId) SOCKET.emit(SOCKET_EVENTS.GAME_ENDED, activeRoom);
      SOCKET.off(SOCKET_EVENTS.CORRECT_ANSWER_SELECTED);
      SOCKET.off(SOCKET_EVENTS.WRONG_ANSWER_SELECTED);
    }

    if (!isLeagueGame) API.updateQuestionStats(answers);
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
      {isMultiPlayerGame || isLeagueGame ? (
        <FlatList
          data={
            isLeagueGame
              ? usersByScore?.filter(u => u.id !== activeRoom.userId)
              : usersByScore
          }
          renderItem={renderUser}
          keyExtractor={item => item.id + 'user_results'}
        />
      ) : (
        <>
          <Title
            text={`${String(myScore)} / ${String(activeRoom.questionsCount)}`}
            style={styles.score}
          />
          <BodyLarge text={myAccuracy + '%'} style={styles.accuracy} />
        </>
      )}
      {!!specialReward ? (
        <View style={{ alignItems: 'center' }}>
          <FastImage
            source={{ uri: specialReward.payload }}
            style={{ width: SCREEN_WIDTH * 0.6, aspectRatio: 1 }}
          />
          <BodyLarge
            text="Congrats!"
            style={{ textAlign: 'center', marginTop: AN(20) }}
            weight="bold"
          />
          <BodyLarge
            style={{ textAlign: 'center', marginVertical: AN(10) }}
            text={`Your knowledge in ${activeRoom.topic.toLowerCase()} has won you a cool avatar to show off!`}
          />
        </View>
      ) : (
        <></>
      )}
      <CTA
        title={isMultiPlayerGame ? 'Go to room' : 'Go to lobby'}
        onPress={isMultiPlayerGame ? goToRoom : goToLobby}
      />
      <Animated.View
        style={{
          transform: [{ translateY: rewardTranslateY }],
          opacity: rewardOpacity,
          ...styles.trophyContainer,
        }}>
        {isLeagueGame ? (
          <></>
        ) : (
          <MyImage
            name={isArenaGame ? 'trophy' : 'money'}
            style={styles.trophy}
          />
        )}
        {youAreQuizAdmin && isLeagueGame ? (
          <></>
        ) : (
          <TileWrapper
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              ...(isLeagueGame && { top: SCREEN_HEIGHT / 2 }),
            }}>
            <Title
              color="warning400"
              text={`${reward}${isLeagueGame ? ' points' : ''}`}
            />
          </TileWrapper>
        )}
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
    score: {
      textAlign: 'center',
      fontSize: AN(50),
      lineHeight: AN(50),
      marginTop: AN(30),
    },
    accuracy: {
      textAlign: 'center',
      marginTop: AN(10),
      marginBottom: AN(20),
    },
  });

export default ResultsScreen;
