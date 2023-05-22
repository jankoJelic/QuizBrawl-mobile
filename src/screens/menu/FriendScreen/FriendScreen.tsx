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
import React, { useEffect } from 'react';
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
import { TOPICS } from 'screens/CreateRoomScreen/CreateRoomScreen';
import TileWrapper from 'hoc/TileWrapper';
import { Topic } from 'store/types/dataSliceTypes';

const initialAnswers = {
  General: 0,
  Sports: 0,
  Music: 0,
  History: 0,
  Geography: 0,
  Showbiz: 0,
  Art: 0,
  Science: 0,
};

const FriendScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Friend'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userData } = useAppSelector(state => state.data);
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

  const realCorrectAnswers = correctAnswers || initialAnswers;
  const realTotalAnswers = totalAnswers || initialAnswers;

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

  const correctAnswersCount = Object.values(realCorrectAnswers).reduce(
    (a, b) => a + b,
    0,
  );

  const totalAnswersCount = Object.values(realTotalAnswers).reduce(
    (a, b) => a + b,
    0,
  );

  const totalAccuracy =
    totalAnswersCount === 0
      ? '0.00'
      : ((correctAnswersCount / totalAnswersCount) * 100).toFixed(2);

  const renderStats = ({
    item,
  }: {
    item: { name: Topic; icon: JSX.Element };
  }) => {
    return (
      <TileWrapper style={styles.statsTile}>
        <>{item.icon}</>
        <>
          <BodyMedium text={item.name} style={{ marginTop: AN(6) }} />
          <BodyMedium
            text={
              (
                (realCorrectAnswers[item.name] * 100) /
                (realTotalAnswers[item.name] || 1)
              ).toFixed(2) + '%'
            }
          />
        </>
      </TileWrapper>
    );
  };

  return (
    <ScreenWrapper fullWidth>
      <View style={[styles.upperView, { backgroundColor: color }]}>
        <LinearGradient
          colors={[color as string, setColorOpacity(colors.neutral500, 0.6)]}
          angle={120}
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
          color={colors.transparent}
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

      <BodyMedium
        weight="bold"
        text={`${totalAccuracy}% accuracy`}
        style={styles.subtitle}
      />
      <FlatList horizontal data={TOPICS} renderItem={renderStats} />
      <GhostButton onPress={deleteFriend} title="Remove friend" />
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

export default FriendScreen;
