import { QuestionIcon } from 'assets/icons';
import FeatherIcon from 'assets/icons/MyIcon';
import { TopicIcon } from 'assets/icons/topics';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { BORDER_RADIUS, AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Room } from 'store/types/dataSliceTypes';

const RoomTile = ({ index, onPress, room }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const {
    answerTime,
    maxPlayers,
    name,
    password,
    topic,
    users,
    questionsCount,
    bet,
    teams,
    hostName,
  } = room || {};
  const disabled = users.length === maxPlayers;

  const onPressRoom = () => {
    onPress(room);
  };

  const isMultiPlayer = maxPlayers > 1;

  return (
    <TouchableBounce
      style={{
        ...styles.container,
        ...(index % 2 ? { marginLeft: AN(5) } : { marginRight: AN(5) }),
        ...(disabled && { opacity: 0.7 }),
      }}
      onPress={onPressRoom}
      disabled={disabled}>
      {isMultiPlayer ? (
        <>
          <View style={styles.roomRow}>
            <BodyMedium text={name} style={{ flex: 1 }} weight="bold" />
            <TopicIcon style={styles.topicIcon} topic={topic} />
          </View>
          <View style={styles.roomRow}>
            <BodyMedium text={`Host: ${hostName}`} style={{ flex: 0.7 }} />
            <View style={styles.rightSideInfo}>
              <FeatherIcon name="users" size={AN(16)} />
              <BodyMedium text={`  ${users?.length}/${maxPlayers}`} />
            </View>
          </View>
          <View style={styles.roomRow}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <QuestionIcon style={styles.questionIcon} />
              <BodyMedium text={`  ${String(questionsCount)}`} />
            </View>
            <View style={styles.rightSideInfo}>
              <FeatherIcon name="clock" size={AN(16)} color="warning500" />
              <BodyMedium text={`  ${String(answerTime)}`} />
            </View>
          </View>
          <View style={styles.roomRow}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              {!!password ? (
                <FeatherIcon name="lock" color="danger500" />
              ) : (
                <FeatherIcon name="unlock" color="success500" />
              )}
            </View>
            <View style={styles.rightSideInfo}></View>
          </View>
        </>
      ) : (
        <></>
      )}
    </TouchableBounce>
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
    container: {
      alignItems: 'center',
      backgroundColor: colors.tileBackground,
      borderRadius: BORDER_RADIUS,
      padding: AN(10),
      flex: 1,
      marginVertical: AN(6),
      maxWidth: SCREEN_WIDTH * 0.45,
    },
    questionIcon: { width: AN(20), aspectRatio: 1, color: colors.brand200 },
    topicIcon: { width: AN(20), aspectRatio: 1 },
    rightSideInfo: { flexDirection: 'row', alignItems: 'center', flex: 0.3 },
  });

export default RoomTile;

interface Props {
  index: number;
  room: Room;
  onPress: (room: Room) => void;
}
