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
    },
  } = route.params || {};
  const { styles, colors } = useStyles(createStyles);

  const [selectedUser, setSelectedUser] = useState<ShallowUser>()

  const admin = users?.find(u => u.id === userId);

  const renderUser = ({ item }: { item: ShallowUser }) => {
    const myScore = () => {
      if (!!score && item.id in score) {
        return score[item.id];
      } else return 0;
    };

    const onPressPlayer = () => {

    }

    return (
      <TouchableOpacity style={{ flexDirection: 'row' }}></TouchableOpacity>
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
        <BodyMedium text="Avatar" />
        <BodyMedium text="Player name" />
        <BodyMedium text="Games played" />
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
    },
    tableTitle: {
      textAlign: 'center',
      marginTop: AN(30),
      marginBottom: AN(20),
    },
  });

export default LeagueScreen;
