import InputField from 'components/inputs/InputField';
import QuestionInput from 'components/inputs/QuestionInput/QuestionInput';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { AN } from 'constants/styles/appStyles';
import TopicsList from 'containers/TopicsList/TopicsList';
import ScreenWrapper from 'hoc/ScreenWrapper';
import React, { useRef, useState } from 'react';
import { Topic } from 'store/types/dataSliceTypes';

const CreateQuizScreen: React.FC = () => {
  const inputRefs = useRef([]);
  const [selectedTopic, setselectedTopic] = useState<Topic>('General');
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  console.log(inputRefs.current);

  const renderQuestionsInput = () =>
    new Array(numberOfQuestions).fill(undefined).map(i => {
      return <QuestionInput ref={inputRefs} />;
    });

  return (
    <ScreenWrapper>
      <NavHeader title="Create your quiz" />
      <TopicsList
        selectedTopic={selectedTopic}
        onSelectTopic={setselectedTopic}
      />

      <BodyLarge text="Questions" style={{ marginBottom: AN(10) }} />
      {renderQuestionsInput()}
    </ScreenWrapper>
  );
};

export default CreateQuizScreen;
