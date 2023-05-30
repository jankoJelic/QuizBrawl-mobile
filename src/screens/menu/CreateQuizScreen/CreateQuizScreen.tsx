import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CTA from 'components/buttons/CTA';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
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
import {
  setStatusBar,
  startLoading,
  stopLoading,
} from 'store/slices/appStateSlice';
import {
  clearCreateQuizInput,
  deleteQuiz,
  setActiveQuestionIndex,
  setQuestions,
  updateQuiz,
} from 'store/slices/createQuizSlice';
import { Topic } from 'store/types/dataSliceTypes';
import { isIntegerBewteen } from 'util/strings/isIntegerBetween';

const CreateQuizScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'CreateQuiz'>
> = ({ navigation, route }) => {
  const { styles, colors } = useStyles(createStyles);
  const dispatch = useDispatch();
  const { firstName } = useAppSelector(state => state.data.userData);
  const { questions } = useAppSelector(state => state.createQuiz);

  const { quiz } = route.params || {};
  const IS_EDIT_MODE = !!quiz;

  const [selectedTopic, setselectedTopic] = useState<Topic>(
    quiz?.topic || 'General',
  );
  const [quizName, setQuizName] = useState(quiz?.name || `${firstName}'s quiz`);
  const [answerTime, setAnswerTime] = useState(
    quiz?.answerTime ? String(quiz.answerTime) : '15',
  );

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

  useEffect(() => {
    dispatch(setStatusBar({ topColor: colors.neutral500 }));
    if (IS_EDIT_MODE) {
      dispatch(setActiveQuestionIndex(undefined));
      dispatch(setQuestions(quiz.questions));
    }
  }, []);

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

  const payload = {
    answerTime: Number(answerTime),
    name: quizName,
    questions,
    topic: selectedTopic,
  };

  const submitQuiz = async () => {
    try {
      await API.createQuiz(payload);
      showSuccessToast();
      navigation.navigate('MyQuizes');
    } catch (error) {
      showOoopsToast();
    }
  };

  const onPressUpdate = async () => {
    if (!quiz?.id) return;
    dispatch(startLoading());
    try {
      const newQuiz = await API.updateQuiz(quiz.id, payload);
      dispatch(updateQuiz(newQuiz));
      navigation.goBack();
    } catch (error) {
      showOoopsToast();
    } finally {
      dispatch(stopLoading());
    }
  };

  const onPressDeleteQuiz = async () => {
    if (!IS_EDIT_MODE) return;
    dispatch(startLoading());
    try {
      await API.deleteQuiz(quiz.id);
      dispatch(deleteQuiz(quiz.id));
      navigation.goBack();
    } catch (error) {
      showOoopsToast();
    } finally {
      dispatch(stopLoading());
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
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            <View style={styles.divider} />
            <GhostButton
              color="danger500"
              title="Delete quiz"
              onPress={onPressDeleteQuiz}
            />
            <CTA
              title={IS_EDIT_MODE ? 'Update quiz' : 'Submit quiz'}
              onPress={IS_EDIT_MODE ? onPressUpdate : submitQuiz}
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
