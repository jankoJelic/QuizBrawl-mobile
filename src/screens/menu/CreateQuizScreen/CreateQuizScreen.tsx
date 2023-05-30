import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import InputField from 'components/inputs/InputField';
import QuestionInput from 'components/inputs/QuestionInput/QuestionInput';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import TopicsList from 'containers/TopicsList/TopicsList';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { Question } from 'services/socket/socketPayloads';
import {
  showOoopsToast,
  showSuccessToast,
} from 'store/actions/appStateActions';
import { useAppSelector } from 'store/index';
import { clearCreateQuizInput } from 'store/slices/createQuizSlice';
import { Topic } from 'store/types/dataSliceTypes';
import { isIntegerBewteen } from 'util/strings/isIntegerBetween';

const CreateQuizScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CreateQuiz'>
> = ({ navigation }) => {
  const { colors, styles } = useStyles(createStyles);
  const dispatch = useDispatch();
  const { firstName } = useAppSelector(state => state.data.userData);
  const { questions } = useAppSelector(state => state.createQuiz);
  const [selectedTopic, setselectedTopic] = useState<Topic>('General');
  const [quizName, setQuizName] = useState(`${firstName}'s quiz`);
  const [answerTime, setAnswerTime] = useState('15');

  const emptyQuestion = {
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: 'answer1',
  };

  const answerTimeValid = isIntegerBewteen({
    input: Number(answerTime),
    max: 20,
    min: 10,
  });

  const renderItem = ({ item, index }: { item: Question; index: number }) => (
    <QuestionInput
      index={index}
      question={item}
      key={item.answer1 + String(index)}
    />
  );

  useEffect(() => {
    return () => {
      dispatch(clearCreateQuizInput());
    };
  }, []);

  const submitQuiz = async () => {
    try {
      await API.createQuiz({
        answerTime: Number(answerTime),
        name: quizName,
        questions,
        topic: selectedTopic,
      });
      showSuccessToast();
      navigation.navigate('MyQuizes');
    } catch (error) {
      showOoopsToast();
    }
  };

  return (
    <ScreenWrapper>
      <FlatList
        ListHeaderComponent={
          <>
            <NavHeader title="Create your quiz" />
            <TopicsList
              selectedTopic={selectedTopic}
              onSelectTopic={setselectedTopic}
            />
            <InputField
              title="Quiz name"
              value={quizName}
              onChangeText={setQuizName}
            />
            <InputField
              title="Answer time"
              value={answerTime}
              onChangeText={setAnswerTime}
            />
            <BodyLarge text="Questions" style={{ marginBottom: AN(10) }} />
          </>
        }
        renderItem={renderItem}
        data={questions.concat([emptyQuestion as Question])}
        keyExtractor={(item, index) => item.question + String(index)}
        ListFooterComponent={
          <>
            <View style={styles.divider} />
            <CTA
              title="Submit quiz"
              onPress={submitQuiz}
              disabled={!quizName || !answerTimeValid}
            />
          </>
        }
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    divider: {
      height: AN(1),
      width: '100%',
      backgroundColor: colors.neutral300,
      marginTop: AN(30),
      marginBottom: AN(10),
    },
  });

export default CreateQuizScreen;
