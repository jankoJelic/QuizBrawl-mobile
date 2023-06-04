import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavHeader from 'components/layout/NavHeader';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN, SCREEN_WIDTH } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
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
      password,
      userId,
      totalAnswers,
      correctAnswers,
    },
  } = route.params || {};
  const { styles, colors } = useStyles(createStyles);

  const [selectedUser, setSelectedUser] = useState<ShallowUser>();

  const admin = users?.find(u => u.id === userId);

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
        ? '0'
        : String(myCorrectAnswers() / myTotalAnswers());

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
        <BodyMedium text={myAccuracy} />
        <BodyMedium text={myScore()} />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
      <NavHeader title={name} fullWidth />
      <View style={{ flexDirection: 'row' }}>
        <FastImage source={{ uri: image }} style={styles.image} />
        <View>
          <BodyLarge
            text={`Admin: ${admin?.firstName}`}
            style={{ textAlign: 'right' }}
          />
          <BodyLarge text={`Type: ${type}`} />
          <BodyLarge text={`Bet: ${bet}`} style={{ textAlign: 'right' }} />
          <BodyLarge text={`Reward: ${bet}`} style={{ textAlign: 'right' }} />
        </View>
      </View>
      <BodyLarge text="Standings" style={styles.tableTitle} weight="bold" />
      <View style={styles.tableHeader}>
        <BodyMedium text="Player" />
        <BodyMedium text="Games played" />
        <BodyMedium text="Accuracy" />
        <BodyMedium text="Points" />
      </View>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={item => `${item.id}_${item.firstName}_league_standing`}
      />
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
  });

export default LeagueScreen;
