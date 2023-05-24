import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import UserTile from 'components/tiles/UserTile/UserTile';
import Title from 'components/typography/Title';
import { LOBBY_IDS } from 'constants/constants';
import { AN, SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import usePreventNativeBackButton from 'navigation/hooks/usePreventNativeBack';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { updateTrophies } from 'store/slices/dataSlice';
import { finishGame } from 'store/slices/gameSlice';
import { UserData } from 'store/types/authSliceTypes';

const ResultsScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Results'>
> = ({ navigation }) => {
  usePreventNativeBackButton();
  const dispatch = useDispatch();
  const { activeRoom, score, answers, type, selectedAnswers } =
    useAppSelector(state => state.game) || {};
  const { users } = activeRoom || [];

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

  const isArenaGame = activeRoom.lobby.id === LOBBY_IDS.ARENA;

  const renderUser = ({ item }: { item: UserData }) => (
    <UserTile user={item} score={String(score[item.id]) || '0'} />
  );

  const goToRoom = () => {
    navigation.navigate('Room', { room: activeRoom });
    dispatch(finishGame());
  };

  const submitScoreAndGetReward = async () => {
    const myRewardInTrophies = await API.registerArenaGameScore(score);
    setReward(String(myRewardInTrophies));
    displayReward();
    dispatch(updateTrophies(myRewardInTrophies));
  };

  useEffect(() => {
    submitScoreAndGetReward();
    if (isArenaGame) API.registerArenaGameScore(score);
    SOCKET.off(SOCKET_EVENTS.CORRECT_ANSWER_SELECTED);
    SOCKET.off(SOCKET_EVENTS.WRONG_ANSWER_SELECTED);
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
      <FlatList
        data={usersByScore}
        renderItem={renderUser}
        keyExtractor={item => item.id + 'user_results'}
      />
      <CTA title="Go to room" onPress={goToRoom} />
      <Animated.View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          margin: 'auto',
          transform: [{ translateY: rewardTranslateY }],
          opacity: rewardOpacity,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FastImage
          source={require('../../../assets/icons/trophy.png')}
          style={{
            width: SCREEN_WIDTH * 0.4,
            aspectRatio: 1,
            marginTop: SCREEN_HEIGHT * 0.2,
          }}
        />
        <Title color="warning400" text={reward} />
      </Animated.View>
    </ScreenWrapper>
  );
};

export default ResultsScreen;
