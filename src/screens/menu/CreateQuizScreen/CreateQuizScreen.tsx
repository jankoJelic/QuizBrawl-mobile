import InputField from 'components/inputs/InputField';
import QuestionInput from 'components/inputs/QuestionInput/QuestionInput';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import { AN } from 'constants/styles/appStyles';
import TopicsList from 'containers/TopicsList/TopicsList';
import MyScrollView from 'hoc/MyScrollView';
import ScreenWrapper from 'hoc/ScreenWrapper';
import React, { useState } from 'react';
import { useAppSelector } from 'store/index';
import { Topic } from 'store/types/dataSliceTypes';

const CreateQuizScreen: React.FC = () => {
  const { firstName } = useAppSelector(state => state.data.userData);
  const { questions } = useAppSelector(state => state.createQuiz);
  const [selectedTopic, setselectedTopic] = useState<Topic>('General');
  const [quizName, setQuizName] = useState(`${firstName}'s quiz`);

  const renderQuestionsInput = () =>
    new Array(questions.length + 1).fill(undefined).map((_item, index) => {
      return <QuestionInput index={index} />;
    });

  return (
    <ScreenWrapper>
      <MyScrollView>
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
        {renderQuestionsInput()}
      </MyScrollView>
    </ScreenWrapper>
  );
};

export default CreateQuizScreen;
