import MyIcon from 'assets/icons/MyIcon';
import AnswerTile from 'components/tiles/AnswerTile';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { answersArray } from 'screens/games/QuestionScreen/QuestionScreen';
import { CorrectAnswer } from 'services/socket/socketPayloads';

const QuestionInput = () => {
  const { styles, colors } = useStyles(createStyles);
  const [collapsed, setCollapsed] = useState(true);

  const [question, setQuestion] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<CorrectAnswer>();

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

  return (
    <View>
      <TileWrapper
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: AN(6),
        }}>
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
      <Collapsible collapsed={false}>
        <View></View>
        {answersArray.map(ans => (
          <AnswerTile
            inputMode
            onPress={() => {
              setCorrectAnswer(ans);
            }}
            userName="correct"
            status={correctAnswer === ans ? 'correct' : 'regular'}
            title={question}
          />
        ))}
      </Collapsible>
    </View>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default QuestionInput;
