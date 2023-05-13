import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import { AN } from 'constants/styles/appStyles';
import UserInfoTile from 'containers/UserInfoTile/UserInfoTile';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { useAppSelector } from 'store/index';

const ProfileScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Profile'>
> = ({ navigation }) => {
  const { userData } = useAppSelector(state => state.data);

  const goToLanding = () => {
    navigation.navigate('Landing');
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Profile" fullWidth style={{ marginBottom: AN(20) }} />
      <UserInfoTile />

      {/* <InfoLine title="Name" value={firstName} /> */}
    </ScreenWrapper>
  );
};

export default ProfileScreen;
