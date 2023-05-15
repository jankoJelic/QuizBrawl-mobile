import BodyMedium from 'components/typography/BodyMedium';
import { AN, PADDING_HORIZONTAL } from 'constants/styles/appStyles';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Message } from 'store/types/dataSliceTypes';

const MessageTile = ({ message }: Props) => {
  const { createdAt, title, payload, type } = message || {};

  return (
    <TouchableOpacity
      style={{ paddingHorizontal: PADDING_HORIZONTAL, marginBottom: AN(20) }}>
      <BodyMedium
        text={new Date(createdAt).toLocaleString()}
        color="neutral400"
      />
      <BodyMedium text={title} />
    </TouchableOpacity>
  );
};

export default MessageTile;

interface Props {
  message: Message;
}
