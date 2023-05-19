import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import MenuTile from 'components/tiles/MenuTile';
import { AN } from 'constants/styles/appStyles';
import UserInfoTile from 'containers/UserInfoTile/UserInfoTile';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { useAppSelector } from 'store/index';

const ProfileScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Profile'>
> = ({ navigation }) => {
  const { inbox } = useAppSelector(state => state.data.userData);

  const goToInbox = () => {
    navigation.navigate('Inbox');
  };

  const goToCustomizeProfile = () => {
    navigation.navigate('CustomizeProfile');
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Profile" fullWidth style={{ marginBottom: AN(20) }} />
      <UserInfoTile />

      <MenuTile
        title="Inbox"
        icon="mail"
        style={{ marginTop: AN(30) }}
        onPress={goToInbox}
        notification={inbox?.length ? String(inbox.length) : undefined}
      />
      <MenuTile
        title="Customize"
        icon="colorPalette"
        style={{ marginTop: AN(30) }}
        onPress={goToCustomizeProfile}
      />
      <MenuTile
        title="Stats"
        icon="colorPalette"
        onPress={goToCustomizeProfile}
      />

      {/* <InfoLine title="Name" value={firstName} /> */}
    </ScreenWrapper>
  );
};

export default ProfileScreen;
