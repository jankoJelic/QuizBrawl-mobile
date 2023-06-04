import InfoLine from 'components/tiles/InfoLine/InfoLine';
import BodyLarge from 'components/typography/BodyLarge';
import { AN } from 'constants/styles/appStyles';
import React from 'react';
import { ShallowUser } from 'store/types/authSliceTypes';
import ActionSheet from './ActionSheet';

const UserActionSheet = ({
  selectedUser,
  visible,
  closeModal,
  AdditionalContent = <></>,
}: Props) => {
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
      {AdditionalContent}
    </ActionSheet>
  );
};

export default UserActionSheet;

interface Props {
  selectedUser: ShallowUser | undefined;
  visible: boolean;
  closeModal: () => any;
  AdditionalContent: JSX.Element;
}
