import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import NavHeader from 'components/layout/NavHeader';
import UserTile from 'components/tiles/UserTile/UserTile';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { removeFriend } from 'store/slices/dataSlice';

const FriendScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Friend'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const {
    avatar,
    accuracyPercentage,
    color,
    createdAt,
    firstName,
    friends,
    isPremium,
    lastName,
    level,
    rank,
    trophies,
    id,
  } = route.params || {};

  const renderFriend = ({ item }) => <UserTile user={item} />;

  const deleteFriend = () => {
    dispatch(removeFriend(route.params));
    API.removeFriend(id as number);
    navigation.navigate('Friends');
    SOCKET.emit(SOCKET_EVENTS);
  };

  return (
    <ScreenWrapper>
      <NavHeader />
      <GhostButton onPress={deleteFriend} title="Delete" />
    </ScreenWrapper>
  );
};

export default FriendScreen;
