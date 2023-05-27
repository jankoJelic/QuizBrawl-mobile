import { TopicIcon } from 'assets/icons/topics';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Room } from 'store/types/dataSliceTypes';

const EventTile = ({ room, index, onPress }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const { topic } = room || {};
  return (
    <TileWrapper
      style={{
        width: SCREEN_WIDTH * 0.4,
        margin: AN(6),
        marginTop: index > 1 ? AN(26) : AN(10),
        marginRight: index % 2 === 1 ? 0 : AN(10),
      }}>
    <TopicIcon
        topic={topic}
        style={{ width: SCREEN_WIDTH * 0.2, aspectRatio: 1, top: -30 }}
      />
    </TileWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default EventTile;

interface Props {
  room: Room;
  index: number;
  onPress: () => any;
}
