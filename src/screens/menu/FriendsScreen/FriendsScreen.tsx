import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import UserTile from 'components/tiles/UserTile/UserTile';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { FlatList } from 'react-native';
import { useAppSelector } from 'store/index';

const FriendsScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Friends'>
> = () => {
  const { friends } = useAppSelector(state => state.data.userData);

  const renderFriend = ({ item }) => <UserTile user={item} />;

  return (
    <ScreenWrapper>
      <NavHeader title="Friends" fullWidth />
      <FlatList data={friends || []} renderItem={renderFriend} />
    </ScreenWrapper>
  );
};

export default FriendsScreen;
