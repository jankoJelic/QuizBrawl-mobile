import InfoLine from 'components/tiles/InfoLine/InfoLine';
import BodyLarge from 'components/typography/BodyLarge';
import { AN } from 'constants/styles/appStyles';
import React from 'react';
import { ShallowUser, UserData } from 'store/types/authSliceTypes';
import ActionSheet from './ActionSheet';
import { useAppSelector } from 'store/index';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { getFavouriteTopic, getUserLevel } from 'hooks/useUserData';
import CTA from 'components/buttons/CTA';
import { calculateUserAccuracy } from 'util/calculateUserAccuracy';
import { Topic } from 'store/types/dataSliceTypes';
import { useMyNavigation } from 'navigation/hooks/useMyNavigation';

const UserActionSheet = ({
  selectedUser,
  visible,
  closeModal,
  AdditionalContent = <></>,
  viewProfileButtonVisible = false,
}: Props) => {
  const navigation = useMyNavigation();
  const { userData } = useAppSelector(state => state.data);

  const { totalAnswers, correctAnswers, id } = selectedUser || {};

  const youAreSelected = userData?.id === selectedUser?.id;
  const isFriend = userData?.friends?.includes(id);

  const sendFriendRequest = async () => {
    SOCKET.emit(SOCKET_EVENTS.FRIEND_REQUEST_SENT, {
      user: userData,
      recipientId: selectedUser?.id,
    });
    closeModal();
  };

  const viewProfile = () => {
    closeModal();
    navigation.navigate('Profile', selectedUser as UserData);
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
        value={
          calculateUserAccuracy(
            correctAnswers || ({ General: 0 } as Record<Topic, number>),
            totalAnswers || ({ General: 0 } as Record<Topic, number>),
          ) + '%'
        }
      />
      <InfoLine
        title="Favourite topic"
        value={
          selectedUser ? getFavouriteTopic(selectedUser?.totalAnswers) : ''
        }
      />
      <InfoLine
        title="Rank"
        value={getUserLevel(
          selectedUser?.correctAnswers
            ? Object?.values(selectedUser?.correctAnswers)?.reduce(
                (a, b) => a + b,
                0,
              )
            : 0,
        )}
      />
      {youAreSelected || isFriend ? (
        <></>
      ) : (
        <GhostButton
          title="+ Send friend request"
          onPress={sendFriendRequest}
        />
      )}
      {viewProfileButtonVisible ? (
        <CTA title="View profile" onPress={viewProfile} />
      ) : (
        <></>
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
  viewProfileButtonVisible?: boolean;
}
