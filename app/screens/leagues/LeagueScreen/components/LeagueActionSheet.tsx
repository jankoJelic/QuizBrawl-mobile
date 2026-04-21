import CTA from 'components/buttons/CTA';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import InputField from 'components/inputs/InputField';
import { SCREEN_WIDTH } from 'constants/styles/appStyles';
import ActionSheet from 'containers/ActionSheet';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { League } from 'services/api/endpoints/leaguesAPI';
import { showOoopsToast } from 'store/actions/appStateActions';
import { useAppSelector } from 'store/index';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';

const LeagueActionSheet = ({
  league,
  visible,
  close,
  onPressDeleteLeague,
  onPressLeaveLeague,
  updateLeague,
}: Props) => {
  const dispatch = useDispatch();
  const { password, userId, id } = league || {};
  const { userData } = useAppSelector(state => state.data);
  const youAreAdmin = userId === userData.id;

  const [passwordInputVisible, setPasswordInputVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const updatePassword = async () => {
    dispatch(startLoading());
    try {
      await API.updateLeague(id, {
        password: newPassword,
      });
      setPasswordInputVisible(false);
      close();
      updateLeague();
    } catch (error) {
      showOoopsToast();
    } finally {
      dispatch(stopLoading());
    }
  };

  const showPasswordInput = () => {
    setPasswordInputVisible(true);
  };

  return (
    <ActionSheet visible={visible} close={close}>
      {youAreAdmin && !passwordInputVisible ? (
        <GhostButton
          title={password ? 'Edit password' : 'Add password'}
          color="brand500"
          onPress={showPasswordInput}
        />
      ) : (
        <></>
      )}
      {passwordInputVisible ? (
        <>
          <InputField
            title="New password"
            value={newPassword}
            onChangeText={setNewPassword}
            style={{ width: SCREEN_WIDTH * 0.7 }}
          />
          <CTA title="Update password" onPress={updatePassword} />
        </>
      ) : (
        <></>
      )}
      {youAreAdmin ? (
        <GhostButton
          title="Delete league"
          color="danger500"
          onPress={onPressDeleteLeague}
        />
      ) : (
        <GhostButton
          title="Leave league"
          color="danger500"
          onPress={onPressLeaveLeague}
        />
      )}
    </ActionSheet>
  );
};

export default LeagueActionSheet;

interface Props {
  league: League;
  visible: boolean;
  close: () => any;
  onPressDeleteLeague: () => any;
  onPressLeaveLeague: () => any;
  updateLeague: () => any;
}
