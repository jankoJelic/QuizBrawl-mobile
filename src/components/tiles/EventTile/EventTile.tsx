import { TopicIcon } from 'assets/icons/topics';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from 'store/index';
import { Room } from 'store/types/dataSliceTypes';

const EventTile = ({ room, index, onPress }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const { topic, name } = room || {};
  const { dailies } = useAppSelector(state => state.data.userData) || {};

  const dailiesToCheck = dailies ? dailies : {};

  const notYetPlayed = !(room.id in dailiesToCheck);
  const eventWon = dailiesToCheck[room.id] === 10;

  const status = eventWon
    ? 'Completed'
    : notYetPlayed
    ? 'Play'
    : `${String(dailiesToCheck[room.id])}/10`;

  const statusColor = eventWon
    ? 'success500'
    : notYetPlayed
    ? 'brand500'
    : 'neutral300';

  return (
    <TileWrapper
      onPress={onPress}
      style={{
        ...styles.container,
        marginTop: index > 1 ? AN(26) : AN(10),
        marginRight: index % 2 === 1 ? 0 : AN(10),
      }}>
      <TopicIcon topic={topic} style={styles.icon} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <BodyMedium text={name.split(' ')[0]} style={{ top: AN(-10) }} />
        <BodyMedium
          text={status}
          style={{ top: AN(-10) }}
          color={statusColor}
        />
      </View>
    </TileWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      width: SCREEN_WIDTH * 0.4,
      margin: AN(6),
    },
    icon: {
      width: SCREEN_WIDTH * 0.2,
      aspectRatio: 1,
      top: AN(-30),
      elevation: 2,
    },
  });

export default EventTile;

interface Props {
  room: Room;
  index: number;
  onPress: () => any;
}
