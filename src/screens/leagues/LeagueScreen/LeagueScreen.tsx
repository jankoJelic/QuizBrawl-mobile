import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MyIcon from 'assets/icons/MyIcon';
import CTA from 'components/buttons/CTA';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import {
  AN,
  PADDING_HORIZONTAL,
  SCREEN_WIDTH,
} from 'constants/styles/appStyles';
import ActionSheet from 'containers/ActionSheet';
import PasswordPopup from 'containers/Popup/PasswordPopup';
import QuizesList from 'containers/lists/QuizesList';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { Quiz } from 'store/slices/createQuizSlice';
import { ShallowUser, UserData } from 'store/types/authSliceTypes';
import LeagueInfoHeader from './components/LeagueInfoHeader';
import { League } from 'services/api/endpoints/leaguesAPI';
import {
  showToast,
  startLoading,
  stopLoading,
} from 'store/slices/appStateSlice';
import { useIsFocused } from '@react-navigation/native';
import { removeDuplicatesFromArray } from 'util/array/removeDuplicatesFromArray';
import UserActionSheet from 'containers/ActionSheet/UserActionSheet';
import { initializeGame } from 'store/slices/gameSlice';
import { Question } from 'services/socket/socketPayloads';
import { Room } from 'store/types/dataSliceTypes';
import { removeLeague } from 'store/slices/leaguesSlice';
import { showOoopsToast } from 'store/actions/appStateActions';
import LeagueActionSheet from './components/LeagueActionSheet';

const LeagueScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'League'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { styles, commonStyles } = useStyles(createStyles);
  const { userData } = useAppSelector(state => state.data);
  const { onQuestion } = useAppSelector(state => state.game);

  const [league, setLeague] = useState<League>(route.params.league);

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [selectedUser, setSelectedUser] = useState<ShallowUser>();

  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [myQuizesModalVisible, setMyQuizesModalVisible] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | undefined>(
    quizes?.find(q => q?.id === league.selectedQuizId),
  );

  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [userActionSheetVisible, setUserActionSheetVisible] = useState(false);

  const {
    bet,
    gamesPlayed,
    reward,
    score,
    users,
    type,
    name,
    userId,
    totalAnswers,
    correctAnswers,
    id,
    password,
    nextQuizUserId,
    readyUsers: rawReadyUsers,
    quizIdHistory,
  } = league || {};

  const readyUsers = removeDuplicatesFromArray(rawReadyUsers);

  const youAreInLeague = users?.some(u => u.id === userData.id);
  const youAreAdmin = userId === userData.id;
  const isRoundGame = type === 'ROUND';

  useEffect(() => {
    if (onQuestion === 0) {
      navigation.navigate('GameSplash');
    }
  }, [onQuestion]);

  const closeActionSheet = () => {
    setActionSheetVisible(false);
  };

  const openActionSheet = () => {
    setActionSheetVisible(true);
  };

  const closePasswordModal = () => {
    setPasswordModalVisible(false);
    setPasswordError(false);
  };

  const closeUserActionSheet = () => {
    setUserActionSheetVisible(false);
  };

  const emitUserJoinedLeague = () => {
    SOCKET.emit(SOCKET_EVENTS.USER_JOINED_LEAGUE, {
      leagueId: id,
      user: userData,
    });
  };

  const onSubmitPassword = (enteredPassword: string) => {
    if (enteredPassword === password) {
      closePasswordModal();
      joinLeague();
    } else {
      setPasswordError(true);
    }
  };

  const deleteLeague = async () => {
    dispatch(startLoading());
    try {
      await API.deleteLeague(id);
      SOCKET.emit(SOCKET_EVENTS.LEAGUE_DELETED, id);
      handleLeagueDeleted(id);
    } catch (error) {
    } finally {
      dispatch(stopLoading());
    }
  };

  const closeMyQuizesModal = () => {
    setMyQuizesModalVisible(false);
  };

  const getQuizes = async () => {
    const leagueQuizes = await API.getQuizesForLeague(id);
    setQuizes(leagueQuizes.filter((q: Quiz) => q.userId === userData.id));
    setSelectedQuiz(
      leagueQuizes.find((q: Quiz) => q.id === league.selectedQuizId),
    );
  };

  const getLeague = async () => {
    try {
      const updatedLeague = await API.getLeague(id);
      setLeague(updatedLeague);

      if (!updatedLeague.readyUsers.includes(userData.id))
        connectToLeagueSocket();
    } catch (error) {
      navigation.navigate('Leagues');
      showOoopsToast();
    }
  };

  const addUserToRoom = (user: ShallowUser) => {
    setLeague(prevState => {
      const newUserId = user.id;
      const userIsReady = prevState.readyUsers.some(id => id === newUserId);
      const userInRoom = prevState.users.some(u => u.id === newUserId);
      return {
        ...prevState,
        ...(!userIsReady && {
          readyUsers: prevState.readyUsers.concat([newUserId]),
        }),
        ...(!userInRoom && { users: prevState.users.concat([user]) }),
        score: { ...prevState.score, userId: 0 },
      };
    });
  };

  const removeUserFromLeague = (userId: number) => {
    setLeague(prevState => ({
      ...prevState,
      readyUsers: prevState.readyUsers.filter(readyId => readyId !== userId),
      users: prevState.users.filter(user => user.id !== userId),
    }));
  };

  const markUserAsReady = (userId: number) => {
    setLeague(prevState => {
      const updatedReadyUsers = removeDuplicatesFromArray(
        prevState.readyUsers.concat([userId]),
      );
      return {
        ...prevState,
        readyUsers: updatedReadyUsers,
      };
    });
  };

  const markUserAsNotReady = (userId: number) => {
    setLeague(prevState => ({
      ...prevState,
      readyUsers: prevState.readyUsers.filter(u => u !== userId),
    }));
  };

  const handleLeagueDeleted = (leagueId: number) => {
    if (leagueId === id) {
      navigation.navigate('Leagues');
      dispatch(showToast({ text: 'League deleted', type: 'error' }));
      dispatch(removeLeague(leagueId));
    }
  };

  const userInLeague = (userId: number) =>
    league?.users?.some(u => u.id === userId);

  const connectToLeagueSocket = () => {
    SOCKET.emit(SOCKET_EVENTS.USER_JOINED_LEAGUE_ROOM, { leagueId: id });
    SOCKET.on(SOCKET_EVENTS.USER_JOINED_LEAGUE_ROOM, (user: ShallowUser) => {
      if (userInLeague(user.id)) {
        markUserAsReady(user.id);
      } else {
        addUserToRoom(user);
      }
    });

    SOCKET.on(SOCKET_EVENTS.USER_JOINED_LEAGUE, (user: ShallowUser) => {
      addUserToRoom(user);
    });

    SOCKET.on(SOCKET_EVENTS.LEAGUE_DELETED, (leagueId: number) => {
      handleLeagueDeleted(leagueId);
    });

    SOCKET.on(
      SOCKET_EVENTS.USER_LEFT_LEAGUE_ROOM,
      (payload: { userId: number }) => {
        markUserAsNotReady(payload.userId);
      },
    );

    SOCKET.on(SOCKET_EVENTS.NEXT_QUIZ_SELECTED, (payload: { quiz: Quiz }) => {
      setSelectedQuiz(payload.quiz);
    });

    SOCKET.on(
      SOCKET_EVENTS.LEAGUE_GAME_STARTED,
      (payload: { quiz: Room & { questions: Question[] }; league: League }) => {
        startLeagueGame({ quiz: payload.quiz, league: payload.league });
      },
    );

    SOCKET.on(SOCKET_EVENTS.USER_LEFT_LEAGUE, (userId: number) => {
      removeUserFromLeague(userId);
    });
  };

  const disconnectFromLeagueSocket = () => {
    SOCKET.emit(SOCKET_EVENTS.USER_LEFT_LEAGUE_ROOM, {
      leagueId: id,
      userId: userData.id,
    });
    SOCKET.off(SOCKET_EVENTS.USER_JOINED_LEAGUE);
    SOCKET.off(SOCKET_EVENTS.USER_JOINED_LEAGUE_ROOM);
    SOCKET.off(SOCKET_EVENTS.USER_LEFT_LEAGUE_ROOM);
    SOCKET.off(SOCKET_EVENTS.NEXT_QUIZ_SELECTED);
  };

  useEffect(() => {
    if (!isFocused) return;
    getQuizes();
    getLeague();
    connectToLeagueSocket();

    return () => {
      disconnectFromLeagueSocket();
    };
  }, [isFocused]);

  const onPressAddQuiz = () => {
    setMyQuizesModalVisible(true);
  };

  const joinLeague = () => {
    emitUserJoinedLeague();
  };

  const onPressJoinLeague = () => {
    if (!!password) {
      setPasswordModalVisible(true);
    } else {
      joinLeague();
    }
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
        : ((myCorrectAnswers() * 100) / myTotalAnswers()).toFixed(2);

    const myGamesPlayed = () => {
      if (!!gamesPlayed && item.id in gamesPlayed) {
        return String(gamesPlayed[item.id]);
      } else return '0';
    };

    const onPressPlayer = () => {
      setSelectedUser(item);
      setUserActionSheetVisible(true);
    };

    const rowColor = item.id === userData.id ? 'brand500' : 'mainTextColor';

    return (
      <TouchableOpacity style={styles.tableRow} onPress={onPressPlayer}>
        <View style={styles.userCell}>
          <FastImage style={styles.userAvatar} source={{ uri: item.avatar }} />
          <BodyMedium text={item.firstName + '  '} color={rowColor} />
          {(readyUsers?.includes(item.id) || item.id === userData.id) && (
            <MyIcon name="check-circle" size={AN(14)} color="success400" />
          )}
        </View>
        <BodyMedium
          text={myGamesPlayed()}
          style={styles.cell}
          color={rowColor}
        />
        <BodyMedium
          text={myAccuracy + '%'}
          style={styles.cell}
          color={rowColor}
        />
        <BodyMedium text={myScore()} style={styles.cell} color={rowColor} />
      </TouchableOpacity>
    );
  };

  const addQuizToLeague = async (quiz: Quiz) => {
    closeMyQuizesModal();
    API.addQuizToLeague(quiz.id, id);
    setQuizes(prevState => prevState.concat([quiz]));
  };

  const goToCreateNewQuizScreen = async () => {
    closeMyQuizesModal();
    disconnectFromLeagueSocket();
    navigation.navigate('CreateQuiz', { leagueId: id });
  };

  const onPressStartGame = () => {
    SOCKET.emit(SOCKET_EVENTS.LEAGUE_GAME_STARTED, {
      leagueId: id,
      quiz: selectedQuiz,
    });
  };

  const startLeagueGame = ({
    quiz,
    league,
  }: {
    quiz: Quiz & { questions: Question[] };
    league: League;
  }) => {
    dispatch(
      initializeGame({
        leagueId: id,
        questions: quiz?.questions as Question[],
        room: {
          ...quiz,
          users: league.users as UserData[],
          type: 'brawl',
          maxPlayers: league.users?.length,
          bet,
          answerTime: 15,
        },
      }),
    );
  };

  const allUsersReady = readyUsers?.length === users?.length;
  const startGameEnabled =
    allUsersReady && !!selectedQuiz && selectedQuiz?.userId === nextQuizUserId;

  const setNextQuiz = (quiz: Quiz) => {
    if (quizIdHistory.includes(quiz.id)) {
      dispatch(
        showToast({
          text: 'Quiz already used in this league',
          type: 'error',
        }),
      );
    } else if (nextQuizUserId === userData.id) {
      SOCKET.emit(SOCKET_EVENTS.NEXT_QUIZ_SELECTED, {
        leagueId: id,
        quiz,
      });
    } else {
      dispatch(
        showToast({
          text: 'It is not your turn to set next quiz',
          type: 'error',
        }),
      );
    }
  };

  const leaveLeague = async () => {
    dispatch(startLoading());
    try {
      await API.leaveLeague(id);
      navigation.navigate('Leagues');
      SOCKET.emit(SOCKET_EVENTS.USER_LEFT_LEAGUE, {
        userId: userData.id,
        leagueId: id,
      });
    } catch (error) {
    } finally {
      dispatch(stopLoading());
    }
  };

  const sendLeagueGameInvite = (id: number) => {
    API.sendNotification({
      recipientId: id,
      title: `${name}: ${userData.firstName} wants you to join a game`,
      text: 'League game invite',
      data: { type: 'LEAGUE_GAME_INVITE', payload: String(id) },
    });
  };

  const invitePlayers = () => {
    const notReadyUsersIds = users
      .filter(u => !readyUsers.includes(u.id))
      .map(u => u.id);

    notReadyUsersIds.forEach(sendLeagueGameInvite);
  };

  return (
    <ScreenWrapper fullWidth>
      <NavHeader
        title={name}
        onPressLeftIcon={navigation.goBack}
        RightIcon={
          <MyIcon
            name="more-horizontal"
            color="neutral300"
            onPress={openActionSheet}
          />
        }
      />
      <FlatList
        ListHeaderComponent={
          <>
            <LeagueInfoHeader
              league={route.params.league}
              selectedQuiz={selectedQuiz}
            />
            <BodyLarge
              text="Standings"
              style={styles.tableTitle}
              weight="bold"
            />
            <View style={styles.tableHeader}>
              <BodyMedium text="Player" style={{ flex: 1 }} />
              <BodyMedium text="GP" style={styles.cell} />
              <BodyMedium text="%" style={styles.cell} />
              <BodyMedium text="Pts" style={styles.cell} />
            </View>
          </>
        }
        data={removeDuplicatesFromArray(users).sort((a, b) =>
          score[a.id] > score[b.id] ? -1 : 1,
        )}
        renderItem={renderUser}
        keyExtractor={item => `${item.id}_${item.firstName}_league_standing`}
        ListFooterComponent={
          <>
            <BodyLarge text="Quizzes" style={styles.quizzesSubtitle} />
            <View style={styles.quizzesListContainer}>
              <GhostButton
                title="+ Add"
                style={{ width: AN(65) }}
                onPress={onPressAddQuiz}
                disabled={!youAreInLeague}
              />
              <QuizesList
                horizontal
                data={quizes}
                selectedQuizId={selectedQuiz?.id}
                onSelectQuiz={setNextQuiz}
              />
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
      {youAreInLeague ? (
        <CTA
          title={allUsersReady ? 'Start game' : 'Invite players'}
          onPress={allUsersReady ? onPressStartGame : invitePlayers}
          style={{ ...commonStyles.ctaFooter, width: SCREEN_WIDTH * 0.9 }}
          // disabled={!startGameEnabled}
        />
      ) : (
        <CTA
          title="Join league"
          onPress={onPressJoinLeague}
          style={{ width: SCREEN_WIDTH * 0.9, alignSelf: 'center' }}
        />
      )}

      <PasswordPopup
        visible={passwordModalVisible}
        closeModal={closePasswordModal}
        error={passwordError}
        onSubmit={onSubmitPassword}
      />

      <UserActionSheet
        selectedUser={selectedUser}
        closeModal={closeUserActionSheet}
        visible={userActionSheetVisible && !!selectedUser}
      />
      <LeagueActionSheet
        visible={actionSheetVisible}
        close={closeActionSheet}
        onPressDeleteLeague={deleteLeague}
        onPressLeaveLeague={leaveLeague}
        league={league}
        updateLeague={getLeague}
      />
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: colors.neutral300,
      paddingBottom: AN(10),
      marginBottom: AN(5),
      paddingHorizontal: PADDING_HORIZONTAL,
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
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    userAvatar: {
      width: AN(25),
      aspectRatio: 1,
      marginRight: AN(4),
      borderRadius: AN(25),
    },
    userCell: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    cell: {
      flex: 0.5,
      textAlign: 'right',
    },
    quizzesSubtitle: {
      marginTop: AN(25),
      marginBottom: AN(5),
      marginLeft: PADDING_HORIZONTAL,
    },
    quizzesListContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      left: PADDING_HORIZONTAL,
    },
  });

export default LeagueScreen;
