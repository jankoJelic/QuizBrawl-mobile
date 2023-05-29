import InputField from 'components/inputs/InputField';
import QuestionInput from 'components/inputs/QuestionInput/QuestionInput';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import { AN } from 'constants/styles/appStyles';
import TopicsList from 'containers/TopicsList/TopicsList';
import ScreenWrapper from 'hoc/ScreenWrapper';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { Question } from 'services/socket/socketPayloads';
import { useAppSelector } from 'store/index';
import { clearCreateQuizInput } from 'store/slices/createQuizSlice';
import { Topic } from 'store/types/dataSliceTypes';

const CreateQuizScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { firstName } = useAppSelector(state => state.data.userData);
  const { questions } = useAppSelector(state => state.createQuiz);
  const [selectedTopic, setselectedTopic] = useState<Topic>('General');
  const [quizName, setQuizName] = useState(`${firstName}'s quiz`);

  const emptyQuestion = {
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: 'answer1',
  };

  const renderItem = ({ item, index }: { item: Question; index: number }) => (
    <QuestionInput index={index} question={item} />
  );

  useEffect(() => {
    return () => {
      dispatch(clearCreateQuizInput());
    };
  }, []);

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
            <BodyLarge text="Questions" style={{ marginBottom: AN(10) }} />
          </>
        }
        renderItem={renderItem}
        data={questions.concat([emptyQuestion as Question])}
        keyExtractor={(item, index) => item.question + String(index)}
      />
    </ScreenWrapper>
  );
};

export default CreateQuizScreen;
