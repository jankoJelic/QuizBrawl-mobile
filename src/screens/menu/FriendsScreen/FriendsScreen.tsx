import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import UserTile from 'components/tiles/UserTile/UserTile';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { FlatList } from 'react-native';
import { useAppSelector } from 'store/index';
import { UserData } from 'store/types/authSliceTypes';

const FriendsScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Friends'>
> = ({ navigation }) => {
  const { friends } = useAppSelector(state => state.data.userData);
  console.log(friends);
  const renderFriend = ({ item }: { item: Partial<UserData> }) => {
    const onPressFriend = () => {
      navigation.navigate('Friend', item);
    };

    return <UserTile user={item} onPress={onPressFriend} />;
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Friends" fullWidth />
      <FlatList data={friends || []} renderItem={renderFriend} />
    </ScreenWrapper>
  );
};

export default FriendsScreen;
