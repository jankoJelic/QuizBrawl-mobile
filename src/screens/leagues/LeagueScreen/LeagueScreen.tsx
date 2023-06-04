import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import ActionSheet from 'containers/ActionSheet';
import QuizesList from 'containers/lists/QuizesList';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import API from 'services/api';
import { Quiz } from 'store/slices/createQuizSlice';
import { ShallowUser } from 'store/types/authSliceTypes';

const LeagueScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'League'>
> = ({ navigation, route }) => {
  const {
    league: {
      bet,
      createdAt,
      gamesPlayed,
      image,
      reward,
      score,
      users,
      type,
      name,
      userId,
      totalAnswers,
      correctAnswers,
      id,
    },
  } = route.params || {};
  const { styles, commonStyles } = useStyles(createStyles);

  const [selectedUser, setSelectedUser] = useState<ShallowUser>();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>();
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [myQuizesModalVisible, setMyQuizesModalVisible] = useState(false);

  const closeMyQuizesModal = () => {
    setMyQuizesModalVisible(false);
  };

  const admin = users?.find(u => u.id === userId);

  const getQuizes = async () => {
    const leagueQuizes = await API.getQuizesForLeague(id);
    setQuizes(leagueQuizes);
  };

  useEffect(() => {
    getQuizes();
  }, []);

  const onPressAddQuiz = () => {
    setMyQuizesModalVisible(true);
  };

  const renderUser = ({ item }: { item: ShallowUser }) => {
    const myScore = () => {
      if (!!score && item.id in score) {
        return String(score[item.id]);
      } else return '0';
    };

    const myCorrectAnswers = () => {
      if (!!correctAnswers && item.id in correctAnswers) {
        return correctAnswers[item.id];
      } else return 0;
    };

    const myTotalAnswers = () => {
      if (!!totalAnswers && item.id in totalAnswers) {
        return totalAnswers[item.id];
      } else return 0;
    };

    const myAccuracy =
      myTotalAnswers() === 0
        ? '0.00'
        : (myCorrectAnswers() / myTotalAnswers()).toFixed(2);

    const myGamesPlayed = () => {
      if (!!totalAnswers && item.id in totalAnswers) {
        return String(totalAnswers[item.id]);
      } else return '0';
    };

    const onPressPlayer = () => {};

    return (
      <TouchableOpacity style={styles.tableRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FastImage style={styles.userAvatar} source={{ uri: item.avatar }} />
          <BodyMedium text={item.firstName} />
        </View>
        <BodyMedium text={myGamesPlayed()} />
        <BodyMedium text={myAccuracy + '%'} />
        <BodyMedium text={myScore()} />
      </TouchableOpacity>
    );
  };

  const addQuizToLeague = async (quiz: Quiz) => {
    closeMyQuizesModal();
    API.addQuizToLeague(quiz.id, id);
    setQuizes(prevState => prevState.concat([quiz]));
  };

  const goToCreateNewQuizScreen = () => {
    navigation.navigate('CreateQuiz', { leagueId: id });
  };

  const renderLeagueInfoHeader = () => (
    <View style={styles.leagueInfoHeader}>
      <View style={{ flexDirection: 'row' }}>
        <FastImage source={{ uri: image }} style={styles.image} />
        <View>
          <BodyLarge
            text={`Admin: ${admin?.firstName}`}
            style={styles.alignTextRight}
          />
          <BodyLarge text={`Type: ${type}`} />
          <BodyLarge text={`Bet: ${bet}`} style={styles.alignTextRight} />
          <BodyLarge text={`Reward: ${bet}`} style={styles.alignTextRight} />
        </View>
      </View>
      <View>
        <BodyMedium text="Next quiz:" style={styles.alignTextRight} />
        <BodyMedium
          text={selectedQuiz ? selectedQuiz.name : 'n/a'}
          style={styles.alignTextRight}
          color={selectedQuiz ? 'brand500' : 'neutral300'}
        />
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <NavHeader title={name} fullWidth />

      <FlatList
        ListHeaderComponent={
          <>
            {renderLeagueInfoHeader()}
            <BodyLarge
              text="Standings"
              style={styles.tableTitle}
              weight="bold"
            />
            <View style={styles.tableHeader}>
              <BodyMedium text="Player" />
              <BodyMedium text="GP" />
              <BodyMedium text="%" />
              <BodyMedium text="Pts" />
            </View>
          </>
        }
        data={users}
        renderItem={renderUser}
        keyExtractor={item => `${item.id}_${item.firstName}_league_standing`}
        ListFooterComponent={
          <>
            <BodyLarge
              text="Quizzes"
              style={{ marginTop: AN(10), marginBottom: AN(5) }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <GhostButton
                title="+ Add"
                style={{ width: AN(80) }}
                onPress={onPressAddQuiz}
              />
              <QuizesList horizontal data={quizes} />
            </View>
          </>
        }
      />
      <ActionSheet visible={myQuizesModalVisible} close={closeMyQuizesModal}>
        <QuizesList onSelectQuiz={addQuizToLeague} />
        <GhostButton
          title="Create new quiz"
          color="brand500"
          onPress={goToCreateNewQuizScreen}
        />
        <GhostButton
          title="Close"
          color="danger500"
          onPress={closeMyQuizesModal}
        />
      </ActionSheet>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    image: {
      width: SCREEN_WIDTH * 0.25,
      aspectRatio: 1,
      marginRight: AN(20),
    },
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: colors.neutral300,
      paddingBottom: AN(10),
      marginBottom: AN(5),
    },
    tableTitle: {
      textAlign: 'center',
      marginTop: AN(30),
      marginBottom: AN(20),
    },
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: AN(10),
    },
    userAvatar: {
      width: AN(25),
      aspectRatio: 1,
      marginRight: AN(4),
      borderRadius: AN(25),
    },
    leagueInfoHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    alignTextRight: { textAlign: 'right' },
  });

export default LeagueScreen;
