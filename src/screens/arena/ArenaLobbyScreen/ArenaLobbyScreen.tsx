import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { QuestionIcon } from 'assets/icons';
import FeatherIcon from 'assets/icons/FeatherIcon';
import { GeneralIcon } from 'assets/icons/topics';
import CTA from 'components/buttons/CTA';
import NavHeader from 'components/layout/NavHeader';
import BodyMedium from 'components/typography/BodyMedium';
import { LOBBY_IDS } from 'constants/constants';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SOCKET } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { Room, Topic } from 'store/types/dataSliceTypes';

const ArenaLobbyScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'ArenaLobby'>
> = ({ navigation }) => {
  const { styles, colors } = useStyles(createStyles);
  const { rooms } = useAppSelector(state => state.data);

  const arenaRooms = rooms.filter(room => room?.lobby?.id === LOBBY_IDS.ARENA);

  const goToCreateArenaRoom = () => {
    navigation.navigate('CreateArenaRoom');
  };

  const renderIcon = (topic: Topic) => {
    switch (topic) {
      case 'General':
        return <GeneralIcon style={{ width: AN(20), aspectRatio: 1 }} />;
      default:
        return <></>;
    }
  };

  const renderItem = ({ item, index }: { item: Room; index: number }) => {
    const onPressRoom = () => {
      SOCKET.emit('events', { room: item.id }, data => console.log(data));
    };

    return (
      <TouchableBounce
        style={{
          alignItems: 'center',
          backgroundColor: colors.tileBackground,
          borderRadius: BORDER_RADIUS,
          padding: AN(10),
          flex: 1,
          ...(index % 2 ? { marginLeft: AN(5) } : { marginRight: AN(5) }),
        }}
        onPress={onPressRoom}>
        <View style={styles.roomRow}>
          <BodyMedium text={item.name} style={{ flex: 1 }} weight="bold" />
          {renderIcon(item.topic)}
        </View>
        <View style={styles.roomRow}>
          <BodyMedium text={`Host: ${item.hostName}`} style={{ flex: 0.7 }} />
          <View
            style={{ flexDirection: 'row', alignItems: 'center', flex: 0.3 }}>
            <FeatherIcon name="users" size={AN(16)} />
            <BodyMedium text={`  ${item?.users?.length}/${item.maxPlayers}`} />
          </View>
        </View>
        <View style={styles.roomRow}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <QuestionIcon
              style={{ width: AN(20), aspectRatio: 1, color: colors.brand200 }}
            />
            <BodyMedium text={`  ${String(item.questionsCount)}`} />
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', flex: 0.3 }}>
            <FeatherIcon name="clock" size={AN(16)} color="warning500" />
            <BodyMedium text={`  ${String(item.answerTime)}`} />
          </View>
        </View>
      </TouchableBounce>
    );
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Arena" fullWidth />
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

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    roomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginVertical: AN(4.2),
    },
  });

export default ArenaLobbyScreen;
