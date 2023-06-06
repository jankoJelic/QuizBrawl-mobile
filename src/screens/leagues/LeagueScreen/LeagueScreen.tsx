import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MyIcon from 'assets/icons/MyIcon';
import CTA from 'components/buttons/CTA';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
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
import { ShallowUser } from 'store/types/authSliceTypes';
import LeagueInfoHeader from './components/LeagueInfoHeader';
import { League } from 'services/api/endpoints/leaguesAPI';
import { startLoading, stopLoading } from 'store/slices/appStateSlice';

const LeagueScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'League'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userData } = useAppSelector(state => state.data);

  const { styles, commonStyles } = useStyles(createStyles);

  const [league, setLeague] = useState<League>(route.params.league);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ShallowUser>();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>();
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [myQuizesModalVisible, setMyQuizesModalVisible] = useState(false);

  const {
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
    password,
    nextQuizUserId,
    readyUsers,
  } = league || {};

  const youAreInLeague = users?.some(u => u.id === userData.id);
  const youAreAdmin = league.userId === userData.id;

  const closePasswordModal = () => {
    setPasswordModalVisible(false);
    setPasswordError(false);
  };

  const onSubmitPassword = (enteredPassword: string) => {
    if (enteredPassword === password) {
      closePasswordModal();
      SOCKET.emit(SOCKET_EVENTS.USER_JOINED_LEAGUE, {
        leagueId: id,
        user: userData,
      });
    } else {
      setPasswordError(true);
    }
  };

  const deleteLeague = async () => {
    dispatch(startLoading());
    try {
      await API.deleteLeague(id);
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
  };

  const getLeague = async () => {
    const updatedLeague = await API.getLeague(id);
    setLeague(updatedLeague);
  };

  const addUserToRoom = (user: ShallowUser) => {
    setLeague(prevState => ({
      ...prevState,
      readyUsers: (prevState?.readyUsers || []).concat([user.id]),
      users: (prevState.users || []).concat([user]),
    }));
  };

  const markUserAsReady = (userId: number) => {
    setLeague(prevState => ({
      ...prevState,
      readyUsers: (prevState?.readyUsers || []).concat([userId]),
    }));
  };

  const markUserAsNotReady = (userId: number) => {
    setLeague(prevState => ({
      ...prevState,
      readyUsers: (prevState?.readyUsers || []).filter(u => u !== userId),
    }));
  };

  const userInLeague = (userId: number) =>
    league?.users?.some(u => u.id === userId);

  useEffect(() => {
    getQuizes();
    getLeague();
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

    SOCKET.on(SOCKET_EVENTS.USER_LEFT_LEAGUE_ROOM, (user: ShallowUser) => {
      markUserAsNotReady(user.id);
    });

    SOCKET.emit(SOCKET_EVENTS.USER_JOINED_LEAGUE_ROOM, { leagueId: id });
  }, []);

  const onPressAddQuiz = () => {
    setMyQuizesModalVisible(true);
  };

  const joinLeague = () => {
    SOCKET.emit(SOCKET_EVENTS.USER_JOINED_LEAGUE, {
      leagueId: id,
      user: userData,
    });
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
        : (myCorrectAnswers() / myTotalAnswers()).toFixed(2);

    const myGamesPlayed = () => {
      if (!!totalAnswers && item.id in totalAnswers) {
        return String(totalAnswers[item.id]);
      } else return '0';
    };

    const onPressPlayer = () => {};

    return (
      <TouchableOpacity style={styles.tableRow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <FastImage style={styles.userAvatar} source={{ uri: item.avatar }} />
          <BodyMedium text={item.firstName + '  '} />
          {(readyUsers?.includes(item.id) || item.id === userData.id) && (
            <MyIcon name="check-circle" size={AN(14)} color="success400" />
          )}
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

  const onPressMore = () => {};

  return (
    <ScreenWrapper>
      <NavHeader
        title={name}
        fullWidth
        RightIcon={
          <MyIcon
            name="more-horizontal"
            color="neutral300"
            onPress={onPressMore}
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
              <BodyMedium text="Player" />
              <BodyMedium text="GP" style={{ alignSelf: 'center' }} />
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
      {youAreInLeague ? (
        <></>
      ) : (
        <CTA title="Join league" onPress={onPressJoinLeague} />
      )}

      <PasswordPopup
        visible={passwordModalVisible}
        closeModal={closePasswordModal}
        error={passwordError}
        onSubmit={onSubmitPassword}
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
  });

export default LeagueScreen;
