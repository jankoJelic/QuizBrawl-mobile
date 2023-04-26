import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FeatherIcon from 'assets/icons/FeatherIcon';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import Title from 'components/typography/Title';
import { LOBBY_IDS } from 'constants/constants';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TileWrapper from 'hoc/TileWrapper';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useAppSelector } from 'store/index';
import { Room } from 'store/types/dataSliceTypes';

const ArenaLobbyScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'ArenaLobby'>
> = ({ navigation }) => {
  const { styles, colors } = useStyles(createStyles);
  const { rooms } = useAppSelector(state => state.data);

  const arenaRooms = rooms.filter(room => room?.lobby?.id === LOBBY_IDS.ARENA);

  const goToCreateArenaRoom = () => {
    navigation.navigate('CreateArenaRoom');
  };

  const renderItem = ({ item, index }: { item: Room }) => {
    return (
      <TouchableBounce
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.tileBackground,
          borderRadius: BORDER_RADIUS,
          padding: AN(10),
          flex: 1,
          ...(index % 2 ? { marginLeft: AN(5) } : { marginRight: AN(5) }),
        }}
        onPress={() => {}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <BodyMedium text={item.name} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FeatherIcon name="users" size={AN(16)} />
            <BodyMedium text={`  ${item.players.length}/${item.maxPlayers}`} />
          </View>
        </View>
      </TouchableBounce>
    );
  };
  return (
    <ScreenWrapper>
      <NavHeader title="Arena" fullWidth />
      {/* <TileWrapper style={{ marginTop: AN(20) }}>
        <BodyLarge
          text="+   Create new room"
          color="brand500"
          onPress={() => {
            navigation.navigate('CreateArenaRoom');
          }}
        />
      </TileWrapper> */}
      <FlatList
        data={arenaRooms}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingTop: AN(20) }}
      />
      <CTA title="Create new room" onPress={goToCreateArenaRoom} />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default ArenaLobbyScreen;
