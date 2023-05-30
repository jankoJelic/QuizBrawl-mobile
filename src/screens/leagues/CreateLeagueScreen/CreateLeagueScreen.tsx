import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useAppSelector } from 'store/index';

const CreateLeagueScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CreateLeague'>
> = () => {
  const { styles, colors } = useStyles(createStyles);

  const { leagueIds } = useAppSelector(state => state.data.userData);

  return (
    <ScreenWrapper>
      <NavHeader title="Leagues" />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default CreateLeagueScreen;
