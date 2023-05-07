import CTA from 'components/buttons/CTA';
import UserAvatar from 'components/icons/UserAvatar';
import AnswerTile from 'components/tiles/AnswerTile';
import BodyMedium from 'components/typography/BodyMedium';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS, SCREEN_WIDTH } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, View } from 'react-native';
import { Question } from 'services/socket/socketPayloads';
import { useAppSelector } from 'store/index';
import { UserData } from 'store/types/authSliceTypes';

const QuestionScreen = () => {
  const { colors, styles } = useStyles(createStyles);
  const { questions, onQuestion, score, activeRoom, type } = useAppSelector(
    state => state.game,
  );

  const currentQuestion: Question = questions[onQuestion];
  const { answer1, answer2, answer3, answer4, correctAnswer, question, image } =
    currentQuestion || {};

  const renderUser = ({ item }: { item: UserData }) => (
    <View
      style={{
        ...styles.userTile,
        width: SCREEN_WIDTH / (activeRoom.users.length + 2),
      }}>
      <UserAvatar size={AN(20)} avatar={item.avatar} />
      <BodySmall text={item.firstName} style={{ marginTop: AN(2) }} />
      <BodySmall text={String(score[item.id])} />
    </View>
  );

  const onPressNext = () => {};

  return (
    <ScreenWrapper style={{}}>
      <View style={{}}>
        <FlatList
          data={activeRoom.users}
          renderItem={renderUser}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.id + 'player' + String(index)}
          contentContainerStyle={styles.usersList}
        />
        <TileWrapper style={styles.questionTile}>
          <BodyMedium
            text={currentQuestion?.question}
            style={{ textAlign: 'center' }}
          />
        </TileWrapper>
        <AnswerTile title={answer1} status="correct" />
        <AnswerTile title={answer2} status="wrong" />
        <AnswerTile title={answer3} />
        <AnswerTile title={answer4} />
      </View>
      {type !== 'brawl' ? (
        <CTA title="Next" onPress={onPressNext} style={{ marginTop: AN(30) }} />
      ) : (
        <></>
      )}
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    userTile: {
      borderRadius: BORDER_RADIUS,
      alignItems: 'center',
      borderColor: colors.tileBackground,
      borderWidth: AN(1),
      padding: AN(10),
      justifyContent: 'center',
    },
    usersList: {
      minWidth: SCREEN_WIDTH * 0.9,
      flexGrow: 1,
      justifyContent: 'space-evenly',
      height: AN(70),
    },
    questionTile: {
      minHeight: AN(100),
      justifyContent: 'center',
      padding: AN(20),
      marginVertical: AN(20),
    },
  });

export default QuestionScreen;
