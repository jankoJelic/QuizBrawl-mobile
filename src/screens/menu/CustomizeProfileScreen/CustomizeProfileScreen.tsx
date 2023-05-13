import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import MenuTile from 'components/tiles/MenuTile';
import BodyLarge from 'components/typography/BodyLarge';
import { AN } from 'constants/styles/appStyles';
import UserInfoTile from 'containers/UserInfoTile/UserInfoTile';
import ScreenWrapper from 'hoc/ScreenWrapper';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { useAppSelector } from 'store/index';

const CustomizeProfileScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CustomizeProfile'>
> = ({ navigation }) => {
  const { userData } = useAppSelector(state => state.data);

  const goToLanding = () => {
    navigation.navigate('Landing');
  };

  const goToCustomizeProfile = () => {
    navigation.navigate('CustomizeProfile');
  };

  return (
    <ScreenWrapper>
      <NavHeader title="Customize" fullWidth style={{ marginBottom: AN(20) }} />
      <BodyLarge text="Select color" />

      {/* <InfoLine title="Name" value={firstName} /> */}
    </ScreenWrapper>
  );
};

export default CustomizeProfileScreen;
