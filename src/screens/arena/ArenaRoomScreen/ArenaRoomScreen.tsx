import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import InfoLine from 'components/tiles/InfoLine/InfoLine';
import UserTile from 'components/tiles/UserTile/UserTile';
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
  const {
    name,
    admin,
    maxPlayers,
    users,
    questionsCount,
    topic,
    password,
    answerTime,
  } = room || {};

  console.log(topic);

  return (
    <ScreenWrapper>
      <NavHeader
        title={`Room ${name}`}
        fullWidth
        showLeftIcon={false}
        style={{ marginBottom: AN(20) }}
      />
      <InfoLine title="Host: " value={admin?.firstName} />
      <InfoLine title="Topic: " value={topic} />

      <InfoLine
        title="Players: "
        value={`${String(users.length)}/${String(maxPlayers)}`}
      />
      {users.map(u => (
        <UserTile user={u} />
      ))}
    </ScreenWrapper>
  );
};

export default ArenaRoomScreen;
