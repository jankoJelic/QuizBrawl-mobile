import InfoLine from 'components/tiles/InfoLine/InfoLine';
import BodyLarge from 'components/typography/BodyLarge';
import { AN } from 'constants/styles/appStyles';
import React from 'react';
import { ShallowUser } from 'store/types/authSliceTypes';
import ActionSheet from './ActionSheet';
import { useAppSelector } from 'store/index';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';

const UserActionSheet = ({
  selectedUser,
  visible,
  closeModal,
  AdditionalContent = <></>,
}: Props) => {
  const { userData } = useAppSelector(state => state.data);

  const youAreSelected = userData?.id === selectedUser?.id;
  const isFriend = userData?.friends?.includes(selectedUser.id);

  const sendFriendRequest = async () => {
    SOCKET.emit(SOCKET_EVENTS.FRIEND_REQUEST_SENT, {
      user: userData,
      recipientId: selectedUser?.id,
    });
    closeModal();
  };

  return (
    <ActionSheet visible={visible && !!selectedUser} close={closeModal}>
      <BodyLarge
        text={`${selectedUser?.firstName} ${selectedUser?.lastName}`}
        weight="bold"
        style={{ marginBottom: AN(24) }}
      />
      <InfoLine title="Level" value={String(selectedUser?.level)} />
      <InfoLine
        title="Accuracy"
        value={String(selectedUser?.accuracyPercentage) + '%'}
      />
      <InfoLine title="Favourite topic" value={selectedUser?.favouriteTopic} />
      <InfoLine title="Rank" value={String(selectedUser?.rank)} />
      {youAreSelected || isFriend ? (
        <></>
      ) : (
        <GhostButton
          title="+ Send friend request"
          onPress={sendFriendRequest}
        />
      )}
      {AdditionalContent}
    </ActionSheet>
  );
};

export default UserActionSheet;

interface Props {
  selectedUser: ShallowUser | undefined;
  visible: boolean;
  closeModal: () => any;
  AdditionalContent?: JSX.Element;
}
