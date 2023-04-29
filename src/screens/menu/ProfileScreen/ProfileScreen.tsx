import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBackArrow from 'components/icons/NavBackArrow';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import Logo from 'components/typography/Logo';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';
import { Pressable } from 'react-native';
import { useAppSelector } from 'store/index';

const InfoLine = ({ title = '', value = '' }) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <BodyLarge text={title} style={{ marginRight: AN(20) }} />
      <BodyLarge text={value} color="brand500" weight="bold" />
    </Pressable>
  );
};

const ProfileScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Profile'>
> = ({ navigation }) => {
  const { userData } = useAppSelector(state => state.auth);

  const { email, firstName, lastName } = userData || {};

  const goToLanding = () => {
    navigation.navigate('Landing');
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Profile" fullWidth style={{ marginBottom: AN(20) }} />

      <InfoLine title="First name" value={firstName} />
    </ScreenWrapper>
  );
};

export default ProfileScreen;
