import { TopicIcon } from "assets/icons/topics";
import BodyMedium from "components/typography/BodyMedium";
import { Colors } from "constants/styles/Colors";
import { AN, SCREEN_WIDTH } from "constants/styles/appStyles";
import TileWrapper from "hoc/TileWrapper";
import useStyles from "hooks/styles/useStyles";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppSelector } from "store/index";
import { Room, Topic } from "store/types/dataSliceTypes";

const EventTile = ({ room, index, onPress }: Props) => {
  const { styles } = useStyles(createStyles);
  const { name, id, topicId } = room || {};
  const { dailies } = useAppSelector((state) => state.data.userData) || {};
  const { topics } = useAppSelector((state) => state.data) || {};

  const dailiesToCheck = dailies ? dailies : {};

  const notYetPlayed = !(id in dailiesToCheck);
  const eventWon = dailiesToCheck[id] === 10;

  const status = eventWon
    ? "Completed"
    : notYetPlayed
      ? "Play"
      : `${String(dailiesToCheck[id])}/10`;

  const statusColor = eventWon
    ? "success500"
    : notYetPlayed
      ? "brand500"
      : "neutral300";

  const alreadyPlayed = dailiesToCheck[id] !== undefined;

  return (
    <TileWrapper
      disabled={alreadyPlayed}
      onPress={onPress}
      style={{
        ...styles.container,
        marginTop: index > 1 ? AN(32) : AN(10),
        marginRight: index % 2 === 1 ? 0 : AN(10),
        opacity: alreadyPlayed ? 0.7 : 1,
      }}
    >
      <TopicIcon
        topic={
          (topics.find((t) => t.id === topicId)?.iconKey as Topic) || "general"
        }
        style={styles.icon}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <BodyMedium text={name.split(" ")[0]} style={{ top: AN(-10) }} />
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
