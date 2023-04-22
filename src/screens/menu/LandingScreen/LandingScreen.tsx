import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/navConstants';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useAppSelector } from 'store/index';
import LandingScreenHeader from './components/LandingScreenHeader';
import LobbyCarousel from './components/LobbyCarousel';
import AssetsTile from './components/AssetsTile';

const LandingScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Landing'>
> = ({ navigation }) => {
  const { userData } = useAppSelector(state => state.auth);
  const { styles, colors } = useStyles(createStyles);

  return (
    <ScreenWrapper style={{ paddingHorizontal: 0 }}>
      <LandingScreenHeader />
      <AssetsTile />

      <LobbyCarousel />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LandingScreen;
