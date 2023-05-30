import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GhostButton from 'components/buttons/GhostButton/GhostButton';
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
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import API from 'services/api';
import { SOCKET, SOCKET_EVENTS } from 'services/socket/socket';
import { useAppSelector } from 'store/index';
import { setStatusBar } from 'store/slices/appStateSlice';
import { removeFriend } from 'store/slices/dataSlice';
import BodyMedium from 'components/typography/BodyMedium';
import { Topic } from 'store/types/dataSliceTypes';
import StatsSection from './components/StatsSection';
import MyScrollView from 'hoc/MyScrollView';
import { setQuizes } from 'store/slices/createQuizSlice';
import MyQuizesList from './components/MyQuizesList';
import ProfileHeader from './components/ProfileHeader';

const ProfileScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Profile'>
> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userData } = useAppSelector(state => state.data);
  const { colors, styles } = useStyles(createStyles);
  const {
    color,
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

  return (
    <ScreenWrapper fullWidth>
      <MyScrollView>
        <ProfileHeader />
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
            <MyQuizesList horizontal />
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
