import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import UserTile from 'components/tiles/UserTile/UserTile';
import { LOBBY_IDS } from 'constants/constants';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import usePreventNativeBackButton from 'navigation/hooks/usePreventNativeBack';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
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

  useEffect(() => {
    SOCKET.off(SOCKET_EVENTS.CORRECT_ANSWER_SELECTED);
    SOCKET.off(SOCKET_EVENTS.WRONG_ANSWER_SELECTED);
    if (isArenaGame) API.registerArenaGameScore(score);
    // API.updateQuestionStats(answers);
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
    </ScreenWrapper>
  );
};

export default ResultsScreen;
