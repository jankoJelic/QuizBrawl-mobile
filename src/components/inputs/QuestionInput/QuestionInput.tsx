import MyIcon from 'assets/icons/MyIcon';
import CTA from 'components/buttons/CTA';
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
import { CorrectAnswer } from 'services/socket/socketPayloads';
import { useAppSelector } from 'store/index';
import {
  addQuestion,
  setActiveQuestionIndex,
} from 'store/slices/createQuizSlice';

const QuestionInput = ({ index }: Props) => {
  const dispatch = useDispatch();
  const { styles, colors } = useStyles(createStyles);

  const { activeQuestionIndex, questions, name } = useAppSelector(
    state => state.createQuiz,
  );
  const [collapsed, setCollapsed] = useState(true);

  const [question, setQuestion] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<CorrectAnswer>('answer1');

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

  const onPressAdd = () => {
    dispatch(
      addQuestion({
        index,
        question: {
          question,
          answer1,
          answer2,
          answer3,
          answer4,
          correctAnswer,
        },
      }),
    );
  };

  const onPressChevron = () => {
    if (activeQuestionIndex === index) {
      dispatch(setActiveQuestionIndex(undefined));
    } else {
      dispatch(setActiveQuestionIndex(index));
    }
  };

  return (
    <View style={{ marginTop: AN(12) }}>
      <TileWrapper onPress={onPressChevron} style={styles.container}>
        <TextInput
          style={{ flex: 1, color: colors.mainTextColor }}
          value={question}
          onChangeText={setQuestion}
        />
        <MyIcon
          name={collapsed ? 'chevron-up' : 'chevron-down'}
          style={{ flex: 0.1 }}
        />
      </TileWrapper>
      <Collapsible collapsed={activeQuestionIndex !== index}>
        <View></View>
        {answersArray.map((answer, index) => (
          <AnswerTile
            inputMode
            onPress={() => {
              setCorrectAnswer(answer);
            }}
            userName="correct"
            status={correctAnswer === answer ? 'correct' : 'regular'}
            title={title(answer)}
          />
        ))}
        <CTA title="Add" onPress={onPressAdd} />
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
}
