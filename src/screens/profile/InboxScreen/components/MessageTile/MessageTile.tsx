import ClearButton from 'components/buttons/ClearButton';
import { FontWeight } from 'components/typography/BaseTextComponent';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import MyCollapsible from 'hoc/MyCollapsible';
import useStyles from 'hooks/styles/useStyles';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { addFriend, deleteMessage, readMessage } from 'store/slices/dataSlice';
import { Message } from 'store/types/dataSliceTypes';

const MessageTile = ({ message }: Props) => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);
  const { userData } = useAppSelector(state => state.data);
  const { createdAt, title, payload, type, id, senderId, read } = message || {};

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    if (read === 'false') {
      dispatch(readMessage(id));
      API.readMessage(id);
    }
    setCollapsed(!collapsed);
  };

  const removeMessage = async () => {
    try {
      await API.deleteMessage(id);
      dispatch(deleteMessage(id));
    } catch (e) {}
  };

  const acceptFriendRequest = async () => {
    try {
      const user = await API.getUser(String(senderId));
      dispatch(addFriend(user));

      SOCKET.emit(SOCKET_EVENTS.FRIEND_REQUEST_ACCEPTED, {
        user: userData,
        senderId,
      });
      removeMessage();
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
              onPress={removeMessage}
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

  const fontWeight = read === 'false' ? 'bold' : 'true';

  return (
    <>
      <TouchableOpacity
        style={{ paddingHorizontal: PADDING_HORIZONTAL, marginBottom: AN(20) }}
        onPress={toggleCollapsed}>
        <BodyMedium
          onPress={toggleCollapsed}
          text={new Date(Number(createdAt)).toLocaleString()}
          color="neutral400"
          weight={fontWeight as FontWeight}
        />
        <BodyMedium
          text={title}
          onPress={toggleCollapsed}
          weight={fontWeight as FontWeight}
        />
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
