import { QuestionIcon } from 'assets/icons';
import FeatherIcon from 'assets/icons/FeatherIcon';
import { GeneralIcon } from 'assets/icons/topics';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { BORDER_RADIUS, AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import TouchableBounce from 'hoc/TouchableBounce';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Room, Topic } from 'store/types/dataSliceTypes';

const RoomTile = ({ index, onPress, room }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const {
    answerTime,
    hostName,
    maxPlayers,
    name,
    password,
    topic,
    users,
    questionsCount,
  } = room || {};

  const disabled = false;

  const renderIcon = (topic: Topic) => {
    switch (topic) {
      case 'General':
        return <GeneralIcon style={{ width: AN(20), aspectRatio: 1 }} />;
      default:
        return <></>;
    }
  };

  const onPressRoom = () => {
    onPress(room);
  };

  return (
    <TouchableBounce
      style={{
        ...styles.container,
        ...(index % 2 ? { marginLeft: AN(5) } : { marginRight: AN(5) }),
      }}
      onPress={onPressRoom}
      disabled={disabled}>
      <View style={styles.roomRow}>
        <BodyMedium text={name} style={{ flex: 1 }} weight="bold" />
        {renderIcon(topic)}
      </View>
      <View style={styles.roomRow}>
        <BodyMedium text={`Host: ${hostName}`} style={{ flex: 0.7 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.3 }}>
          <FeatherIcon name="users" size={AN(16)} />
          <BodyMedium text={`  ${users?.length}/${maxPlayers}`} />
        </View>
      </View>
      <View style={styles.roomRow}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <QuestionIcon style={styles.questionIcon} />
          <BodyMedium text={`  ${String(questionsCount)}`} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.3 }}>
          <FeatherIcon name="clock" size={AN(16)} color="warning500" />
          <BodyMedium text={`  ${String(answerTime)}`} />
        </View>
      </View>
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
  });

export default RoomTile;

interface Props {
  index: number;
  room: Room;
  onPress: (room: Room) => void;
}
