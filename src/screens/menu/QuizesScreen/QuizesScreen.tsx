import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import { Colors } from 'constants/styles/Colors';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useAppSelector } from 'store/index';

const QuizesScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'MyQuizes'>
> = () => {
  const { styles, colors } = useStyles(createStyles);
  const { myQuizes } = useAppSelector(state => state.createQuiz);

  return (
    <ScreenWrapper>
      <NavHeader title="My quizes" />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default QuizesScreen;
