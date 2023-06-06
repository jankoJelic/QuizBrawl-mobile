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
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import { useAppSelector } from 'store/index';
import { Quiz } from 'store/slices/createQuizSlice';

const QuizesList = ({
  horizontal,
  onSelectQuiz,
  data,
  style = {},
  selectedQuizId,
}: Props) => {
  const navigation = useMyNavigation();
  const { styles, colors } = useStyles(createStyles);

  const { myQuizes } = useAppSelector(state => state.createQuiz);

  const dataToDisplay = data ? data : myQuizes;

  const onPressQuiz = (quiz: Quiz) => {
    if (!!onSelectQuiz) {
      onSelectQuiz(quiz);
      return;
    } else navigation.navigate('CreateQuiz', { quiz });
  };

  const renderQuizInfo = (item: Quiz) => (
    <View>
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
    </View>
  );

  const renderHorizontalQuiz = ({ item }: { item: Quiz }) => {
    const isSelected = selectedQuizId === item.id;
    return (
      <TileWrapper
        style={{
          ...styles.horizontalListItemContainer,
          ...(isSelected && { borderColor: colors.brand500, borderWidth: 1 }),
        }}
        onPress={() => {
          onPressQuiz(item);
        }}>
        <TopicIcon style={styles.horizontalTopicIcon} topic={item.topic} />
        {renderQuizInfo(item)}
      </TileWrapper>
    );
  };

  if (horizontal)
    return (
      <FlatList
        data={dataToDisplay}
        renderItem={renderHorizontalQuiz}
        keyExtractor={item => item.id + '_myQuiz_horizontal'}
        horizontal
        style={[styles.list, style]}
        key="horizontalQuizzesList"
      />
    );

  const renderQuiz = ({ item, index }: { item: Quiz; index: number }) => (
    <TileWrapper
      onPress={() => {
        onPressQuiz(item);
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: AN(10),
        marginRight: index % 2 !== 0 ? 0 : AN(20),
      }}>
      <TopicIcon
        topic={item.topic}
        style={{ width: AN(35), height: AN(35), marginRight: AN(20) }}
      />
      {renderQuizInfo(item)}
    </TileWrapper>
  );

  return (
    <FlatList
      data={dataToDisplay}
      renderItem={renderQuiz}
      keyExtractor={item => item.id + '_myQuiz'}
      style={[styles.verticalList, style]}
      key="quizzesList"
      numColumns={2}
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
    verticalList: { width: '100%' },
  });

export default QuizesList;

interface Props {
  horizontal?: boolean;
  onSelectQuiz?: (quiz: Quiz) => any;
  data?: Quiz[];
  style?: {};
  selectedQuizId?: number;
}
