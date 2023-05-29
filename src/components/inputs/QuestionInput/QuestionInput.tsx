import MyIcon from 'assets/icons/MyIcon';
import CTA from 'components/buttons/CTA';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import AnswerTile from 'components/tiles/AnswerTile';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useDispatch } from 'react-redux';
import { answersArray } from 'screens/games/QuestionScreen/QuestionScreen';
import { CorrectAnswer, Question } from 'services/socket/socketPayloads';
import { useAppSelector } from 'store/index';
import { editQuestion, removeQuestion } from 'store/slices/createQuizSlice';
import {
  addQuestion,
  setActiveQuestionIndex,
} from 'store/slices/createQuizSlice';

const QuestionInput = ({ index, question }: Props) => {
  const dispatch = useDispatch();
  const { styles, colors } = useStyles(createStyles);

  const { activeQuestionIndex, questions, name } = useAppSelector(
    state => state.createQuiz,
  );
  const [collapsed, setCollapsed] = useState(true);

  const [questionText, setQuestionText] = useState(question.question);
  const [answer1, setAnswer1] = useState(question.answer1 || '');
  const [answer2, setAnswer2] = useState(question.answer2 || '');
  const [answer3, setAnswer3] = useState(question.answer3 || '');
  const [answer4, setAnswer4] = useState(question.answer4 || '');
  const [correctAnswer, setCorrectAnswer] = useState<CorrectAnswer>('answer1');

  const clearInput = () => {
    setQuestionText('');
    setAnswer1('');
    setAnswer2('');
    setAnswer3('');
    setAnswer4('');
    setCorrectAnswer('answer1');
  };

  const title = (answer: CorrectAnswer) => {
    switch (answer) {
      case 'answer1':
        return answer1;
      case 'answer2':
        return answer2;
      case 'answer3':
        return answer3;
      case 'answer4':
        return answer4;
    }
  };

  const questionSaved = !!questions[index];

  const onPressAdd = () => {
    const questionPayload = {
      question: questionText,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer,
    };

    const payload = { question: questionPayload as Question, index };

    if (questionSaved) {
      dispatch(editQuestion(payload));
    } else dispatch(addQuestion(payload));
  };

  const onPressChevron = () => {
    if (activeQuestionIndex === index) {
      dispatch(setActiveQuestionIndex(undefined));
    } else {
      dispatch(setActiveQuestionIndex(index));
    }
  };

  const deleteQuestion = () => {
    dispatch(removeQuestion({ index }));
    clearInput();
  };

  const onChangeInput = (answer: CorrectAnswer, txt: string) => {
    switch (answer) {
      case 'answer1':
        setAnswer1(txt);
        break;
      case 'answer2':
        setAnswer2(txt);
        break;
      case 'answer3':
        setAnswer3(txt);
        break;
      case 'answer4':
        setAnswer4(txt);
        break;
      default:
        return;
    }
  };

  return (
    <View style={{ marginTop: AN(12) }}>
      <TileWrapper onPress={onPressChevron} style={styles.container}>
        <TextInput
          style={{ flex: 1, color: colors.mainTextColor }}
          value={questionText}
          onChangeText={setQuestionText}
        />
        <MyIcon
          name={collapsed ? 'chevron-up' : 'chevron-down'}
          style={{ flex: 0.1 }}
        />
      </TileWrapper>
      <Collapsible collapsed={activeQuestionIndex !== index}>
        {answersArray.map((answer, index) => (
          <AnswerTile
            inputMode
            onPress={() => {
              setCorrectAnswer(answer);
            }}
            inputValue={title(answer)}
            userName="correct"
            status={correctAnswer === answer ? 'correct' : 'regular'}
            title={title(answer)}
            onChangeInput={(txt: string) => {
              onChangeInput(answer, txt);
            }}
          />
        ))}
        {questionSaved ? (
          <GhostButton
            title="Delete"
            onPress={deleteQuestion}
            color="danger500"
          />
        ) : (
          <></>
        )}
        <CTA title={questionSaved ? 'Update' : 'Add'} onPress={onPressAdd} />
      </Collapsible>
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: AN(6),
    },
  });

export default QuestionInput;

interface Props {
  index: number;
  question: Question;
}
