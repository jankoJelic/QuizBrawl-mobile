import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBackArrow from 'components/icons/NavBackArrow';
import Logo from 'components/typography/Logo';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';

const ProfileScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Profile'>
> = ({ navigation }) => {
  const goToLanding = () => {
    navigation.navigate('Landing');
  };
  
  return (
    <ScreenWrapper>
      <NavBackArrow onPress={goToLanding} />
      <Logo text="Profile" />
    </ScreenWrapper>
  );
};

export default ProfileScreen;
