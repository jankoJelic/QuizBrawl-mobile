import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import InputField from 'components/inputs/InputField';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import MyQuizesList from 'screens/menu/ProfileScreen/components/MyQuizesList';
import { useAppSelector } from 'store/index';

const CreateLeagueScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CreateLeague'>
> = () => {
  const { styles, colors } = useStyles(createStyles);

  const { leagueIds, firstName } = useAppSelector(state => state.data.userData);
  const { leagueImages } = useAppSelector(state => state.leagues);

  const [title, setTitle] = useState(`${firstName}'s league`);
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');

  const onPressAddQuizzes = () => {};

  const getLeagueImages = async () => {};

  return (
    <ScreenWrapper>
      <NavHeader title="Create league" fullWidth />
      <InputField title="Name" onChangeText={setTitle} value={title} />

      <BodyLarge text="Image" style={{ marginBottom: AN(10) }} />
      <FlatList data={leagueImages} />
      <InputField
        title="Password"
        value={password}
        onChangeText={setPassword}
      />

      <BodyLarge
        text="Quizzes (you can add them later)"
        style={{ marginBottom: AN(10) }}
      />
      <MyQuizesList horizontal />
      <CTA title="Submit" disabled={!title} />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default CreateLeagueScreen;
