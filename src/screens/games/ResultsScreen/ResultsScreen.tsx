import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import UserTile from 'components/tiles/UserTile/UserTile';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { FlatList } from 'react-native';
import { useAppSelector } from 'store/index';
import { UserData } from 'store/types/authSliceTypes';

const ResultsScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Results'>
> = ({ navigation }) => {
  const { activeRoom, score } = useAppSelector(state => state.game);

  const { users } = activeRoom || {};

  const goBackToRoom = () => {};

  const renderUser = ({ item }: { item: UserData }) => (
    <UserTile user={item} score={score[item.id] || 0} />
  );

  const goToRoom = () => {
    navigation.navigate('ArenaRoom', { room: activeRoom });
  };

  return (
    <ScreenWrapper>
      <NavHeader
        title="Results"
        showLeftIcon={false}
        onPressRightIcon={goBackToRoom}
        style={{ marginBottom: AN(24) }}
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
