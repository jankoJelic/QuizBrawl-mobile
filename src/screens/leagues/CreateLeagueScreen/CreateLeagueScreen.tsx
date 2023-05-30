import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import InputField from 'components/inputs/InputField';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useAppSelector } from 'store/index';

const CreateLeagueScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CreateLeague'>
> = () => {
  const { styles, colors } = useStyles(createStyles);

  const { leagueIds } = useAppSelector(state => state.data.userData);

  const [title, setTitle] = useState('');

  const onPressAddQuizzes = () => {};

  return (
    <ScreenWrapper>
      <NavHeader title="Create league" fullWidth />
      <InputField title="Name" onChangeText={setTitle} value={title} />

      <BodyLarge text="Quizzes" />
      <GhostButton title="+ Add quizzes" onPress={onPressAddQuizzes} />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default CreateLeagueScreen;
