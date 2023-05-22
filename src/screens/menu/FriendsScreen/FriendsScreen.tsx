import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import FullScreenSpinner from 'components/modals/FullScreenSpinner';
import UserTile from 'components/tiles/UserTile/UserTile';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { useAppSelector } from 'store/index';
import { setFriends } from 'store/slices/dataSlice';
import { ShallowUser, UserData } from 'store/types/authSliceTypes';

const FriendsScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Friends'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { friends, totalAnswers } = useAppSelector(
    state => state.data.userData,
  );
  const [isLoading, setIsLoading] = useState(false);

  const getFriendsInfo = async () => {
    try {
      const updatedFriends = await API.getFriends();
      dispatch(setFriends(updatedFriends));

      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getFriendsInfo();
  }, []);

  const renderFriend = ({ item }: { item: ShallowUser }) => {
    const onPressFriend = () => {
      navigation.navigate('Friend', item);
    };

    return <UserTile user={item as ShallowUser} onPress={onPressFriend} />;
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Friends" fullWidth />
      {isLoading ? (
        <FullScreenSpinner />
      ) : (
        <>
          <FlatList data={friends || []} renderItem={renderFriend} />
        </>
      )}
    </ScreenWrapper>
  );
};

export default FriendsScreen;
