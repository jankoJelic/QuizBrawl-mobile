import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavBackArrow from 'components/icons/NavBackArrow';
import UserAvatar from 'components/icons/UserAvatar';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import Logo from 'components/typography/Logo';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useAppSelector } from 'store/index';

const ProfileScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Profile'>
> = ({ navigation }) => {
  const { userData } = useAppSelector(state => state.data);

  const { email, firstName, lastName } = userData || {};

  const goToLanding = () => {
    navigation.navigate('Landing');
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Profile" fullWidth style={{ marginBottom: AN(20) }} />
      <View style={{ flexDirection: 'row' }}>
        <UserAvatar />
        <View style={{ marginLeft: AN(20) }}>
          <BodyMedium text={`${firstName} ${lastName}`} />
          <BodyMedium text={email} color="brand500" />
        </View>
      </View>

      {/* <InfoLine title="Name" value={firstName} /> */}
    </ScreenWrapper>
  );
};

export default ProfileScreen;
