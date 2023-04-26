import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';
import { useAppSelector } from 'store/index';

const ArenaRoomScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'ArenaRoom'>
> = ({ navigation, route }) => {
  const { userData } = useAppSelector(state => state.auth);
  const { room } = route.params;
  console.log(room);
  return (
    <ScreenWrapper>
      <NavHeader title={room.name} />
    </ScreenWrapper>
  );
};

export default ArenaRoomScreen;
