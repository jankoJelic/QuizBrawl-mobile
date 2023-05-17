import ClearButton from 'components/buttons/ClearButton';
import RoundButton from 'components/buttons/RoundButton/RoundButton';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import MyCollapsible from 'hoc/MyCollapsible';
import useStyles from 'hooks/styles/useStyles';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Message } from 'store/types/dataSliceTypes';

const MessageTile = ({ message }: Props) => {
  const { styles, colors } = useStyles(createStyles);
  const { createdAt, title, payload, type } = message || {};

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const rejectFriendRequest = async () => {
    try {
    } catch (e) {}
  };

  const acceptFriendRequest = async () => {
    try {
    } catch (e) {}
  };

  const renderCollapsiblePart = () => {
    switch (type) {
      case 'FRIEND_REQUEST':
        return (
          <View style={styles.collapsible}>
            <ClearButton
              title="Reject"
              color="danger500"
              onPress={rejectFriendRequest}
            />
            <ClearButton
              title="Accept"
              color="success500"
              onPress={acceptFriendRequest}
            />
          </View>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{ paddingHorizontal: PADDING_HORIZONTAL, marginBottom: AN(20) }}
        onPress={toggleCollapsed}>
        <BodyMedium
          onPress={toggleCollapsed}
          text={new Date(Number(createdAt)).toLocaleString()}
          color="neutral400"
        />
        <BodyMedium text={title} onPress={toggleCollapsed} />
      </TouchableOpacity>
      <MyCollapsible collapsed={collapsed}>
        {renderCollapsiblePart()}
      </MyCollapsible>
    </>
  );
};

export default MessageTile;

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    collapsible: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: AN(20),
      bottom: 4,
    },
  });

interface Props {
  message: Message;
}
