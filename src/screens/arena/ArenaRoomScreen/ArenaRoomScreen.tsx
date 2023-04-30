import { NativeStackScreenProps } from '@react-navigation/native-stack';
import UserAvatar from 'components/icons/UserAvatar';
import NavHeader from 'components/layout/NavHeader';
import InfoLine from 'components/tiles/InfoLine/InfoLine';
import BodyMedium from 'components/typography/BodyMedium';
import HeadingH1 from 'components/typography/HeadingH1';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TileWrapper from 'hoc/TileWrapper';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';
import { Text, View } from 'react-native';
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

  return (
    <ScreenWrapper>
      <NavHeader
        title={`Room ${name}`}
        fullWidth
        showLeftIcon={false}
        style={{ marginBottom: AN(20) }}
      />
      <InfoLine title="Host: " value={admin?.firstName} />
      <InfoLine
        title="Players: "
        value={`${String(users.length)}/${String(maxPlayers)}`}
      />
      {users.map(u => (
        <TileWrapper
          key={u.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: PADDING_HORIZONTAL,
          }}>
          <View>
            <UserAvatar size={AN(22)} />
            <BodyMedium text={u.firstName} />
          </View>
        </TileWrapper>
      ))}
    </ScreenWrapper>
  );
};

export default ArenaRoomScreen;
