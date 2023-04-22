import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useAppSelector } from 'store';
import LandingScreenHeader from './components/LandingScreenHeader';
import TileWrapper from 'hoc/TileWrapper';
import FeatherIcon from 'assets/icons/FeatherIcon';
import HeadingH1 from 'components/typography/HeadingH1';

const LandingScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Landing'>
> = ({ navigation }) => {
  const { userData } = useAppSelector(state => state.auth);
  const { styles } = useStyles(createStyles);

  const [gameType, setGameType] = useState('BRAWL');

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <ScreenWrapper>
      <LandingScreenHeader navigateToProfile={navigateToProfile} />
      <TileWrapper>
        <HeadingH1 text="Arena" />
        <FeatherIcon family="fontAwesome5" name="users" />
      </TileWrapper>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LandingScreen;
