import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import UserTile from 'components/tiles/UserTile/UserTile';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
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
  const dispatch = useDispatch();
  const { activeRoom, score, answers } = useAppSelector(state => state.game);

  const { users } = activeRoom || {};

  const renderUser = ({ item }: { item: UserData }) => (
    <UserTile user={item} score={String(score[item.id]) || '0'} />
  );

  const goToRoom = () => {
    navigation.navigate('ArenaRoom', { room: activeRoom });
  };

  useEffect(() => {
    SOCKET.off(SOCKET_EVENTS.CORRECT_ANSWER_SELECTED);
    SOCKET.off(SOCKET_EVENTS.WRONG_ANSWER_SELECTED);
    if (!__DEV__) API.updateQuestionStats(answers);

    return () => {
      dispatch(finishGame());
    };
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
        data={users}
        renderItem={renderUser}
        keyExtractor={item => item.id + 'user_results'}
      />
      <CTA title="Go to room" onPress={goToRoom} />
    </ScreenWrapper>
  );
};

export default ResultsScreen;
