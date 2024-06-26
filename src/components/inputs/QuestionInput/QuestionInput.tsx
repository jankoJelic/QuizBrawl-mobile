import MyIcon from 'assets/icons/MyIcon';
import CTA from 'components/buttons/CTA';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import AnswerTile from 'components/tiles/AnswerTile';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import FastImage from 'react-native-fast-image';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { answersArray } from 'screens/games/QuestionScreen/QuestionScreen';
import { getFirebaseImageUrl } from 'services/firebaseStorage/firebaseStorage';
import { CorrectAnswer, Question } from 'services/socket/socketPayloads';
import { useAppSelector } from 'store/index';
import { editQuestion, removeQuestion } from 'store/slices/createQuizSlice';
import {
  addQuestion,
  setActiveQuestionIndex,
} from 'store/slices/createQuizSlice';

const QuestionInput = ({ index, question }: Props) => {
  const dispatch = useDispatch();
  const { styles } = useStyles(createStyles);

  const { activeQuestionIndex, questions } = useAppSelector(
    state => state.createQuiz,
  );
  const collapsed = activeQuestionIndex !== index;

  const [questionText, setQuestionText] = useState(question.question);
  const [image, setImage] = useState<Asset | string | undefined>(
    question?.image || undefined,
  );
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (typeof question?.image === 'string') {
      getFirebaseImageUrl(question?.image).then(res => {
        setImageUrl(res);
      });
    }
  }, []);

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
      ...(!!image && { image }),
    };

    const payload = { question: questionPayload as Question, index };

    if (questionSaved) {
      dispatch(editQuestion(payload));
    } else dispatch(addQuestion(payload));
  };

  const collapseAllQuestions = () => {
    dispatch(setActiveQuestionIndex(undefined));
  };

  const onPressChevron = () => {
    if (!collapsed) {
      collapseAllQuestions();
    } else {
      dispatch(setActiveQuestionIndex(index));
    }
  };

  const deleteQuestion = () => {
    dispatch(removeQuestion({ index }));
    clearInput();
    collapseAllQuestions();
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

  const renderQuestion = () => (
    <TileWrapper onPress={onPressChevron} style={styles.questionContainer}>
      <TextInput
        style={styles.questionText}
        value={questionText}
        onChangeText={setQuestionText}
      />
      <MyIcon
        name={collapsed ? 'chevron-up' : 'chevron-down'}
        style={{ flex: 0.1 }}
      />
    </TileWrapper>
  );

  const renderAnswers = () =>
    answersArray.map(answer => (
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
    ));

  const onPressAddImage = async () => {
    if (!image) {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (!!result?.assets) {
        setImage(result.assets[0]);
      }
    } else {
      setImage(undefined);
    }
  };

  return (
    <View style={styles.container}>
      {renderQuestion()}
      <Collapsible collapsed={collapsed}>
        <TileWrapper style={{ flexDirection: 'row', alignItems: 'center' }}>
          {image?.uri ? (
            <FastImage
              source={{ uri: image.uri }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : imageUrl ? (
            <FastImage
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <BodyMedium
              text={
                typeof image === 'string'
                  ? image
                  : image?.fileName || 'No image selected'
              }
              style={{ flex: 1, padingRight: AN(10) }}
              color="neutral400"
            />
          )}

          <GhostButton
            title={image ? 'Remove' : 'Add image'}
            style={{ flex: 0.5 }}
            onPress={onPressAddImage}
            color={image ? 'danger500' : 'brand500'}
          />
        </TileWrapper>
        {renderAnswers()}
        {questionSaved ? (
          <GhostButton
            title="Delete question"
            onPress={deleteQuestion}
            color="danger500"
          />
        ) : (
          <></>
        )}
        <CTA
          title={questionSaved ? 'Update question' : 'Add question'}
          onPress={onPressAdd}
        />
      </Collapsible>
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    questionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: AN(6),
    },
    questionText: { flex: 1, color: colors.mainTextColor },
    container: { marginTop: AN(12) },
    image: { flex: 1, width: AN(50), height: AN(50) },
  });

export default QuestionInput;

interface Props {
  index: number;
  question: Question;
}
