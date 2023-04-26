import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import HeadingH1 from 'components/typography/HeadingH1';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';
import { useAppSelector } from 'store/index';

const ArenaRoomScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'ArenaRoom'>
> = ({ navigation, route }) => {
  const { userData } = useAppSelector(state => state.auth);
  const { room } = route.params || {};
  const { name, hostName, maxPlayers, players, questionsCount } = room || {};

  return (
    <ScreenWrapper>
      <NavHeader
        title={`Room ${name}`}
        fullWidth
        showLeftIcon={false}
        style={{ marginBottom: AN(20) }}
      />
      <HeadingH1 text={`Host: ${hostName}`} style={{ marginBottom: AN(12) }} />
      <HeadingH1
        text={`Players: ${String(players.length)}/${String(maxPlayers)}`}
      />
    </ScreenWrapper>
  );
};

export default ArenaRoomScreen;
