import { TopicIcon } from 'assets/icons/topics';
import BodyMedium from 'components/typography/BodyMedium';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import {
  AN,
  SCREEN_WIDTH,
  PADDING_HORIZONTAL,
} from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import { useMyNavigation } from 'navigation/hooks/useMyNavigation';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { useAppSelector } from 'store/index';
import { Quiz } from 'store/slices/createQuizSlice';

const MyQuizesList = ({ horizontal, onSelectQuiz }: Props) => {
  const navigation = useMyNavigation();
  const { styles, colors } = useStyles(createStyles);
  const { myQuizes } = useAppSelector(state => state.createQuiz);

  const onPressQuiz = (quiz: Quiz) => {
    if (!!onSelectQuiz) {
      onSelectQuiz();
      return;
    } else navigation.navigate('CreateQuiz', { quiz });
  };

  const renderQuizInfo = (item: Quiz) => (
    <>
      <BodyMedium
        weight="bold"
        text={item.name}
        numberOfLines={1}
        style={{ marginTop: AN(6) }}
      />
      <BodySmall
        text={String(item.questions.length) + ' questions'}
        color="neutral300"
        style={{ marginTop: AN(6) }}
      />
      <BodySmall
        text={`${String(item.answerTime)} seconds`}
        color="neutral300"
      />
    </>
  );

  const renderHorizontalQuiz = ({ item }: { item: Quiz }) => (
    <TileWrapper
      style={styles.horizontalListItemContainer}
      onPress={() => {
        onPressQuiz(item);
      }}>
      <TopicIcon style={styles.horizontalTopicIcon} topic={item.topic} />
      {renderQuizInfo(item)}
    </TileWrapper>
  );

  if (horizontal)
    return (
      <FlatList
        data={myQuizes}
        renderItem={renderHorizontalQuiz}
        keyExtractor={item => item.id + '_myQuiz_horizontal'}
        horizontal
        style={styles.list}
        key="horizontalQuizzesList"
      />
    );

  const renderQuiz = ({ item }: { item: Quiz }) => (
    <TileWrapper style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TopicIcon topic={item.topic} style={{ width: AN(35), height: AN(35) }} />
      {renderQuizInfo(item)}
    </TileWrapper>
  );

  return (
    <FlatList
      data={myQuizes}
      renderItem={renderQuiz}
      keyExtractor={item => item.id + '_myQuiz'}
      style={styles.list}
      key="quizzesList"
    />
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    horizontalListItemContainer: {
      alignItems: 'center',
      marginRight: AN(14),
      maxWidth: SCREEN_WIDTH * 0.35,
      maxHeight: AN(120),
    },
    horizontalTopicIcon: { width: AN(30), height: AN(30) },
    list: { paddingLeft: PADDING_HORIZONTAL, maxHeight: AN(130) },
  });

export default MyQuizesList;

interface Props {
  horizontal?: boolean;
  onSelectQuiz?: () => any;
}
