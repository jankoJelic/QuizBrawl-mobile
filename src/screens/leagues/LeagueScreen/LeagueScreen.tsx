import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const LeagueScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'League'>
> = ({ navigation, route }) => {
  const {
    league: {
      bet,
      createdAt,
      gamesPlayed,
      image,
      reward,
      score,
      users,
      type,
      name,
      password,
      userId,
    },
  } = route.params || {};
  const { styles, colors } = useStyles(createStyles);

  return (
    <ScreenWrapper>
      <NavHeader title={name} fullWidth />
      <FastImage
        source={{ uri: image }}
        style={{ width: AN(60), aspectRatio: 1 }}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default LeagueScreen;
