import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MyIcon from 'assets/icons/MyIcon';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
import UserAvatar from 'components/icons/UserAvatar';
import BodyLarge from 'components/typography/BodyLarge';
import { Colors } from 'constants/styles/Colors';
import {
  AN,
  PADDING_HORIZONTAL,
  SCREEN_WIDTH,
} from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { setStatusBar } from 'store/slices/appStateSlice';
import { removeFriend } from 'store/slices/dataSlice';
import ProfileBadge from './components/ProfileBadge';
import { setColorOpacity } from 'util/strings/setColorOpacity';
import BodyMedium from 'components/typography/BodyMedium';
import { Topic } from 'store/types/dataSliceTypes';
import StatsSection from './components/StatsSection';
import MyScrollView from 'hoc/MyScrollView';
import { Quiz, setQuizes } from 'store/slices/createQuizSlice';
import TileWrapper from 'hoc/TileWrapper';
import EventTile from 'components/tiles/EventTile';
import { TopicIcon } from 'assets/icons/topics';
import BodySmall from 'components/typography/BodySmall/BodySmall';

const ProfileScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Profile'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userData } = useAppSelector(state => state.data);
  const { myQuizes } = useAppSelector(state => state.createQuiz);
  const { colors, styles } = useStyles(createStyles);
  const {
    avatar,
    accuracyPercentage,
    color,
    createdAt,
    firstName,
    friends,
    isPremium,
    lastName,
    level,
    rank,
    trophies,
    id,
    // team,
    correctAnswers,
    totalAnswers,
  } = route.params || {};

  const yourProfile = id === userData.id;

  const getMyQuizes = async () => {
    const myQuizes = await API.getMyQuizes();
    dispatch(setQuizes(myQuizes));
  };

  useEffect(() => {
    if (yourProfile) {
      getMyQuizes();
    }
  }, []);

  useEffect(() => {
    dispatch(setStatusBar({ topColor: color }));

    return () => {
      dispatch(setStatusBar({ topColor: colors.neutral500 }));
    };
  }, []);

  const deleteFriend = () => {
    dispatch(removeFriend(route.params));
    API.removeFriend(id as number);
    navigation.navigate('Friends');
    SOCKET.emit(SOCKET_EVENTS.FRIEND_REMOVED, {
      userId: userData.id,
      removedFriendId: id,
    });
  };

  const renderQuiz = ({ item }: { item: Quiz }) => (
    <TileWrapper
      style={{
        alignItems: 'center',
        marginRight: AN(14),
        maxWidth: SCREEN_WIDTH * 0.35,
        maxHeight: AN(120),
      }}>
      <TopicIcon style={{ width: AN(30), height: AN(30) }} topic={item.topic} />
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
    </TileWrapper>
  );

  return (
    <ScreenWrapper fullWidth>
      <MyScrollView>
        <View style={[styles.upperView, { backgroundColor: color }]}>
          <LinearGradient
            colors={[color as string, setColorOpacity(colors.neutral500, 0.6)]}
            style={styles.linearGradient}
          />
          <MyIcon
            name="arrow-left"
            style={styles.arrowLeft}
            color="neutral500"
            size={AN(22)}
            onPress={navigation.goBack}
          />
          <UserAvatar
            avatar={avatar}
            color={colors.neutral500}
            size={SCREEN_WIDTH * 0.2}
          />

          <BodyLarge
            text={`${firstName} ${lastName}`}
            style={{ marginTop: AN(4) }}
          />
          <View style={styles.profileBadges}>
            <ProfileBadge
              amount={String(rank)}
              imageSource={require('../../../assets/icons/lobbies/shield.png')}
              color="brand500"
            />
            <ProfileBadge
              imageSource={require('../../../assets/icons/trophy.png')}
              amount={String(trophies)}
              color="warning500"
            />
            <ProfileBadge
              imageSource={require('../../../assets/icons/ranking.png')}
              amount={!!rank ? String(rank) : 'n/a'}
              color="danger500"
            />
          </View>
        </View>
        <StatsSection
          correctAnswers={correctAnswers as Record<Topic, number>}
          totalAnswers={totalAnswers as Record<Topic, number>}
        />
        {/* <BodyMedium text="Achievements" style={{ marginBottom: AN(6) }} /> */}

        {/* <RewardsSection /> */}
        {yourProfile ? (
          <>
            <BodyMedium
              text="Your quizes"
              style={{ marginBottom: AN(6), marginLeft: PADDING_HORIZONTAL }}
            />
            <FlatList
              data={myQuizes}
              renderItem={renderQuiz}
              keyExtractor={item => item.id + '_myQuiz'}
              horizontal
              style={{ paddingLeft: PADDING_HORIZONTAL }}
            />
          </>
        ) : (
          <View style={{ paddingHorizontal: PADDING_HORIZONTAL }}>
            <GhostButton
              onPress={deleteFriend}
              title="Send gift"
              color="brand500"
            />
            <GhostButton
              onPress={deleteFriend}
              title="Remove friend"
              color="danger500"
            />
          </View>
        )}
      </MyScrollView>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    arrowLeft: {
      position: 'absolute',
      left: PADDING_HORIZONTAL,
      top: AN(10),
    },
    profileBadges: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: AN(6),
    },
    upperView: {
      alignItems: 'center',
      paddingTop: AN(30),
      borderBottomLeftRadius: SCREEN_WIDTH / 7,
      borderBottomRightRadius: SCREEN_WIDTH / 7,
      paddingBottom: AN(10),
      overflow: 'hidden',
    },
    linearGradient: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      height: '100%',
    },
    statsTile: {
      alignItems: 'center',
      height: AN(96),
      marginRight: AN(10),
      minWidth: AN(90),
    },
    subtitle: {
      marginLeft: PADDING_HORIZONTAL,
      marginTop: AN(24),
      marginBottom: AN(7),
    },
  });

export default ProfileScreen;
